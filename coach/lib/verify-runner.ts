/**
 * Verification engine — reads files, runs pattern checks, compiles, and tests.
 * Runs server-side only (uses fs, child_process).
 */
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { execFile } from "child_process";
import { join, dirname } from "path";
import {
  type TaskVerifier,
  type CheckResult,
  type VerificationResult,
  verifierRegistry,
} from "./verifiers";

const PROJECT_ROOT = join(process.cwd(), "..");

function resolveFile(relativePath: string): string {
  return join(PROJECT_ROOT, relativePath);
}

// ─── Pattern Checks ─────────────────────────────────────────────────────────

async function runPatternChecks(verifier: TaskVerifier): Promise<CheckResult[]> {
  const results: CheckResult[] = [];

  for (const check of verifier.patterns) {
    const absPath = resolveFile(check.file);

    if (!existsSync(absPath)) {
      results.push({
        name: check.description,
        passed: false,
        message: `File not found: ${check.file}`,
        level: "pattern",
      });
      continue;
    }

    let content: string;
    try {
      content = await readFile(absPath, "utf-8");
    } catch {
      results.push({
        name: check.description,
        passed: false,
        message: `Cannot read: ${check.file}`,
        level: "pattern",
      });
      continue;
    }

    // Check file has meaningful content (not just the starter template)
    const nonCommentLines = content
      .split("\n")
      .filter((l) => l.trim() && !l.trim().startsWith("//") && !l.trim().startsWith("*") && !l.trim().startsWith("/**") && !l.trim().startsWith("%"));
    if (nonCommentLines.length < 3) {
      results.push({
        name: check.description,
        passed: false,
        message: `File appears to still be a stub (< 3 lines of code): ${check.file}`,
        level: "pattern",
      });
      continue;
    }

    // Required patterns
    const missingPatterns: string[] = [];
    for (const pattern of check.requiredPatterns ?? []) {
      if (!content.includes(pattern)) {
        missingPatterns.push(pattern);
      }
    }

    // Forbidden patterns
    const foundForbidden: string[] = [];
    for (const pattern of check.forbiddenPatterns ?? []) {
      if (content.includes(pattern)) {
        foundForbidden.push(pattern);
      }
    }

    if (missingPatterns.length > 0) {
      results.push({
        name: check.description,
        passed: false,
        message: `Missing required pattern(s): ${missingPatterns.map((p) => `"${p}"`).join(", ")}`,
        level: "pattern",
      });
    } else if (foundForbidden.length > 0) {
      results.push({
        name: check.description,
        passed: false,
        message: `Found forbidden pattern(s): ${foundForbidden.map((p) => `"${p}"`).join(", ")} — likely a leftover stub/TODO`,
        level: "pattern",
      });
    } else {
      results.push({
        name: check.description,
        passed: true,
        message: "All patterns match",
        level: "pattern",
      });
    }
  }

  return results;
}

// ─── Compilation Checks ─────────────────────────────────────────────────────

function exec(cmd: string, args: string[], cwd: string): Promise<{ stdout: string; stderr: string; code: number }> {
  return new Promise((resolve) => {
    execFile(cmd, args, { cwd, timeout: 15000 }, (error, stdout, stderr) => {
      resolve({
        stdout: stdout?.toString() ?? "",
        stderr: stderr?.toString() ?? "",
        code: error ? (error as unknown as { status?: number }).status ?? 1 : 0,
      });
    });
  });
}

async function runCompileCheck(verifier: TaskVerifier): Promise<CheckResult | null> {
  if (!verifier.compile) return null;
  const { files, lang, description } = verifier.compile;

  if (lang === "java") {
    // Check javac is available
    const javacCheck = await exec("javac", ["--version"], PROJECT_ROOT);
    if (javacCheck.code !== 0) {
      return {
        name: description,
        passed: false,
        message: "javac not found in PATH — install JDK 17+ to enable compilation checks",
        level: "compile",
      };
    }

    // Resolve absolute paths
    const absPaths = files.map(resolveFile);
    const missingFiles = absPaths.filter((p) => !existsSync(p));
    if (missingFiles.length > 0) {
      return {
        name: description,
        passed: false,
        message: `Cannot compile — missing file(s): ${missingFiles.map((f) => f.replace(PROJECT_ROOT + "/", "")).join(", ")}`,
        level: "compile",
      };
    }

    // Compile all files together
    const result = await exec("javac", ["-d", "/tmp/devgym-verify", ...absPaths], PROJECT_ROOT);
    if (result.code !== 0) {
      // Clean up error message — take first 5 lines
      const errorLines = result.stderr.split("\n").slice(0, 5).join("\n");
      return {
        name: description,
        passed: false,
        message: `Compilation failed:\n${errorLines}`,
        level: "compile",
      };
    }
    return {
      name: description,
      passed: true,
      message: `Successfully compiled ${files.length} file(s)`,
      level: "compile",
    };
  }

  if (lang === "octave") {
    // Check octave is available
    const octaveCheck = await exec("octave", ["--version"], PROJECT_ROOT);
    if (octaveCheck.code !== 0) {
      return {
        name: description,
        passed: false,
        message: "GNU Octave not found — `brew install octave` to enable Matlab checks",
        level: "compile",
      };
    }

    // Run each file with octave --no-gui --eval "run('file')"
    const mainFile = resolveFile(files[0]);
    if (!existsSync(mainFile)) {
      return {
        name: description,
        passed: false,
        message: `File not found: ${files[0]}`,
        level: "compile",
      };
    }

    // Stub out graphics functions as proper functions so command-style
    // calls like "hold on" and "grid on" work in headless mode
    const gfxStubs = [
      "figure", "subplot", "plot", "xlabel", "ylabel", "title",
      "legend", "grid", "hold", "axes", "text", "yline", "xline",
      "pause", "sgtitle", "bode", "step",
    ]
      .map((fn) => `function ${fn}(varargin); endfunction`)
      .join("; ");
    const evalCmd = `${gfxStubs}; run('${mainFile}')`;

    const result = await exec(
      "octave",
      ["--no-gui", "--no-window-system", "--eval", evalCmd],
      dirname(mainFile),
    );
    if (result.code !== 0) {
      const errorLines = result.stderr.split("\n").slice(0, 5).join("\n");
      return {
        name: description,
        passed: false,
        message: `Octave error:\n${errorLines}`,
        level: "compile",
      };
    }
    return {
      name: description,
      passed: true,
      message: `Ran successfully in Octave`,
      level: "compile",
    };
  }

  return null;
}

// ─── Main Runner ────────────────────────────────────────────────────────────

export async function verifyTask(taskId: string): Promise<VerificationResult> {
  const verifier = verifierRegistry[taskId];

  if (!verifier) {
    return {
      taskId,
      passed: false,
      checks: [],
      summary: `No verifier defined for task ${taskId}`,
    };
  }

  // Level 1: Pattern checks
  const patternResults = await runPatternChecks(verifier);

  // Level 2: Compile check (only if all pattern checks passed)
  const allPatternsPassed = patternResults.every((r) => r.passed);
  let compileResult: CheckResult | null = null;
  if (allPatternsPassed) {
    compileResult = await runCompileCheck(verifier);
  }

  // Combine results
  const allChecks = [...patternResults];
  if (compileResult) allChecks.push(compileResult);

  const passed = allChecks.every((r) => r.passed);
  const totalChecks = allChecks.length;
  const passedChecks = allChecks.filter((r) => r.passed).length;

  return {
    taskId,
    passed,
    checks: allChecks,
    summary: passed
      ? `All ${totalChecks} checks passed ✓`
      : `${passedChecks}/${totalChecks} checks passed`,
  };
}

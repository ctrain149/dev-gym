import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { writeFile } from "fs/promises";
import { join } from "path";

const PROJECT_ROOT = join(process.cwd(), "..");
const STARTERS_TAG = "starters";

function exec(
  cmd: string,
  args: string[],
  cwd: string,
): Promise<{ stdout: string; stderr: string; code: number }> {
  return new Promise((resolve) => {
    execFile(
      cmd,
      args,
      { cwd, timeout: 10000, maxBuffer: 1024 * 1024 },
      (error, stdout, stderr) => {
        resolve({
          stdout: stdout?.toString() ?? "",
          stderr: stderr?.toString() ?? "",
          code: error ? 1 : 0,
        });
      },
    );
  });
}

async function getStarterContent(filePath: string): Promise<string | null> {
  const result = await exec(
    "git",
    ["show", `${STARTERS_TAG}:${filePath}`],
    PROJECT_ROOT,
  );
  if (result.code !== 0) return null;
  return result.stdout;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { files } = body;

    if (
      !Array.isArray(files) ||
      files.length === 0 ||
      !files.every((f: unknown) => typeof f === "string")
    ) {
      return NextResponse.json(
        { error: "Missing or invalid files array" },
        { status: 400 },
      );
    }

    // Validate all paths are within practice/ to prevent arbitrary file resets
    for (const file of files) {
      if (!file.startsWith("practice/") || file.includes("..")) {
        return NextResponse.json(
          { error: `Invalid file path: ${file}` },
          { status: 400 },
        );
      }
    }

    // Restore each file from the starters tag
    const errors: string[] = [];
    let restored = 0;

    for (const file of files) {
      const content = await getStarterContent(file);
      if (content === null) {
        errors.push(`No starter found for: ${file}`);
        continue;
      }
      const absPath = join(PROJECT_ROOT, file);
      await writeFile(absPath, content, "utf-8");
      restored++;
    }

    if (errors.length > 0 && restored === 0) {
      return NextResponse.json(
        { error: `Reset failed: ${errors.join("; ")}` },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      filesReset: restored,
      message:
        errors.length > 0
          ? `Reset ${restored} file(s). Warnings: ${errors.join("; ")}`
          : `Reset ${restored} file(s) to original starter state`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Reset failed: ${message}` },
      { status: 500 },
    );
  }
}

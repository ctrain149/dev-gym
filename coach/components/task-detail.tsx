"use client";

import { useState } from "react";
import { type Task, type TaskStatus } from "@/lib/tasks";
import { solutions } from "@/lib/solutions";
import { hasVerifier } from "@/lib/verifier-ids";

interface CheckResult {
  name: string;
  passed: boolean;
  message: string;
}

interface VerifyResult {
  taskId: string;
  passed: boolean;
  checks: CheckResult[];
}

interface TaskDetailProps {
  task: Task;
  status: TaskStatus;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNextTask?: () => void;
}

export function TaskDetail({
  task,
  status,
  isCompleted,
  onToggleComplete,
  onNextTask,
}: TaskDetailProps) {
  const [completing, setCompleting] = useState(false);
  const [completeResult, setCompleteResult] = useState<"idle" | "ok" | "error">("idle");
  const [hintsOpen, setHintsOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);
  const [verifyVisible, setVerifyVisible] = useState(false);

  const canVerify = hasVerifier(task.id);

  async function handleVerify() {
    setVerifying(true);
    setVerifyResult(null);
    setVerifyVisible(false);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: task.id }),
      });
      const data: VerifyResult = await res.json();
      setVerifyResult(data);
      // stagger the reveal for animation
      setTimeout(() => setVerifyVisible(true), 50);
      if (data.passed && !isCompleted) onToggleComplete();
    } catch {
      setVerifyResult({ taskId: task.id, passed: false, checks: [{ name: "Connection error", passed: false, message: "Could not reach the verify API" }] });
      setTimeout(() => setVerifyVisible(true), 50);
    } finally {
      setVerifying(false);
    }
  }

  const hasSolution = !!solutions[task.id];

  async function handleCompleteForMe() {
    setCompleting(true);
    setCompleteResult("idle");
    try {
      const res = await fetch("/api/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: task.id }),
      });
      if (!res.ok) throw new Error(await res.text());
      setCompleteResult("ok");
      if (!isCompleted) onToggleComplete();
    } catch {
      setCompleteResult("error");
    } finally {
      setCompleting(false);
    }
  }

  const categoryColor =
    task.category === "angular" ? "text-red-400" : task.category === "spring" ? "text-green-400" : "text-teal-400";
  const categoryBg =
    task.category === "angular" ? "bg-red-500/10" : task.category === "spring" ? "bg-green-500/10" : "bg-teal-500/10";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-1 rounded-full font-mono ${categoryBg} ${categoryColor}`}>
            {task.id}
          </span>
          <span className="text-xs text-zinc-500">Phase {task.phase}</span>
          <span className={`text-xs ${categoryColor}`}>{task.difficulty}</span>
        </div>
        <button
          onClick={onToggleComplete}
          className={`shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            isCompleted
              ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          {isCompleted ? "✓ Completed" : "Mark Complete"}
        </button>
      </div>

      <h2 className="text-2xl font-bold text-zinc-100 mb-4">{task.title}</h2>

      {/* Objectives */}
      <section className="mb-5">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
          Objectives
        </h3>
        <ul className="space-y-1">
          {task.objectives.map((obj, i) => (
            <li key={i} className="flex gap-2 text-sm text-zinc-300">
              <span className="text-zinc-600 mt-0.5">○</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Acceptance Criteria */}
      <section className="mb-5">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
          Acceptance Criteria
        </h3>
        <ul className="space-y-1">
          {task.acceptanceCriteria.map((ac, i) => (
            <li key={i} className="flex gap-2 text-sm text-zinc-300">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{ac}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Files */}
      <section className="mb-5">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
          Files to Create/Edit
        </h3>
        <div className="flex flex-wrap gap-2">
          {task.filesInvolved.map((f, i) => (
            <code key={i} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
              {f}
            </code>
          ))}
        </div>
      </section>

      {/* Hints */}
      <section className="mb-5">
        <button
          onClick={() => setHintsOpen((h) => !h)}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <span>{hintsOpen ? "▼" : "▶"}</span>
          <span>💡 Hints (click to reveal)</span>
        </button>
        {hintsOpen && (
          <ul className="mt-2 space-y-1">
            {task.hints.map((hint, i) => (
              <li key={i} className="flex gap-2 text-sm text-zinc-400">
                <span className="text-zinc-600">–</span>
                <span>{hint}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Verify my work */}
      {canVerify && (
        <div className="mt-6">
          <div className="flex items-center justify-between gap-4 p-4 bg-zinc-800/60 border border-zinc-700 rounded-lg">
            <div>
              <p className="text-sm font-semibold text-zinc-200">Verify my work</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Checks your actual files against the task requirements.
              </p>
            </div>
            <button
              onClick={handleVerify}
              disabled={verifying || status === "locked"}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                status === "locked"
                  ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                  : verifying
                    ? "bg-indigo-800 text-indigo-200 cursor-wait"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }`}
            >
              {verifying ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin" />
                  Checking…
                </span>
              ) : "Run checks"}
            </button>
          </div>

          {/* Results panel */}
          {verifyResult && (
            <div
              className={`mt-2 rounded-lg border overflow-hidden transition-all duration-300 ${
                verifyVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
              } ${
                verifyResult.passed
                  ? "border-green-700 bg-green-950/40"
                  : "border-red-800 bg-red-950/30"
              }`}
            >
              {/* Summary bar */}
              <div className={`flex items-center gap-3 px-4 py-3 ${
                verifyResult.passed ? "bg-green-900/40" : "bg-red-900/30"
              }`}>
                <span className="text-xl">{verifyResult.passed ? "🎉" : "❌"}</span>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${
                    verifyResult.passed ? "text-green-300" : "text-red-300"
                  }`}>
                    {verifyResult.passed
                      ? "All checks passed! Task marked complete."
                      : `${verifyResult.checks.filter((c) => !c.passed).length} of ${verifyResult.checks.length} checks failed`}
                  </p>
                </div>
                {/* mini progress bar */}
                <div className="w-24 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      verifyResult.passed ? "bg-green-400" : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.round(
                        (verifyResult.checks.filter((c) => c.passed).length /
                          verifyResult.checks.length) *
                          100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Per-check list */}
              <ul className="divide-y divide-zinc-800/60">
                {verifyResult.checks.map((c, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 px-4 py-2.5 transition-all duration-300`}
                    style={{ transitionDelay: verifyVisible ? `${i * 60}ms` : "0ms" }}
                  >
                    <span className="mt-0.5 text-base shrink-0">
                      {c.passed ? "✅" : "❌"}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-xs font-medium ${
                        c.passed ? "text-zinc-300" : "text-red-300"
                      }`}>
                        {c.name}
                      </p>
                      {!c.passed && (
                        <p className="text-xs text-zinc-500 mt-0.5 font-mono break-all">
                          {c.message}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Complete for me */}
      {hasSolution && (
        <div className="mt-6 p-4 bg-teal-950/40 border border-teal-800/50 rounded-lg flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-teal-300">Complete for me</p>
            <p className="text-xs text-zinc-400 mt-0.5">
              Writes the solution files to{" "}
              <code className="text-zinc-300">
                {task.category === "spring" ? "backend/" : "frontend/"}
              </code>{" "}
              and marks this task done.
            </p>
          </div>
          <button
            onClick={handleCompleteForMe}
            disabled={completing || status === "locked"}
            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              completeResult === "ok"
                ? "bg-teal-600 text-white"
                : completeResult === "error"
                  ? "bg-red-700 text-white hover:bg-red-600"
                  : status === "locked"
                    ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                    : "bg-teal-700 text-white hover:bg-teal-600"
            }`}
          >
            {completing
              ? "Writing files…"
              : completeResult === "ok"
                ? "✓ Done"
                : completeResult === "error"
                  ? "✗ Failed — retry"
                  : "Complete for me"}
          </button>
        </div>
      )}

      {/* Next task */}
      {isCompleted && onNextTask && (
        <div className="mt-3">
          <button
            onClick={onNextTask}
            className="w-full py-2.5 rounded-lg text-sm font-medium bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
          >
            Next task <span aria-hidden>→</span>
          </button>
        </div>
      )}

      {/* Reset instruction */}
      <div className="mt-4 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
        <p className="text-xs text-zinc-500">
          <span className="font-semibold text-zinc-400">Reset to this task:</span>{" "}
          Run{" "}
          <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">
            ./scripts/reset.sh {task.gitTag}
          </code>{" "}
          to restore the{" "}
          {task.category === "angular" ? "frontend" : "backend"} project to the
          starting state for this task.
        </p>
      </div>
    </div>
  );
}

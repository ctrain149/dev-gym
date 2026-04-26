"use client";

import { useState } from "react";
import { type Task, type TaskStatus } from "@/lib/tasks";
import { solutions } from "@/lib/solutions";

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

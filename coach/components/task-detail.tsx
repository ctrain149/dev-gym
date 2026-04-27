"use client";

import { useState } from "react";
import { type Task, type TaskStatus } from "@/lib/tasks";

interface TaskDetailProps {
  task: Task;
  status: TaskStatus;
  onToggleComplete: () => void;
  onClose: () => void;
}

export function TaskDetail({ task, status, onToggleComplete, onClose }: TaskDetailProps) {
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);

  const revealNextHint = () => {
    setRevealedHints((prev) => Math.min(prev + 1, task.hints.length));
  };

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-mono text-zinc-500 uppercase">{task.id}</span>
          <h2 className="text-xl font-bold mt-1">{task.title}</h2>
          <div className="flex items-center gap-2 mt-1 text-sm">
            <span
              className={
                task.difficulty === "beginner"
                  ? "text-green-400"
                  : task.difficulty === "intermediate"
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            >
              {task.difficulty}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">Phase {task.phase}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-lg">
          ✕
        </button>
      </div>

      {/* Objectives */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase mb-2">Objectives</h3>
        <ul className="space-y-1">
          {task.objectives.map((obj, i) => (
            <li key={i} className="text-sm text-zinc-300 flex gap-2">
              <span className="text-zinc-600 shrink-0">→</span>
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Acceptance Criteria */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase mb-2">Acceptance Criteria</h3>
        <ul className="space-y-1">
          {task.acceptanceCriteria.map((ac, i) => (
            <li key={i} className="text-sm text-zinc-300 flex gap-2">
              <span className="text-emerald-500 shrink-0">✓</span>
              {ac}
            </li>
          ))}
        </ul>
      </div>

      {/* Files Involved */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase mb-2">Files to Create</h3>
        <div className="bg-zinc-950 rounded-lg p-3 font-mono text-xs space-y-1">
          {task.filesInvolved.map((f, i) => (
            <div key={i} className="text-cyan-400">{f}</div>
          ))}
        </div>
      </div>

      {/* Hints */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase">Hints</h3>
          {!showHints ? (
            <button
              onClick={() => { setShowHints(true); setRevealedHints(1); }}
              className="text-xs text-amber-400 hover:text-amber-300"
            >
              Show hints ({task.hints.length} available)
            </button>
          ) : revealedHints < task.hints.length ? (
            <button
              onClick={revealNextHint}
              className="text-xs text-amber-400 hover:text-amber-300"
            >
              Reveal next ({revealedHints}/{task.hints.length})
            </button>
          ) : (
            <span className="text-xs text-zinc-500">All hints revealed</span>
          )}
        </div>
        {showHints && (
          <div className="space-y-3">
            {task.hints.slice(0, revealedHints).map((hint, i) => (
              <div
                key={i}
                className="bg-amber-950/20 border border-amber-900/30 rounded-lg p-3 text-sm text-amber-200/80 animate-fade-in"
              >
                <span className="text-amber-500 font-mono text-xs mr-2">Hint {i + 1}:</span>
                {hint}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
        <button
          onClick={onToggleComplete}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            status === "complete"
              ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              : "bg-emerald-600 text-white hover:bg-emerald-500"
          }`}
        >
          {status === "complete" ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 border border-zinc-700 hover:border-zinc-500"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

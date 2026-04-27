"use client";

import { type Task, type TaskStatus } from "@/lib/tasks";

interface TaskCardProps {
  task: Task;
  status: TaskStatus;
  onClick: () => void;
}

const statusStyles: Record<TaskStatus, string> = {
  locked: "opacity-40 cursor-not-allowed border-zinc-800",
  available: "border-zinc-700 hover:border-zinc-500 cursor-pointer hover:bg-zinc-800/50",
  complete: "border-emerald-800 bg-emerald-950/20 cursor-pointer",
};

const difficultyColors: Record<string, string> = {
  beginner: "text-green-400",
  intermediate: "text-yellow-400",
  advanced: "text-red-400",
};

export function TaskCard({ task, status, onClick }: TaskCardProps) {
  return (
    <div
      className={`rounded-lg border p-4 transition-all ${statusStyles[status]}`}
      onClick={status !== "locked" ? onClick : undefined}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-zinc-500 uppercase">{task.id}</span>
        {status === "complete" && <span className="text-emerald-400 text-sm">✓ Complete</span>}
        {status === "locked" && <span className="text-zinc-600 text-sm">🔒 Locked</span>}
      </div>
      <h3 className="font-semibold text-sm mb-1">{task.title}</h3>
      <div className="flex items-center gap-2 text-xs">
        <span className={difficultyColors[task.difficulty]}>{task.difficulty}</span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-400">{task.objectives.length} objectives</span>
      </div>
    </div>
  );
}

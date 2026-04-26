import { type Task, type TaskStatus } from "@/lib/tasks";

interface TaskCardProps {
  task: Task;
  status: TaskStatus;
  isSelected: boolean;
  onClick: () => void;
}

const difficultyColor = {
  beginner: "text-green-400",
  intermediate: "text-yellow-400",
  advanced: "text-red-400",
};

export function TaskCard({ task, status, isSelected, onClick }: TaskCardProps) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`w-full text-left p-3 rounded-lg border transition-all ${
        isSelected
          ? "border-teal-500 bg-teal-950/40"
          : isLocked
            ? "border-zinc-800 bg-zinc-900/50 opacity-50 cursor-not-allowed"
            : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">
          {isLocked ? "🔒" : isCompleted ? "✅" : "⚡"}
        </span>
        <span
          className={`text-sm font-medium ${isLocked ? "text-zinc-500" : isCompleted ? "line-through text-zinc-400" : "text-zinc-100"}`}
        >
          {task.title}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-1 ml-6">
        <span className="text-xs text-zinc-500">{task.id}</span>
        <span className={`text-xs ${difficultyColor[task.difficulty]}`}>
          {task.difficulty}
        </span>
      </div>
    </button>
  );
}

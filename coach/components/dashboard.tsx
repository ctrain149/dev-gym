"use client";

import { useState, useEffect } from "react";
import {
  type Task,
  type TaskCategory,
  type TaskStatus,
  oopTasks,
  networkingTasks,
  securityTasks,
  testingTasks,
  phaseTitles,
} from "@/lib/tasks";
import { TaskCard } from "./task-card";
import { TaskDetail } from "./task-detail";

const categories: { key: TaskCategory; label: string; color: string; tasks: Task[] }[] = [
  { key: "oop", label: "OOP & Patterns", color: "text-violet-400 border-violet-500", tasks: oopTasks },
  { key: "networking", label: "Networking", color: "text-blue-400 border-blue-500", tasks: networkingTasks },
  { key: "security", label: "Secure Coding", color: "text-red-400 border-red-500", tasks: securityTasks },
  { key: "testing", label: "Testing", color: "text-emerald-400 border-emerald-500", tasks: testingTasks },
];

function loadProgress(): Record<string, TaskStatus> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("westinghouse-progress") || "{}");
  } catch {
    return {};
  }
}

function saveProgress(progress: Record<string, TaskStatus>) {
  localStorage.setItem("westinghouse-progress", JSON.stringify(progress));
}

function getTaskStatus(task: Task, allTasks: Task[], progress: Record<string, TaskStatus>): TaskStatus {
  if (progress[task.id] === "complete") return "complete";
  const taskIndex = allTasks.findIndex((t) => t.id === task.id);
  if (taskIndex === 0) return "available";
  const prevTask = allTasks[taskIndex - 1];
  if (progress[prevTask.id] === "complete") return "available";
  return "available"; // unlock all for now — self-paced
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<TaskCategory>("oop");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [progress, setProgress] = useState<Record<string, TaskStatus>>({});

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const activeCat = categories.find((c) => c.key === activeTab)!;
  const phases = [...new Set(activeCat.tasks.map((t) => t.phase))].sort();

  const totalTasks = categories.reduce((sum, c) => sum + c.tasks.length, 0);
  const completedTasks = Object.values(progress).filter((s) => s === "complete").length;

  const toggleComplete = (taskId: string) => {
    setProgress((prev) => {
      const next = { ...prev };
      if (next[taskId] === "complete") {
        delete next[taskId];
      } else {
        next[taskId] = "complete";
      }
      saveProgress(next);
      return next;
    });
  };

  if (selectedTask) {
    const status = getTaskStatus(selectedTask, activeCat.tasks, progress);
    return (
      <div className="min-h-screen p-6">
        <TaskDetail
          task={selectedTask}
          status={status}
          onToggleComplete={() => toggleComplete(selectedTask.id)}
          onClose={() => setSelectedTask(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-5">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">
              DevGym Coach
              <span className="text-zinc-500 font-normal text-lg ml-2">— Westinghouse Prep</span>
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Principal Software Engineer • OOP • Sockets • Security • Testing
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">
              {completedTasks}/{totalTasks}
            </div>
            <div className="text-xs text-zinc-500">tasks complete</div>
            <div className="w-32 h-1.5 bg-zinc-800 rounded-full mt-1">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-zinc-800 px-6">
        <div className="max-w-6xl mx-auto flex gap-1">
          {categories.map((cat) => {
            const catComplete = cat.tasks.filter((t) => progress[t.id] === "complete").length;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                  activeTab === cat.key
                    ? cat.color
                    : "text-zinc-500 border-transparent hover:text-zinc-300"
                }`}
              >
                {cat.label}
                <span className="ml-2 text-xs opacity-60">
                  {catComplete}/{cat.tasks.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Task Grid */}
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-8">
        {phases.map((phase) => {
          const phaseTasks = activeCat.tasks.filter((t) => t.phase === phase);
          const title = phaseTitles[activeTab]?.[phase] || `Phase ${phase}`;
          return (
            <div key={phase}>
              <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                Phase {phase} — {title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {phaseTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    status={getTaskStatus(task, activeCat.tasks, progress)}
                    onClick={() => setSelectedTask(task)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 px-6 py-4 mt-8">
        <div className="max-w-6xl mx-auto flex justify-between text-xs text-zinc-600">
          <span>Practice files go in <code className="text-zinc-400">practice/</code> directory</span>
          <button
            onClick={() => {
              if (confirm("Reset all progress? This cannot be undone.")) {
                localStorage.removeItem("westinghouse-progress");
                setProgress({});
              }
            }}
            className="text-red-600 hover:text-red-400"
          >
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}

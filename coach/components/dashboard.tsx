"use client";

import { useState, useSyncExternalStore } from "react";
import {
  type Task,
  type TaskCategory,
  type TaskStatus,
  angularTasks,
  springTasks,
  thymeleafTasks,
} from "@/lib/tasks";
import { TaskCard } from "./task-card";
import { TaskDetail } from "./task-detail";

type CompletedTasks = Record<string, boolean>;

const STORAGE_KEY = "devgym-progress";

function getSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY) ?? "{}";
}
function getServerSnapshot(): string {
  return "{}";
}
function subscribe(cb: () => void): () => void {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}
function saveProgress(data: CompletedTasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("storage"));
}

const categoryTasks: Record<TaskCategory, Task[]> = {
  angular: angularTasks,
  spring: springTasks,
  thymeleaf: thymeleafTasks,
};

const phases: Record<TaskCategory, { phase: number; label: string }[]> = {
  angular: [
    { phase: 1, label: "Phase 1: Components & Routing" },
    { phase: 2, label: "Phase 2: Forms & RxJS" },
    { phase: 3, label: "Phase 3: State & Auth" },
  ],
  spring: [
    { phase: 1, label: "Phase 1: JPA & REST Basics" },
    { phase: 2, label: "Phase 2: DTOs & Error Handling" },
    { phase: 3, label: "Phase 3: Security & JWT" },
  ],
  thymeleaf: [
    { phase: 1, label: "Phase 1: Thymeleaf Basics & Controllers" },
    { phase: 2, label: "Phase 2: Forms, Validation & PRG" },
    { phase: 3, label: "Phase 3: JPA, Security & Fragments" },
    { phase: 4, label: "Phase 4: Advanced Features" },
  ],
};

export function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<TaskCategory>("angular");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const progressJson = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const progress: CompletedTasks = JSON.parse(progressJson);

  const tasks = categoryTasks[activeCategory];

  function getTaskStatus(task: Task): TaskStatus {
    if (progress[task.id]) return "completed";
    const idx = tasks.findIndex((t) => t.id === task.id);
    if (idx === 0) return "available";
    const prev = tasks[idx - 1];
    return progress[prev.id] ? "available" : "locked";
  }

  function toggleComplete(taskId: string) {
    const updated = { ...progress };
    if (updated[taskId]) {
      delete updated[taskId];
    } else {
      updated[taskId] = true;
    }
    saveProgress(updated);
  }

  function resetCategory() {
    const updated = { ...progress };
    tasks.forEach((t) => delete updated[t.id]);
    saveProgress(updated);
    setSelectedTask(null);
  }

  const completedCount = tasks.filter((t) => progress[t.id]).length;
  const pct = Math.round((completedCount / tasks.length) * 100);

  const tabs: { id: TaskCategory; label: string; color: string }[] = [
    { id: "angular", label: "Angular", color: "bg-red-600 text-white" },
    { id: "spring", label: "Spring Boot", color: "bg-green-700 text-white" },
    { id: "thymeleaf", label: "Thymeleaf", color: "bg-teal-600 text-white" },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <header className="border-b border-zinc-800 px-6 py-3 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                setSelectedTask(null);
              }}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeCategory === tab.id
                  ? tab.color
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-1 min-w-[120px] h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-zinc-400 shrink-0">
            {completedCount}/{tasks.length} ({pct}%)
          </span>
          <button
            onClick={resetCategory}
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors shrink-0"
          >
            Reset
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-72 shrink-0 border-r border-zinc-800 overflow-y-auto p-4 space-y-6">
          {phases[activeCategory].map(({ phase, label }) => {
            const phaseTasks = tasks.filter((t) => t.phase === phase);
            return (
              <div key={phase}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                  {label}
                </p>
                <div className="space-y-1.5">
                  {phaseTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      status={getTaskStatus(task)}
                      isSelected={selectedTask?.id === task.id}
                      onClick={() => setSelectedTask(task)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </aside>

        {/* Detail panel */}
        <main className="flex-1 min-w-0 p-4">
          {selectedTask ? (
            <TaskDetail
              key={selectedTask.id}
              task={selectedTask}
              status={getTaskStatus(selectedTask)}
              isCompleted={!!progress[selectedTask.id]}
              onToggleComplete={() => toggleComplete(selectedTask.id)}
              onNextTask={() => {
                const idx = tasks.findIndex((t) => t.id === selectedTask.id);
                const next = tasks[idx + 1];
                if (next) setSelectedTask(next);
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-600">
              <div className="text-center">
                <p className="text-lg font-medium mb-2">Select a task</p>
                <p className="text-sm">
                  Choose a task from the left panel to see its details,
                  objectives, and hints.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

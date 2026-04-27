"use client";

import { useState, useCallback } from "react";
import { type Task, type TaskStatus } from "@/lib/tasks";
import { type CheckResult, type VerificationResult } from "@/lib/verifiers";

interface TaskDetailProps {
  task: Task;
  status: TaskStatus;
  onToggleComplete: () => void;
  onClose: () => void;
}

export function TaskDetail({ task, status, onToggleComplete, onClose }: TaskDetailProps) {
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<VerificationResult | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [solving, setSolving] = useState(false);
  const [confirmSolve, setConfirmSolve] = useState(false);
  const [solveMessage, setSolveMessage] = useState<string | null>(null);

  const hasSolution = task.category === "simulation" || task.category === "networking";

  const runVerification = useCallback(async () => {
    setVerifying(true);
    setVerifyError(null);
    setVerifyResult(null);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: task.id }),
      });
      if (!res.ok) {
        const err = await res.json();
        setVerifyError(err.error ?? `HTTP ${res.status}`);
        return;
      }
      const result: VerificationResult = await res.json();
      setVerifyResult(result);
    } catch (e) {
      setVerifyError(e instanceof Error ? e.message : "Network error");
    } finally {
      setVerifying(false);
    }
  }, [task.id]);

  const handleReset = useCallback(async () => {
    setResetting(true);
    setResetMessage(null);
    try {
      const res = await fetch("/api/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: task.filesInvolved }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResetMessage(`Error: ${data.error}`);
      } else {
        setResetMessage(data.message);
        setVerifyResult(null);
        setVerifyError(null);
      }
    } catch (e) {
      setResetMessage(e instanceof Error ? e.message : "Network error");
    } finally {
      setResetting(false);
      setConfirmReset(false);
    }
  }, [task.filesInvolved]);

  const handleSolve = useCallback(async () => {
    setSolving(true);
    setSolveMessage(null);
    try {
      const res = await fetch("/api/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: task.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSolveMessage(`Error: ${data.error}`);
      } else {
        setSolveMessage(`${data.message} — open the files to see the solution`);
        setVerifyResult(null);
        setVerifyError(null);
      }
    } catch (e) {
      setSolveMessage(e instanceof Error ? e.message : "Network error");
    } finally {
      setSolving(false);
      setConfirmSolve(false);
    }
  }, [task.id]);

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

      {/* Verification */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase">Verification</h3>
          <button
            onClick={runVerification}
            disabled={verifying}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              verifying
                ? "bg-zinc-800 text-zinc-500 cursor-wait"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            {verifying ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                Checking…
              </span>
            ) : (
              "Run Checks"
            )}
          </button>
        </div>

        {verifyError && (
          <div className="bg-red-950/30 border border-red-900/40 rounded-lg p-3 text-sm text-red-300">
            {verifyError}
          </div>
        )}

        {verifyResult && (
          <div className="space-y-2">
            {/* Summary bar */}
            <div
              className={`rounded-lg p-3 text-sm font-medium ${
                verifyResult.passed
                  ? "bg-emerald-950/30 border border-emerald-900/40 text-emerald-300"
                  : "bg-amber-950/30 border border-amber-900/40 text-amber-300"
              }`}
            >
              {verifyResult.passed ? "✓ " : "✗ "}
              {verifyResult.summary}
            </div>

            {/* Individual checks */}
            <div className="bg-zinc-950 rounded-lg divide-y divide-zinc-800/50">
              {verifyResult.checks.map((check: CheckResult, i: number) => (
                <div key={i} className="px-3 py-2 flex items-start gap-2 text-sm">
                  <span className={`shrink-0 mt-0.5 ${check.passed ? "text-emerald-400" : "text-red-400"}`}>
                    {check.passed ? "✓" : "✗"}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={check.passed ? "text-zinc-300" : "text-zinc-200 font-medium"}>
                        {check.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">
                        {check.level}
                      </span>
                    </div>
                    {!check.passed && (
                      <p className="text-xs text-zinc-500 mt-0.5 break-all whitespace-pre-wrap">
                        {check.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
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

        <div className="ml-auto flex items-center gap-2">
          {hasSolution && !confirmSolve && (
            <button
              onClick={() => setConfirmSolve(true)}
              className="px-4 py-2 rounded-lg text-sm text-amber-400 hover:text-amber-300 border border-amber-900/50 hover:border-amber-700/60 transition-all"
            >
              Complete for me
            </button>
          )}
          {hasSolution && confirmSolve && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-400">Overwrite files with solution?</span>
              <button
                onClick={handleSolve}
                disabled={solving}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-600 text-white hover:bg-amber-500 disabled:opacity-50 transition-all"
              >
                {solving ? "Writing…" : "Yes"}
              </button>
              <button
                onClick={() => setConfirmSolve(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-700"
              >
                Cancel
              </button>
            </div>
          )}

          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="px-4 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 border border-red-900/50 hover:border-red-700/60 transition-all"
            >
              Reset Files
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-400">Revert all files to starter code?</span>
              <button
                onClick={handleReset}
                disabled={resetting}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-500 disabled:opacity-50 transition-all"
              >
                {resetting ? "Resetting…" : "Confirm"}
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {(resetMessage || solveMessage) && (
        <div className="mt-3 space-y-2">
          {resetMessage && (
            <div className={`rounded-lg p-3 text-sm ${
              resetMessage.startsWith("Error")
                ? "bg-red-950/30 border border-red-900/40 text-red-300"
                : "bg-emerald-950/30 border border-emerald-900/40 text-emerald-300"
            }`}>
              {resetMessage}
            </div>
          )}
          {solveMessage && (
            <div className={`rounded-lg p-3 text-sm ${
              solveMessage.startsWith("Error")
                ? "bg-red-950/30 border border-red-900/40 text-red-300"
                : "bg-amber-950/20 border border-amber-900/30 text-amber-200"
            }`}>
              {solveMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

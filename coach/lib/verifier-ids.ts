// Client-safe: just the list of task IDs that have verifiers.
// Keep in sync with lib/verifiers.ts registry.
export const VERIFIABLE_TASK_IDS = new Set([
  "spr-01",
  "spr-02",
  "spr-03",
  "spr-03a",
  "spr-03b",
  "ang-01",
  "ang-02",
  "ang-03",
  "ang-04",
  "ang-05",
]);

export function hasVerifier(taskId: string): boolean {
  return VERIFIABLE_TASK_IDS.has(taskId);
}

export const PROGRESS_STORAGE_KEY = "ia-academy-progress";

export type ProgressState = Record<string, number[]>;

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function readProgress(storage?: StorageLike): ProgressState {
  try {
    const target = storage ?? (typeof window !== "undefined" ? window.localStorage : undefined);
    if (!target) return {};

    const raw = target.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>).map(([moduleId, lessonIds]) => [
        moduleId,
        Array.isArray(lessonIds)
          ? lessonIds.filter((lessonId): lessonId is number => typeof lessonId === "number")
          : [],
      ]),
    );
  } catch {
    return {};
  }
}

export function writeProgress(progress: ProgressState, storage?: StorageLike): void {
  try {
    const target = storage ?? (typeof window !== "undefined" ? window.localStorage : undefined);
    target?.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage pode estar indisponível em modo privado ou durante renderização no servidor.
  }
}

export function markLessonComplete(
  progress: ProgressState,
  moduleId: string,
  lessonId: number,
): ProgressState {
  const currentLessonIds = progress[moduleId] ?? [];
  if (currentLessonIds.includes(lessonId)) return progress;

  return {
    ...progress,
    [moduleId]: [...currentLessonIds, lessonId].sort((a, b) => a - b),
  };
}

export function getCompletedCount(progress: ProgressState, moduleId: string): number {
  return progress[moduleId]?.length ?? 0;
}

import { describe, expect, it } from "vitest";
import {
  PROGRESS_STORAGE_KEY,
  getCompletedCount,
  markLessonComplete,
  readProgress,
  writeProgress,
} from "./progress";

function createMemoryStorage(initial?: string): Storage {
  let value = initial ?? null;
  return {
    getItem: () => value,
    setItem: (_key: string, nextValue: string) => {
      value = nextValue;
    },
    removeItem: () => undefined,
    clear: () => undefined,
    key: () => null,
    length: 0,
  };
}

describe("lesson progress", () => {
  it("writes and reads progress from storage", () => {
    const storage = createMemoryStorage();
    const progress = { "linear-algebra": [1, 4] };

    writeProgress(progress, storage);

    expect(storage.getItem(PROGRESS_STORAGE_KEY)).toBe(JSON.stringify(progress));
    expect(readProgress(storage)).toEqual(progress);
  });

  it("sanitizes malformed lesson ids", () => {
    const storage = createMemoryStorage(JSON.stringify({ numpy: [1, "2", null, 3] }));

    expect(readProgress(storage)).toEqual({ numpy: [1, 3] });
  });

  it("marks a lesson once and reports the completed count", () => {
    const first = markLessonComplete({}, "python-basics", 3);
    const second = markLessonComplete(first, "python-basics", 1);
    const unchanged = markLessonComplete(second, "python-basics", 1);

    expect(second).toEqual({ "python-basics": [1, 3] });
    expect(unchanged).toBe(second);
    expect(getCompletedCount(second, "python-basics")).toBe(2);
  });
});

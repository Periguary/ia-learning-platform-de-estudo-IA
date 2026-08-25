// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createAchievementGalleryBlob } from "./achievementGalleryExport";

describe("achievementGalleryExport", () => {
  beforeEach(() => {
    const context = {
      fillStyle: "",
      strokeStyle: "",
      lineWidth: 1,
      font: "",
      createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
      fillRect: vi.fn(),
      strokeRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      fillText: vi.fn(),
    };
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(context as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation(callback => callback(new Blob(["png"], { type: "image/png" })));
  });

  it("gera um PNG estilizado com progresso e emblemas do aluno", async () => {
    const blob = await createAchievementGalleryBlob({
      learnerName: "Ada Lovelace",
      unlockedBadges: ["Primeira Conquista", "Aproveitamento Excelente"],
      totalBadges: 3,
      certificationProgress: 67,
    });

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("image/png");
    expect(blob.size).toBeGreaterThan(0);
  });
});

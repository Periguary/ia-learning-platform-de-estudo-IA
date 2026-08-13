import { describe, expect, it } from "vitest";
import { careerById, careerCatalog } from "./careerCatalog";

describe("careerCatalog", () => {
  it("mantém os seis perfis navegáveis por id", () => {
    expect(careerCatalog).toHaveLength(6);
    expect(new Set(careerCatalog.map((career) => career.id)).size).toBe(6);
    for (const career of careerCatalog) {
      expect(careerById(career.id)?.title).toBe(career.title);
      expect(career.responsibilities.length).toBeGreaterThan(0);
      expect(career.roadmap.length).toBeGreaterThan(0);
    }
  });

  it("usa fallback determinístico para ids inválidos", () => {
    expect(careerById(999).id).toBe(careerCatalog[0].id);
  });
});

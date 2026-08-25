// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { specializationsCatalog } from "./specializationsCatalog";

describe("Specializations Catalog", () => {
  it("contém sete áreas detalhadas de inteligência artificial", () => {
    expect(specializationsCatalog).toHaveLength(7);
    expect(specializationsCatalog.map(s => s.id)).toContain("ai-frontend");
    expect(specializationsCatalog.map(s => s.id)).toContain("ai-backend");
    expect(specializationsCatalog.map(s => s.id)).toContain("ai-devops");
    expect(specializationsCatalog.map(s => s.id)).toContain("ai-data");
    expect(specializationsCatalog.map(s => s.id)).toContain("ai-research");
    expect(specializationsCatalog.map(s => s.id)).toContain("ai-product");
    expect(specializationsCatalog.map(s => s.id)).toContain("ai-vision");
  });

  it("possui conceitos e stack tecnológica válidos para cada especialização", () => {
    specializationsCatalog.forEach(spec => {
      expect(spec.title.length).toBeGreaterThan(5);
      expect(spec.coreConcepts.length).toBeGreaterThan(0);
      expect(spec.techStack.length).toBeGreaterThan(0);
      expect(spec.careerImpact.length).toBeGreaterThan(10);
    });
  });
});

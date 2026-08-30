import { describe, expect, it } from "vitest";
import { freeCourses, freeCredentials, freeLearningCatalog } from "./freeLearningCatalog";

describe("free learning catalog", () => {
  it("contains official HTTPS sources from recognized providers", () => {
    expect(freeLearningCatalog.length).toBeGreaterThanOrEqual(7);
    expect(freeLearningCatalog.every(resource => resource.url.startsWith("https://"))).toBe(true);
    expect(new Set(freeLearningCatalog.map(resource => resource.id)).size).toBe(freeLearningCatalog.length);
    expect(new Set(freeLearningCatalog.map(resource => resource.provider))).toEqual(
      new Set(["Microsoft Learn", "Microsoft Applied Skills", "Google Skills", "AWS", "Kaggle", "Hugging Face"]),
    );
  });

  it("does not present paid professional exams as free credentials", () => {
    expect(freeCourses.every(resource => resource.kind === "Curso gratuito" || resource.kind === "Microcurso com certificado")).toBe(true);
    expect(freeCredentials.every(resource => resource.kind === "Badge / credencial" || resource.kind === "Microcurso com certificado")).toBe(true);
    expect(freeLearningCatalog.find(resource => resource.id === "microsoft-ai-foundations")?.accessNote).toContain("exame de certificação AI-901");
  });
});

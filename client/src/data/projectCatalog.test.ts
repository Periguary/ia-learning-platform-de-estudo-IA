import { describe, expect, it } from "vitest";
import { projects, projectsById } from "./projectCatalog";

describe("projectCatalog", () => {
  it("mantém os oito projetos práticos disponíveis por id", () => {
    expect(projects).toHaveLength(8);
    expect(Object.keys(projectsById)).toHaveLength(8);
    expect(projects.map((project) => project.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("fornece um guia mínimo para cada projeto", () => {
    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.overview.length).toBeGreaterThan(0);
      expect(project.objectives.length).toBeGreaterThanOrEqual(4);
      expect(project.steps.length).toBeGreaterThanOrEqual(5);
      expect(project.steps[0]?.code.length).toBeGreaterThan(0);
    }
  });

  it("não usa links vazios ou placeholders nos recursos", () => {
    for (const project of projects) {
      expect(project.resources.length).toBeGreaterThan(0);
      for (const resource of project.resources) {
        expect(resource.url).toMatch(/^https:\/\//);
        expect(resource.url).not.toBe("#");
      }
    }
  });
});

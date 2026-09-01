import { describe, expect, it } from "vitest";
import { coursesData } from "./coursesData";
import { learningPhases } from "./learningCatalog";

describe("learning catalog", () => {
  it("keeps eight phases with only existing course modules", () => {
    expect(learningPhases).toHaveLength(8);

    for (const phase of learningPhases) {
      expect(phase.modules.length).toBeGreaterThan(0);
      for (const module of phase.modules) {
        expect(coursesData[module.id]).toBeDefined();
        expect(module.lessons).toBe(coursesData[module.id].lessons);
      }
    }
  });

  it("keeps the displayed phase/module URLs addressable", () => {
    for (const phase of learningPhases) {
      for (const module of phase.modules) {
        expect(`/course/${phase.id}/${module.id}`).toMatch(/^\/course\/\d+\/[^/]+$/);
      }
    }
  });

  it("includes the new image, cognitive and generative learning modules", () => {
    const requiredModules = ["image-processing", "convolutional-neural-networks", "cognitive-computing", "generative-neural-networks"];
    const moduleIds = learningPhases.flatMap(phase => phase.modules.map(module => module.id));
    expect(requiredModules.every(moduleId => moduleIds.includes(moduleId))).toBe(true);
    expect(requiredModules.every(moduleId => coursesData[moduleId].lessons >= 4)).toBe(true);
  });
});

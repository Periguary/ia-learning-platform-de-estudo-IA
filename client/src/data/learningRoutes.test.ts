import { describe, expect, it } from "vitest";
import { getPhaseEntryRoute, phaseEntryRoutes } from "./learningRoutes";

describe("learning phase entry routes", () => {
  it("maps every displayed phase to an existing course route", () => {
    expect(Object.keys(phaseEntryRoutes)).toHaveLength(8);

    for (const [phaseId, route] of Object.entries(phaseEntryRoutes)) {
      expect(route).toMatch(new RegExp(`^/course/${phaseId}/[^/]+$`));
      expect(route).not.toContain("/overview");
    }
  });

  it("falls back to the learning path for an unknown phase", () => {
    expect(getPhaseEntryRoute(99)).toBe("/learning-path");
  });
});

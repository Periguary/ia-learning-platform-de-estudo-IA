import { describe, expect, it } from "vitest";
import { businessChallenges, challengesByModule } from "./challengesCatalog";

describe("businessChallenges", () => {
  it("oferece um desafio prático para os principais módulos da trilha", () => {
    expect(businessChallenges.length).toBeGreaterThanOrEqual(10);
    expect(challengesByModule["computer-vision"].company).toBe("Fábrica Horizonte");
    expect(challengesByModule["computer-vision"].acceptanceCriteria.length).toBeGreaterThan(1);
  });

  it("mantém entregáveis, critérios e stack em cada cenário", () => {
    for (const challenge of businessChallenges) {
      expect(challenge.scenario.length).toBeGreaterThan(20);
      expect(challenge.steps.length).toBeGreaterThanOrEqual(3);
      expect(challenge.acceptanceCriteria.length).toBeGreaterThanOrEqual(2);
      expect(challenge.stack.length).toBeGreaterThanOrEqual(2);
    }
  });
});

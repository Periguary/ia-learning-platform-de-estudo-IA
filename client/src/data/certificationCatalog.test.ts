import { describe, expect, it } from "vitest";
import { certificationById, certificationCatalog } from "./certificationCatalog";

describe("certificationCatalog", () => {
  it("mantém seis certificações com links oficiais HTTPS", () => {
    expect(certificationCatalog).toHaveLength(6);
    expect(new Set(certificationCatalog.map((certification) => certification.id)).size).toBe(6);
    for (const certification of certificationCatalog) {
      expect(certification.url).toMatch(/^https:\/\//);
      expect(certification.topics.length).toBeGreaterThan(0);
      expect(certification.exam.duration).toBeTruthy();
    }
  });

  it("usa fallback determinístico para ids inválidos", () => {
    expect(certificationById(999).id).toBe(certificationCatalog[0].id);
  });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Dashboard - Futuristic HUD regressions", () => {
  const source = readFileSync(new URL("./Dashboard.tsx", import.meta.url), "utf8");

  it("uses the shared futuristic surface language", () => {
    expect(source).toContain("futurist-grid");
    expect(source).toContain("futurist-panel");
    expect(source).toContain("IA ACADEMY // MISSION CONTROL");
  });

  it("renders HUD metrics from real progress values", () => {
    expect(source).toContain("Núcleo de aprendizagem");
    expect(source).toContain("completedLessons");
    expect(source).toContain("completedModules");
    expect(source).toContain("progressData");
    expect(source).toContain("aria-label={`Progresso geral: ${overallProgress}%`}");
    expect(source).toContain("conic-gradient");
  });

  it("keeps reduced-motion support in the shared CSS contract", () => {
    const css = readFileSync(new URL("../index.css", import.meta.url), "utf8");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain(".futurist-button");
  });
});

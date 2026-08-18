import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("global theme contract", () => {
  const css = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

  it("keeps Tailwind 4 connected to the global stylesheet", () => {
    expect(css).toContain('@import "tailwindcss";');
    expect(css).toContain("@theme inline");
  });

  it("defines readable semantic color tokens for both themes", () => {
    expect(css).toContain(":root {");
    expect(css).toContain("html.light {");
    expect(css).toContain("html.dark {");
    expect(css).toContain("--color-background: hsl(var(--background));");
    expect(css).toContain("--color-foreground: hsl(var(--foreground));");
    expect(css).toContain("--color-primary: hsl(var(--primary));");
    expect(css).toContain("--color-card-foreground: hsl(var(--card-foreground));");
  });

  it("keeps the visual system's high-salience colors and typography", () => {
    expect(css).toContain("--primary: 182 100% 55%;");
    expect(css).toContain("--secondary: 275 100% 68%;");
    expect(css).toContain("--accent: 74 100% 58%;");
    expect(css).toContain('font-family: "Inter", sans-serif;');
    expect(css).toContain(".futurist-grid");
    expect(css).toContain(".futurist-panel");
    expect(css).toContain(".futurist-button");
  });
});

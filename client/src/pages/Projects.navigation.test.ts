import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const projectsPage = readFileSync(new URL("./Projects.tsx", import.meta.url), "utf8");

describe("Projects navigation contract", () => {
  it("renders the catalog and sends each card to its project detail route", () => {
    expect(projectsPage).toContain("projects.map");
    expect(projectsPage).toContain("navigate(`/project/${project.id}`)");
    expect(projectsPage).not.toContain('href=\"#\"');
  });

  it("keeps a real return route to the learning path", () => {
    expect(projectsPage).toContain('navigate("/learning-path")');
  });
});

import { describe, it, expect } from "vitest";
import { coursesData } from "./coursesData";

describe("coursesData", () => {
  it("should have all 8 modules for the 8 learning phases", () => {
    const expectedModules = [
      "linear-algebra",
      "statistics",
      "probability",
      "python-basics",
      "sql-basics",
      "numpy",
      "pandas",
      "ml-fundamentals",
      "neural-networks",
      "llms",
      "software-engineering"
    ];

    expectedModules.forEach((module) => {
      expect(coursesData).toHaveProperty(module);
    });
  });

  it("should have sql-basics module with correct structure", () => {
    const sqlBasics = coursesData["sql-basics"];
    expect(sqlBasics).toBeDefined();
    expect(sqlBasics.title).toBe("SQL Básico");
    expect(sqlBasics.phase).toBe(3);
    expect(sqlBasics.sections).toBeDefined();
    expect(sqlBasics.sections.length).toBeGreaterThan(0);
  });

  it("should have numpy module with correct structure", () => {
    const numpy = coursesData["numpy"];
    expect(numpy).toBeDefined();
    expect(numpy.title).toBe("NumPy");
    expect(numpy.phase).toBe(4);
    expect(numpy.lessons).toBe(8);
  });

  it("should have pandas module with correct structure", () => {
    const pandas = coursesData["pandas"];
    expect(pandas).toBeDefined();
    expect(pandas.title).toBe("Pandas");
    expect(pandas.phase).toBe(4);
    expect(pandas.lessons).toBe(10);
  });

  it("should have ml-fundamentals module with correct structure", () => {
    const mlFundamentals = coursesData["ml-fundamentals"];
    expect(mlFundamentals).toBeDefined();
    expect(mlFundamentals.title).toBe("Fundamentos ML");
    expect(mlFundamentals.phase).toBe(5);
  });

  it("should have neural-networks module with correct structure", () => {
    const neuralNetworks = coursesData["neural-networks"];
    expect(neuralNetworks).toBeDefined();
    expect(neuralNetworks.title).toBe("Redes Neurais");
    expect(neuralNetworks.phase).toBe(6);
  });

  it("should have llms module with correct structure", () => {
    const llms = coursesData["llms"];
    expect(llms).toBeDefined();
    expect(llms.title).toBe("LLMs");
    expect(llms.phase).toBe(7);
  });

  it("should have software-engineering module with correct structure", () => {
    const softwareEngineering = coursesData["software-engineering"];
    expect(softwareEngineering).toBeDefined();
    expect(softwareEngineering.title).toBe("Engenharia de Software");
    expect(softwareEngineering.phase).toBe(8);
  });

  it("should have all modules with required fields", () => {
    Object.entries(coursesData).forEach(([key, module]) => {
      expect(module).toHaveProperty("title");
      expect(module).toHaveProperty("description");
      expect(module).toHaveProperty("phase");
      expect(module).toHaveProperty("difficulty");
      expect(module).toHaveProperty("duration");
      expect(module).toHaveProperty("lessons");
      expect(module).not.toHaveProperty("rating");
      expect(module).not.toHaveProperty("reviews");
      expect(module).toHaveProperty("sections");
      expect(Array.isArray(module.sections)).toBe(true);
    });
  });

  it("should have valid phase numbers", () => {
    Object.entries(coursesData).forEach(([key, module]) => {
      expect(module.phase).toBeGreaterThanOrEqual(1);
      expect(module.phase).toBeLessThanOrEqual(8);
    });
  });

  it("should not expose fabricated ratings or review counts", () => {
    Object.values(coursesData).forEach((module) => {
      expect(module.rating).toBeUndefined();
      expect(module.reviews).toBeUndefined();
    });
  });
});


describe("learning path lesson availability", () => {
  it("exposes a valid first lesson with content for every module", async () => {
    const { lessonsContentData } = await import("./coursesData");
    const moduleIds = [
      "linear-algebra",
      "statistics",
      "probability",
      "python-basics",
      "sql-basics",
      "numpy",
      "pandas",
      "ml-fundamentals",
      "neural-networks",
      "llms",
      "software-engineering",
    ];

    moduleIds.forEach((moduleId) => {
      const course = coursesData[moduleId];
      const firstLesson = course.sections?.[0]?.lessons?.[0];
      const content = lessonsContentData[moduleId]?.[firstLesson?.id];

      expect(firstLesson, `missing first lesson: ${moduleId}`).toBeDefined();
      expect(content, `missing lesson content: ${moduleId}`).toBeDefined();
      expect(content.title).toBeTruthy();
      expect(content.content).toBeTruthy();
    });
  });
});

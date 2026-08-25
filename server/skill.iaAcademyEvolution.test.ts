import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

describe("IA Academy Evolution Skill Validation", () => {
  const skillPath = path.resolve("/home/ubuntu/skills/ia-academy-evolution/SKILL.md");

  it("existe no caminho esperado", () => {
    expect(fs.existsSync(skillPath)).toBe(true);
  });

  it("contém metadados frontmatter válidos com nome e descrição", () => {
    const content = fs.readFileSync(skillPath, "utf-8");
    expect(content).toContain("name: ia-academy-evolution");
    expect(content).toContain("description:");
  });

  it("descreve as fases metodológicas essenciais (planejamento, schema, IA e testes)", () => {
    const content = fs.readFileSync(skillPath, "utf-8");
    expect(content).toContain("Planejamento Baseado em Requisitos");
    expect(content).toContain("Arquitetura Full-Stack e Banco de Dados");
    expect(content).toContain("Integração com IA");
    expect(content).toContain("Testes Automatizados e Validação");
  });
});

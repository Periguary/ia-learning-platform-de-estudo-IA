// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { curiositiesCatalog } from "./curiositiesCatalog";
import { libraryCatalog } from "./libraryCatalog";

describe("Extra Catalogs", () => {
  it("contém itens válidos de curiosidades com categorias e leituras", () => {
    expect(curiositiesCatalog.length).toBeGreaterThan(0);
    for (const item of curiositiesCatalog) {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.content.length).toBeGreaterThan(20);
    }
  });

  it("contém itens válidos na biblioteca com links oficiais e formatos", () => {
    expect(libraryCatalog.length).toBeGreaterThan(0);
    for (const item of libraryCatalog) {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.author).toBeTruthy();
      expect(item.officialUrl).toContain("http");
    }
  });
});

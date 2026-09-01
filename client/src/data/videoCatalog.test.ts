import { describe, expect, it } from "vitest";
import { videoCatalog } from "./videoCatalog";

describe("Video Catalog", () => {
  it("contém vídeo-aulas gratuitas com fontes oficiais e links reproduzíveis", () => {
    expect(videoCatalog.length).toBeGreaterThanOrEqual(3);
    for (const video of videoCatalog) {
      expect(video.sourceUrl).toContain("http");
      expect(video.embedUrl).toContain("http");
      expect(video.freeNote).toBeTruthy();
    }
  });

  it("inclui visão computacional, CNNs, computação cognitiva e redes generativas", () => {
    const categories = new Set(videoCatalog.map(video => video.category));
    expect(categories.has("Visão Computacional")).toBe(true);
    expect(categories.has("Redes Neurais")).toBe(true);
    expect(categories.has("Computação Cognitiva")).toBe(true);
    expect(categories.has("Redes Generativas")).toBe(true);
  });

  it("não hospeda cópias e mantém links em HTTPS para fontes oficiais", () => {
    expect(videoCatalog.every(video => video.sourceUrl.startsWith("https://"))).toBe(true);
    expect(videoCatalog.some(video => /fonte oficial|fonte original|hospedado pelo desenvolvedor/i.test(video.freeNote))).toBe(true);
  });
});

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
});

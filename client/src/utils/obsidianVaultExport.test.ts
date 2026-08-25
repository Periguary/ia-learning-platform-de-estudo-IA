import { describe, expect, it } from "vitest";
import { createObsidianVaultFiles } from "./obsidianVaultExport";

describe("obsidianVaultExport", () => {
  it("gera índice, README e uma nota por vídeo com frontmatter e timestamps", () => {
    const files = createObsidianVaultFiles(
      [
        { videoId: "video-b", timestampSeconds: 90, noteText: "Segunda anotação" },
        { videoId: "video-a", timestampSeconds: 12, noteText: "Primeira anotação" },
      ],
      [
        { id: "video-a", title: "Fundamentos de IA", provider: "Google", sourceUrl: "https://example.com/a" },
        { id: "video-b", title: "RAG na prática", provider: "Hugging Face", sourceUrl: "https://example.com/b" },
      ],
      new Date("2026-08-18T12:00:00.000Z"),
    );

    expect(files.map(file => file.path)).toEqual(["00-Índice.md", "README.md", "Videos/fundamentos-de-ia.md", "Videos/rag-na-pratica.md"]);
    expect(files[0].content).toContain("[[Videos/fundamentos-de-ia]]");
    expect(files[2].content).toContain("video_id: video-a");
    expect(files[2].content).toContain("[0:12] Primeira anotação");
  });
});

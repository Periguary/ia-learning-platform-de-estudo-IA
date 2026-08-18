export type ObsidianNote = {
  videoId: string;
  timestampSeconds: number;
  noteText: string;
  createdAt?: Date | string | null;
};

export type ObsidianVideo = {
  id: string;
  title: string;
  provider: string;
  sourceUrl: string;
};

export type ObsidianVaultFile = {
  path: string;
  content: string;
};

const slugify = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "") || "nota";

const formatTimestamp = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export function createObsidianVaultFiles(notes: ObsidianNote[], videos: ObsidianVideo[], exportedAt = new Date()): ObsidianVaultFile[] {
  const grouped = new Map<string, ObsidianNote[]>();
  notes.forEach(note => grouped.set(note.videoId, [...(grouped.get(note.videoId) || []), note]));
  const byId = new Map(videos.map(video => [video.id, video]));
  const videoFiles = Array.from(grouped.entries()).map(([videoId, videoNotes]) => {
    const video = byId.get(videoId);
    const title = video?.title || videoId;
    const sortedNotes = [...videoNotes].sort((a, b) => a.timestampSeconds - b.timestampSeconds);
    const noteLines = sortedNotes.map(note => `- [${formatTimestamp(note.timestampSeconds)}] ${note.noteText}`).join("\n");
    const content = `---\ntags: [ia-academy, notas, estudo]\nvideo_id: ${videoId}\nprovedor: ${video?.provider || "Não informado"}\nfonte: ${video?.sourceUrl || ""}\n---\n\n# ${title}\n\n${video ? `**Provedor:** ${video.provider}  \n**Fonte original:** ${video.sourceUrl}\n\n` : ""}## Anotações com timestamps\n\n${noteLines || "Nenhuma anotação registrada."}\n`;
    return { path: `Videos/${slugify(title)}.md`, content };
  }).sort((left, right) => left.path.localeCompare(right.path, "pt-BR"));
  const links = videoFiles.map(file => `- [[${file.path.replace(/\.md$/, "")}]]`).join("\n");
  const index = `---\ntags: [ia-academy, indice, estudo]\nexportado: ${exportedAt.toISOString()}\n---\n\n# IA Academy — Índice do Vault\n\nEste índice reúne ${notes.length} anotações distribuídas em ${videoFiles.length} vídeo-aulas.\n\n## Notas por vídeo\n\n${links || "Nenhuma nota exportada."}\n\n## Como usar\n\nAbra cada nota para revisar timestamps, fontes e conexões com os conteúdos da IA Academy.\n`;
  const readme = `# IA Academy — Vault de Estudos\n\nEsta pasta foi gerada pela plataforma IA Academy para uso no Obsidian. O arquivo **00-Índice.md** organiza as notas por vídeo; a pasta **Videos/** contém uma nota independente para cada aula com timestamps clicáveis como referência de estudo.\n\nExportado em: ${exportedAt.toLocaleString("pt-BR")}\n`;
  return [
    { path: "00-Índice.md", content: index },
    { path: "README.md", content: readme },
    ...videoFiles,
  ];
}

export function downloadObsidianVaultFiles(files: ObsidianVaultFile[]) {
  files.forEach((file, index) => {
    const blob = new Blob([file.content], { type: "text/markdown;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `IA-Academy-${file.path.replaceAll("/", "__")}`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 250 + index * 25);
  });
}

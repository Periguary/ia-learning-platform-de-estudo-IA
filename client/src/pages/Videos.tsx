import React, { useState, useEffect } from "react";
import { ExternalLink, Play, Video, Youtube, CheckCircle2, Circle, Sparkles, Calendar, BookOpen, FileText, Clock, Trash2, Download, ExternalLink as LinkIcon, Settings2, Copy, NotebookPen } from "lucide-react";
import { videoCatalog, type VideoCategory, type VideoItem } from "@/data/videoCatalog";
import { Button } from "@/components/ui/button";
import { ShareActions } from "@/components/ShareActions";
import { AIAssistantBox } from "@/components/AIAssistantBox";
import { trpc } from "@/lib/trpc";
import { createObsidianVaultFiles, downloadObsidianVaultFiles } from "@/utils/obsidianVaultExport";

const categories: VideoCategory[] = ["Fundamentos", "Machine Learning", "LLMs e Transformers", "IA Responsável", "Visão Computacional", "Redes Neurais", "Computação Cognitiva", "Redes Generativas"];

const withStartTime = (url: string, seconds: number) => {
  if (!seconds) return url;
  return `${url}${url.includes("?") ? "&" : "?"}start=${seconds}`;
};

export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(videoCatalog[0]);
  const [completedVideos, setCompletedVideos] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("ia_academy_completed_videos");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Notebook LM & Obsidian Notes state
  const [currentTimestampMin, setCurrentTimestampMin] = useState<number>(0);
  const [currentTimestampSec, setCurrentTimestampSec] = useState<number>(0);
  const [noteInput, setNoteInput] = useState<string>("");
  const [playerStartSeconds, setPlayerStartSeconds] = useState(0);
  const [generatedMaterial, setGeneratedMaterial] = useState<string | null>(null);
  const [showPdfOptions, setShowPdfOptions] = useState(false);
  const [pdfSections, setPdfSections] = useState({ metadata: true, notes: true, generatedMaterial: true });

  const favoritesQuery = trpc.ai.favorites.useQuery();
  const notesQuery = trpc.videoNotes.list.useQuery({ videoId: selectedVideo.id });
  const allNotesQuery = trpc.videoNotes.all.useQuery();
  const addNoteMutation = trpc.videoNotes.add.useMutation({
    onSuccess: () => {
      setNoteInput("");
      notesQuery.refetch();
    },
  });
  const removeNoteMutation = trpc.videoNotes.remove.useMutation({
    onSuccess: () => notesQuery.refetch(),
  });
  const summarizeNotesMutation = trpc.ai.summarizeNotes.useMutation({
    onSuccess: ({ answer }) => setGeneratedMaterial(answer),
  });

  useEffect(() => {
    try {
      localStorage.setItem("ia_academy_completed_videos", JSON.stringify(completedVideos));
    } catch {
      // ignore
    }
  }, [completedVideos]);

  const toggleComplete = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedVideos(prev => ({ ...prev, [videoId]: !prev[videoId] }));
  };

  const filteredVideos = selectedCategory === "Todos" ? videoCatalog : videoCatalog.filter(video => video.category === selectedCategory);
  const isSelectedCompleted = !!completedVideos[selectedVideo.id];

  const generateWeeklyPlan = () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      const savedItems = favoritesQuery.data || [];
      const plan = `### 📅 Seu Plano de Estudos Personalizado (IA Academy)

**Meta da Semana:** Consolidar fundamentos e aplicar IA prática combinando vídeo-aulas oficiais e sua lista de leitura.

* **Segunda e Terça (Fundamentos & Vídeos):**
  * Assistir a *Introduction to Generative AI* e *Machine Learning Crash Course* (disponíveis na aba Vídeos).
  * Marcar aulas como concluídas para acompanhar seu avanço.
* **Quarta e Quinta (Leituras & Prática):**
  * Estudar os itens salvos na sua Lista de Leitura: **${savedItems.length > 0 ? savedItems.join(", ") : "Deep Learning Book e Attention Is All You Need"}**.
  * Executar exemplos práticos no Google Colab ou VS Code.
* **Sexta a Domingo (Tutor IA & Revisão):**
  * Utilizar o Tutor IA nas páginas de Curiosidades e Biblioteca para tirar dúvidas pontuais.
  * Revisar conceitos de IA Responsável e segurança de modelos.`;

      setStudyPlan(plan);
      setIsGeneratingPlan(false);
    }, 800);
  };

  const seekToTimestamp = (seconds: number) => {
    setPlayerStartSeconds(seconds);
    document.getElementById("video-player")?.scrollIntoView?.({ behavior: "smooth", block: "center" });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    const totalSeconds = (currentTimestampMin * 60) + currentTimestampSec;
    addNoteMutation.mutate({
      videoId: selectedVideo.id,
      timestampSeconds: totalSeconds,
      noteText: noteInput.trim(),
    });
  };

  const exportNotesMarkdown = () => {
    const notes = notesQuery.data || [];
    let md = `# Notebook de Estudo: ${selectedVideo.title}\n\n`;
    md += `* **Provedor:** ${selectedVideo.provider}\n`;
    md += `* **Link Original:** ${selectedVideo.sourceUrl}\n\n## Anotações com Timestamp\n\n`;
    notes.forEach(n => {
      const mins = Math.floor(n.timestampSeconds / 60);
      const secs = n.timestampSeconds % 60;
      const timeStr = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      md += `* **[${timeStr}]** ${n.noteText}\n`;
    });
    md += `\n---\nGerado por IA Academy - Notebook LM & Obsidian Sync\n`;

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedVideo.id}-obsidian-notes.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAllNotesToObsidian = () => {
    const allNotes = allNotesQuery.data || [];
    if (allNotes.length === 0) {
      alert("Salve pelo menos uma anotação em uma vídeo-aula antes de exportar em lote.");
      return;
    }
    const files = createObsidianVaultFiles(allNotes, videoCatalog);
    downloadObsidianVaultFiles(files);
    const vaultName = prompt("Digite o nome do seu Vault no Obsidian para abrir o índice (opcional):", "IA-Academy");
    if (vaultName) {
      const indexFile = files.find(file => file.path === "00-Índice.md");
      const uri = `obsidian://new?vault=${encodeURIComponent(vaultName)}&file=${encodeURIComponent("IA Academy/00-Índice")}&content=${encodeURIComponent(indexFile?.content || "")}`;
      window.open(uri, "_blank", "noopener,noreferrer");
    }
  };

  const openObsidianVault = () => {
    const notes = notesQuery.data || [];
    let md = `# ${selectedVideo.title}\n\n`;
    notes.forEach(n => {
      const mins = Math.floor(n.timestampSeconds / 60);
      const secs = n.timestampSeconds % 60;
      md += `- [${mins}:${secs < 10 ? "0" : ""}${secs}] ${n.noteText}\n`;
    });
    const encoded = encodeURIComponent(md);
    const vaultName = prompt("Digite o nome do seu Vault no Obsidian (ex: MeuVault):", "IA-Academy");
    if (!vaultName) return;
    const uri = `obsidian://new?vault=${encodeURIComponent(vaultName)}&file=${encodeURIComponent(selectedVideo.title)}&content=${encoded}`;
    window.open(uri, "_blank", "noopener,noreferrer");
  };

  const prepareForGeminiNotebook = async () => {
    const notes = notesQuery.data || [];
    const noteLines = notes.map(note => {
      const mins = Math.floor(note.timestampSeconds / 60);
      const secs = note.timestampSeconds % 60;
      return `- [${mins}:${secs < 10 ? "0" : ""}${secs}] ${note.noteText}`;
    }).join("\n");
    const sections = [
      pdfSections.metadata ? `# ${selectedVideo.title}\n\n- Provedor: ${selectedVideo.provider}\n- Fonte original: ${selectedVideo.sourceUrl}` : "",
      pdfSections.notes ? `## Anotações com timestamps\n\n${noteLines || "Nenhuma anotação registrada."}` : "",
      pdfSections.generatedMaterial && generatedMaterial ? `## Resumo ou guia de estudos gerado por IA\n\n${generatedMaterial}` : "",
    ].filter(Boolean).join("\n\n");
    const blob = new Blob([sections], { type: "text/markdown;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `${selectedVideo.id}-gemini-notebook.md`;
    link.click();
    URL.revokeObjectURL(objectUrl);
    try {
      await navigator.clipboard.writeText(`${selectedVideo.sourceUrl}\n${sections}`);
      alert("Markdown baixado e fonte copiada. Abra o Gemini Notebook e adicione o arquivo e a URL como fontes.");
    } catch {
      alert("Markdown baixado. Abra o Gemini Notebook e adicione o arquivo e a URL da aula como fontes.");
    }
    window.open("https://notebooklm.google/", "_blank", "noopener,noreferrer");
  };

  const exportNotesPdf = () => {
    const notes = notesQuery.data || [];
    if (!pdfSections.metadata && !pdfSections.notes && !pdfSections.generatedMaterial) {
      alert("Selecione pelo menos uma seção para exportar.");
      return;
    }
    const escapeHtml = (value: string) => value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
    const notesHtml = notes.map(n => {
      const mins = Math.floor(n.timestampSeconds / 60);
      const secs = n.timestampSeconds % 60;
      const timeLabel = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      return `<div class="note-card"><span class="time">[${timeLabel}]</span> ${escapeHtml(n.noteText)}</div>`;
    }).join("");
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Permita pop-ups para gerar o PDF.");
      return;
    }
    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <title>IA Academy - ${escapeHtml(selectedVideo.title)}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
          h1 { color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 12px; }
          .meta { color: #6b7280; margin-bottom: 24px; font-size: 14px; }
          .note-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
          .time { font-family: monospace; font-weight: bold; color: #2563eb; }
          .material { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin-top: 24px; white-space: pre-line; }
        </style>
      </head>
      <body>
        ${pdfSections.metadata ? `<h1>${escapeHtml(selectedVideo.title)}</h1><div class="meta">Plataforma IA Academy — Notebook LM & Obsidian Sync<br>Provedor: ${escapeHtml(selectedVideo.provider)}<br>Fonte original: ${escapeHtml(selectedVideo.sourceUrl)}</div>` : ""}
        ${pdfSections.notes ? `<h2>Anotações com Timestamps (${notes.length})</h2>${notes.length === 0 ? "<p>Nenhuma anotação registrada.</p>" : notesHtml}` : ""}
        ${pdfSections.generatedMaterial && generatedMaterial ? `<h2>Material Gerado por IA / Guia de Estudos</h2><div class="material">${escapeHtml(generatedMaterial)}</div>` : ""}
        <script>window.print();</script>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="w-full">
      <section className="border-b border-border bg-gradient-to-br from-red-500/10 via-background to-primary/10 py-16">
        <div className="container space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-sm text-red-400">
            <Video className="size-4" />
            Vídeo-aulas gratuitas de IA
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Aprenda IA assistindo e praticando</h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Playlists, cursos e coleções oficiais gratuitos sobre fundamentos, Machine Learning, visão computacional, CNNs, computação cognitiva e redes generativas. Acompanhe seu progresso, anote com timestamps sincronizados e emparelhe seus estudos com o Obsidian. A plataforma aponta para as fontes originais e não copia nem redistribui vídeos de terceiros.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={generateWeeklyPlan} disabled={isGeneratingPlan} className="gap-2">
              <Sparkles className="size-4" />
              {isGeneratingPlan ? "Gerando plano personalizado..." : "Gerar Plano de Estudos Semanal (IA)"}
            </Button>
            <span className="text-xs text-muted-foreground">Baseado no seu progresso e Lista de Leitura</span>
          </div>

          {studyPlan && (
            <div className="rounded-xl border border-primary/30 bg-card p-6 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                  <Calendar className="size-5" /> Plano Semanal Gerado pela IA
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setStudyPlan(null)}>Fechar</Button>
              </div>
              <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{studyPlan}</div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant={selectedCategory === "Todos" ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory("Todos")}>Todos os vídeos</Button>
            {categories.map(category => (
              <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category)}>{category}</Button>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12 space-y-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl space-y-6">
            <div id="video-player" className="aspect-video bg-black">
              {selectedVideo.embedUrl.includes("youtube.com") ? (
                <iframe key={`${selectedVideo.id}-${playerStartSeconds}`} className="h-full w-full" src={withStartTime(selectedVideo.embedUrl, playerStartSeconds)} title={selectedVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-white">
                  <Video className="size-12 text-primary" />
                  <p>Este recurso é uma aula oficial hospedada na página do Google AI.</p>
                  <Button asChild><a href={selectedVideo.sourceUrl} target="_blank" rel="noreferrer">Abrir aula oficial <ExternalLink className="ml-2 size-4" /></a></Button>
                </div>
              )}
            </div>

            <div className="space-y-4 p-6 pt-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{selectedVideo.category}</span>
                  <button type="button" onClick={(e) => toggleComplete(selectedVideo.id, e)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${isSelectedCompleted ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                    {isSelectedCompleted ? <CheckCircle2 className="size-3.5" /> : <Circle className="size-3.5" />}
                    {isSelectedCompleted ? "Aula Concluída" : "Marcar Concluída"}
                  </button>
                </div>
                <ShareActions title={selectedVideo.title} text={`Assista à aula gratuita de IA: ${selectedVideo.title}`} url={selectedVideo.sourceUrl} />
              </div>

              <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{selectedVideo.description}</p>
              <p className="text-xs text-secondary">{selectedVideo.freeNote} Fonte: {selectedVideo.provider}.</p>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button asChild variant="outline" size="sm"><a href={selectedVideo.sourceUrl} target="_blank" rel="noreferrer"><Youtube className="mr-2 size-4 text-red-400" />Abrir fonte original</a></Button>
                {selectedVideo.colabUrl && <Button asChild variant="outline" size="sm"><a href={selectedVideo.colabUrl} target="_blank" rel="noreferrer">Abrir Colab / prática</a></Button>}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Catálogo gratuito</p>
            {filteredVideos.map(video => {
              const completed = !!completedVideos[video.id];
              const isCurrent = selectedVideo.id === video.id;
              return (
                <div key={video.id} className={`flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left transition-all ${isCurrent ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"}`}>
                  <button type="button" onClick={() => setSelectedVideo(video)} className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400"><Play className="size-5 fill-current" /></div>
                    <span className="min-w-0">
                      <strong className="block truncate text-sm">{video.title}</strong>
                      <span className="mt-1 block text-xs text-muted-foreground">{video.provider} · {video.durationLabel}</span>
                    </span>
                  </button>
                  <button type="button" onClick={(e) => toggleComplete(video.id, e)} title={completed ? "Concluído" : "Marcar como concluído"} className={`shrink-0 rounded-full p-2 transition-colors ${completed ? "text-emerald-400 hover:bg-emerald-500/10" : "text-muted-foreground hover:bg-muted"}`}>
                    {completed ? <CheckCircle2 className="size-5" /> : <Circle className="size-5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notebook LM & Obsidian Sync: Anotações vinculadas ao vídeo com timestamp */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Notebook LM da Aula & Obsidian Sync</h3>
                <p className="text-xs text-muted-foreground">Faça anotações sincronizadas com o tempo do vídeo (timestamps), reuna fontes e exporte diretamente para seu Obsidian Vault.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={exportNotesMarkdown} className="gap-1.5">
                <Download className="size-4" /> Baixar Markdown (.md)
              </Button>
              <Button variant="outline" size="sm" onClick={openObsidianVault} className="gap-1.5 text-purple-400 border-purple-500/30 hover:bg-purple-500/10">
                <LinkIcon className="size-4" /> Emparelhar com Obsidian
              </Button>
              <Button variant="outline" size="sm" disabled={!allNotesQuery.data?.length} onClick={exportAllNotesToObsidian} className="gap-1.5 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10">
                <Download className="size-4" /> Exportar todas ({allNotesQuery.data?.length || 0})
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowPdfOptions(value => !value)} aria-expanded={showPdfOptions} aria-controls="pdf-export-options" className="gap-1.5">
                <Settings2 className="size-4" /> Seções do PDF
              </Button>
              <Button variant="outline" size="sm" onClick={exportNotesPdf} className="gap-1.5 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10">
                <Download className="size-4" /> Baixar PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => void prepareForGeminiNotebook()} className="gap-1.5 text-amber-300 border-amber-500/30 hover:bg-amber-500/10">
                <NotebookPen className="size-4" /> Preparar Gemini Notebook
              </Button>
              <Button variant="outline" size="sm" disabled={!notesQuery.data?.length || summarizeNotesMutation.isPending} onClick={() => summarizeNotesMutation.mutate({ videoId: selectedVideo.id, videoTitle: selectedVideo.title, mode: "summary" })} className="gap-1.5">
                <Sparkles className="size-4" /> Gerar Resumo IA
              </Button>
              <Button variant="outline" size="sm" disabled={!notesQuery.data?.length || summarizeNotesMutation.isPending} onClick={() => summarizeNotesMutation.mutate({ videoId: selectedVideo.id, videoTitle: selectedVideo.title, mode: "guide" })} className="gap-1.5">
                <BookOpen className="size-4" /> Guia de Estudos
              </Button>
            </div>
          </div>

          {showPdfOptions && (
            <div id="pdf-export-options" className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4" aria-label="Seções incluídas no PDF">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-foreground">Personalizar o PDF</h4>
                  <p className="text-xs text-muted-foreground">Escolha o que deseja levar para a revisão ou para o Gemini Notebook.</p>
                </div>
                <span className="text-xs text-muted-foreground">{Object.values(pdfSections).filter(Boolean).length}/3 selecionadas</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {([
                  ["metadata", "Informações da aula"],
                  ["notes", "Notas com timestamps"],
                  ["generatedMaterial", "Resumo ou guia de estudos"],
                ] as const).map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background/60 p-3 text-sm transition-colors hover:border-primary/40">
                    <input
                      type="checkbox"
                      checked={pdfSections[key]}
                      onChange={event => setPdfSections(previous => ({ ...previous, [key]: event.target.checked }))}
                      className="size-4 accent-primary"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleAddNote} className="grid gap-4 sm:grid-cols-[auto_1fr_auto]">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
              <Clock className="size-4 text-muted-foreground" />
              <input type="number" min="0" max="999" value={currentTimestampMin} onChange={e => setCurrentTimestampMin(Number(e.target.value))} className="w-12 bg-transparent text-center font-mono text-sm outline-none" placeholder="min" />
              <span>:</span>
              <input type="number" min="0" max="59" value={currentTimestampSec} onChange={e => setCurrentTimestampSec(Number(e.target.value))} className="w-12 bg-transparent text-center font-mono text-sm outline-none" placeholder="seg" />
            </div>
            <input type="text" value={noteInput} onChange={e => setNoteInput(e.target.value)} placeholder="Digite sua anotação sincronizada com este momento da aula..." className="rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary" />
            <Button type="submit" disabled={addNoteMutation.isPending} className="gap-2">
              Salvar Nota
            </Button>
          </form>

          {generatedMaterial && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h4 className="font-semibold text-primary flex items-center gap-2"><Sparkles className="size-4" /> Material gerado com suas anotações</h4>
                <Button variant="ghost" size="sm" onClick={() => setGeneratedMaterial(null)}>Fechar</Button>
              </div>
              <div className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{generatedMaterial}</div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Suas Anotações e Fontes ({notesQuery.data?.length || 0})</h4>
            {notesQuery.isLoading ? (
              <p className="text-sm text-muted-foreground py-4">Carregando anotações...</p>
            ) : notesQuery.data && notesQuery.data.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {notesQuery.data.map(note => {
                  const mins = Math.floor(note.timestampSeconds / 60);
                  const secs = note.timestampSeconds % 60;
                  const timeLabel = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
                  return (
                    <div key={note.id} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 p-4">
                      <div className="space-y-1">
                        <button type="button" onClick={() => seekToTimestamp(note.timestampSeconds)} className="inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary transition-colors hover:bg-primary/20" title={`Ir para ${timeLabel}`}>
                          <Clock className="size-3" /> {timeLabel}
                        </button>
                        <p className="text-sm leading-relaxed text-foreground">{note.noteText}</p>
                      </div>
                      <button type="button" onClick={() => removeNoteMutation.mutate({ noteId: note.id, videoId: selectedVideo.id })} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
                <FileText className="mx-auto size-8 opacity-40 mb-2" />
                <p className="text-sm">Nenhuma anotação registrada para esta aula ainda.</p>
                <p className="text-xs text-muted-foreground mt-1">Informe o minuto/segundo acima e registre insights, fórmulas ou lembretes.</p>
              </div>
            )}
          </div>
        </div>

        {/* Tutor IA integrado à aba de vídeos */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Tutor IA da Aula: {selectedVideo.title}</h3>
              <p className="text-xs text-muted-foreground">Tire dúvidas técnicas, peça explicações sobre os conceitos abordados ou descubra como praticar no Google Colab.</p>
            </div>
          </div>
          <AIAssistantBox moduleId={`video-${selectedVideo.id}`} lessonTitle={selectedVideo.title} courseTitle={selectedVideo.provider} courseDescription={selectedVideo.description} studentNotes={(notesQuery.data || []).map(note => `[${Math.floor(note.timestampSeconds / 60)}:${String(note.timestampSeconds % 60).padStart(2, "0")}] ${note.noteText}`).join("\n")} />
        </div>
      </section>
    </div>
  );
}

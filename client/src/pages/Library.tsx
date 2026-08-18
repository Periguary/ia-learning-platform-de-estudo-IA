import React, { useEffect, useState } from "react";
import { BookMarked, Code, ExternalLink, FileText, FolderGit2, HardDrive, Search, Star, Bookmark, MessageSquare, Send, NotebookPen, Copy } from "lucide-react";
import { libraryCatalog, type LibraryCategory, type LibraryItem } from "@/data/libraryCatalog";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { AIAssistantBox } from "@/components/AIAssistantBox";
import { ShareActions } from "@/components/ShareActions";

const categories: LibraryCategory[] = ["Livros Clássicos", "Apostilas Técnicas", "Artigos Fundamentais", "Whitepapers e Guias"];

export default function Library() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedFormat, setSelectedFormat] = useState<string>("Todos");
  const [sortBy, setSortBy] = useState<"relevance" | "title-asc" | "year-desc" | "category">("relevance");
  const [activeTab, setActiveTab] = useState<"catalog" | "reading-list">("catalog");
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(location.split("?")[1] ?? "").get("query") ?? "";
    setSearchQuery(query);
  }, [location]);

  const utils = trpc.useUtils();
  const favoritesQuery = trpc.ai.favorites.useQuery();
  const toggleFavMutation = trpc.ai.toggleFavorite.useMutation({
    onSuccess: () => {
      void favoritesQuery.refetch();
    },
  });

  const reviewsQuery = trpc.ai.reviews.useQuery(
    { libraryItemId: selectedItem?.id ?? "" },
    { enabled: !!selectedItem }
  );

  const addReviewMutation = trpc.ai.addReview.useMutation({
    onSuccess: () => {
      setNewComment("");
      void reviewsQuery.refetch();
      setNotification("Avaliação enviada com sucesso!");
      setTimeout(() => setNotification(null), 3000);
    },
  });

  const favorites = favoritesQuery.data ?? [];

  const filteredItems = libraryCatalog.filter(item => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const matchesSearch = !normalizedSearch || [item.title, item.author, item.description, item.relatedModule].join(" ").toLowerCase().includes(normalizedSearch);
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    const matchesFormat = selectedFormat === "Todos" || item.format === selectedFormat;
    const matchesTab = activeTab === "catalog" || favorites.includes(item.id);
    return matchesSearch && matchesCategory && matchesFormat && matchesTab;
  });

  const sortedItems = [...filteredItems].sort((left, right) => {
    if (sortBy === "title-asc") return left.title.localeCompare(right.title, "pt-BR");
    if (sortBy === "category") return left.category.localeCompare(right.category, "pt-BR") || left.title.localeCompare(right.title, "pt-BR");
    if (sortBy === "year-desc") return Number(right.year) - Number(left.year) || left.title.localeCompare(right.title, "pt-BR");
    return 0;
  });

  const readingListItems = libraryCatalog.filter(item => favorites.includes(item.id));

  const makeReadingListMarkdown = () => [
    "# Minha Lista de Leitura — IA Academy",
    "",
    "Materiais selecionados pelo aluno para estudo.",
    "",
    ...readingListItems.map(item => `## ${item.title}\n- Autor: ${item.author}\n- Categoria: ${item.category}\n- Fonte oficial: ${item.officialUrl}\n- Descrição: ${item.description}\n`),
  ].join("\n");

  const downloadFile = (name: string, content: string, type = "text/markdown") => {
    const blob = new Blob([content], { type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const exportReadingList = (destination: "download" | "drive" | "github" | "colab") => {
    if (readingListItems.length === 0) {
      setNotification("Adicione pelo menos um item à Lista de Leitura antes de exportar.");
      setTimeout(() => setNotification(null), 4000);
      return;
    }
    const markdown = makeReadingListMarkdown();
    downloadFile("ia-academy-lista-de-leitura.md", markdown);
    if (destination === "drive") {
      window.open("https://drive.google.com/drive/my-drive", "_blank", "noopener,noreferrer");
      setNotification("Arquivo Markdown baixado. Abra o Google Drive para fazer o upload gratuito.");
    } else if (destination === "github") {
      window.open("https://github.com/new", "_blank", "noopener,noreferrer");
      setNotification("Arquivo Markdown baixado. Crie um repositório gratuito no GitHub e adicione o arquivo.");
    } else if (destination === "colab") {
      const notebook = JSON.stringify({
        cells: [{ cell_type: "markdown", metadata: {}, source: markdown.split("\\n").map(line => `${line}\\n`) }],
        metadata: { kernelspec: { display_name: "Python 3", language: "python", name: "python3" } },
        nbformat: 4,
        nbformat_minor: 5,
      }, null, 2);
      downloadFile("ia-academy-lista-de-leitura.ipynb", notebook, "application/x-ipynb+json");
      window.open("https://colab.research.google.com/", "_blank", "noopener,noreferrer");
      setNotification("Notebook .ipynb baixado. Abra o Google Colab e faça upload do notebook gratuitamente.");
    } else {
      setNotification("Lista de leitura baixada em Markdown.");
    }
    setTimeout(() => setNotification(null), 5000);
  };

  const handleShareDrive = (item: LibraryItem) => {
    setNotification(`[Google Drive] Link de '${item.title}' copiado para compartilhamento no Workspace.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleShareGithub = (item: LibraryItem) => {
    setNotification(`[GitHub] Referência de '${item.title}' gerada para repositório e issues.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenVsCode = (item: LibraryItem) => {
    setNotification(`[VS Code] Comando gerado: 'code --install-extension' ou clone para workspace local (${item.title}).`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handlePrepareNotebookLm = async (item: LibraryItem) => {
    const markdown = `# ${item.title}\n\n- **Autor:** ${item.author} (${item.year})\n- **Categoria:** ${item.category}\n- **Fonte oficial:** ${item.officialUrl}\n\n## Sobre este material\n\n${item.description}\n\n## Como usar no Gemini Notebook\n\nAdicione a URL original acima como fonte do notebook e use este arquivo Markdown como contexto de estudo.\n`;
    downloadFile(`ia-academy-${item.id}-gemini-notebook.md`, markdown);
    try {
      await navigator.clipboard.writeText(item.officialUrl);
      setNotification("Arquivo Markdown baixado e URL oficial copiada. Abra o Gemini Notebook e adicione ambos como fontes.");
    } catch {
      setNotification("Arquivo Markdown baixado. Copie a URL oficial do material e adicione-a como fonte no Gemini Notebook.");
    }
    window.open("https://notebooklm.google/", "_blank", "noopener,noreferrer");
    setTimeout(() => setNotification(null), 6000);
  };

  return (
    <div className="w-full">
      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
            <BookMarked className="size-4" />
            Biblioteca de Recursos
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Documentos, livros, apostilas e artigos
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Acesse leituras fundamentais, favorite itens para sua lista pessoal, debata com o Tutor IA e compartilhe com Google Drive, GitHub e VS Code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant={activeTab === "catalog" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("catalog")}
            >
              Catálogo Completo
            </Button>
            <Button
              variant={activeTab === "reading-list" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("reading-list")}
              className="gap-2"
            >
              <Bookmark className="size-4" />
              Lista de Leitura ({favorites.length})
            </Button>
            <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-card/60 p-1">
              <Button type="button" variant="ghost" size="sm" onClick={() => exportReadingList("download")} className="text-xs">Baixar Markdown</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => exportReadingList("drive")} className="text-xs">Google Drive</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => exportReadingList("github")} className="text-xs">GitHub</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => exportReadingList("colab")} className="text-xs">Google Colab</Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-end">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, autor ou assunto..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "Todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Todos")}
              >
                Todos
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Formato<select aria-label="Filtrar por formato" value={selectedFormat} onChange={event => setSelectedFormat(event.target.value)} className="mt-1 block min-w-36 rounded-lg border border-border bg-card px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground"><option>Todos</option><option>PDF</option><option>Notebook</option><option>Artigo</option><option>Repositório</option></select></label>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ordenar por<select aria-label="Ordenar Biblioteca" value={sortBy} onChange={event => setSortBy(event.target.value as typeof sortBy)} className="mt-1 block min-w-44 rounded-lg border border-border bg-card px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground"><option value="relevance">Relevância</option><option value="title-asc">Título A–Z</option><option value="year-desc">Mais recentes</option><option value="category">Categoria</option></select></label>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 space-y-12">
        {notification && (
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm font-medium text-primary">
            {notification}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedItems.map(item => {
            const isFav = favorites.includes(item.id);
            const isSelected = selectedItem?.id === item.id;
            return (
              <article
                key={item.id}
                className={`group flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 ${
                  isSelected ? "border-primary ring-2 ring-primary/25 shadow-lg" : "border-border hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleFavMutation.mutate({ libraryItemId: item.id })}
                      className={`rounded-lg p-1.5 transition-colors ${isFav ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                      title={isFav ? "Remover da lista de leitura" : "Adicionar à lista de leitura"}
                    >
                      <Bookmark className="size-4" />
                    </button>
                    <span className="text-xs font-medium text-muted-foreground">{item.format}</span>
                  </div>
                </div>

                <h3 className="mt-4 text-xl font-bold leading-tight">{item.title}</h3>
                <p className="mt-1 text-xs font-medium text-muted-foreground">Por {item.author} ({item.year})</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

                <div className="mt-4 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
                  {item.localFileHint}
                </div>

                <div className="mt-6 flex flex-col gap-2 pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Button asChild variant="default" size="sm" className="flex-1 gap-1 text-xs">
                      <a href={item.officialUrl} target="_blank" rel="noreferrer">
                        Acessar Oficial
                        <ExternalLink className="size-3.5" />
                      </a>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className={`text-xs gap-1 ${isSelected ? "border-primary text-primary bg-primary/5" : ""}`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <MessageSquare className="size-3.5" />
                      Debater / Avaliar
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShareActions title={item.title} text={`Confira este material da Biblioteca IA Academy: ${item.title}`} />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1 text-xs"
                      onClick={() => handleShareDrive(item)}
                    >
                      <HardDrive className="size-3.5 text-blue-400" />
                      Drive
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1 text-xs"
                      onClick={() => handleShareGithub(item)}
                    >
                      <FolderGit2 className="size-3.5 text-purple-400" />
                      GitHub
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1 text-xs"
                      onClick={() => handleOpenVsCode(item)}
                    >
                      <Code className="size-3.5 text-cyan-400" />
                      VS Code
                    </Button>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => void handlePrepareNotebookLm(item)} className="w-full gap-2 text-xs text-amber-300 border-amber-500/30 hover:bg-amber-500/10">
                    <NotebookPen className="size-3.5" /> Preparar para Gemini Notebook
                    <Copy className="ml-auto size-3.5" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        {selectedItem && (
          <div className="mt-12 rounded-2xl border border-primary/20 bg-card p-6 md:p-8 space-y-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{selectedItem.category}</span>
                <h2 className="text-2xl font-bold mt-1">{selectedItem.title}</h2>
                <p className="text-sm text-muted-foreground">Por {selectedItem.author} ({selectedItem.year})</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => setSelectedItem(null)}>
                Fechar Detalhes
              </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MessageSquare className="size-5 text-primary" />
                  Debater com o Tutor IA
                </h3>
                <AIAssistantBox
                  moduleId={`library-${selectedItem.id}`}
                  courseTitle={`Biblioteca: ${selectedItem.title}`}
                  courseDescription={selectedItem.description}
                  lessonTitle={selectedItem.category}
                  lessonContent={`Documento: ${selectedItem.title}\nAutor: ${selectedItem.author} (${selectedItem.year})\nDescrição: ${selectedItem.description}\nNota: ${selectedItem.localFileHint}`}
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Star className="size-5 text-amber-400 fill-amber-400" />
                    Avaliações e Opiniões dos Alunos
                  </h3>

                  <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                    {reviewsQuery.data && reviewsQuery.data.length > 0 ? (
                      reviewsQuery.data.map(review => (
                        <div key={review.id} className="rounded-xl border border-border bg-muted/40 p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">{review.userName}</span>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="size-3.5 text-amber-400 fill-amber-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                          <span className="text-[10px] text-muted-foreground">{new Date(review.createdAt).toLocaleDateString("pt-BR")}</span>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                        Nenhuma avaliação registrada ainda. Seja o primeiro a avaliar este material!
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                  <h4 className="font-semibold text-sm">Deixe sua avaliação ou dica de estudo</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Nota (1 a 5):</span>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star className={`size-5 ${star <= newRating ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                      </button>
                    ))}
                  </div>
                  <Input
                    placeholder="Escreva sua opinião sobre a utilidade deste documento..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (!newComment.trim()) return;
                      addReviewMutation.mutate({
                        libraryItemId: selectedItem.id,
                        rating: newRating,
                        comment: newComment,
                      });
                    }}
                    disabled={addReviewMutation.isPending || !newComment.trim()}
                    className="w-full gap-2"
                  >
                    <Send className="size-4" />
                    {addReviewMutation.isPending ? "Enviando..." : "Publicar Comentário"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

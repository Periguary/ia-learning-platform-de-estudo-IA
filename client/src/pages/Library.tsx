import React, { useState } from "react";
import { BookMarked, Code, ExternalLink, FileText, FolderGit2, HardDrive, Search } from "lucide-react";
import { libraryCatalog, type LibraryCategory, type LibraryItem } from "@/data/libraryCatalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories: LibraryCategory[] = ["Livros Clássicos", "Apostilas Técnicas", "Artigos Fundamentais", "Whitepapers e Guias"];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [notification, setNotification] = useState<string | null>(null);

  const filteredItems = libraryCatalog.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              Acesse leituras fundamentais e compartilhe materiais diretamente com Google Drive, GitHub e VS Code.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center">
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
          </div>
        </div>
      </section>

      <section className="container py-12">
        {notification && (
          <div className="mb-8 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm font-medium text-primary">
            {notification}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map(item => (
            <article key={item.id} className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {item.category}
                </span>
                <span className="text-xs font-medium text-muted-foreground">{item.format}</span>
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
                    className="gap-1 text-xs"
                    onClick={() => handleShareDrive(item)}
                    title="Compartilhar com Google Drive"
                  >
                    <HardDrive className="size-3.5 text-blue-400" />
                    Drive
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1 text-xs"
                    onClick={() => handleShareGithub(item)}
                    title="Exportar referência para GitHub"
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
                    title="Abrir ou clonar para VS Code"
                  >
                    <Code className="size-3.5 text-cyan-400" />
                    VS Code
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

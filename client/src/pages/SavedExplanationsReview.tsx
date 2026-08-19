import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { BookOpen, Search, Filter, Trash2, Volume2, Sparkles, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";

export default function SavedExplanationsReview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  const savedQuery = trpc.ai.savedExplanations.useQuery();
  const items = savedQuery.data ?? [];

  const categories = ["Todas", "Conceitos", "Matemática", "Código & Python", "Machine Learning", "Arquitetura de IA", "Geral"];

  const filteredItems = items.filter(item => {
    const matchesSearch = !searchQuery || [item.title, item.content, item.moduleId].join(" ").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSpeak = (text: string, id: number) => {
    if (!("speechSynthesis" in window)) {
      alert("Seu navegador não suporta síntese de voz nativa.");
      return;
    }
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = playbackRate;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-wider font-semibold">
              <Sparkles className="size-4" />
              <span>Espaço de Revisão Personalizada</span>
            </div>
            <h1 className="text-3xl font-extrabold mt-1">Explicações Salvas do Professor Virtual</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Revise, filtre por categoria e ouça em áudio as explicações e guias salvos durante seus estudos.
            </p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-wrap items-center gap-4 bg-card p-4 border border-border rounded-xl">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar nas explicações salvas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="size-4 text-muted-foreground" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        {savedQuery.isLoading ? (
          <div className="text-center py-16 text-muted-foreground">Carregando suas explicações salvas...</div>
        ) : filteredItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredItems.map(item => (
              <div key={item.id} className="futurist-panel p-6 rounded-xl border border-border bg-card space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {item.category || "Geral"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <div className="prose prose-sm dark:prose-invert max-h-48 overflow-y-auto pr-2 text-muted-foreground text-xs leading-relaxed">
                    <Streamdown>{item.content}</Streamdown>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-xs"
                      onClick={() => handleSpeak(item.content, item.id)}
                    >
                      <Volume2 className="size-3.5 text-primary" />
                      {speakingId === item.id ? "Parar" : "Ouvir"}
                    </Button>
                    <select
                      value={playbackRate}
                      onChange={(e) => setPlaybackRate(Number(e.target.value))}
                      className="bg-background text-foreground border border-border rounded px-1.5 py-1 text-xs"
                      title="Velocidade"
                    >
                      <option value={1.0}>1.0x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                    </select>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono">Módulo: {item.moduleId}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 border border-border rounded-xl space-y-3">
            <BookOpen className="size-12 mx-auto text-muted-foreground/50" />
            <h3 className="text-lg font-semibold">Nenhuma explicação encontrada</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {items.length === 0
                ? "Você ainda não salvou nenhuma explicação do Professor Virtual. Clique em 'Salvar na Lista de Leitura' nas respostas do chat para revisá-las aqui."
                : "Nenhum item corresponde ao filtro ou busca selecionados."}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

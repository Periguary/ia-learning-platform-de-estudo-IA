import React, { useMemo, useState } from "react";
import { BookOpen, Search, X } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

type GlossaryTerm = { term: string; category: string; definition: string; practical: string; relatedHref?: string; relatedLabel?: string };

const glossaryTerms: GlossaryTerm[] = [
  { term: "RAG", category: "LLMs", definition: "Retrieval-Augmented Generation combina a busca em fontes autorizadas com a geração de uma resposta contextualizada.", practical: "Use quando a resposta precisa se apoiar em documentos atualizados, manuais ou bases privadas.", relatedHref: "/course/7/rag", relatedLabel: "Fase 7: RAG & Recuperação de Contexto" },
  { term: "LLM", category: "Modelos", definition: "Large Language Model é um modelo treinado para reconhecer padrões de linguagem e produzir texto a partir de contexto.", practical: "É a base de tutores, chatbots e fluxos de geração de texto da plataforma.", relatedHref: "/course/7/llms", relatedLabel: "Fase 7: Grandes Modelos de Linguagem" },
  { term: "Transformer", category: "Arquitetura", definition: "Arquitetura baseada em mecanismos de atenção que permite relacionar diferentes partes de uma sequência com processamento paralelo.", practical: "É o fundamento de grande parte dos modelos modernos de linguagem e visão.", relatedHref: "/course/6/transformers", relatedLabel: "Fase 6: Arquitetura Transformers" },
  { term: "Embeddings", category: "Representações", definition: "Vetores numéricos que representam significado e relações entre textos, imagens ou outros objetos em um espaço matemático.", practical: "São usados em busca semântica, recomendação e recuperação de documentos.", relatedHref: "/course/7/embeddings", relatedLabel: "Fase 7: Vetores e Embeddings" },
  { term: "Fine-tuning", category: "Treinamento", definition: "Adaptação adicional de um modelo pré-treinado usando um conjunto de exemplos mais específico.", practical: "Pode especializar estilo e comportamento, mas exige dados de qualidade e avaliação cuidadosa.", relatedHref: "/videos", relatedLabel: "Vídeo-aulas: Fine-tuning e Adaptação" },
  { term: "Agente Autônomo", category: "Sistemas", definition: "Sistema que interpreta um objetivo, planeja etapas e usa ferramentas para executar um fluxo com supervisão adequada.", practical: "Divida o problema em tarefas verificáveis e limite as permissões de cada ferramenta.", relatedHref: "/course/7/ai-agents", relatedLabel: "Fase 7: Agentes de Inteligência Artificial" },
  { term: "MLOps", category: "Operações", definition: "Práticas para versionar dados e modelos, automatizar pipelines e monitorar sistemas de Machine Learning em produção.", practical: "Conecta experimentação, validação, implantação e observabilidade.", relatedHref: "/course/8/software-engineering", relatedLabel: "Fase 8: MLOps e DevOps para IA" },
  { term: "Atenção", category: "Arquitetura", definition: "Mecanismo que calcula quais partes do contexto devem receber mais peso ao produzir uma representação ou previsão.", practical: "Ajuda o modelo a relacionar palavras ou sinais distantes em uma mesma sequência.", relatedHref: "/course/6/transformers", relatedLabel: "Fase 6: Mecanismos de Atenção" },
];

export function AIGlossary() {
  const [, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const filteredTerms = useMemo(() => glossaryTerms.filter(item => `${item.term} ${item.category} ${item.definition}`.toLowerCase().includes(query.toLowerCase().trim())), [query]);

  return (
    <div className="relative">
      <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-haspopup="dialog" aria-label="Abrir glossário de IA" className="gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <BookOpen className="size-4 text-primary" /> <span className="hidden lg:inline">Glossário</span>
      </Button>
      {open && (
        <div role="dialog" aria-label="Glossário de termos avançados de IA" className="absolute right-0 top-full z-[60] mt-3 w-[min(92vw,24rem)] border border-primary/40 bg-card/95 p-4 shadow-[0_0_36px_hsla(var(--primary),0.22)] backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
            <div><p className="futurist-kicker">KNOWLEDGE INDEX // IA</p><h2 className="mt-1 text-lg font-black uppercase tracking-tight">Glossário rápido</h2></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fechar glossário" className="p-1 text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
          </div>
          <label className="relative mt-4 block"><span className="sr-only">Buscar termo no glossário</span><Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-primary" /><input aria-label="Buscar termo no glossário" value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar RAG, MLOps, atenção..." className="w-full border border-border bg-background px-9 py-2 text-sm outline-none focus:border-primary" /></label>
          <div className="mt-3 max-h-64 space-y-1 overflow-y-auto" aria-label="Termos do glossário">
            {filteredTerms.map(item => <div key={item.term} className={`w-full border px-3 py-2 text-left transition-colors ${selectedTerm?.term === item.term ? "border-primary bg-primary/10" : "border-transparent hover:border-primary/30 hover:bg-primary/5"}`}><button type="button" onClick={() => setSelectedTerm(selectedTerm?.term === item.term ? null : item)} className="w-full text-left bg-transparent border-none cursor-pointer"><div className="flex items-center justify-between gap-2"><span className="font-black text-primary">{item.term}</span><span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.category}</span></div></button>{selectedTerm?.term === item.term && <div className="mt-2 space-y-2 text-xs leading-relaxed text-muted-foreground"><p>{item.definition}</p><p><strong className="text-secondary">Na prática:</strong> {item.practical}</p>{item.relatedHref && <button type="button" onClick={() => { if (item.relatedHref) { setOpen(false); navigate(item.relatedHref); } }} className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline bg-transparent border-none cursor-pointer">Ir para {item.relatedLabel} →</button>}</div>}</div>)}
            {filteredTerms.length === 0 && <p className="p-4 text-center text-sm text-muted-foreground">Nenhum termo encontrado.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export { glossaryTerms };

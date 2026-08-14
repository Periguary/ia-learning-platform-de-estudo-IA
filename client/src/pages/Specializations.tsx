import React, { useMemo, useState } from "react";
import { Cpu, ArrowUpRight, BookOpen, Layers, CheckCircle2, Terminal, Search, SlidersHorizontal } from "lucide-react";
import { useLocation } from "wouter";
import { specializationsCatalog, type AISpecialization } from "@/data/specializationsCatalog";
import { Button } from "@/components/ui/button";

const moduleRoutes: Record<string, string> = {
  llms: "/course/7/llms",
  "software-engineering": "/course/8/software-engineering",
  transformers: "/course/6/transformers",
  "ml-fundamentals": "/course/5/ml-fundamentals",
};

export default function Specializations() {
  const [, navigate] = useLocation();
  const [selectedSpec, setSelectedSpec] = useState<AISpecialization>(specializationsCatalog[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas");
  const areaOptions = useMemo(() => ["Todas", ...Array.from(new Set(specializationsCatalog.map(spec => spec.badge)))], []);
  const filteredSpecs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("pt-BR");
    return specializationsCatalog.filter(spec => {
      const matchesArea = selectedArea === "Todas" || spec.badge === selectedArea;
      if (!normalizedSearch) return matchesArea;
      const searchableText = [spec.title, spec.badge, spec.subtitle, spec.description, spec.careerImpact, ...spec.coreConcepts, ...spec.techStack].join(" ").toLocaleLowerCase("pt-BR");
      return matchesArea && searchableText.includes(normalizedSearch);
    });
  }, [searchTerm, selectedArea]);
  const selectedSpecToDisplay = filteredSpecs.find(spec => spec.id === selectedSpec.id) ?? filteredSpecs[0] ?? selectedSpec;

  return (
    <div className="w-full">
      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
            <Cpu className="size-4" />
            Especializações e Áreas de IA
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Das bases matemáticas aos sistemas em produção
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Explore detalhadamente todas as facetas e divisões da inteligência artificial: frontend, backend, MLOps, ciência de dados, pesquisa e produto. Compreenda o papel de cada especialidade no ecossistema moderno.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-12 space-y-12">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-end gap-4">
            <label className="min-w-[240px] flex-1 space-y-2">
              <span className="flex items-center gap-2 text-sm font-semibold"><Search className="size-4 text-primary" /> Buscar área, papel ou ferramenta</span>
              <input
                type="search"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                placeholder="Ex.: frontend, RAG, Docker, pesquisador..."
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                aria-label="Buscar especializações, papéis e ferramentas"
              />
            </label>
            <label className="w-full space-y-2 sm:w-64">
              <span className="flex items-center gap-2 text-sm font-semibold"><SlidersHorizontal className="size-4 text-primary" /> Filtrar por área</span>
              <select
                value={selectedArea}
                onChange={event => setSelectedArea(event.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                aria-label="Filtrar especializações por área"
              >
                {areaOptions.map(area => <option key={area} value={area}>{area}</option>)}
              </select>
            </label>
            <p className="w-full text-xs text-muted-foreground sm:w-auto" aria-live="polite">{filteredSpecs.length} de {specializationsCatalog.length} áreas encontradas</p>
          </div>
        </div>

        {/* Navigation tabs for specializations */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-6">
          {specializationsCatalog.map(spec => {
            const isSelected = selectedSpecToDisplay.id === spec.id;
            return (
              <Button
                key={spec.id}
                type="button"
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpec(spec)}
                className={`gap-2 ${isSelected ? "bg-primary text-primary-foreground shadow-md" : "hover:border-primary/40"}`}
              >
                <Layers className="size-4" />
                {spec.title.split(" ")[0]} {spec.title.split(" ")[1]}
              </Button>
            );
          })}
        </div>

        {/* Selected Specialization Details */}
        {filteredSpecs.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {selectedSpecToDisplay.badge}
                </span>
                <span className="text-sm text-muted-foreground">Trilha IA Academy</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight">{selectedSpecToDisplay.title}</h2>
                <p className="text-xl font-medium text-primary">{selectedSpecToDisplay.subtitle}</p>
              </div>

              <p className="text-base leading-relaxed text-muted-foreground">{selectedSpecToDisplay.description}</p>

              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-emerald-400" />
                  Conceitos Fundamentais da Área
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {selectedSpecToDisplay.coreConcepts.map((concept, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 rounded-xl border border-border bg-background/50 p-4 text-sm leading-relaxed text-foreground">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary">{idx + 1}</span>
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Terminal className="size-5 text-secondary" />
                  Stack Tecnológica Recomendada
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSpecToDisplay.techStack.map((tech, idx) => (
                    <span key={idx} className="rounded-lg border border-border bg-muted/60 px-3 py-1.5 font-mono text-xs font-medium text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar with impact and CTA */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <BookOpen className="size-5" />
                Impacto na Carreira
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{selectedSpecToDisplay.careerImpact}</p>
              <Button
                type="button"
                onClick={() => moduleRoutes[selectedSpecToDisplay.recommendedModule] && navigate(moduleRoutes[selectedSpecToDisplay.recommendedModule])}
                className="w-full gap-2 bg-gradient-to-r from-primary to-secondary"
              >
                Estudar Módulo Relacionado
                <ArrowUpRight className="size-4" />
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <h3 className="text-lg font-bold">Visão Sistêmica da IA</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Nenhum sistema de IA moderno vive isolado. O sucesso de um produto depende da sinergia entre engenheiros de software, cientistas de dados, especialistas em MLOps e designers de experiência.
              </p>
            </div>
          </div>
        </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <h2 className="text-xl font-bold">Nenhuma especialização encontrada</h2>
            <p className="mt-2 text-sm text-muted-foreground">Tente buscar por outra ferramenta, papel ou área da IA.</p>
            <Button type="button" variant="outline" className="mt-5" onClick={() => { setSearchTerm(""); setSelectedArea("Todas"); }}>Limpar filtros</Button>
          </div>
        )}
      </section>
    </div>
  );
}

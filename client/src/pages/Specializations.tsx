import React, { useState } from "react";
import { Cpu, ArrowUpRight, BookOpen, Layers, CheckCircle2, Terminal, Shield, Database } from "lucide-react";
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
        {/* Navigation tabs for specializations */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-6">
          {specializationsCatalog.map(spec => {
            const isSelected = selectedSpec.id === spec.id;
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
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {selectedSpec.badge}
                </span>
                <span className="text-sm text-muted-foreground">Trilha IA Academy</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight">{selectedSpec.title}</h2>
                <p className="text-xl font-medium text-primary">{selectedSpec.subtitle}</p>
              </div>

              <p className="text-base leading-relaxed text-muted-foreground">{selectedSpec.description}</p>

              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-emerald-400" />
                  Conceitos Fundamentais da Área
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {selectedSpec.coreConcepts.map((concept, idx) => (
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
                  {selectedSpec.techStack.map((tech, idx) => (
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
              <p className="text-sm leading-relaxed text-muted-foreground">{selectedSpec.careerImpact}</p>
              <Button
                type="button"
                onClick={() => moduleRoutes[selectedSpec.recommendedModule] && navigate(moduleRoutes[selectedSpec.recommendedModule])}
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
      </section>
    </div>
  );
}

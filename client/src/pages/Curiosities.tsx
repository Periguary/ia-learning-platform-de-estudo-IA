import React, { useState } from "react";
import { BookOpen, Compass, Lightbulb, Sparkles, Trophy } from "lucide-react";
import { curiositiesCatalog, type CuriosityCategory, type CuriosityItem } from "@/data/curiositiesCatalog";
import { Button } from "@/components/ui/button";
import { AIAssistantBox } from "@/components/AIAssistantBox";
import { ShareActions } from "@/components/ShareActions";

const categories: CuriosityCategory[] = ["História", "Algoritmos", "Ética e Sociedade", "Fronteira Tecnológica"];

export default function Curiosities() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [activeCuriosity, setActiveCuriosity] = useState<CuriosityItem>(curiositiesCatalog[0]);

  const filteredItems = selectedCategory === "Todos"
    ? curiositiesCatalog
    : curiositiesCatalog.filter(item => item.category === selectedCategory);

  return (
    <div className="w-full">
      <section className="border-b border-border bg-gradient-to-br from-secondary/10 via-background to-primary/10 py-16">
        <div className="container space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-sm text-secondary">
            <Lightbulb className="size-4" />
            Curiosidades de IA
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Histórias, mistérios e marcos da Inteligência Artificial
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Explore os bastidores tecnológicos, os debates éticos e os momentos cruciais que transformaram a ciência da computação.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant={selectedCategory === "Todos" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("Todos")}
            >
              Todas as Curiosidades
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
      </section>

      <section className="container py-12 space-y-12">
        <div className="grid gap-6 md:grid-cols-2">
          {filteredItems.map(item => {
            const isSelected = activeCuriosity.id === item.id;
            return (
              <article
                key={item.id}
                onClick={() => setActiveCuriosity(item)}
                className={`group flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 cursor-pointer ${
                  isSelected ? "border-secondary ring-2 ring-secondary/20 shadow-lg" : "border-border hover:border-secondary/40 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <ShareActions title={item.title} text={`Confira esta curiosidade de IA na IA Academy: ${item.title}`} />
                    <span className="text-xs text-muted-foreground">{item.readTime}</span>
                  </div>
                </div>
                <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm font-medium text-foreground">{item.teaser}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.content}</p>

                <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
                  <div className="flex items-start gap-3">
                    <Compass className="mt-0.5 size-4 shrink-0 text-secondary" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Você sabia?</p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground">{item.funFact}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-xs text-secondary font-medium">
                  <span>{isSelected ? "● Selecionado para o Tutor IA abaixo" : "Clique para debater com o Tutor IA"}</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="pt-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Debata esta curiosidade com o Tutor IA</h2>
            <p className="text-sm text-muted-foreground">O assistente está contextualizado com o tópico "{activeCuriosity.title}".</p>
          </div>
          <AIAssistantBox
            moduleId="curiosities-hub"
            courseTitle={`Curiosidade: ${activeCuriosity.title}`}
            courseDescription={activeCuriosity.teaser}
            lessonTitle={activeCuriosity.category}
            lessonContent={activeCuriosity.content + "\n\nCuriosidade: " + activeCuriosity.funFact}
          />
        </div>
      </section>
    </div>
  );
}

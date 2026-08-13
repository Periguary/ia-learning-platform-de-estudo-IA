import React from "react";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { projects } from "@/data/projectCatalog";

export default function Projects() {
  const [, navigate] = useLocation();

  return (
    <div className="w-full">
      <section className="py-16 border-b border-border">
        <div className="container space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Portfólio aplicado</p>
          <h1 className="text-4xl md:text-5xl font-bold">Projetos Práticos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Aplique seus conhecimentos em oito projetos com objetivos, etapas, tecnologias e recursos de estudo claros.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => navigate(`/project/${project.id}`)}
                className="group h-full p-6 border border-border rounded-xl bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col text-left"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl" aria-hidden="true">{project.icon}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.color} text-white`}>
                    {project.difficulty}
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h2>
                <p className="text-muted-foreground mb-6 flex-1">{project.description}</p>

                <div className="mb-6 space-y-3">
                  <p className="text-sm font-semibold text-foreground">Habilidades:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  <p className="text-sm font-semibold text-foreground">Tecnologias:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="px-2 py-1 rounded text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div className="text-sm text-muted-foreground">⏱️ {project.duration}</div>
                  <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm font-semibold">Ver detalhes</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border bg-card/50">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Por que fazer projetos?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Projetos práticos consolidam o aprendizado e transformam conceitos em evidências concretas para seu portfólio.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              ["💡", "Aprendizado prático", "Aplique conceitos teóricos em cenários reais."],
              ["📁", "Portfólio", "Registre decisões e resultados para apresentar seu trabalho."],
              ["🎯", "Experiência", "Treine ferramentas e processos usados no mercado."],
              ["🚀", "Carreira", "Construa evidências de execução para futuras oportunidades."],
            ].map(([icon, title, description]) => (
              <div key={title} className="p-6 border border-border rounded-xl bg-background text-center space-y-3">
                <div className="text-4xl" aria-hidden="true">{icon}</div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Pronto para começar?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha um projeto, siga as etapas e registre a evolução do seu portfólio.
            </p>
          </div>
          <button type="button" onClick={() => navigate("/learning-path")} className="btn-primary inline-flex items-center gap-2">
            Voltar para Trilha <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { projectsById } from "@/data/projectCatalog";

export default function ProjectDetail() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/project/:id");
  const projectId = Number(params?.id);
  const project = match && Number.isInteger(projectId) ? projectsById[projectId] : undefined;

  if (!project) {
    return (
      <div className="container py-24 text-center space-y-6">
        <h1 className="text-3xl font-bold">Projeto não encontrado</h1>
        <p className="text-muted-foreground">Escolha um projeto disponível para acessar o guia completo.</p>
        <button type="button" onClick={() => navigate("/projects")} className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar para Projetos
        </button>
      </div>
    );
  }

  const scrollToSteps = () => {
    document.getElementById("project-step-1")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full">
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Projetos
          </button>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl" aria-hidden="true">{project.icon}</span>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.color} text-white mb-3`}>
                  {project.difficulty}
                </span>
                <h1 className="text-4xl font-bold">{project.title}</h1>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <span>⏱️ {project.duration}</span>
              <span>🛠️ {project.technologies.join(", ")}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12">
        <div className="container grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Visão Geral</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{project.overview}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Objetivos</h2>
              <ul className="space-y-3">
                {project.objectives.map((objective, index) => (
                  <li key={`${project.id}-objective-${index}`} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Requisitos</h2>
              <div className="p-6 border border-border rounded-xl bg-card space-y-3">
                {project.requirements.map((requirement, index) => (
                  <div key={`${project.id}-requirement-${index}`} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6" aria-labelledby="steps-title">
              <h2 id="steps-title" className="text-2xl font-bold">Guia Passo a Passo</h2>
              {project.steps.map((step) => (
                <div id={`project-step-${step.number}`} key={`${project.id}-step-${step.number}`} className="border border-border rounded-xl bg-card p-6 space-y-4 scroll-mt-24">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-muted-foreground"><code>{step.code.trim()}</code></pre>
                  </div>
                </div>
              ))}
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Melhorias Possíveis</h2>
              <ul className="space-y-2">
                {project.improvements.map((improvement, index) => (
                  <li key={`${project.id}-improvement-${index}`} className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-primary">→</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 border border-border rounded-xl bg-card space-y-4">
                <h2 className="font-semibold">Tecnologias</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 border border-border rounded-xl bg-card space-y-4">
                <h2 className="font-semibold">Habilidades</h2>
                <div className="space-y-2">
                  {project.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="text-sm text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border border-border rounded-xl bg-card space-y-4">
                <h2 className="font-semibold">Recursos</h2>
                <div className="space-y-3">
                  {project.resources.map((resource) => (
                    <a
                      key={resource.url}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-sm text-primary hover:text-primary/80"
                    >
                      <span>{resource.title}</span>
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={scrollToSteps}
                className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-3 font-semibold text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                <Code2 className="w-5 h-5 mr-2" />
                Começar Projeto
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

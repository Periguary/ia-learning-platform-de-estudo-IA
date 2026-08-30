import React from "react";
import { ArrowRight, Award, Clock, DollarSign, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { certificationCatalog } from "@/data/certificationCatalog";
import { freeLearningCatalog } from "@/data/freeLearningCatalog";

export default function Certifications() {
  const [, navigate] = useLocation();
  const certifications = certificationCatalog;

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="container space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Certificações Recomendadas</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore certificações reconhecidas globalmente que aumentarão seu valor no mercado.
          </p>
        </div>
      </section>

      {/* Free Official Learning */}
      <section className="py-16 border-b border-border bg-primary/5">
        <div className="container space-y-8">
          <div className="space-y-3"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Curadoria atualizada</p><h2 className="text-3xl font-bold">Cursos e credenciais gratuitas</h2><p className="max-w-3xl text-muted-foreground">Opções oficiais de Microsoft, Google Cloud, AWS, Kaggle e Hugging Face. Use os links para acessar a fonte original e confira as condições de conta, créditos e disponibilidade regional.</p></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{freeLearningCatalog.map((resource) => <article key={resource.id} className="flex flex-col rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/50"><div className={`mb-4 h-1.5 rounded-full bg-gradient-to-r ${resource.color}`} /><p className="text-xs font-semibold uppercase tracking-wider text-primary">{resource.kind}</p><h3 className="mt-2 text-lg font-bold">{resource.title}</h3><p className="mt-1 text-xs text-muted-foreground">{resource.provider} · {resource.level}</p><p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{resource.description}</p><div className="mt-4 flex flex-wrap gap-2">{resource.topics.map(topic => <span key={`${resource.id}-${topic}`} className="rounded bg-muted px-2 py-1 text-[11px] text-muted-foreground">{topic}</span>)}</div><p className="mt-4 text-xs leading-5 text-muted-foreground"><strong className="text-foreground">Acesso:</strong> {resource.accessNote}</p><a href={resource.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-primary/35 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Abrir fonte oficial <ArrowRight className="size-4" /></a></article>)}</div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={`cert-${cert.id}`}
                className="group border border-border rounded-xl bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden"
              >
                {/* Header */}
                <div className={`p-6 bg-gradient-to-br ${cert.color} text-white`}>
                  <div className="text-5xl mb-4">{cert.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                  <p className="text-sm opacity-90">{cert.provider}</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <p className="text-muted-foreground text-sm">{cert.description}</p>

                  {/* Key Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Nível</span>
                      <span className="font-semibold">{cert.level}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Duração
                      </span>
                      <span className="font-semibold">{cert.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Preço
                      </span>
                      <span className="font-semibold">{cert.price}</span>
                    </div>
                  </div>

                  {/* Topics */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Tópicos</p>
                    <div className="flex flex-wrap gap-2">
                      {cert.topics.map((topic) => (
                        <span key={topic} className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Exam Info */}
                  <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Informações do Exame</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>Duração: {cert.exam.duration}</p>
                      <p>Questões: {cert.exam.questions}</p>
                      <p>Taxa de Aprovação: {cert.exam.passRate}</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Benefícios</p>
                    <ul className="space-y-2">
                      {cert.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:shadow-lg hover:shadow-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Saiba Mais <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 border-t border-border bg-card/50">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Comparação de Certificações</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja como as certificações se comparam em diferentes aspectos.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Certificação</th>
                  <th className="text-left py-4 px-4 font-semibold">Provedor</th>
                  <th className="text-left py-4 px-4 font-semibold">Nível</th>
                  <th className="text-left py-4 px-4 font-semibold">Duração</th>
                  <th className="text-left py-4 px-4 font-semibold">Preço</th>
                </tr>
              </thead>
              <tbody>
                {certifications.map((cert) => (
                  <tr key={cert.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-sm">{cert.title}</td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">{cert.provider}</td>
                    <td className="py-4 px-4 text-sm">
                      <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                        {cert.level}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">{cert.duration}</td>
                    <td className="py-4 px-4 text-sm">
                      <span className={cert.price.includes("Gratuito") ? "text-green-500 font-semibold" : "text-primary"}>
                        {cert.price}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 border-t border-border">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Dicas para Certificações</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Maximize suas chances de sucesso com essas dicas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-border rounded-xl bg-card space-y-3">
              <h3 className="text-lg font-bold">Comece com Certificações Gratuitas</h3>
              <p className="text-muted-foreground">
                Kaggle e Hugging Face oferecem certificações gratuitas. Comece por aí para ganhar experiência.
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl bg-card space-y-3">
              <h3 className="text-lg font-bold">Combine Certificações</h3>
              <p className="text-muted-foreground">
                Combine certificações de diferentes provedores para ter uma visão mais ampla.
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl bg-card space-y-3">
              <h3 className="text-lg font-bold">Pratique Antes de Fazer o Exame</h3>
              <p className="text-muted-foreground">
                Faça exames práticos e revise o material várias vezes antes de fazer o exame real.
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl bg-card space-y-3">
              <h3 className="text-lg font-bold">Mantenha Certificações Atualizadas</h3>
              <p className="text-muted-foreground">
                Muitas certificações exigem renovação. Mantenha suas credenciais atualizadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Pronto para Certificar?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comece sua trilha de aprendizado e prepare-se para as certificações.
            </p>
          </div>

          <button
            onClick={() => navigate("/learning-path")}
            className="btn-primary inline-flex items-center gap-2"
          >
            Explorar Trilha <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

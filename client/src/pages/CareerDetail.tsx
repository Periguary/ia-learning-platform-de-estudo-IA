import { useLocation, useRoute } from "wouter";
import { ArrowLeft, TrendingUp, Users, Briefcase, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { careerById } from "@/data/careerCatalog";

export default function CareerDetail() {
  const [match, params] = useRoute("/career/:id");
  const [, navigate] = useLocation();

  if (!match) return null;

  const careerId = parseInt(params?.id || "1");



  const career = careerById(careerId);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container">
          <button
            type="button"
            onClick={() => navigate("/careers")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Carreiras
          </button>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{career.icon}</div>
              <div>
                <h1 className="text-4xl font-bold">{career.title}</h1>
                <p className="text-lg text-muted-foreground">{career.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <div className="p-4 border border-border rounded-lg bg-background">
                <p className="text-xs text-muted-foreground mb-1">Salário Médio</p>
                <p className="font-bold text-primary">{career.salary}</p>
              </div>
              <div className="p-4 border border-border rounded-lg bg-background">
                <p className="text-xs text-muted-foreground mb-1">Experiência</p>
                <p className="font-bold">{career.experience}</p>
              </div>
              <div className="p-4 border border-border rounded-lg bg-background">
                <p className="text-xs text-muted-foreground mb-1">Demanda</p>
                <p className="font-bold text-green-500">{career.jobMarket.demand}</p>
              </div>
              <div className="p-4 border border-border rounded-lg bg-background">
                <p className="text-xs text-muted-foreground mb-1">Crescimento</p>
                <p className="font-bold text-green-500">{career.jobMarket.growth}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12">
        <div className="container grid lg:grid-cols-3 gap-8">
          {/* Left: Career Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Sobre a Profissão</h2>
              <p className="text-muted-foreground leading-relaxed">
                A função de {career.title} combina conhecimento técnico, comunicação e tomada de decisão para transformar problemas de negócio em soluções de IA mensuráveis. Use este roteiro para construir fundamentos, praticar com projetos e evoluir para entregas profissionais.
              </p>
            </section>

            {/* Responsibilities */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Responsabilidades Principais</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {career.responsibilities.map((resp: string, index: number) => (
                  <div key={`resp-${index}`} className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{resp}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Habilidades Necessárias</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {career.skills.map((skill: string, index: number) => (
                  <div key={`skill-${index}`} className="p-3 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
                    <p className="font-medium text-foreground">{skill}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tools */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Ferramentas e Tecnologias</h2>
              <div className="flex flex-wrap gap-3">
                {career.tools.map((tool: string) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* Day in Life */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Um Dia na Vida</h2>
              <div className="space-y-3">
                {career.dayInLife.map((item: string, index: number) => (
                  <div key={`day-${index}`} className="flex items-start gap-4 p-4 border border-border rounded-lg bg-card">
                    <span className="font-bold text-primary flex-shrink-0">{item.split(" - ")[0]}</span>
                    <span className="text-muted-foreground">{item.split(" - ")[1]}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Job Market */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Mercado de Trabalho</h2>
              <div className="p-6 border border-border rounded-xl bg-card space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Demanda de Mercado</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-primary to-secondary"></div>
                    </div>
                    <span className="font-bold text-primary">{career.jobMarket.demand}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Crescimento Anual</p>
                  <p className="text-lg font-bold text-green-500">{career.jobMarket.growth}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Principais Locais</p>
                  <div className="flex flex-wrap gap-2">
                    {career.jobMarket.locations.map((location: string) => (
                      <span key={location} className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Companies */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Empresas que Contratam</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {career.companies.map((company: string) => (
                  <div key={company} className="p-4 border border-border rounded-lg bg-card text-center hover:border-primary/50 transition-colors">
                    <p className="font-semibold">{company}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Roadmap */}
              <div className="border border-border rounded-xl bg-card overflow-hidden">
                <div className="p-4 border-b border-border bg-card/50 font-semibold">
                  Roadmap de Aprendizado
                </div>
                <div className="p-4 space-y-4">
                  {career.roadmap.map((item: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">Fase {item.phase}</span>
                        <span className="text-xs text-muted-foreground">{item.duration}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.title}</p>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-0 bg-gradient-to-r from-primary to-secondary"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => navigate("/learning-path")}
                className="btn-primary inline-flex items-center justify-center gap-2 w-full"
              >
                Começar Roadmap
              </button>

              {/* Info Box */}
              <div className="p-4 border border-border rounded-xl bg-card/50 space-y-3">
                <h4 className="font-semibold text-sm">Dica Profissional</h4>
                <p className="text-sm text-muted-foreground">
                  Comece com fundamentos sólidos em matemática e Python. Isso criará uma base forte para todo o resto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

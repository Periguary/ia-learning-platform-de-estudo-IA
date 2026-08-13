import { useLocation, useRoute } from "wouter";
import { ArrowLeft, TrendingUp, Users, Briefcase, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CareerDetail() {
  const [match, params] = useRoute("/career/:id");
  const [, navigate] = useLocation();

  if (!match) return null;

  const careerId = parseInt(params?.id || "1");

  const careersData: Record<number, any> = {
    1: {
      title: "Cientista de Dados",
      description: "Analisa dados complexos e cria insights para decisões estratégicas.",
      icon: "📊",
      color: "from-blue-500 to-cyan-500",
      salary: "R$ 8.000 - R$ 15.000",
      experience: "2-5 anos",
      responsibilities: [
        "Coletar e analisar grandes volumes de dados",
        "Criar visualizações e dashboards",
        "Comunicar insights para stakeholders",
        "Participar de decisões estratégicas",
        "Realizar testes A/B e experimentos",
        "Documentar análises e metodologias",
      ],
      skills: [
        "Python/R",
        "SQL",
        "Estatística",
        "Visualização de Dados",
        "Machine Learning",
        "Comunicação",
        "Business Acumen",
        "Excel Avançado",
      ],
      tools: ["Python", "SQL", "Tableau", "Power BI", "Excel", "Jupyter", "Git", "Pandas"],
      roadmap: [
        { phase: 1, title: "Fundamentos Matemáticos", modules: 3, duration: "4 semanas" },
        { phase: 2, title: "Python Profissional", modules: 3, duration: "6 semanas" },
        { phase: 3, title: "SQL e Banco de Dados", modules: 3, duration: "4 semanas" },
        { phase: 4, title: "Análise de Dados", modules: 3, duration: "5 semanas" },
        { phase: 5, title: "Machine Learning", modules: 4, duration: "8 semanas" },
      ],
      companies: ["Google", "Microsoft", "Amazon", "Meta", "Uber", "Netflix"],
      jobMarket: {
        demand: "Muito Alto",
        growth: "+15% ao ano",
        locations: ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Remoto"],
      },
      dayInLife: [
        "08:00 - Reunião com stakeholders para entender novos requisitos",
        "09:30 - Análise exploratória de novo dataset",
        "11:00 - Desenvolvimento de visualizações",
        "13:00 - Almoço",
        "14:00 - Reunião de revisão de análises",
        "15:00 - Documentação e preparação de apresentação",
        "16:30 - Mentorias e aprendizado contínuo",
      ],
    },
    2: {
      title: "Engenheiro de Machine Learning",
      description: "Desenvolve e coloca modelos de ML em produção com pipelines confiáveis.",
      icon: "🤖",
      color: "from-green-500 to-emerald-500",
      salary: "R$ 12.000 - R$ 25.000",
      experience: "3-7 anos",
      responsibilities: ["Desenvolver modelos escaláveis", "Construir pipelines de dados", "Monitorar qualidade e latência", "Colaborar com produto e engenharia"],
      skills: ["Python", "Machine Learning", "Deep Learning", "MLOps", "Cloud", "DevOps"],
      tools: ["Python", "PyTorch", "Docker", "Kubernetes", "MLflow", "AWS"],
      roadmap: [
        { phase: 1, title: "Fundamentos Matemáticos", modules: 3, duration: "4 semanas" },
        { phase: 2, title: "Python Profissional", modules: 1, duration: "6 semanas" },
        { phase: 5, title: "Machine Learning", modules: 1, duration: "8 semanas" },
        { phase: 6, title: "Deep Learning", modules: 1, duration: "8 semanas" },
        { phase: 8, title: "Engenharia de Software", modules: 1, duration: "5 semanas" },
      ],
      companies: ["Google", "Nubank", "iFood", "Microsoft", "Amazon", "Mercado Livre"],
      jobMarket: { demand: "Muito Alto", growth: "+18% ao ano", locations: ["São Paulo", "Curitiba", "Remoto", "Exterior"] },
      dayInLife: ["09:00 - Revisar métricas de produção", "10:00 - Treinar e avaliar modelos", "13:00 - Alinhar prioridades com produto", "15:00 - Melhorar pipeline e testes", "17:00 - Documentar decisões técnicas"],
    },
    3: {
      title: "Engenheiro de IA",
      description: "Projeta sistemas de IA end-to-end, conectando modelos, dados e produto.",
      icon: "🧠",
      color: "from-purple-500 to-pink-500",
      salary: "R$ 15.000 - R$ 30.000",
      experience: "4-10 anos",
      responsibilities: ["Arquitetar sistemas de IA", "Integrar múltiplos modelos", "Garantir escalabilidade", "Liderar decisões técnicas"],
      skills: ["Arquitetura", "Machine Learning", "Deep Learning", "Cloud", "DevOps", "Liderança"],
      tools: ["Python", "Kubernetes", "AWS/GCP", "Docker", "MLflow", "Terraform"],
      roadmap: [
        { phase: 1, title: "Fundamentos Matemáticos", modules: 3, duration: "4 semanas" },
        { phase: 5, title: "Machine Learning", modules: 1, duration: "8 semanas" },
        { phase: 6, title: "Deep Learning", modules: 1, duration: "8 semanas" },
        { phase: 7, title: "IA Generativa", modules: 1, duration: "6 semanas" },
        { phase: 8, title: "Engenharia de Software", modules: 1, duration: "5 semanas" },
      ],
      companies: ["OpenAI", "Google", "Meta", "Microsoft", "NVIDIA", " startups de tecnologia"],
      jobMarket: { demand: "Muito Alto", growth: "+22% ao ano", locations: ["São Paulo", "Campinas", "Remoto", "Exterior"] },
      dayInLife: ["08:30 - Revisar arquitetura e riscos", "10:00 - Prototipar uma solução", "13:30 - Revisar integração de modelos", "15:00 - Orientar o time", "17:00 - Registrar decisões e próximos passos"],
    },
    4: {
      title: "Analista de IA",
      description: "Avalia oportunidades de IA e transforma necessidades de negócio em casos de uso priorizados.",
      icon: "📈",
      color: "from-orange-500 to-red-500",
      salary: "R$ 7.000 - R$ 12.000",
      experience: "1-3 anos",
      responsibilities: ["Mapear casos de uso", "Analisar dados e resultados", "Monitorar indicadores", "Comunicar recomendações"],
      skills: ["Análise de Dados", "Machine Learning", "SQL", "Business Analysis", "Comunicação"],
      tools: ["Python", "SQL", "Tableau", "Excel", "Git", "Jupyter"],
      roadmap: [
        { phase: 1, title: "Fundamentos Matemáticos", modules: 3, duration: "4 semanas" },
        { phase: 2, title: "Python Profissional", modules: 1, duration: "6 semanas" },
        { phase: 3, title: "SQL e Banco de Dados", modules: 1, duration: "4 semanas" },
        { phase: 4, title: "Análise de Dados", modules: 2, duration: "5 semanas" },
        { phase: 5, title: "Machine Learning", modules: 1, duration: "8 semanas" },
      ],
      companies: ["Accenture", "Deloitte", "Nubank", "Itaú", "Vivo", "Remoto"],
      jobMarket: { demand: "Alto", growth: "+12% ao ano", locations: ["São Paulo", "Rio de Janeiro", "Remoto"] },
      dayInLife: ["09:00 - Entender uma demanda de negócio", "10:30 - Explorar dados", "13:30 - Comparar soluções", "15:00 - Apresentar recomendação", "16:30 - Acompanhar indicadores"],
    },
    5: {
      title: "Engenheiro de Software com IA",
      description: "Integra modelos e automações inteligentes em aplicações confiáveis.",
      icon: "⚙️",
      color: "from-indigo-500 to-purple-500",
      salary: "R$ 10.000 - R$ 20.000",
      experience: "3-7 anos",
      responsibilities: ["Desenvolver APIs de IA", "Integrar modelos em produtos", "Garantir qualidade de código", "Operar serviços em produção"],
      skills: ["Engenharia de Software", "Python/JavaScript", "APIs", "DevOps", "Cloud"],
      tools: ["Python", "FastAPI", "Docker", "Kubernetes", "AWS", "Git"],
      roadmap: [
        { phase: 2, title: "Python Profissional", modules: 1, duration: "6 semanas" },
        { phase: 5, title: "Machine Learning", modules: 1, duration: "8 semanas" },
        { phase: 6, title: "Deep Learning", modules: 1, duration: "8 semanas" },
        { phase: 8, title: "Engenharia de Software", modules: 1, duration: "5 semanas" },
      ],
      companies: ["Stone", "Nubank", "iFood", "Mercado Livre", "VTEX", "Remoto"],
      jobMarket: { demand: "Alto", growth: "+16% ao ano", locations: ["São Paulo", "Belo Horizonte", "Remoto"] },
      dayInLife: ["09:00 - Revisar tickets e incidentes", "10:00 - Implementar endpoint", "13:30 - Testar integração de modelo", "15:30 - Revisar pull requests", "17:00 - Monitorar deploy"],
    },
    6: {
      title: "Especialista em IA Generativa",
      description: "Constrói aplicações com LLMs, RAG e agentes orientados a tarefas reais.",
      icon: "✨",
      color: "from-yellow-500 to-orange-500",
      salary: "R$ 12.000 - R$ 25.000",
      experience: "2-5 anos",
      responsibilities: ["Desenvolver aplicações com LLMs", "Projetar prompts e avaliações", "Implementar RAG", "Criar agentes com controles"],
      skills: ["LLMs", "Prompt Engineering", "RAG", "Python", "Agentes", "Avaliação"],
      tools: ["Python", "LangChain", "Hugging Face", "FastAPI", "Vector DB", "Git"],
      roadmap: [
        { phase: 2, title: "Python Profissional", modules: 1, duration: "6 semanas" },
        { phase: 5, title: "Machine Learning", modules: 1, duration: "8 semanas" },
        { phase: 6, title: "Deep Learning", modules: 1, duration: "8 semanas" },
        { phase: 7, title: "IA Generativa", modules: 1, duration: "6 semanas" },
      ],
      companies: ["OpenAI", "Anthropic", "Google", "Microsoft", "Startups", "Remoto"],
      jobMarket: { demand: "Muito Alto", growth: "+25% ao ano", locations: ["São Paulo", "Rio de Janeiro", "Remoto", "Exterior"] },
      dayInLife: ["09:00 - Definir avaliação de respostas", "10:30 - Ajustar pipeline RAG", "13:30 - Testar agente em cenários", "15:00 - Revisar segurança e custos", "17:00 - Documentar experimentos"],
    },
  };

  const career = careersData[careerId] || careersData[1];

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

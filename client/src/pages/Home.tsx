import { Link } from "wouter";
import { ArrowRight, Zap, Users, Award, TrendingUp, BookOpen, Code2, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { user } = useAuth();

  const phases = [
    {
      number: 1,
      title: "Fundamentos Matemáticos",
      description: "Álgebra Linear, Estatística e Probabilidade",
      icon: "📐",
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: 2,
      title: "Python Profissional",
      description: "Básico, Intermediário e Avançado",
      icon: "🐍",
      color: "from-green-500 to-emerald-500",
    },
    {
      number: 3,
      title: "SQL e Banco de Dados",
      description: "Consultas, Otimização e Design",
      icon: "🗄️",
      color: "from-orange-500 to-red-500",
    },
    {
      number: 4,
      title: "Análise de Dados",
      description: "NumPy, Pandas e Visualização",
      icon: "📊",
      color: "from-purple-500 to-pink-500",
    },
    {
      number: 5,
      title: "Machine Learning",
      description: "Algoritmos e Modelos Preditivos",
      icon: "🤖",
      color: "from-indigo-500 to-purple-500",
    },
    {
      number: 6,
      title: "Deep Learning",
      description: "Redes Neurais e Transformers",
      icon: "🧠",
      color: "from-red-500 to-pink-500",
    },
    {
      number: 7,
      title: "IA Generativa",
      description: "LLMs, RAG e Agentes",
      icon: "✨",
      color: "from-yellow-500 to-orange-500",
    },
    {
      number: 8,
      title: "Engenharia de Software",
      description: "Git, Docker, APIs e Cloud",
      icon: "⚙️",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const stats = [
    { label: "Horas de Conteúdo", value: "200+", icon: BookOpen },
    { label: "Projetos Práticos", value: "8", icon: Code2 },
    { label: "Profissões", value: "6", icon: Users },
    { label: "Certificações", value: "6", icon: Award },
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Data Scientist",
      content: "A plataforma me ajudou a fazer a transição de carreira. Conteúdo excelente e bem estruturado!",
      avatar: "👨‍💼",
    },
    {
      name: "Ana Santos",
      role: "ML Engineer",
      content: "Os projetos práticos foram fundamentais para consolidar meu conhecimento em produção.",
      avatar: "👩‍💻",
    },
    {
      name: "João Oliveira",
      role: "AI Specialist",
      content: "Melhor investimento que fiz em minha formação. Recomendo para todos!",
      avatar: "👨‍🎓",
    },
  ];

  const faqs = [
    {
      question: "Qual é o tempo estimado para completar a trilha?",
      answer: "A trilha completa leva aproximadamente 12-18 meses, dependendo do seu ritmo. Você pode estudar no seu próprio tempo.",
    },
    {
      question: "Preciso ter conhecimento prévio?",
      answer: "Não! A trilha começa do zero com fundamentos matemáticos. Qualquer pessoa pode começar.",
    },
    {
      question: "Os certificados são reconhecidos?",
      answer: "Sim! Oferecemos certificações de provedores renomados como Google Cloud, Kaggle e DeepLearning.AI.",
    },
    {
      question: "Há suporte durante o aprendizado?",
      answer: "Sim! Temos comunidade ativa, FAQ e recursos de suporte disponíveis.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 -z-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: "1s" }}></div>

        <div className="container grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 slide-in-up">
            <div className="space-y-4">
              <div className="badge-primary w-fit">
                <Zap className="w-4 h-4" />
                <span>Trilha Completa de IA</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Domine <span className="gradient-text">Inteligência Artificial</span> do Zero ao Profissional
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Trilha de aprendizado estruturada com 8 fases, 200+ horas de conteúdo, 8 projetos práticos e certificações reconhecidas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Link href="/learning-path">
                  <a className="btn-primary inline-flex items-center justify-center gap-2">
                    Começar Trilha <ArrowRight className="w-5 h-5" />
                  </a>
                </Link>
              ) : (
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 h-12"
                >
                  <a href={getLoginUrl()} className="flex items-center gap-2">
                    Começar Agora <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 border-border hover:bg-muted"
              >
                <a href="#trilha">Explorar Trilha</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden md:block">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-2xl"></div>
              <div className="absolute inset-0 border border-primary/30 rounded-2xl backdrop-blur-sm"></div>
              <div className="absolute inset-4 bg-card rounded-xl border border-border flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Brain className="w-24 h-24 text-primary mx-auto animate-float" />
                  <p className="text-2xl font-bold gradient-text">IA Academy</p>
                  <p className="text-sm text-muted-foreground">Plataforma Premium de Aprendizado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trilha Overview */}
      <section id="trilha" className="py-20 border-t border-border">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="section-title">Trilha de Aprendizado Estruturada</h2>
            <p className="section-subtitle">8 fases sequenciais que levam você do iniciante ao especialista</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, index) => (
              <div
                key={phase.number}
                className="group relative card-hover"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-6 border border-border rounded-xl bg-card">
                  <div className="text-4xl mb-4">{phase.icon}</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${phase.color} text-white mb-4`}>
                    Fase {phase.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/learning-path">
              <a className="btn-primary inline-flex items-center gap-2">
                Explorar Trilha Completa <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-border bg-card/50">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="section-title">O que Dizem Nossos Alunos</h2>
            <p className="section-subtitle">Histórias de sucesso e transformação de carreira</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="p-6 border border-border rounded-xl bg-background card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-border">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="section-title">Perguntas Frequentes</h2>
            <p className="section-subtitle">Tudo que você precisa saber sobre a plataforma</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-border rounded-lg bg-card p-6 cursor-pointer hover:border-primary/50 transition-colors"
              >
                <summary className="flex items-center justify-between font-semibold text-foreground">
                  <span>{faq.question}</span>
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 -z-10"></div>
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Pronto para Começar?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Junte-se a milhares de alunos que estão transformando suas carreiras em IA e Ciência de Dados.
            </p>
          </div>

          {user ? (
            <Link href="/learning-path">
              <a className="btn-primary inline-flex items-center gap-2">
                Acessar Trilha <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
          ) : (
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 h-12"
            >
              <a href={getLoginUrl()} className="flex items-center gap-2">
                Começar Gratuitamente <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

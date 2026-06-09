import { Link } from "wouter";
import { ArrowRight, Award, Clock, DollarSign, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Certifications() {
  const certifications = [
    {
      id: 1,
      title: "Google Cloud Professional Data Engineer",
      provider: "Google Cloud",
      icon: "🔵",
      level: "Profissional",
      duration: "3-4 meses",
      price: "Pago (~R$ 500)",
      difficulty: "Avançado",
      color: "from-blue-500 to-cyan-500",
      description: "Certificação oficial do Google Cloud para engenheiros de dados.",
      benefits: [
        "Reconhecimento global",
        "Aumento salarial",
        "Acesso a comunidade Google Cloud",
        "Recursos de aprendizado exclusivos",
      ],
      topics: [
        "BigQuery",
        "Data Processing",
        "Machine Learning",
        "Data Pipelines",
      ],
      exam: {
        duration: "2 horas",
        questions: "50-60 questões",
        passRate: "70%",
      },
    },
    {
      id: 2,
      title: "Kaggle Data Scientist",
      provider: "Kaggle",
      icon: "🏆",
      level: "Intermediário",
      duration: "2-3 meses",
      price: "Gratuito",
      difficulty: "Intermediário",
      color: "from-green-500 to-emerald-500",
      description: "Certificação por competição na plataforma Kaggle.",
      benefits: [
        "Totalmente gratuito",
        "Comunidade ativa",
        "Prêmios em dinheiro",
        "Portfólio prático",
      ],
      topics: [
        "Exploratory Data Analysis",
        "Feature Engineering",
        "Model Building",
        "Competitions",
      ],
      exam: {
        duration: "Variável",
        questions: "Projetos práticos",
        passRate: "Baseado em ranking",
      },
    },
    {
      id: 3,
      title: "DeepLearning.AI Specialization",
      provider: "DeepLearning.AI",
      icon: "🧠",
      level: "Avançado",
      duration: "4-6 meses",
      price: "Pago (~R$ 300/mês)",
      difficulty: "Avançado",
      color: "from-purple-500 to-pink-500",
      description: "Especialização completa em Deep Learning e IA.",
      benefits: [
        "Conteúdo de qualidade",
        "Projetos práticos",
        "Certificado reconhecido",
        "Suporte de comunidade",
      ],
      topics: [
        "Neural Networks",
        "Convolutional Networks",
        "Recurrent Networks",
        "Transformers",
      ],
      exam: {
        duration: "Variável",
        questions: "Projetos e quizzes",
        passRate: "80%",
      },
    },
    {
      id: 4,
      title: "Hugging Face NLP Course",
      provider: "Hugging Face",
      icon: "🤗",
      level: "Intermediário",
      duration: "2-3 meses",
      price: "Gratuito",
      difficulty: "Intermediário",
      color: "from-orange-500 to-red-500",
      description: "Curso completo de NLP com Hugging Face Transformers.",
      benefits: [
        "Totalmente gratuito",
        "Conteúdo atualizado",
        "Comunidade Hugging Face",
        "Projetos reais",
      ],
      topics: [
        "Transformers",
        "NLP Tasks",
        "Fine-tuning",
        "Model Deployment",
      ],
      exam: {
        duration: "Variável",
        questions: "Projetos práticos",
        passRate: "Baseado em conclusão",
      },
    },
    {
      id: 5,
      title: "Microsoft Azure AI Engineer",
      provider: "Microsoft",
      icon: "☁️",
      level: "Profissional",
      duration: "3-4 meses",
      price: "Pago (~R$ 500)",
      difficulty: "Avançado",
      color: "from-indigo-500 to-purple-500",
      description: "Certificação oficial do Microsoft Azure para engenheiros de IA.",
      benefits: [
        "Reconhecimento global",
        "Acesso Azure",
        "Recursos Microsoft",
        "Comunidade profissional",
      ],
      topics: [
        "Azure Machine Learning",
        "Cognitive Services",
        "AI Solutions",
        "Model Deployment",
      ],
      exam: {
        duration: "1,5 horas",
        questions: "40-60 questões",
        passRate: "70%",
      },
    },
    {
      id: 6,
      title: "AWS Machine Learning Specialty",
      provider: "AWS",
      icon: "🟠",
      level: "Profissional",
      duration: "3-4 meses",
      price: "Pago (~R$ 500)",
      difficulty: "Avançado",
      color: "from-yellow-500 to-orange-500",
      description: "Certificação oficial AWS para especialistas em Machine Learning.",
      benefits: [
        "Reconhecimento global",
        "Acesso AWS",
        "Recursos de aprendizado",
        "Comunidade AWS",
      ],
      topics: [
        "SageMaker",
        "Data Preparation",
        "Model Training",
        "Model Deployment",
      ],
      exam: {
        duration: "2,5 horas",
        questions: "65 questões",
        passRate: "72%",
      },
    },
  ];

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

      {/* Certifications Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="group border border-border rounded-xl bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
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
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50"
                  >
                    Saiba Mais
                  </Button>
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

          <Link href="/learning-path">
            <a className="btn-primary inline-flex items-center gap-2">
              Explorar Trilha <ArrowRight className="w-5 h-5" />
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}

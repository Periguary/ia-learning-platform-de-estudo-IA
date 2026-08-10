'use client';

import { ArrowRight, Zap, Users, Award, TrendingUp, BookOpen, Code2, Brain, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

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
    { label: "Cursos Criados", value: "25.000+", icon: BookOpen },
    { label: "Países com Certificados", value: "+100", icon: Award },
    { label: "Alunos Ativos", value: "250.000+", icon: Users },
    { label: "Avaliação Média", value: "4.6/5.0", icon: TrendingUp },
  ];

  const whyChooseUs = [
    {
      title: "Conteúdo de Qualidade",
      description: "Acesso a conteúdo global moderno e relevante, selecionado por profissionais de ponta.",
      image: "/manus-storage/why-choose-1_407a531a.webp",
    },
    {
      title: "Estude no Seu Ritmo",
      description: "Aprenda o que importa no seu próprio ritmo. Ajuste a carga de trabalho e defina o conteúdo.",
      image: "/manus-storage/why-choose-2_b290ed91.webp",
    },
    {
      title: "Certificado Garantido",
      description: "Certificado válido e reconhecido por empresas e instituições governamentais.",
      image: "/manus-storage/why-choose-3_a2b08ebb.webp",
    },
  ];

  const testimonials = [
    {
      id: "testimonial-1",
      name: "Giulio Carlo",
      role: "Estudante de Marketing Digital",
      content: "Suas aulas são perfeitas. Adquiri o pacote de um ano e finalmente tenho a oportunidade de acompanhar vários temas de meu interesse sem precisar trocar de plataforma... Agradeço por tudo que fazem, já indiquei vocês para outras pessoas...",
      avatar: "/manus-storage/giulio-carlo.webp", // Placeholder, replace with actual uploaded image
    },
    {
      id: "testimonial-2",
      name: "Ana Santos",
      role: "Engenheira de ML",
      content: "Os projetos práticos foram fundamentais para consolidar meu conhecimento em produção.",
      avatar: "👩‍💻",
    },
    {
      id: "testimonial-3",
      name: "João Oliveira",
      role: "Especialista em IA",
      content: "Melhor investimento que fiz em minha formação. Recomendo para todos!",
      avatar: "👨‍🎓",
    },
  ];

  const faqs = [
    {
      id: "faq-1",
      question: "Qual é o tempo estimado para completar a trilha?",
      answer: "A trilha completa leva aproximadamente 12-18 meses, dependendo do seu ritmo. Você pode estudar no seu próprio tempo.",
    },
    {
      id: "faq-2",
      question: "Preciso ter conhecimento prévio?",
      answer: "Não! A trilha começa do zero com fundamentos matemáticos. Qualquer pessoa pode começar.",
    },
    {
      id: "faq-3",
      question: "Os certificados são reconhecidos?",
      answer: "Sim! Oferecemos certificações de provedores renomados como Google Cloud, Kaggle e DeepLearning.AI.",
    },
    {
      id: "faq-4",
      question: "Há suporte durante o aprendizado?",
      answer: "Sim! Temos comunidade ativa, FAQ e recursos de suporte disponíveis.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-blue-600 text-white overflow-hidden py-20">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Aprenda o que importa para acelerar seu sucesso
            </h1>
            <p className="text-lg max-w-lg">
              Cursos online gratuitos. Você decide como, quanto e o que estudar para alcançar seus objetivos.
            </p>

            <div className="relative w-full max-w-md">
              <Input
                type="text"
                placeholder="Encontre seu curso..."
                className="w-full py-3 pl-10 pr-4 rounded-full bg-white text-gray-900 border-none focus:ring-2 focus:ring-blue-300"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {user ? (
                <Button
                  onClick={() => navigate("/learning-path")}
                  className="bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold"
                >
                  Começar Trilha <ArrowRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold"
                >
                  <a href={getLoginUrl()}>
                    Começar Gratuitamente <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Right Visual - Placeholder for an image or illustration */}
          <div className="relative hidden md:block">
            <img src="/manus-storage/hero-elevify_730d00a0.webp" alt="Learn what matters" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-blue-700 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <stat.icon className="w-8 h-8 mx-auto text-blue-200" />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-blue-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white text-gray-900">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Por que escolher a IA Academy?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Descubra os diferenciais que nos tornam a melhor opção para sua jornada em IA.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md text-center space-y-4">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trilha Overview - Course Categories */}
      <section id="trilha" className="py-20 bg-gray-100 text-gray-900">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Explore Nossas Categorias de Cursos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Encontre a trilha perfeita para o seu desenvolvimento profissional.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, index) => (
              <div
                key={`phase-${phase.number}`}
                className="group relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{phase.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                <p className="text-gray-600 text-sm">{phase.description}</p>
                <Button
                  variant="link"
                  className="mt-4 p-0 text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  onClick={() => navigate("/learning-path")}
                >
                  Ver Cursos <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={() => navigate("/learning-path")}
              className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold mx-auto"
            >
              Explorar Trilha Completa <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white text-gray-900">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">O que Dizem Nossos Alunos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Histórias de sucesso e transformação de carreira</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-6 border border-gray-200 rounded-xl bg-gray-50 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  {testimonial.avatar.startsWith('/') ? (
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="text-4xl">{testimonial.avatar}</div>
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-100 text-gray-900">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Perguntas Frequentes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Tudo que você precisa saber sobre a plataforma</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group border border-gray-200 rounded-lg bg-white p-6 cursor-pointer hover:border-blue-300 transition-colors"
              >
                <summary className="flex items-center justify-between font-semibold text-gray-800">
                  <span>{faq.question}</span>
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Pronto para Começar?</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Junte-se a milhares de alunos que estão transformando suas carreiras em IA e Ciência de Dados.
            </p>
          </div>

          {user ? (
            <Button
              onClick={() => navigate("/learning-path")}
              className="bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold mx-auto"
            >
              Acessar Trilha <ArrowRight className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold mx-auto"
            >
              <a href={getLoginUrl()}>
                Começar Gratuitamente <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

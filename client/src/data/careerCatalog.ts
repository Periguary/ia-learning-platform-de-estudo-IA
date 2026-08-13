export interface CareerRoadmapItem {
  phase: number;
  title: string;
  modules: number;
  duration: string;
}

export interface CareerProfile {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  salary: string;
  experience: string;
  responsibilities: readonly string[];
  skills: readonly string[];
  tools: readonly string[];
  roadmap: readonly CareerRoadmapItem[];
  companies: readonly string[];
  jobMarket: {
    demand: string;
    growth: string;
    locations: readonly string[];
  };
  dayInLife: readonly string[];
}

export const careerCatalog: readonly CareerProfile[] = [
  {
    id: 1,
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
    skills: ["Python/R", "SQL", "Estatística", "Visualização de Dados", "Machine Learning", "Comunicação", "Business Acumen", "Excel Avançado"],
    tools: ["Python", "SQL", "Tableau", "Power BI", "Excel", "Jupyter", "Git", "Pandas"],
    roadmap: [
      { phase: 1, title: "Fundamentos Matemáticos", modules: 3, duration: "4 semanas" },
      { phase: 2, title: "Python Profissional", modules: 3, duration: "6 semanas" },
      { phase: 3, title: "SQL e Banco de Dados", modules: 3, duration: "4 semanas" },
      { phase: 4, title: "Análise de Dados", modules: 3, duration: "5 semanas" },
      { phase: 5, title: "Machine Learning", modules: 4, duration: "8 semanas" },
    ],
    companies: ["Google", "Microsoft", "Amazon", "Meta", "Uber", "Netflix"],
    jobMarket: { demand: "Muito Alto", growth: "+15% ao ano", locations: ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Remoto"] },
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
  {
    id: 2,
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
  {
    id: 3,
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
    companies: ["OpenAI", "Google", "Meta", "Microsoft", "NVIDIA", "Startups de tecnologia"],
    jobMarket: { demand: "Muito Alto", growth: "+22% ao ano", locations: ["São Paulo", "Campinas", "Remoto", "Exterior"] },
    dayInLife: ["08:30 - Revisar arquitetura e riscos", "10:00 - Prototipar uma solução", "13:30 - Revisar integração de modelos", "15:00 - Orientar o time", "17:00 - Registrar decisões e próximos passos"],
  },
  {
    id: 4,
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
  {
    id: 5,
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
  {
    id: 6,
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
];

export const careerById = (id: number) => careerCatalog.find((career) => career.id === id) ?? careerCatalog[0];

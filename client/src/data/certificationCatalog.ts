export interface CertificationProfile {
  id: number;
  title: string;
  provider: string;
  icon: string;
  level: string;
  duration: string;
  price: string;
  difficulty: string;
  color: string;
  description: string;
  url: string;
  benefits: readonly string[];
  topics: readonly string[];
  exam: {
    duration: string;
    questions: string;
    passRate: string;
  };
}

export const certificationCatalog: readonly CertificationProfile[] = [
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
    url: "https://cloud.google.com/learn/certification/data-engineer",
    benefits: ["Reconhecimento global", "Aumento salarial", "Acesso a comunidade Google Cloud", "Recursos de aprendizado exclusivos"],
    topics: ["BigQuery", "Data Processing", "Machine Learning", "Data Pipelines"],
    exam: { duration: "2 horas", questions: "50-60 questões", passRate: "70%" },
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
    description: "Trilhas práticas e competições na plataforma Kaggle.",
    url: "https://www.kaggle.com/learn",
    benefits: ["Totalmente gratuito", "Comunidade ativa", "Prêmios em dinheiro", "Portfólio prático"],
    topics: ["Exploratory Data Analysis", "Feature Engineering", "Model Building", "Competitions"],
    exam: { duration: "Variável", questions: "Projetos práticos", passRate: "Baseado em ranking" },
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
    description: "Cursos e especializações em Deep Learning e IA.",
    url: "https://www.deeplearning.ai/courses/",
    benefits: ["Conteúdo de qualidade", "Projetos práticos", "Certificado reconhecido", "Suporte de comunidade"],
    topics: ["Neural Networks", "Convolutional Networks", "Recurrent Networks", "Transformers"],
    exam: { duration: "Variável", questions: "Projetos e quizzes", passRate: "80%" },
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
    url: "https://huggingface.co/learn/nlp-course/chapter1/1",
    benefits: ["Totalmente gratuito", "Conteúdo atualizado", "Comunidade Hugging Face", "Projetos reais"],
    topics: ["Transformers", "NLP Tasks", "Fine-tuning", "Model Deployment"],
    exam: { duration: "Variável", questions: "Projetos práticos", passRate: "Baseado em conclusão" },
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
    url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/",
    benefits: ["Reconhecimento global", "Acesso Azure", "Recursos Microsoft", "Comunidade profissional"],
    topics: ["Azure Machine Learning", "Cognitive Services", "AI Solutions", "Model Deployment"],
    exam: { duration: "1,5 horas", questions: "40-60 questões", passRate: "70%" },
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
    url: "https://aws.amazon.com/certification/certified-machine-learning-specialty/",
    benefits: ["Reconhecimento global", "Acesso AWS", "Recursos de aprendizado", "Comunidade AWS"],
    topics: ["SageMaker", "Data Preparation", "Model Training", "Model Deployment"],
    exam: { duration: "2,5 horas", questions: "65 questões", passRate: "72%" },
  },
];

export const certificationById = (id: number) => certificationCatalog.find((certification) => certification.id === id) ?? certificationCatalog[0];

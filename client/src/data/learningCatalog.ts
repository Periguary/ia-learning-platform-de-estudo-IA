import { coursesData } from "./coursesData";

const phaseDefinitions = [
  {
    id: 1,
    title: "Fundamentos Matemáticos",
    description: "Domine os conceitos matemáticos essenciais para IA: Álgebra Linear, Estatística e Probabilidade.",
    icon: "📐",
    color: "from-blue-500 to-cyan-500",
    moduleIds: ["linear-algebra", "statistics", "probability"],
    duration: "4 semanas",
    difficulty: "Iniciante",
  },
  {
    id: 2,
    title: "Python Profissional",
    description: "Aprenda programação em Python do básico ao avançado com foco em dados e IA.",
    icon: "🐍",
    color: "from-green-500 to-emerald-500",
    moduleIds: ["python-basics"],
    duration: "6 semanas",
    difficulty: "Iniciante",
  },
  {
    id: 3,
    title: "SQL e Bancos de Dados",
    description: "Aprenda consultas eficientes, modelagem e manipulação de dados relacionais.",
    icon: "🗄️",
    color: "from-orange-500 to-red-500",
    moduleIds: ["sql-basics"],
    duration: "4 semanas",
    difficulty: "Intermediário",
  },
  {
    id: 4,
    title: "Análise de Dados",
    description: "Processe e analise grandes volumes de dados utilizando NumPy e Pandas.",
    icon: "📊",
    color: "from-purple-500 to-pink-500",
    moduleIds: ["numpy", "pandas"],
    duration: "5 semanas",
    difficulty: "Intermediário",
  },
  {
    id: 5,
    title: "Machine Learning",
    description: "Construa modelos preditivos inteligentes usando algoritmos clássicos de ML.",
    icon: "🤖",
    color: "from-indigo-500 to-purple-500",
    moduleIds: ["ml-fundamentals"],
    duration: "8 semanas",
    difficulty: "Avançado",
  },
  {
    id: 6,
    title: "Deep Learning",
    description: "Compreenda redes neurais profundas e arquiteturas avançadas de aprendizado.",
    icon: "🧠",
    color: "from-red-500 to-pink-500",
    moduleIds: ["neural-networks"],
    duration: "8 semanas",
    difficulty: "Avançado",
  },
  {
    id: 7,
    title: "IA Generativa",
    description: "Explore Grandes Modelos de Linguagem (LLMs), arquitetura Transformer e geração de texto.",
    icon: "✨",
    color: "from-yellow-500 to-orange-500",
    moduleIds: ["llms"],
    duration: "7 semanas",
    difficulty: "Avançado",
  },
  {
    id: 8,
    title: "Engenharia de Software para IA",
    description: "Aprenda engenharia de software robusta, Git, Docker, DevOps e boas práticas.",
    icon: "⚙️",
    color: "from-teal-500 to-cyan-500",
    moduleIds: ["software-engineering"],
    duration: "7 semanas",
    difficulty: "Avançado",
  },
] as const;

export const learningPhases = phaseDefinitions.map((phase) => ({
  ...phase,
  modules: phase.moduleIds
    .filter((moduleId) => Boolean(coursesData[moduleId]))
    .map((moduleId) => ({
      id: moduleId,
      title: coursesData[moduleId].title,
      lessons: coursesData[moduleId].lessons,
    })),
}));

export type LearningPhase = (typeof learningPhases)[number];

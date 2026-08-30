export type FreeLearningKind = "Curso gratuito" | "Badge / credencial" | "Microcurso com certificado";

export interface FreeLearningResource {
  id: string;
  title: string;
  provider: string;
  kind: FreeLearningKind;
  level: "Iniciante" | "Intermediário" | "Avançado";
  description: string;
  topics: readonly string[];
  url: string;
  accessNote: string;
  color: string;
}

/**
 * Recursos oficiais com acesso gratuito confirmado na fonte indicada.
 * Badge, credencial e certificado de conclusão não equivalem a um exame
 * profissional pago; essa distinção é exibida deliberadamente na interface.
 */
export const freeLearningCatalog: readonly FreeLearningResource[] = [
  {
    id: "microsoft-ai-foundations",
    title: "AI concepts for developers and technology professionals",
    provider: "Microsoft Learn",
    kind: "Curso gratuito",
    level: "Iniciante",
    description: "Trilha autodirigida para fundamentos de IA, Microsoft Foundry e desenvolvimento de soluções responsáveis.",
    topics: ["Fundamentos de IA", "Azure", "IA responsável"],
    url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/",
    accessNote: "Conteúdo de estudo gratuito; o exame de certificação AI-901 é uma etapa separada e paga.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "microsoft-applied-skills-agents",
    title: "Create agents in Microsoft Copilot Studio",
    provider: "Microsoft Applied Skills",
    kind: "Badge / credencial",
    level: "Intermediário",
    description: "Credencial prática baseada em laboratório para demonstrar a criação de agentes em um cenário real.",
    topics: ["Agentes", "Copilot Studio", "Automação"],
    url: "https://aka.ms/MAS-Create",
    accessNote: "A avaliação interativa é apresentada pela Microsoft como gratuita; exige conta e disponibilidade regional.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: "google-generative-ai-foundations",
    title: "Beginner: Introduction to Generative AI",
    provider: "Google Skills",
    kind: "Curso gratuito",
    level: "Iniciante",
    description: "Percurso introdutório sobre modelos generativos, LLMs e princípios de IA responsável.",
    topics: ["IA generativa", "LLMs", "IA responsável"],
    url: "https://www.skills.google/paths/118",
    accessNote: "O plano Starter não tem custo; laboratórios práticos podem consumir créditos gratuitos mensais.",
    color: "from-violet-500 to-fuchsia-600",
  },
  {
    id: "google-cloud-foundations",
    title: "Google Cloud Computing Foundations",
    provider: "Google Skills",
    kind: "Badge / credencial",
    level: "Iniciante",
    description: "Trilha de fundamentos de computação em nuvem para construir uma base antes dos laboratórios de IA.",
    topics: ["Cloud", "Infraestrutura", "Dados"],
    url: "https://www.skills.google/paths/36",
    accessNote: "O Starter é sem custo e oferece créditos limitados; a disponibilidade de cada badge pode variar.",
    color: "from-blue-500 to-emerald-500",
  },
  {
    id: "aws-free-ai-training",
    title: "AWS Skill Builder: cursos digitais gratuitos",
    provider: "AWS",
    kind: "Curso gratuito",
    level: "Iniciante",
    description: "Catálogo oficial de cursos autodirigidos para cloud, dados e inteligência artificial em diferentes níveis.",
    topics: ["AWS", "Machine Learning", "Cloud"],
    url: "https://skillbuilder.aws/search?page=1&accessTier=free",
    accessNote: "A AWS informa que há mais de 1.000 recursos gratuitos; alguns laboratórios e preparatórios exigem assinatura.",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "kaggle-microcourses",
    title: "Kaggle Learn: microcursos de dados e IA",
    provider: "Kaggle",
    kind: "Microcurso com certificado",
    level: "Iniciante",
    description: "Microcursos práticos de Python, pandas, machine learning, visão computacional e SQL.",
    topics: ["Python", "Pandas", "Machine Learning"],
    url: "https://www.kaggle.com/learn/overview",
    accessNote: "Cursos gratuitos; a página oficial informa certificado de conclusão para cada curso finalizado.",
    color: "from-sky-500 to-indigo-500",
  },
  {
    id: "huggingface-nlp-course",
    title: "NLP Course",
    provider: "Hugging Face",
    kind: "Curso gratuito",
    level: "Intermediário",
    description: "Curso aberto sobre Transformers, datasets, fine-tuning e aplicações modernas de NLP.",
    topics: ["Transformers", "NLP", "Fine-tuning"],
    url: "https://huggingface.co/learn/nlp-course/chapter1/1",
    accessNote: "Material gratuito e aberto; não é apresentado como certificação profissional oficial.",
    color: "from-orange-500 to-pink-600",
  },
];

export const freeCredentials = freeLearningCatalog.filter(resource => resource.kind !== "Curso gratuito");
export const freeCourses = freeLearningCatalog.filter(resource => resource.kind === "Curso gratuito" || resource.kind === "Microcurso com certificado");

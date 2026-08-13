export type VideoCategory = "Fundamentos" | "Machine Learning" | "LLMs e Transformers" | "IA Responsável";

export type VideoItem = {
  id: string;
  title: string;
  provider: string;
  category: VideoCategory;
  description: string;
  durationLabel: string;
  freeNote: string;
  sourceUrl: string;
  embedUrl: string;
  relatedModule: string;
  colabUrl?: string;
};

export const videoCatalog: VideoItem[] = [
  {
    id: "google-generative-ai-intro",
    title: "Introduction to Generative AI",
    provider: "Google AI",
    category: "Fundamentos",
    description: "Introdução em vídeo aos conceitos de IA generativa, seus usos e diferença para o machine learning tradicional.",
    durationLabel: "Curso curto",
    freeNote: "A página oficial indica No charge para o conteúdo introdutório.",
    sourceUrl: "https://www.youtube.com/watch?v=G2fqAlgmoPo",
    embedUrl: "https://www.youtube.com/embed/G2fqAlgmoPo",
    relatedModule: "llms",
  },
  {
    id: "google-ml-crash-course",
    title: "Machine Learning Crash Course",
    provider: "Google for Developers",
    category: "Machine Learning",
    description: "Playlist oficial com vídeos animados, visualizações interativas e prática sobre regressão, classificação, redes neurais e fairness.",
    durationLabel: "Playlist com 10 vídeos",
    freeNote: "Curso público com visualizações e exercícios online gratuitos.",
    sourceUrl: "https://www.youtube.com/playlist?list=PLOU2XLYxmsILTKLltkh859KJ9BizDvd_S",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLOU2XLYxmsILTKLltkh859KJ9BizDvd_S",
    relatedModule: "ml-fundamentals",
    colabUrl: "https://colab.research.google.com/",
  },
  {
    id: "huggingface-course-playlist",
    title: "Hugging Face Course",
    provider: "Hugging Face",
    category: "LLMs e Transformers",
    description: "Playlist com aulas sobre pipelines, transfer learning, Transformers e práticas do ecossistema open source.",
    durationLabel: "Playlist de aulas",
    freeNote: "Aulas públicas e gratuitas no canal oficial da Hugging Face.",
    sourceUrl: "https://www.youtube.com/playlist?list=PLo2EIpI_JMQvWfQndUesu0nPBAtZ9gP1o",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLo2EIpI_JMQvWfQndUesu0nPBAtZ9gP1o",
    relatedModule: "llms",
    colabUrl: "https://huggingface.co/learn",
  },
  {
    id: "google-responsible-ai",
    title: "Introduction to Responsible AI",
    provider: "Google AI",
    category: "IA Responsável",
    description: "Vídeo introdutório sobre princípios de responsabilidade, segurança e impactos sociais no desenvolvimento de IA.",
    durationLabel: "Vídeo introdutório",
    freeNote: "Disponível gratuitamente na área de aprendizagem do Google AI.",
    sourceUrl: "https://ai.google/learn-ai-skills/",
    embedUrl: "https://ai.google/learn-ai-skills/",
    relatedModule: "software-engineering",
  },
];

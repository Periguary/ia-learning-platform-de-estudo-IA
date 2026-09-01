export type VideoCategory = "Fundamentos" | "Machine Learning" | "LLMs e Transformers" | "IA Responsável" | "Visão Computacional" | "Redes Neurais" | "Computação Cognitiva" | "Redes Generativas";

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
    id: "google-cnn-foundations",
    title: "Machine Learning Foundations: CNNs",
    provider: "Google for Developers",
    category: "Redes Neurais",
    description: "Aula oficial sobre convoluções e pooling para construir uma rede neural convolucional simples.",
    durationLabel: "Aula técnica",
    freeNote: "Conteúdo público da documentação e do canal oficial do Google for Developers.",
    sourceUrl: "https://developers.google.com/machine-learning/crash-course/neural-networks",
    embedUrl: "https://developers.google.com/machine-learning/crash-course/neural-networks",
    relatedModule: "convolutional-neural-networks",
  },
  {
    id: "deeplearningai-cnn-playlist",
    title: "Convolutional Neural Networks",
    provider: "DeepLearning.AI",
    category: "Visão Computacional",
    description: "Playlist oficial sobre visão computacional, edge detection, pooling e arquiteturas convolucionais.",
    durationLabel: "Playlist de aulas",
    freeNote: "Vídeos públicos no canal oficial; o acesso ao vídeo não implica certificado profissional.",
    sourceUrl: "https://www.youtube.com/playlist?list=PLkDaE6sCZn6Gl29AoE31iwdVwSG-KnDzF",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLkDaE6sCZn6Gl29AoE31iwdVwSG-KnDzF",
    relatedModule: "convolutional-neural-networks",
  },
  {
    id: "opencv-official-talks",
    title: "OpenCV Official Talks & Tutorials",
    provider: "OpenCV",
    category: "Visão Computacional",
    description: "Canal oficial com palestras e demonstrações do ecossistema OpenCV para visão computacional.",
    durationLabel: "Canal oficial",
    freeNote: "A IA Academy apenas aponta para o canal oficial; o conteúdo permanece hospedado pelo desenvolvedor.",
    sourceUrl: "https://www.youtube.com/@opencvofficial",
    embedUrl: "https://opencv.org/",
    relatedModule: "image-processing",
  },
  {
    id: "microsoft-cognitive-ai",
    title: "Microsoft AI learning videos",
    provider: "Microsoft Learn",
    category: "Computação Cognitiva",
    description: "Vídeos e demonstrações oficiais sobre agentes, percepção multimodal, Copilot e aplicações cognitivas responsáveis.",
    durationLabel: "Coleção oficial",
    freeNote: "Aulas e demonstrações acessíveis pela central oficial de aprendizagem da Microsoft.",
    sourceUrl: "https://learn.microsoft.com/en-us/ai/",
    embedUrl: "https://learn.microsoft.com/en-us/ai/",
    relatedModule: "cognitive-computing",
  },
  {
    id: "google-generative-ai-videos",
    title: "Google Cloud Generative AI",
    provider: "Google Cloud",
    category: "Redes Generativas",
    description: "Vídeos e materiais oficiais sobre modelos generativos, fundamentos de LLMs e aplicações em cloud.",
    durationLabel: "Coleção oficial",
    freeNote: "Use os vídeos e materiais na página oficial; não há download ou redistribuição dentro da plataforma.",
    sourceUrl: "https://cloud.google.com/ai/generative-ai",
    embedUrl: "https://cloud.google.com/ai/generative-ai",
    relatedModule: "generative-neural-networks",
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

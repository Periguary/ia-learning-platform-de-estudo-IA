export type AIUpdateCategory = "Modelos" | "Agentes" | "Open Source" | "Segurança" | "Pesquisa";

export type AIUpdate = {
  id: string;
  title: string;
  summary: string;
  category: AIUpdateCategory;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  relatedModules: string[];
  learningAction: string;
};

/**
 * Curadoria editorial inicial. Os links apontam para fontes oficiais e não são
 * tratados como prova de que todo item deve entrar automaticamente na trilha.
 * A atualização automática deverá criar candidatos para revisão antes de publicar.
 */
export const updatesCatalog: AIUpdate[] = [
  {
    id: "openai-gpt-5-6-builder-guide",
    title: "The builder's guide to GPT-5.6",
    summary: "Guia oficial para desenvolvedores sobre a família GPT-5.6 e suas possibilidades de construção de aplicações.",
    category: "Modelos",
    sourceName: "OpenAI News",
    sourceUrl: "https://openai.com/news/",
    publishedAt: "2026-08-13",
    relatedModules: ["llms", "software-engineering"],
    learningAction: "Revise LLMs e compare o papel de modelo, prompt, contexto e avaliação antes de experimentar uma API.",
  },
  {
    id: "deepmind-gemini-3-7-flash",
    title: "Introducing Gemini 3.7 Flash",
    summary: "Atualização oficial da família Gemini destacada no blog do Google DeepMind, útil para acompanhar modelos de baixa latência.",
    category: "Modelos",
    sourceName: "Google DeepMind",
    sourceUrl: "https://deepmind.google/blog/",
    publishedAt: "2026-08-01",
    relatedModules: ["llms", "neural-networks"],
    learningAction: "Estude a relação entre latência, custo, qualidade e avaliação de modelos antes de escolher um modelo para produção.",
  },
  {
    id: "huggingface-open-agents",
    title: "Deploy local agents everywhere with LFM2.5-2.6B",
    summary: "Artigo apresentado na comunidade Hugging Face sobre agentes locais e modelos abertos, um ponto de partida para discutir execução local.",
    category: "Open Source",
    sourceName: "Hugging Face Blog",
    sourceUrl: "https://huggingface.co/blog",
    publishedAt: "2026-08-04",
    relatedModules: ["llms", "software-engineering"],
    learningAction: "Compare agentes locais e hospedados considerando memória, segurança, custo operacional e observabilidade.",
  },
  {
    id: "opencv-ai-competition-2026",
    title: "OpenCV lança competição de IA com foco em visão computacional",
    summary: "A publicação oficial anuncia uma competição global de visão computacional para desenvolvedores, pesquisadores e equipes, com prêmios totais de US$ 12.000.",
    category: "Open Source",
    sourceName: "OpenCV",
    sourceUrl: "https://opencv.org/opencv-launches-ai-competition-powered-by-amazon-web-services/",
    publishedAt: "2026-08-12",
    relatedModules: ["computer-vision", "neural-networks"],
    learningAction: "Revise o pipeline de imagens, pratique leitura e transformação com OpenCV e compare um baseline clássico com um classificador visual.",
  },
  {
    id: "pytorch-transfer-learning-vision",
    title: "PyTorch mantém tutorial oficial de Transfer Learning para Visão",
    summary: "O tutorial oficial demonstra classificação de imagens com CNN e compara fine-tuning de uma rede pré-treinada com o uso da rede como extrator fixo de características.",
    category: "Pesquisa",
    sourceName: "PyTorch Tutorials",
    sourceUrl: "https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html",
    publishedAt: "2025-01-27",
    relatedModules: ["computer-vision", "neural-networks"],
    learningAction: "Estude separação entre treino, validação e teste e implemente os dois cenários de transfer learning em um pequeno dataset com licença compatível.",
  },
  {
    id: "nist-ai-rmf-critical-infrastructure",
    title: "AI RMF Profile on Trustworthy AI in Critical Infrastructure",
    summary: "Nota conceitual do NIST para orientar práticas de gestão de riscos de IA em infraestrutura crítica.",
    category: "Segurança",
    sourceName: "NIST",
    sourceUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
    publishedAt: "2026-04-07",
    relatedModules: ["software-engineering", "llms"],
    learningAction: "Aplique Governar, Mapear, Medir e Gerenciar a um projeto de IA antes de colocá-lo em produção.",
  },
];

export const updatesLastReviewedAt = "2026-08-13";

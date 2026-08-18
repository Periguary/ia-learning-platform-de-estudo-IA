export type LibraryCategory = "Livros Clássicos" | "Apostilas Técnicas" | "Artigos Fundamentais" | "Whitepapers e Guias";

export type LibraryItem = {
  id: string;
  title: string;
  category: LibraryCategory;
  author: string;
  year: string;
  description: string;
  format: "PDF" | "Notebook" | "Artigo" | "Repositório";
  officialUrl: string;
  localFileHint: string;
  relatedModule: string;
};

export const libraryCatalog: LibraryItem[] = [
  {
    id: "deep-learning-book-goodfellow",
    title: "Deep Learning Book (MIT Press)",
    category: "Livros Clássicos",
    author: "Ian Goodfellow, Yoshua Bengio e Aaron Courville",
    year: "2016",
    description: "A bíblia matemática e teórica do aprendizado profundo, cobrindo algebra linear, otimização, redes neurais e aprendizado generativo.",
    format: "PDF",
    officialUrl: "https://www.deeplearningbook.org/",
    localFileHint: "Disponível gratuitamente online pelo MIT Press.",
    relatedModule: "neural-networks",
  },
  {
    id: "attention-is-all-you-need-paper",
    title: "Attention Is All You Need",
    category: "Artigos Fundamentais",
    author: "Ashish Vaswani et al. (Google Brain)",
    year: "2017",
    description: "O artigo seminal que introduziu a arquitetura Transformer, revolucionando o processamento de linguagem natural.",
    format: "Artigo",
    officialUrl: "https://arxiv.org/abs/1706.03762",
    localFileHint: "Disponível no arXiv e Hugging Face Papers.",
    relatedModule: "llms",
  },
  {
    id: "scikit-learn-user-guide",
    title: "Scikit-Learn Official User Guide & Tutorials",
    category: "Apostilas Técnicas",
    author: "Scikit-Learn Developers",
    year: "2026",
    description: "Apostila prática indispensável com implementações em Python de regressão, classificação, clustering e validação cruzada.",
    format: "Notebook",
    officialUrl: "https://scikit-learn.org/stable/user_guide.html",
    localFileHint: "Acompanha exemplos executáveis em Jupyter Notebook.",
    relatedModule: "ml-fundamentals",
  },
  {
    id: "nist-ai-rmf-guide",
    title: "NIST Artificial Intelligence Risk Management Framework",
    category: "Whitepapers e Guias",
    author: "U.S. Department of Commerce (NIST)",
    year: "2023",
    description: "Guia abrangente para governar, mapear, medir e gerenciar riscos associados a sistemas de inteligência artificial.",
    format: "PDF",
    officialUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
    localFileHint: "Documento oficial de referência governamental.",
    relatedModule: "software-engineering",
  },
  {
    id: "huggingface-nlp-course",
    title: "Hugging Face NLP Course",
    category: "Apostilas Técnicas",
    author: "Hugging Face Community",
    year: "2026",
    description: "Curso completo em formato de apostila interativa sobre como treinar, fine-sonar e usar modelos de Hugging Face com PyTorch.",
    format: "Repositório",
    officialUrl: "https://huggingface.co/docs/transformers/index",
    localFileHint: "Inclui guias passo a passo para integração com VS Code.",
    relatedModule: "llms",
  },
  {
    id: "fraude-cartao-ia-analise",
    title: "IA na Detecção de Fraudes em Cartões de Crédito: Uma Análise Crítica",
    category: "Artigos Fundamentais",
    author: "Periguary Cysne Lima (Análise por Manus AI)",
    year: "2026",
    description: "Análise detalhada sobre a aplicação de soluções híbridas (Redes Neurais e Sistemas Especialistas) na detecção de fraudes financeiras utilizando a base do Kaggle.",
    format: "Artigo",
    officialUrl: "https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud",
    localFileHint: "A análise local usa como referência o conjunto de dados público de fraude de cartões disponível no Kaggle.",
    relatedModule: "ml-fundamentals",
  },
  {
    id: "llama3-model-card",
    title: "Llama 3 Open Foundation and Fine-Tuned Chat Models",
    category: "Whitepapers e Guias",
    author: "Meta AI Research Team",
    year: "2024",
    description: "Documentação oficial e card técnico dos modelos Llama 3, detalhando arquitetura, alinhamento de segurança, tokenizer e benchmarks comparativos.",
    format: "PDF",
    officialUrl: "https://ai.meta.com/research/publications/llama-3-model-card/",
    localFileHint: "Disponível publicamente no portal de pesquisa da Meta AI.",
    relatedModule: "llms",
  },
  {
    id: "openai-gpt4-technical-report",
    title: "GPT-4 Technical Report",
    category: "Artigos Fundamentais",
    author: "OpenAI Research",
    year: "2023",
    description: "Relatório técnico explorando capacidades em larga escala, infraestrutura de treinamento, desafios de alinhamento e avaliações de segurança de modelos avançados.",
    format: "Artigo",
    officialUrl: "https://arxiv.org/abs/2303.08774",
    localFileHint: "Publicado no arXiv e indexado em bases de pesquisa em IA.",
    relatedModule: "ai-agents",
  },
];

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
    officialUrl: "/papers/analise-fraude-cartao.md",
    localFileHint: "Documento de análise acadêmica desenvolvido para a disciplina de Imersão Profissional.",
    relatedModule: "ml-fundamentals",
  },
];

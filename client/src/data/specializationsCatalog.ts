export type AISpecialization = {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  coreConcepts: string[];
  techStack: string[];
  difficulty?: "Iniciante" | "Intermediário" | "Avançado";
  careerImpact: string;
  recommendedModule: string;
};

export const specializationsCatalog: AISpecialization[] = [
  {
    id: "ai-frontend",
    title: "IA no Frontend (UI/UX Generativa & Web Apps)",
    badge: "Frontend & Web",
    subtitle: "Interfaces inteligentes, streaming de tokens, chat em tempo real e componentização com IA.",
    description: "A engenharia de frontend em IA vai muito além de formulários estáticos. Envolve criar experiências ricas com streaming de respostas (SSE), estados de digitação fluida, renderização segura de Markdown e LaTeX, comandos de voz e integração com APIs de agentes em aplicações React e Next.js.",
    coreConcepts: [
      "Gerenciamento de streaming de tokens e Server-Sent Events (SSE) no cliente",
      "Renderização segura de conteúdo gerado por IA com Markdown e realces de sintaxe",
      "Interfaces conversacionais responsivas e acessíveis (ARIA, teclado e leitor de tela)",
      "Gestão de contexto local, histórico de conversas e persistência no navegador"
    ],
    techStack: ["React 19", "Tailwind CSS 4", "TypeScript", "Streamdown", "Zustand", "Wouter"],
    difficulty: "Intermediário",
    careerImpact: "Profissionais que dominam IA no frontend lideram a criação de produtos que parecem mágicos, intuitivos e responsivos, elevando a retenção de usuários.",
    recommendedModule: "llms"
  },
  {
    id: "ai-backend",
    title: "IA no Backend (APIs, RAG & Orquestração)",
    badge: "Backend & Systems",
    subtitle: "Arquitetura de microsserviços, bases vetoriais, filas de processamento e governança de LLMs.",
    description: "O backend de IA sustenta a infraestrutura que conecta modelos de linguagem, bases de dados vetoriais, sistemas de recuperação (RAG) e chamadas a ferramentas externas. Exige alta performance, resiliência contra falhas de provedores, tratamento assíncrono e segurança estrita com autenticação robusta.",
    coreConcepts: [
      "Arquitetura de APIs resilientes com tRPC, Express e validação estrita (Zod)",
      "Implementação de Retrieval-Augmented Generation (RAG) com embeddings e bancos vetoriais",
      "Gerenciamento de histórico, sessões e isolamento multi-tenant de dados de usuários",
      "Estratégias de fallback, circuit breakers e controle de taxa para chamadas a LLMs"
    ],
    techStack: ["Node.js", "Express", "tRPC", "Drizzle ORM", "MySQL / TiDB", "Python FastAPI"],
    difficulty: "Avançado",
    careerImpact: "Engenheiros de backend especializados em IA são os arquitetos mais disputados do mercado para escalar soluções corporativas com segurança.",
    recommendedModule: "software-engineering"
  },
  {
    id: "ai-devops",
    title: "DevOps & MLOps (Infraestrutura, Docker & Cloud)",
    badge: "DevOps & MLOps",
    subtitle: "Deploy de modelos, monitoramento de latência, custos, rastreabilidade e CI/CD.",
    description: "MLOps une Machine Learning e operações de software para garantir que modelos e aplicações de IA rodem de forma estável, segura e econômica em produção. Envolve conteinerização com Docker, orquestração, versionamento de datasets e modelos, e observabilidade contínua.",
    coreConcepts: [
      "Conteinerização de aplicações e serviços de IA com Docker e Docker Compose",
      "Pipelines de CI/CD automatizados com testes de regressão e validação estática",
      "Monitoramento de deriva de dados (data drift), latência e custos de inferência",
      "Gestão de segredos, variáveis de ambiente e conformidade em ambientes cloud"
    ],
    techStack: ["Docker", "GitHub Actions", "Linux", "Kubernetes", "AWS / GCP", "Prometheus"],
    difficulty: "Avançado",
    careerImpact: "Especialistas em MLOps viabilizam que protótipos experimentais tornem-se produtos robustos com alta disponibilidade e custos otimizados.",
    recommendedModule: "software-engineering"
  },
  {
    id: "ai-data",
    title: "Engenharia de Dados & Ciência de Dados",
    badge: "Data & Analytics",
    subtitle: "Pipelines ETL, limpeza de dados, estatística aplicada e modelagem preditiva.",
    description: "Nenhuma IA avança sem dados limpos, estruturados e bem compreendidos. A engenharia e ciência de dados cobrem desde a coleta de grandes volumes de dados, tratamento de valores ausentes e normalização, até a construção de modelos estatísticos e árvores de decisão.",
    coreConcepts: [
      "Manipulação eficiente de grandes conjuntos de dados com Pandas e NumPy",
      "Limpeza, normalização e engenharia de atributos (feature engineering)",
      "Análise exploratória e visualização estatística para validação de hipóteses",
      "Modelagem preditiva supervisionada e não supervisionada com Scikit-Learn"
    ],
    techStack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "SQL", "Matplotlib / Seaborn"],
    difficulty: "Intermediário",
    careerImpact: "A base de toda tomada de decisão inteligente nas empresas depende de dados íntegros e análises estatísticas rigorosas.",
    recommendedModule: "ml-fundamentals"
  },
  {
    id: "ai-research",
    title: "Pesquisa & Deep Learning (Redes Neurais & Transformers)",
    badge: "Research & Core AI",
    subtitle: "Arquiteturas profundas, CNNs, RNNs, atenção, fine-tuning e aprendizado de máquina avançado.",
    description: "Focada na compreensão matemática e arquitetural dos algoritmos que moldam a inteligência artificial moderna. Abrange desde o cálculo multivariável e álgebra linear até redes neurais convolucionais, recorrentes e o mecanismo de atenção dos Transformers.",
    coreConcepts: [
      "Matemática aplicada: Álgebra Linear, Otimização e Probabilidade",
      "Arquiteturas de Redes Neurais Profundas (CNNs, RNNs, LSTMs e Transformers)",
      "Mecanismos de Self-Attention e treinamento de modelos de linguagem",
      "Técnicas de fine-tuning, LoRA e adaptação eficiente de parâmetros"
    ],
    techStack: ["PyTorch", "Hugging Face Transformers", "Python", "CUDA", "Jupyter Notebook"],
    difficulty: "Avançado",
    careerImpact: "Pesquisadores e cientistas de deep learning criam as inovações fundamentais que abrem novas fronteiras tecnológicas.",
    recommendedModule: "transformers"
  },
  {
    id: "ai-vision",
    title: "Visão Computacional & Processamento de Imagens",
    badge: "Vision & Imaging",
    subtitle: "Pixels, OpenCV, CNNs, detecção, segmentação, OCR e visão multimodal.",
    description: "A Visão Computacional transforma imagens e vídeos em sinais úteis para classificação, localização, medição e decisão. O percurso começa com pixels, cores e filtros clássicos, avança para redes convolucionais e transfer learning, e termina com sistemas de detecção, segmentação, OCR e visão multimodal.",
    coreConcepts: [
      "Representação de imagens como tensores, canais, histogramas e espaços de cor",
      "Pré-processamento, filtros, bordas e transformações geométricas com OpenCV",
      "CNNs, data augmentation, transfer learning e avaliação por matriz de confusão",
      "Detecção, segmentação, OCR, visão multimodal e limites de confiabilidade"
    ],
    techStack: ["OpenCV", "PyTorch", "TorchVision", "Hugging Face", "Jupyter"],
    difficulty: "Avançado",
    careerImpact: "Profissionais de visão computacional atuam em inspeção industrial, documentos, varejo, robótica, saúde e produtos multimodais, sempre documentando dados, métricas e limitações.",
    recommendedModule: "computer-vision"
  },
  {
    id: "ai-product",
    title: "Produto & Estratégia de IA (Agentes & Governança)",
    badge: "Product & Governance",
    subtitle: "Definição de casos de uso, ROI, ética, mitigação de vieses e gestão de produtos de IA.",
    description: "Construir IA sem estratégia gera custos desnecessários e riscos operacionais. Esta área capacita líderes e product managers a identificarem problemas reais onde a IA traz vantagem competitiva real, garantindo conformidade com frameworks éticos e regulatórios.",
    coreConcepts: [
      "Identificação de oportunidades de produto com IA generativa e preditiva",
      "Governança de IA, alinhamento ético e frameworks como NIST AI RMF",
      "Avaliação de viabilidade técnica, custos de API e ROI de projetos",
      "Design de agentes autônomos orientados a tarefas de negócios"
    ],
    techStack: ["Frameworks de Governança", "Prototipagem Rápida", "Product Discovery", "Métricas de IA"],
    difficulty: "Intermediário",
    careerImpact: "Profissionais de produto com visão de IA direcionam equipes para construir soluções que geram valor real para os negócios e usuários.",
    recommendedModule: "rag-agents"
  }
];

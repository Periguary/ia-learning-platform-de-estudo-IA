export type CertificationQuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type InteractiveCertification = {
  id: string;
  title: string;
  issuer: string;
  level: "Iniciante" | "Intermediário" | "Avançado" | "Especialista";
  durationHours: number;
  description: string;
  skillsCovered: string[];
  officialExamUrl: string;
  quiz: CertificationQuizQuestion[];
};

export const interactiveCertificationsCatalog: InteractiveCertification[] = [
  {
    id: "google-cloud-gen-ai",
    title: "Google Cloud Generative AI Professional",
    issuer: "Google Cloud",
    level: "Intermediário",
    durationHours: 25,
    description: "Certificação oficial focada em arquitetura de modelos Vertex AI, prompt engineering avançado, tuning de LLMs e implantação de RAG corporativo em ambiente GCP.",
    skillsCovered: ["Vertex AI", "Gemini API", "Vector Search", "RAG Architecture", "IAM & Security"],
    officialExamUrl: "https://cloud.google.com/learn/certification",
    quiz: [
      {
        id: 1,
        question: "Qual serviço do Google Cloud é o principal hub gerenciado para implantação e ajuste de modelos de IA generativa?",
        options: ["Compute Engine", "Vertex AI", "Cloud Storage", "BigQuery ML"],
        correctAnswer: 1,
        explanation: "O Vertex AI é a plataforma unificada de machine learning e IA generativa do Google Cloud que hospeda os modelos Gemini e ferramentas de RAG."
      },
      {
        id: 2,
        question: "O que significa a sigla RAG em arquiteturas de IA com bases de conhecimento externas?",
        options: [
          "Random Access Generation",
          "Retrieval-Augmented Generation",
          "Recursive Agent Governance",
          "Rapid Artificial Graph"
        ],
        correctAnswer: 1,
        explanation: "Retrieval-Augmented Generation combina a recuperação de documentos relevantes de uma base vetorial com a geração de texto por um LLM."
      }
    ]
  },
  {
    id: "hugging-face-nlp-transformers",
    title: "Hugging Face Certified Transformer Specialist",
    issuer: "Hugging Face",
    level: "Avançado",
    durationHours: 35,
    description: "Avaliação rigorosa sobre a arquitetura Transformers, bibliotecas Transformers e Datasets, fine-tuning de modelos open-source e otimização para inferência em produção.",
    skillsCovered: ["Transformers", "PyTorch", "Tokenization", "Fine-Tuning", "PEFT / LoRA"],
    officialExamUrl: "https://huggingface.co/welcome",
    quiz: [
      {
        id: 1,
        question: "Qual técnica de Parameter-Efficient Fine-Tuning (PEFT) congela o modelo base e injeta matrizes de baixo posto nas camadas de atenção?",
        options: ["Full Fine-Tuning", "LoRA (Low-Rank Adaptation)", "Quantization", "Pruning"],
        correctAnswer: 1,
        explanation: "O LoRA reduz drasticamente os parâmetros treináveis ao injetar matrizes de baixo posto nos pesos das atenções."
      },
      {
        id: 2,
        question: "Qual é a principal função do Tokenizer em modelos de linguagem baseados em Transformers?",
        options: [
          "Converter texto bruto em IDs numéricos compreensíveis pelo modelo",
          "Compactar o tamanho do arquivo do modelo em disco",
          "Criptografar os prompts enviados à API",
          "Executar o pós-processamento de imagens"
        ],
        correctAnswer: 0,
        explanation: "O tokenizador transforma sequências de texto em tokens e IDs numéricos que a matriz de embedding do Transformer consegue processar."
      }
    ]
  },
  {
    id: "deeplearning-ai-mlops",
    title: "DeepLearning.AI MLOps Engineering Professional",
    issuer: "DeepLearning.AI",
    level: "Avançado",
    durationHours: 40,
    description: "Programa focado no ciclo de vida de machine learning em produção, monitoramento de deriva de dados (data drift), CI/CD para modelos e governança de dados.",
    skillsCovered: ["MLOps", "Docker & Kubernetes", "Data Drift Monitoring", "Model Registry", "CI/CD Pipelines"],
    officialExamUrl: "https://www.deeplearning.ai/",
    quiz: [
      {
        id: 1,
        question: "O que caracteriza a 'Deriva de Dados' (Data Drift) em sistemas de IA em produção?",
        options: [
          "Aumento na velocidade de conexão da API",
          "Mudança na distribuição estatística dos dados de entrada em comparação aos dados de treinamento",
          "Falha física no servidor de banco de dados",
          "Esquecimento catastrófico no treinamento de redes neurais"
        ],
        correctAnswer: 1,
        explanation: "Data Drift ocorre quando o perfil ou a distribuição dos dados que chegam em produção diverge dos dados utilizados no treinamento do modelo."
      },
      {
        id: 2,
        question: "Qual ferramenta é amplamente utilizada para rastrear experimentos, hiperparâmetros e artefatos de modelos?",
        options: ["GitLab CI", "MLflow", "Postman", "Nginx"],
        correctAnswer: 1,
        explanation: "O MLflow é o padrão da indústria para gerenciamento do ciclo de vida de ML, incluindo rastreamento de experimentos e registro de modelos."
      }
    ]
  }
];

import { BookOpen, Code, Lightbulb, FileText, Users, Award } from "lucide-react";

export const coursesData: Record<string, any> = {
  "linear-algebra": {
    title: "Álgebra Linear",
    description: "Fundamentos de vetores, matrizes e transformações lineares",
    phase: 1,
    difficulty: "Iniciante",
    duration: "40 horas",
    lessons: 12,
    sections: [
      {
        title: "Introdução",
        lessons: [
          { id: 1, title: "O que é Álgebra Linear?", completed: false },
          { id: 2, title: "Aplicações em IA", completed: false },
          { id: 3, title: "Ferramentas e Bibliotecas", completed: false }
        ]
      },
      {
        title: "Vetores",
        lessons: [
          { id: 4, title: "Conceito de Vetor", completed: false },
          { id: 5, title: "Operações Vetoriais", completed: false },
          { id: 6, title: "Produto Escalar", completed: false },
          { id: 7, title: "Produto Vetorial", completed: false }
        ]
      },
      {
        title: "Matrizes",
        lessons: [
          { id: 8, title: "Conceito de Matriz", completed: false },
          { id: 9, title: "Operações com Matrizes", completed: false },
          { id: 10, title: "Determinantes", completed: false },
          { id: 11, title: "Matrizes Inversas", completed: false }
        ]
      },
      {
        title: "Projeto Final",
        lessons: [
          { id: 12, title: "Projeto: Transformações Lineares", completed: false }
        ]
      }
    ]
  },
  "statistics": {
    title: "Estatística",
    description: "Análise de dados, distribuições e testes estatísticos",
    phase: 1,
    difficulty: "Intermediário",
    duration: "45 horas",
    lessons: 14,
    sections: [
      {
        title: "Fundamentos",
        lessons: [
          { id: 1, title: "O que é Estatística?", completed: false },
          { id: 2, title: "Tipos de Dados", completed: false },
          { id: 3, title: "Amostragem", completed: false }
        ]
      },
      {
        title: "Medidas Descritivas",
        lessons: [
          { id: 4, title: "Medidas de Tendência Central", completed: false },
          { id: 5, title: "Medidas de Dispersão", completed: false },
          { id: 6, title: "Distribuições", completed: false }
        ]
      },
      {
        title: "Inferência Estatística",
        lessons: [
          { id: 7, title: "Testes de Hipótese", completed: false },
          { id: 8, title: "Intervalos de Confiança", completed: false },
          { id: 9, title: "Regressão Linear", completed: false }
        ]
      },
      {
        title: "Análise Avançada",
        lessons: [
          { id: 10, title: "Análise Exploratória", completed: false },
          { id: 11, title: "Detecção de Outliers", completed: false },
          { id: 12, title: "Correlação e Causalidade", completed: false },
          { id: 13, title: "Testes Estatísticos", completed: false },
          { id: 14, title: "Projeto: Análise Estatística", completed: false }
        ]
      }
    ]
  },
  "probability": {
    title: "Probabilidade",
    description: "Teoria das probabilidades e distribuições",
    phase: 1,
    difficulty: "Intermediário",
    duration: "38 horas",
    lessons: 12,
    sections: [
      {
        title: "Conceitos Básicos",
        lessons: [
          { id: 1, title: "Conceitos Básicos de Probabilidade", completed: false },
          { id: 2, title: "Probabilidade Condicional", completed: false },
          { id: 3, title: "Teorema de Bayes", completed: false }
        ]
      },
      {
        title: "Variáveis Aleatórias",
        lessons: [
          { id: 4, title: "Independência", completed: false },
          { id: 5, title: "Variáveis Aleatórias", completed: false },
          { id: 6, title: "Distribuições Discretas", completed: false },
          { id: 7, title: "Distribuições Contínuas", completed: false }
        ]
      },
      {
        title: "Teoremas Importantes",
        lessons: [
          { id: 8, title: "Esperança e Variância", completed: false },
          { id: 9, title: "Lei dos Grandes Números", completed: false },
          { id: 10, title: "Teorema Central do Limite", completed: false }
        ]
      },
      {
        title: "Aplicações",
        lessons: [
          { id: 11, title: "Distribuições Conjuntas", completed: false },
          { id: 12, title: "Projeto: Simulações Probabilísticas", completed: false }
        ]
      }
    ]
  },
  "python-basics": {
    title: "Python Básico",
    description: "Fundamentos de programação em Python",
    phase: 2,
    difficulty: "Iniciante",
    duration: "50 horas",
    lessons: 16,
    sections: [
      {
        title: "Fundamentos",
        lessons: [
          { id: 1, title: "Configuração do Ambiente Python", completed: false },
          { id: 2, title: "Variáveis e Tipos", completed: false },
          { id: 3, title: "Estruturas de Controle", completed: false }
        ]
      },
      {
        title: "Funções e Coleções",
        lessons: [
          { id: 4, title: "Funções", completed: false },
          { id: 5, title: "Listas e Tuplas", completed: false },
          { id: 6, title: "Dicionários", completed: false },
          { id: 7, title: "Strings", completed: false }
        ]
      },
      {
        title: "Programação Avançada",
        lessons: [
          { id: 8, title: "Compreensões de Lista", completed: false },
          { id: 9, title: "Tratamento de Erros", completed: false },
          { id: 10, title: "Módulos e Pacotes", completed: false },
          { id: 11, title: "Orientação a Objetos", completed: false }
        ]
      },
      {
        title: "Prática e Projetos",
        lessons: [
          { id: 12, title: "Entrada e Saída", completed: false },
          { id: 13, title: "Expressões Regulares", completed: false },
          { id: 14, title: "Debugging", completed: false },
          { id: 15, title: "Testes Unitários", completed: false },
          { id: 16, title: "Projeto: Aplicação Python", completed: false }
        ]
      }
    ]
  },
  "sql-basics": {
    title: "SQL Básico",
    description: "Introdução a consultas SQL",
    phase: 3,
    difficulty: "Iniciante",
    duration: "30 horas",
    lessons: 10,
    sections: [
      { title: "Fundamentos", lessons: [{ id: 1, title: "Introdução", completed: false }, { id: 2, title: "SELECT", completed: false }, { id: 3, title: "WHERE", completed: false }] },
      { title: "Operações", lessons: [{ id: 4, title: "INSERT", completed: false }, { id: 5, title: "UPDATE", completed: false }, { id: 6, title: "DELETE", completed: false }] },
      { title: "Consultas", lessons: [{ id: 7, title: "JOINs", completed: false }, { id: 8, title: "GROUP BY", completed: false }, { id: 9, title: "ORDER BY", completed: false }] },
      { title: "Projeto", lessons: [{ id: 10, title: "Final", completed: false }] }
    ]
  },
  "numpy": {
    title: "NumPy",
    description: "Computação numérica",
    phase: 4,
    difficulty: "Intermediário",
    duration: "25 horas",
    lessons: 8,
    sections: [
      { title: "Fundamentos", lessons: [{ id: 1, title: "Arrays", completed: false }, { id: 2, title: "Criação", completed: false }, { id: 3, title: "Indexação", completed: false }] },
      { title: "Operações", lessons: [{ id: 4, title: "Matemática", completed: false }, { id: 5, title: "Broadcasting", completed: false }, { id: 6, title: "Álgebra", completed: false }] },
      { title: "Projeto", lessons: [{ id: 7, title: "Projeto", completed: false }, { id: 8, title: "Final", completed: false }] }
    ]
  },
  "pandas": {
    title: "Pandas",
    description: "Manipulação de dados",
    phase: 4,
    difficulty: "Intermediário",
    duration: "30 horas",
    lessons: 10,
    sections: [
      { title: "Fundamentos", lessons: [{ id: 1, title: "Series", completed: false }, { id: 2, title: "Leitura", completed: false }, { id: 3, title: "Seleção", completed: false }] },
      { title: "Manipulação", lessons: [{ id: 4, title: "Limpeza", completed: false }, { id: 5, title: "Transformação", completed: false }, { id: 6, title: "Agregação", completed: false }] },
      { title: "Análise", lessons: [{ id: 7, title: "Exploratória", completed: false }, { id: 8, title: "Merge", completed: false }, { id: 9, title: "Pivot", completed: false }] },
      { title: "Projeto", lessons: [{ id: 10, title: "Final", completed: false }] }
    ]
  },
  "ml-fundamentals": {
    title: "Fundamentos ML",
    description: "Conceitos de Machine Learning",
    phase: 5,
    difficulty: "Avançado",
    duration: "30 horas",
    lessons: 8,
    sections: [
      { title: "Conceitos", lessons: [{ id: 1, title: "O que é ML", completed: false }, { id: 2, title: "Tipos", completed: false }, { id: 3, title: "Workflow", completed: false }] },
      { title: "Dados", lessons: [{ id: 4, title: "Preparação", completed: false }, { id: 5, title: "Feature", completed: false }, { id: 6, title: "Normalização", completed: false }] },
      { title: "Projeto", lessons: [{ id: 7, title: "Classificação", completed: false }, { id: 8, title: "Final", completed: false }] }
    ]
  },
  "neural-networks": {
    title: "Redes Neurais",
    description: "Fundamentos de redes",
    phase: 6,
    difficulty: "Avançado",
    duration: "35 horas",
    lessons: 10,
    sections: [
      { title: "Fundamentos", lessons: [{ id: 1, title: "Neurônios", completed: false }, { id: 2, title: "Perceptron", completed: false }, { id: 3, title: "Backpropagation", completed: false }] },
      { title: "Arquiteturas", lessons: [{ id: 4, title: "MLP", completed: false }, { id: 5, title: "Ativações", completed: false }, { id: 6, title: "Otimizadores", completed: false }] },
      { title: "Frameworks", lessons: [{ id: 7, title: "TensorFlow", completed: false }, { id: 8, title: "PyTorch", completed: false }, { id: 9, title: "Keras", completed: false }] },
      { title: "Projeto", lessons: [{ id: 10, title: "Final", completed: false }] }
    ]
  },
  "computer-vision": {
    title: "Visão Computacional e Processamento de Imagens",
    description: "Da imagem digital e OpenCV às CNNs, detecção, segmentação e visão multimodal",
    phase: 6,
    difficulty: "Avançado",
    duration: "42 horas",
    lessons: 12,
    sections: [
      { title: "Fundamentos Visuais", lessons: [{ id: 1, title: "O que é Visão Computacional?", completed: false }, { id: 2, title: "Imagens como Matrizes de Pixels", completed: false }, { id: 3, title: "Cores, Espaços e Histogramas", completed: false }] },
      { title: "Processamento de Imagens", lessons: [{ id: 4, title: "OpenCV e Leitura de Imagens", completed: false }, { id: 5, title: "Filtros, Ruído e Bordas", completed: false }, { id: 6, title: "Transformações Geométricas", completed: false }] },
      { title: "Deep Learning Visual", lessons: [{ id: 7, title: "CNNs para Classificação", completed: false }, { id: 8, title: "Transfer Learning", completed: false }, { id: 9, title: "Data Augmentation e Avaliação", completed: false }] },
      { title: "Percepção e Projeto", lessons: [{ id: 10, title: "Detecção e Segmentação", completed: false }, { id: 11, title: "OCR e Visão Multimodal", completed: false }, { id: 12, title: "Projeto: Classificador Visual", completed: false }] }
    ]
  },
  "llms": {
    title: "LLMs",
    description: "Grandes modelos de linguagem",
    phase: 7,
    difficulty: "Avançado",
    duration: "28 horas",
    lessons: 8,
    sections: [
      { title: "Conceitos", lessons: [{ id: 1, title: "LLMs", completed: false }, { id: 2, title: "Treinamento", completed: false }, { id: 3, title: "Fine-tuning", completed: false }] },
      { title: "Modelos", lessons: [{ id: 4, title: "GPT", completed: false }, { id: 5, title: "Claude", completed: false }, { id: 6, title: "Llama", completed: false }] },
      { title: "Projeto", lessons: [{ id: 7, title: "Chatbot", completed: false }, { id: 8, title: "Final", completed: false }] }
    ]
  },
  "software-engineering": {
    title: "Engenharia de Software",
    description: "Boas práticas",
    phase: 8,
    difficulty: "Avançado",
    duration: "35 horas",
    lessons: 10,
    sections: [
      { title: "Padrões", lessons: [{ id: 1, title: "SOLID", completed: false }, { id: 2, title: "Design", completed: false }, { id: 3, title: "Arquitetura", completed: false }] },
      { title: "DevOps", lessons: [{ id: 4, title: "Git", completed: false }, { id: 5, title: "Docker", completed: false }, { id: 6, title: "CI/CD", completed: false }] },
      { title: "Cloud", lessons: [{ id: 7, title: "AWS", completed: false }, { id: 8, title: "GCP", completed: false }, { id: 9, title: "Azure", completed: false }] },
      { title: "Projeto", lessons: [{ id: 10, title: "Final", completed: false }] }
    ]
  },
  "image-processing": {
    title: "Processamento de Imagens e Visão Computacional",
    description: "Pixels, OpenCV, pipelines visuais e avaliação de sistemas de visão.",
    phase: 6,
    difficulty: "Intermediário",
    duration: "32 horas",
    lessons: 12,
    sections: [
      { title: "Imagem digital", lessons: [{ id: 1, title: "Fundamentos de Processamento de Imagens", completed: false }, { id: 2, title: "Filtros e Transformações com OpenCV", completed: false }, { id: 3, title: "Visão Computacional e Avaliação", completed: false }] },
      { title: "Projeto", lessons: [{ id: 4, title: "Projeto: Inspeção Visual", completed: false }] },
    ],
  },
  "convolutional-neural-networks": {
    title: "Redes Neurais Convolucionais",
    description: "Convoluções, pooling, augmentation, treino e classificação visual.",
    phase: 6,
    difficulty: "Avançado",
    duration: "28 horas",
    lessons: 12,
    sections: [
      { title: "Arquitetura", lessons: [{ id: 1, title: "Por que CNNs funcionam em imagens", completed: false }, { id: 2, title: "Convolução, pooling e padding", completed: false }, { id: 3, title: "Treino, overfitting e augmentation", completed: false }] },
      { title: "Projeto", lessons: [{ id: 4, title: "Projeto: Classificação de Imagens", completed: false }] },
    ],
  },
  "cognitive-computing": {
    title: "Computação Cognitiva",
    description: "Percepção, linguagem, raciocínio assistido e IA responsável.",
    phase: 7,
    difficulty: "Avançado",
    duration: "24 horas",
    lessons: 12,
    sections: [
      { title: "Sistemas cognitivos", lessons: [{ id: 1, title: "O que é Computação Cognitiva", completed: false }, { id: 2, title: "Percepção, linguagem e contexto", completed: false }, { id: 3, title: "Raciocínio assistido e IA responsável", completed: false }] },
      { title: "Projeto", lessons: [{ id: 4, title: "Projeto: Assistente de Operações", completed: false }] },
    ],
  },
  "generative-neural-networks": {
    title: "Redes Neurais Generativas",
    description: "Autoencoders, GANs, difusão, avaliação e geração responsável.",
    phase: 7,
    difficulty: "Avançado",
    duration: "30 horas",
    lessons: 12,
    sections: [
      { title: "Modelos generativos", lessons: [{ id: 1, title: "Fundamentos de Redes Generativas", completed: false }, { id: 2, title: "Autoencoders e espaço latente", completed: false }, { id: 3, title: "GANs, difusão e avaliação", completed: false }] },
      { title: "Projeto", lessons: [{ id: 4, title: "Projeto: Geração responsável", completed: false }] },
    ],
  }
};

export const lessonsContentData: Record<string, Record<number | string, any>> = {
  "linear-algebra": {
    1: { title: "O que é Álgebra Linear?", content: "Álgebra Linear é o ramo da matemática que estuda vetores, matrizes e transformações lineares. É fundamental para entender como os algoritmos de Machine Learning funcionam.\n\n**Definição Formal:**\nÁlgebra Linear é o estudo de espaços vetoriais e transformações lineares entre eles.\n\n**Conceitos Fundamentais:**\n1. Vetores: Representações de direção e magnitude\n2. Matrizes: Arranjos retangulares de números\n3. Transformações Lineares: Funções que preservam operações\n4. Espaços Vetoriais: Conjuntos de vetores com operações bem definidas", examples: ["Vetor 2D: [3, 4]", "Matriz 2x2: [[1, 2], [3, 4]]", "Redes neurais: y = Wx + b"] },
    2: { title: "Aplicações em IA", content: "Álgebra Linear é a base matemática de praticamente todos os algoritmos de IA modernos.\n\n**Aplicações Principais:**\n1. Redes Neurais: Multiplicação de matrizes\n2. Processamento de Imagens: Transformações de pixels\n3. NLP: Embeddings e representações vetoriais\n4. Visão Computacional: Transformações geométricas", examples: ["Redes Neurais Convolucionais", "Word2Vec embeddings", "Transformações de imagem"] },
    3: { title: "Ferramentas e Bibliotecas", content: "Bibliotecas Python para trabalhar com álgebra linear.\n\n**Principais:**\n1. NumPy: Operações com arrays\n2. SciPy: Computação científica\n3. Pandas: Manipulação de dados\n4. TensorFlow/PyTorch: Deep Learning", examples: ["import numpy as np", "from scipy import linalg", "import pandas as pd"] },
    4: { title: "Conceito de Vetor", content: "Um vetor é uma sequência ordenada de números que representa uma direção e magnitude em espaço multidimensional.\n\n**Representação:**\nv = [v1, v2, ..., vn]\n\n**Propriedades:**\n1. Magnitude: Comprimento do vetor\n2. Direção: Ângulo em relação aos eixos\n3. Componentes: Valores individuais", examples: ["Vetor 2D: [3, 4]", "Vetor 3D: [1, 2, 3]", "Magnitude: sqrt(3² + 4²) = 5"] },
    5: { title: "Operações Vetoriais", content: "Operações básicas com vetores.\n\n**Operações:**\n1. Adição: v + u = [v1+u1, v2+u2]\n2. Subtração: v - u = [v1-u1, v2-u2]\n3. Multiplicação por escalar: k*v = [k*v1, k*v2]\n4. Magnitude: ||v|| = sqrt(v1² + v2²)", examples: ["[1,2] + [3,4] = [4,6]", "[5,5] - [2,1] = [3,4]", "2 * [1,2] = [2,4]"] },
    6: { title: "Produto Escalar", content: "O produto escalar (dot product) mede a similaridade entre dois vetores.\n\n**Fórmula:**\nv · u = v1*u1 + v2*u2 + ... + vn*un\n\n**Propriedades:**\n1. Resultado é um escalar (número)\n2. Mede ângulo entre vetores\n3. Se perpendiculares: produto = 0", examples: ["[1,2] · [3,4] = 1*3 + 2*4 = 11", "Vetores perpendiculares: produto = 0", "Similaridade entre embeddings"] },
    7: { title: "Produto Vetorial", content: "O produto vetorial (cross product) produz um novo vetor perpendicular aos dois originais.\n\n**Fórmula (3D):**\nv × u = [v2*u3 - v3*u2, v3*u1 - v1*u3, v1*u2 - v2*u1]\n\n**Propriedades:**\n1. Resultado é um vetor\n2. Perpendicular aos dois originais\n3. Magnitude: ||v × u|| = ||v|| * ||u|| * sin(θ)", examples: ["[1,0,0] × [0,1,0] = [0,0,1]", "Direção perpendicular", "Cálculo de área de paralelogramo"] },
    8: { title: "Conceito de Matriz", content: "Uma matriz é um arranjo retangular de números organizado em linhas e colunas.\n\n**Notação:**\nA = [[a11, a12], [a21, a22]]\n\n**Tipos:**\n1. Quadrada: m = n\n2. Retangular: m ≠ n\n3. Identidade: Diagonal com 1s\n4. Nula: Todos zeros", examples: ["Matriz 2x3: [[1,2,3], [4,5,6]]", "Matriz identidade: [[1,0], [0,1]]", "Matriz nula: [[0,0], [0,0]]"] },
    9: { title: "Operações com Matrizes", content: "Operações básicas com matrizes.\n\n**Operações:**\n1. Adição: A + B (elemento a elemento)\n2. Multiplicação: A * B (produto de linhas e colunas)\n3. Transposição: A^T (troca linhas e colunas)\n4. Multiplicação por escalar: k*A", examples: ["[[1,2],[3,4]] + [[5,6],[7,8]] = [[6,8],[10,12]]", "Transposição: [[1,2],[3,4]]^T = [[1,3],[2,4]]", "Produto de matrizes: (m×n) * (n×p) = m×p"] },
    10: { title: "Determinantes", content: "O determinante é um número que caracteriza uma matriz quadrada.\n\n**Propriedades:**\n1. Mede se a matriz é invertível\n2. Se det = 0: matriz singular (não invertível)\n3. Fórmula 2x2: det = ad - bc\n4. Relacionado ao volume de transformação", examples: ["Matriz [[a,b],[c,d]]: det = ad - bc", "Matriz singular: det = 0", "Matriz invertível: det ≠ 0"] },
    11: { title: "Matrizes Inversas", content: "A matriz inversa A^-1 é tal que A * A^-1 = I (identidade).\n\n**Propriedades:**\n1. Existe apenas se det(A) ≠ 0\n2. (A^-1)^-1 = A\n3. (A*B)^-1 = B^-1 * A^-1\n4. Fórmula 2x2: A^-1 = (1/det) * [[d,-b],[-c,a]]", examples: ["Matriz 2x2 invertível", "Cálculo de A^-1", "Resolução de sistemas lineares"] },
    12: { title: "Projeto: Transformações Lineares", content: "Aplicar conceitos de álgebra linear em transformações geométricas.\n\n**Projeto:**\n1. Implementar rotação de pontos\n2. Escalar vetores\n3. Refletir pontos em eixos\n4. Visualizar transformações\n\n**Tecnologias:**\nNumPy, Matplotlib", examples: ["Rotação: matriz de rotação", "Escala: matriz diagonal", "Reflexão: matriz de reflexão"] }
  },
  "statistics": {
    1: { title: "O que é Estatística?", content: "Estatística é a ciência que coleta, analisa e interpreta dados.\n\n**Ramos:**\n1. Descritiva: Resumo de dados\n2. Inferencial: Conclusões sobre populações\n3. Bayesiana: Usar probabilidades\n\n**Aplicações em IA:**\nAnálise exploratória, validação de modelos, detecção de anomalias", examples: ["Média de dataset", "Desvio padrão", "Correlação entre variáveis"] },
    2: { title: "Tipos de Dados", content: "Diferentes tipos de dados requerem análises distintas.\n\n**Tipos:**\n1. Quantitativos: Numéricos (idade, peso)\n2. Qualitativos: Categóricos (cor, gênero)\n3. Contínuos: Qualquer valor em intervalo\n4. Discretos: Valores específicos (contagem)", examples: ["Quantitativo: Altura em cm", "Qualitativo: Cor de olhos", "Contínuo: Temperatura", "Discreto: Número de filhos"] },
    3: { title: "Amostragem", content: "Amostragem é selecionar um subconjunto da população.\n\n**Tipos:**\n1. Aleatória Simples: Cada elemento tem igual chance\n2. Estratificada: Divide população em grupos\n3. Sistemática: Seleciona a cada k-ésimo\n4. Por Conglomerados: Seleciona grupos inteiros", examples: ["Pesquisa eleitoral: 2000 eleitores", "Controle de qualidade: 5% dos produtos", "Estudo de renda: Estratificar por região"] },
    4: { title: "Medidas de Tendência Central", content: "Resumem dados em um único valor.\n\n**Principais:**\n1. Média: Soma/quantidade\n2. Mediana: Valor do meio\n3. Moda: Valor mais frequente\n\n**Quando usar:**\nMédia: Dados normais, sem outliers\nMediana: Dados com outliers\nModa: Dados categóricos", examples: ["Média de notas: 7.5", "Mediana de salários", "Moda de cores"] },
    5: { title: "Medidas de Dispersão", content: "Medem a variabilidade dos dados.\n\n**Principais:**\n1. Amplitude: Máximo - Mínimo\n2. Variância: Dispersão ao quadrado\n3. Desvio Padrão: Raiz da variância\n4. Coeficiente de Variação: Desvio/Média", examples: ["Amplitude: 100-0 = 100", "Variância: 25", "Desvio padrão: 5", "CV: 0.2 ou 20%"] },
    6: { title: "Distribuições", content: "Padrões de frequência dos dados.\n\n**Tipos:**\n1. Normal: Sino simétrico\n2. Uniforme: Igualmente distribuído\n3. Exponencial: Decaimento rápido\n4. Bimodal: Dois picos", examples: ["Normal: Altura das pessoas", "Uniforme: Dado justo", "Exponencial: Tempo de vida", "Bimodal: Duas populações"] },
    7: { title: "Testes de Hipótese", content: "Verificam afirmações sobre dados.\n\n**Processo:**\n1. Hipótese nula (H0): Afirmação padrão\n2. Hipótese alternativa (H1): Afirmação alternativa\n3. Teste estatístico: Calcula p-value\n4. Decisão: Rejeita ou não H0", examples: ["H0: Média = 100", "H1: Média ≠ 100", "P-value: 0.05", "Rejeitar H0 se p < 0.05"] },
    8: { title: "Intervalos de Confiança", content: "Faixa de valores prováveis para um parâmetro.\n\n**Conceito:**\n1. Intervalo com 95% de confiança\n2. Margem de erro\n3. Nível de significância (α)\n4. Quanto maior a confiança, maior o intervalo", examples: ["IC 95%: [95, 105]", "Margem: ±5", "Confiança: 95%", "Significância: α = 0.05"] },
    9: { title: "Regressão Linear", content: "Relação entre variáveis.\n\n**Equação:**\ny = a + bx\n\n**Conceitos:**\n1. Variável independente (x)\n2. Variável dependente (y)\n3. Coeficiente angular (b)\n4. Intercepto (a)", examples: ["Preço vs Tamanho", "Vendas vs Publicidade", "Temperatura vs Altitude"] },
    10: { title: "Análise Exploratória", content: "Investigar dados antes de análise profunda.\n\n**Técnicas:**\n1. Gráficos: Histogramas, box plots\n2. Resumos: Média, mediana, desvio\n3. Correlações: Relações entre variáveis\n4. Visualizações: Scatter plots, heatmaps", examples: ["Histogramas", "Box plots", "Scatter plots", "Heatmaps de correlação"] },
    11: { title: "Detecção de Outliers", content: "Identificar valores anormais.\n\n**Métodos:**\n1. Z-score: |z| > 3\n2. IQR: Fora de [Q1 - 1.5*IQR, Q3 + 1.5*IQR]\n3. Isolation Forest: Algoritmo de ML\n4. Visualização: Box plots", examples: ["Z-score > 3", "IQR 1.5x", "Isolation Forest", "Anomalias em série temporal"] },
    12: { title: "Correlação e Causalidade", content: "Relação entre variáveis.\n\n**Importante:**\nCorrelação ≠ Causalidade\n\n**Coeficiente de Correlação:**\n-1 a 1 (Pearson)\n\n**Tipos:**\n1. Positiva: Aumenta junto\n2. Negativa: Uma aumenta, outra diminui\n3. Nula: Sem relação", examples: ["Correlação: 0.8", "Causalidade: Prova necessária", "Confundidor: Variável extra"] },
    13: { title: "Testes Estatísticos", content: "Validar hipóteses com testes específicos.\n\n**Testes:**\n1. T-test: Comparar duas médias\n2. Chi-square: Variáveis categóricas\n3. ANOVA: Múltiplos grupos\n4. Mann-Whitney: Não paramétrico", examples: ["T-test: Comparar médias", "Chi-square: Categorias", "ANOVA: Múltiplos grupos", "Mann-Whitney: Distribuições"] },
    14: { title: "Projeto: Análise Estatística", content: "Aplicar conceitos em dados reais.\n\n**Etapas:**\n1. Coleta de dados\n2. Limpeza e preparação\n3. Análise exploratória\n4. Testes estatísticos\n5. Visualização e conclusões", examples: ["Dataset: Vendas", "Análise: Tendências", "Resultado: Insights", "Recomendações"] }
  },
  "probability": {
    1: { title: "Conceitos Básicos de Probabilidade", content: "Probabilidade é a medida da chance de um evento ocorrer.\n\n**Definições:**\n1. Experimento Aleatório: Resultado incerto\n2. Espaço Amostral: Todos os resultados possíveis\n3. Evento: Subconjunto do espaço amostral\n4. Probabilidade: Número entre 0 e 1", examples: ["Lançar um dado: P(par) = 3/6 = 0.5", "Baralho: P(vermelha) = 26/52 = 0.5", "Classificação: P(spam|palavras)"] },
    2: { title: "Probabilidade Condicional", content: "Probabilidade de um evento dado que outro ocorreu.\n\n**Fórmula:**\nP(A|B) = P(A∩B) / P(B)\n\n**Leitura:**\nProbabilidade de A dado B\n\n**Aplicações:**\nFiltros de spam, diagnóstico médico", examples: ["P(chuva|nuvens)", "P(doença|teste positivo)", "P(spam|palavras específicas)"] },
    3: { title: "Teorema de Bayes", content: "Atualizar probabilidades com nova informação.\n\n**Fórmula:**\nP(A|B) = P(B|A) * P(A) / P(B)\n\n**Conceitos:**\n1. Prior: Probabilidade inicial\n2. Likelihood: Probabilidade da evidência\n3. Posterior: Probabilidade atualizada", examples: ["Diagnóstico médico", "Filtro de spam", "Classificação Bayesiana"] },
    4: { title: "Independência", content: "Eventos que não afetam um ao outro.\n\n**Definição:**\nP(A∩B) = P(A) * P(B)\n\n**Propriedade:**\nP(A|B) = P(A)\n\n**Exemplos:**\nDois dados, lançamentos sucessivos", examples: ["Dois dados: Independentes", "Lançamentos: Independentes", "Eventos aleatórios"] },
    5: { title: "Variáveis Aleatórias", content: "Função que mapeia resultados para números.\n\n**Tipos:**\n1. Discreta: Valores específicos\n2. Contínua: Qualquer valor em intervalo\n\n**Propriedades:**\n1. Função de probabilidade\n2. Distribuição acumulada", examples: ["Número de caras em 10 lançamentos", "Altura de uma pessoa", "Tempo até um evento"] },
    6: { title: "Distribuições Discretas", content: "Valores específicos com probabilidades.\n\n**Tipos:**\n1. Bernoulli: Sucesso ou fracasso\n2. Binomial: N sucessos em n tentativas\n3. Poisson: Eventos em intervalo\n4. Geométrica: Tentativas até sucesso", examples: ["Bernoulli: Sucesso/Falha", "Binomial: N sucessos", "Poisson: Eventos raros", "Geométrica: Tentativas"] },
    7: { title: "Distribuições Contínuas", content: "Valores em intervalo com densidade.\n\n**Tipos:**\n1. Normal: Sino simétrico\n2. Uniforme: Igualmente distribuído\n3. Exponencial: Decaimento\n4. Beta: Intervalo [0,1]", examples: ["Normal: Altura", "Uniforme: Tempo", "Exponencial: Vida útil", "Beta: Proporções"] },
    8: { title: "Esperança e Variância", content: "Valor esperado e dispersão.\n\n**Fórmulas:**\nE[X] = Σ x * P(x)\nVar(X) = E[X²] - E[X]²\n\n**Propriedades:**\n1. E[aX + b] = a*E[X] + b\n2. Var(aX + b) = a² * Var(X)", examples: ["Média: 5", "Variância: 2", "Desvio: 1.4", "E[X] = 3.5 para dado"] },
    9: { title: "Lei dos Grandes Números", content: "Média converge para esperança.\n\n**Conceito:**\nCom muitas tentativas, média → E[X]\n\n**Implicação:**\nMaior amostra = melhor estimativa\n\n**Aplicação:**\nSimulações Monte Carlo", examples: ["Dado: 1000 lançamentos", "Moeda: 10000 lançamentos", "Convergência para 0.5"] },
    10: { title: "Teorema Central do Limite", content: "Distribuição de médias é normal.\n\n**Implicação:**\nMédias de amostras → Normal\n\n**Consequência:**\nIntervalo de confiança\nTestes de hipótese\n\n**Aplicação:**\nMuitos fenômenos naturais", examples: ["Média de amostras", "Intervalo de confiança", "Testes estatísticos", "Distribuição normal"] },
    11: { title: "Distribuições Conjuntas", content: "Probabilidade de múltiplas variáveis.\n\n**Conceito:**\nP(X=x, Y=y)\n\n**Tipos:**\n1. Conjunta: P(X,Y)\n2. Marginal: P(X)\n3. Condicional: P(X|Y)", examples: ["Altura e peso", "Idade e renda", "Temperatura e umidade"] },
    12: { title: "Projeto: Simulações Probabilísticas", content: "Usar probabilidade para resolver problemas.\n\n**Técnicas:**\n1. Monte Carlo: Amostragem aleatória\n2. Simulação: Reproduzir fenômenos\n3. Amostragem: Gerar dados\n\n**Aplicações:**\nProblema de Monty Hall, Integração, Previsões", examples: ["Problema de Monty Hall", "Integração Monte Carlo", "Simulação de dados"] }
  },
  "python-basics": {
    1: { title: "Configuração do Ambiente Python", content: "Antes de programar, configure seu ambiente.\n\n**O que você aprenderá:**\n1. Instalar Python 3.x\n2. Configurar pip e virtualenv\n3. Usar Jupyter Notebook\n4. Configurar IDE (VS Code ou PyCharm)", examples: ["python --version", "python -m venv env", "source env/bin/activate", "pip install numpy pandas"] },
    2: { title: "Variáveis e Tipos", content: "Armazenar e manipular dados.\n\n**Tipos:**\n1. int: Inteiros (5, -10)\n2. float: Decimais (3.14, -2.5)\n3. str: Texto ('Python', \"Olá\")\n4. bool: Verdadeiro/Falso (True, False)", examples: ["x = 10", "y = 3.14", "nome = 'Python'", "ativo = True"] },
    3: { title: "Estruturas de Controle", content: "Executar código condicionalmente.\n\n**Estruturas:**\n1. if/else: Condicional\n2. for: Loop sobre sequência\n3. while: Loop com condição\n4. break/continue: Controle de loop", examples: ["if x > 5:", "for i in range(10):", "while x < 100:", "break, continue"] },
    4: { title: "Funções", content: "Reutilizar código.\n\n**Definição:**\ndef funcao(param):\n    return resultado\n\n**Conceitos:**\n1. Parâmetros\n2. Retorno\n3. Escopo", examples: ["def somar(a, b):", "return a + b", "resultado = somar(3, 5)"] },
    5: { title: "Listas e Tuplas", content: "Coleções de dados.\n\n**Diferenças:**\n1. Listas: Mutáveis [1, 2, 3]\n2. Tuplas: Imutáveis (1, 2, 3)\n\n**Operações:**\nAcesso, slicing, append", examples: ["lista = [1, 2, 3]", "tupla = (1, 2, 3)", "lista[0] = 10"] },
    6: { title: "Dicionários", content: "Pares chave-valor.\n\n**Uso:**\ndict = {'chave': 'valor'}\n\n**Operações:**\nAcesso, adição, remoção", examples: ["pessoa = {'nome': 'João'}", "pessoa['idade'] = 30", "print(pessoa['nome'])"] },
    7: { title: "Strings", content: "Manipular texto.\n\n**Operações:**\n1. Concatenação: +\n2. Slicing: [i:j]\n3. Métodos: upper(), lower(), split()", examples: ["s = 'Python'", "s.upper()", "s[0:3]", "s + ' é legal'"] },
    8: { title: "Compreensões de Lista", content: "Criar listas de forma concisa.\n\n**Sintaxe:**\n[x for x in lista if condicao]\n\n**Vantagens:**\nMais legível e rápido", examples: ["[x*2 for x in range(5)]", "[x for x in lista if x > 5]", "[[x, y] for x in range(3) for y in range(3)]"] },
    9: { title: "Tratamento de Erros", content: "Lidar com exceções.\n\n**Estrutura:**\ntry/except/finally\n\n**Tipos:**\nValueError, TypeError, IndexError", examples: ["try:", "except ValueError:", "finally:", "print('Fim')"] },
    10: { title: "Módulos e Pacotes", content: "Organizar código.\n\n**Importação:**\nimport modulo\nfrom modulo import funcao\n\n**Exemplos:**\nNumPy, Pandas, Matplotlib", examples: ["import numpy", "from pandas import read_csv", "import matplotlib.pyplot as plt"] },
    11: { title: "Orientação a Objetos", content: "Programação baseada em classes.\n\n**Conceitos:**\n1. Classes\n2. Objetos\n3. Herança\n4. Polimorfismo", examples: ["class Pessoa:", "def __init__(self):", "obj = Pessoa()"] },
    12: { title: "Entrada e Saída", content: "Ler e escrever dados.\n\n**Operações:**\n1. input(): Ler do usuário\n2. print(): Exibir na tela\n3. open(): Trabalhar com arquivos", examples: ["nome = input('Nome:')", "print(nome)", "open('arquivo.txt')"] },
    13: { title: "Expressões Regulares", content: "Buscar padrões em texto.\n\n**Módulo:**\nimport re\n\n**Funções:**\nsearch(), findall(), sub()", examples: ["re.search(r'\\\\d+', texto)", "re.findall(r'\\\\w+', texto)", "re.sub(r'\\\\s+', ' ', texto)"] },
    14: { title: "Debugging", content: "Encontrar e corrigir erros.\n\n**Técnicas:**\n1. print()\n2. pdb (debugger)\n3. Logging", examples: ["print(variavel)", "import pdb; pdb.set_trace()", "logging.debug()"] },
    15: { title: "Testes Unitários", content: "Verificar código.\n\n**Framework:**\nunittest\n\n**Conceito:**\nTestar funções isoladamente", examples: ["import unittest", "class TestCase(unittest.TestCase):", "self.assertEqual(resultado, esperado)"] },
    16: { title: "Projeto: Aplicação Python", content: "Integrar conceitos em projeto.\n\n**Etapas:**\n1. Planejamento\n2. Desenvolvimento\n3. Testes\n4. Documentação", examples: ["Calculadora", "Gerenciador de tarefas", "Analisador de dados"] }
  },
  "image-processing": {
    1: { title: "Fundamentos de Processamento de Imagens", content: "Imagens digitais são matrizes de pixels. Nesta aula, você aprenderá resolução, canais, profundidade de cor, histogramas e os efeitos da compressão.\n\n**Prática:** carregue uma imagem autorizada, valide dimensões e compare RGB, escala de cinza e HSV.", examples: ["cv2.imread('imagem.jpg')", "cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)", "cv2.calcHist([gray], [0], None, [256], [0, 256])"] },
    2: { title: "Filtros e Transformações com OpenCV", content: "Filtros reduzem ruído e realçam estruturas. Compare blur, mediana, nitidez, limiarização e detecção de bordas, documentando quando cada técnica falha.", examples: ["cv2.GaussianBlur(img, (5, 5), 0)", "cv2.threshold(gray, 120, 255, cv2.THRESH_BINARY)", "cv2.Canny(gray, 50, 150)"] },
    3: { title: "Visão Computacional e Avaliação", content: "Visão computacional transforma pixels em decisões como classificação, detecção, segmentação e OCR. Defina uma métrica, separe validação e teste e examine falsos positivos antes de colocar o sistema em produção.", examples: ["accuracy = correct / total", "IoU = intersection / union", "matriz de confusão"] },
    4: { title: "Projeto: Inspeção Visual", content: "Crie um pipeline para identificar defeitos em peças sintéticas. Inclua preparação, limiarização, contornos, relatório de erros e limites de uso.", examples: ["cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)", "cv2.contourArea(contour)", "relatorio = {'falsos_positivos': 0}"] }
  },
  "convolutional-neural-networks": {
    1: { title: "Por que CNNs funcionam em imagens", content: "Redes neurais convolucionais usam filtros aprendidos, compartilhamento de pesos e campos receptivos para reconhecer padrões locais sem ignorar a estrutura espacial.", examples: ["Conv2d(in_channels=3, out_channels=16, kernel_size=3)", "feature_map = convolution(image, kernel)"] },
    2: { title: "Convolução, pooling e padding", content: "Entenda stride, padding, pooling e como cada escolha altera o tamanho dos mapas de características. Faça os cálculos manualmente antes de usar uma biblioteca.", examples: ["output = floor((W - K + 2P) / S) + 1", "MaxPool2d(kernel_size=2)"] },
    3: { title: "Treino, overfitting e augmentation", content: "Treine uma CNN com separação entre treino, validação e teste. Use augmentation apenas quando fizer sentido para o domínio e monitore curvas de perda e métricas.", examples: ["loss.backward()", "optimizer.step()", "RandomHorizontalFlip()"] },
    4: { title: "Projeto: Classificação de Imagens", content: "Implemente um classificador pequeno, compare uma baseline com transfer learning e escreva uma análise de erros por classe.", examples: ["model = torchvision.models.resnet18(weights='DEFAULT')", "classification_report(y_true, y_pred)"] }
  },
  "cognitive-computing": {
    1: { title: "O que é Computação Cognitiva", content: "Computação cognitiva combina percepção, linguagem, raciocínio e interação para apoiar decisões humanas. Diferencie automação determinística, sistemas probabilísticos e agentes com ferramentas.", examples: ["entrada -> contexto -> hipótese -> ação", "confidence = 0.82"] },
    2: { title: "Percepção, linguagem e contexto", content: "Integre texto, imagem e sinais estruturados com um contrato de dados claro. Identifique ambiguidades, dados sensíveis e situações em que o sistema deve pedir revisão humana.", examples: ["context = {'documento': text, 'imagem': image}", "if confidence < threshold: request_review()"] },
    3: { title: "Raciocínio assistido e IA responsável", content: "Avalie explicabilidade, viés, privacidade, segurança e rastreabilidade. Uma resposta plausível não é prova de correção: registre fontes, evidências e incerteza.", examples: ["evidence = [source_a, source_b]", "audit_log.append({'decision': decision})"] },
    4: { title: "Projeto: Assistente de Operações", content: "Modele um assistente que classifica solicitações, recupera procedimentos e encaminha casos de risco para uma pessoa responsável.", examples: ["route = classifier.predict(ticket)", "if route == 'high_risk': escalate()"] }
  },
  "generative-neural-networks": {
    1: { title: "Fundamentos de Redes Generativas", content: "Modelos generativos aprendem a representar uma distribuição para produzir novas amostras. Compare autoencoders, GANs e modelos de difusão sem confundir geração com cópia literal.", examples: ["latent = encoder(x)", "sample = generator(latent)"] },
    2: { title: "Autoencoders e espaço latente", content: "Use um encoder e um decoder para aprender uma representação compacta. Analise reconstrução, perda, capacidade do gargalo e os riscos de perder detalhes relevantes.", examples: ["reconstruction = decoder(encoder(x))", "loss = mse(x, reconstruction)"] },
    3: { title: "GANs, difusão e avaliação", content: "Entenda o jogo entre gerador e discriminador e a geração iterativa por difusão. Avalie qualidade, diversidade, memorization e segurança do conteúdo produzido.", examples: ["discriminator(real)", "generator(noise)", "denoised = diffusion_step(noisy)"] },
    4: { title: "Projeto: Geração responsável", content: "Construa um experimento com dados sintéticos ou licenciados, documente a origem dos dados e compare qualidade e diversidade com uma baseline.", examples: ["dataset_license = 'CC BY 4.0'", "metrics = {'diversity': score}"] }
  }
};

export const sqlBasicsContent = {
  1: { title: "Introdução ao SQL", content: "SQL (Structured Query Language) é a linguagem padrão para gerenciar bancos de dados relacionais.\n\n**O que você aprenderá:**\n1. Conceitos básicos de bancos de dados\n2. Estrutura de uma query SQL\n3. Como conectar a um banco de dados\n4. Primeiros comandos SQL\n\n**Por que é importante:**\nSQL é essencial para qualquer profissional que trabalha com dados. Praticamente todo sistema moderno usa bancos de dados relacionais.", examples: ["SELECT * FROM users;", "CREATE TABLE products;", "INSERT INTO orders VALUES (...)"] },
  2: { title: "Comando SELECT", content: "O comando SELECT é o mais fundamental do SQL. Ele permite recuperar dados de uma tabela.\n\n**Sintaxe básica:**\nSELECT coluna1, coluna2 FROM tabela;\n\n**Variações:**\n- SELECT * (todas as colunas)\n- SELECT DISTINCT (valores únicos)\n- SELECT com WHERE (filtrar dados)", examples: ["SELECT id, nome FROM clientes;", "SELECT DISTINCT cidade FROM usuarios;", "SELECT * FROM produtos WHERE preco > 100;"] },
  3: { title: "Cláusula WHERE", content: "WHERE permite filtrar registros baseado em condições.\n\n**Operadores:**\n- = (igual)\n- != ou <> (diferente)\n- > (maior que)\n- < (menor que)\n- >= (maior ou igual)\n- <= (menor ou igual)\n- AND, OR, NOT", examples: ["WHERE idade > 18", "WHERE cidade = 'São Paulo' AND idade < 30", "WHERE status != 'inativo'"] },
  4: { title: "INSERT - Inserindo Dados", content: "INSERT permite adicionar novos registros a uma tabela.\n\n**Sintaxe:**\nINSERT INTO tabela (coluna1, coluna2) VALUES (valor1, valor2);\n\n**Pontos importantes:**\n- Ordem das colunas deve corresponder aos valores\n- Strings devem estar entre aspas\n- Datas em formato específico", examples: ["INSERT INTO usuarios (nome, email) VALUES ('João', 'joao@email.com');", "INSERT INTO produtos VALUES (1, 'Notebook', 2500.00);"] },
  5: { title: "UPDATE - Atualizando Dados", content: "UPDATE modifica registros existentes.\n\n**Sintaxe:**\nUPDATE tabela SET coluna1 = valor1 WHERE condição;\n\n**Cuidado:**\n- Sempre use WHERE para evitar atualizar todos os registros\n- Teste a condição com SELECT primeiro", examples: ["UPDATE usuarios SET email = 'novo@email.com' WHERE id = 5;", "UPDATE produtos SET preco = preco * 1.1 WHERE categoria = 'eletrônicos';"] },
  6: { title: "DELETE - Deletando Dados", content: "DELETE remove registros de uma tabela.\n\n**Sintaxe:**\nDELETE FROM tabela WHERE condição;\n\n**Segurança:**\n- Sempre use WHERE\n- Faça backup antes\n- Considere soft delete (marcar como inativo)", examples: ["DELETE FROM usuarios WHERE id = 10;", "DELETE FROM logs WHERE data < '2024-01-01';"] },
  7: { title: "JOINs - Relacionando Tabelas", content: "JOINs combinam dados de múltiplas tabelas.\n\n**Tipos:**\n- INNER JOIN (registros que existem em ambas)\n- LEFT JOIN (todos da esquerda + correspondentes da direita)\n- RIGHT JOIN (todos da direita + correspondentes da esquerda)\n- FULL JOIN (todos de ambas)", examples: ["SELECT u.nome, p.titulo FROM usuarios u INNER JOIN posts p ON u.id = p.usuario_id;", "SELECT * FROM clientes LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id;"] },
  8: { title: "GROUP BY - Agrupando Dados", content: "GROUP BY agrupa registros por uma ou mais colunas.\n\n**Funções de agregação:**\n- COUNT() - conta registros\n- SUM() - soma valores\n- AVG() - média\n- MAX() - máximo\n- MIN() - mínimo", examples: ["SELECT categoria, COUNT(*) FROM produtos GROUP BY categoria;", "SELECT usuario_id, SUM(valor) FROM pedidos GROUP BY usuario_id;"] },
  9: { title: "ORDER BY - Ordenando Resultados", content: "ORDER BY ordena os resultados.\n\n**Sintaxe:**\nSELECT * FROM tabela ORDER BY coluna ASC|DESC;\n\n**Opções:**\n- ASC (ascendente, padrão)\n- DESC (descendente)", examples: ["SELECT * FROM usuarios ORDER BY nome ASC;", "SELECT * FROM vendas ORDER BY valor DESC;"] },
  10: { title: "Projeto: Banco de Dados Completo", content: "Aplicar conceitos em um projeto real.\n\n**Etapas:**\n1. Criar tabelas\n2. Inserir dados\n3. Consultar dados\n4. Atualizar e deletar\n5. Usar JOINs e GROUP BY", examples: ["CREATE TABLE clientes (...)", "INSERT INTO clientes VALUES (...)", "SELECT * FROM clientes JOIN pedidos ..."] }
};

export const numpyContent = {
  1: { title: "Introdução ao NumPy", content: "NumPy é a biblioteca fundamental para computação numérica em Python.\n\n**O que você aprenderá:**\n1. O que é NumPy\n2. Instalação e configuração\n3. Arrays vs Listas\n4. Vantagens do NumPy\n\n**Por que é importante:**\nNumPy é a base para Pandas, Matplotlib e TensorFlow. Essencial para ciência de dados.", examples: ["import numpy as np", "arr = np.array([1, 2, 3])", "print(arr.shape)"] },
  2: { title: "Criando Arrays", content: "Diferentes formas de criar arrays NumPy.\n\n**Métodos:**\n1. np.array() - de lista\n2. np.zeros() - array de zeros\n3. np.ones() - array de uns\n4. np.arange() - sequência\n5. np.linspace() - valores espaçados", examples: ["np.array([1, 2, 3])", "np.zeros((3, 3))", "np.arange(0, 10, 2)", "np.linspace(0, 1, 5)"] },
  3: { title: "Indexação e Slicing", content: "Acessar elementos de um array.\n\n**Operações:**\n1. Indexação: arr[0]\n2. Slicing: arr[1:3]\n3. Fancy indexing: arr[[0, 2, 4]]\n4. Boolean indexing: arr[arr > 5]", examples: ["arr[0]", "arr[1:3]", "arr[::2]", "arr[arr > 5]"] },
  4: { title: "Operações Matemáticas", content: "Operações elemento a elemento.\n\n**Operações:**\n1. Adição, subtração, multiplicação, divisão\n2. Potência e raiz\n3. Funções trigonométricas\n4. Logaritmo e exponencial", examples: ["arr + 5", "arr * 2", "np.sqrt(arr)", "np.exp(arr)"] },
  5: { title: "Broadcasting", content: "Operações entre arrays de tamanhos diferentes.\n\n**Regras:**\n1. Se dimensões diferentes, a menor é expandida\n2. Se tamanhos diferentes, o menor é repetido\n\n**Exemplo:**\n(3, 1) + (3,) = (3, 3)", examples: ["arr1.shape (3, 1)", "arr2.shape (3,)", "arr1 + arr2"] },
  6: { title: "Álgebra Linear", content: "Operações de álgebra linear com NumPy.\n\n**Operações:**\n1. Produto de matrizes: np.dot()\n2. Determinante: np.linalg.det()\n3. Inversa: np.linalg.inv()\n4. Autovalores: np.linalg.eig()", examples: ["np.dot(A, B)", "np.linalg.det(A)", "np.linalg.inv(A)"] },
  7: { title: "Funções Estatísticas", content: "Análise estatística com NumPy.\n\n**Funções:**\n1. np.mean() - média\n2. np.std() - desvio padrão\n3. np.min(), np.max() - mínimo e máximo\n4. np.percentile() - percentis", examples: ["np.mean(arr)", "np.std(arr)", "np.percentile(arr, 50)"] },
  8: { title: "Projeto: Análise de Dados", content: "Aplicar NumPy em análise de dados.\n\n**Etapas:**\n1. Carregar dados\n2. Limpeza e transformação\n3. Análise estatística\n4. Visualização", examples: ["data = np.loadtxt('dados.csv')", "media = np.mean(data)", "desvio = np.std(data)"] }
};

export const pandasContent = {
  1: { title: "Introdução ao Pandas", content: "Pandas é a biblioteca para manipulação de dados em Python.\n\n**O que você aprenderá:**\n1. DataFrames e Series\n2. Leitura de dados\n3. Exploração de dados\n4. Limpeza e transformação\n\n**Por que é importante:**\nPandas é essencial para ciência de dados. Trabalha com dados tabulares como Excel.", examples: ["import pandas as pd", "df = pd.read_csv('dados.csv')", "df.head()"] },
  2: { title: "Series", content: "Series é uma estrutura 1D de dados.\n\n**Características:**\n1. Índice e valores\n2. Operações vetorizadas\n3. Alinhamento automático\n\n**Criação:**\ns = pd.Series([1, 2, 3])", examples: ["pd.Series([1, 2, 3])", "s.index = ['a', 'b', 'c']", "s['a']"] },
  3: { title: "DataFrames", content: "DataFrame é uma estrutura 2D de dados (tabela).\n\n**Características:**\n1. Linhas e colunas\n2. Índice e colunas nomeadas\n3. Operações vetorizadas\n\n**Criação:**\ndf = pd.DataFrame({'col1': [1, 2], 'col2': [3, 4]})", examples: ["pd.DataFrame(dados)", "df.shape", "df.columns"] },
  4: { title: "Leitura de Dados", content: "Carregar dados de diferentes formatos.\n\n**Formatos:**\n1. CSV: pd.read_csv()\n2. Excel: pd.read_excel()\n3. SQL: pd.read_sql()\n4. JSON: pd.read_json()", examples: ["pd.read_csv('dados.csv')", "pd.read_excel('dados.xlsx')", "pd.read_json('dados.json')"] },
  5: { title: "Limpeza de Dados", content: "Preparar dados para análise.\n\n**Operações:**\n1. Remover duplicatas: drop_duplicates()\n2. Lidar com valores faltantes: fillna(), dropna()\n3. Converter tipos: astype()\n4. Renomear colunas: rename()", examples: ["df.drop_duplicates()", "df.fillna(0)", "df.astype('int')"] },
  6: { title: "Transformação de Dados", content: "Modificar e reorganizar dados.\n\n**Operações:**\n1. Aplicar funções: apply()\n2. Map: map()\n3. Groupby: groupby()\n4. Merge: merge()", examples: ["df['nova_col'] = df['col'].apply(func)", "df.groupby('categoria').sum()"] },
  7: { title: "Análise Exploratória", content: "Explorar dados com Pandas.\n\n**Operações:**\n1. Descrição: describe()\n2. Info: info()\n3. Correlação: corr()\n4. Value counts: value_counts()", examples: ["df.describe()", "df.info()", "df.corr()"] },
  8: { title: "Visualização com Pandas", content: "Criar gráficos com Pandas.\n\n**Gráficos:**\n1. Linha: plot()\n2. Barra: plot(kind='bar')\n3. Histograma: hist()\n4. Scatter: plot(kind='scatter')", examples: ["df.plot()", "df.plot(kind='bar')", "df.hist()"] },
  9: { title: "Pivot Tables", content: "Reorganizar dados em tabelas dinâmicas.\n\n**Sintaxe:**\ndf.pivot_table(values='col', index='idx', columns='col2', aggfunc='sum')\n\n**Uso:**\nResumir e agregar dados", examples: ["df.pivot_table(values='vendas', index='mes', columns='categoria')", "df.pivot_table(aggfunc='mean')"] },
  10: { title: "Projeto: Análise de Vendas", content: "Aplicar Pandas em análise real.\n\n**Etapas:**\n1. Carregar dados de vendas\n2. Limpeza e validação\n3. Análise exploratória\n4. Insights e visualizações", examples: ["df = pd.read_csv('vendas.csv')", "df.groupby('mes').sum()", "df.plot(kind='bar')"] }
};

export const mlFundamentalsContent = {
  1: { title: "O que é Machine Learning", content: "Machine Learning é a ciência de fazer computadores aprender com dados.\n\n**Definição:**\nSistemas que melhoram com a experiência sem serem explicitamente programados.\n\n**Aplicações:**\n1. Recomendações (Netflix, Amazon)\n2. Reconhecimento de imagem\n3. Processamento de linguagem natural\n4. Previsão de vendas", examples: ["Classificação de emails como spam", "Recomendação de filmes", "Previsão de preços"] },
  2: { title: "Tipos de Machine Learning", content: "Diferentes abordagens de ML.\n\n**Tipos:**\n1. Supervisionado: Dados rotulados\n2. Não-supervisionado: Dados sem rótulos\n3. Reforço: Aprender por recompensas\n4. Semi-supervisionado: Mistura dos dois", examples: ["Supervisionado: Classificação de imagens", "Não-supervisionado: Clustering de clientes", "Reforço: Jogos de IA"] },
  3: { title: "Workflow de ML", content: "Processo de desenvolvimento de um modelo.\n\n**Etapas:**\n1. Coleta de dados\n2. Exploração e limpeza\n3. Feature engineering\n4. Divisão treino/teste\n5. Treinamento\n6. Avaliação\n7. Ajuste de hiperparâmetros\n8. Implantação", examples: ["Dados -> Limpeza -> Treinamento -> Avaliação"] },
  4: { title: "Preparação de Dados", content: "Preparar dados para treinar modelos.\n\n**Operações:**\n1. Remover valores faltantes\n2. Normalização/Padronização\n3. Codificação de variáveis categóricas\n4. Tratamento de outliers", examples: ["df.fillna(0)", "from sklearn.preprocessing import StandardScaler", "pd.get_dummies(df)"] },
  5: { title: "Feature Engineering", content: "Criar features relevantes para o modelo.\n\n**Técnicas:**\n1. Seleção de features\n2. Criação de novas features\n3. Transformação de features\n4. Redução de dimensionalidade", examples: ["df['idade_grupo'] = pd.cut(df['idade'], bins=[0, 18, 65, 100])", "df['log_valor'] = np.log(df['valor'])"] },
  6: { title: "Normalização de Dados", content: "Escalar dados para o mesmo intervalo.\n\n**Métodos:**\n1. Min-Max: [0, 1]\n2. Padronização: média 0, desvio 1\n3. Normalização L2\n4. Robust scaling", examples: ["from sklearn.preprocessing import MinMaxScaler", "scaler = MinMaxScaler()", "scaler.fit_transform(X)"] },
  7: { title: "Classificação", content: "Prever categorias/classes.\n\n**Algoritmos:**\n1. Regressão Logística\n2. Árvore de Decisão\n3. Random Forest\n4. SVM\n5. Naive Bayes", examples: ["from sklearn.ensemble import RandomForestClassifier", "clf = RandomForestClassifier()", "clf.fit(X_train, y_train)"] },
  8: { title: "Projeto: Classificador de Iris", content: "Aplicar ML em um dataset clássico.\n\n**Etapas:**\n1. Carregar dataset Iris\n2. Exploração de dados\n3. Treinamento de modelo\n4. Avaliação e métricas", examples: ["from sklearn.datasets import load_iris", "iris = load_iris()", "X_train, X_test, y_train, y_test = train_test_split(X, y)"] }
};

export const neuralNetworksContent = {
  1: { title: "Fundamentos de Redes Neurais", content: "Redes neurais são inspiradas no cérebro humano.\n\n**Componentes:**\n1. Neurônios\n2. Sinapses (pesos)\n3. Camadas\n4. Funções de ativação\n\n**Vantagens:**\nCapazes de aprender padrões complexos", examples: ["Neurônio: y = f(w*x + b)", "Rede: Múltiplas camadas de neurônios"] },
  2: { title: "Perceptron", content: "Modelo mais simples de rede neural.\n\n**Estrutura:**\n1 camada de entrada -> 1 neurônio de saída\n\n**Limitações:**\nSó pode resolver problemas linearmente separáveis", examples: ["Classificação binária linear", "Porta lógica AND"] },
  3: { title: "Backpropagation", content: "Algoritmo para treinar redes neurais.\n\n**Processo:**\n1. Forward pass: Calcular saída\n2. Calcular erro\n3. Backward pass: Propagar erro\n4. Atualizar pesos\n\n**Importância:**\nTorna possível treinar redes profundas", examples: ["Descida do gradiente", "Atualizar pesos: w = w - lr * dw"] },
  4: { title: "Multi-Layer Perceptron (MLP)", content: "Rede neural com múltiplas camadas.\n\n**Estrutura:**\nEntrada -> Camadas ocultas -> Saída\n\n**Capacidade:**\nPode resolver problemas não-lineares", examples: ["Camada 1: 784 neurônios", "Camada 2: 128 neurônios", "Saída: 10 neurônios"] },
  5: { title: "Funções de Ativação", content: "Funções que adicionam não-linearidade.\n\n**Funções:**\n1. ReLU: max(0, x)\n2. Sigmoid: 1/(1+e^-x)\n3. Tanh: (e^x - e^-x)/(e^x + e^-x)\n4. Softmax: Para multi-classe", examples: ["ReLU: Rápido e eficiente", "Sigmoid: Probabilidade", "Softmax: Classificação multi-classe"] },
  6: { title: "Otimizadores", content: "Algoritmos para atualizar pesos.\n\n**Otimizadores:**\n1. SGD: Gradiente estocástico\n2. Adam: Adaptativo\n3. RMSprop: Média móvel\n4. Adagrad: Taxa adaptativa", examples: ["optimizer = Adam(lr=0.001)", "optimizer.minimize(loss)"] },
  7: { title: "TensorFlow Basics", content: "Framework para deep learning.\n\n**Componentes:**\n1. Tensores\n2. Operações\n3. Grafos de computação\n4. Sessões", examples: ["import tensorflow as tf", "model = tf.keras.Sequential()", "model.add(tf.keras.layers.Dense(128))"] },
  8: { title: "PyTorch Basics", content: "Framework alternativo para deep learning.\n\n**Vantagens:**\n1. Dinâmico\n2. Fácil de debugar\n3. Comunidade forte\n4. Pesquisa", examples: ["import torch", "model = torch.nn.Sequential()", "torch.nn.Linear(784, 128)"] },
  9: { title: "Keras API", content: "Interface de alto nível para deep learning.\n\n**Vantagens:**\n1. Simples e intuitivo\n2. Rápido prototipagem\n3. Funciona com TensorFlow\n4. Documentação excelente", examples: ["from tensorflow import keras", "model = keras.Sequential()", "model.compile(optimizer='adam', loss='mse')"] },
  10: { title: "Projeto: Classificador MNIST", content: "Classificar dígitos manuscritos.\n\n**Etapas:**\n1. Carregar dataset MNIST\n2. Preparar dados\n3. Construir rede neural\n4. Treinar e avaliar", examples: ["from keras.datasets import mnist", "(X_train, y_train), (X_test, y_test) = mnist.load_data()", "model.fit(X_train, y_train)"] }
};

export const llmsContent = {
  1: { title: "O que são LLMs", content: "Large Language Models são redes neurais treinadas em enormes quantidades de texto.\n\n**Características:**\n1. Bilhões de parâmetros\n2. Treinados em internet\n3. Podem gerar texto\n4. Entendem contexto\n\n**Exemplos:**\nGPT, Claude, Llama", examples: ["GPT-4: 1.7 trilhões de parâmetros", "Claude: Treinado com RLHF", "Llama: Open source"] },
  2: { title: "Arquitetura Transformer", content: "Arquitetura base dos LLMs modernos.\n\n**Componentes:**\n1. Attention mechanism\n2. Multi-head attention\n3. Feed-forward networks\n4. Layer normalization\n\n**Vantagem:**\nParalelização eficiente", examples: ["Self-attention: Cada token vê todos os outros", "Multi-head: Múltiplas perspectivas", "Positional encoding: Ordem das palavras"] },
  3: { title: "Treinamento de LLMs", content: "Como treinar um modelo de linguagem.\n\n**Processo:**\n1. Coleta de dados\n2. Tokenização\n3. Treinamento em GPU/TPU\n4. Fine-tuning\n\n**Desafios:**\nCusto computacional, dados de qualidade", examples: ["Dados: 300 bilhões de tokens", "Tempo: Meses em clusters GPU", "Custo: Milhões de dólares"] },
  4: { title: "Fine-tuning", content: "Adaptar um LLM pré-treinado para tarefa específica.\n\n**Métodos:**\n1. Full fine-tuning\n2. LoRA (Low-Rank Adaptation)\n3. Prompt tuning\n4. Instruction tuning", examples: ["LoRA: Reduz parâmetros treináveis", "Prompt tuning: Aprender prompts", "Instruction tuning: Seguir instruções"] },
  5: { title: "GPT - Generative Pre-trained Transformer", content: "Série de modelos da OpenAI.\n\n**Versões:**\n1. GPT-3: 175B parâmetros\n2. GPT-3.5: Melhorado\n3. GPT-4: Multimodal\n4. GPT-4 Turbo: Mais rápido\n\n**Aplicações:**\nChatGPT, Copilot, APIs", examples: ["ChatGPT: Interface conversacional", "API OpenAI: Integração em apps"] },
  6: { title: "Claude - Anthropic", content: "Modelo de linguagem focado em segurança.\n\n**Características:**\n1. Constitutional AI\n2. Contexto longo (100k tokens)\n3. Segurança\n4. Honestidade\n\n**Versões:**\nClaude 1, 2, 3 (Opus, Sonnet, Haiku)", examples: ["Claude 3 Opus: Mais poderoso", "Claude 3 Haiku: Mais rápido", "Contexto: 100k tokens"] },
  7: { title: "Llama - Meta", content: "Modelo open-source de linguagem.\n\n**Características:**\n1. Open source\n2. Eficiente\n3. Comunidade\n4. Fine-tuning acessível\n\n**Versões:**\nLlama 1, 2, 3", examples: ["Llama 2: 7B, 13B, 70B parâmetros", "Llama 3: Melhor performance", "Rodável em GPU consumer"] },
  8: { title: "Projeto: Chatbot com LLM", content: "Criar um chatbot usando LLM.\n\n**Etapas:**\n1. Escolher modelo\n2. Integrar API\n3. Adicionar contexto\n4. Implementar interface", examples: ["from openai import OpenAI", "client = OpenAI()", "response = client.chat.completions.create()"] }
};

export const softwareEngineeringContent = {
  1: { title: "Princípios SOLID", content: "Princípios para código de qualidade.\n\n**SOLID:**\n1. Single Responsibility\n2. Open/Closed\n3. Liskov Substitution\n4. Interface Segregation\n5. Dependency Inversion", examples: ["Uma classe = Uma responsabilidade", "Aberto para extensão, fechado para modificação"] },
  2: { title: "Design Patterns", content: "Soluções reutilizáveis para problemas comuns.\n\n**Padrões:**\n1. Singleton\n2. Factory\n3. Observer\n4. Strategy\n5. Decorator", examples: ["Singleton: Uma única instância", "Factory: Criar objetos", "Observer: Notificar mudanças"] },
  3: { title: "Arquitetura de Software", content: "Estrutura geral do sistema.\n\n**Arquiteturas:**\n1. Monolítica\n2. Microserviços\n3. Serverless\n4. Event-driven\n\n**Escolha:**\nDepende dos requisitos", examples: ["Monolítica: Simples, tudo junto", "Microserviços: Escalável, independente", "Serverless: Sem gerenciar servidores"] },
  4: { title: "Git - Controle de Versão", content: "Gerenciar versões de código.\n\n**Comandos:**\n1. git init, clone\n2. git add, commit\n3. git push, pull\n4. git branch, merge", examples: ["git clone repo", "git add .", "git commit -m 'mensagem'", "git push origin main"] },
  5: { title: "Docker - Containerização", content: "Empacotar aplicações em containers.\n\n**Conceitos:**\n1. Imagem: Template\n2. Container: Instância\n3. Dockerfile: Receita\n4. Docker Compose: Múltiplos containers", examples: ["FROM python:3.11", "RUN pip install -r requirements.txt", "docker build -t app .", "docker run app"] },
  6: { title: "CI/CD - Integração Contínua", content: "Automatizar build, teste e deploy.\n\n**Ferramentas:**\n1. GitHub Actions\n2. GitLab CI\n3. Jenkins\n4. CircleCI\n\n**Benefícios:**\nQualidade, velocidade, confiabilidade", examples: ["name: Tests", "run: pytest", "deploy: docker push"] },
  7: { title: "AWS - Cloud Computing", content: "Infraestrutura em nuvem da Amazon.\n\n**Serviços:**\n1. EC2: Máquinas virtuais\n2. S3: Armazenamento\n3. Lambda: Serverless\n4. RDS: Banco de dados", examples: ["EC2: Servidor virtual", "S3: Armazenar arquivos", "Lambda: Função serverless"] },
  8: { title: "GCP - Google Cloud", content: "Infraestrutura em nuvem do Google.\n\n**Serviços:**\n1. Compute Engine: VMs\n2. Cloud Storage: Armazenamento\n3. Cloud Functions: Serverless\n4. BigQuery: Data warehouse", examples: ["Compute Engine: Máquinas virtuais", "Cloud Storage: Armazenar dados", "BigQuery: Análise de dados"] },
  9: { title: "Azure - Microsoft Cloud", content: "Infraestrutura em nuvem da Microsoft.\n\n**Serviços:**\n1. Virtual Machines: VMs\n2. Blob Storage: Armazenamento\n3. Functions: Serverless\n4. SQL Database: Banco de dados", examples: ["VMs: Máquinas virtuais", "Blob Storage: Armazenar arquivos", "Functions: Executar código"] },
  10: { title: "Projeto: Deploy de App", content: "Fazer deploy de uma aplicação.\n\n**Etapas:**\n1. Criar Dockerfile\n2. Configurar CI/CD\n3. Deploy em cloud\n4. Monitoramento", examples: ["docker build -t app .", "git push (trigger CI/CD)", "Deploy automático em cloud"] }
};

export const computerVisionContent = {
  1: { title: "O que é Visão Computacional?", content: "Visão Computacional é a área da IA que cria métodos para que computadores interpretem imagens e vídeos. O objetivo não é apenas reconhecer um objeto, mas transformar pixels em informação útil para uma decisão: classificar uma radiografia, localizar uma peça defeituosa ou ler um documento.\n\n**Pipeline mental:**\n1. Capturar e compreender o problema\n2. Preparar a imagem e definir rótulos\n3. Extrair características ou usar um modelo aprendido\n4. Avaliar erros, limites e impacto no contexto real\n\nA diferença entre uma demonstração e um sistema confiável está na qualidade dos dados, na definição da tarefa e na avaliação fora do conjunto de treino.", examples: ["Classificação: uma etiqueta para a imagem", "Detecção: caixas e classes", "Segmentação: máscara por pixel", "OCR: imagem para texto"] },
  2: { title: "Imagens como Matrizes de Pixels", content: "Uma imagem digital pode ser representada como uma matriz. Em escala de cinza, cada posição guarda uma intensidade; em RGB, cada pixel possui três canais. Essa representação permite aplicar operações matemáticas, mas exige atenção a resolução, profundidade de bits, proporção e memória.\n\n**Conceitos essenciais:**\n1. Resolução: largura × altura\n2. Canal: intensidade de uma componente de cor\n3. Normalização: converter valores para uma escala adequada\n4. Formato: PNG, JPEG e seus compromissos de compressão\n\nEm modelos de deep learning, a forma do tensor costuma ser [batch, canais, altura, largura]. Confundir a ordem dos eixos é um erro comum que produz resultados incorretos sem necessariamente gerar uma exceção.", examples: ["Imagem RGB: H × W × 3", "Cinza: H × W × 1", "Normalização: pixel / 255", "Tensor PyTorch: N × C × H × W"] },
  3: { title: "Cores, Espaços e Histogramas", content: "RGB é conveniente para exibição, mas nem sempre é o melhor espaço para análise. HSV separa matiz, saturação e brilho; espaços como LAB aproximam melhor a percepção humana. Histogramas mostram a distribuição de intensidades e ajudam a diagnosticar exposição, contraste e mudanças de iluminação.\n\n**Como raciocinar:**\n1. Escolha o espaço de cor pela tarefa\n2. Observe a distribuição antes de transformar\n3. Ajuste contraste com cuidado para não amplificar ruído\n4. Registre a transformação para reproduzir o experimento", examples: ["HSV para segmentar por cor", "Histograma para avaliar contraste", "LAB para comparação perceptual"] },
  4: { title: "OpenCV e Leitura de Imagens", content: "OpenCV fornece operações clássicas para ler, converter, redimensionar e salvar imagens e vídeos. Um fluxo reprodutível valida se o arquivo foi carregado, registra o tamanho e converte explicitamente o espaço de cor.\n\n**Exemplo conceitual em Python:**\n```python\nimport cv2\nimg = cv2.imread('foto.jpg')\nif img is None:\n    raise ValueError('arquivo não encontrado')\nimg_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)\npequena = cv2.resize(img_rgb, (224, 224))\n```\n\nO OpenCV usa BGR por padrão em várias funções; explicitar a conversão evita cores trocadas na visualização e no treinamento.", examples: ["cv2.imread", "cv2.cvtColor", "cv2.resize", "cv2.imwrite"], codeExamples: [{ label: "OpenCV: preparar imagem", language: "python", code: "import cv2\n\nimg = cv2.imread(\"foto.jpg\")\nif img is None:\n    raise ValueError(\"arquivo não encontrado\")\n\nrgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)\nresized = cv2.resize(rgb, (224, 224))\nprint(resized.shape)" }] },
  5: { title: "Filtros, Ruído e Bordas", content: "Filtros convolucionais combinam a vizinhança de um pixel com um kernel. Suavização reduz ruído, enquanto operadores como Sobel e Canny destacam mudanças de intensidade. O filtro correto depende do ruído e da informação que se deseja preservar.\n\n**Cuidados:**\n1. Mediana é útil contra ruído impulsivo\n2. Gaussian blur suaviza com transição gradual\n3. Canny envolve suavização, gradiente e limiarização\n4. Todo pré-processamento deve ser aplicado de forma consistente no treino e na inferência", examples: ["GaussianBlur para suavização", "Sobel para gradiente", "Canny para bordas", "Kernel 3×3"] },
  6: { title: "Transformações Geométricas", content: "Redimensionamento, recorte, rotação e perspectiva alteram a geometria da imagem. Essas operações são importantes para padronizar entradas e também para aumentar a variedade dos dados. É necessário preservar a correspondência entre imagem e anotação: ao girar uma imagem, caixas e máscaras também precisam ser transformadas.\n\n**Projeto seguro:**\n1. Defina o tamanho de entrada\n2. Preserve proporção quando possível\n3. Evite deformações que mudem a classe\n4. Faça augmentation apenas no conjunto de treino", examples: ["Resize para 224×224", "Crop central", "Rotação de 15°", "Matriz de perspectiva"] },
  7: { title: "CNNs para Classificação", content: "Uma Rede Neural Convolucional aprende filtros hierárquicos: camadas iniciais capturam bordas e texturas, camadas intermediárias combinam padrões e camadas profundas representam partes e objetos. Pooling reduz a resolução espacial e aumenta o campo receptivo.\n\n**Fluxo:** imagem → convolução → ativação → pooling → representação → classificador. A saída deve ser interpretada com uma métrica adequada e nunca apenas com a confiança de uma única previsão.", examples: ["Convolução 3×3", "ReLU", "Max pooling", "Cross-entropy"] },
  8: { title: "Transfer Learning", content: "Transfer learning reutiliza uma rede pré-treinada em um novo problema. O tutorial oficial do PyTorch apresenta dois caminhos: ajustar toda a rede (fine-tuning) ou congelar a maior parte e treinar apenas o classificador final como extrator de características.\n\n**Decisão prática:**\n1. Poucos dados: comece congelando mais camadas\n2. Dataset semelhante: reutilize representações\n3. Dataset diferente: descongele gradualmente\n4. Compare com um baseline simples e valide no conjunto de teste", examples: ["ResNet pré-treinada", "Congelar parâmetros", "Substituir camada final", "Fine-tuning com learning rate baixo"], codeExamples: [{ label: "PyTorch: transfer learning", language: "python", code: "import torch\nfrom torchvision.models import resnet18, ResNet18_Weights\n\nmodel = resnet18(weights=ResNet18_Weights.DEFAULT)\nfor parameter in model.parameters():\n    parameter.requires_grad = False\nmodel.fc = torch.nn.Linear(model.fc.in_features, 2)\n\nprint(\"classificador pronto\")" }] },
  9: { title: "Data Augmentation e Avaliação", content: "Augmentation cria variações plausíveis do conjunto de treino, como flips, crops e alterações leves de brilho. Ele não substitui dados representativos. A avaliação deve separar treino, validação e teste, evitando vazamento entre imagens quase idênticas.\n\n**Métricas:** acurácia pode esconder classes raras; precisão, recall, F1 e matriz de confusão ajudam a enxergar diferentes tipos de erro. Em aplicações críticas, avalie também calibração, latência e desempenho por subgrupo.", examples: ["RandomHorizontalFlip", "RandomResizedCrop", "Matriz de confusão", "Precision, recall e F1"] },
  10: { title: "Detecção e Segmentação", content: "Classificação responde o que está na imagem; detecção também localiza objetos com caixas; segmentação atribui uma classe a cada pixel. Essas tarefas exigem anotações diferentes e métricas específicas.\n\n**Roteiro:**\n1. Defina a ontologia de classes\n2. Padronize o formato das anotações\n3. Separe objetos parcialmente visíveis de ruído de anotação\n4. Avalie localização e classificação separadamente quando necessário", examples: ["Bounding boxes", "Máscaras semânticas", "IoU", "mAP"] },
  11: { title: "OCR e Visão Multimodal", content: "OCR transforma texto em imagem em caracteres pesquisáveis. Um pipeline robusto detecta a região, corrige perspectiva, melhora contraste e então reconhece o texto. Modelos multimodais combinam sinais visuais e linguísticos, mas precisam de validação: uma resposta plausível pode estar errada.\n\n**Boas práticas:** preserve a imagem original, informe incerteza, revise campos críticos e não envie documentos sensíveis a serviços externos sem autorização.", examples: ["Detecção de layout", "Correção de perspectiva", "Extração de campos", "Perguntas sobre imagem"] },
  12: { title: "Projeto: Classificador Visual", content: "Construa um classificador de duas ou mais classes usando um dataset próprio ou público com licença compatível. Documente a origem dos dados, os critérios de rotulagem, as transformações e os erros mais frequentes.\n\n**Entregáveis:**\n1. Notebook de exploração e qualidade dos dados\n2. Baseline com pré-processamento explícito\n3. CNN ou transfer learning com validação\n4. Relatório com matriz de confusão e exemplos de falhas\n5. Limitações, riscos e próximos experimentos", examples: ["Dataset versionado", "Baseline OpenCV", "Modelo PyTorch", "Relatório de erros"], codeExamples: [{ label: "PyTorch: treino mínimo", language: "python", code: "import torch\n\noptimizer = torch.optim.Adam(model.parameters(), lr=1e-3)\ncriterion = torch.nn.CrossEntropyLoss()\n\nfor images, labels in train_loader:\n    optimizer.zero_grad()\n    logits = model(images)\n    loss = criterion(logits, labels)\n    loss.backward()\n    optimizer.step()\n\nprint(\"época concluída\")" }] }
};

// Extend lessonsContentData with new modules
Object.assign(lessonsContentData, {
  "computer-vision": computerVisionContent,
  "sql-basics": sqlBasicsContent,
  "numpy": numpyContent,
  "pandas": pandasContent,
  "ml-fundamentals": mlFundamentalsContent,
  "neural-networks": neuralNetworksContent,
  "llms": llmsContent,
  "software-engineering": softwareEngineeringContent,
});

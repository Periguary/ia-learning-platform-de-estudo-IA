// Dados de todos os cursos da plataforma
export const coursesData: Record<string, any> = {
  "linear-algebra": {
    title: "Álgebra Linear",
    phase: 1,
    module: "linear-algebra",
    description: "Aprenda os fundamentos de Álgebra Linear essenciais para Machine Learning",
    duration: "4 semanas",
    lessons: 12,
    difficulty: "Iniciante",
    rating: 4.8,
    reviews: 234,
    sections: [
      {
        title: "Introdução",
        lessons: [
          { id: 1, title: "O que é Álgebra Linear?", duration: "15 min", completed: false },
          { id: 2, title: "Aplicações em IA", duration: "20 min", completed: false },
          { id: 3, title: "Ferramentas e Bibliotecas", duration: "18 min", completed: false },
        ],
      },
      {
        title: "Vetores",
        lessons: [
          { id: 4, title: "Conceito de Vetor", duration: "25 min", completed: false },
          { id: 5, title: "Operações Vetoriais", duration: "30 min", completed: false },
          { id: 6, title: "Produto Escalar", duration: "28 min", completed: false },
          { id: 7, title: "Produto Vetorial", duration: "25 min", completed: false },
        ],
      },
      {
        title: "Matrizes",
        lessons: [
          { id: 8, title: "Conceito de Matriz", duration: "20 min", completed: false },
          { id: 9, title: "Operações com Matrizes", duration: "35 min", completed: false },
          { id: 10, title: "Determinantes", duration: "30 min", completed: false },
          { id: 11, title: "Matrizes Inversas", duration: "28 min", completed: false },
        ],
      },
      {
        title: "Aplicações Práticas",
        lessons: [
          { id: 12, title: "Projeto: Transformações Lineares", duration: "45 min", completed: false },
        ],
      },
    ],
  },
  "statistics": {
    title: "Estatística",
    phase: 1,
    module: "statistics",
    description: "Domine conceitos estatísticos fundamentais para análise de dados e IA",
    duration: "5 semanas",
    lessons: 14,
    difficulty: "Iniciante",
    rating: 4.7,
    reviews: 189,
    sections: [
      {
        title: "Fundamentos",
        lessons: [
          { id: 1, title: "O que é Estatística?", duration: "20 min", completed: false },
          { id: 2, title: "Tipos de Dados", duration: "25 min", completed: false },
          { id: 3, title: "Amostragem", duration: "30 min", completed: false },
        ],
      },
      {
        title: "Estatística Descritiva",
        lessons: [
          { id: 4, title: "Medidas de Tendência Central", duration: "35 min", completed: false },
          { id: 5, title: "Medidas de Dispersão", duration: "40 min", completed: false },
          { id: 6, title: "Distribuições", duration: "45 min", completed: false },
        ],
      },
      {
        title: "Estatística Inferencial",
        lessons: [
          { id: 7, title: "Testes de Hipótese", duration: "50 min", completed: false },
          { id: 8, title: "Intervalos de Confiança", duration: "40 min", completed: false },
          { id: 9, title: "Regressão Linear", duration: "50 min", completed: false },
        ],
      },
      {
        title: "Aplicações em IA",
        lessons: [
          { id: 10, title: "Análise Exploratória", duration: "45 min", completed: false },
          { id: 11, title: "Detecção de Outliers", duration: "35 min", completed: false },
          { id: 12, title: "Correlação e Causalidade", duration: "40 min", completed: false },
          { id: 13, title: "Testes Estatísticos", duration: "45 min", completed: false },
          { id: 14, title: "Projeto: Análise Estatística", duration: "60 min", completed: false },
        ],
      },
    ],
  },
  "probability": {
    title: "Probabilidade",
    phase: 1,
    module: "probability",
    description: "Compreenda a teoria da probabilidade essencial para algoritmos de IA",
    duration: "4 semanas",
    lessons: 12,
    difficulty: "Intermediário",
    rating: 4.6,
    reviews: 156,
    sections: [
      {
        title: "Fundamentos",
        lessons: [
          { id: 1, title: "Conceitos Básicos", duration: "25 min", completed: false },
          { id: 2, title: "Espaço Amostral e Eventos", duration: "30 min", completed: false },
          { id: 3, title: "Axiomas da Probabilidade", duration: "35 min", completed: false },
        ],
      },
      {
        title: "Probabilidade Condicional",
        lessons: [
          { id: 4, title: "Probabilidade Condicional", duration: "40 min", completed: false },
          { id: 5, title: "Teorema de Bayes", duration: "45 min", completed: false },
          { id: 6, title: "Independência", duration: "35 min", completed: false },
        ],
      },
      {
        title: "Distribuições",
        lessons: [
          { id: 7, title: "Variáveis Aleatórias", duration: "40 min", completed: false },
          { id: 8, title: "Distribuições Discretas", duration: "50 min", completed: false },
          { id: 9, title: "Distribuições Contínuas", duration: "50 min", completed: false },
        ],
      },
      {
        title: "Aplicações",
        lessons: [
          { id: 10, title: "Esperança e Variância", duration: "40 min", completed: false },
          { id: 11, title: "Lei dos Grandes Números", duration: "35 min", completed: false },
          { id: 12, title: "Projeto: Simulações Probabilísticas", duration: "60 min", completed: false },
        ],
      },
    ],
  },
  "python-basics": {
    title: "Python Básico",
    phase: 2,
    module: "python-basics",
    description: "Aprenda Python do zero com foco em ciência de dados",
    duration: "6 semanas",
    lessons: 16,
    difficulty: "Iniciante",
    rating: 4.9,
    reviews: 312,
    sections: [
      {
        title: "Fundamentos",
        lessons: [
          { id: 1, title: "Configuração do Ambiente", duration: "20 min", completed: false },
          { id: 2, title: "Variáveis e Tipos", duration: "30 min", completed: false },
          { id: 3, title: "Operadores", duration: "25 min", completed: false },
          { id: 4, title: "Controle de Fluxo", duration: "35 min", completed: false },
        ],
      },
      {
        title: "Estruturas de Dados",
        lessons: [
          { id: 5, title: "Listas", duration: "40 min", completed: false },
          { id: 6, title: "Tuplas e Conjuntos", duration: "35 min", completed: false },
          { id: 7, title: "Dicionários", duration: "40 min", completed: false },
          { id: 8, title: "Compreensão de Listas", duration: "30 min", completed: false },
        ],
      },
      {
        title: "Funções e Módulos",
        lessons: [
          { id: 9, title: "Definindo Funções", duration: "40 min", completed: false },
          { id: 10, title: "Escopo e Closure", duration: "35 min", completed: false },
          { id: 11, title: "Módulos e Pacotes", duration: "40 min", completed: false },
          { id: 12, title: "Tratamento de Erros", duration: "35 min", completed: false },
        ],
      },
      {
        title: "Programação Orientada a Objetos",
        lessons: [
          { id: 13, title: "Classes e Objetos", duration: "45 min", completed: false },
          { id: 14, title: "Herança e Polimorfismo", duration: "50 min", completed: false },
          { id: 15, title: "Métodos Especiais", duration: "40 min", completed: false },
          { id: 16, title: "Projeto: Aplicação Python", duration: "60 min", completed: false },
        ],
      },
    ],
  },
};

export const lessonsContentData: Record<string, Record<number | string, any>> = {
  "linear-algebra": {
    1: {
      title: "O que é Álgebra Linear?",
      content: `Álgebra Linear é o ramo da matemática que estuda vetores, matrizes e transformações lineares. É fundamental para entender como os algoritmos de Machine Learning funcionam.

**Definição Formal:**
Álgebra Linear é o estudo de espaços vetoriais e transformações lineares entre eles. Um espaço vetorial é um conjunto de objetos (vetores) que podem ser adicionados e multiplicados por escalares.

**Conceitos Fundamentais:**
1. Vetores: Representações de direção e magnitude em espaço multidimensional
2. Matrizes: Arranjos retangulares de números usados para representar transformações
3. Transformações Lineares: Funções que preservam operações de adição e multiplicação
4. Espaços Vetoriais: Conjuntos de vetores com operações bem definidas

**Por que é importante em IA?**
- Dados são representados como vetores
- Modelos de rede neural usam matrizes para pesos
- Otimização usa conceitos de gradientes
- Processamento de imagens e linguagem natural dependem de álgebra linear`,
      examples: [
        "Vetor 2D: [3, 4] representa um ponto no plano cartesiano",
        "Matriz 2x2: [[1, 2], [3, 4]] pode representar uma transformação",
        "Em redes neurais: cada camada aplica uma transformação linear y = Wx + b"
      ]
    },
    notebooks: {
      title: "Notebooks Python com Exemplos",
      content: "# Notebooks Python com Exemplos\n\n## Conteúdo Disponível:\n\n### 1. Introdução a NumPy\n- Criação de arrays\n- Operações básicas\n- Broadcasting\n\n### 2. Vetores e Matrizes\n- Representação em NumPy\n- Operações vetoriais\n- Visualização com Matplotlib\n\n### 3. Transformações Lineares\n- Rotação, Escala, Reflexão\n- Composição de transformações\n\n### 4. Aplicações Práticas\n- PCA, Regressão linear, SVM"
    },
    exercises: {
      title: "Exercícios Interativos",
      content: "# Exercícios Interativos\n\n## Exercícios por Tópico:\n\n### Vetores (Nível Iniciante)\n1. Calcular magnitude de um vetor\n2. Normalizar um vetor\n3. Calcular produto escalar\n4. Verificar ortogonalidade\n\n### Matrizes (Nível Intermediário)\n1. Multiplicação de matrizes\n2. Calcular determinante\n3. Encontrar transposta\n4. Verificar simetria\n\n### Transformações (Nível Avançado)\n1. Implementar rotação\n2. Implementar escala\n3. Compor transformações\n4. Encontrar transformação inversa"
    },
    projects: {
      title: "Projetos Práticos",
      content: "# Projetos Práticos\n\n## Projeto 1: Análise de Imagem\n- Carregar imagem, Representar como matriz, Aplicar transformações\n\n## Projeto 2: Recomendação de Filmes\n- Fatorização de matrizes, Calcular similaridade\n\n## Projeto 3: Compressão de Imagem\n- SVD, Reduzir dimensionalidade, Reconstruir\n\n## Projeto 4: PCA\n- Implementar PCA, Reduzir dimensionalidade\n\n## Projeto 5: Rede Neural Simples\n- Forward pass, Operações matriciais, Calcular loss"
    },
    references: {
      title: "Referências e Leitura Adicional",
      content: "# Referências e Leitura Adicional\n\n## Livros Recomendados:\n\n### Introdutórios\n1. Linear Algebra Done Right - Sheldon Axler\n2. Introduction to Linear Algebra - Gilbert Strang\n\n### Intermediários\n3. Matrix Computations - Golub & Van Loan\n\n### Aplicados em IA\n4. Deep Learning - Goodfellow, Bengio, Courville\n\n## Cursos Online:\n- MIT OpenCourseWare: Linear Algebra\n- 3Blue1Brown: Essence of Linear Algebra\n- Coursera: Linear Algebra Specialization\n- edX: Linear Algebra Fundamentals"
    }
  },
  "statistics": {
    1: {
      title: "O que é Estatística?",
      content: `Estatística é a ciência que coleta, analisa e interpreta dados para extrair informações significativas. É essencial para tomar decisões baseadas em dados em IA e ciência de dados.

**Ramos da Estatística:**
1. Estatística Descritiva: Resumo e visualização de dados
2. Estatística Inferencial: Fazer conclusões sobre populações a partir de amostras
3. Estatística Bayesiana: Usar probabilidades para atualizar crenças

**Aplicações em IA:**
- Análise exploratória de dados (EDA)
- Validação de modelos
- Detecção de anomalias
- Testes de significância`,
      examples: [
        "Média de um dataset: soma de todos os valores dividida pelo número de elementos",
        "Desvio padrão: mede a dispersão dos dados em torno da média",
        "Correlação: mede a relação entre duas variáveis"
      ]
    }
  },
  "probability": {
    1: {
      title: "Conceitos Básicos de Probabilidade",
      content: `Probabilidade é a medida da chance de um evento ocorrer. É fundamental para entender algoritmos de IA, especialmente em aprendizado bayesiano e modelos probabilísticos.

**Definições Fundamentais:**
1. Experimento Aleatório: Processo com resultado incerto
2. Espaço Amostral: Conjunto de todos os resultados possíveis
3. Evento: Subconjunto do espaço amostral
4. Probabilidade: Número entre 0 e 1 que mede a chance de um evento

**Fórmula Básica:**
P(A) = (Número de resultados favoráveis) / (Número total de resultados possíveis)

**Aplicações em IA:**
- Classificação probabilística
- Redes Bayesianas
- Modelos generativos`,
      examples: [
        "Lançar um dado: P(número par) = 3/6 = 0.5",
        "Baralho: P(carta vermelha) = 26/52 = 0.5",
        "Classificação: P(spam | palavras) usando Bayes"
      ]
    }
  },
  "python-basics": {
    1: {
      title: "Configuração do Ambiente Python",
      content: `Antes de começar a programar em Python, você precisa configurar seu ambiente de desenvolvimento. Vamos aprender como instalar Python, gerenciadores de pacotes e IDEs.

**O que você aprenderá:**
1. Instalar Python 3.x
2. Configurar pip e virtualenv
3. Usar Jupyter Notebook
4. Configurar uma IDE (VS Code ou PyCharm)

**Por que é importante:**
- Um ambiente bem configurado economiza tempo
- Evita conflitos de dependências
- Facilita colaboração em projetos`,
      examples: [
        "Instalar Python: python --version",
        "Criar ambiente virtual: python -m venv env",
        "Ativar ambiente: source env/bin/activate (Linux/Mac)",
        "Instalar pacotes: pip install numpy pandas"
      ]
    }
  }
};

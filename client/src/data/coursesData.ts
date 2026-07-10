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
    2: {
      title: "Aplicações em IA",
      content: `Álgebra Linear é a base matemática de praticamente todos os algoritmos de IA modernos.

**Machine Learning:** Representação de dados como vetores, transformações de features, redes neurais com transformações lineares (y = Wx + b), regressão linear.

**Processamento de Imagens:** Imagens como matrizes de pixels, filtros como matrizes, transformações geométricas com matrizes de rotação/escala, compressão com SVD.

**Processamento de Linguagem Natural:** Embeddings como vetores, Transformers com operações matriciais, Word2Vec baseado em álgebra linear.

**Otimização:** Gradientes como vetores, Hessiana como matriz, métodos de otimização baseados em álgebra linear.`,
      examples: [
        "CNN: Filtro 3x3 convoluciona com imagem para detectar features",
        "Transformer: Q, K, V são matrizes que calculam atenção",
        "PCA: Encontra direções de máxima variância usando SVD",
        "Regressão: Solução β = (X^T X)^-1 X^T y"
      ]
    },
    3: {
      title: "Ferramentas e Bibliotecas",
      content: `Existem várias bibliotecas Python otimizadas para operações de álgebra linear.

**NumPy:** Biblioteca fundamental com arrays N-dimensionais, operações vetorizadas, funções em numpy.linalg.

**SciPy:** Funções avançadas, decomposições (SVD, QR, Cholesky), solucionadores de sistemas.

**PyTorch e TensorFlow:** Deep learning com operações otimizadas para GPU, autograd para gradientes automáticos.

**Scikit-learn:** Machine learning com algoritmos usando álgebra linear (PCA, SVM, Regressão Linear).

**Instalação:** pip install numpy scipy scikit-learn torch tensorflow`,
      examples: [
        "import numpy as np; a = np.array([[1, 2], [3, 4]])",
        "Determinante: np.linalg.det(a)",
        "Autovalores: np.linalg.eig(a)",
        "Inversa: np.linalg.inv(a)"
      ]
    },
    4: {
      title: "Conceito de Vetor",
      content: `Um vetor é uma quantidade com magnitude e direção, representado como lista ordenada de números.

**Definição:** v = [v1, v2, ..., vn] em R^n

**Representação Geométrica:** Em 2D é um ponto (x, y), em 3D é (x, y, z), em dimensões maiores é conceito abstrato.

**Propriedades:** Magnitude ||v|| = sqrt(v1² + v2² + ... + vn²), direção, vetor unitário com magnitude 1.

**Operações:** Adição [1,2]+[3,4]=[4,6], subtração, multiplicação por escalar 2*[1,2]=[2,4].

**Aplicações em IA:** Cada amostra é um vetor, embeddings de palavras, pesos de redes neurais.`,
      examples: [
        "Vetor 2D: v = [3, 4], magnitude = 5",
        "Vetor normalizado: v / ||v|| = [0.6, 0.8]",
        "Vetor zero: [0, 0, 0]",
        "Vetor unitário em x: [1, 0, 0]"
      ]
    },
    5: {
      title: "Operações Vetoriais",
      content: `Operações que realizamos com vetores.

**Adição:** v + w = [v1+w1, v2+w2, ..., vn+wn]. Geometricamente: coloque w na ponta de v.

**Subtração:** v - w = [v1-w1, v2-w2, ..., vn-wn]. Geometricamente: vetor de w para v.

**Multiplicação por Escalar:** α*v = [α*v1, α*v2, ..., α*vn]. Muda magnitude mantendo direção.

**Combinação Linear:** α1*v1 + α2*v2 + ... + αn*vn

**Propriedades:** Comutativa, associativa, distributiva.

**Aplicações:** Transformações de dados, mudanças de base, representação de movimentos.`,
      examples: [
        "[1, 2] + [3, 4] = [4, 6]",
        "2 * [1, 2] = [2, 4]",
        "0.5 * [1, 2] + 0.5 * [3, 4] = [2, 3]",
        "[5, 5] - [1, 2] = [4, 3]"
      ]
    },
    6: {
      title: "Produto Escalar",
      content: `O produto escalar combina dois vetores e retorna um número.

**Definição:** v · w = v1*w1 + v2*w2 + ... + vn*wn

**Interpretação Geométrica:** v · w = ||v|| * ||w|| * cos(θ) onde θ é o ângulo entre vetores.

**Propriedades:** Se v·w=0 são ortogonais, se >0 ângulo agudo, se <0 ângulo obtuso, v·v=||v||².

**Normalização:** v_normalizado = v / ||v||

**Aplicações em IA:** Similaridade entre vetores, ângulos entre dados, projeção, atenção em Transformers.

**Exemplo:** v=[1,2], w=[3,4], v·w=1*3+2*4=11`,
      examples: [
        "[1, 0] · [0, 1] = 0 (ortogonais)",
        "[1, 1] · [1, 1] = 2 = ||[1, 1]||²",
        "Similaridade de cosseno: (u · v) / (||u|| * ||v||)",
        "Projeção: (v · w / ||w||²) * w"
      ]
    },
    7: {
      title: "Produto Vetorial",
      content: `Operação em 3D que retorna vetor perpendicular a ambos.

**Definição:** v × w = [v2*w3-v3*w2, v3*w1-v1*w3, v1*w2-v2*w1]

**Propriedades:** Resultado perpendicular a v e w, magnitude ||v×w||=||v||*||w||*sin(θ), direção pela regra da mão direita.

**Interpretação:** Magnitude = área do paralelogramo, direção = perpendicular ao plano.

**Aplicações:** Gráficos 3D (normais), física (torque), visão computacional, detecção de orientação.

**Nota:** Só definido em 3D. Em outras dimensões usamos produto exterior.`,
      examples: [
        "[1, 0, 0] × [0, 1, 0] = [0, 0, 1]",
        "Magnitude = ||v|| * ||w|| * sin(90°) = ||v|| * ||w||",
        "Normal a um plano: (v - p1) × (w - p1)",
        "Torque = r × F (posição × força)"
      ]
    },
    8: {
      title: "Conceito de Matriz",
      content: `Arranjo retangular de números em linhas e colunas.

**Definição:** Matriz m×n com m linhas e n colunas.

**Tipos:** Quadrada (m=n), Identidade (diagonal=1), Nula (todos=0), Transposta (linhas↔colunas), Simétrica (A=A^T), Diagonal.

**Notação:** aij (elemento linha i coluna j), Ai* (linha i), A*j (coluna j).

**Aplicações em IA:** Dados (linhas=amostras, colunas=features), pesos de redes, transformações, imagens/vídeos.

**Exemplo:** A=[[1,2,3],[4,5,6]] é 2×3, a23=6`,
      examples: [
        "Matriz Identidade 2×2: [[1, 0], [0, 1]]",
        "Transposta: [[1, 2], [3, 4]]^T = [[1, 3], [2, 4]]",
        "Matriz diagonal: [[2, 0, 0], [0, 3, 0], [0, 0, 5]]",
        "Dados: 100 amostras × 50 features = matriz 100×50"
      ]
    },
    9: {
      title: "Operações com Matrizes",
      content: `Operações que realizamos com matrizes.

**Adição:** A+B soma elemento a elemento (mesmo tamanho).

**Multiplicação por Escalar:** α*A multiplica cada elemento.

**Multiplicação:** C=A×B (A m×n, B n×p → C m×p), cij=Σ(aik*bkj).

**Propriedades:** Não comutativa, associativa, distributiva.

**Transposta:** (A^T)ij = Aji, propriedades: (A^T)^T=A, (A+B)^T=A^T+B^T, (A*B)^T=B^T*A^T.

**Complexidade:** O(m*n*p) para multiplicação.`,
      examples: [
        "[[1, 2], [3, 4]] + [[5, 6], [7, 8]] = [[6, 8], [10, 12]]",
        "2 * [[1, 2], [3, 4]] = [[2, 4], [6, 8]]",
        "[[1, 2], [3, 4]] * [[5, 6], [7, 8]] = [[19, 22], [43, 50]]",
        "[[1, 2], [3, 4]]^T = [[1, 3], [2, 4]]"
      ]
    },
    10: {
      title: "Determinantes",
      content: `Número calculado de uma matriz quadrada.

**Definição 2×2:** det([[a,b],[c,d]]) = ad-bc

**Definição 3×3:** Regra de Sarrus com expansão de menores.

**Interpretação:** Magnitude = volume do paralelepípedo, sinal = orientação.

**Propriedades:** det(A*B)=det(A)*det(B), det(A^T)=det(A), det(α*A)=α^n*det(A), det(A)=0 → singular.

**Aplicações:** Verificar invertibilidade, resolver sistemas (Cramer), mudança de variáveis, cálculo de volume.

**Exemplo:** A=[[1,2],[3,4]], det(A)=1*4-2*3=-2`,
      examples: [
        "det([[1, 0], [0, 1]]) = 1 (identidade)",
        "det([[1, 2], [2, 4]]) = 0 (singular)",
        "det([[2, 0], [0, 3]]) = 6 (diagonal)",
        "det(2*A) = 4*det(A) para matriz 2×2"
      ]
    },
    11: {
      title: "Matrizes Inversas",
      content: `Matriz A^-1 tal que A*A^-1 = I (identidade).

**Definição:** A*A^-1 = A^-1*A = I

**Condições:** A quadrada, det(A)≠0 (não-singular).

**Cálculo 2×2:** A=[[a,b],[c,d]], A^-1=(1/det(A))*[[d,-b],[-c,a]]

**Propriedades:** (A^-1)^-1=A, (A*B)^-1=B^-1*A^-1, (A^T)^-1=(A^-1)^T, det(A^-1)=1/det(A).

**Aplicações:** Resolver Ax=b→x=A^-1*b, regressão linear, transformações inversas.

**Aviso:** Nunca calcule A^-1 explicitamente. Use LU ou QR.`,
      examples: [
        "I * A = A (identidade)",
        "A * A^-1 = I",
        "Resolver Ax = b: x = A^-1 * b",
        "Regressão: β = (X^T X)^-1 X^T y"
      ]
    },
    12: {
      title: "Projeto: Transformações Lineares",
      content: `Implemente transformações lineares e visualize geometricamente.

**Objetivo:** Implementar e visualizar: Rotação, Escala, Reflexão, Cisalhamento, Composição.

**Rotação 2D:** R(θ)=[[cos(θ),-sin(θ)],[sin(θ),cos(θ)]]

**Escala:** S(sx,sy)=[[sx,0],[0,sy]]

**Reflexão em x:** F=[[1,0],[0,-1]]

**Cisalhamento:** H(k)=[[1,k],[0,1]]

**Composição:** T=T1*T2*T3*...

**Tarefas:** 1) Implementar cada transformação, 2) Aplicar a pontos, 3) Visualizar com matplotlib, 4) Calcular determinantes, 5) Verificar propriedades.

**Desafio:** Rotação 3D com plotly.`,
      examples: [
        "Rotação de 90°: [[0, -1], [1, 0]]",
        "Escala 2x: [[2, 0], [0, 2]]",
        "Reflexão em x: [[1, 0], [0, -1]]",
        "Composição: Rotação depois Escala = Escala @ Rotação"
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

import { BookOpen, Code, Lightbulb, FileText, Users, Award } from "lucide-react";

export const coursesData: Record<string, any> = {
  "linear-algebra": {
    title: "Álgebra Linear",
    description: "Fundamentos de vetores, matrizes e transformações lineares",
    phase: 1,
    difficulty: "Iniciante",
    duration: "40 horas",
    lessons: 12,
    rating: 4.9,
    reviews: 2340,
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
    rating: 4.8,
    reviews: 1890,
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
    rating: 4.7,
    reviews: 1650,
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
    rating: 4.9,
    reviews: 5420,
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
  }
};

import { useLocation, useRoute } from "wouter";
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Star, ExternalLink, FileText, Code, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CourseDetail() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/course/:phase/:module");
  const [selectedLesson, setSelectedLesson] = useState<number | string | null>(null);

  if (!match) return null;

  const phase = parseInt(params?.phase || "1");
  const module = params?.module || "overview";

  // Conteúdo detalhado das aulas e recursos
  const lessonsContent: Record<number | string, { title: string; content: string; examples?: string[] }> = {
    1: {
      title: "O que é Álgebra Linear?",
      content: `
Álgebra Linear é o ramo da matemática que estuda vetores, matrizes e transformações lineares. É fundamental para entender como os algoritmos de Machine Learning funcionam.

**Definição Formal:**
Álgebra Linear é o estudo de espaços vetoriais e transformações lineares entre eles. Um espaço vetorial é um conjunto de objetos (vetores) que podem ser adicionados e multiplicados por escalares.

**Conceitos Fundamentais:**

1. **Vetores**: Representações de direção e magnitude em espaço multidimensional
2. **Matrizes**: Arranjos retangulares de números usados para representar transformações
3. **Transformações Lineares**: Funções que preservam operações de adição e multiplicação por escalar
4. **Espaços Vetoriais**: Conjuntos de vetores com operações bem definidas

**Por que é importante em IA?**
- Dados são representados como vetores
- Modelos de rede neural usam matrizes para pesos
- Otimização usa conceitos de gradientes (derivadas de transformações lineares)
- Processamento de imagens e linguagem natural dependem de álgebra linear
      `,
      examples: [
        "Vetor 2D: [3, 4] representa um ponto no plano cartesiano",
        "Matriz 2x2: [[1, 2], [3, 4]] pode representar uma transformação",
        "Em redes neurais: cada camada aplica uma transformação linear y = Wx + b"
      ]
    },
    2: {
      title: "Aplicações em IA",
      content: `
Álgebra Linear é onipresente em Inteligência Artificial. Aqui estão as aplicações principais:

**1. Representação de Dados**
- Imagens são matrizes de pixels
- Textos são convertidos em vetores (embeddings)
- Séries temporais são vetores

**2. Redes Neurais**
- Cada camada realiza: y = σ(Wx + b)
- W é uma matriz de pesos
- x é um vetor de entrada
- σ é uma função de ativação

**3. Processamento de Imagens (CNN)**
- Convoluções são operações matriciais
- Filtros são matrizes que se movem sobre a imagem
- Resultado é uma nova matriz (feature map)

**4. Processamento de Linguagem Natural (NLP)**
- Palavras são representadas como vetores (word embeddings)
- Transformers usam multiplicação de matrizes para atenção
- Similaridade entre palavras é calculada com produto escalar

**5. Recomendação e Busca**
- Fatorização de matrizes para sistemas de recomendação
- Busca semântica usa produto escalar entre vetores
- Ranking é feito com operações vetoriais
      `,
      examples: [
        "Imagem 28x28 = matriz 28x28 = 784 valores",
        "Embedding de palavra: [0.2, -0.5, 0.8, ...] (centenas de dimensões)",
        "Atenção em Transformers: Attention(Q,K,V) = softmax(QK^T/√d)V"
      ]
    },
    3: {
      title: "Ferramentas e Bibliotecas",
      content: `
Existem várias bibliotecas que implementam operações de Álgebra Linear de forma eficiente:

**NumPy**
- Biblioteca fundamental para computação científica em Python
- Operações vetorizadas (muito mais rápidas que loops)
- Suporta matrizes n-dimensionais (arrays)

**SciPy**
- Construída sobre NumPy
- Operações avançadas: decomposição, álgebra linear, otimização
- Funções especializadas para ciência e engenharia

**PyTorch e TensorFlow**
- Frameworks de deep learning
- Otimizados para GPU
- Suportam diferenciação automática (autograd)

**Scikit-learn**
- Algoritmos de Machine Learning
- Usa NumPy internamente
- Fácil de usar para iniciantes

**JAX**
- Computação numérica com diferenciação automática
- Compilação JIT para performance
- Programação funcional
      `,
      examples: [
        "NumPy: import numpy as np; A = np.array([[1, 2], [3, 4]])",
        "PyTorch: import torch; x = torch.tensor([1.0, 2.0, 3.0])",
        "TensorFlow: import tensorflow as tf; y = tf.linalg.matmul(A, B)"
      ]
    },
    4: {
      title: "Conceito de Vetor",
      content: `
Um vetor é uma quantidade que tem tanto magnitude quanto direção. Em matemática, é representado como uma lista ordenada de números.

**Representação de Vetores:**

Um vetor em ℝⁿ é uma sequência ordenada de n números reais:
v = [v₁, v₂, ..., vₙ]

**Exemplos:**
- Vetor 2D: v = [3, 4] (ponto no plano)
- Vetor 3D: v = [1, 2, 3] (ponto no espaço)
- Vetor n-D: v = [v₁, v₂, ..., vₙ] (ponto em n dimensões)

**Interpretações:**
1. **Geométrica**: Seta do origem até o ponto (v₁, v₂, ..., vₙ)
2. **Algébrica**: Lista ordenada de números
3. **Física**: Quantidade com magnitude e direção

**Magnitude (Norma):**
A magnitude de um vetor v é: ||v|| = √(v₁² + v₂² + ... + vₙ²)

**Direção:**
A direção é dada pelo ângulo que o vetor faz com os eixos coordenados.

**Vetor Unitário:**
Um vetor com magnitude 1. Obtido dividindo o vetor por sua magnitude:
û = v / ||v||
      `,
      examples: [
        "Vetor [3, 4]: magnitude = √(9+16) = 5",
        "Vetor unitário: [3/5, 4/5] = [0.6, 0.8]",
        "Em IA: cada feature é uma dimensão do vetor"
      ]
    },
    5: {
      title: "Operações Vetoriais",
      content: `
Existem várias operações que podemos realizar com vetores:

**1. Adição de Vetores**
u + v = [u₁ + v₁, u₂ + v₂, ..., uₙ + vₙ]

Geometricamente: colocar um vetor no final do outro

**2. Subtração de Vetores**
u - v = [u₁ - v₁, u₂ - v₂, ..., uₙ - vₙ]

**3. Multiplicação por Escalar**
c·v = [c·v₁, c·v₂, ..., c·vₙ]

Geometricamente: esticar ou encolher o vetor

**4. Produto Escalar (Dot Product)**
u · v = u₁v₁ + u₂v₂ + ... + uₙvₙ

Propriedades:
- Resultado é um número (escalar)
- u · v = ||u|| ||v|| cos(θ), onde θ é o ângulo entre os vetores
- Se u · v = 0, os vetores são ortogonais (perpendiculares)

**5. Magnitude**
||v|| = √(v · v) = √(v₁² + v₂² + ... + vₙ²)

**6. Normalização**
v̂ = v / ||v||

Transforma o vetor em um vetor unitário na mesma direção
      `,
      examples: [
        "Adição: [1, 2] + [3, 4] = [4, 6]",
        "Produto escalar: [1, 2] · [3, 4] = 1·3 + 2·4 = 11",
        "Verificar ortogonalidade: [1, 0] · [0, 1] = 0 ✓"
      ]
    },
    6: {
      title: "Produto Escalar",
      content: `
O produto escalar (dot product) é uma operação fundamental em álgebra linear.

**Definição:**
Para vetores u = [u₁, u₂, ..., uₙ] e v = [v₁, v₂, ..., vₙ]:
u · v = u₁v₁ + u₂v₂ + ... + uₙvₙ

**Propriedades Importantes:**

1. **Comutatividade**: u · v = v · u
2. **Distributividade**: u · (v + w) = u · v + u · w
3. **Associatividade com escalares**: (cu) · v = c(u · v)
4. **Auto-produto**: v · v = ||v||²

**Interpretação Geométrica:**
u · v = ||u|| ||v|| cos(θ)

Onde θ é o ângulo entre os vetores.

**Casos Especiais:**
- Se u · v > 0: ângulo agudo (< 90°)
- Se u · v = 0: vetores ortogonais (90°)
- Se u · v < 0: ângulo obtuso (> 90°)

**Aplicações em IA:**
- Similaridade entre vetores: quanto maior o produto escalar, mais similares
- Busca semântica: encontrar documentos similares a uma query
- Redes neurais: cálculo de ativações
      `,
      examples: [
        "Produto escalar: [2, 3] · [4, 5] = 2·4 + 3·5 = 23",
        "Vetores ortogonais: [1, 0] · [0, 1] = 0",
        "Similaridade: quanto maior o produto escalar, mais similares os vetores"
      ]
    },
    7: {
      title: "Produto Vetorial",
      content: `
O produto vetorial (cross product) é uma operação que produz um novo vetor perpendicular aos dois vetores originais.

**Nota Importante:**
O produto vetorial é definido apenas para vetores em ℝ³ (3 dimensões).

**Definição:**
Para u = [u₁, u₂, u₃] e v = [v₁, v₂, v₃]:

u × v = [u₂v₃ - u₃v₂, u₃v₁ - u₁v₃, u₁v₂ - u₂v₁]

**Propriedades:**
1. **Anti-comutatividade**: u × v = -(v × u)
2. **Não-associatividade**: (u × v) × w ≠ u × (v × w)
3. **Distributividade**: u × (v + w) = u × v + u × w
4. **Ortogonalidade**: (u × v) · u = 0 e (u × v) · v = 0

**Interpretação Geométrica:**
- Magnitude: ||u × v|| = ||u|| ||v|| sin(θ)
- Direção: perpendicular ao plano contendo u e v
- Regra da mão direita: dedos apontam de u para v, polegar aponta na direção de u × v

**Aplicações:**
- Computação gráfica: cálculo de normais de superfícies
- Física: torque, momento angular
- Menos comum em Machine Learning, mas importante em visão computacional 3D
      `,
      examples: [
        "[1, 0, 0] × [0, 1, 0] = [0, 0, 1]",
        "Produto vetorial é perpendicular aos dois vetores originais",
        "Magnitude = área do paralelogramo formado pelos dois vetores"
      ]
    },
    8: {
      title: "Conceito de Matriz",
      content: `
Uma matriz é um arranjo retangular de números organizados em linhas e colunas.

**Notação:**
Uma matriz A com m linhas e n colunas é denotada como A ∈ ℝᵐˣⁿ:

    [a₁₁  a₁₂  ...  a₁ₙ]
A = [a₂₁  a₂₂  ...  a₂ₙ]
    [...  ...  ...  ...]
    [aₘ₁  aₘ₂  ...  aₘₙ]

**Tipos de Matrizes:**

1. **Matriz Quadrada**: m = n (mesmo número de linhas e colunas)
2. **Matriz Identidade (I)**: Matriz quadrada com 1s na diagonal e 0s em outros lugares
3. **Matriz Zero**: Todos os elementos são 0
4. **Matriz Diagonal**: Não-zero apenas na diagonal principal
5. **Matriz Transposta (Aᵀ)**: Linhas e colunas trocadas
6. **Matriz Simétrica**: A = Aᵀ
7. **Matriz Ortogonal**: Aᵀ A = I

**Dimensões:**
- Vetor é uma matriz m×1 (coluna) ou 1×n (linha)
- Escalar é uma matriz 1×1

**Aplicações em IA:**
- Pesos em redes neurais
- Transformações de dados
- Representação de imagens
      `,
      examples: [
        "Matriz 2×3: [[1, 2, 3], [4, 5, 6]]",
        "Matriz Identidade 3×3: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]",
        "Transposta: [[1, 2], [3, 4]]ᵀ = [[1, 3], [2, 4]]"
      ]
    },
    9: {
      title: "Operações com Matrizes",
      content: `
Existem várias operações que podemos realizar com matrizes:

**1. Adição de Matrizes**
(A + B)ᵢⱼ = Aᵢⱼ + Bᵢⱼ

Requer que as matrizes tenham as mesmas dimensões.

**2. Subtração de Matrizes**
(A - B)ᵢⱼ = Aᵢⱼ - Bᵢⱼ

**3. Multiplicação por Escalar**
(cA)ᵢⱼ = c·Aᵢⱼ

**4. Multiplicação de Matrizes**
Se A é m×n e B é n×p, então C = AB é m×p:
Cᵢⱼ = Σₖ Aᵢₖ Bₖⱼ

Importante: AB ≠ BA (não é comutativa)

**5. Transposta**
(Aᵀ)ᵢⱼ = Aⱼᵢ

**6. Traço (Trace)**
tr(A) = Σᵢ Aᵢᵢ (soma dos elementos da diagonal)

**7. Determinante**
det(A) ou |A|: número que caracteriza a matriz

**Propriedades:**
- (A + B)ᵀ = Aᵀ + Bᵀ
- (AB)ᵀ = BᵀAᵀ
- (AB)C = A(BC) (associatividade)
- A(B + C) = AB + AC (distributividade)
      `,
      examples: [
        "Adição: [[1, 2], [3, 4]] + [[5, 6], [7, 8]] = [[6, 8], [10, 12]]",
        "Multiplicação: [[1, 2], [3, 4]] × [[5, 6], [7, 8]] = [[19, 22], [43, 50]]",
        "Traço: tr([[1, 2], [3, 4]]) = 1 + 4 = 5"
      ]
    },
    10: {
      title: "Determinantes",
      content: `
O determinante é um número que caracteriza uma matriz quadrada.

**Definição Informal:**
O determinante mede como a matriz transforma o volume/área.

**Cálculo para Matriz 2×2:**
det([[a, b], [c, d]]) = ad - bc

**Cálculo para Matriz 3×3:**
Usando a regra de Sarrus ou expansão por cofatores:

det(A) = a₁₁(a₂₂a₃₃ - a₂₃a₃₂) - a₁₂(a₂₁a₃₃ - a₂₃a₃₁) + a₁₃(a₂₁a₃₂ - a₂₂a₃₁)

**Propriedades Importantes:**

1. **Matriz Singular**: Se det(A) = 0, a matriz é singular (não invertível)
2. **Matriz Invertível**: Se det(A) ≠ 0, a matriz é invertível
3. **Produto**: det(AB) = det(A)·det(B)
4. **Transposta**: det(Aᵀ) = det(A)
5. **Escalar**: det(cA) = cⁿ·det(A) para matriz n×n

**Interpretação Geométrica:**
- |det(A)| é o volume do paralelepípedo formado pelas linhas/colunas
- Se det(A) = 0, as linhas/colunas são linearmente dependentes

**Aplicações:**
- Verificar se um sistema tem solução única
- Calcular a inversa de uma matriz
- Mudança de variáveis em integrais
      `,
      examples: [
        "det([[1, 2], [3, 4]]) = 1·4 - 2·3 = -2",
        "det([[1, 0], [0, 1]]) = 1 (matriz identidade)",
        "Se det(A) = 0, a matriz é singular"
      ]
    },
    11: {
      title: "Matrizes Inversas",
      content: `
A inversa de uma matriz A é uma matriz A⁻¹ tal que:
A·A⁻¹ = A⁻¹·A = I

**Condições para Existência:**
- A matriz deve ser quadrada (m = n)
- A matriz deve ser invertível (det(A) ≠ 0)

**Cálculo para Matriz 2×2:**
Se A = [[a, b], [c, d]], então:

A⁻¹ = (1/(ad-bc)) × [[d, -b], [-c, a]]

**Propriedades:**
1. (A⁻¹)⁻¹ = A
2. (AB)⁻¹ = B⁻¹A⁻¹
3. (Aᵀ)⁻¹ = (A⁻¹)ᵀ
4. det(A⁻¹) = 1/det(A)

**Cálculo para Matrizes Maiores:**
- Método de Gauss-Jordan
- Decomposição LU
- Métodos numéricos (NumPy, SciPy)

**Aplicações:**
- Resolver sistemas lineares: Ax = b → x = A⁻¹b
- Transformações inversas
- Cálculos em redes neurais

**Nota Importante:**
Em Machine Learning, geralmente não calculamos a inversa diretamente. Usamos métodos numéricos mais estáveis como decomposição QR ou SVD.
      `,
      examples: [
        "Se A = [[1, 2], [3, 4]], então A⁻¹ = [[-2, 1], [1.5, -0.5]]",
        "Verificação: A·A⁻¹ = I",
        "Resolver Ax = b: x = A⁻¹b"
      ]
    },
    12: {
      title: "Projeto: Transformações Lineares",
      content: `
Neste projeto, você aplicará seus conhecimentos de álgebra linear para implementar e visualizar transformações lineares.

**Objetivo:**
Entender como matrizes representam transformações no espaço 2D e 3D.

**Conceitos Abordados:**
1. Representação de pontos como vetores
2. Transformações lineares usando matrizes
3. Composição de transformações
4. Visualização de transformações

**Projeto Prático - Transformações 2D:**

Parte 1: Rotação
- Matriz de rotação: [[cos(θ), -sin(θ)], [sin(θ), cos(θ)]]
- Aplicar rotação a um conjunto de pontos
- Visualizar o resultado

Parte 2: Escala
- Matriz de escala: [[sx, 0], [0, sy]]
- Ampliar ou reduzir pontos
- Visualizar o resultado

Parte 3: Reflexão
- Matriz de reflexão: [[1, 0], [0, -1]] (reflexão em x)
- Refletir pontos
- Visualizar o resultado

Parte 4: Composição
- Combinar múltiplas transformações
- Ordem importa: AB ≠ BA
- Visualizar o resultado final

**Código Python (Pseudocódigo):**

Para implementar transformações lineares em Python:

1. Criar matriz de rotação
2. Aplicar ao conjunto de pontos
3. Visualizar o resultado

Exemplo: rotated_points = points @ rotation_matrix.T

**Desafios:**
1. Implementar múltiplas transformações
2. Compor transformações (matriz1 @ matriz2)
3. Visualizar em 3D
4. Encontrar a transformação inversa
      `,
      examples: [
        "Rotação de 90°: [[0, -1], [1, 0]]",
        "Escala 2x: [[2, 0], [0, 2]]",
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
  };
  // Recursos adicionais com conteúdo
  const additionalResources = [
    {
      id: "notebooks",
      title: "Notebooks Python com Exemplos",
      description: "Exemplos práticos implementados em Jupyter Notebooks",
      icon: Code,
      content: `
# Notebooks Python com Exemplos

## Conteúdo Disponível:

### 1. Introdução a NumPy
- Criação de arrays
- Operações básicas
- Broadcasting
- Funções úteis

### 2. Vetores e Matrizes
- Representação em NumPy
- Operações vetoriais
- Operações matriciais
- Visualização com Matplotlib

### 3. Transformações Lineares
- Rotação
- Escala
- Reflexão
- Composição de transformações

### 4. Aplicações Práticas
- Análise de componentes principais (PCA)
- Regressão linear
- Classificação com SVM

## Como Usar:
1. Faça download dos notebooks
2. Abra no Jupyter Notebook ou Google Colab
3. Execute as células e experimente
4. Modifique o código e veja os resultados
      `
    },
    {
      id: "exercises",
      title: "Exercícios Interativos",
      description: "Exercícios para consolidar o aprendizado",
      icon: Lightbulb,
      content: `
# Exercícios Interativos

## Exercícios por Tópico:

### Vetores (Nível Iniciante)
1. Calcular a magnitude de um vetor
2. Normalizar um vetor
3. Calcular o produto escalar
4. Verificar ortogonalidade

### Matrizes (Nível Intermediário)
1. Multiplicação de matrizes
2. Calcular determinante
3. Encontrar a transposta
4. Verificar se é simétrica

### Transformações (Nível Avançado)
1. Implementar rotação
2. Implementar escala
3. Compor transformações
4. Encontrar transformação inversa

## Gabarito:
Todos os exercícios têm gabarito disponível com explicações.

## Dificuldade Progressiva:
- Iniciante: Conceitos básicos
- Intermediário: Aplicações práticas
- Avançado: Problemas complexos
      `
    },
    {
      id: "projects",
      title: "Projetos Práticos",
      description: "Projetos para aplicar os conhecimentos",
      icon: FileText,
      content: `
# Projetos Práticos

## Projeto 1: Análise de Imagem com Álgebra Linear
- Carregar uma imagem
- Representar como matriz
- Aplicar transformações
- Visualizar resultados

## Projeto 2: Recomendação de Filmes
- Usar fatorização de matrizes
- Calcular similaridade
- Fazer recomendações
- Avaliar resultados

## Projeto 3: Compressão de Imagem
- Usar SVD (Singular Value Decomposition)
- Reduzir dimensionalidade
- Reconstruir imagem
- Comparar qualidade vs tamanho

## Projeto 4: Análise de Componentes Principais (PCA)
- Implementar PCA do zero
- Reduzir dimensionalidade
- Visualizar dados
- Aplicar em dataset real

## Projeto 5: Rede Neural Simples
- Implementar forward pass
- Usar operações matriciais
- Calcular loss
- Visualizar aprendizado

Cada projeto inclui:
- Descrição detalhada
- Dados de exemplo
- Código inicial
- Solução completa
- Desafios extras
      `
    },
    {
      id: "references",
      title: "Referências e Leitura Adicional",
      description: "Livros, artigos e recursos para aprofundamento",
      icon: BookOpen,
      content: `
# Referências e Leitura Adicional

## Livros Recomendados:

### Introdutórios
1. **"Linear Algebra Done Right" - Sheldon Axler**
   - Abordagem moderna e intuitiva
   - Foco em conceitos, não em cálculos
   - Ideal para iniciantes

2. **"Introduction to Linear Algebra" - Gilbert Strang**
   - Clássico, muito prático
   - Muitos exemplos e aplicações
   - Excelente para engenheiros

### Intermediários
3. **"Matrix Computations" - Golub & Van Loan**
   - Métodos numéricos
   - Implementações eficientes
   - Para quem quer aprofundar

### Aplicados em IA
4. **"Deep Learning" - Goodfellow, Bengio, Courville**
   - Capítulos sobre álgebra linear
   - Aplicações em deep learning
   - Muito técnico

## Cursos Online:
- MIT OpenCourseWare: Linear Algebra
- 3Blue1Brown: Essence of Linear Algebra (YouTube)
- Coursera: Linear Algebra Specialization
- edX: Linear Algebra Fundamentals

## Artigos Importantes:
- Singular Value Decomposition (SVD)
- Principal Component Analysis (PCA)
- Eigenvalues and Eigenvectors
- Matrix Factorization

## Ferramentas Online:
- Desmos: Visualizador de transformações
- GeoGebra: Geometria interativa
- Wolfram Alpha: Cálculos de matrizes
      `
    }
  ];

  // Mock course data
  const courseData = {
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
  };

  const totalLessons = courseData.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const completedLessons = courseData.sections.reduce(
    (acc, s) => acc + s.lessons.filter((l) => l.completed).length,
    0
  );
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container">
          <button
            onClick={() => navigate("/learning-path")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Trilha
          </button>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                Fase {phase}
              </span>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                {courseData.difficulty}
              </span>
            </div>
            <h1 className="text-4xl font-bold">{courseData.title}</h1>
            <p className="text-lg text-muted-foreground">{courseData.description}</p>

            <div className="flex flex-wrap gap-6 pt-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>{courseData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
                <span>{courseData.lessons} aulas</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{courseData.rating} ({courseData.reviews} avaliações)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12">
        <div className="container grid lg:grid-cols-3 gap-8">
          {/* Left: Course Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress */}
            <div className="p-6 border border-border rounded-xl bg-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Seu Progresso</h3>
                <span className="text-sm font-bold text-primary">{progressPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                {completedLessons} de {totalLessons} aulas completas
              </p>
            </div>

            {/* Lesson Content */}
            {selectedLesson && lessonsContent[selectedLesson] ? (
              <div className="p-6 border border-border rounded-xl bg-card space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{lessonsContent[selectedLesson].title}</h2>
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="prose prose-invert max-w-none">
                  <div className="text-foreground space-y-4 whitespace-pre-wrap text-sm leading-relaxed">
                    {lessonsContent[selectedLesson].content}
                  </div>
                </div>

                {lessonsContent[selectedLesson]?.examples && lessonsContent[selectedLesson].examples!.length > 0 && (
                  <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold text-sm">Exemplos Práticos:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {lessonsContent[selectedLesson].examples!.map((example, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button className="flex-1" variant="default">
                    Marcar como Concluída
                  </Button>
                  <Button className="flex-1" variant="outline">
                    Próxima Aula
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Course Overview */}
                <div className="prose prose-invert max-w-none">
                  <div className="text-foreground space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Visão Geral do Curso</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Álgebra Linear é a matemática que sustenta a maioria dos algoritmos de Machine Learning. 
                        Neste módulo, você aprenderá os conceitos fundamentais que são essenciais para entender 
                        como os modelos de IA funcionam. Começaremos com conceitos básicos de vetores e matrizes, 
                        passando por operações importantes, e finalizando com aplicações práticas em transformações lineares.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">O que você aprenderá</h3>
                      <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                        <li>Vetores e operações vetoriais</li>
                        <li>Matrizes e suas operações</li>
                        <li>Determinantes e matrizes inversas</li>
                        <li>Espaços vetoriais e transformações lineares</li>
                        <li>Autovalores e autovetores</li>
                        <li>Decomposição de matrizes (PCA, SVD)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Por que é importante?</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        A Álgebra Linear é fundamental porque dados são representados como vetores e matrizes, 
                        modelos de IA aplicam transformações lineares aos dados, algoritmos de otimização usam 
                        conceitos de Álgebra Linear, e operações vetorizadas são muito mais rápidas que loops tradicionais.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Resources Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Recursos Adicionais</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {additionalResources.map((resource) => {
                      const IconComponent = resource.icon;
                      return (
                        <button
                          key={resource.id}
                          onClick={() => setSelectedLesson(resource.id as any)}
                          className="p-4 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors text-left group bg-transparent border-none cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <IconComponent className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <h3 className="font-semibold group-hover:text-primary transition-colors">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                              <div className="flex items-center gap-2 mt-3 text-primary text-sm">
                                Acessar <ExternalLink className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right: Lessons Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Lessons List */}
              <div className="border border-border rounded-xl bg-card overflow-hidden">
                <div className="p-4 border-b border-border bg-card/50">
                  <h3 className="font-semibold">Aulas</h3>
                </div>

                <div className="divide-y divide-border max-h-96 overflow-y-auto">
                  {courseData.sections.map((section) => (
                    <div key={section.title}>
                      <div className="p-4 bg-muted/30 font-semibold text-sm sticky top-0">
                        {section.title}
                      </div>
                      {section.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson.id)}
                          className={`w-full text-left p-4 hover:bg-muted/50 transition-colors flex items-start gap-3 border-b border-border last:border-b-0 bg-transparent border-none cursor-pointer ${
                            selectedLesson === lesson.id ? "bg-muted/50 border-l-2 border-l-primary" : ""
                          }`}
                        >
                          <div className="pt-1">
                            {lesson.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-muted flex-shrink-0"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm leading-tight">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{lesson.duration}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type ProjectStep = {
  number: number;
  title: string;
  description: string;
  code: string;
};

export type ProjectResource = {
  title: string;
  url: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  technologies: readonly string[];
  difficulty: string;
  duration: string;
  icon: string;
  color: string;
  skills: readonly string[];
  overview: string;
  objectives: readonly string[];
  requirements: readonly string[];
  steps: readonly ProjectStep[];
  improvements: readonly string[];
  resources: readonly ProjectResource[];
};

const baseRequirements = [
  "Python 3.10+",
  "Ambiente virtual ou Google Colab",
  "Git para versionar as entregas",
  "README com decisões, resultados e próximos passos",
];

const projectObjectives: Record<number, readonly string[]> = {
  1: ["Consolidar vendas por mês sem vazamento temporal", "Criar variáveis de calendário e defasagem", "Treinar uma regressão regularizada", "Medir MAE no horizonte futuro", "Documentar previsões e limitações"],
  2: ["Definir churn como evento observável", "Investigar sinais de risco por segmento", "Treinar um classificador interpretável", "Escolher limiar conforme o custo de contato", "Gerar fila de retenção priorizada"],
  3: ["Construir matriz usuário-item", "Calcular similaridade entre itens", "Gerar recomendações não vistas", "Avaliar ranking com holdout temporal", "Equilibrar relevância e diversidade"],
  4: ["Organizar imagens por classe sem vazamento", "Criar carregadores de treino e validação", "Aplicar transfer learning com MobileNetV2", "Investigar confusões entre classes", "Exportar modelo e mapa de classes"],
  5: ["Dividir documentos preservando metadados", "Indexar trechos com embeddings", "Recuperar contexto relevante", "Responder com grounding e citações", "Testar perguntas respondíveis e ausentes"],
  6: ["Definir contrato de entrada e saída", "Carregar pipeline treinado no startup", "Expor endpoint tipado de previsão", "Testar entradas válidas e inválidas", "Empacotar serviço com health check"],
  7: ["Limitar ferramentas a operações permitidas", "Modelar estado e fontes da conversa", "Orquestrar chamadas de forma observável", "Exigir aprovação para ações sensíveis", "Registrar rastros para auditoria"],
  8: ["Separar ingestão, validação, treino e serving", "Bloquear dados fora do contrato", "Registrar modelo, dados e métricas", "Publicar health check do serviço", "Monitorar qualidade e definir rollback"],
};

const projectSteps: Record<number, ProjectStep[]> = {
  1: [
    { number: 1, title: "Inspecionar vendas históricas", description: "Carregue as vendas mensais e confira datas, valores ausentes e sazonalidade.", code: "import pandas as pd\n\ndf = pd.read_csv(\"data/sales_data.csv\", parse_dates=[\"date\"])\ndf = df.sort_values(\"date\").set_index(\"date\")\nmonthly = df[\"sales\"].resample(\"MS\").sum().rename(\"sales\")\nprint(monthly.describe())" },
    { number: 2, title: "Criar variáveis de calendário", description: "Separe treino e teste no tempo e crie variáveis que não vazem informações futuras.", code: "data = monthly.to_frame()\ndata[\"month\"] = data.index.month\ndata[\"lag_1\"] = data[\"sales\"].shift(1)\ndata[\"rolling_3\"] = data[\"sales\"].shift(1).rolling(3).mean()\ndata = data.dropna()\ntrain = data.iloc[:-6]\ntest = data.iloc[-6:]" },
    { number: 3, title: "Treinar a baseline", description: "Compare a regressão com uma previsão ingênua baseada no último valor observado.", code: "from sklearn.linear_model import Ridge\nfrom sklearn.metrics import mean_absolute_error\n\nfeatures = [\"month\", \"lag_1\", \"rolling_3\"]\nmodel = Ridge(alpha=1.0).fit(train[features], train[\"sales\"])\npred = model.predict(test[features])\nprint({\"mae\": mean_absolute_error(test[\"sales\"], pred)})" },
    { number: 4, title: "Avaliar no horizonte futuro", description: "Analise o erro mês a mês e verifique se a previsão acompanha picos de demanda.", code: "evaluation = test[[\"sales\"]].copy()\nevaluation[\"prediction\"] = pred\nevaluation[\"absolute_error\"] = (evaluation[\"sales\"] - evaluation[\"prediction\"]).abs()\nprint(evaluation.sort_values(\"absolute_error\", ascending=False).head())" },
    { number: 5, title: "Documentar a decisão", description: "Registre a métrica, as limitações da janela temporal e como atualizar a previsão.", code: "report = {\"metric\": \"MAE\", \"test_periods\": len(test), \"features\": features}\nprint(report)" },
  ],
  2: [
    { number: 1, title: "Definir o evento de churn", description: "Transforme o cancelamento em um alvo binário e valide o período de observação.", code: "import pandas as pd\n\ncustomers = pd.read_csv(\"data/customers.csv\")\ncustomers[\"churn\"] = customers[\"status\"].eq(\"cancelled\").astype(int)\nprint(customers[\"churn\"].value_counts(normalize=True))" },
    { number: 2, title: "Explorar sinais de risco", description: "Compare uso, tempo de contrato e chamados entre clientes que ficaram e saíram.", code: "summary = customers.groupby(\"churn\")[[\"monthly_usage\", \"tenure_months\", \"support_tickets\"]].median()\nprint(summary)" },
    { number: 3, title: "Treinar um classificador", description: "Use pipeline com imputação e regressão logística para obter uma baseline interpretável.", code: "from sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\n\nfeatures = [\"monthly_usage\", \"tenure_months\", \"support_tickets\"]\nmodel = Pipeline([(\"impute\", SimpleImputer(strategy=\"median\")), (\"classifier\", LogisticRegression(max_iter=1000))])\nmodel.fit(customers[features], customers[\"churn\"])" },
    { number: 4, title: "Ajustar o limiar de contato", description: "Escolha o limiar com base no custo de perder um cliente e no orçamento da campanha.", code: "from sklearn.metrics import precision_recall_curve\n\nprobabilities = model.predict_proba(customers[features])[:, 1]\nprecision, recall, thresholds = precision_recall_curve(customers[\"churn\"], probabilities)\nprint(\"maior recall disponível:\", recall.max())" },
    { number: 5, title: "Gerar uma lista de retenção", description: "Entregue clientes prioritários com motivo de risco e uma ação sugerida.", code: "customers[\"risk_score\"] = probabilities\npriority = customers.sort_values(\"risk_score\", ascending=False).head(100)\npriority[[\"customer_id\", \"risk_score\"]].to_csv(\"outputs/retention_queue.csv\", index=False)" },
  ],
  3: [
    { number: 1, title: "Montar a matriz de interações", description: "Converta avaliações em uma tabela usuário-item e meça a esparsidade.", code: "import pandas as pd\n\nratings = pd.read_csv(\"data/ratings.csv\")\nmatrix = ratings.pivot_table(index=\"user_id\", columns=\"item_id\", values=\"rating\")\nprint(\"esparsidade:\", 1 - matrix.notna().mean().mean())" },
    { number: 2, title: "Calcular similaridade", description: "Compare itens que receberam avaliações parecidas e trate valores ausentes.", code: "from sklearn.metrics.pairwise import cosine_similarity\n\nfilled = matrix.fillna(0)\nsimilarity = cosine_similarity(filled.T)\nsimilarity = pd.DataFrame(similarity, index=matrix.columns, columns=matrix.columns)" },
    { number: 3, title: "Gerar recomendações", description: "Use os itens avaliados pelo usuário para ponderar vizinhos semelhantes.", code: "def recommend(user_id, n=5):\n    history = matrix.loc[user_id].dropna()\n    scores = similarity[history.index].mul(history.values, axis=1).sum(axis=1)\n    scores = scores.drop(index=history.index, errors=\"ignore\")\n    return scores.sort_values(ascending=False).head(n)\n\nprint(recommend(42))" },
    { number: 4, title: "Avaliar com holdout", description: "Separe a última interação conhecida de cada usuário para medir recall no ranking.", code: "test = ratings.sort_values(\"timestamp\").groupby(\"user_id\").tail(1)\ncoverage = test[\"item_id\"].isin(matrix.columns).mean()\nprint({\"test_users\": len(test), \"catalog_coverage\": coverage})" },
    { number: 5, title: "Adicionar uma regra de negócio", description: "Combine relevância com diversidade para evitar recomendações repetitivas.", code: "recommendations = recommend(42, n=20)\nselected = recommendations.reset_index(name=\"score\").head(5)\nselected.to_csv(\"outputs/recommendations.csv\", index=False)" },
  ],
  4: [
    { number: 1, title: "Organizar o dataset visual", description: "Separe classes em pastas de treino, validação e teste sem misturar imagens.", code: "from pathlib import Path\n\nroot = Path(\"data/images\")\nclasses = sorted(path.name for path in root.iterdir() if path.is_dir())\nprint({\"classes\": classes, \"count\": len(classes)})" },
    { number: 2, title: "Criar carregadores com aumento", description: "Aplique aumentos somente no treino e mantenha validação determinística.", code: "import tensorflow as tf\n\ntrain = tf.keras.utils.image_dataset_from_directory(\"data/train\", image_size=(224, 224), batch_size=32)\nvalid = tf.keras.utils.image_dataset_from_directory(\"data/valid\", image_size=(224, 224), batch_size=32, shuffle=False)" },
    { number: 3, title: "Usar transfer learning", description: "Congele a base convolucional e treine uma cabeça compatível com suas classes.", code: "base = tf.keras.applications.MobileNetV2(include_top=False, weights=\"imagenet\", input_shape=(224, 224, 3))\nbase.trainable = False\nmodel = tf.keras.Sequential([base, tf.keras.layers.GlobalAveragePooling2D(), tf.keras.layers.Dense(len(classes), activation=\"softmax\")])\nmodel.compile(optimizer=\"adam\", loss=\"sparse_categorical_crossentropy\", metrics=[\"accuracy\"])" },
    { number: 4, title: "Avaliar os erros", description: "Use a matriz de confusão para descobrir quais classes são confundidas.", code: "import numpy as np\nfrom sklearn.metrics import confusion_matrix\n\nlabels = np.concatenate([y.numpy() for _, y in valid])\npredictions = model.predict(valid, verbose=0).argmax(axis=1)\nprint(confusion_matrix(labels, predictions))" },
    { number: 5, title: "Exportar o modelo", description: "Salve o modelo e documente tamanho, classes e exemplos de erro.", code: "model.save(\"outputs/image_classifier.keras\")\nPath(\"outputs/classes.txt\").write_text(\"\\n\".join(classes))" },
  ],
  5: [
    { number: 1, title: "Carregar e dividir documentos", description: "Leia os documentos, preserve metadados e crie trechos com sobreposição.", code: "from langchain_text_splitters import RecursiveCharacterTextSplitter\n\ntext = open(\"data/handbook.md\", encoding=\"utf-8\").read()\nsplitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=120)\nchunks = splitter.create_documents([text], metadatas=[{\"source\": \"handbook.md\"}])\nprint(len(chunks))" },
    { number: 2, title: "Indexar embeddings", description: "Transforme os trechos em vetores e mantenha a origem de cada documento.", code: "from langchain_community.vectorstores import FAISS\nfrom langchain_openai import OpenAIEmbeddings\n\nembeddings = OpenAIEmbeddings(model=\"text-embedding-3-small\")\nstore = FAISS.from_documents(chunks, embeddings)\nstore.save_local(\"outputs/handbook_index\")" },
    { number: 3, title: "Construir o retriever", description: "Recupere os trechos mais relevantes antes de pedir uma resposta ao modelo.", code: "retriever = store.as_retriever(search_kwargs={\"k\": 4})\nquestion = \"Qual é o prazo para solicitar férias?\"\ncontext = retriever.invoke(question)\nprint([doc.metadata[\"source\"] for doc in context])" },
    { number: 4, title: "Responder com citações", description: "Instrua o modelo a não inventar informações e a citar as fontes recuperadas.", code: "prompt = \"Responda apenas com base no contexto. Se não houver evidência, diga que não sabe. Cite o arquivo usado.\\n\\nContexto:\\n\" + \"\\n\".join(doc.page_content for doc in context)\nprint(prompt)" },
    { number: 5, title: "Testar perguntas sem resposta", description: "Meça recuperação, fidelidade e comportamento quando o documento não contém a resposta.", code: "test_questions = [\"Qual é o prazo para férias?\", \"Qual é a política sobre um tema ausente?\"]\nfor item in test_questions:\n    print({\"question\": item, \"requires_grounding\": True})" },
  ],
  6: [
    { number: 1, title: "Definir o contrato da API", description: "Modele entrada, saída, erros e versão do endpoint antes de publicar o modelo.", code: "from pydantic import BaseModel\n\nclass PredictionRequest(BaseModel):\n    age: float\n    monthly_usage: float\n\nclass PredictionResponse(BaseModel):\n    score: float" },
    { number: 2, title: "Carregar o artefato", description: "Carregue o pipeline treinado uma vez durante o startup do serviço.", code: "import joblib\nfrom fastapi import FastAPI\n\napp = FastAPI(title=\"ML Prediction API\")\nmodel = joblib.load(\"artifacts/model.joblib\")" },
    { number: 3, title: "Criar o endpoint", description: "Valide a entrada e retorne uma resposta tipada para cada previsão.", code: "@app.post(\"/predict\", response_model=PredictionResponse)\ndef predict(payload: PredictionRequest):\n    features = [[payload.age, payload.monthly_usage]]\n    score = float(model.predict_proba(features)[0, 1])\n    return PredictionResponse(score=score)" },
    { number: 4, title: "Testar o contrato", description: "Cubra entrada válida, valores inválidos e o formato da resposta.", code: "from fastapi.testclient import TestClient\n\nclient = TestClient(app)\nresponse = client.post(\"/predict\", json={\"age\": 32, \"monthly_usage\": 18})\nassert response.status_code == 200\nassert 0 <= response.json()[\"score\"] <= 1" },
    { number: 5, title: "Empacotar e observar", description: "Crie uma imagem reproduzível e registre latência e quantidade de previsões.", code: "# Dockerfile\n# FROM python:3.11-slim\n# COPY requirements.txt .\n# RUN pip install -r requirements.txt\n# COPY app ./app\n# CMD [\"uvicorn\", \"app.main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]" },
  ],
  7: [
    { number: 1, title: "Definir ferramentas seguras", description: "Liste as ferramentas permitidas, entradas esperadas e limites de cada operação.", code: "TOOLS = {\n    \"search_policy\": {\"description\": \"Consulta somente documentos internos\", \"requires_confirmation\": False},\n    \"create_ticket\": {\"description\": \"Abre chamado sem enviar dados sensíveis\", \"requires_confirmation\": True},\n}" },
    { number: 2, title: "Criar o estado da conversa", description: "Modele mensagens, fontes consultadas e ações pendentes como estado observável.", code: "from dataclasses import dataclass, field\n\n@dataclass\nclass AgentState:\n    messages: list[str] = field(default_factory=list)\n    sources: list[str] = field(default_factory=list)\n    pending_action: str | None = None" },
    { number: 3, title: "Orquestrar uma tarefa", description: "Execute uma ferramenta por vez e valide o retorno antes de continuar.", code: "def run_tool(name, payload, state):\n    if name not in TOOLS:\n        raise ValueError(\"ferramenta não permitida\")\n    state.messages.append(f\"tool:{name}\")\n    return {\"name\": name, \"payload\": payload}" },
    { number: 4, title: "Adicionar aprovação humana", description: "Pause ações sensíveis e mostre ao usuário o que será executado.", code: "def request_approval(state, action):\n    state.pending_action = action\n    return {\"status\": \"awaiting_approval\", \"action\": action}\n\nprint(request_approval(AgentState(), \"create_ticket\"))" },
    { number: 5, title: "Avaliar rastreabilidade", description: "Registre entradas, ferramentas, fontes e saída para depurar o assistente.", code: "trace = {\"request_id\": \"demo-001\", \"tools\": [], \"sources\": [], \"final_answer\": \"\"}\ntrace[\"tools\"].append(\"search_policy\")\nprint(trace)" },
  ],
  8: [
    { number: 1, title: "Definir o pipeline", description: "Separe ingestão, validação, treino, registro do modelo e serving.", code: "stages = [\"ingest\", \"validate\", \"train\", \"evaluate\", \"serve\"]\nfor stage in stages:\n    print(f\"running stage: {stage}\")" },
    { number: 2, title: "Validar dados", description: "Interrompa o pipeline quando o esquema ou a distribuição estiverem fora do contrato.", code: "import pandas as pd\n\ndf = pd.read_parquet(\"data/input.parquet\")\nrequired = {\"feature_a\", \"feature_b\", \"target\"}\nmissing = required - set(df.columns)\nif missing:\n    raise ValueError(f\"colunas ausentes: {missing}\")" },
    { number: 3, title: "Treinar e registrar", description: "Guarde métricas, versão dos dados e o artefato gerado em cada execução.", code: "run = {\"data_version\": \"2026-08-13\", \"model_version\": \"v1\", \"metrics\": {\"f1\": 0.84}}\nprint(run)" },
    { number: 4, title: "Publicar com saúde", description: "Exponha health checks e uma métrica de latência para o serviço.", code: "from fastapi import FastAPI\n\napp = FastAPI()\n@app.get(\"/health\")\ndef health():\n    return {\"status\": \"ok\", \"model_version\": \"v1\"}" },
    { number: 5, title: "Monitorar e reverter", description: "Defina alertas para qualidade e um procedimento de rollback documentado.", code: "alerts = {\"latency_ms\": 500, \"missing_rate\": 0.05, \"quality_drop\": 0.10}\nprint(\"alert thresholds\", alerts)" },
  ],
};

const projectSeeds = [
  {
    id: 1,
    title: "Previsão de Vendas",
    description: "Crie um modelo de regressão para prever vendas futuras usando dados históricos.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
    difficulty: "Intermediário",
    duration: "2 semanas",
    icon: "📈",
    color: "from-blue-500 to-cyan-500",
    skills: ["Regressão Linear", "Feature Engineering", "Validação Cruzada"],
    objective: "prever a demanda de um produto e comunicar a incerteza das previsões",
    resources: [
      { title: "Documentação do Pandas", url: "https://pandas.pydata.org/docs/" },
      { title: "Guia de regressão do scikit-learn", url: "https://scikit-learn.org/stable/supervised_learning.html" },
    ],
  },
  {
    id: 2,
    title: "Análise de Churn",
    description: "Identifique clientes em risco de sair usando classificação e análise exploratória.",
    technologies: ["Python", "Pandas", "XGBoost", "Plotly"],
    difficulty: "Intermediário",
    duration: "2 semanas",
    icon: "👥",
    color: "from-green-500 to-emerald-500",
    skills: ["Classificação", "Desbalanceamento de Classes", "Business Analytics"],
    objective: "priorizar clientes em risco e transformar métricas do modelo em uma ação de retenção",
    resources: [
      { title: "Métricas de classificação", url: "https://scikit-learn.org/stable/modules/model_evaluation.html" },
      { title: "Documentação do Plotly", url: "https://plotly.com/python/" },
    ],
  },
  {
    id: 3,
    title: "Sistema de Recomendação",
    description: "Construa um sistema que recomenda produtos baseado em preferências do usuário.",
    technologies: ["Python", "NumPy", "Scikit-learn", "Pandas"],
    difficulty: "Avançado",
    duration: "3 semanas",
    icon: "⭐",
    color: "from-purple-500 to-pink-500",
    skills: ["Filtragem Colaborativa", "Similaridade", "Otimização"],
    objective: "gerar recomendações explicáveis a partir do histórico de interações entre usuários e itens",
    resources: [
      { title: "Nearest Neighbors no scikit-learn", url: "https://scikit-learn.org/stable/modules/neighbors.html" },
      { title: "Guia de avaliação de modelos", url: "https://scikit-learn.org/stable/modules/model_evaluation.html" },
    ],
  },
  {
    id: 4,
    title: "Classificador de Imagens",
    description: "Treine uma CNN para classificar imagens usando Transfer Learning.",
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV"],
    difficulty: "Avançado",
    duration: "3 semanas",
    icon: "🖼️",
    color: "from-orange-500 to-red-500",
    skills: ["Deep Learning", "Transfer Learning", "Visão Computacional"],
    objective: "treinar um classificador visual com dados separados corretamente e análise de erros",
    resources: [
      { title: "Tutorial de visão computacional do Keras", url: "https://keras.io/examples/vision/" },
      { title: "Documentação do OpenCV", url: "https://docs.opencv.org/" },
    ],
  },
  {
    id: 5,
    title: "Chatbot com RAG",
    description: "Crie um chatbot inteligente que responde perguntas usando Retrieval Augmented Generation.",
    technologies: ["Python", "LangChain", "Modelos de linguagem", "Banco vetorial"],
    difficulty: "Avançado",
    duration: "3 semanas",
    icon: "💬",
    color: "from-indigo-500 to-purple-500",
    skills: ["LLMs", "Embeddings", "RAG", "NLP"],
    objective: "responder perguntas fundamentadas em documentos próprios e mostrar as fontes recuperadas",
    resources: [
      { title: "Guia de recuperação aumentada", url: "https://python.langchain.com/docs/concepts/rag/" },
      { title: "Documentação de embeddings", url: "https://python.langchain.com/docs/concepts/embedding_models/" },
    ],
  },
  {
    id: 6,
    title: "API de Machine Learning",
    description: "Desenvolva uma API REST que expõe seu modelo de ML para produção.",
    technologies: ["Python", "FastAPI", "Docker", "PostgreSQL"],
    difficulty: "Avançado",
    duration: "2 semanas",
    icon: "🔌",
    color: "from-red-500 to-pink-500",
    skills: ["APIs", "Docker", "Deploy", "DevOps"],
    objective: "servir previsões por uma API documentada com validação de entrada e observabilidade básica",
    resources: [
      { title: "Tutorial oficial do FastAPI", url: "https://fastapi.tiangolo.com/tutorial/" },
      { title: "Documentação do Docker", url: "https://docs.docker.com/get-started/" },
    ],
  },
  {
    id: 7,
    title: "Assistente de IA Corporativo",
    description: "Construa um assistente de IA que integra múltiplos serviços e APIs.",
    technologies: ["Python", "LangChain", "FastAPI", "Redis"],
    difficulty: "Avançado",
    duration: "4 semanas",
    icon: "🤖",
    color: "from-yellow-500 to-orange-500",
    skills: ["Agentes de IA", "Integração de APIs", "Orquestração"],
    objective: "orquestrar ferramentas com limites claros, logs e respostas que possam ser auditadas",
    resources: [
      { title: "Conceitos de ferramentas no LangChain", url: "https://python.langchain.com/docs/concepts/tools/" },
      { title: "Documentação do Redis", url: "https://redis.io/docs/latest/" },
    ],
  },
  {
    id: 8,
    title: "Sistema Completo de IA em Produção",
    description: "Implemente um sistema end-to-end com pipeline de dados, modelo e monitoramento.",
    technologies: ["Python", "Airflow", "Docker", "Kubernetes", "Prometheus"],
    difficulty: "Expert",
    duration: "4 semanas",
    icon: "🚀",
    color: "from-teal-500 to-cyan-500",
    skills: ["MLOps", "CI/CD", "Monitoramento", "Escalabilidade"],
    objective: "entregar um pipeline reprodutível que treina, publica e monitora um modelo",
    resources: [
      { title: "Documentação do Apache Airflow", url: "https://airflow.apache.org/docs/" },
      { title: "Documentação do Prometheus", url: "https://prometheus.io/docs/introduction/overview/" },
    ],
  },
] as const;

export const projects: Project[] = projectSeeds.map((seed) => ({
  ...seed,
  overview: `Neste projeto, você vai ${seed.objective}. O foco é criar uma entrega pequena, reproduzível e documentada, com decisões técnicas justificadas e uma análise honesta das limitações.`,
  objectives: projectObjectives[seed.id],
  requirements: baseRequirements,
  steps: projectSteps[seed.id],
  improvements: [
    "Adicionar validação automatizada e testes para casos-limite",
    "Comparar uma segunda abordagem com uma hipótese explícita",
    "Criar monitoramento para detectar degradação após a entrega",
    "Documentar limitações, riscos e próximos experimentos",
  ],
  resources: seed.resources,
}));

export const projectsById = Object.fromEntries(projects.map((project) => [project.id, project])) as Record<number, Project>;

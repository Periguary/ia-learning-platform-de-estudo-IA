export type CuriosityCategory = "História" | "Algoritmos" | "Ética e Sociedade" | "Fronteira Tecnológica";

export type CuriosityItem = {
  id: string;
  title: string;
  category: CuriosityCategory;
  teaser: string;
  content: string;
  funFact: string;
  readTime: string;
};

export const curiositiesCatalog: CuriosityItem[] = [
  {
    id: "turing-test-history",
    title: "A Origem do Teste de Turing e o Jogo da Imitação",
    category: "História",
    teaser: "Como um teste proposto em 1950 por Alan Turing moldou décadas de debates sobre máquinas pensantes.",
    content: "Em 1950, o matemático britânico Alan Turing publicou o artigo 'Computing Machinery and Intelligence', introduzindo o Jogo da Imitação. A premissa era simples: se um avaliador humano interagisse com um computador e um ser humano por texto sem saber quem é quem, e não conseguisse distingui-los consistentemente, a máquina poderia ser considerada inteligente. Embora hoje o teste seja debatido por focar em enganar em vez de raciocinar, ele deu o pontapé inicial na filosofia da inteligência artificial.",
    funFact: "Alan Turing também ajudou a decifrar a máquina Enigma na Segunda Guerra Mundial, salvando milhões de vidas.",
    readTime: "4 min de leitura",
  },
  {
    id: "attention-is-all-you-need",
    title: "O Momento em que a Atenção Mudou a Computação",
    category: "Algoritmos",
    teaser: "Por que o artigo 'Attention Is All You Need' (2017) substituiu as redes recorrentes e criou a era dos Transformers.",
    content: "Antes de 2017, modelos de linguagem dependiam de redes neurais recorrentes (RNNs e LSTMs) que processavam textos palavra por palavra, sofrendo com o esquecimento de contextos longos. A introdução da arquitetura Transformer com o mecanismo de auto-atenção (Self-Attention) permitiu que modelos processassem frases inteiras em paralelo, compreendendo relações complexas entre palavras distantes. Esse marco fundamentou o GPT, o Gemini e praticamente todos os grandes modelos atuais.",
    funFact: "O artigo original foi escrito por oito pesquisadores do Google e da Universidade de Toronto.",
    readTime: "5 min de leitura",
  },
  {
    id: "ai-hallucinations-mechanism",
    title: "Por que as IAs 'Alucinam' com tanta Convicção?",
    category: "Fronteira Tecnológica",
    teaser: "Entenda o funcionamento probabilístico dos modelos de linguagem e por que eles geram fatos falsos convincentes.",
    content: "Modelos de linguagem não 'pensam' no sentido humano; eles calculam estatisticamente qual token (pedaço de palavra) deve vir em seguida com base em bilhões de exemplos de treinamento. Quando a pergunta exige um raciocínio lógico profundo ou carece de dados suficientes no contexto, o modelo prioriza a fluência gramatical e a coerência de tom em vez da verdade factual. Isso gera a chamada 'alucinação', onde uma resposta incorreta é redigida com extrema segurança.",
    funFact: "Técnicas modernas como RAG (Retrieval-Augmented Generation) injetam documentos reais no prompt para mitigar alucinações.",
    readTime: "6 min de leitura",
  },
  {
    id: "bias-and-fairness",
    title: "Viés Algorítmico: Quando o Espelho reflete a Sociedade",
    category: "Ética e Sociedade",
    teaser: "Como os dados históricos de treinamento transferem preconceitos humanos para os algoritmos automatizados.",
    content: "Como a IA aprende com dados produzidos por humanos, ela absorve preconceitos, vieses históricos e desigualdades presentes na sociedade. Se um sistema de recrutamento é treinado com currículos aprovados nas últimas décadas em um setor dominado por um grupo demográfico, a IA pode penalizar injustamente perfis qualificados fora desse padrão. O campo da Ética em IA estuda métodos de auditoria, curadoria rigorosa de dados e justiça algorítmica (Fairness).",
    funFact: "Auditorias de modelos exigem métricas específicas de paridade demográfica e igualdade de oportunidades.",
    readTime: "5 min de leitura",
  },
  {
    id: "autonomous-ai-agents",
    title: "A Era dos Agentes Autônomos: De Chatbots a Executores de Tarefas",
    category: "Fronteira Tecnológica",
    teaser: "Como os LLMs deixaram de ser apenas assistentes de texto e evoluíram para agentes capazes de planejar e executar fluxos complexos.",
    content: "A evolução da inteligência artificial generativa passou dos chatbots estáticos para os agentes autônomos. Equipados com loops de raciocínio (ReAct), acesso a ferramentas externas, memória de longo prazo e capacidade de auto-correção, esses agentes conseguem decompor objetivos complexos em subtarefas, navegar na web, escrever e testar código, e interagir com APIs de forma independente. Esse paradigma redefine a produtividade em engenharia de software e ciência de dados.",
    funFact: "Agentes modernos utilizam arquiteturas de múltiplos agentes (Multi-Agent Systems) para debater e resolver problemas colaborativamente.",
    readTime: "6 min de leitura",
  },
];

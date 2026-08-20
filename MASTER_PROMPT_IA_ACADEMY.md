# Prompt Mestre e Arquitetura Completa: IA Academy

Este documento consolida a arquitetura, o modelo de dados relacional, as regras de negócio, o guia de execução com IA local (Ollama) e as instruções completas para recriar do zero a **IA Academy**, uma plataforma educacional de ponta em Inteligência Artificial, Machine Learning, Deep Learning, IA Generativa e Engenharia de Software.

---

## 1. Visão Geral e Identidade Visual (Neon High Contrast)

A **IA Academy** é projetada sob uma estética futurista "Elevify-inspired" com modo de alto contraste neon opcional.

### Especificações Visuais
- **Paleta de Cores**: Fundo escuro profundo com superfícies translúcidas em vidro fosco (`bg-card/40`), bordas com brilho ciano (`#00f0ff`), acentos em violeta e verde lima (`#39ff14`).
- **Tipografia**: Sans-serif limpa com fortes contrastes, hierarquia tipográfica expressiva (`text-3xl font-black`) e títulos estilizados com marcadores HUD (`// live`).
- **Interatividade**: Micro-interações com escalas suaves ao clique (`scale(0.97)`), efeitos de foco com anéis de luz e suporte a `prefers-reduced-motion`.

---

## 2. Arquitetura Técnica e Pilha Tecnológica

- **Frontend**: React 19, Tailwind CSS 4, Wouter (roteamento), Framer Motion (animações), Lucide React (ícones), Streamdown / KaTeX (renderização Markdown e matemática).
- **Backend**: Node.js, Express 4, tRPC 11 (tipagem ponta a ponta), Drizzle ORM.
- **Banco de Dados**: MySQL / TiDB relacional.
- **Testes**: Vitest (testes unitários e de regressão 100% cobrindo tRPC, rotas, páginas e utilitários).

---

## 3. Arquitetura de Banco de Dados Relacional (Schema Drizzle / MySQL)

O banco de dados relacional gerencia o ciclo de vida do aluno, preferências, histórico de chat, memórias de longo prazo, planos de estudo e certificações.

### 3.1. Tabela `users` (Usuários e Papéis)
Gerencia a autenticação e permissões da plataforma.
- `id`: `int`, PK, Auto-increment
- `openId`: `varchar(191)`, Unique, Not Null
- `name`: `varchar(160)`, Not Null
- `email`: `varchar(191)`, Not Null
- `role`: `enum('admin', 'user')`, Default `'user'`, Not Null
- `createdAt`: `timestamp`, Default Now

### 3.2. Tabela `saved_explanations` (Explicações Salvas do Professor Virtual)
Armazena as respostas explicativas do tutor marcadas pelo aluno.
- `id`: `int`, PK, Auto-increment
- `userId`: `int`, Foreign Key (`users.id`), Not Null
- `title`: `varchar(300)`, Not Null
- `content`: `text`, Not Null
- `moduleId`: `varchar(120)`, Not Null
- `category`: `varchar(80)`, Default `"Geral"`, Not Null (Ex: Conceitos, Matemática, Código & Python, Machine Learning, Arquitetura de IA)
- `createdAt`: `timestamp`, Default Now

### 3.3. Tabela `student_memories` (Memória de Longo Prazo do Aluno)
Registra o perfil de aprendizado, dúvidas recorrentes e tópicos dominados.
- `id`: `int`, PK, Auto-increment
- `userId`: `int`, Foreign Key (`users.id`), Not Null
- `topic`: `varchar(255)`, Not Null
- `summary`: `text`, Not Null
- `category`: `varchar(80)`, Default `"Geral"`, Not Null
- `updatedAt`: `timestamp`, Default Now

### 3.4. Tabela `study_plans` (Planos de Estudo Semanais Personalizados)
Mantém os roteiros gerados pela IA e o progresso das tarefas.
- `id`: `int`, PK, Auto-increment
- `userId`: `int`, Foreign Key (`users.id`), Not Null
- `title`: `varchar(255)`, Not Null
- `content`: `text`, Not Null
- `focusArea`: `varchar(120)`, Not Null
- `isCompleted`: `int`, Default `0`, Not Null (0 = Em andamento, 1 = Concluído 100%)
- `progressPercent`: `int`, Default `0`, Not Null (0 a 100%)
- `createdAt`: `timestamp`, Default Now

### 3.5. Tabelas de Suporte e Estado (`ai_conversations`, `user_library_favorites`, `library_reviews`, `video_notes`)
- `ai_conversations`: Histórico de perguntas e respostas do chat por módulo e usuário.
- `user_library_favorites`: Favoritos da biblioteca técnica e whitepapers.
- `library_reviews`: Avaliações e comentários dos alunos nos artigos.
- `video_notes`: Anotações sincronizadas com timestamps em vídeo-aulas.

---

## 4. Guia de Adaptação para Execução Local com Ollama

Para rodar o sistema utilizando uma API de IA local via **Ollama** (substituindo o provedor remoto de LLM), siga as orientações abaixo:

### 4.1. Configuração do Ollama
1. Instale o Ollama em sua máquina (`ollama run llama3` ou `ollama run mistral`).
2. Certifique-se de que o servidor local está rodando em `http://localhost:11434`.

### 4.2. Adaptação do Helper LLM no Backend (`server/_core/llm.ts`)
Substitua ou adicione um adaptador HTTP no arquivo de chamada de IA para redirecionar as requisições para a API REST do Ollama:

```ts
import fetch from "node-fetch";

export async function invokeLocalLLM({ model = "llama3", messages, temperature = 0.7 }) {
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: messages.map(m => ({ role: m.role, content: typeof m.content === "string" ? m.content : JSON.stringify(m.content) })),
      stream: false,
      options: { temperature }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    choices: [
      {
        message: {
          role: "assistant",
          content: data.message?.content || ""
        }
      }
    ]
  };
}
```

---

## 5. Módulos Principais e Regras de Negócio

### 5.1. Professor Virtual de IA (Tutor Especializado)
- **Personalidades Pedagógicas**: O aluno pode alternar entre quatro estilos docentes ao iniciar uma dúvida:
  1. *Padrão Didático*: Exemplo equilibrado, claro e profissional.
  2. *Socrático*: O professor não entrega a resposta pronta, fazendo perguntas guiadas para instigar o raciocínio.
  3. *Bem-Humorado*: Uso de analogias divertidas e linguagem leve do mundo real.
  4. *Rigoroso / Acadêmico*: Foco estrito em formalismos matemáticos, teoremas e notações técnicas.
- **Modo Aula Completa & Analogias**: Gera introdução intuitiva, mecânica passo a passo, analogias reais, gabarito de erros comuns e checagem de compreensão.
- **Quizzes Interativos Sob Demanda**: Botão dedicado no assistente que invoca a IA para gerar 3 a 5 perguntas de múltipla escolha com correção imediata e pontuação.
- **Leitura em Voz Alta (TTS)**: Integração nativa com `window.speechSynthesis` com seletor de velocidade de áudio (`1.0x`, `1.25x`, `1.5x`).
- **Exportação e Salvamento**: Permite salvar explicações diretamente na Lista de Leitura (com escolha de categoria) e exportar o histórico completo da conversa para PDF formatado para impressão.

### 5.2. Planos de Estudo Semanais e Progresso
- Geração automática via IA considerando a área de foco, objetivo do aluno e o histórico recuperado das **memórias de longo prazo**.
- **Barra de Progresso Interativa**: Cada tarefa semanal possui marcação de conclusão com atualização instantânea no banco de dados e cálculo automático de porcentagem.
- **Conquistas Automáticas**: Ao atingir 100% de progresso em um plano de estudo, a plataforma desbloqueia automaticamente uma medalha temática no perfil do aluno.
- **Compartilhamento Público**: Geração de link público seguro via token para que colegas e recrutadores possam visualizar o plano de estudos concluído.

### 5.3. Radar de Competências e Perfil
- Seção de estatísticas no Perfil (`/profile`) exibindo tempo total de estudo, dias consecutivos (streak), gráfico de atividade semanal e um **Gráfico de Radar de Competências** calculado com base na conclusão dos planos de estudo por domínio (Machine Learning, IA Generativa, Engenharia de Software, Matemática Aplicada, Deep Learning).
- Gerenciamento completo de memórias de longo prazo salvas pelo tutor, com opções de edição e exclusão.

---

## 6. Prompt Mestre para Reprodução em Outra IA

Se você deseja instruir outra inteligência artificial a construir este exato sistema, utilize o comando abaixo:

> *"Atue como um Arquiteto de Software Sênior e Engenheiro Frontend/Backend. Preciso que você construa do zero a plataforma **IA Academy** (React 19, Tailwind CSS 4, tRPC, Drizzle ORM, MySQL). A aplicação deve conter: (1) Um **Professor Virtual de IA** com suporte a 4 personalidades pedagógicas, geração de quizzes sob demanda, TTS com seletor de velocidade e salvamento de explicações em categorias na Lista de Leitura; (2) Um **Gerador de Planos de Estudo** baseado no histórico de interações e memórias de longo prazo do aluno, com barra de progresso interativa, exportação PDF/Markdown e links de compartilhamento público; (3) Um **Painel de Perfil** com gerenciamento de memórias, histórico de certificações e um **Gráfico de Radar de Competências**; (4) Esquema relacional Drizzle completo para usuários, explicações, memórias e planos; e (5) Suíte de testes unitários abrangente utilizando Vitest. Siga estritamente boas práticas de tipagem, design neon futurista e responsividade mobile-first."*

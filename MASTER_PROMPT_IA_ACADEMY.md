# Prompt Mestre e Arquitetura Completa: IA Academy

Este documento consolida a arquitetura, o modelo de dados, as regras de negócio, as funcionalidades interativas e as instruções completas para recriar do zero a **IA Academy**, uma plataforma educacional de ponta em Inteligência Artificial, Machine Learning, Deep Learning, IA Generativa e Engenharia de Software.

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

## 3. Modelo de Dados (Esquema Drizzle / MySQL)

### 3.1. `saved_explanations` (Explicações Salvas do Professor Virtual)
- `id`: `int`, PK, Auto-increment
- `userId`: `int`, Not Null
- `title`: `varchar(300)`, Not Null
- `content`: `text`, Not Null
- `moduleId`: `varchar(120)`, Not Null
- `category`: `varchar(80)`, Default `"Geral"` (ex: Conceitos, Matemática, Código & Python, Machine Learning, Arquitetura de IA)
- `createdAt`: `timestamp`, Default Now

### 3.2. `student_memories` (Memória de Longo Prazo do Aluno)
- `id`: `int`, PK, Auto-increment
- `userId`: `int`, Not Null
- `topic`: `varchar(255)`, Not Null
- `summary`: `text`, Not Null
- `category`: `varchar(80)`, Default `"Geral"`
- `updatedAt`: `timestamp`, Default Now

### 3.3. `study_plans` (Planos de Estudo Semanais Personalizados)
- `id`: `int`, PK, Auto-increment
- `userId`: `int`, Not Null
- `title`: `varchar(255)`, Not Null
- `content`: `text`, Not Null
- `focusArea`: `varchar(120)`, Not Null
- `isCompleted`: `int`, Default `0` (0 ou 1)
- `progressPercent`: `int`, Default `0` (0 a 100)
- `createdAt`: `timestamp`, Default Now

### 3.4. Tabelas de Suporte (`library_reviews`, `user_library_favorites`, `user_radar_favorites`, `video_notes`, `ai_conversations`)
- Gerenciam avaliações de itens da biblioteca, favoritos do radar e da biblioteca, notas com timestamps em vídeo-aulas e histórico de conversas com o chat.

---

## 4. Módulos Principais e Regras de Negócio

### 4.1. Professor Virtual de IA (Tutor Especializado)
- **Personalidades Pedagógicas**: O aluno pode alternar entre quatro estilos docentes ao iniciar uma dúvida:
  1. *Padrão Didático*: Exemplo equilibrado, claro e profissional.
  2. *Socrático*: O professor não entrega a resposta pronta, fazendo perguntas guiadas para instigar o raciocínio.
  3. *Bem-Humorado*: Uso de analogias divertidas e linguagem leve do mundo real.
  4. *Rigoroso / Acadêmico*: Foco estrito em formalismos matemáticos, teoremas e notações técnicas.
- **Modo Aula Completa & Analogias**: Gera introdução intuitiva, mecânica passo a passo, analogias reais, gabarito de erros comuns e checagem de compreensão.
- **Quizzes Interativos Sob Demanda**: Botão dedicado no assistente que invoca a IA para gerar 3 a 5 perguntas de múltipla escolha com correção imediata e pontuação.
- **Leitura em Voz Alta (TTS)**: Integração nativa com `window.speechSynthesis` com seletor de velocidade de áudio (`1.0x`, `1.25x`, `1.5x`).
- **Exportação e Salvamento**: Permite salvar explicações diretamente na Lista de Leitura (com escolha de categoria) e exportar o histórico completo da conversa para PDF formatado para impressão.

### 4.2. Planos de Estudo Semanais e Progresso
- Geração automática via IA (`gpt-5-mini`) considerando a área de foco, objetivo do aluno e o histórico recuperado das **memórias de longo prazo**.
- **Barra de Progresso Interativa**: Cada tarefa semanal possui marcação de conclusão com atualização instantânea no banco de dados e cálculo automático de porcentagem.
- **Conquistas Automáticas**: Ao atingir 100% de progresso em um plano de estudo, a plataforma desbloqueia automaticamente uma medalha temática no perfil do aluno.
- **Compartilhamento Público**: Geração de link público seguro via token para que colegas e recrutadores possam visualizar o plano de estudos concluído.

### 4.3. Radar de Competências e Perfil
- Seção de estatísticas no Perfil (`/profile`) exibindo tempo total de estudo, dias consecutivos (streak), gráfico de atividade semanal e um **Gráfico de Radar de Competências** calculado com base na conclusão dos planos de estudo por domínio (Machine Learning, IA Generativa, Engenharia de Software, Matemática Aplicada, Deep Learning).
- Gerenciamento completo de memórias de longo prazo salvas pelo tutor, com opções de edição e exclusão.

---

## 5. Instruções de Prompt Mestre para Reprodução em Outra IA

Se você deseja instruir outra inteligência artificial a construir este exato sistema, utilize o comando abaixo:

> *"Atue como um Arquiteto de Software Sênior e Engenheiro Frontend/Backend. Preciso que você construa do zero a plataforma **IA Academy** (React 19, Tailwind CSS 4, tRPC, Drizzle ORM, MySQL). A aplicação deve conter: (1) Um **Professor Virtual de IA** com suporte a 4 personalidades pedagógicas, geração de quizzes sob demanda, TTS com seletor de velocidade e salvamento de explicações em categorias na Lista de Leitura; (2) Um **Gerador de Planos de Estudo** baseado no histórico de interações e memórias de longo prazo do aluno, com barra de progresso interativa, exportação PDF/Markdown e links de compartilhamento público; (3) Um **Painel de Perfil** com gerenciamento de memórias, histórico de certificações e um **Gráfico de Radar de Competências**; e (4) Uma suíte de testes unitários abrangente utilizando Vitest. Siga estritamente boas práticas de tipagem, design neon futurista e responsividade mobile-first."*

# Validação do preview — 13/08/2026

A homepage foi aberta no preview e apresentou a nova identidade com fundo azul-marinho, gradientes azul/índigo/roxo, botões coloridos, tipografia legível e cards com contraste. O botão `Explorar Trilha` navegou para `/learning-path`.

A página `/learning-path` listou as 8 fases e os 11 módulos exibidos no código. O módulo `Álgebra Linear` abriu em `/course/1/linear-algebra` com a primeira aula selecionada e texto didático visível. O módulo `SQL Básico` abriu em `/course/3/sql-basics` sem a mensagem `Curso não encontrado`, também com a primeira aula e exemplos visíveis.

Na página de SQL, fechar a primeira aula mostrou a visão geral e os quatro recursos adicionais. O botão `Notebooks Python com Exemplos` abriu conteúdo próprio, confirmando que o recurso não ficou vazio.

Testes executados após a correção do tema: `pnpm test` — 2 arquivos e 13 testes aprovados. `pnpm check` — TypeScript sem erros.

Alterações técnicas desta revisão: entrada `@import "tailwindcss"`, bloco `@theme inline` com tokens semânticos, classes `light`/`dark` sincronizadas pelo ThemeProvider, conteúdo dos recursos adicionais, marcação local de aula concluída e botão de próxima aula.

URL validada: https://3000-ikig4szvc662sq08ke5f6-435f6afb.us2.manus.computer/
URLs de cursos validadas: `/course/1/linear-algebra` e `/course/3/sql-basics`.


## Validação adicional

O CTA específico `Explorar Trilha` da homepage foi acionado pelo índice do botão e levou diretamente para `/learning-path`. A página resultante exibiu todas as 8 fases e os 11 módulos previstos.


## Rotas adicionais validadas

`/course/2/python-basics` abriu com 16 aulas e conteúdo da primeira aula `Configuração do Ambiente Python` visível.

`/course/4/numpy` abriu com 8 aulas e conteúdo da primeira aula `Introdução ao NumPy` visível.


## Rotas adicionais validadas

`/course/4/pandas` abriu com 10 aulas e conteúdo da primeira aula `Introdução ao Pandas` visível.

`/course/5/ml-fundamentals` abriu com 8 aulas e conteúdo da primeira aula `O que é Machine Learning` visível.


## Rotas adicionais validadas

`/course/6/neural-networks` abriu com 10 aulas e conteúdo da primeira aula `Fundamentos de Redes Neurais` visível.

`/course/7/llms` abriu com 8 aulas e conteúdo da primeira aula `O que são LLMs` visível.


## Rotas adicionais validadas

`/course/8/software-engineering` abriu com 10 aulas e conteúdo da primeira aula `Princípios SOLID` visível.

`/course/1/statistics` abriu com 14 aulas e conteúdo da primeira aula `O que é Estatística?` visível.

`/course/1/probability` abriu com 12 aulas e conteúdo da primeira aula `Conceitos Básicos de Probabilidade` visível.

Com isso, foram validados os 11 módulos exibidos em `/learning-path`.


## Dashboard validado

A seção `Progresso das Fases` do `/dashboard` agora usa a tabela de rotas reais. O clique na Fase 1 navegou para `/course/1/linear-algebra`, que abriu com a primeira aula `O que é Álgebra Linear?` e conteúdo visível. A rota inexistente `/course/1/overview` não é mais usada pelo Dashboard.


## Learning Path sincronizada

A `/learning-path` passou a usar `coursesData` como fonte dos módulos e contagens. O preview exibiu 8 fases e 11 módulos reais, incluindo 38 aulas na Fase 1, 16 em Python, 14 em Estatística e 12 em Probabilidade. O card de Álgebra Linear abriu `/course/1/linear-algebra` com a primeira aula e exemplos visíveis.


## Progresso persistente validado

No preview, a primeira aula de Álgebra Linear foi marcada como concluída e o CourseDetail mudou para “Aula Concluída”, exibindo 1 de 12 aulas completas. Ao abrir o Dashboard, o indicador passou a mostrar 1/118 aulas, progresso geral de 1%, e a Fase 1 passou a exibir 3%, além de desbloquear a conquista “Primeiro Passo”.


## Projetos validados

A página `/projects` exibiu os oito projetos com dados do catálogo único. O card “Previsão de Vendas” abriu `/project/1` sem fallback ou erro. O detalhe mostrou objetivos, requisitos, cinco etapas de código, melhorias, tecnologias e links oficiais do Pandas e scikit-learn. A ação “Começar Projeto” está preparada para rolar até a primeira etapa; não há mais recursos com `href="#"`.


## Conteúdo específico dos projetos validado

O detalhe `/project/2` agora apresenta etapas de Análise de Churn, incluindo alvo binário, sinais de risco, regressão logística, limiar de contato e fila de retenção. O detalhe `/project/7` apresenta etapas de Assistente de IA Corporativo, incluindo ferramentas permitidas, estado, orquestração, aprovação humana e rastreabilidade. Os snippets não contêm os placeholders genéricos removidos.


## Validação de Carreiras e Certificações — 13/08/2026

A página `/careers` apresentou os seis perfis profissionais. O segundo card navegou para `/career/2`, que exibiu o título correto “Engenheiro de Machine Learning”, responsabilidades, habilidades, empresas, mercado e roadmap específico, sem cair no fallback de Cientista de Dados. O retorno para Carreiras e o botão Começar Roadmap foram renderizados como botões de navegação, sem nested anchors.

A suíte automatizada de interação de Carreiras e Certificações passou junto com os demais testes: 47 testes aprovados. Os seis cards de certificação agora expõem links oficiais externos com `target="_blank"` e protocolo HTTPS.

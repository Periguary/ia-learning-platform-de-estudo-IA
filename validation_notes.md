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

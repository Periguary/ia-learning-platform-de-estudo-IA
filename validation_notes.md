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


## Validação pós-catálogo — 13 de agosto de 2026

A rota `/careers` exibiu os seis perfis vindos do catálogo único: Cientista de Dados, Engenheiro de Machine Learning, Engenheiro de IA, Analista de IA, Engenheiro de Software com IA e Especialista em IA Generativa. Os cartões mantiveram salários, experiência, número de habilidades e ação de exploração; o layout continuou colorido e legível no preview.

A rota `/certifications` exibiu seis registros vindos do catálogo único, cada um com provedor, nível, duração, tópicos, informações de exame, benefícios e CTA `Saiba Mais`. Os seis CTAs foram renderizados como links oficiais HTTPS: Google Cloud, Kaggle, DeepLearning.AI, Hugging Face, Microsoft Azure e AWS. Nenhum botão vazio ou rota interna de certificação foi observado.

## Limitação registrada

A consolidação em catálogos únicos foi implementada e testada. Ainda não há uma página interna de detalhe de certificação; os CTAs levam diretamente às fontes oficiais externas, que é o comportamento intencional desta versão.


## Validação de conformidade da homepage — 2026-08-13

A homepage carregou no preview com cores, contraste e tipografia aplicados. O bloco de métricas exibiu "11 Módulos disponíveis", agora derivado diretamente de `Object.keys(coursesData).length`, sem "Avaliação Média" ou valor 4.9/5. A seção de avaliações foi substituída por "Como a plataforma funciona" e "Explore antes de decidir", sem nomes, citações, estrelas ou ratings de clientes. O CTA `Explorar Trilha` permaneceu visível.

A suíte passou após as alterações: 13 arquivos de teste e 51 testes aprovados. Ainda falta validar um `CourseDetail` no preview após a remoção das métricas e salvar o checkpoint desta conformidade.


## Validação de CourseDetail sem avaliações — 2026-08-13

A rota `/course/1/linear-algebra` carregou com título, descrição, duração de 40 horas, 12 aulas, progresso real de 1/12, primeira aula e exemplos didáticos. O cartão de métricas não exibiu estrela, rating ou contagem de reviews; os controles `Aula Concluída` e `Próxima Aula` permaneceram funcionais. A remoção das métricas fictícias não causou regressão no conteúdo da aula.


## Validação do Tutor IA — 2026-08-13

A rota `/course/1/linear-algebra` exibiu o bloco `Tutor IA da aula` abaixo do conteúdo didático da primeira aula. O preview mostrou a descrição contextualizada, três perguntas sugeridas e o campo `Digite sua dúvida sobre esta aula...`. A lista lateral de aulas, progresso, conteúdo e controles de conclusão/próxima aula permaneceram presentes. O assistente foi integrado como UI; a chamada real ao modelo fica protegida no servidor pelo procedimento tRPC `ai.ask`, que injeta apenas o contexto da aula enviado pelo catálogo.


A interação com uma pergunta sugerida foi acionada no preview e o bloco permaneceu estável, sem erro visual ou perda do conteúdo. O preview está em modo de desenvolvimento e não exibiu resposta do modelo após a espera; a resposta real depende da disponibilidade do proxy de LLM no ambiente publicado. O procedimento e seus testes de contrato cobrem a chamada, o contexto, os limites de entrada e a mensagem segura de falha.


O clique direto no primeiro prompt sugerido foi repetido no preview. A interface continuou responsiva e sem erro visual; não houve requisição `ai.ask` registrada no log de rede do modo de preview, portanto a resposta do provedor não foi validada por chamada real neste ambiente. Os testes automatizados validam a construção da requisição e a resposta simulada do fluxo.


O envio digitado da pergunta `Explique este conceito com uma analogia simples.` funcionou no preview: a pergunta apareceu no balão do aluno e o indicador de carregamento do tutor foi exibido. Após a espera, o preview permaneceu em carregamento, sem resposta final visível; o log de rede deve ser consultado antes de afirmar que a chamada do provedor foi concluída.


## Resposta real do Tutor IA validada — 2026-08-13

Após aproximadamente 13 segundos, o procedimento `POST /api/trpc/ai.ask?batch=1` retornou status 200 no preview. A resposta exibida no balão do tutor começou com `Ótimo — uma analogia simples e direta para entender o que é Álgebra Linear`, confirmando que a pergunta digitada foi enviada, o contexto da aula foi aceito e a resposta do modelo apareceu na interface. A requisição levou 13.431 ms no modo de desenvolvimento; o estado de carregamento permaneceu visível durante esse intervalo.


## Validação de compartilhamento, exportação e vídeos — 2026-08-13

A rota `/curiosities` exibiu os filtros, quatro cards com botões de compartilhamento e o Tutor IA contextualizado, incluindo Novo Tópico, Limpar Histórico e perguntas sugeridas.

A rota `/library` exibiu Catálogo Completo, Lista de Leitura (0 sem sessão), Baixar Markdown, Google Drive, GitHub e Google Colab, busca, filtros, favoritos, Debater/Avaliar, Compartilhar, Drive, GitHub e VS Code em cada card.

A navegação global exibiu o novo destino `Vídeos`. Os testes automatizados do pacote passaram com 69 testes aprovados, incluindo catálogo de vídeos, compartilhamento e exportação da Lista de Leitura.

# Integração com Gemini Notebook / NotebookLM

Fontes oficiais consultadas em 14/08/2026:

- https://support.google.com/gemininotebook/answer/16215270 — o Gemini Notebook aceita áudio, texto colado, Google Docs, Google Slides, Google Sheets, imagens, DOCX, TXT, Markdown, PDF, CSV, PPTX, URLs web e URLs públicas do YouTube. Para URLs web, somente o conteúdo textual da página é coletado; para vídeos públicos do YouTube, a fonte usa a transcrição/captions.
- https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-deep-research-file-types/ — o Google anunciou suporte a arquivos do Drive como URLs, PDFs do Google Drive, Sheets, imagens e DOCX, além da importação de fontes vindas do Deep Research.

Decisão de produto: a IA Academy deve oferecer uma ponte compatível baseada em fontes que o usuário pode copiar/importar no Gemini Notebook: botão para copiar URL original de vídeo/artigo, exportação de notas e guia em Markdown/TXT/PDF, e um pacote Markdown consolidado para abrir ou enviar ao Drive. Não será simulada uma API direta do NotebookLM, pois as fontes oficiais consultadas documentam importação pelo próprio produto, não um endpoint público de criação de notebooks.

# Execução local de IA no navegador

## Fontes consultadas

- [Transformers.js — Hugging Face](https://huggingface.co/docs/transformers.js/en/index): usa ONNX Runtime para executar modelos no navegador; o padrão é CPU via WebAssembly e WebGPU é uma opção experimental. A documentação recomenda modelos quantizados, como q8 e q4, para reduzir custo de download e memória.
- [ONNX Runtime Web — documentação oficial](https://onnxruntime.ai/docs/get-started/with-javascript/web.html): oferece API JavaScript para inferência no browser, com importação WASM padrão e entradas experimentais para WebGPU/WebNN.

## Decisões de produto

A primeira versão deve carregar o runtime sob demanda, mostrar progresso e tratar indisponibilidade de WebGPU, bibliotecas e modelos com mensagens transparentes. O modo local deve ser opcional e não substituir a rota autenticada do Tutor IA. Modelos externos devem ser fixados por identificador e acompanhados de licença e origem no catálogo; não baixar ou executar modelos sem referência verificável.

## Limitações a comunicar

Inferência local depende de memória, CPU/GPU, navegador e conexão inicial para baixar o modelo. OpenCV e PyTorch completos não são automaticamente suportados no runtime WASM genérico; exemplos que dependem dessas bibliotecas devem manter a alternativa Colab. A resposta do Tutor Local precisa ser identificada como local e não deve alegar atualização em tempo real nem substituir revisão pedagógica.


## Modelo generativo local

- [SmolLM2-135M-Instruct — card oficial](https://huggingface.co/HuggingFaceTB/SmolLM2-135M-Instruct): o metadado oficial declara `license: apache-2.0`, disponibiliza variantes ONNX quantizadas e identifica o modelo como text-generation. A variante usada no navegador é [onnx-community/SmolLM2-135M-Instruct-ONNX-MHA](https://huggingface.co/onnx-community/SmolLM2-135M-Instruct-ONNX-MHA), marcada para Transformers.js e ONNX.

A interface deve citar o modelo base e a licença Apache-2.0, mas também orientar a leitura do card original e respeitar seus termos. A licença do modelo não transforma automaticamente todos os dados de entrada ou a resposta em conteúdo sem direitos; o aluno continua responsável por usar material próprio ou compatível.

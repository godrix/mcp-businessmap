import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export class FormattedContentPromptsController {
  constructor(private server: McpServer) {
    this.registerPrompts();
  }

  private registerPrompts(): void {
    this.registerAddFormattedCardCommentPrompt();
    this.registerAddFormattedCardSubtaskPrompt();
  }

  private registerAddFormattedCardCommentPrompt(): void {
    this.server.prompt(
      "add-formatted-card-comment",
      "Add a formatted comment to a BusinessMap card with HTML rich formatting, line breaks, styling, and emojis",
      {
        cardId: z.string().describe("The card ID where the comment will be added"),
        content: z.string().describe("The comment content in plain text or markdown that will be formatted as HTML"),
      },
      async ({ cardId, content }) => {
        const promptText = `# Adicionar Comentário Formatado no BusinessMap

## Overview

Comando para adicionar comentários formatados com quebras de linha, estilização e emojis em cards do BusinessMap.

## IMPORTANTE - Limitação da API

A API de criação de comentários (\`addCardComment\`) aceita apenas texto simples (type: plain), não aceita HTML. A API de atualização (\`updateCardComment\`) aceita HTML completo com estilos inline. 

**Por isso, a estratégia consiste em criar o comentário primeiro com texto simples e imediatamente atualizá-lo com formatação HTML rica.**

## Steps

1. Receber do usuário o cardId e o conteúdo do comentário a ser adicionado
2. Criar o comentário inicial usando a ferramenta \`mcp_businessmap_add-card-comment\` com texto simples
3. Capturar o \`comment_id\` retornado pela API na resposta da criação
4. Formatar o conteúdo do comentário em HTML usando as tags suportadas:
   - \`<h3>\` para títulos principais (pode combinar com emojis)
   - \`<p>\` para parágrafos e quebras de linha
   - \`<strong>\` para texto em negrito
   - \`<em>\` para texto em itálico
   - \`<u>\` para texto sublinhado
   - \`<code>\` para código inline
   - \`<hr>\` para linhas horizontais separadoras
   - \`<ul>\` e \`<li>\` para listas não ordenadas
   - \`<ol>\` e \`<li>\` para listas ordenadas (numeradas)
   - \`<a href="">\` para links clicáveis
   - \`<blockquote>\` para citações destacadas
   - \`<pre>\` para texto pré-formatado (múltiplas linhas)
   - \`<p style="">\` para estilos inline (color, background-color, font-size, etc)
   - Emojis são totalmente suportados: 🚀 ⚠️ 💡 ✨ 🔥 👍 ❌ ⭐ 📋 ✏️ 📌 💻 🎯 🔗 🎨 ✅ 📝
5. Atualizar o comentário recém-criado usando a ferramenta \`mcp_businessmap_update-card-comment\` passando o cardId, commentId e o conteúdo HTML formatado
6. Usar emojis estrategicamente para melhorar a legibilidade e destacar informações importantes
7. Confirmar ao usuário que o comentário foi adicionado com formatação e informar o comment_id gerado

## Checklist de Verificação

- [ ] O cardId fornecido é um número válido
- [ ] O comentário foi criado com sucesso e o comment_id foi capturado
- [ ] O HTML está bem formatado com tags válidas e suportadas
- [ ] O comentário foi atualizado imediatamente após a criação
- [ ] Todas as informações importantes estão organizadas em parágrafos separados
- [ ] Títulos usam tag h3 e emojis apropriados para destaque
- [ ] Seções importantes são separadas com hr (linha horizontal)
- [ ] Listas são usadas quando apropriado para organizar múltiplos itens
- [ ] Emojis são usados estrategicamente para melhorar a visualização
- [ ] Estilos inline são usados quando necessário destacar informações críticas
- [ ] A resposta final confirma o sucesso e apresenta o comment_id

## Parâmetros fornecidos

- cardId: ${cardId}
- content: ${content}

Use as ferramentas MCP disponíveis para criar e atualizar o comentário formatado.`;

        return {
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: promptText,
              },
            },
          ],
        };
      }
    );
  }

  private registerAddFormattedCardSubtaskPrompt(): void {
    this.server.prompt(
      "add-formatted-card-subtask",
      "Add or edit a formatted subtask to a BusinessMap card with HTML rich formatting, line breaks, styling, and emojis",
      {
        cardId: z.string().describe("The card ID where the subtask will be added or updated"),
        subtaskId: z.string().optional().describe("The subtask ID if updating an existing subtask (leave empty for new subtask)"),
        content: z.string().describe("The subtask content in plain text or markdown that will be formatted as HTML"),
        isFinished: z.string().optional().describe("Whether the subtask is finished ('0' = not finished, '1' = finished)"),
      },
      async ({ cardId, subtaskId, content, isFinished }) => {
        const isUpdate = !!subtaskId;
        const isFinishedNum = isFinished ? parseInt(isFinished, 10) : undefined;
        const promptText = `# Adicionar/Editar Subtask Formatada no BusinessMap

## Overview

Comando para adicionar ou editar subtasks formatadas com quebras de linha, estilização e emojis em cards do BusinessMap.

## IMPORTANTE - Diferença em relação aos Comentários

Diferente dos comentários, as subtasks **já aceitam HTML diretamente** tanto na criação quanto na atualização, não sendo necessário criar primeiro e atualizar depois.

**Vantagens das Subtasks:**
- ✅ **Subtasks aceitam HTML diretamente** na criação (não precisa criar texto simples e depois atualizar)
- ✅ **Menos complexo**: um único passo para criar ou atualizar
- ✅ Mesmas tags HTML e emojis suportados

## Steps

${isUpdate ? `1. Receber do usuário o cardId, subtaskId e o conteúdo da subtask a ser atualizada` : `1. Receber do usuário o cardId e o conteúdo da subtask a ser adicionada`}
2. Receber ou formatar o conteúdo da subtask
3. Formatar o conteúdo em HTML usando as tags suportadas:
   - \`<h3>\` para títulos principais (pode combinar com emojis)
   - \`<p>\` para parágrafos e quebras de linha
   - \`<strong>\` para texto em negrito
   - \`<em>\` para texto em itálico
   - \`<u>\` para texto sublinhado
   - \`<code>\` para código inline
   - \`<hr>\` para linhas horizontais separadoras
   - \`<ul>\` e \`<li>\` para listas não ordenadas
   - \`<ol>\` e \`<li>\` para listas ordenadas (numeradas)
   - \`<a href="">\` para links clicáveis
   - \`<blockquote>\` para citações destacadas
   - \`<pre>\` para texto pré-formatado (múltiplas linhas)
   - \`<p style="">\` para estilos inline (color, background-color, font-size, etc)
   - Emojis são totalmente suportados: 🚀 ⚠️ 💡 ✨ 🔥 👍 ❌ ⭐ 📋 ✏️ 📌 💻 🎯 🔗 🎨 ✅ 📝
${isUpdate ? `4. Para **atualizar** uma subtask existente:
   - Usar \`mcp_businessmap_update-card-subtask\` com description formatada em HTML
   - Informar cardId, subtaskId, description e isFinished (0 ou 1)` : `4. Para **criar** uma nova subtask:
   - Usar \`mcp_businessmap_add-card-subtask\` com description formatada em HTML
   - Informar cardId e description`}
5. Usar emojis estrategicamente para melhorar a legibilidade e destacar informações importantes
6. Confirmar ao usuário que a subtask foi criada/atualizada com formatação

## Checklist de Verificação

- [ ] O cardId fornecido é um número válido
- [ ] ${isUpdate ? "O subtaskId foi informado e é válido" : "A subtask será criada como nova"}
- [ ] O HTML está bem formatado com tags válidas e suportadas
- [ ] Todas as informações importantes estão organizadas em parágrafos separados
- [ ] Títulos usam tag h3 e emojis apropriados para destaque
- [ ] Seções importantes são separadas com hr (linha horizontal)
- [ ] Listas são usadas quando apropriado para organizar múltiplos itens
- [ ] Emojis são usados estrategicamente para melhorar a visualização
- [ ] Estilos inline são usados quando necessário destacar informações críticas
- [ ] A resposta final confirma o sucesso e apresenta o subtask_id
- [ ] O parâmetro isFinished foi definido corretamente (0 = não concluída, 1 = concluída)

## Parâmetros fornecidos

- cardId: ${cardId}
${isUpdate ? `- subtaskId: ${subtaskId}` : ""}
- content: ${content}
${isFinishedNum !== undefined ? `- isFinished: ${isFinishedNum}` : ""}

Use as ferramentas MCP disponíveis para ${isUpdate ? "atualizar" : "criar"} a subtask formatada.`;

        return {
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: promptText,
              },
            },
          ],
        };
      }
    );
  }
}


# Changelog

## Version 1.7.0 - 2025-01-27

Esta versão inclui melhorias e refinamentos nas funcionalidades de formatação HTML rica introduzidas na versão anterior.

### Melhorias

- **Integração de Prompts**:
  - Adicionado `FormattedContentPromptsController` para fornecer prompts contextuais que guiam a criação de comentários e subtasks formatadas.
  - Prompts incluem instruções detalhadas sobre limitações da API e melhores práticas de formatação.

- **Refinamentos Técnicos**:
  - Melhor tratamento de erros nas operações de formatação de comentários.
  - Validação aprimorada de respostas da API durante o processo de criação e atualização de comentários formatados.
  - Documentação interna melhorada sobre diferenças entre comentários e subtasks em relação ao suporte HTML.

### Atualização de Versão

- A versão do pacote foi atualizada de `1.6.0` para `1.7.0`.

## Version 1.6.0 - 2025-01-27

Esta versão introduz suporte para formatação HTML rica em comentários e subtasks, permitindo criar conteúdo visualmente mais rico e organizado no BusinessMap.

### Novas Funcionalidades

- **Comentários Formatados**:
  - `add-formatted-card-comment`: Nova ferramenta para adicionar comentários com formatação HTML rica, incluindo quebras de linha, estilos, emojis e elementos HTML suportados.
  - Suporte para tags HTML: `<h3>`, `<p>`, `<strong>`, `<em>`, `<u>`, `<code>`, `<hr>`, `<ul>`, `<ol>`, `<a>`, `<blockquote>`, `<pre>` e estilos inline.
  - Preservação automática de emojis e formatação markdown básica.

- **Subtasks Formatadas**:
  - `add-formatted-card-subtask`: Nova ferramenta para adicionar subtasks com formatação HTML rica.
  - `update-formatted-card-subtask`: Nova ferramenta para atualizar subtasks existentes com formatação HTML.
  - Diferente dos comentários, subtasks aceitam HTML diretamente na criação e atualização.

- **Prompts para Conteúdo Formatado**:
  - `add-formatted-card-comment`: Prompt para guiar a criação de comentários formatados.
  - `add-formatted-card-subtask`: Prompt para guiar a criação/edição de subtasks formatadas.

### Melhorias

- **Utilitário de Formatação HTML**:
  - Novo módulo `htmlFormatter` com funções para converter texto simples/markdown em HTML formatado.
  - Suporte para conversão de markdown básico (negrito, itálico, links, listas, etc.) para HTML.
  - Preservação de HTML existente quando aplicável.

### Atualização de Versão

- A versão do pacote foi atualizada de `1.5.0` para `1.6.0`.

## Version 1.3.0 - 2025-07-18

This release introduces workspace management tools, allowing for interaction with workspaces within Businessmap.

### New Features

- **Workspace Tools**:
  - `get-workspace`: A new tool to retrieve details of a specific workspace by ID.

### Improvements

- **Codebase Refinements**:
  - Added `WorkspacesToolsController` to manage workspace-related tools.
  - Integrated `getWorkspace` method into `ApiService` to support fetching workspace data.

### Version Update

- The package version has been updated from `1.2.0` to `1.3.0`.

## Version 1.2.0 - 2025-07-14

This release focuses on improving user management capabilities and refining existing tools.

### New Features

- **User Tools**:
  - `get-user`: A new tool to retrieve details of a specific user by ID.

### Improvements

- **Tool Renaming**:
  - `ColumnsToolsController` has been renamed to `ColumnToolsController` for better naming consistency (singular form).
- **Model Refactoring**:
  - The `Me` model has been replaced by the more generic `User` model, improving data structure consistency.

### Version Update

- The package version has been updated from `1.1.0` to `1.2.0`.

## Version 1.1.0 - 2025-07-12

This release introduces new functionalities for card management, a read-only mode for the server, and refactors user information retrieval.

### New Features

- **Card Management Tools**:
  - `create-card`: A new tool to create cards on Businessmap.
  - `update-card`: A new tool to modify existing cards.
  - `delete-card`: A new tool to remove cards.
- **Read-Only Mode**:
  - Introduced `BUSINESSMAP_READ_ONLY` environment variable. When set to `true`, all mutable operations (create, update, delete) across all tools (Cards, Card Comments, Card Co-Owners, Card Subtasks) will be disabled, ensuring the server operates in a read-only capacity. The default value is `false`.
- **User Info Resource**:
  - A new resource `user://me` is now available to retrieve information about the active user. This replaces the previous `get-active-user-data` tool.

### Improvements

- **Conditional Mutable Operations**: Mutable operations for Card Comments, Card Co-Owners, and Card Subtasks are now conditionally enabled based on the `BUSINESSMAP_READ_ONLY` environment variable.

### Removals

- **`get-active-user-data` Tool**: The `get-active-user-data` tool has been removed as its functionality has been migrated to the new `user://me` resource.

### Version Update

- The package version has been updated from `1.0.1` to `1.1.0`.

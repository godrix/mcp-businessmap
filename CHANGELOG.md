# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.8.0] - 2025-12-27

### Fixed

- **Formatted Comment Tool**:
  - Fixed `add-formatted-card-comment` tool to accept HTML content directly instead of plain text/markdown
  - Improved comment_id extraction from API response with fallback paths
  - Enhanced plain text extraction from HTML for initial comment creation
  - Tool now properly handles the two-step process (create plain text, then update with HTML) transparently

### Changed

- **Internationalization**:
  - Translated all documentation, comments, and prompts from Portuguese to English
  - Updated README.md to English
  - Translated all code comments and documentation strings
  - Updated prompt texts in `FormattedContentPromptsController` to English
  - Translated utility function documentation in `htmlFormatter.ts`

### Version Update

- The package version has been updated from `1.7.1-next.0` to `1.8.0`.

## [1.7.0] - 2025-01-27

This version includes improvements and refinements to the rich HTML formatting features introduced in the previous version.

### Improvements

- **Prompt Integration**:
  - Added `FormattedContentPromptsController` to provide contextual prompts that guide the creation of formatted comments and subtasks.
  - Prompts include detailed instructions about API limitations and formatting best practices.

- **Technical Refinements**:
  - Better error handling in comment formatting operations.
  - Enhanced API response validation during the formatted comment creation and update process.
  - Improved internal documentation about differences between comments and subtasks regarding HTML support.

### Version Update

- The package version has been updated from `1.6.0` to `1.7.0`.

## [1.6.0] - 2025-01-27

This version introduces support for rich HTML formatting in comments and subtasks, allowing for creating visually richer and more organized content in BusinessMap.

### New Features

- **Formatted Comments**:
  - `add-formatted-card-comment`: New tool to add comments with rich HTML formatting, including line breaks, styles, emojis, and supported HTML elements.
  - Support for HTML tags: `<h3>`, `<p>`, `<strong>`, `<em>`, `<u>`, `<code>`, `<hr>`, `<ul>`, `<ol>`, `<a>`, `<blockquote>`, `<pre>`, and inline styles.
  - Automatic preservation of emojis and basic markdown formatting.

- **Formatted Subtasks**:
  - `add-formatted-card-subtask`: New tool to add subtasks with rich HTML formatting.
  - `update-formatted-card-subtask`: New tool to update existing subtasks with HTML formatting.
  - Unlike comments, subtasks accept HTML directly in creation and update.

- **Formatted Content Prompts**:
  - `add-formatted-card-comment`: Prompt to guide the creation of formatted comments.
  - `add-formatted-card-subtask`: Prompt to guide the creation/editing of formatted subtasks.

### Improvements

- **HTML Formatting Utility**:
  - New `htmlFormatter` module with functions to convert plain text/markdown to formatted HTML.
  - Support for converting basic markdown (bold, italic, links, lists, etc.) to HTML.
  - Preservation of existing HTML when applicable.

### Version Update

- The package version has been updated from `1.5.0` to `1.6.0`.

## [1.3.0] - 2025-07-18

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

## [1.2.0] - 2025-07-14

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

## [1.1.0] - 2025-07-12

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

[Unreleased]: https://github.com/godrix/mcp-businessmap/compare/v1.8.0...HEAD
[1.8.0]: https://github.com/godrix/mcp-businessmap/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/godrix/mcp-businessmap/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/godrix/mcp-businessmap/compare/v1.3.0...v1.6.0
[1.3.0]: https://github.com/godrix/mcp-businessmap/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/godrix/mcp-businessmap/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/godrix/mcp-businessmap/compare/v1.0.1...v1.1.0

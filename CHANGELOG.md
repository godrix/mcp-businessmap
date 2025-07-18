# Changelog

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

# Changelog

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

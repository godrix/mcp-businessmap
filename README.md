# MCP Businessmap

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=businessmap&config=eyJlbnYiOnsiQlVTSU5FU1NNQVBfQVBJX1VSTCI6Imh0dHBzOi8vZXhhbXBsZS5rYW5iYW5pemUuY29tL2FwaS92MiIsIkJVU0lORVNTTUFQX0FQSV9LRVkiOiJ5b3VyX2FwaV9rZXkiLCJCVVNJTkVTU01BUF9SRUFEX09OTFkiOiJmYWxzZSJ9LCJjb21tYW5kIjoibnB4IC15IEBnb2RyaXgvYnVzaW5lc3NtYXAtbWNwIn0=)

This project is an unofficial MCP (Model Context Protocol) server for [Businessmap](https://businessmap.io) (formerly Kanbanize), designed to expose a set of tools for managing business-related entities such as boards, cards, columns, and user information. It was built to facilitate interaction with Large Language Models (LLMs) and similar applications through a standardized protocol.

## Prerequisites

- Node.js 18+
- Businessmap API key and base URL (`https://your-subdomain.kanbanize.com/api/v2`)

## Quick Start (npx)

No clone or build required — the published npm package includes compiled JavaScript.

### Cursor / Claude Desktop (`mcp.json`)

```json
{
  "mcpServers": {
    "businessmap": {
      "command": "npx",
      "args": ["-y", "@godrix/businessmap-mcp"],
      "env": {
        "BUSINESSMAP_API_URL": "https://example.kanbanize.com/api/v2",
        "BUSINESSMAP_API_KEY": "your_api_key",
        "BUSINESSMAP_READ_ONLY": "false"
      }
    }
  }
}
```

Restart your MCP client after saving. Or use the **Install MCP Server** button at the top of this README.

### Global install (alternative)

```bash
npm install -g @godrix/businessmap-mcp
```

Then use `"command": "businessmap-mcp"` in `mcp.json`.

### Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `BUSINESSMAP_API_URL` | **Yes** | — | Base API URL, e.g. `https://your-subdomain.kanbanize.com/api/v2` |
| `BUSINESSMAP_API_KEY` | **Yes** | — | API key from Businessmap |
| `BUSINESSMAP_READ_ONLY` | No | `false` | When `true`, disables all mutation tools |
| `BUSINESSMAP_DEFAULT_WORKSPACE_ID` | No | — | Default workspace ID for operations that need workspace context |

See `.env.example` for a template when developing locally.

### Local development (optional)

```bash
git clone https://github.com/godrix/mcp-businessmap.git
cd mcp-businessmap
npm install
cp .env.example .env
npm run build
```

Point your MCP client at the clone:

```json
{
  "mcpServers": {
    "businessmap": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-businessmap/dist/server.js"],
      "env": {
        "BUSINESSMAP_API_URL": "https://example.kanbanize.com/api/v2",
        "BUSINESSMAP_API_KEY": "your_api_key"
      }
    }
  }
}
```

## Available Tools

The server provides the following tools, accessible via MCP:

### API Limits
- `get-api-limits` — Get hourly and minutely API request limits.

### Boards
- `get-boards` — List boards assigned to the current user.
- `get-board` — Get details of a single board.

### Columns
- `get-columns` — List columns in a board.
- `get-column` — Get details of a single column.
- `create-column` — Create a column in a board.
- `update-column` — Update an existing column.
- `delete-column` — Delete a column from a board.

### Lanes
- `get-lanes` — List lanes in a board.
- `get-lane` — Get details of a single lane.
- `create-lane` — Create a lane.
- `update-lane` — Update an existing lane.
- `delete-lane` — Delete a lane.

### Workspaces
- `get-workspaces` — List workspaces.
- `get-workspace` — Get details of a single workspace.
- `create-workspace` — Create a new workspace.
- `update-workspace` — Update an existing workspace.

### Users
- `get-user` — Get details of a user by ID.
- `get-me` — Get details of the current logged-in user.

### Cards
- `get-card` — Get details of a single card.
- `get-cards` — List cards with optional filters.
- `create-card` — Create a card.
- `update-card` — Update an existing card.
- `delete-card` — Delete a card.
- `create-cards-many` — Create multiple cards in a single request.
- `update-cards-many` — Update multiple cards in a single request.
- `delete-cards-many` — Delete multiple cards in a single request.

### Card Comments
- `get-card-comments` — List comments on a card.
- `get-card-comment` — Get a single comment.
- `add-card-comment` — Add a plain-text comment.
- `add-formatted-card-comment` — Add a comment with HTML formatting.
- `update-card-comment` — Update a comment.
- `delete-card-comment` — Delete a comment.

### Card Co-Owners
- `get-card-co-owners` — List co-owners of a card.
- `check-card-co-owner` — Check if a user is a co-owner.
- `add-card-co-owner` — Add a co-owner.
- `remove-card-co-owner` — Remove a co-owner.

### Linked Cards
- `get-linked-cards` — List cards linked to a given card.
- `link-child-card` — Make a card a child of a parent card.
- `unlink-child-card` — Remove a parent-child link.
- `link-parent-card` — Make a card a parent of a child card.
- `unlink-parent-card` — Remove a parent-child link.

### Card Block Reasons
- `get-block-reasons` — List enabled block reasons.
- `get-card-block-reason` — Get the block reason for a card.
- `block-card` — Block a card with a reason.
- `unblock-card` — Remove the block from a card.

### Card Subtasks
- `get-card-subtasks` — List subtasks on a card.
- `get-card-subtask` — Get a single subtask.
- `add-card-subtask` — Add a subtask.
- `add-formatted-card-subtask` — Add a subtask with HTML formatting.
- `update-card-subtask` — Update a subtask.
- `update-formatted-card-subtask` — Update a subtask with HTML formatting.
- `delete-card-subtask` — Delete a subtask.

## Available Resources

Resources expose read-only context data to LLMs:

| Resource | URI | Description |
|----------|-----|-------------|
| User Info | `user://me` | Data about the active user |
| API Limits | `api://limits` | Hourly and minutely API request limits |
| Board | `board://{boardId}` | Details of a board |
| Board Structure | `board://{boardId}/structure` | Board structure (workflows, lanes, columns, cell limits) |
| Workspace | `workspace://{workspaceId}` | Details of a workspace |

## Available Prompts

Prompts provide reusable workflow templates for common operations:

| Prompt | Description |
|--------|-------------|
| `add-formatted-card-comment` | Guide for adding HTML-formatted comments |
| `add-formatted-card-subtask` | Guide for adding or editing HTML-formatted subtasks |
| `create-card-workflow` | Guide for creating a card with board/column/lane context |
| `link-cards-workflow` | Guide for linking parent and child cards |
| `block-card-workflow` | Guide for blocking or unblocking a card |

## Support and Contribution

If you find this project useful, consider giving it a star ⭐ on GitHub!

### Reporting Issues

If you encounter bugs or have feature requests, open an issue on the [GitHub Issues page](https://github.com/godrix/mcp-businessmap/issues).

### Contributing

Contributions are welcome! If you would like to contribute, follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit (`git commit -m 'Add new feature'`).
4.  Push to your branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

Make sure your code follows the project's coding standards and includes appropriate tests.

### More Information

For more information about Businessmap Kanbanize, visit the official website: [https://businessmap.io](https://businessmap.io)

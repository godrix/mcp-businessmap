# MCP Businessmap

This project is an unofficial MCP (Model Context Protocol) server for [Businessmap](https://businessmap.io) (formerly Kanbanize), designed to expose a set of tools for managing business-related entities such as boards, cards, columns, and user information. It was built to facilitate interaction with Large Language Models (LLMs) and similar applications through a standardized protocol.

## Available Tools

The server provides the following tools, accessible via MCP:

- **API Limits Tools**: Manage and monitor API usage limits.
- **Board Tools**: Interact and manage business boards.
- **Card Comments Tools**: Manage comments associated with cards.
- **Card Co-Owners Tools**: Handle co-ownership assignments for cards.
- **Linked Cards Tools**: Manage relationships between linked cards.
- **Card Subtasks Tools**: Manage subtasks within cards.
- **Card Tools**: General tools for managing and interacting with cards.
- **Column Tools**: Interact and manage columns within boards.
- **Lane Tools**: Interact and manage lanes within boards.
- **System Tools**: Monitor server health, version information, and environment configuration.
- **User Tools**: Interact and manage users.
- **Workspace Tools**: Interact and manage workspaces.

## Available Resources

The server provides the following resources, accessible via MCP:

- **User Information**: Retrieve data about the active user (`user://me`).

## Getting Started

To use this MCP server with your LLM, follow these steps:

### 1. Set Up Node.js and NPM

First, make sure you have Node.js (which includes npm) installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### 2. Connect to Your LLM

## Quick Installation in Cursor

[![Add to Cursor](https://img.shields.io/badge/Add%20to-Cursor-blue?style=for-the-badge&logo=cursor)](https://cursor.sh/settings/mcp)

### Quick Setup for Cursor

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=businessmap&config=eyJjb21tYW5kIjoibnB4IC15IGJ1c2luZXNzbWFwLW1jcCJ9)

1. **Open Cursor** and go to `Settings > Features > MCP`
2. **Add a new server** with the following configuration:

```json
{
  "businessmap": {
    "command": "npx",
    "args": [
      "-y",
      "businessmap-mcp"
    ]
  }
}
```

3. **Save** and **restart** Cursor
4. **Start using** Businessmap tools directly in the chat!

### Installation via NPM

```bash
npm install -g businessmap-mcp
```


To connect this MCP server to your LLM, you need to configure it in your `mcp.json` file. This file tells your LLM environment how to discover and interact with the MCP server.

Add the following configuration to your `mcp.json` file:

```json
{
  "servers": [
    {
      "name": "businessmap",
      "command": "npx",
      "args": ["businessmap-mcp", "-y"],
      "envs": {
        "BUSINESSMAP_API_URL": "https://example.kanbanize.com/api/v2",
        "BUSINESSMAP_API_KEY": "your_businessmap_api_key"
        // "BUSINESSMAP_READ_ONLY": "true" optional, default value is false
        // "BUSINESSMAP_DEFAULT_WORKSPACE_ID": "123" optional - Sets the BusinessMap workspace ID
      }
    }
  ]
}
```

### Environment Variables

#### `BUSINESSMAP_READ_ONLY`

- **Purpose**: This optional environment variable controls whether the server operates in read-only mode.
- **Default value**: `false` (mutation operations are enabled by default).
- **Behavior**: If set to `true`, all tools that perform mutation operations (such as creating, updating, and deleting cards, comments, co-owners, and subtasks) will be disabled. This ensures that the server only retrieves data and does not modify any entities in BusinessMap.

#### `BUSINESSMAP_DEFAULT_WORKSPACE_ID`

- **Purpose**: This optional environment variable sets the default BusinessMap workspace ID to be used by the server.
- **Default value**: `undefined` (no default workspace ID).
- **Behavior**: When set, this workspace ID will be used as the default workspace for operations that require a workspace context. This can help simplify operations by avoiding the need to specify the workspace ID repeatedly.


**Note:**

- Replace `"https://example.kanbanize.com/api/v2"` with the actual base API URL that your `businessmap-mcp` server needs to connect to.
- Replace `"your_businessmap_api_key"` with your actual API key.
- The `command` and `args` specify how to run the MCP server.
- The `envs` section provides the environment variables necessary for the `businessmap-mcp` server operation.

After configuring `mcp.json`, your LLM should be able to discover and call the tools exposed by this server (e.g., `Board Tools`, `Card Tools`). Consult your LLM's documentation for specific instructions on how to load `mcp.json` configurations.

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

# MCP Businessmap

This project is an unofficial MCP (Model Context Protocol) server for [Businessmap](https://businessmap.io) formerly Kanbanize, designed to expose a set of tools for managing business-related entities such as boards, cards, columns, and user information. It is built to facilitate interaction with Large Language Models (LLMs) and similar applications through a standardized protocol.

## Tools Provided

The server provides the following tools, accessible via the MCP:

- **API Limits Tools**: Manage and monitor API usage limits.
- **Board Tools**: Interact with and manage business boards.
- **Card Comments Tools**: Manage comments associated with cards.
- **Card Co-Owners Tools**: Handle co-ownership assignments for cards.
- **Card Linked Cards Tools**: Manage relationships between linked cards.
- **Card Subtasks Tools**: Manage subtasks within cards.
- **Card Tools**: General tools for managing and interacting with cards.
- **Columns Tools**: Interact with and manage columns within boards.

## Resources Provided

The server provides the following resources, accessible via the MCP:

- **User Info**: Retrieve data about the active user (`user://me`).

To use this MCP server with your LLM, follow these steps:

### 1. Setup Node and NPM

First, ensure you have Node.js (which includes npm) installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### 2. Connect to Your LLM

To connect this MCP server to your LLM, you need to configure it in your `mcp.json` file. This file tells your LLM environment how to discover and interact with the MCP server.

Add the following configuration to your `mcp.json` file:

```json
{
  "servers": [
    {
      "name": "businessmap",
      "command": "npx",
      "args": ["businessmap-mcp"],
      "envs": {
        "BUSINESSMAP_API_URL": "https://example.kanbanize.com/api/v2",
        "BUSINESSMAP_API_KEY": "your_businessmap_api_key"
        // "BUSINESSMAP_READ_ONLY": "true" optional default value in true
      }
    }
  ]
}
```

### `BUSINESSMAP_READ_ONLY` Environment Variable

- **Purpose**: This optional environment variable controls if the server operates in reading mode only.
- **Default value**: `false` (changeable operations are enabled by default).
- **Behavior**: If defined as `true`, all tools that perform changeable operations (such as creating, updating and deleting cards, comments, co-owners and subtasking) will be disabled.This ensures that the server only recovers data and does not modify any entity in BusinessMap.

```

**Note:**

- Replace `"https://example.kanbanize.com/api/v2"` with the actual base URL of the API your `businessmap-mcp` server needs to connect to.
- Replace `"your_businessmap_api_key"` with your actual API key.
- The `command` and `args` specify how to run the MCP server.
- The `envs` section provides environment variables required by the `businessmap-mcp` server for its operation.

After configuring `mcp.json`, your LLM should be able to discover and call the tools exposed by this server (e.g., `Board Tools`, `Card Tools`). Refer to your LLM's documentation for specific instructions on how to load `mcp.json` configurations.

## Support and Contribution

If you find this project useful, please consider giving it a star ⭐ on GitHub!

### Reporting Issues

If you encounter any bugs or have feature requests, please open an issue on the [GitHub Issues page](https://github.com/godrix/businessmap-mcp/issues).

### Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add new feature'`).
4.  Push to your branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

### More Information

For more information about Businessmap Kanbanize, please visit the official website: [https://businessmap.io](https://businessmap.io)
```

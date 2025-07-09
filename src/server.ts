#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  MeToolsController,
  ApiLimitsToolsController,
  CardToolsController,
  CardCommentsToolsController,
  CardCoOwnersToolsController,
  CardLinkedCardsToolsController,
  CardSubtasksToolsController,
  BoardToolsController,
  ColumnsToolsController,
} from "./controllers/tools";
import "dotenv/config";

async function main() {
  // Server MCP
  const server = new McpServer({
    name: "mcp-bussinessmap",
    version: "1.0.1",
  });

  // Tools
  new MeToolsController(server);
  new ApiLimitsToolsController(server);
  new CardToolsController(server);
  new CardCommentsToolsController(server);
  new CardCoOwnersToolsController(server);
  new CardLinkedCardsToolsController(server);
  new CardSubtasksToolsController(server);
  new BoardToolsController(server);
  new ColumnsToolsController(server);

  // Resources

  // Prompts

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Businessmap MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

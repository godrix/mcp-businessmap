#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ApiLimitsToolsController,
  CardToolsController,
  CardCommentsToolsController,
  CardCoOwnersToolsController,
  CardLinkedCardsToolsController,
  CardSubtasksToolsController,
  BoardToolsController,
  ColumnToolsController,
  UserToolsController,
} from "./controllers/tools";
import { MeResourcesController } from "./controllers/resources";
import "dotenv/config";
import { env } from "./utils/env";
async function main() {
  // Server MCP
  const server = new McpServer({
    name: "mcp-bussinessmap",
    version: "1.2.0",
  });

  // Tools
  new ApiLimitsToolsController(server);
  new CardToolsController(server);
  new CardCommentsToolsController(server);
  new CardCoOwnersToolsController(server);
  new CardLinkedCardsToolsController(server);
  new CardSubtasksToolsController(server);
  new BoardToolsController(server);
  new ColumnToolsController(server);
  new UserToolsController(server);

  // Resources
  new MeResourcesController(server);

  // Prompts

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(
    `Businessmap MCP Server running on stdio - ${
      env.BUSINESSMAP_READ_ONLY ? "Read only" : "All operations available"
    }`
  );
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

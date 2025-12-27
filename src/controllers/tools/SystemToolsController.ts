import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export class SystemToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    // System tools - currently empty after removal of get-mcp-version
  }
}

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export class SystemToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    // Sistema de ferramentas - atualmente vazio após remoção do get-mcp-version
  }
}

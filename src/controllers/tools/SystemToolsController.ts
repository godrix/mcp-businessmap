import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { env } from "../../utils/env";

export class SystemToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetMcpVersionToolhandler();
  }

  private registerGetMcpVersionToolhandler(): void {
    this.server.tool(
      "get-mcp-version",
      "Get the MCP server version and information",
      {
        random_string: z.string().describe("Dummy parameter for no-parameter tools"),
      },
      async (): Promise<any> => {
        try {
          const serverVersion = await this.getServerVersion();
          const mcpSdkVersion = await this.getMcpSdkVersion();
          
          return {
            data: {
              server_name: "mcp-businessmap",
              server_version: serverVersion,
              mcp_sdk_version: mcpSdkVersion,
              node_version: process.version,
              platform: process.platform,
              architecture: process.arch,
              uptime_seconds: process.uptime(),
              memory_usage: process.memoryUsage(),
              environment: {
                read_only_mode: env.BUSINESSMAP_READ_ONLY,
                api_url: env.BUSINESSMAP_API_URL,
                api_key_masked: this.maskApiKey(env.BUSINESSMAP_API_KEY),
                default_workspace_id: env.BUSINESSMAP_DEFAULT_WORKSPACE_ID || "não configurado",
              }
            }
          };
        } catch (error) {
          return {
            error: {
              message: `Failed to get MCP version information: ${error instanceof Error ? error.message : 'Unknown error'}`,
              code: "SYSTEM_INFO_ERROR"
            }
          };
        }
      }
    );
  }


  private async getServerVersion(): Promise<string> {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageContent = fs.readFileSync(packagePath, 'utf8');
      const packageJson = JSON.parse(packageContent);
      return packageJson.version || "unknown";
    } catch {
      return "1.4.0"; // Fallback para a versão hardcoded do server.ts
    }
  }

  private async getMcpSdkVersion(): Promise<string> {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageContent = fs.readFileSync(packagePath, 'utf8');
      const packageJson = JSON.parse(packageContent);
      const mcpVersion = packageJson.dependencies?.["@modelcontextprotocol/sdk"] || 
                       packageJson.devDependencies?.["@modelcontextprotocol/sdk"] ||
                       "unknown";
      return mcpVersion;
    } catch {
      return "unknown";
    }
  }

  private maskApiKey(apiKey: string): string {
    if (!apiKey || apiKey.length < 8) {
      return apiKey ? "***" : "não configurado";
    }
    
    const start = apiKey.substring(0, 4);
    const end = apiKey.substring(apiKey.length - 4);
    const middle = '*'.repeat(Math.max(apiKey.length - 8, 3));
    
    return `${start}${middle}${end}`;
  }

}

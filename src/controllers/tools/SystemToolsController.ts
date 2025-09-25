import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { env } from "../../utils/env";

export class SystemToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetMcpVersionToolhandler();
    this.registerGetSystemInfoToolhandler();
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

  private registerGetSystemInfoToolhandler(): void {
    this.server.tool(
      "get-system-health",
      "Get system health and status information",
      {
        random_string: z.string().describe("Dummy parameter for no-parameter tools"),
      },
      async (): Promise<any> => {
        try {
          const memUsage = process.memoryUsage();
          const uptime = process.uptime();
          
          const requiredEnvVars = ['BUSINESSMAP_API_KEY', 'BUSINESSMAP_API_URL'];
          const optionalEnvVars = ['BUSINESSMAP_DEFAULT_WORKSPACE_ID', 'BUSINESSMAP_READ_ONLY'];
          
          const envStatus = [
            ...requiredEnvVars.map(varName => ({
              name: varName,
              required: true,
              configured: !!process.env[varName],
              value_length: process.env[varName]?.length || 0,
              masked_value: varName.includes('KEY') ? this.maskApiKey(process.env[varName] || '') : undefined
            })),
            ...optionalEnvVars.map(varName => ({
              name: varName,
              required: false,
              configured: !!process.env[varName],
              value_length: process.env[varName]?.length || 0,
              current_value: varName === 'BUSINESSMAP_DEFAULT_WORKSPACE_ID' ? 
                (process.env[varName] || 'não configurado') : 
                process.env[varName] || 'não configurado'
            }))
          ];

          const healthStatus = {
            status: "healthy",
            uptime_seconds: uptime,
            uptime_human: this.formatUptime(uptime),
            memory: {
              used_mb: Math.round(memUsage.heapUsed / 1024 / 1024),
              total_mb: Math.round(memUsage.heapTotal / 1024 / 1024),
              external_mb: Math.round(memUsage.external / 1024 / 1024),
              rss_mb: Math.round(memUsage.rss / 1024 / 1024)
            },
            environment_variables: envStatus,
            configuration: {
              read_only_mode: env.BUSINESSMAP_READ_ONLY,
              api_url: env.BUSINESSMAP_API_URL,
              default_workspace_id: env.BUSINESSMAP_DEFAULT_WORKSPACE_ID || "não configurado",
              node_env: process.env.NODE_ENV || "production"
            }
          };

          // Determinar status geral
          const hasRequiredEnv = envStatus
            .filter(env => env.required)
            .every(env => env.configured);
          if (!hasRequiredEnv) {
            healthStatus.status = "warning";
          }

          return {
            data: healthStatus
          };
        } catch (error) {
          return {
            error: {
              message: `Failed to get system health: ${error instanceof Error ? error.message : 'Unknown error'}`,
              code: "SYSTEM_HEALTH_ERROR"
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

  private formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${secs}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }
}

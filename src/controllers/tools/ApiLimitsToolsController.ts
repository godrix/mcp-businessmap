import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";

export class ApiLimitsToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetApiLimitsToolhandler();
  }

  private registerGetApiLimitsToolhandler(): void {
    this.server.tool(
      "get-api-limits",
      "Get the hourly and minutely limits for the api requests",
      async (): Promise<any> => {
        const response = await apiServices.getApiLimits();

        return handleApiResponse(response);
      }
    );
  }
}

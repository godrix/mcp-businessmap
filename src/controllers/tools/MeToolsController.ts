import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";

export class MeToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetActiveUserDataToolhandler();
  }

  private registerGetActiveUserDataToolhandler(): void {
    this.server.tool(
      "get-active-user-data",
      "Get the data about the active user",
      async (): Promise<any> => {
        const response = await apiServices.getMe();

        return handleApiResponse(response);
      }
    );
  }
}

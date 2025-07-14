import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";

export class UserToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetUserToolhandler();
  }

  private registerGetUserToolhandler(): void {
    this.server.tool(
      "get-user",
      "Get the details of a single user",
      {
        user_id: z
          .string()
          .describe("A user id for which you want to get the result."),
      },
      async ({ user_id }): Promise<any> => {
        const response = await apiServices.getUser(user_id);

        return handleApiResponse(response);
      }
    );
  }
}

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
    this.registerGetMeToolhandler();
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

  private registerGetMeToolhandler(): void {
    this.server.tool(
      "get-me",
      "Get the details of the current logged user",
      async (): Promise<any> => {
        const response = await apiServices.getMe();

        return handleApiResponse(response);
      }
    );
  }
}

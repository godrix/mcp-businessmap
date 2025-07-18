import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";

export class WorkspacesToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetWorkspaceToolhandler();
  }

  private registerGetWorkspaceToolhandler(): void {
    this.server.tool(
      "get-workspace",
      "Get the details of a sigle workspace",
      {
        workspace_id: z
          .string()
          .describe("A workspace id for which you want to get the result."),
      },
      async ({ workspace_id }): Promise<any> => {
        const response = await apiServices.getWorkspace(workspace_id);

        return handleApiResponse(response);
      }
    );
  }
}

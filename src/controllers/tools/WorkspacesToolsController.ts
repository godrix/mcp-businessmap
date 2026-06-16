import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";
import { env } from "../../utils/env";

export class WorkspacesToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetWorkspacesToolhandler();
    this.registerGetWorkspaceToolhandler();

    if (!env.BUSINESSMAP_READ_ONLY) {
      this.registerCreateWorkspaceToolhandler();
      this.registerUpdateWorkspaceToolhandler();
    }
  }

  private registerGetWorkspacesToolhandler(): void {
    this.server.tool(
      "get-workspaces",
      "Get a list of workspaces",
      {
        is_archived: z
          .number()
          .int()
          .min(0)
          .max(1)
          .optional()
          .describe("0 = active only, 1 = archived only"),
        if_assigned_to_boards: z
          .number()
          .int()
          .min(0)
          .max(1)
          .optional()
          .describe("1 = only workspaces with boards assigned to the user"),
      },
      async ({ is_archived, if_assigned_to_boards }): Promise<any> => {
        const response = await apiServices.getWorkspaces({
          is_archived,
          if_assigned_to_boards,
        });
        return handleApiResponse(response);
      }
    );
  }

  private registerGetWorkspaceToolhandler(): void {
    this.server.tool(
      "get-workspace",
      "Get the details of a single workspace",
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

  private registerCreateWorkspaceToolhandler(): void {
    this.server.tool(
      "create-workspace",
      "Create a new workspace",
      {
        name: z.string().describe("Workspace name"),
        type: z
          .number()
          .int()
          .min(1)
          .max(2)
          .optional()
          .describe("1 = team workspace, 2 = management workspace (default 1)"),
      },
      async ({ name, type }): Promise<any> => {
        const response = await apiServices.createWorkspace(name, type);
        return handleApiResponse(response);
      }
    );
  }

  private registerUpdateWorkspaceToolhandler(): void {
    this.server.tool(
      "update-workspace",
      "Update an existing workspace",
      {
        workspace_id: z.string().describe("Workspace ID"),
        name: z.string().optional().describe("New workspace name"),
        is_archived: z
          .number()
          .int()
          .min(0)
          .max(1)
          .optional()
          .describe("0 = active, 1 = archived"),
      },
      async ({ workspace_id, name, is_archived }): Promise<any> => {
        const response = await apiServices.updateWorkspace(workspace_id, {
          name,
          is_archived,
        });
        return handleApiResponse(response);
      }
    );
  }
}

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";
import { env } from "../../utils/env";

export class ColumnToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetColumnsToolhandler();
    this.registerGetColumnToolhandler();

    if (!env.BUSINESSMAP_READ_ONLY) {
      this.registerCreateColumnToolhandler();
      this.registerUpdateColumnToolhandler();
      this.registerDeleteColumnToolhandler();
    }
  }

  private registerGetColumnsToolhandler(): void {
    this.server.tool(
      "get-columns",
      "Get a list of the columns in a specified board.",
      {
        board_id: z
          .string()
          .describe("A board id for which you want to get the result."),
      },
      async ({ board_id }): Promise<any> => {
        const response = await apiServices.getColumns(board_id);
        return handleApiResponse(response);
      }
    );
  }

  private registerGetColumnToolhandler(): void {
    this.server.tool(
      "get-column",
      "Get the details of a single column",
      {
        board_id: z
          .string()
          .describe("A board id for which you want to get the result."),
        column_id: z.string().describe("Column id"),
      },
      async ({ board_id, column_id }): Promise<any> => {
        const response = await apiServices.getColumn(board_id, column_id);
        return handleApiResponse(response);
      }
    );
  }

  private registerCreateColumnToolhandler(): void {
    this.server.tool(
      "create-column",
      "Create a column in a board",
      {
        board_id: z.string().describe("Board ID"),
        position: z.number().describe("Column position"),
        name: z.string().describe("Column name"),
        workflow_id: z.number().optional().describe("Workflow ID"),
        section: z
          .number()
          .int()
          .min(1)
          .max(4)
          .optional()
          .describe("1=backlog, 2=requested, 3=progress, 4=done"),
        parent_column_id: z.number().optional().describe("Parent column ID"),
        description: z.string().optional().describe("Column description"),
        color: z.string().optional().describe("Column color"),
        limit: z.number().optional().describe("WIP limit"),
      },
      async ({
        board_id,
        position,
        name,
        workflow_id,
        section,
        parent_column_id,
        description,
        color,
        limit,
      }): Promise<any> => {
        const response = await apiServices.createColumn(board_id, {
          position,
          name,
          workflow_id,
          section,
          parent_column_id,
          description,
          color,
          limit,
        });
        return handleApiResponse(response);
      }
    );
  }

  private registerUpdateColumnToolhandler(): void {
    this.server.tool(
      "update-column",
      "Update an existing column",
      {
        board_id: z.string().describe("Board ID"),
        column_id: z.string().describe("Column ID"),
        position: z.number().optional().describe("Column position"),
        name: z.string().optional().describe("Column name"),
        section: z
          .number()
          .int()
          .min(1)
          .max(4)
          .optional()
          .describe("1=backlog, 2=requested, 3=progress, 4=done"),
        parent_column_id: z.number().optional().describe("Parent column ID"),
        description: z.string().optional().describe("Column description"),
        color: z.string().optional().describe("Column color"),
        limit: z.number().optional().describe("WIP limit"),
      },
      async ({
        board_id,
        column_id,
        position,
        name,
        section,
        parent_column_id,
        description,
        color,
        limit,
      }): Promise<any> => {
        const response = await apiServices.updateColumn(board_id, column_id, {
          position,
          name,
          section,
          parent_column_id,
          description,
          color,
          limit,
        });
        return handleApiResponse(response);
      }
    );
  }

  private registerDeleteColumnToolhandler(): void {
    this.server.tool(
      "delete-column",
      "Delete a column from a board",
      {
        board_id: z.string().describe("Board ID"),
        column_id: z.string().describe("Column ID"),
        move_cards_to_column_id: z
          .number()
          .optional()
          .describe("Column ID to move existing cards to"),
        move_metrics_to_column_id: z
          .number()
          .optional()
          .describe("Column ID to move metrics to"),
      },
      async ({
        board_id,
        column_id,
        move_cards_to_column_id,
        move_metrics_to_column_id,
      }): Promise<any> => {
        const response = await apiServices.deleteColumn(board_id, column_id, {
          move_cards_to_column_id,
          move_metrics_to_column_id,
        });
        return handleApiResponse(response);
      }
    );
  }
}

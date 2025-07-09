import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";

export class ColumnsToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetColumnsToolhandler();
    this.registerGetColumnToolhandler();
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
}

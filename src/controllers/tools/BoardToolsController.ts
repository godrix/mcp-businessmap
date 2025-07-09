import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";

export class BoardToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetBoardsToolhandler();
    this.registerGetBoardToolhandler();
  }

  private registerGetBoardsToolhandler(): void {
    this.server.tool(
      "get-boards",
      "Get a list of boards",
      async (): Promise<any> => {
        const response = await apiServices.getBoards();

        return handleApiResponse(response);
      }
    );
  }
  private registerGetBoardToolhandler(): void {
    this.server.tool(
      "get-board",
      "Get the details of a single board",
      {
        board_id: z
          .string()
          .describe("A board id for which you want to get the result."),
      },
      async ({ board_id }): Promise<any> => {
        const response = await apiServices.getBoard(board_id);

        return handleApiResponse(response);
      }
    );
  }
}

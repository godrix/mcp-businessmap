import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";

export class CardLinkedCardsToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetLinkedCardsToolhandler();
  }

  private registerGetLinkedCardsToolhandler(): void {
    this.server.tool(
      "get-linked-cards",
      "Get a list of the cards that are linked to a given card ordered by position.",
      {
        cardId: z.string().describe("A card id"),
      },
      async ({ cardId }): Promise<any> => {
        const response = await apiServices.getLinkedCards(cardId);

        return handleApiResponse(response);
      }
    );
  }
}

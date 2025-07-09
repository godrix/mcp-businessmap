import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";

export class CardCoOwnersToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetCardCoOwnersToolhandler();
    this.registerCheckCardCoOwnerToolhandler();
    this.registerAddCardCoOwnerToolhandler();
    this.registerRemoveCardCoOwnerToolhandler();
  }

  private registerGetCardCoOwnersToolhandler(): void {
    this.server.tool(
      "get-card-co-owners",
      "Get a card's co-owners",
      {
        cardId: z.string().describe("A card id"),
      },
      async ({ cardId }): Promise<any> => {
        const response = await apiServices.getCardCoOwners(cardId);

        return handleApiResponse(response);
      }
    );
  }
  private registerCheckCardCoOwnerToolhandler(): void {
    this.server.tool(
      "check-card-co-owner",
      "Check if a user is a co-owner of a card, the user is a co-owner of the card! Otherwise, you would have gotten a 404 error.",
      {
        cardId: z.string().describe("A card id"),
        userId: z.string().describe("A user id"),
      },
      async ({ cardId, userId }): Promise<any> => {
        const response = await apiServices.checkCardCoOwner(cardId, userId);

        return handleApiResponse(response);
      }
    );
  }
  private registerAddCardCoOwnerToolhandler(): void {
    this.server.tool(
      "add-card-co-owner",
      "Add a user as a co-owner of a card",
      {
        cardId: z.string().describe("A card id"),
        userId: z.string().describe("A user id"),
      },
      async ({ cardId, userId }): Promise<any> => {
        const response = await apiServices.addCardCoOwner(cardId, userId);

        return handleApiResponse(response);
      }
    );
  }
  private registerRemoveCardCoOwnerToolhandler(): void {
    this.server.tool(
      "remove-card-co-owner",
      "Remove a user as a co-owner of a card",
      {
        cardId: z.string().describe("A card id"),
        userId: z.string().describe("A user id"),
      },
      async ({ cardId, userId }): Promise<any> => {
        const response = await apiServices.removeCardCoOwner(cardId, userId);

        return handleApiResponse(response);
      }
    );
  }
}

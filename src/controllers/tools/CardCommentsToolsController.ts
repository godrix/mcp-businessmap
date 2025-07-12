import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";
import { env } from "../../utils/env";

export class CardCommentsToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetCardCommentsToolhandler();
    this.registerGetCardCommentToolhandler();
    if (!env.BUSINESSMAP_READ_ONLY) {
      this.registerAddCardCommentToolhandler();
      this.registerUpdateCardCommentToolhandler();
      this.registerDeleteCardCommentToolhandler();
    }
  }

  private registerGetCardCommentsToolhandler(): void {
    this.server.tool(
      "get-card-comments",
      "Get a card's comments",
      {
        cardId: z.string().describe("A card id"),
      },
      async ({ cardId }): Promise<any> => {
        const response = await apiServices.getCardComments(cardId);
        return handleApiResponse(response);
      }
    );
  }
  private registerAddCardCommentToolhandler(): void {
    this.server.tool(
      "add-card-comment",
      "Add a comment to a card",
      {
        cardId: z.string().describe("A card id"),
        comment: z.string().describe("Comment to be added"),
      },
      async ({ cardId, comment }): Promise<any> => {
        const response = await apiServices.addCardComment(cardId, comment);
        return handleApiResponse(response);
      }
    );
  }
  private registerGetCardCommentToolhandler(): void {
    this.server.tool(
      "get-card-comment",
      "Get the details of a comment for a card",
      {
        cardId: z.string().describe("A card id"),
        commentId: z.string().describe("A comment id"),
      },
      async ({ cardId, commentId }): Promise<any> => {
        const response = await apiServices.getCardComment(cardId, commentId);
        return handleApiResponse(response);
      }
    );
  }
  private registerUpdateCardCommentToolhandler(): void {
    this.server.tool(
      "update-card-comment",
      "Update the details of a comment for a card",
      {
        cardId: z.string().describe("A card id"),
        commentId: z.string().describe("A comment id"),
        comment: z.string().describe("A comment a updated"),
      },
      async ({ cardId, commentId, comment }): Promise<any> => {
        const response = await apiServices.updateCardComment(
          cardId,
          commentId,
          comment
        );
        return handleApiResponse(response);
      }
    );
  }
  private registerDeleteCardCommentToolhandler(): void {
    this.server.tool(
      "delete-card-comment",
      "Delete a comment for a card",
      {
        cardId: z.string().describe("A card id"),
        commentId: z.string().describe("A comment id"),
      },
      async ({ cardId, commentId }): Promise<any> => {
        const response = await apiServices.deleteCardComment(cardId, commentId);
        return handleApiResponse(response);
      }
    );
  }
}

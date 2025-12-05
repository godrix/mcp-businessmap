import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";
import { env } from "../../utils/env";
import { formatContentToHtml } from "../../utils/htmlFormatter";

export class CardCommentsToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetCardCommentsToolhandler();
    this.registerGetCardCommentToolhandler();
    if (!env.BUSINESSMAP_READ_ONLY) {
      this.registerAddCardCommentToolhandler();
      this.registerAddFormattedCardCommentToolhandler();
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

  /**
   * IMPORTANTE - Limitação da API:
   * A API de criação de comentários (addCardComment) aceita apenas texto simples (type: plain),
   * não aceita HTML. A API de atualização (updateCardComment) aceita HTML completo com estilos inline.
   * Por isso, a estratégia é criar primeiro com texto simples e imediatamente atualizar com HTML formatado.
   */
  private registerAddFormattedCardCommentToolhandler(): void {
    this.server.tool(
      "add-formatted-card-comment",
      "Add a formatted comment to a card with HTML rich formatting. Note: Due to API limitations, the comment is first created with plain text and then immediately updated with HTML formatting.",
      {
        cardId: z.string().describe("A card id"),
        content: z.string().describe("Comment content in plain text or markdown that will be formatted as HTML"),
      },
      async ({ cardId, content }): Promise<any> => {
        // Step 1: Create comment with plain text (API limitation)
        const createResponse = await apiServices.addCardComment(cardId, content);
        
        if (createResponse.error) {
          return handleApiResponse(createResponse);
        }

        if (!createResponse.data) {
          return handleApiResponse({
            error: {
              code: "NO_DATA",
              message: "Failed to create comment - no data returned",
              reference: "Check API response"
            }
          });
        }

        // Step 2: Extract comment_id from response
        const commentId = createResponse.data?.data?.comment_id?.toString();
        if (!commentId) {
          return handleApiResponse({
            error: {
              code: "NO_COMMENT_ID",
              message: "Failed to get comment_id from creation response",
              reference: "Check API response structure"
            }
          });
        }

        // Step 3: Format content as HTML
        const htmlContent = formatContentToHtml(content);

        // Step 4: Update comment immediately with HTML formatting
        const updateResponse = await apiServices.updateCardComment(
          cardId,
          commentId,
          htmlContent
        );

        if (updateResponse.error) {
          return handleApiResponse(updateResponse);
        }

        // Return success with comment_id
        return handleApiResponse({
          data: {
            comment_id: commentId,
            message: "Comment created and formatted successfully",
            ...updateResponse.data
          }
        });
      }
    );
  }
}

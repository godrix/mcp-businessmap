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
   * IMPORTANT - API Limitation:
   * The comment creation API (addCardComment) only accepts plain text (type: plain),
   * it does not accept HTML. The update API (updateCardComment) accepts complete HTML with inline styles.
   * 
   * This tool accepts HTML directly and internally:
   * 1. Extracts plain text from HTML to create the comment
   * 2. Waits for the returned comment_id
   * 3. Immediately updates with the original HTML
   * 
   * For the user, it appears as a single HTML creation operation.
   */
  private registerAddFormattedCardCommentToolhandler(): void {
    this.server.tool(
      "add-formatted-card-comment",
      "Add a formatted comment to a card with HTML rich formatting. Accepts HTML content directly. Internally creates a plain text comment first, then immediately updates it with the provided HTML formatting.",
      {
        cardId: z.string().describe("A card id"),
        htmlContent: z.string().describe("Comment content in HTML format (e.g., <h3>Title</h3><p>Paragraph</p>)"),
      },
      async ({ cardId, htmlContent }): Promise<any> => {
        // Step 1: Extract plain text from HTML for creation
        // Remove HTML tags to get plain text, preserving text content
        const plainText = htmlContent
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
          .replace(/&amp;/g, '&') // Replace &amp; with &
          .replace(/&lt;/g, '<') // Replace &lt; with <
          .replace(/&gt;/g, '>') // Replace &gt; with >
          .replace(/&quot;/g, '"') // Replace &quot; with "
          .replace(/&#39;/g, "'") // Replace &#39; with '
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();

        // If plain text is empty after extraction, use a placeholder
        const textForCreation = plainText || 'Comment';

        // Step 2: Create comment with plain text (API limitation)
        // This is done internally, user doesn't need to know
        const createResponse = await apiServices.addCardComment(cardId, textForCreation);
        
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

        // Step 3: Extract comment_id from response
        // The response structure is: { data: CardCommentResponsePost }
        // CardCommentResponsePost has: { data: DataResponsePost }
        // DataResponsePost has: { comment_id: number }
        let commentId: string | undefined;
        
        // Try primary path: createResponse.data.data.comment_id
        if (createResponse.data?.data?.comment_id) {
          commentId = createResponse.data.data.comment_id.toString();
        }
        // Try alternative path in case API structure is different
        else if ((createResponse.data as any)?.comment_id) {
          commentId = (createResponse.data as any).comment_id.toString();
        }
        
        if (!commentId) {
          return handleApiResponse({
            error: {
              code: "NO_COMMENT_ID",
              message: "Failed to get comment_id from creation response",
              reference: `Check API response structure. Response: ${JSON.stringify(createResponse.data)}`
            }
          });
        }

        // Step 4: Update comment immediately with HTML formatting
        // This happens internally, user sees it as a single operation
        const updateResponse = await apiServices.updateCardComment(
          cardId,
          commentId,
          htmlContent
        );

        if (updateResponse.error) {
          return handleApiResponse(updateResponse);
        }

        // Return success as if it was a single operation
        // User doesn't need to know about the two-step process
        return handleApiResponse({
          data: {
            comment_id: commentId,
            ...updateResponse.data
          }
        });
      }
    );
  }
}

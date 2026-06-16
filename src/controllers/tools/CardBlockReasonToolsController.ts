import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";
import { env } from "../../utils/env";

export class CardBlockReasonToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetBlockReasonsToolhandler();
    this.registerGetCardBlockReasonToolhandler();

    if (!env.BUSINESSMAP_READ_ONLY) {
      this.registerBlockCardToolhandler();
      this.registerUnblockCardToolhandler();
    }
  }

  private registerGetBlockReasonsToolhandler(): void {
    this.server.tool(
      "get-block-reasons",
      "Get the list of enabled block reasons available in the account",
      {},
      async (): Promise<any> => {
        const response = await apiServices.getBlockReasons();
        return handleApiResponse(response);
      }
    );
  }

  private registerGetCardBlockReasonToolhandler(): void {
    this.server.tool(
      "get-card-block-reason",
      "Get the block reason details for a card",
      {
        card_id: z.string().describe("Card ID"),
      },
      async ({ card_id }): Promise<any> => {
        const response = await apiServices.getCardBlockReason(card_id);
        return handleApiResponse(response);
      }
    );
  }

  private registerBlockCardToolhandler(): void {
    this.server.tool(
      "block-card",
      "Block a card with a block reason",
      {
        card_id: z.string().describe("Card ID"),
        reason_id: z.number().describe("Block reason ID from get-block-reasons"),
        comment: z
          .string()
          .optional()
          .describe("Comment explaining why the card is blocked"),
        users: z
          .string()
          .optional()
          .describe("Comma-separated user IDs if block depends on users"),
        date: z
          .string()
          .optional()
          .describe("Block date in YYYY-MM-DD format"),
      },
      async ({ card_id, reason_id, comment, users, date }): Promise<any> => {
        const response = await apiServices.blockCard(card_id, {
          reason_id,
          comment,
          users: users
            ? users.split(",").map((id) => parseInt(id.trim(), 10))
            : undefined,
          date,
        });
        return handleApiResponse(response);
      }
    );
  }

  private registerUnblockCardToolhandler(): void {
    this.server.tool(
      "unblock-card",
      "Remove the block from a card",
      {
        card_id: z.string().describe("Card ID"),
      },
      async ({ card_id }): Promise<any> => {
        const response = await apiServices.unblockCard(card_id);
        return handleApiResponse(response);
      }
    );
  }
}

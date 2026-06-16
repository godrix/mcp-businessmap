import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";
import { env } from "../../utils/env";

export class CardLinkedCardsToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetLinkedCardsToolhandler();

    if (!env.BUSINESSMAP_READ_ONLY) {
      this.registerLinkChildCardToolhandler();
      this.registerUnlinkChildCardToolhandler();
      this.registerLinkParentCardToolhandler();
      this.registerUnlinkParentCardToolhandler();
    }
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

  private registerLinkChildCardToolhandler(): void {
    this.server.tool(
      "link-child-card",
      "Make a card a child of a parent card",
      {
        parent_card_id: z.string().describe("Parent card ID"),
        child_card_id: z.string().describe("Child card ID"),
        linked_card_position: z
          .number()
          .optional()
          .describe("Position of the child in the parent's linked cards list"),
        card_position: z
          .number()
          .optional()
          .describe("Position of the parent in the child's linked cards list"),
        exceeding_reason: z
          .string()
          .optional()
          .describe("Reason if exceeding limits"),
      },
      async ({
        parent_card_id,
        child_card_id,
        linked_card_position,
        card_position,
        exceeding_reason,
      }): Promise<any> => {
        const response = await apiServices.linkChildCard(
          parent_card_id,
          child_card_id,
          { linked_card_position, card_position, exceeding_reason }
        );
        return handleApiResponse(response);
      }
    );
  }

  private registerUnlinkChildCardToolhandler(): void {
    this.server.tool(
      "unlink-child-card",
      "Remove the parent-child link between two cards",
      {
        parent_card_id: z.string().describe("Parent card ID"),
        child_card_id: z.string().describe("Child card ID"),
        exceeding_reason: z
          .string()
          .optional()
          .describe("Reason if exceeding limits"),
      },
      async ({ parent_card_id, child_card_id, exceeding_reason }): Promise<any> => {
        const response = await apiServices.unlinkChildCard(
          parent_card_id,
          child_card_id,
          exceeding_reason
        );
        return handleApiResponse(response);
      }
    );
  }

  private registerLinkParentCardToolhandler(): void {
    this.server.tool(
      "link-parent-card",
      "Make a card a parent of a child card",
      {
        child_card_id: z.string().describe("Child card ID"),
        parent_card_id: z.string().describe("Parent card ID"),
        linked_card_position: z
          .number()
          .optional()
          .describe("Position of the parent in the child's linked cards list"),
        card_position: z
          .number()
          .optional()
          .describe("Position of the child in the parent's linked cards list"),
        exceeding_reason: z
          .string()
          .optional()
          .describe("Reason if exceeding limits"),
      },
      async ({
        child_card_id,
        parent_card_id,
        linked_card_position,
        card_position,
        exceeding_reason,
      }): Promise<any> => {
        const response = await apiServices.linkParentCard(
          child_card_id,
          parent_card_id,
          { linked_card_position, card_position, exceeding_reason }
        );
        return handleApiResponse(response);
      }
    );
  }

  private registerUnlinkParentCardToolhandler(): void {
    this.server.tool(
      "unlink-parent-card",
      "Remove the parent-child link between two cards",
      {
        child_card_id: z.string().describe("Child card ID"),
        parent_card_id: z.string().describe("Parent card ID"),
        exceeding_reason: z
          .string()
          .optional()
          .describe("Reason if exceeding limits"),
      },
      async ({ child_card_id, parent_card_id, exceeding_reason }): Promise<any> => {
        const response = await apiServices.unlinkParentCard(
          child_card_id,
          parent_card_id,
          exceeding_reason
        );
        return handleApiResponse(response);
      }
    );
  }
}

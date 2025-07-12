import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";
import { env } from "../../utils/env";
export class CardToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetCardToolhandler();
    this.registerGetCardsToolhandler();

    if (!env.BUSINESSMAP_READ_ONLY) {
      this.registerCreateCardToolhandler();
      this.registerUpdateCardToolhandler();
      this.registerDeleteCardToolhandler();
    }
  }

  private registerGetCardToolhandler(): void {
    this.server.tool(
      "get-card",
      "Get the details of a single card",
      {
        cardId: z.string().describe("A card id"),
      },
      async ({ cardId }): Promise<any> => {
        const response = await apiServices.getCard(cardId);

        return handleApiResponse(response);
      }
    );
  }
  private registerGetCardsToolhandler(): void {
    this.server.tool(
      "get-cards",
      "Get a list of cards matching some optional criteria",
      {
        state: z
          .string()
          .describe(
            "The state value of cards that you want to get. By default it's the active state. Available values : active, archived, discarded"
          )
          .default("active"),
        board_ids: z
          .string()
          .describe(
            "A list of the board ids for which you want to get the results. Separated by Virgula Example 123,888"
          )
          .optional(),
        owner_user_ids: z
          .string()
          .describe(
            "A list of the user ids of assignees for which you want to get the results. Separated by Virgula Example 123,888"
          )
          .optional(),
        card_ids: z
          .string()
          .describe(
            "A list of the card ids that you want to get. Separated by Virgula Example 123,888"
          )
          .optional(),
        is_blocked: z
          .number()
          .default(0)
          .describe(
            "When set to 1 you will only get blocked cards. When set to 0 you will only get non blocked cards."
          ),
      },
      async ({
        board_ids,
        is_blocked,
        owner_user_ids,
        card_ids,
        state,
      }): Promise<any> => {
        const response = await apiServices.getCards({
          state,
          board_ids,
          owner_user_ids,
          is_blocked,
          card_ids,
        });

        return handleApiResponse(response);
      }
    );
  }
  private registerCreateCardToolhandler(): void {
    this.server.tool(
      "create-card",
      "Create a card",
      {
        board_id: z.number().describe("Board id"),
        workflow_id: z.number().describe("Workflow id"),
        lane_id: z.number().describe("Lane id"),
        column_id: z.number().describe("Column id"),
        title: z.string().describe("Card title"),
        description: z.string().describe("Card description"),
        priority: z.number().describe("Card priority'"),
        assignee_ids: z
          .string()
          .describe("Comma-separated list of assignee Ids"),
      },
      async ({
        board_id,
        title,
        description,
        assignee_ids,
        priority,
        column_id,
        lane_id,
        workflow_id,
      }): Promise<any> => {
        const response = await apiServices.createCard(
          board_id,
          title,
          description,
          assignee_ids,
          priority,
          column_id,
          lane_id,
          workflow_id
        );

        return handleApiResponse(response);
      }
    );
  }
  private registerUpdateCardToolhandler(): void {
    this.server.tool(
      "update-card",
      "Update an existing card",
      {
        card_id: z.string().describe("Board id"),
        title: z.string().describe("Card title"),
        description: z.string().describe("Card description"),
        column_id: z.number().describe("Column id"),
        priority: z.number().describe("Card priority'"),
        lane_id: z.number().describe("Lane id"),
        assignee_ids: z
          .string()
          .describe("Comma-separated list of assignee Ids"),
      },
      async ({
        card_id,
        title,
        description,
        assignee_ids,
        priority,
        column_id,
        lane_id,
      }): Promise<any> => {
        const response = await apiServices.updateCard(
          card_id,
          title,
          description,
          assignee_ids,
          priority,
          column_id,
          lane_id
        );

        return handleApiResponse(response);
      }
    );
  }
  private registerDeleteCardToolhandler(): void {
    this.server.tool(
      "delete-card",
      "Delete a card",
      {
        card_id: z.string().describe("A card id"),
      },
      async ({ card_id }): Promise<any> => {
        const response = await apiServices.deleteCard(card_id);

        return handleApiResponse(response);
      }
    );
  }
}

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";

export class CardToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetCardToolhandler();
    this.registerGetCardsToolhandler();
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
}

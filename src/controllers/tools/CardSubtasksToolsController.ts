import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";
import { env } from "../../utils/env";
import { formatContentToHtml } from "../../utils/htmlFormatter";

export class CardSubtasksToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetCardSubtasksToolhandler();
    this.registerGetCardSubtaskToolhandler();
    if (!env.BUSINESSMAP_READ_ONLY) {
      this.registerAddCardSubtaskToolhandler();
      this.registerAddFormattedCardSubtaskToolhandler();
      this.registerUpdateCardSubtaskToolhandler();
      this.registerUpdateFormattedCardSubtaskToolhandler();
      this.registerDeleteCardSubtaskToolhandler();
    }
  }

  private registerGetCardSubtasksToolhandler(): void {
    this.server.tool(
      "get-card-subtasks",
      "Get a card's subtasks",
      {
        cardId: z.string().describe("A card id"),
      },
      async ({ cardId }): Promise<any> => {
        const response = await apiServices.getCardSubtasks(cardId);

        return handleApiResponse(response);
      }
    );
  }
  private registerAddCardSubtaskToolhandler(): void {
    this.server.tool(
      "add-card-subtask",
      "Add a subtask to a card",
      {
        cardId: z.string().describe("A card id"),
        description: z.string().describe("A description the subtask"),
      },
      async ({ cardId, description }): Promise<any> => {
        const response = await apiServices.addCardSubtask(cardId, description);

        return handleApiResponse(response);
      }
    );
  }
  private registerGetCardSubtaskToolhandler(): void {
    this.server.tool(
      "get-card-subtask",
      "Get the details of a subtask for a card",
      {
        cardId: z.string().describe("A card id"),
        subtaskId: z.string().describe("A subtask id"),
      },
      async ({ cardId, subtaskId }): Promise<any> => {
        const response = await apiServices.getCardSubtask(cardId, subtaskId);

        return handleApiResponse(response);
      }
    );
  }
  private registerUpdateCardSubtaskToolhandler(): void {
    this.server.tool(
      "update-card-subtask",
      "Update the details of a subtask for a card",
      {
        cardId: z.string().describe("A card id"),
        subtaskId: z.string().describe("A subtask id"),
        description: z.string().describe("A description the subtask"),
        isFinished: z.number().min(0).max(1),
      },
      async ({ cardId, subtaskId, description, isFinished }): Promise<any> => {
        const response = await apiServices.updateCardSubtask(
          cardId,
          subtaskId,
          description,
          isFinished
        );

        return handleApiResponse(response);
      }
    );
  }
  private registerDeleteCardSubtaskToolhandler(): void {
    this.server.tool(
      "delete-card-subtask",
      "Delete a subtask for a card",
      {
        cardId: z.string().describe("A card id"),
        subtaskId: z.string().describe("A subtask id"),
      },
      async ({ cardId, subtaskId }): Promise<any> => {
        const response = await apiServices.deleteCardSubtask(cardId, subtaskId);

        return handleApiResponse(response);
      }
    );
  }

  /**
   * Diferente dos comentários, as subtasks aceitam HTML diretamente na criação e atualização.
   * Não é necessário criar primeiro e atualizar depois - pode criar diretamente com HTML formatado.
   */
  private registerAddFormattedCardSubtaskToolhandler(): void {
    this.server.tool(
      "add-formatted-card-subtask",
      "Add a formatted subtask to a card with HTML rich formatting. Unlike comments, subtasks accept HTML directly in creation.",
      {
        cardId: z.string().describe("A card id"),
        content: z.string().describe("Subtask content in plain text or markdown that will be formatted as HTML"),
        isFinished: z.number().min(0).max(1).optional().default(0).describe("Whether the subtask is finished (0 = not finished, 1 = finished)"),
      },
      async ({ cardId, content, isFinished = 0 }): Promise<any> => {
        // Format content as HTML (subtasks accept HTML directly)
        const htmlContent = formatContentToHtml(content);

        // Create subtask directly with HTML formatting
        const response = await apiServices.addCardSubtask(
          cardId,
          htmlContent,
          undefined,
          isFinished
        );

        return handleApiResponse(response);
      }
    );
  }

  /**
   * Update subtask with HTML formatting.
   * Subtasks accept HTML directly in updates, no need for create-then-update strategy.
   */
  private registerUpdateFormattedCardSubtaskToolhandler(): void {
    this.server.tool(
      "update-formatted-card-subtask",
      "Update a subtask with HTML rich formatting. Unlike comments, subtasks accept HTML directly in updates.",
      {
        cardId: z.string().describe("A card id"),
        subtaskId: z.string().describe("A subtask id"),
        content: z.string().describe("Subtask content in plain text or markdown that will be formatted as HTML"),
        isFinished: z.number().min(0).max(1).optional().describe("Whether the subtask is finished (0 = not finished, 1 = finished)"),
      },
      async ({ cardId, subtaskId, content, isFinished }): Promise<any> => {
        // Format content as HTML
        const htmlContent = formatContentToHtml(content);

        // Update subtask with HTML formatting
        const response = await apiServices.updateCardSubtask(
          cardId,
          subtaskId,
          htmlContent,
          isFinished
        );

        return handleApiResponse(response);
      }
    );
  }
}

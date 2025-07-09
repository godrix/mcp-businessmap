import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";

export class CardSubtasksToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetCardSubtasksToolhandler();
    this.registerAddCardSubtaskToolhandler();
    this.registerGetCardSubtaskToolhandler();
    this.registerUpdateCardSubtaskToolhandler();
    this.registerDeleteCardSubtaskToolhandler();
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
}

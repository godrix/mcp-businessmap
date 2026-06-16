import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiServices } from "../../services/ApiService";

export class ContextResourcesController {
  constructor(private server: McpServer) {
    this.registerResources();
  }

  private registerResources(): void {
    this.registerApiLimitsResource();
    this.registerBoardResource();
    this.registerBoardStructureResource();
    this.registerWorkspaceResource();
  }

  private registerApiLimitsResource(): void {
    this.server.registerResource(
      "api-limits",
      "api://limits",
      {
        title: "API Limits",
        description: "Hourly and minutely API request limits for the current account",
        mimeType: "application/json",
      },
      async (uri) => {
        const response = await apiServices.getApiLimits();
        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify(response.data ?? response.error ?? {}),
            },
          ],
        };
      }
    );
  }

  private registerBoardResource(): void {
    this.server.registerResource(
      "board",
      new ResourceTemplate("board://{boardId}", { list: undefined }),
      {
        title: "Board",
        description: "Details of a BusinessMap board",
        mimeType: "application/json",
      },
      async (uri, { boardId }) => {
        const response = await apiServices.getBoard(String(boardId));
        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify(response.data ?? response.error ?? {}),
            },
          ],
        };
      }
    );
  }

  private registerBoardStructureResource(): void {
    this.server.registerResource(
      "board-structure",
      new ResourceTemplate("board://{boardId}/structure", { list: undefined }),
      {
        title: "Board Structure",
        description: "Current board structure including workflows, lanes, columns and cell limits",
        mimeType: "application/json",
      },
      async (uri, { boardId }) => {
        const response = await apiServices.getBoardStructure(String(boardId));
        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify(response.data ?? response.error ?? {}),
            },
          ],
        };
      }
    );
  }

  private registerWorkspaceResource(): void {
    this.server.registerResource(
      "workspace",
      new ResourceTemplate("workspace://{workspaceId}", { list: undefined }),
      {
        title: "Workspace",
        description: "Details of a BusinessMap workspace",
        mimeType: "application/json",
      },
      async (uri, { workspaceId }) => {
        const response = await apiServices.getWorkspace(String(workspaceId));
        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify(response.data ?? response.error ?? {}),
            },
          ],
        };
      }
    );
  }
}

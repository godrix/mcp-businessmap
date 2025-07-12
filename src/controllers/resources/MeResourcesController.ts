import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiServices } from "../../services/ApiService";

export class MeResourcesController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerMeResourcehandler();
  }

  private registerMeResourcehandler(): void {
    this.server.registerResource(
      "user-info",
      "user://me",
      {
        title: "User Info",
        description: "Get the data about the active user",
        mimeType: "text/json",
      },
      async (uri) => {
        let textData = "";
        const response = await apiServices.getMe();

        if (response.data) {
          textData = JSON.stringify(response.data);
        }

        return {
          contents: [
            {
              uri: uri.href,
              text: textData,
            },
          ],
        };
      }
    );
  }
}

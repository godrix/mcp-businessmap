import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { apiServices } from "../../services/ApiService";
import { handleApiResponse } from "../../utils/apiResponseHandler";
import { env } from "../../utils/env";

export class LaneToolsController {
  constructor(private server: McpServer) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetLanesToolhandler();
    this.registerGetLaneToolhandler();
    
    if (!env.BUSINESSMAP_READ_ONLY) {
      this.registerCreateLaneToolhandler();
      this.registerUpdateLaneToolhandler();
      this.registerDeleteLaneToolhandler();
    }
  }

  private registerGetLanesToolhandler(): void {
    this.server.tool(
      "get-lanes",
      "Get a list of lanes in a specified board",
      {
        board_id: z
          .string()
          .describe("A board id for which you want to get the lanes"),
      },
      async ({ board_id }): Promise<any> => {
        const response = await apiServices.getLanes(board_id);

        return handleApiResponse(response);
      }
    );
  }

  private registerGetLaneToolhandler(): void {
    this.server.tool(
      "get-lane",
      "Get the details of a single lane",
      {
        lane_id: z.string().describe("Lane id"),
      },
      async ({ lane_id }): Promise<any> => {
        const response = await apiServices.getLane(lane_id);

        return handleApiResponse(response);
      }
    );
  }

  private registerCreateLaneToolhandler(): void {
    this.server.tool(
      "create-lane",
      "Create a lane",
      {
        board_id: z.string().describe("Board id"),
        workflow_id: z.number().describe("Workflow id"),
        position: z.number().describe("Lane position"),
        name: z.string().describe("Lane name"),
        description: z.string().optional().describe("Lane description"),
        color: z.string().describe("Lane color"),
      },
      async ({
        board_id,
        workflow_id,
        position,
        name,
        description,
        color,
      }): Promise<any> => {
        const response = await apiServices.createLane(board_id, {
          workflow_id,
          position,
          name,
          description,
          color,
        });

        return handleApiResponse(response);
      }
    );
  }

  private registerUpdateLaneToolhandler(): void {
    this.server.tool(
      "update-lane",
      "Update an existing lane",
      {
        lane_id: z.string().describe("Lane id"),
        workflow_id: z.number().optional().describe("Workflow id"),
        position: z.number().optional().describe("Lane position"),
        name: z.string().optional().describe("Lane name"),
        description: z.string().optional().describe("Lane description"),
        color: z.string().optional().describe("Lane color"),
      },
      async ({
        lane_id,
        workflow_id,
        position,
        name,
        description,
        color,
      }): Promise<any> => {
        const updateParams: any = {};
        if (workflow_id !== undefined) updateParams.workflow_id = workflow_id;
        if (position !== undefined) updateParams.position = position;
        if (name !== undefined) updateParams.name = name;
        if (description !== undefined) updateParams.description = description;
        if (color !== undefined) updateParams.color = color;

        const response = await apiServices.updateLane(lane_id, updateParams);

        return handleApiResponse(response);
      }
    );
  }

  private registerDeleteLaneToolhandler(): void {
    this.server.tool(
      "delete-lane",
      "Delete a lane",
      {
        lane_id: z.string().describe("Lane id"),
      },
      async ({ lane_id }): Promise<any> => {
        const response = await apiServices.deleteLane(lane_id);

        return handleApiResponse(response);
      }
    );
  }
}

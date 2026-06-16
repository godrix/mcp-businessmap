import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export class WorkflowPromptsController {
  constructor(private server: McpServer) {
    this.registerPrompts();
  }

  private registerPrompts(): void {
    this.registerCreateCardPrompt();
    this.registerLinkCardsPrompt();
    this.registerBlockCardPrompt();
  }

  private registerCreateCardPrompt(): void {
    this.server.prompt(
      "create-card-workflow",
      "Guide to create a card in BusinessMap with the correct board, column and lane context",
      {
        board_id: z.string().describe("Target board ID"),
        title: z.string().describe("Card title"),
        description: z.string().optional().describe("Card description"),
        column_id: z.string().optional().describe("Target column ID"),
        lane_id: z.string().optional().describe("Target lane ID"),
      },
      async ({ board_id, title, description, column_id, lane_id }) => {
        const promptText = `# Create Card in BusinessMap

## Overview

Workflow to create a card with the correct board structure context.

## Steps

1. Load board context with resource \`board://${board_id}/structure\` or tools \`get-board\`, \`get-columns\` and \`get-lanes\`.
2. If column_id or lane_id are missing, pick valid IDs from the board structure.
3. Create the card with \`create-card\` (single) or \`create-cards-many\` (batch JSON).
4. Confirm creation by calling \`get-card\` with the returned card ID.

## Required Fields for create-card

- board_id: ${board_id}
- workflow_id: from board structure (cards workflow)
- column_id: ${column_id ?? "(resolve from get-columns)"}
- lane_id: ${lane_id ?? "(resolve from get-lanes)"}
- title: ${title}
- description: ${description ?? ""}
- priority: choose 1-5 based on urgency (default 3)
- assignee_ids: optional comma-separated user IDs

## Verification Checklist

- [ ] Board exists and user has access
- [ ] column_id and lane_id belong to the target board
- [ ] Title is non-empty
- [ ] Card was created and card_id returned`;

        return {
          messages: [
            {
              role: "user",
              content: { type: "text", text: promptText },
            },
          ],
        };
      }
    );
  }

  private registerLinkCardsPrompt(): void {
    this.server.prompt(
      "link-cards-workflow",
      "Guide to link parent and child cards in BusinessMap",
      {
        parent_card_id: z.string().describe("Parent card ID"),
        child_card_id: z.string().describe("Child card ID"),
        link_type: z
          .enum(["child", "parent"])
          .optional()
          .describe("Link direction: child (parent→child) or parent (child→parent). Default: child"),
      },
      async ({ parent_card_id, child_card_id, link_type }) => {
        const resolvedLinkType = link_type ?? "child";
        const promptText = `# Link Cards in BusinessMap

## Overview

Workflow to create parent-child relationships between cards.

## Context

- Parent card ID: ${parent_card_id}
- Child card ID: ${child_card_id}
- Link type: ${resolvedLinkType}

## Steps

1. Validate both cards exist with \`get-card\` for each ID.
2. Review current links with \`get-linked-cards\` on the parent card.
3. Create the link:
   - For parent→child: use \`link-child-card\` with parent_card_id=${parent_card_id} and child_card_id=${child_card_id}
   - For child→parent: use \`link-parent-card\` with child_card_id=${child_card_id} and parent_card_id=${parent_card_id}
4. Confirm with \`get-linked-cards\` on the parent card.

## To Remove a Link

- \`unlink-child-card\` (parent + child IDs) or \`unlink-parent-card\` (child + parent IDs)

## Verification Checklist

- [ ] Both cards exist and are active
- [ ] Link does not create a cycle (check existing parent/child graph)
- [ ] Link confirmed in get-linked-cards response`;

        return {
          messages: [
            {
              role: "user",
              content: { type: "text", text: promptText },
            },
          ],
        };
      }
    );
  }

  private registerBlockCardPrompt(): void {
    this.server.prompt(
      "block-card-workflow",
      "Guide to block or unblock a card in BusinessMap with a block reason",
      {
        card_id: z.string().describe("Card ID to block or unblock"),
        action: z
          .enum(["block", "unblock"])
          .optional()
          .describe("Whether to block or unblock the card. Default: block"),
        reason_id: z.string().optional().describe("Block reason ID (required when blocking)"),
        comment: z.string().optional().describe("Comment explaining the block reason"),
      },
      async ({ card_id, action, reason_id, comment }) => {
        const resolvedAction = action ?? "block";
        const promptText = `# ${resolvedAction === "block" ? "Block" : "Unblock"} Card in BusinessMap

## Overview

Workflow to ${resolvedAction} a card using block reasons.

## Context

- Card ID: ${card_id}
- Action: ${resolvedAction}
${reason_id ? `- Reason ID: ${reason_id}` : ""}
${comment ? `- Comment: ${comment}` : ""}

## Steps

${
  resolvedAction === "block"
    ? `1. List available block reasons with \`get-block-reasons\`.
2. Pick a valid reason_id${reason_id ? ` (suggested: ${reason_id})` : ""}.
3. Block the card with \`block-card\`:
   - card_id: ${card_id}
   - reason_id: (from step 1)
   - comment: ${comment ?? "(explain why the card is blocked)"}
4. Verify with \`get-card-block-reason\`.`
    : `1. Check current block status with \`get-card-block-reason\`.
2. Unblock with \`unblock-card\` and card_id: ${card_id}.
3. Confirm the card is no longer blocked via \`get-card\` (is_blocked should be 0).`
}

## Verification Checklist

- [ ] Card exists
${resolvedAction === "block" ? "- [ ] A valid block reason was selected\n- [ ] Comment explains the block clearly" : "- [ ] Card was previously blocked\n- [ ] Card is active after unblock"}`;

        return {
          messages: [
            {
              role: "user",
              content: { type: "text", text: promptText },
            },
          ],
        };
      }
    );
  }
}

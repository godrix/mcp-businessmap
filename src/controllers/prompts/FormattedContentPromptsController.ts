import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export class FormattedContentPromptsController {
  constructor(private server: McpServer) {
    this.registerPrompts();
  }

  private registerPrompts(): void {
    this.registerAddFormattedCardCommentPrompt();
    this.registerAddFormattedCardSubtaskPrompt();
  }

  private registerAddFormattedCardCommentPrompt(): void {
    this.server.prompt(
      "add-formatted-card-comment",
      "Add a formatted comment to a BusinessMap card with HTML rich formatting, line breaks, styling, and emojis",
      {
        cardId: z.string().describe("The card ID where the comment will be added"),
        htmlContent: z.string().describe("The comment content in HTML format (e.g., <h3>Title</h3><p>Paragraph</p>)"),
      },
      async ({ cardId, htmlContent }) => {
        const promptText = `# Add Formatted Comment to BusinessMap

## Overview

Command to add formatted comments with line breaks, styling, and emojis to BusinessMap cards.

## IMPORTANT - How It Works

The \`mcp_businessmap_add-formatted-card-comment\` tool accepts **HTML directly** as input. Internally, it:
1. Extracts plain text from HTML to create the comment (API limitation)
2. Waits for the returned \`comment_id\`
3. Immediately updates with the provided HTML

**For the user, it appears as a single HTML creation operation.**

## How to Use

**Simply use the \`mcp_businessmap_add-formatted-card-comment\` tool with:**
- \`cardId\`: Card ID
- \`htmlContent\`: Formatted HTML content

The tool performs the entire two-step process internally, transparently.

## Supported HTML Tags

- \`<h3>\` for main titles (can combine with emojis)
- \`<p>\` for paragraphs and line breaks
- \`<strong>\` for bold text
- \`<em>\` for italic text
- \`<u>\` for underlined text
- \`<code>\` for inline code
- \`<hr>\` for horizontal separator lines
- \`<ul>\` and \`<li>\` for unordered lists
- \`<ol>\` and \`<li>\` for ordered (numbered) lists
- \`<a href="">\` for clickable links
- \`<blockquote>\` for highlighted quotes
- \`<pre>\` for pre-formatted text (multiple lines)
- \`<p style="">\` for inline styles (color, background-color, font-size, etc)
- Emojis are fully supported: 🚀 ⚠️ 💡 ✨ 🔥 👍 ❌ ⭐ 📋 ✏️ 📌 💻 🎯 🔗 🎨 ✅ 📝

## Usage Example

Use the \`mcp_businessmap_add-formatted-card-comment\` tool with:
- cardId: ${cardId}
- htmlContent: ${htmlContent}

The tool will return the \`comment_id\` of the created and formatted comment.`;

        return {
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: promptText,
              },
            },
          ],
        };
      }
    );
  }

  private registerAddFormattedCardSubtaskPrompt(): void {
    this.server.prompt(
      "add-formatted-card-subtask",
      "Add or edit a formatted subtask to a BusinessMap card with HTML rich formatting, line breaks, styling, and emojis",
      {
        cardId: z.string().describe("The card ID where the subtask will be added or updated"),
        subtaskId: z.string().optional().describe("The subtask ID if updating an existing subtask (leave empty for new subtask)"),
        content: z.string().describe("The subtask content in plain text or markdown that will be formatted as HTML"),
        isFinished: z.string().optional().describe("Whether the subtask is finished ('0' = not finished, '1' = finished)"),
      },
      async ({ cardId, subtaskId, content, isFinished }) => {
        const isUpdate = !!subtaskId;
        const isFinishedNum = isFinished ? parseInt(isFinished, 10) : undefined;
        const promptText = `# Add/Edit Formatted Subtask in BusinessMap

## Overview

Command to add or edit formatted subtasks with line breaks, styling, and emojis to BusinessMap cards.

## IMPORTANT - Difference from Comments

Unlike comments, subtasks **already accept HTML directly** in both creation and update, so there's no need to create first and then update.

**Subtask Advantages:**
- ✅ **Subtasks accept HTML directly** in creation (no need to create plain text and then update)
- ✅ **Less complex**: single step to create or update
- ✅ Same HTML tags and emojis supported

## Steps

${isUpdate ? `1. Receive from user the cardId, subtaskId and the subtask content to be updated` : `1. Receive from user the cardId and the subtask content to be added`}
2. Receive or format the subtask content
3. Format the content in HTML using supported tags:
   - \`<h3>\` for main titles (can combine with emojis)
   - \`<p>\` for paragraphs and line breaks
   - \`<strong>\` for bold text
   - \`<em>\` for italic text
   - \`<u>\` for underlined text
   - \`<code>\` for inline code
   - \`<hr>\` for horizontal separator lines
   - \`<ul>\` and \`<li>\` for unordered lists
   - \`<ol>\` and \`<li>\` for ordered (numbered) lists
   - \`<a href="">\` for clickable links
   - \`<blockquote>\` for highlighted quotes
   - \`<pre>\` for pre-formatted text (multiple lines)
   - \`<p style="">\` for inline styles (color, background-color, font-size, etc)
   - Emojis are fully supported: 🚀 ⚠️ 💡 ✨ 🔥 👍 ❌ ⭐ 📋 ✏️ 📌 💻 🎯 🔗 🎨 ✅ 📝
${isUpdate ? `4. To **update** an existing subtask:
   - Use \`mcp_businessmap_update-card-subtask\` with HTML formatted description
   - Provide cardId, subtaskId, description and isFinished (0 or 1)` : `4. To **create** a new subtask:
   - Use \`mcp_businessmap_add-card-subtask\` with HTML formatted description
   - Provide cardId and description`}
5. Use emojis strategically to improve readability and highlight important information
6. Confirm to user that the subtask was created/updated with formatting

## Verification Checklist

- [ ] The provided cardId is a valid number
- [ ] ${isUpdate ? "The subtaskId was provided and is valid" : "The subtask will be created as new"}
- [ ] The HTML is well formatted with valid and supported tags
- [ ] All important information is organized in separate paragraphs
- [ ] Titles use h3 tag and appropriate emojis for highlighting
- [ ] Important sections are separated with hr (horizontal line)
- [ ] Lists are used when appropriate to organize multiple items
- [ ] Emojis are used strategically to improve visualization
- [ ] Inline styles are used when necessary to highlight critical information
- [ ] The final response confirms success and presents the subtask_id
- [ ] The isFinished parameter was set correctly (0 = not finished, 1 = finished)

## Provided Parameters

- cardId: ${cardId}
${isUpdate ? `- subtaskId: ${subtaskId}` : ""}
- content: ${content}
${isFinishedNum !== undefined ? `- isFinished: ${isFinishedNum}` : ""}

Use the available MCP tools to ${isUpdate ? "update" : "create"} the formatted subtask.`;

        return {
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: promptText,
              },
            },
          ],
        };
      }
    );
  }
}


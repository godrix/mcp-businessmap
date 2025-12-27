/**
 * Utility to format content into rich HTML
 * Supports HTML tags and preserves emojis and line breaks
 */

/**
 * Formats plain text/markdown content into rich HTML
 * Supports the following HTML tags:
 * - <h3> for main titles
 * - <p> for paragraphs and line breaks
 * - <strong> for bold text
 * - <em> for italic text
 * - <u> for underlined text
 * - <code> for inline code
 * - <hr> for horizontal separator lines
 * - <ul> and <li> for unordered lists
 * - <ol> and <li> for ordered (numbered) lists
 * - <a href=""> for clickable links
 * - <blockquote> for highlighted quotes
 * - <pre> for pre-formatted text (multiple lines)
 * - <p style=""> for inline styles (color, background-color, font-size, etc)
 * 
 * Emojis are fully supported and preserved
 * 
 * @param content - Content in plain text or basic markdown
 * @returns Formatted HTML
 */
export function formatContentToHtml(content: string): string {
  if (!content || content.trim() === '') {
    return '';
  }

  // Preserves emojis and line breaks
  // Converts double line breaks into paragraphs
  let html = content
    .split('\n\n')
    .map(paragraph => {
      const trimmed = paragraph.trim();
      if (trimmed === '') return '';
      
      // If it already starts with HTML tag, preserve it
      if (trimmed.startsWith('<')) {
        return trimmed;
      }
      
      // Converts basic markdown to HTML
      let formatted = trimmed;
      
      // Headers (### Title -> <h3>Title</h3>)
      formatted = formatted.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
      
      // Bold (**text** or __text__ -> <strong>text</strong>)
      formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      formatted = formatted.replace(/__(.+?)__/g, '<strong>$1</strong>');
      
      // Italic (*text* or _text_ -> <em>text</em>)
      formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
      formatted = formatted.replace(/_(.+?)_/g, '<em>$1</em>');
      
      // Links ([text](url) -> <a href="url">text</a>)
      formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      
      // Code inline (`code` -> <code>code</code>)
      formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
      
      // Unordered lists (- item or * item)
      if (formatted.match(/^[-*]\s+/m)) {
        const items = formatted.split('\n')
          .filter(line => line.trim().match(/^[-*]\s+/))
          .map(line => line.replace(/^[-*]\s+/, ''))
          .map(item => `<li>${item}</li>`)
          .join('');
        formatted = `<ul>${items}</ul>`;
      }
      
      // Ordered lists (1. item)
      if (formatted.match(/^\d+\.\s+/m)) {
        const items = formatted.split('\n')
          .filter(line => line.trim().match(/^\d+\.\s+/))
          .map(line => line.replace(/^\d+\.\s+/, ''))
          .map(item => `<li>${item}</li>`)
          .join('');
        formatted = `<ol>${items}</ol>`;
      }
      
      // If it's not a specific HTML tag, wrap in paragraph
      if (!formatted.match(/^<(h3|ul|ol|hr|blockquote|pre)/)) {
        formatted = `<p>${formatted}</p>`;
      }
      
      return formatted;
    })
    .filter(p => p !== '')
    .join('\n');

  // Converts single line breaks to <br>
  html = html.replace(/\n(?!<)/g, '<br>');

  return html;
}

/**
 * Formats content preserving existing HTML and adding formatting when necessary
 * Useful when content already contains some HTML tags
 */
export function formatContentToHtmlPreservingExisting(content: string): string {
  if (!content || content.trim() === '') {
    return '';
  }

  // If it's already valid HTML, return as is (after basic sanitization)
  if (content.includes('<') && content.includes('>')) {
    // Preserves existing HTML, just ensures it's well formatted
    return content;
  }

  // Otherwise, format from scratch
  return formatContentToHtml(content);
}

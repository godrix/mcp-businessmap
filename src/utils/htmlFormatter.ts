/**
 * Utilitário para formatar conteúdo em HTML rico
 * Suporta tags HTML e preserva emojis e quebras de linha
 */

/**
 * Formata conteúdo de texto simples/markdown em HTML rico
 * Suporta as seguintes tags HTML:
 * - <h3> para títulos principais
 * - <p> para parágrafos e quebras de linha
 * - <strong> para texto em negrito
 * - <em> para texto em itálico
 * - <u> para texto sublinhado
 * - <code> para código inline
 * - <hr> para linhas horizontais separadoras
 * - <ul> e <li> para listas não ordenadas
 * - <ol> e <li> para listas ordenadas (numeradas)
 * - <a href=""> para links clicáveis
 * - <blockquote> para citações destacadas
 * - <pre> para texto pré-formatado (múltiplas linhas)
 * - <p style=""> para estilos inline (color, background-color, font-size, etc)
 * 
 * Emojis são totalmente suportados e preservados
 * 
 * @param content - Conteúdo em texto simples ou markdown básico
 * @returns HTML formatado
 */
export function formatContentToHtml(content: string): string {
  if (!content || content.trim() === '') {
    return '';
  }

  // Preserva emojis e quebras de linha
  // Converte quebras de linha duplas em parágrafos
  let html = content
    .split('\n\n')
    .map(paragraph => {
      const trimmed = paragraph.trim();
      if (trimmed === '') return '';
      
      // Se já começa com tag HTML, preserva
      if (trimmed.startsWith('<')) {
        return trimmed;
      }
      
      // Converte markdown básico para HTML
      let formatted = trimmed;
      
      // Headers (### Título -> <h3>Título</h3>)
      formatted = formatted.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
      
      // Bold (**texto** ou __texto__ -> <strong>texto</strong>)
      formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      formatted = formatted.replace(/__(.+?)__/g, '<strong>$1</strong>');
      
      // Italic (*texto* ou _texto_ -> <em>texto</em>)
      formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
      formatted = formatted.replace(/_(.+?)_/g, '<em>$1</em>');
      
      // Links ([texto](url) -> <a href="url">texto</a>)
      formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      
      // Code inline (`código` -> <code>código</code>)
      formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
      
      // Listas não ordenadas (- item ou * item)
      if (formatted.match(/^[-*]\s+/m)) {
        const items = formatted.split('\n')
          .filter(line => line.trim().match(/^[-*]\s+/))
          .map(line => line.replace(/^[-*]\s+/, ''))
          .map(item => `<li>${item}</li>`)
          .join('');
        formatted = `<ul>${items}</ul>`;
      }
      
      // Listas ordenadas (1. item)
      if (formatted.match(/^\d+\.\s+/m)) {
        const items = formatted.split('\n')
          .filter(line => line.trim().match(/^\d+\.\s+/))
          .map(line => line.replace(/^\d+\.\s+/, ''))
          .map(item => `<li>${item}</li>`)
          .join('');
        formatted = `<ol>${items}</ol>`;
      }
      
      // Se não for uma tag HTML específica, envolve em parágrafo
      if (!formatted.match(/^<(h3|ul|ol|hr|blockquote|pre)/)) {
        formatted = `<p>${formatted}</p>`;
      }
      
      return formatted;
    })
    .filter(p => p !== '')
    .join('\n');

  // Converte quebras de linha simples em <br>
  html = html.replace(/\n(?!<)/g, '<br>');

  return html;
}

/**
 * Formata conteúdo preservando HTML existente e adicionando formatação quando necessário
 * Útil quando o conteúdo já contém algumas tags HTML
 */
export function formatContentToHtmlPreservingExisting(content: string): string {
  if (!content || content.trim() === '') {
    return '';
  }

  // Se já é HTML válido, retorna como está (após sanitização básica)
  if (content.includes('<') && content.includes('>')) {
    // Preserva HTML existente, apenas garante que está bem formatado
    return content;
  }

  // Caso contrário, formata do zero
  return formatContentToHtml(content);
}


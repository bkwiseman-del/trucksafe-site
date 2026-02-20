/**
 * Checks if Tiptap HTML content is effectively empty.
 * An empty Tiptap editor produces '<p></p>' or similar minimal markup.
 */
export function isEditorContentEmpty(html: string): boolean {
  if (!html || !html.trim()) return true
  const textContent = html.replace(/<[^>]*>/g, '').trim()
  return textContent.length === 0
}

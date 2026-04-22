/** Italicize *word* only; copy is from our content module. */
export function renderSimpleMarkdown(s: string): string {
  return s.replace(/\*([^*]+)\*/g, "<em>$1</em>")
}

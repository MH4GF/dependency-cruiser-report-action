export const formatFocusFiles = (files: string[]) => {
  return `"${files.map((file) => `^${file}`).join('|')}"`
}

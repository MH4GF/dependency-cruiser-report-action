export const formatFocusOption = (files: string[]) => {
  return `"${files.map((file) => `^${file}`).join('|')}"`
}

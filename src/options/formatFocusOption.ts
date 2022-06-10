export const formatFocusOption = (fileNames: string) => {
  const files = fileNames.split(' ')
  return `"${files.map((file) => `^${file}`).join('|')}"`
}

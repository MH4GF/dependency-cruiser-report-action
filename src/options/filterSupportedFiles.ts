const SUPPORTED_EXTENSIONS = [
  '.js',
  '.cjs',
  '.mjs',
  '.jsx',
  '.ts',
  '.tsx',
  '.d.ts',
  '.ls',
  '.coffee',
  '.litcoffee',
  '.coffee.md',
  '.csx',
  '.cjsx',
  '.vue',
  '.svelte',
]

export const filterSupportedFiles = (files: string[]) => {
  const filtered = files.filter((file) => {
    const ext = file.split('.').slice(-1)[0]
    return SUPPORTED_EXTENSIONS.includes(`.${ext}`)
  })

  return filtered
}

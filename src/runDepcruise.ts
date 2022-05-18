import { exec } from '@actions/exec'

export const runDepcruise = async (): Promise<number> => {
  // TODO
  // - generate mermaid.js syntax text
  // - support .dependency-cruiser.js and test-script option from github actions
  // - replace to chenged-files string from `src`
  return await exec('npx -p dependency-cruiser depcruise --include-only "^src" src')
}

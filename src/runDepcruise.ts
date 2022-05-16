import { exec } from '@actions/exec'

export const runDepcruise = async (): Promise<number> => {
  // TODO
  // - generate svg image with dot
  // - support .dependency-cruiser.js and test-script option from github actions
  // - replace to chenged-files string from `src`
  return await exec(
    'npx -p dependency-cruiser depcruise --include-only "^src" --output-type dot src',
  )
}

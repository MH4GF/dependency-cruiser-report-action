import { exec } from '@actions/exec'

export const runTest = async (): Promise<number> => {
  return await exec(
    'npx -p dependency-cruiser depcruise --include-only "^src" --output-type dot src | dot -T svg > dependencygraph.svg',
  )
}

import { exec } from '@actions/exec'

type Options = {
  targetFiles: string
}

export const runDepcruise = async ({ targetFiles }: Options): Promise<number> => {
  // TODO
  // - generate mermaid.js syntax text
  const cmd = `npx -p dependency-cruiser depcruise --config --output-type dot ${targetFiles}`
  return await exec(cmd)
}

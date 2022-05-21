import { exec } from '@actions/exec'

type Options = {
  targetFiles: string
  depcruiseConfigFile: string
}

export const runDepcruise = async ({
  targetFiles,
  depcruiseConfigFile,
}: Options): Promise<number> => {
  // TODO
  // - generate mermaid.js syntax text
  const configOption = depcruiseConfigFile !== '' ? `--config ${depcruiseConfigFile}` : ''
  const cmd = `npx -p dependency-cruiser depcruise --output-type dot ${configOption} ${targetFiles}`
  return await exec(cmd)
}

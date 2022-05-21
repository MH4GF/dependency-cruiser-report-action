import { exec } from '@actions/exec'

type Options = {
  targetFiles: string
  depcruiseConfigFile: string
}

export const runDepcruise = ({ targetFiles, depcruiseConfigFile }: Options): Promise<number> => {
  const configOption = depcruiseConfigFile !== '' ? `--config ${depcruiseConfigFile}` : ''
  const cmd = `npx -p @mh4gf/dependency-cruiser depcruise --output-type plugin:@mh4gf/dependency-cruiser/mermaid-reporter-plugin ${configOption} ${targetFiles}`
  return exec(cmd)
}

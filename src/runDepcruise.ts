import { exec } from '@actions/exec'

type Options = {
  targetFiles: string
  depcruiseConfigFile: string
}

export const runDepcruise = async ({
  targetFiles,
  depcruiseConfigFile,
}: Options): Promise<string> => {
  const outputTypeOption = '--output-type plugin:@mh4gf/dependency-cruiser/mermaid-reporter-plugin'
  const configOption = depcruiseConfigFile !== '' ? `--config ${depcruiseConfigFile}` : ''
  const cmd = `npx -p @mh4gf/dependency-cruiser depcruise ${outputTypeOption} ${configOption} ${targetFiles}`
  const options = { listeners: {} }
  let result = ''
  options.listeners = {
    stdout: (data: Buffer) => {
      result += data.toString()
    },
  }
  await exec(cmd, [], options)

  return result
}

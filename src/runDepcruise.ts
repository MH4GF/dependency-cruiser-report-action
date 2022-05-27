import { exec } from '@actions/exec'

type Options = {
  targetFiles: string
  depcruiseConfigFile: string
}

type DepcruiseResult = {
  cmdText: string
  mermaidText: string
}

export const runDepcruise = async ({
  targetFiles,
  depcruiseConfigFile,
}: Options): Promise<DepcruiseResult> => {
  const outputTypeOption = '--output-type plugin:@mh4gf/dependency-cruiser/mermaid-reporter-plugin'
  const configOption = depcruiseConfigFile !== '' ? `--config ${depcruiseConfigFile}` : ''
  const cmd = `npx -p @mh4gf/dependency-cruiser depcruise ${outputTypeOption} ${configOption} ${targetFiles}`
  const options = { listeners: {} }
  let mermaid = ''
  options.listeners = {
    stdout: (data: Buffer) => {
      mermaid += data.toString()
    },
  }
  await exec(cmd, [], options)

  return { mermaidText: mermaid, cmdText: cmd }
}

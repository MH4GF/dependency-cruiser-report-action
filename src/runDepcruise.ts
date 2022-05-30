import { exec } from '@actions/exec'

type Options = {
  targetFiles: string
  depcruiseConfigFilePath: string
}

type DepcruiseResult = {
  cmdText: string
  mermaidText: string
}

export const runDepcruise = async ({
  targetFiles,
  depcruiseConfigFilePath,
}: Options): Promise<DepcruiseResult> => {
  const outputTypeOption = '--output-type plugin:@mh4gf/dependency-cruiser/mermaid-reporter-plugin'
  const configOption = depcruiseConfigFilePath !== '' ? `--config ${depcruiseConfigFilePath}` : ''
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

import { exec } from '@actions/exec'

type Options = {
  targetFiles: string
  focus: string
  depcruiseConfigFilePath: string
  cruiseScript: string
}

type DepcruiseResult = {
  cmdText: string
  mermaidText: string
}

export const runDepcruise = async ({
  targetFiles,
  focus,
  depcruiseConfigFilePath,
  cruiseScript,
}: Options): Promise<DepcruiseResult> => {
  const outputTypeOption = '--output-type mermaid'
  const configOption = depcruiseConfigFilePath !== '' ? `--config ${depcruiseConfigFilePath}` : ''
  const focusOption = `--focus ${focus}`
  const cmd = `${cruiseScript} ${outputTypeOption} ${configOption} ${focusOption} ${targetFiles}`
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

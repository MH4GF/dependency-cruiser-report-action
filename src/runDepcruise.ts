import { exec } from '@actions/exec'

interface Options {
  targetFiles: string
  focusFiles: string
  visualizeOption: string
  depcruiseConfigFilePath: string
  cruiseScript: string
}

interface DepcruiseResult {
  cmdText: string
  mermaidText: string
}

export const runDepcruise = async ({
  targetFiles,
  focusFiles,
  visualizeOption,
  depcruiseConfigFilePath,
  cruiseScript,
}: Options): Promise<DepcruiseResult> => {
  const outputTypeOption = '--output-type mermaid'
  const configOption = depcruiseConfigFilePath !== '' ? `--config ${depcruiseConfigFilePath}` : ''
  const cmd = `${cruiseScript} ${outputTypeOption} ${configOption} ${visualizeOption} ${focusFiles} ${targetFiles}`
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

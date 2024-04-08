import { exec } from '@actions/exec'
import type { VisualizeType } from './options/validateOptions'

interface Options {
  targetFiles: string
  focusFiles: string
  visualizeType: VisualizeType
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
  visualizeType,
  depcruiseConfigFilePath,
  cruiseScript,
}: Options): Promise<DepcruiseResult> => {
  const outputTypeOption = '--output-type mermaid'
  const configOption = depcruiseConfigFilePath !== '' ? `--config ${depcruiseConfigFilePath}` : ''
  // NOTE: All files are covered if the "reaches" option is used. This is experimental.
  const filesOrDirectories = visualizeType === 'reaches' ? '.' : targetFiles
  const cmd = `${cruiseScript} ${outputTypeOption} ${configOption} --${visualizeType} ${focusFiles} ${filesOrDirectories}`
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

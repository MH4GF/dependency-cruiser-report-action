import * as fs from 'fs'
import * as path from 'path'

import { exec } from '@actions/exec'

const DEPCRUISE_RESULT_FILE = 'depcruiser_result.mmd'

type Options = {
  targetFiles: string
  depcruiseConfigFile: string
}

export const runDepcruise = async ({
  targetFiles,
  depcruiseConfigFile,
}: Options): Promise<string> => {
  const resultPath = path.resolve(__dirname, DEPCRUISE_RESULT_FILE)
  const outputToOption = `--output-to ${resultPath}`
  const outputTypeOption = '--output-type plugin:@mh4gf/dependency-cruiser/mermaid-reporter-plugin'
  const configOption = depcruiseConfigFile !== '' ? `--config ${depcruiseConfigFile}` : ''
  const cmd = `npx -p @mh4gf/dependency-cruiser depcruise ${outputToOption} ${outputTypeOption} ${configOption} ${targetFiles}`
  await exec(cmd)

  const result = fs.readFileSync(resultPath)

  return result.toString()
}

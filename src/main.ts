import * as core from '@actions/core'
import { exec } from '@actions/exec'
import { getOctokit } from '@actions/github'

import { installDependencies } from './installDependencies'
import { getOptions } from './options'
import { generateReport } from './report/generateReport'
import { runDepcruise } from './runDepcruise'

export const run = async (): Promise<void> => {
  const options = getOptions()
  const octokit = getOctokit(options.token)

  await installDependencies()
  await exec('npm ls --depth=0')
  const { mermaidText, cmdText } = await runDepcruise(options)
  await generateReport(octokit, options, mermaidText, cmdText)
}

try {
  void run()
} catch (error) {
  if (error instanceof Error) core.setFailed(error.message)
}

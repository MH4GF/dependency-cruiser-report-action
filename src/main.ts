import * as core from '@actions/core'
import { getOctokit } from '@actions/github'

import { ActionError, exitWithMessage } from './ActionError'
import { installDependencies } from './installDependencies'
import { getOptions } from './options'
import { generateReport } from './report/generateReport'
import { runDepcruise } from './runDepcruise'

export const run = async (): Promise<void> => {
  const options = await getOptions()
  const octokit = getOctokit(options.token)

  await installDependencies(options.packageManager)
  const { mermaidText, cmdText } = await runDepcruise(options)
  await generateReport(octokit, options, mermaidText, cmdText)
}

run().catch((error) => {
  if (error instanceof ActionError) exitWithMessage(error)
  else if (error instanceof Error) core.setFailed(error.message)
})

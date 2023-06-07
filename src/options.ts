import * as core from '@actions/core'
import { context } from '@actions/github'

import { filterSupportedFiles } from './options/filterSupportedFiles'
import { formatFocusOption } from './options/formatFocusOption'
import { getConfigFilePath } from './options/getConfigFilePath'
import type { Options } from './options/validateOptions'
import { validateOptions } from './options/validateOptions'

const getSha = (): string =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  context.payload.after ?? context.payload.pull_request?.head?.sha

export const getOptions = (): Promise<Options> => {
  const token = core.getInput('github_token', { required: true })
  const workingDirectory = core.getInput('working_directory', { required: true })
  const changedFiles = core.getInput('target_files', { required: false }).split(' ')
  const targetFiles = filterSupportedFiles(changedFiles)
  const focus = formatFocusOption(targetFiles)
  const cruiseScript = core.getInput('cruise_script', { required: true })
  const depcruiseConfigFilePath = getConfigFilePath()
  const pr = context.payload.pull_request
  const options = {
    token,
    workingDirectory,
    owner: context.repo.owner,
    repo: context.repo.repo,
    issueNumber: pr?.number,
    sha: getSha(),
    targetFiles: targetFiles.join(' '),
    focus,
    depcruiseConfigFilePath,
    cruiseScript,
  }

  return validateOptions(options)
}

export type { Options } from './options/validateOptions'

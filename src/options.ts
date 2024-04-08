import * as core from '@actions/core'
import { context } from '@actions/github'

import { filterSupportedFiles } from './options/filterSupportedFiles'
import { formatFocusFiles } from './options/formatFocusFiles'
import { getConfigFilePath } from './options/getConfigFilePath'
import type { Options } from './options/validateOptions'
import { validateOptions } from './options/validateOptions'

const getSha = (): string => context.payload['after'] ?? context.payload.pull_request?.['head']?.sha

export const getOptions = (): Promise<Options> => {
  const token = core.getInput('github_token', { required: true })
  const workingDirectory = core.getInput('working_directory', { required: true })
  const changedFiles = core.getInput('target_files', { required: false }).split(' ')
  const targetFiles = filterSupportedFiles(changedFiles)
  const focusFiles = formatFocusFiles(targetFiles)
  const visualizeType = core.getInput('visualize_type', { required: false })
  const cruiseScript = core.getInput('cruise_script', { required: false })
  const packageManager = core.getInput('package_manager', { required: false })
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
    focusFiles,
    visualizeType,
    depcruiseConfigFilePath,
    cruiseScript,
    packageManager,
  }

  return validateOptions(options)
}

export type { Options } from './options/validateOptions'

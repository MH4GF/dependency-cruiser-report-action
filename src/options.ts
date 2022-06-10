import { existsSync } from 'fs'

import * as core from '@actions/core'
import { context } from '@actions/github'

import { filterSupportedFiles } from './options/filterSupportedFiles'
import { formatFocusOption } from './options/formatFocusOption'

export type Options = {
  token: string
  owner: string
  repo: string
  issueNumber: number
  sha: string
  targetFiles: string
  focus: string
  depcruiseConfigFilePath: string
  cruiseScript: string
}

const mayBeConfigFilePath = () => {
  const path = '.dependency-cruiser.js'
  return existsSync(path) ? path : ''
}

const getConfigFilePath = () => {
  const depcruiseConfigFile = core.getInput('config_file', { required: false })
  return depcruiseConfigFile !== '' ? depcruiseConfigFile : mayBeConfigFilePath()
}

const getSha = (): string =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  context.payload.after ?? context.payload.pull_request?.head?.sha

export const getOptions = (): Options => {
  const token = core.getInput('github_token', { required: true })
  const changedFiles = core.getInput('target_files', { required: true }).split(' ')
  const targetFiles = filterSupportedFiles(changedFiles)
  const focus = formatFocusOption(targetFiles)
  const cruiseScript = core.getInput('cruise_script', { required: true })
  const depcruiseConfigFilePath = getConfigFilePath()
  const pr = context.payload.pull_request
  if (pr === undefined) {
    throw new Error('pull_request event payload is not found.')
  }

  return {
    token,
    owner: context.repo.owner,
    repo: context.repo.repo,
    issueNumber: pr.number,
    sha: getSha(),
    targetFiles: targetFiles.join(' '),
    focus,
    depcruiseConfigFilePath,
    cruiseScript,
  }
}

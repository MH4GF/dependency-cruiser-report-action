import { existsSync } from 'fs'

import * as core from '@actions/core'
import { context } from '@actions/github'

export type Options = {
  token: string
  owner: string
  repo: string
  issueNumber: number
  sha: string
  targetFiles: string
  depcruiseConfigFile: string
}

const mayBeConfigFilePath = () => {
  const path = `${process.env.GITHUB_WORKSPACE || ''}/.dependency-cruiser.js`
  return existsSync(path) ? path : ''
}

const getSha = (): string =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  context.payload.after ?? context.payload.pull_request?.head?.sha

export const getOptions = (): Options => {
  const token = core.getInput('github_token', { required: true })
  const targetFiles = core.getInput('target_files', { required: true })
  let depcruiseConfigFile = core.getInput('config_file', { required: false })
  if (depcruiseConfigFile === '') {
    depcruiseConfigFile = mayBeConfigFilePath()
  }
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
    targetFiles,
    depcruiseConfigFile,
  }
}

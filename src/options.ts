import * as core from '@actions/core'
import { context } from '@actions/github'

export type Options = {
  token: string
  owner: string
  repo: string
  issueNumber: number
  sha: string
  targetFiles: string
}

export const getOptions = (): Options => {
  const token = core.getInput('github_token', { required: true })
  const targetFiles = core.getInput('target_files', { required: true })
  const pr = context.payload.pull_request
  if (pr === undefined) {
    throw new Error('pull_request event payload is not found.')
  }
  const sha = context.payload.after as string

  return {
    token,
    owner: context.repo.owner,
    repo: context.repo.repo,
    issueNumber: pr.number,
    sha,
    targetFiles,
  }
}

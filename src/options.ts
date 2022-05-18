import * as core from '@actions/core'
import { context } from '@actions/github'

export type Options = {
  token: string
  owner: string
  repo: string
  issueNumber: number
  sha: string
}

export const getOptions = (): Options => {
  const token = core.getInput('github-token', { required: true })
  const pr = context.payload.pull_request
  if (pr === undefined) {
    throw new Error('pull_request event payload is not found.')
  }

  return {
    token,
    owner: context.repo.owner,
    repo: context.repo.owner,
    issueNumber: pr.number,
    sha: context.sha,
  }
}

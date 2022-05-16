import * as core from '@actions/core'
import { context } from '@actions/github'

import { PullRequest } from './type'

type Options = {
  token: string
  pr: PullRequest
}

export const getOptions = (): Options => {
  const token = core.getInput('github-token', { required: true })
  const pr = context.payload.pull_request
  if (pr === undefined) {
    throw new Error('pull_request event payload is not found.')
  }

  return { token, pr }
}

import { getOctokit } from '@actions/github'
import { Context } from '@actions/github/lib/context'

export type Repo = Context['repo']
export type PullRequest = NonNullable<Context['payload']['pull_request']>
export type Octokit = ReturnType<typeof getOctokit>

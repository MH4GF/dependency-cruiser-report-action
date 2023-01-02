import { getOctokit } from '@actions/github'

export type Octokit = ReturnType<typeof getOctokit>

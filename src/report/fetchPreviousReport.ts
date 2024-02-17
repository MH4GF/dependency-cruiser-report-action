import type { Options } from '../options'
import type { Octokit } from '../type'

import { uniqueTag } from './body/uniqueTag'

export const fetchPreviousReport = async (octokit: Octokit, options: Options) => {
  const { owner, repo, issueNumber } = options
  const comments = await octokit.paginate(
    'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      owner,
      repo,
      issue_number: issueNumber,
    },
  )

  const previousReport = comments.find((comment) => {
    return comment.body?.startsWith(uniqueTag(options))
  })

  return previousReport
}

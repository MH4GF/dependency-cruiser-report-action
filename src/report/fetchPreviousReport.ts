import { Options } from '../options'
import { Octokit } from '../type'

import { uniqueTag } from './body/uniqueTag'

export const fetchPreviousReport = async (octokit: Octokit, options: Options) => {
  const comments = await octokit.paginate(
    'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      owner: options.owner,
      repo: options.repo,
      issue_number: options.issueNumber,
    },
  )

  const previousReport = comments.find((comment) => {
    return comment.body?.startsWith(uniqueTag(options))
  })

  return previousReport
}

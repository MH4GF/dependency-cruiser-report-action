import { Octokit, PullRequest, Repo } from '../type'

import { uniqueTag } from './body/uniqueTag'

export const fetchPreviousReport = async (octokit: Octokit, repo: Repo, pr: PullRequest) => {
  const comments = await octokit.paginate(
    'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      ...repo,
      issue_number: pr.number,
    },
  )

  const previousReport = comments.find((comment) => {
    return comment.body?.startsWith(uniqueTag({ ...repo, number: pr.number }))
  })

  return previousReport
}

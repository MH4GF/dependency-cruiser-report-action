import type { Options } from '../options'
import type { Octokit } from '../type'

export const fetchPreviousReport = async (octokit: Octokit, options: Options, tag: string) => {
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
    return comment.body?.startsWith(tag)
  })

  return previousReport
}

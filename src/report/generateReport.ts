import { Octokit, PullRequest, Repo } from '../type'

import { reportBody } from './body/reportBody'
import { fetchPreviousReport } from './fetchPreviousReport'

export const generateReport = async (octokit: Octokit, repo: Repo, pr: PullRequest) => {
  const previousReport = await fetchPreviousReport(octokit, repo, pr)

  if (previousReport) {
    // TODO
    // await octokit.rest.issues.updateComment({
    // })
  } else {
    await octokit.rest.issues.createComment({
      owner: repo.owner,
      repo: repo.repo,
      issue_number: pr.number,
      body: reportBody(repo, pr),
    })
  }
}

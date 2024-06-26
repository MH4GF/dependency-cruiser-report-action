import type { Options } from '../options'
import type { Octokit } from '../type'

import { reportBody } from './body/reportBody'
import { uniqueTag } from './body/uniqueTag'
import { fetchPreviousReport } from './fetchPreviousReport'

export const generateReport = async (
  octokit: Octokit,
  options: Options,
  mermaidText: string,
  cmdText: string,
) => {
  const tag = uniqueTag({ ...options })
  const previousReport = await fetchPreviousReport(octokit, options, tag)

  // TODO: add logging
  if (previousReport) {
    await octokit.rest.issues.updateComment({
      ...options,
      comment_id: previousReport.id,
      body: reportBody({ ...options, mermaidText, cmdText }),
    })
  } else {
    await octokit.rest.issues.createComment({
      ...options,
      issue_number: options.issueNumber,
      body: reportBody({ ...options, mermaidText, cmdText }),
    })
  }
}

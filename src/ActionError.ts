import * as core from '@actions/core'
type Severity = 'warning' | 'error'

export class ActionError extends Error {
  readonly severity: Severity

  constructor(message: string, severity: Severity) {
    super(message)
    this.severity = severity
  }
}

export const exitWithMessage = (error: ActionError) => {
  switch (error.severity) {
    case 'warning':
      process.exitCode = core.ExitCode.Success
      core.warning(error.message)
      break
    default:
      core.setFailed(error.message)
  }
}

import type { InferType } from 'yup'
import { number, object, string, ValidationError } from 'yup'

import { ActionError } from '../ActionError'

const SUPPORTED_PACKAGE_MANAGERS = ['yarn', 'npm', 'pnpm', 'bun'] as const

const MESSAGE_REQUIRED_ISSUE_NUMBER = 'pull_request event payload is not found.'
const MESSAGE_REQUIRED_TARGET_FILES = 'No target files were found'
const MESSAGE_INVALID_PACKAGE_MANAGER = `inputs.package_manager must be one of: ${SUPPORTED_PACKAGE_MANAGERS.join(
  ', ',
)}`
const WARNING_MESSAGES = [MESSAGE_REQUIRED_TARGET_FILES]

const optionsSchema = object({
  token: string().required(),
  owner: string().required(),
  repo: string().required(),
  issueNumber: number().required(MESSAGE_REQUIRED_ISSUE_NUMBER),
  sha: string().required(),
  targetFiles: string().required(MESSAGE_REQUIRED_TARGET_FILES),
  focus: string().required(),
  depcruiseConfigFilePath: string().required(),
  cruiseScript: string().required(),
  workingDirectory: string().required(),
  packageManager: string()
    .required()
    .oneOf(SUPPORTED_PACKAGE_MANAGERS, MESSAGE_INVALID_PACKAGE_MANAGER),
})

export type Options = InferType<typeof optionsSchema>

export const validateOptions = async (params: unknown): Promise<Options> => {
  const options = await optionsSchema.validate(params, { abortEarly: false }).catch((e) => {
    if (e instanceof ValidationError && e.errors.every((e) => WARNING_MESSAGES.includes(e))) {
      throw new ActionError(e.errors.join(', '), 'warning')
    }

    throw e
  })

  return options
}

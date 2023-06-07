import type { InferType } from 'yup'
import { number, object, string, ValidationError } from 'yup'

import { ActionError } from '../ActionError'

const MESSAGE_REQUIRED_ISSUE_NUMBER = 'pull_request event payload is not found.'
const MESSAGE_REQUIRED_TARGET_FILES = 'No target files were found'
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

import { describe, it, expect } from 'vitest'
import { ValidationError } from 'yup'

import { ActionError } from '../ActionError'

import type { Options } from './validateOptions'
import { validateOptions } from './validateOptions'

const baseOptions: Options = {
  token: 'x123456',
  owner: 'octocat',
  repo: 'hello-world',
  issueNumber: 1,
  sha: '8ef39983ce21a9c80821addbeb63bfe4d4068f9a',
  targetFiles: `test/runDepcruise/sample/__mocks__/test`,
  focus: `"^test/runDepcruise/sample/__mocks__/test/fixtures/cjs/root_one.js|^test/runDepcruise/sample/__mocks__/test/fixtures/cjs/root_two.js"`,
  depcruiseConfigFilePath: `test/runDepcruise/.dependency-cruiser.js`,
  cruiseScript: 'yarn run -s depcruise',
  workingDirectory: 'test/runDepcruise',
  packageManager: 'yarn',
}

describe('validateOptions', () => {
  it('return options when fields are valid', () => {
    const options = { ...baseOptions }
    expect(async () => await validateOptions(options)).not.toThrowError()
  })
  it('throw ActionError when targetFiles field is empty', async () => {
    const options = { ...baseOptions, targetFiles: '' }
    await expect(validateOptions(options)).rejects.toThrowError(
      new ActionError('No target files were found', 'warning'),
    )
  })
  it('throw ValidationError when targetFiles field and issueNumber field are empty ', async () => {
    const options = {
      ...baseOptions,
      targetFiles: '',
      issueNumber: undefined,
    } as unknown as Options
    await expect(validateOptions(options)).rejects.toThrowError(
      new ValidationError('2 errors occurred'),
    )
  })
  it('throw ValidationError when packageManager field is invalid', async () => {
    const options = {
      ...baseOptions,
      packageManager: 'invalid',
    }
    await expect(validateOptions(options)).rejects.toThrowError(
      new ValidationError('inputs.package_manager must be one of: yarn, npm, pnpm'),
    )
  })
})

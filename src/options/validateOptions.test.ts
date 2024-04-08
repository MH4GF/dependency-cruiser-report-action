import { describe, expect, it } from 'vitest'
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
  targetFiles: 'test/runDepcruise/sample/__mocks__/test',
  focusFiles: `"^test/runDepcruise/sample/__mocks__/test/fixtures/cjs/root_one.js|^test/runDepcruise/sample/__mocks__/test/fixtures/cjs/root_two.js"`,
  visualizeOption: '--focus',
  depcruiseConfigFilePath: 'test/runDepcruise/.dependency-cruiser.js',
  cruiseScript: '',
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
      new ValidationError('inputs.package_manager must be one of: yarn, npm, pnpm, bun'),
    )
  })
  it('throw ValidationError when visualizeOption field is invalid', async () => {
    const options = {
      ...baseOptions,
      visualizeOption: '--invalid',
    }
    await expect(validateOptions(options)).rejects.toThrowError(
      new ValidationError('inputs.visualize_option must be one of: --focus, --reaches'),
    )
  })

  const cruiseScripts: Record<'packageManager' | 'result', string>[] = [
    { packageManager: 'yarn', result: 'yarn run -s depcruise' },
    { packageManager: 'npm', result: 'npx --no-install depcruise' },
    { packageManager: 'pnpm', result: 'pnpm exec depcruise' },
    { packageManager: 'bun', result: 'bun x depcruise' },
  ]
  describe.each(cruiseScripts)(
    'detect default cruise script when cruiseScript is empty',
    ({ packageManager, result }) => {
      it(`return ${result} when packageManager is ${packageManager}`, async () => {
        const options = {
          ...baseOptions,
          packageManager,
          cruiseScript: '',
        }
        const resultOptions = await validateOptions(options)
        expect(resultOptions.cruiseScript).toBe(result)
      })
    },
  )
  it("return cruiseScript when cruiseScript isn't empty", async () => {
    const options = {
      ...baseOptions,
      packageManager: 'npm',
      cruiseScript: 'npm run depcruise',
    }
    const resultOptions = await validateOptions(options)
    expect(resultOptions.cruiseScript).toBe('npm run depcruise')
  })
})

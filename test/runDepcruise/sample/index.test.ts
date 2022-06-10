import { readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

import { describe, it, expect } from 'vitest'

import { runDepcruise } from '../../../src/runDepcruise'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const mockPath = join(__dirname, '__mocks__')

describe('runDepcruise', () => {
  it('execute depcruise command', async () => {
    const options = {
      targetFiles: `test/runDepcruise/sample/__mocks__/test`,
      focus: `"^test/runDepcruise/sample/__mocks__/test"`,
      depcruiseConfigFilePath: `test/runDepcruise/sample/__mocks__/.dependency-cruiser.js`,
      cruiseScript: 'yarn run -s depcruise',
    }
    const result = await runDepcruise(options)
    const expectedMmd = readFileSync(join(mockPath, 'expected.mmd'), 'utf-8')

    expect(result.mermaidText).toStrictEqual(expectedMmd)
  })
})

import { describe, it, expect } from 'vitest'

import { runDepcruise } from '../../src/runDepcruise'

describe('runDepcruise', () => {
  it('execute depcruise command', async () => {
    const options = {
      targetFiles: `test/runDepcruise/sample/__mocks__/test`,
      focus: `"^test/runDepcruise/sample/__mocks__/test/fixtures/cjs/root_one.js|^test/runDepcruise/sample/__mocks__/test/fixtures/cjs/root_two.js"`,
      depcruiseConfigFilePath: `test/runDepcruise/.dependency-cruiser.js`,
      cruiseScript: 'yarn run -s depcruise',
    }
    const result = await runDepcruise(options)

    expect(result.mermaidText).toMatchSnapshot()
  })
})

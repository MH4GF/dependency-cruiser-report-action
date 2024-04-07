import { describe, expect, it } from 'vitest'

import { runDepcruise } from '../../src/runDepcruise'

const defaultOptions = {
  targetFiles: 'test/runDepcruise/sample/__mocks__/test',
  focus: `"^test/runDepcruise/sample/__mocks__/test/fixtures/cjs/root_one.js|^test/runDepcruise/sample/__mocks__/test/fixtures/cjs/root_two.js"`,
  depcruiseConfigFilePath: 'test/runDepcruise/.dependency-cruiser.js',
  cruiseScript: 'pnpm exec depcruise',
}

describe('runDepcruise', () => {
  it('execute depcruise command(--focus)', async () => {
    const options = { ...defaultOptions, visualizeOption: '--focus' }
    const result = await runDepcruise(options)

    expect(result.mermaidText).toMatchSnapshot()
  })
  it('execute depcruise command(--reaches)', async () => {
    const options = { ...defaultOptions, visualizeOption: '--reaches' }
    const result = await runDepcruise(options)

    expect(result.mermaidText).toMatchSnapshot()
  })
})

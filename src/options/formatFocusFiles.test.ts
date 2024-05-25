import { describe, expect, it } from 'vitest'

import { formatFocusFiles } from './formatFocusFiles'

describe('formatFocusOption', () => {
  it('formatted for focus option', () => {
    const files = ['foo.ts', 'foo/bar.ts']
    const result = formatFocusFiles(files)
    const expected = '"^foo.ts|^foo/bar.ts"'
    expect(result).toStrictEqual(expected)
  })
})

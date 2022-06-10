import { describe, it, expect } from 'vitest'

import { formatFocusOption } from './formatFocusOption'

describe('formatFocusOption', () => {
  it('formatted for focus option', () => {
    const files = 'foo.ts foo/bar.ts'
    const result = formatFocusOption(files)
    const expected = '"^foo.ts|^foo/bar.ts"'
    expect(result).toStrictEqual(expected)
  })
})

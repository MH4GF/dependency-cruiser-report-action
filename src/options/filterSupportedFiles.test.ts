import { describe, expect, it } from 'vitest'

import { filterSupportedFiles } from './filterSupportedFiles'

describe('filterSupportedFiles', () => {
  it('formatted for focus option', () => {
    const files = ['foo.ts', 'foo/bar.tsx', 'baz.coffee', 'image.png', './text', 'yarn.lock']
    const result = filterSupportedFiles(files)
    const expected = ['foo.ts', 'foo/bar.tsx', 'baz.coffee']
    expect(result).toStrictEqual(expected)
  })
})

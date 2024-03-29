import { describe, expect, it } from 'vitest'

import { uniqueTag } from './uniqueTag'

describe('uniqueTag', () => {
  it('should return tag with hashed id describing the workflow generated', () => {
    const context = {
      owner: 'octocat',
      repo: 'hello-world',
      issueNumber: 1,
      workingDirectory: 'src',
    }
    const hashedId = '793d8403dad1436f27f87c9ec99a41239c663150857545f16267c67caf0731f1'
    const tag = `<!-- This comment was generated by dependency-cruiser-report-action. id: ${hashedId} -->`
    expect(uniqueTag(context)).toBe(tag)
  })

  it('should work with extra key/value of passed object', () => {
    const context = {
      owner: 'octocat',
      repo: 'hello-world',
      issueNumber: 1,
      workingDirectory: 'src',
      extra: 'foo',
    }
    const hashedId = '793d8403dad1436f27f87c9ec99a41239c663150857545f16267c67caf0731f1'
    const tag = `<!-- This comment was generated by dependency-cruiser-report-action. id: ${hashedId} -->`
    expect(uniqueTag(context)).toBe(tag)
  })
})

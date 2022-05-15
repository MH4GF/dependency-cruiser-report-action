import * as core from '@actions/core'

import { runTest } from './runTest'

export const run = async (): Promise<void> => {
  try {
    await runTest()
    console.log('fuga')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

void run()

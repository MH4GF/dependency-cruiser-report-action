import { exec } from '@actions/exec'

import type { Options } from './options'

export const installDependencies = async (packageManager: Options['packageManager']) => {
  return await exec(`${packageManager} install`)
}

import { exec } from '@actions/exec'

import type { Options } from './options'

const installPackageManager = async (packageManager: Options['packageManager']) => {
  if (packageManager === 'pnpm') {
    await exec('npm install -g pnpm')
  }
}

export const installDependencies = async (packageManager: Options['packageManager']) => {
  await installPackageManager(packageManager)
  return await exec(`${packageManager} install`)
}

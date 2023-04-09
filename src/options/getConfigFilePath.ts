import { existsSync } from 'fs'

import * as core from '@actions/core'

const mayBeConfigFilePath = () => {
  const path = '.dependency-cruiser.js'
  return existsSync(path) ? path : ''
}

export const getConfigFilePath = () => {
  const depcruiseConfigFile = core.getInput('config_file', { required: false })
  return depcruiseConfigFile !== '' ? depcruiseConfigFile : mayBeConfigFilePath()
}

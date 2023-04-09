import { existsSync } from 'fs'

import * as core from '@actions/core'

const RULES_FILE_NAME_SEARCH_ARRAY = [
  '.dependency-cruiser.json',
  '.dependency-cruiser.js',
  '.dependency-cruiser.cjs',
]

const mayBeConfigFilePath = () => {
  for (const filePath of RULES_FILE_NAME_SEARCH_ARRAY) {
    if (existsSync(filePath)) return filePath
  }

  return ''
}

export const getConfigFilePath = () => {
  const depcruiseConfigFile = core.getInput('config_file', { required: false })
  return depcruiseConfigFile !== '' ? depcruiseConfigFile : mayBeConfigFilePath()
}

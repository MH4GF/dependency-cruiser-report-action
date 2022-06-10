/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  options: {
    doNotFollow: {
      path: 'node_modules',
      dependencyTypes: ['npm', 'npm-dev', 'npm-optional', 'npm-peer', 'npm-bundled', 'npm-no-pkg'],
    },
    includeOnly: '^test/runDepcruise/',
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
  },
}
// generated: dependency-cruiser@11.7.1 on 2022-05-21T13:18:55.658Z

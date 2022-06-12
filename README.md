# dependency-cruiser report

A GitHub Actions that report to visualize dependencies of changed files each pull requests.

[![build](https://github.com/MH4GF/dependency-cruiser-report-action/actions/workflows/build.yml/badge.svg)](https://github.com/MH4GF/dependency-cruiser-report-action/actions/workflows/build.yml)

![sample](./docs/assets/sample-light.png#gh-light-mode-only)![sample](./docs/assets/sample-dark.png#gh-dark-mode-only)

This action uses [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) to output syntax of [mermaid.js](https://github.com/mermaid-js/mermaid). Inspired by [jest-coverage-report-action](https://github.com/ArtiomTr/jest-coverage-report-action).

## usage

### Install in your project

```bash
npm install --save-dev dependency-cruiser
```

### Setup dependency-cruiser in the wizard

```bash
npm run depcruise --init
```

### Create new action under `.github/workflows` .

```yaml
name: 'depcruise'
on:
  pull_request:
    branches:
      - main

jobs:
  report:
    permissions:
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: MH4GF/dependency-cruiser-report-action@v0
```

## Adbanced Usage

### Specifying config file

This action automatically detects dependency-cruiser config file ( `.dependency-cruiser.js` ), but you can specify your own rules file.

```yaml
with:
  config-file: my-rules.json
```

For more information on config file, please see [the official documentation](https://github.com/sverweij/dependency-cruiser/blob/develop/doc/cli.md#--config---validate)

### Customizing cruise script

This action automatically adds necessary flags to your cruise script. The default script is:

```bash
yarn run -s depcruise
```

So you don't need to specify additional flags - action will handle them automatically. So, after adding necessary flags, action will run this command:

```bash
 --output-type mermaid --config ${SPECIFIED_CONFIG_FILE} ${DIFF_FILE_A DIFF_FILE_B ...etc}
```

But you can use different package manager, yarn for example:

```yaml
with:
  cruise-script: npm run depcruise
```

## Compatibility

This action requires dependency-cruiser v11.10.0 or newer.

# dependency-cruiser report

A GitHub Actions that report to visualize dependencies of changed files each pull requests.

[![build](https://github.com/MH4GF/dependency-cruiser-report-action/actions/workflows/build.yml/badge.svg)](https://github.com/MH4GF/dependency-cruiser-report-action/actions/workflows/build.yml)

![sample](./docs/assets/sample-light.png#gh-dark-mode-only)![sample](./docs/assets/sample-dark.png#gh-light-mode-only)

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

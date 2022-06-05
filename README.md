# dependency-cruiser report

A GitHub Actions that report to visualize dependencies of changed files each pull requests.

![sample](./docs/assets/sample-light.png#gh-dark-mode-only)![sample](./docs/assets/sample-dark.png#gh-light-mode-only)

<p align="center">
  <a href="https://github.com/MH4GF/dependency-cruiser-report-action/actions"><img alt="typescript-action status" src="https://github.com/MH4GF/dependency-cruiser-report-action/workflows/build-test/badge.svg"></a>
</p>

This action uses [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) to output syntax of [mermaid.js](https://github.com/mermaid-js/mermaid). Inspired by [jest-coverage-report-action](https://github.com/ArtiomTr/jest-coverage-report-action).

## usage

Create new action under `.github/workflows` .

```yaml
name: 'depcruise'
on:
  pull_request:
    branches:
      - main

jobs:
  report:
    permissions:
      issues: read
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: MH4GF/dependency-cruiser-report-action@v0

```
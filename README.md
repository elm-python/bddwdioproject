```markdown

A web automation suite built on webdriverio, cucumber and typescript.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)

## Installation

To install the project dependencies, run:

```
npm install

```

or if you prefer using yarn:

```
yarn install
```

## Usage

This project contains various scripts for running end-to-end tests across different environments, domains, and browsers. The tests are built using WebdriverIO, Cucumber, and TypeScript.

## Scripts

### E2E Tests

#### Chrome

- **Test Environment**
  - `npm run-e2e`: Runs E2E tests in Chrome on the `.com` domain in the test environment.

For a full list of available scripts, please refer to the `scripts` section in the `package.json` file.

## Dependencies

- @types/fs-extra: ^11.0.4
- @wdio/cli: ^8.32.2

## Dev Dependencies

- @types/chai: ^4.3.3
- @types/chai-as-promised: ^7.1.5
- @types/node: ^20.9.0
- @types/yargs: ^17.0.24
- @wdio/cucumber-framework: ^8.22.0
- @wdio/local-runner: ^8.22.1
- @wdio/spec-reporter: ^8.21.0
- chai: ^4.3.10
- chai-as-promised: ^7.1.1
- fs-extra: ^11.1.0
- jimp: ^0.16.1
- multiple-cucumber-html-reporter: ^3.5.0
- rimraf: ^4.4.1
- ts-node: ^10.9.1
- typescript: ^5.1.6
- wdio-cucumberjs-json-reporter: ^5.1.8
- wdio-wait-for: ^3.0.8
- yarn: ^1.22.18
```

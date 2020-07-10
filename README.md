<p align="center"><h1 align="center">
  nsqjs-extra
</h1>

<p align="center">
  Extra NodeJS client for the nsq client protocol, supporting async/await function.
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/nsqjs-extra"><img src="https://badgen.net/npm/v/nsqjs-extra" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/nsqjs-extra"><img src="https://badgen.net/npm/license/nsqjs-extra" alt="license"/></a>
  <!--
  <a href="https://www.npmjs.org/package/nsqjs-extra"><img src="https://badgen.net/npm/dt/nsqjs-extra" alt="downloads"/></a>
  <a href="https://travis-ci.org/kydrenw/nsqjs-extra"><img src="https://badgen.net/travis/kydrenw/nsqjs-extra" alt="build"/></a>
  <a href="https://codecov.io/gh/kydrenw/nsqjs-extra"><img src="https://badgen.net/codecov/c/github/kydrenw/nsqjs-extra" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/kydrenw/nsqjs-extra"><img src="https://snyk.io/test/github/kydrenw/nsqjs-extra/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
  -->
</p>

# About

nsqjs-extra

Extra NodeJS client for the nsq client protocol.
Adding:

- reader.connectSync
- reader.closeSync
- writer.connectSync
- writer.publishSync
- writer.deferPublishSync
- writer.closeSync

# Install

```bash
npm add nsqjs-extra
```

# Usage

```js
const { Reader, Writer } = require('nsqjs-extra')

const reader = new Reader('topic', 'default', { nsqdTCPAddresses: ['127.0.0.1:4150'] })
await reader.connectSync()
// do something
await reader.closeSync()

const writer = new Writer('127.0.0.1', '4150')
await writer.connectSync()
await writer.publishSync('topic', 'message')
await writer.deferPublishSync('topic', ['message'], 1000)
await writer.closeSync()
```

# Contributing

Please consult [CONTRIBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**nsqjs-extra** © [Hoang Dinh](https://github.com/kydrenw), Released under the [MIT](./LICENSE) License.

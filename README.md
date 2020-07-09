<p align="center"><h1 align="center">
  nsqjs-extra
</h1>

<p align="center">
  Extra NodeJS client for the nsq client protocol.
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/nsqjs-extra"><img src="https://badgen.net/npm/v/nsqjs-extra" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/nsqjs-extra"><img src="https://badgen.net/npm/license/nsqjs-extra" alt="license"/></a>
  <a href="https://www.npmjs.org/package/nsqjs-extra"><img src="https://badgen.net/npm/dt/nsqjs-extra" alt="downloads"/></a>
  <a href="https://travis-ci.org/kydrenw/nsqjs-extra"><img src="https://badgen.net/travis/kydrenw/nsqjs-extra" alt="build"/></a>
  <a href="https://codecov.io/gh/kydrenw/nsqjs-extra"><img src="https://badgen.net/codecov/c/github/kydrenw/nsqjs-extra" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/kydrenw/nsqjs-extra"><img src="https://snyk.io/test/github/kydrenw/nsqjs-extra/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
</p>

# About

nsqjs-extra

Extra NodeJS client for the nsq client protocol.

# Install

```bash
npm add nsqjs-extra
```

# Usage

```js
const { Writer } = require('nsqjs-extra')
const writer = new Writer('127.0.0.1', '4151')
await writer.publish('topic', 'message')
await writer.close()
```

# Example

<!-- TODO -->

# Contributing

Please consult [CONTRIBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**nsqjs-extra** © [Hoang Dinh](https://github.com/kydrenw), Released under the [Apache-2.0](./LICENSE) License.

'use strict'

/* eslint-disable security/detect-child-process, security/detect-non-literal-fs-filename, n/no-unsupported-features/node-builtins */

const { spawn } = require('child_process')
const fs = require('fs')
const net = require('net')
const os = require('os')
const path = require('path')

const HOST = '127.0.0.1'
const PORT = 4150
const JEST = require.resolve('jest/bin/jest')

function isListening() {
  return new Promise(resolve => {
    const socket = net.connect({ host: HOST, port: PORT })
    const finish = result => {
      socket.destroy()
      resolve(result)
    }

    socket.setTimeout(1000)
    socket.once('connect', () => finish(true))
    socket.once('timeout', () => finish(false))
    socket.once('error', () => finish(false))
  })
}

async function waitForListening(timeoutMs, stopped) {
  const deadline = Date.now() + timeoutMs

  while (Date.now() < deadline) {
    if (await isListening()) {
      return true
    }

    if (stopped && stopped()) {
      return false
    }

    await new Promise(resolve => setTimeout(resolve, 100))
  }

  return false
}

function killProcess(child) {
  return new Promise(resolve => {
    if (!child || child.exitCode !== null) {
      return resolve()
    }

    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      resolve()
    }, 3000)

    child.once('exit', () => {
      clearTimeout(timer)
      resolve()
    })

    child.kill('SIGTERM')
  })
}

async function main() {
  let jest = null
  let nsqd = null
  let dataDir = null
  let shuttingDown = false

  const shutdown = async code => {
    if (shuttingDown) {
      return
    }

    shuttingDown = true

    await killProcess(jest)
    await killProcess(nsqd)

    if (dataDir) {
      fs.rmSync(dataDir, { recursive: true, force: true })
    }

    process.exitCode = code
  }

  process.on('SIGINT', () => shutdown(130))
  process.on('SIGTERM', () => shutdown(143))

  if (!(await isListening())) {
    dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nsqd-'))
    nsqd = spawn('nsqd', ['--data-path', dataDir], { stdio: 'ignore' })

    nsqd.on('error', error => {
      console.error(
        `Unable to start nsqd (${error.message}). Install nsqd or start it on ${HOST}:${PORT}.`
      )
      shutdown(1)
    })

    if (!(await waitForListening(15000, () => shuttingDown))) {
      if (!shuttingDown) {
        console.error('nsqd did not start listening in time.')
      }
      await shutdown(1)
      return
    }
  }

  jest = spawn(process.execPath, [JEST, ...process.argv.slice(2)], { stdio: 'inherit' })
  const code = await new Promise(resolve => jest.on('exit', resolve))

  await shutdown(code)
}

main()

const { Writer } = require('../index')

let writer = null

beforeEach(() => {
  writer = new Writer('127.0.0.1', '4150')
})

afterEach(async () => {
  await writer.closeSync()
  writer = null
})

afterAll(async done => done())

test('should able connect sync', async () => {
  const rs = await writer
    .connectSync()
    .then(() => true)
    .catch(() => false)

  expect(rs).toBe(true)
})

test('should able publish sync', async () => {
  await writer.connectSync()

  const rs = await writer
    .publishSync('topic', 'msg')
    .then(() => true)
    .catch(() => false)

  expect(rs).toBe(true)
})

test('should able defer publish sync', async () => {
  await writer.connectSync()

  const rs = await writer
    .deferPublishSync('topic', ['msg'], 1000)
    .then(() => true)
    .catch(() => false)

  expect(rs).toBe(true)
})

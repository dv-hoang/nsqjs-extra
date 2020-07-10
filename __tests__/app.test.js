const { Writer } = require('../index')

test('writer promise publish', async done => {
  const writer = new Writer('127.0.0.1', '4151')
  await writer.connectSync()

  const rs = await writer.publishSync('topic', 'msg').catch(() => false)
  expect(rs).toBe(true)

  await writer.closeSync()

  done()
})

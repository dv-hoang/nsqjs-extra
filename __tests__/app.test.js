const { Writer } = require('../index')

test('writer promise publish', async done => {
  const writer = new Writer('127.0.0.1', '4151')
  const rs = await writer.publish('topic', 'msg').catch(() => false)
  expect(rs).toBe(true)

  await writer.close()
  done()
})

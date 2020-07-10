const { Reader } = require('../index')
let reader = null

beforeEach(() => {
  reader = new Reader('topic', 'default', {
    nsqdTCPAddresses: ['127.0.0.1:4150'],
    maxAttempts: 1
  })
})

afterEach(async () => {
  await reader.closeSync()
  reader = null
})

afterAll(async done => done())

test('should able connect sync', async () => {
  const rs = await reader
    .connectSync()
    .then(() => true)
    .catch(() => false)

  expect(rs).toBe(true)
})

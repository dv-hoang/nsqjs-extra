const { t } = require('../index.js')

test('true is true', () => {
  expect(true).toBe(true)
})

test('test is true', () => {
  const r = t()
  expect(r).toBe(true)
})

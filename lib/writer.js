const nsq = require('nsqjs')

class Writer extends nsq.Writer {
  constructor({ host = '127.0.0.1', port = '4150', ...rest } = {}) {
    super(host, port, rest)
    this.connect()
  }

  async publish(topic, message) {
    if (!this.ready) {
      await new Promise(resolve => this.on(Writer.READY, resolve))
    }

    return new Promise((resolve, reject) => {
      super.publish(topic, message, err => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }

  async close() {
    if (!this.ready) {
      return undefined
    }

    const promise = new Promise(resolve => {
      this.on(Writer.CLOSED, () => {
        resolve()
      })
    })

    super.close()

    return promise
  }
}

module.exports = Writer

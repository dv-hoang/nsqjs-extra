const nsq = require('nsqjs')

class Writer extends nsq.Writer {
  async connectSync() {
    const promise = new Promise(resolve => this.on(Writer.READY, resolve))

    super.connect()

    return promise
  }

  async publishSync(topic, message) {
    if (!this.ready) {
      await new Promise(resolve => this.on(Writer.READY, resolve))
    }

    return new Promise((resolve, reject) => {
      super.publish(topic, message, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  async deferPublishSync(topic, msg, timeMs) {
    if (!this.ready) {
      await new Promise(resolve => this.on(Writer.READY, resolve))
    }

    return new Promise((resolve, reject) => {
      super.deferPublish(topic, msg, timeMs, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  async closeSync() {
    if (!this.ready) {
      return undefined
    }

    const promise = new Promise(resolve => this.on(Writer.CLOSED, resolve))

    super.close()

    return promise
  }
}

module.exports = Writer

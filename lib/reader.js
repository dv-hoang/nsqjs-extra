const nsq = require('nsqjs')

class Reader extends nsq.Reader {
  async connectSync() {
    return new Promise((resolve, reject) => {
      this.on(Reader.NSQD_CONNECTED, host => resolve(host))
      this.on(Reader.ERROR, error => reject(error))
      super.connect()
    })
  }

  async closeSync() {
    const promise = new Promise(resolve => this.on(Reader.NSQD_CLOSED, resolve))

    super.close()

    return promise
  }
}

module.exports = Reader

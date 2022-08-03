const PENDING = 'pending'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class myPromise {
  constructor(executor) {
    this.status = PENDING
    this.result = null
    this.onFulFilledCallbacks = []
    this.onRejectedCallbacks = []
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(this)
    }
  }

  _resolve(result) {
    if (this.status === PENDING) {
      this.result = result
      this.status = FULFILLED
      setTimeout(_ => {
        this.onFulFilledCallbacks.forEach(cb => {
          cb()
        })
      })
    }
  }

  _reject(reason) { 
    if (this.status === PENDING) {
      this.status = REJECTED
      this.result = reason
      this.onRejectedCallbacks.forEach(cb => {
        cb()
      })
    }
  }

  then(onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : res => res
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    }

    const resolvePromise = (promise2, x, resolve, reject) => {
      if (promise2 === x) {
        reject()
        throw new Error('不能是同一个')
      }

      if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let then = x.then
        if (typeof then === 'function') {
          // 防止多次调用
          //resolve()
          // reject()
          let called = false
          try {
            // 这里传的this 值是
            then.call(x, y =>{
              console.log('x, y', x, y)
              if (called) return
              called = true
              resolvePromise(promise2, y, resolve, reject)
            }, r => {
              if (called) return
              called = true
              reject(r)
            })
          } catch (error) {
            if (called) return
            called = true
            reject(error)
          }
        } else {
          resolve(x)
        }
      } else {
        // x已经是上一个该then 的promise 的结果的
        resolve(x)
      }
    }
    
    const p2 = new Promise((resolve, reject) => {
      // 当前是pending 状态，则将结果保留下来
      if (this.status === PENDING) {
        this.onFulFilledCallbacks.push(_ => {
          setTimeout(_ => {
            const x = onFulFilled(this.result)
            console.log('the x is: -- ', x)
            resolvePromise(p2, x, resolve, reject)
          })
        })
        this.onRejectedCallbacks.push(_ => {
          setTimeout(_ => {
            const x = onRejected(this.result)
            resolvePromise(p2, x, resolve, reject)
          })
        })
      } else if (this.status === FULFILLED) {
        try {
          setTimeout(_ => {
            // then 的第一个参数是接受上一个promise 的结果的，所以这里需要传递
            const x = onFulFilled(this.result)
            resolvePromise(p2, x, resolve, reject)
          })
        } catch (error) {
          reject(error)
        }
      } else {
        try {
          setTimeout(_ => {
            const x = onRejected(this.result)
            resolvePromise(p2, x, resolve, reject)
          })
        } catch (error) {
          reject(error)
        }
      }
    })
    return p2
  }
}

let p2 = null

const p1 = new myPromise((resolve, reject) => {
  resolve(1)
}).then(res => {
  console.log('res 1', res)
  p2 = new myPromise((resolve, reject) => {
    resolve(2)
  })
  return p2
}).then(res => {
  console.log('res 2', res)
})
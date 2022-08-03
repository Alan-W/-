const PENDING = 'PENDING'
const FULFILLED = 'FULFILLER'
const REJECTED = 'REJECTED'
//  真个promise采用的都是发布订阅模式
class myPromise {
  constructor(executor) {
    this.status = PENDING
    this.result = null
    this.onFulFilledCallbacks = []
    this.onRejectedCallbacks = []
    executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve(value) {
    if (this.status === PENDING) {
      setTimeout(_ => {
        this.status = FULFILLED
        this.result = value
        this.onFulFilledCallbacks.forEach(cb => {
          cb(this.result)
        });
      })
    }
  }
  _reject(value) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.result = value
      this.onRejectedCallbacks.forEach(cb => {
        cb(this.result)
      });
    }
  }

  static resolve(result) {
    return new myPromise((resolve, reject) => {
      if (result.then) {
        result.then(res => resolve(res, reason => reject(reason)))
      } else {
        resolve(result)
      }
    })
  }

  static reject(reason) {
    return new myPromise((resolve, reject) =>{
      reject(reason)
    })
  }

  catch(reason) {
    return this.then(null, reason)
  }

  static all (asyncArr) {
    return new myPromise((resolve, reject) => {
      let count = 0
      const result = []
      asyncArr.forEach((p, idx) => {
        if (p instanceof myPromise) {
          p.then(res => {
            count++
            result[idx] = res
            if (count === asyncArr.length) resolve(result)
          }).catch(err => {
            reject(err)
          })
        } else {
          count++
          result[idx] = p
          if (count === asyncArr.length) resolve(result)
        }
      })
    })
  }

  static allSettled(asyncArr) {
    return new myPromise((resolve, reject) => {
      let count = 0
      const result = []
      const addResult = (status, value, idx) => {
        count++
        result[idx] = {
          status,
          value
        }
        if (count === asyncArr.length) resolve(result)
      }
      asyncArr.forEach((p, idx) => {
        if (p instanceof myPromise) {
          p.then(res => {
            addResult(FULFILLED, res, idx)
          }).catch(err => {
            addResult(REJECTED, res, idx)
          })
        } else {
          addResult(FULFILLED, p, idx)
        }
      })
    })
  }

  static race(asyncArr) {
    return new Promise((resolve, reject) => {
      asyncArr.forEach((p, idx) => {
        if (p instanceof myPromise) {
          p.then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } else {
          resolve(p)
        }
      })
    })
  }

  // then 接收两个参数
  then(onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : () => this.result
    onRejected = typeof onRejected === 'function' ? onRejected : () => {
      throw new Error(this.result)
    }
    // resolvePromise 用来处理then 中的结果
    const resolvePromise = (promise2, x, resolve, reject) => {
      console.log('romise2, x, resolve, reject', romise2, x, resolve, reject)
      if (promise2 === x) {
        reject(this.result)
        throw new Error('then 不能和原来的一样')
      }
      // 每个promiseA+ 只能调用一次
      let called = false
      if((typeof x === 'object' && x === null) || typeof x === 'function') {
        try {
          let then = x.then
          if (typeof then === 'function') {
            then.call(x, y => {
              if (called) return
              called = true
              // 递归then 中的promise
              resolvePromise(promise2, y, resolve, reject)
            }, r => {
              if (called) return
              called = true
              reject(r)
            })
          } else {
            resolve(x)
          }
        } catch (error) {
          if (called) return
          called = true
          reject(e)
        }
      } else {
        // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4  
        resolve(x)
      }
    }
    const p2 = new myPromise((resolve, reject) => {
      if (this.status === PENDING) {
        this.onFulFilledCallbacks.push(() => {
          try {
            const x = onFulFilled(this.result)
            console.log('penfing', x)
            resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(this.result)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            const x = onRejected()
            resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(this.result)
          }
        })
      } else if (this.status === FULFILLED) {
        console.log('filed')
        setTimeout(_ => {
          try {
            const x = onFulFilled(this.result)
            console.log('the x is: -- ', x)
            resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
        
      } else {
        setTimeout(_ => {
          try {
            const x = onRejected()
            resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
    })
    return p2
  }
}

new myPromise((resolve, reject) => {
  setTimeout(_ => {
    resolve(2)
  }, 1000)
}).then(res => {
  // console.log('the first then is: -- ', res)
})

/* myPromise1.then().then(_ => new Promise((resolve, reject) => {
  resolve(2)
})) */




const p1 = Promise.reject('3')

const p2 = p1.catch(err => {
  console.log('the err is: 00 ', err)
})

const p4 = p1.catch(err => {
  console.log('the err is: 111 ', err)
  throw 'error'
}).catch(err => {
  console.log('the err is: 222 ', err)
})

const p3 = p2.then(res => {
  console.log('the res333 is: -- ', res)
})

console.log('the p1 is: -- ', p1)
console.log('the p2 is: -- ', p2)
console.log('the p3 is: -- ', p3)
console.log('p2 === p4', p2 === p4)


/**
 * Promise.resolve，Promise.reject 会返回新的promise 实例
 * catch 方法也会返回一个新的promise, 因为相当于执行的是 this.then()
 */
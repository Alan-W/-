// 不能使用加法，实现sum 函数，要求执行函数尽可能短

function asyncAdd(a, b, cb) {
  console.log('asyncAdd')
  setTimeout(_ => {
    console.log('a, b, cb',a, b)
    cb(null, a+b)  // cb 的第一个参数是null, 这点，我们不能将resolve 作为cb 来传入，因为resolve 只接受一个参数
  }, Math.random() * 1000)
}

async function total() {
  const res1 = await sum(1,2,3,4,5,6)
  console.log('res1', res1)
  // const res2 = await sum(1,2,3,4,5,6)
  // return [res1, res2]
}


const map = new Map()
const addPromise = (a, b) => {
  const key  = `${a}${b}`
  if (map.has(key)) {
    return Promise.resolve(map.get(key))
  } else {
    return new Promise((resolve, reject) => {
      asyncAdd(a, b, (...argsArr) => {
        console.log(argsArr)
        map.set(key, argsArr[1])
        resolve(argsArr[1])
      })
    })
  }
}
function sum (...args) {
  if (args.length === 1) return args[0]
  let count= 0;
  const asyncArr = []
  while(count < args.length) {
    console.log(count)
    asyncArr.push(addPromise(+args[count], +args[++count] || 0))
    count++
  }
  return Promise.all(asyncArr).then(res => {
    return sum(...res)
  })
}
total()


/* var p = new Promise((resolve) => { console.log(0); resolve() })
p.then(res => { console.log(1, res) }).then(res => { console.log(2, res) }).then(res => { console.log(3, res) })
p.then(res => { console.log(4, res) })
p.then(res => { console.log(6, res) }) 
p.then(res => { console.log(5, res) })*/

/* async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end') // 放入微任务队列1
}

async function async2() {
  console.log('async2 start')
}

console.log('script start')

setTimeout(_ => {
  console.log('setTimeout')  // 放入宏任务队列1
}, 0)
async1()
new Promise((resolve) => {
  console.log('promise1')
  resolve()
}).then(_ => {
  console.log('promise2') // 放入微任务队列2
})

console.log('script end') */

/*
script start 
async1 start
async2 start
promise1
script end
async1 end
promise2
setTimeout
 */


/* async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end') // 放入微任务队列1
}

async function async2() {
  console.log('async2 start')
  return new Promise((resolve, reject) => {
    reject()
    console.log('async2 promise')
  })
}

console.log('illegalscript start')

setTimeout(_ => {
  console.log('setTimeout')  // 放入宏任务队列1
}, 0)
async1()
new Promise((resolve) => {
  console.log('promise1')
  resolve()
}).then(_ => {
  console.log('promise2') // 放入微任务队列2
})

console.log('illegalscript end') */

/*
illegalscript start 
async1 start
async2 start
async2 promise
promise1
illegalscript end
promise2
exception
setTimeout
 */

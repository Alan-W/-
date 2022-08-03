// 函数的柯里化
function curry(fn, len = fn.length) {
  return _curry(fn, len)
}

function _curry(fn, len, ...args) {
  return function(..._args) {
    const curArgs = [...args, ..._args]
    if(curArgs.length >= len) {
      return fn(...curArgs)
    } else {
      return _curry(fn, len, ...curArgs)
    }
  }
}

function sum(a, b, c, d, e) {
  return a + b + c + d + e
}

/* const currySum = curry(sum)
const t1 = currySum(1)(2)(3, 4)
const t2 = currySum(1)(2)(3)(4)
console.log('the t1 is: -- ', t1)
console.log('the t2 is: ---- ', t2) */


/* function curry2(fn, len = fn.length) {
  return function curry3(...args) {
    return function _curry( ..._args) {
      const curArgs = [...args, ..._args]
      if(curArgs.length >= len) {
        return fn(...curArgs)
      } else {
        return curry3(...curArgs)
      }
    }
  }
}

const currySum1 = curry2(sum)
console.log('a',  currySum1(1))
const t11 = currySum1(1)(2)(3, 4, 5)
const t21 = currySum1(1)(2)(3)(4)(5)
console.log('the t1 is: -- ', t11)
console.log('the t2 is: ---- ', t21) */

function curry2(fn, len = fn.length) {
  return _curry2(fn, len)
}

function _curry2(fn, len, ...args) {
  return function(..._args) {
    const curArgs = [...args, ..._args]
    if(curArgs.length >= len) {
      return fn(...curArgs)
    } else {
      return _curry2(fn, len, ...curArgs) // 柯里化是记录当前的参数，传递给下一个函数，直到函数到达最大量
    }
  }
}

const currySum2 = curry2(sum)
const t1 = currySum2(1)(2)(3, 4)(5)
const t2 = currySum2(1)(2)(3)(4)(5)
console.log('the t1 is: -- ', t1)
console.log('the t2 is: ---- ', t2)
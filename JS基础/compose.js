// 从右到左执行，前一个执行结果作为后一个的入参
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function fn1(a,b) {
  return a+a
}

function fn2(a, b) {
  return a * 3
}
function fn3(a, b) {
  return a - b
}

const comFn = compose(fn1, fn2, fn3)
console.log(comFn(4,2))

// [1,2,3].reduce((prev, cur) => {
//   return (...args) => prev(cur(...args))
// })
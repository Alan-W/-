Function.prototype._bind = function(context, ...args) {
  const ctx = context || window
  const fn = Symbol('fn')
  ctx[fn] = this
  function newFun(..._args) {
    if(this instanceof newFun) { // bind 后的函数作为构造函数是不能更改this 的
      const result = new ctx[fn](...args, ..._args)
      delete ctxpfn
      return result
      
    } else {
      return ctx[fn].call(ctx, ...args, ..._args)
    }
  }
  return newFun
}


const data = {
  a: 1,
  b: 2
}
function sum(c, d) {
  return this.a + this.b + c + d
}

const newSum = sum.bind(data, 3)
const b = newSum(4)
const ins = new newSum(3, 4)
console.log('ins test is: -- ', ins)

const newSum1 = sum._bind(data, 3)
const b1 = newSum1(4)
const ins2 = new newSum1(4)
console.log('the b is: -- ', b)
console.log('the b1 is: -- ', b1)
console.log('the ins2 is: -- ', ins2)
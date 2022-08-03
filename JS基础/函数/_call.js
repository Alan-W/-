Function.prototype._call = function(context, ...args) {
  const ctx = context || window
  const fn = Symbol('fn')
  ctx[fn] = this
  const result = ctx[fn](...args)
  delete ctx[fn]
  return result
}

const data = {
  a: 1,
  b: 2
}
function sum() {
  return this.a + this.b
}

const t1 = sum.call(data)
console.log('the t1 is: -- ', t1)
const t2 = sum._call(data)
console.log('the t2 is: -- ', t2)
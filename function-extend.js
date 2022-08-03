// 手写call
Function.prototype._call = function(ctx, ...args) {
  ctx = ctx || window
  const fn = Symbol()
  // 用fn来声明唯一的方法名指向this,this其实就是调用call方法的函数
  ctx[fn] = this
  // call 的参数不是数组形式，是展开的形式
  const result = ctx[fn](...args)
  delete ctx[fn]
  return result
}

fn.call(this, args)

/**     测试call       */
function funtestCall(param1, param2) {
  return this.c = this.a + this.b + param1 + param2
}
const testCallObj = {
  a: 1,
  b: 2
}
// console.log('test extend call is:-- ', funtestCall._call(testCallObj, 4, 5))
// console.log('testCallObj is:-- ', testCallObj)

// 手写apply
Function.prototype._apply = function(ctx, args) { // call 和apply 的区别在在于第二个参数的处理！！！
  ctx = ctx || window
  const fn = Symbol()
  ctx[fn] = this
  // apply 接收的参数是数组形式i
  const result = ctx[fn](...args)
  delete ctx[fn]
  return result
}

Function.prototype._apply = function(ctx, args) {
  
}

// console.log('test extend apply is:-- ', funtestCall._apply(testCallObj, [4, 5]))
// console.log('testCallObj is:-- ', testCallObj)

// 手写bind
// 分析：bind的返回值仍然是一个函数，但是需要关注的是：如果去new 一个bind 后的函数，new中的this不受bind的第一个参数控制
Function.prototype._bind = function(ctx, ...args) {
  ctx = ctx || window
  const fn = Symbol('fn')
  // ctx[fn] 存放当前被 bind 的函数
  ctx[fn] = this
  const newFn = function(..._args) {
    // 判断是否是new 去调用，new 的时候this 执行的是当前实例,newFn相当于该实例的原型
    // 这里需要注意的是在new 中的this 的判断是在newFn调用时去做判断的,这里的this 不同于上面 `ctx[fn] = this` 这个
    if (this instanceof newFn) { // this instanceof newFn
      const result =  new ctx[fn](...args, ..._args) // 若是new调用，忽略传入的ctx，直接返回根据bind的调用方作为构造函数去创建实例
      delete ctx[fn]
      return result
    } else {
      // 不是new调用，则根据call来指定this指向
      const result = ctx[fn].call(ctx, ...args, ..._args) 
      delete ctx[fn]
      return result
    }
  }
  return newFn
}

a.bind(this, args)


const bindFn = funtestCall._bind(testCallObj, 4, 5)
// const bindFn1 = funtestCall.bind(testCallObj, 4, 5)
const n1 = new bindFn()
// const n2 = new bindFn1()
console.log('n1', n1)
// console.log('n2', n2)
console.log('test extend bind is:-- ', funtestCall._bind(testCallObj, 4, 5)(6))
// console.log('test extend bind is:-- ', funtestCall.bind(testCallObj, 4, 5)(6))
console.log('testCallObj is:-- ', testCallObj)
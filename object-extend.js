// 手写new
// 分析：new 后面跟的是构造函数，返回的是一个实例，这里我们用入参来表示new后面的构造函数
function _new(Ctor, ...args) {
  // 首先是创建一个新对象，这个对象会在符合条件的情况下作为发返回的实例
  // Object.create 接收的是需要被返回的实例的原型
  const obj = Object.create(Ctor.prototype) // 这句其实就等于 obj._proto_ = Ctor.prototype
  // 调用构造函数，将构造函数的this值指向这个空对象
  const result = Ctor.call(obj, ...args)
  // 如果构造函数的返回值是非对象或者是函数，则返回构造函数的值，否则返回创建的对象
  if ((typeof result === 'object' && result) || typeof result === 'function') {
    return result
  }
  return obj
}

function TextFunc(a, b) {
  this.a = a
  this.b = b
  this.c = this.a + this.b
}
const n1 = new TextFunc(1, 2)
const n2 = _new(TextFunc, 1, 2)
console.log('n1', n1)
console.log('n2', n2)

const obj = {
  a: {
    b: 1
  },
  c: [1,2,3],
  d: function() {
    return this.a.b
  }
}

const proxy = new Proxy(obj, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver)
  },

  set(target, prop, value, receiver) {
    Reflect.set(target, prop, value, receiver)
  }
})

proxy.v = '2'
proxy.c.push(4)
console.log('obj', obj)
console.log('proxy', proxy)
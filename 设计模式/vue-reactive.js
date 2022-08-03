/**
 * Vue 2.0 的响应式原理
 * 1、采用观察者模式（也叫特殊的发布订阅模式）
 * 2、利用ES5 Object.defineProperty API来进行属性拦截
 */
// vue 中搭建起Observer 和 Watcher 的桥梁，更多的为Observer 提供API

let did = 0
class Dep {
  constructor() {
    this.id = ++did
    this.subs = [] // 存放订阅者，即谁来观察了这些数据，或者说谁依赖了这些数据
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    const idx = this.subs.findIndex(itm => itm.id === sub.id)
    this.subs.splice(idx, 1)
  }

  notify() {
    const subs = this.subs.slice()
    for(let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}

const targetStack = []
Dep.target = null
function pushTarget(watcher) {
  if (Dep.target) targetStack.push(watcher)
  Dep.target = watcher
}
function popTarget() {
  Dep.target = targetStack.pop()
}


const hasProto = '__proto__' in {}
// 创建了继承自数组原型的in实例
const arrayMethods = Object.create(Array.prototype)
const arrayKeys = Object.getOwnPropertyDescriptors(arrayMethods)
// 拦截数组的7中方法，并且通知更新
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(method => {
  Object.defineProperty(arrayMethods, method, {
    configurable: true,
    enumerable: false,
    value: function(...args) {
      const result = Array.prototype[method].call(this, ...args) // 这里觉的this 就是真正响应式的数组类型的数据
      const ob = this.__ob__
      let inserted
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break;
        case 'splice':
          inserted = args.slice(2)
          break
      }
      if(inserted) ob.observeArray(inserted) // 将新插入的数据转变为响应式
      // 通知更新
      ob.dep.notify()
      return result
    }
  })
});

function protoArgument(target, src) {
  target.__proto__ = src
}

function copyArgument(target, src, keys) {
  for (let i = 0; i < keys.length; i++) {
    Object.defineProperty(target, keys[i], {
      configurable: true,
      enumerable: false,
      value: src[keys[i]]
    })
  }
}

// vue中的被观察者，就是数据，在这里会将数据转化为可响应式
class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    Object.defineProperty(value, '__ob__', {
      enumerable: false,
      configurable: true,
      value: this
    })
    if (Array.isArray(value)) {
      // 将所有数组类型的数据的__proto__指向自己定义的新数组实例
      const argument = hasProto ? protoArgument : copyArgument
      argument(value, arrayMethods, arrayKeys)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  observeArray(items) {
    for(let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for(let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}

// 订阅者，观察者,就是视图等其他依赖了数据的抽象概念
let wid = 0
class Watcher {
  constructor(expOrFn, cb) {
    this.depIds = new Set()
    this.deps = []
    this.newDepIds = new Set()
    this.newDeps = []
    this.id = ++wid
    this.getter = expOrFn
    this.value = this.get()
  }

  get() {
    try {
      pushTarget(this)
      const value = this.getter()
      return value
    } catch (error) {
      
    } finally {
      popTarget()
    }
  }

  addDep(dep) {
    if(!this.newDepIds.has(dep.id)) {
      this.newDepIds.add(dep.id)
      this.newDeps.push(dep)
      if (!this.depIds.has(dep.id)) {
        dep.addSub(this)
      }
    }
  }

  update() {
    console.log('我依赖的数据发生了变化，我要去更新了', this.newDeps)
  }
}


const isObject = data => data != null && typeof data === 'object'
const isPlainObject = data => Object.prototype.toString.call(data) === '[object Object]'
let shouldObserve = true
/**
 * 
 * @param {any} value 
 * @returns observer instance
 */
function observe(value) {
  if (!isObject(value)) return
  let ob
  if (value.hasOwnProperty('__ob__') || value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if(
    shouldObserve &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }

  return ob
}

/**
 * 
 * @param {Object} obj 
 * @param {String} key 
 * @param {any} val 
 * @param {Function} customGetter? 可选
 * @param {Boolean} shallow? 可选
 */
function defineReactive(obj, key, val, customGetter, shallow) {
  const dep = new Dep()
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) return
  const getter = property && property.get
  const setter = property && property.set
  // 遍历obj的所有key
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    get() {
      const value = getter ? getter.call(obj) : val
      // 开启收集依赖
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set(newVal) {
      const value = getter ? getter.call(obj) : val
      if (newVal === value || (newVal !== newVal && value !== value)) { // NaN !== NaN true
        return
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 重新观测新值
      childOb = !shallow && observe(newVal)
      // 通知更新
      dep.notify()
    }
  })
}

function dependArray(items) {
  for(let e, i = 0; i < items.length; i++) {
    e = items[i]
    // 数组的每个元素值去收集依赖
    e?.__ob__?.dep?.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}

const data = {
  obj: {
    key: 'name',
    value: 'wangfuyu',
    age: 18
  },
  arr: [{ name:'wfy' }]
}

function expOrFn() {
  console.log('我是订阅者的更新方法， 我要依赖data数据')
  console.log('data.obj.value', data.arr)
}
const ob1 = new Observer(data)
const sub1 = new Watcher(expOrFn)
// data.arr.push({name: 'rr'})
// data.arr.sort()
data.arr[1] = { a:3 } // 这种方式无效，不会触发数据更新
// data.obj.key = '哇咔咔'
// data.obj.value = '哈哈哈'

/**
 * 每个数据都会被转化成observer实例，每个observer实例都有自己的dep实例（用来管理自己的订阅者们），observer类承担的主要职责就是转为为“响应式”
 * Dep类和Watcher承担的是收集依赖，Dep通知更新，Watcher负责提供update接口
 */
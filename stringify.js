// 实现一个类似JSON.stringify 的方法

const getType = data => {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
}

const isObject = data => {
  return typeof data === 'object' && !!data
}

/**
 * 
 * JSON.stringify 的特点：
 * 循环引用跑出错误，BigInt转化会抛错
 * Symbol, Function, undefined 作为一个对象某个key对应的value值，则这个key会被整体忽略
 * Symbol作为key值时， 会被忽略
 * Symbol, Function, undefined 作为数组中的某个元素时，会被转化成null
 * Set, Map, Reg, WeakMap, WeakSet 类型的数据会输出 {}
 * 数字类型： NaN, Infinity, -Infinity 会返回 null
 */

// 判断是否是循环引用：子级数据指向了父级
const isCyclic = obj => {
  const set = new Set()
  let detected = false
  const detect = (obj) => {
    // 简单类型直接返回
    if (!isObject(obj)) return
    if (set.has(obj)) return detected = true
    // 将当前的数据存放到set中
    set.add(obj)
    // 对对象类型的数据循环检测所有的key 值
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        detect(obj[key])
      }
    }
    // 同层数据检测完后，删除当前的数据
    /**
     * const obj = { test: 1 }
     * const obj2 = {
     *  temp: obj, // temp 层判断的时候，obj被加入set，当temp判断完后，需要删除缓存的obj， 否则在temp2的时候将会认为是循环引用
     *  temp2: obj
     * }
     */
    set.delete(obj)
  }
  detect(obj)
  return detected
}
const SPECIAL_TYPES = ['symbol', 'function', 'undefined']
const OBJECT_KEY_IGNORE = ['symbol', 'function']
const ITERATOR_TYPES = ['map', 'set', 'weakmap', 'weakset', 'regexp']
function stringify(data) {
  // 判断bigint
  if (getType(data) === 'bigint') {
    throw new Error('BingInt不能序列化')
  }

  // 判断数据的循环引用
  if (isCyclic(data)) {
    throw new Error('循环引用')
  }
  const type = getType(data)
  // 简单类型 或 null
  if (!isObject(data)) {
    //  特殊类型作为值返回空字符串
    if (type === null) return null
    else if (type === 'number') {
      return ([NaN, Infinity, -Infinity].includes(data)) ? null : data
    } else if (type === 'boolean') return data
    return String(data)
  } else {
    // 日期类型转化成ISO格式的字符串
    if (type === 'date') return data.toISOString()
    if (Array.isArray(data)) {
      let result = data.map(item => {
        // 数组元素直接返回null,在字符串操作中会被隐士转为掉，所以这里返回的是字符串的'null'
        return SPECIAL_TYPES.includes(getType(item)) ? 'null' : (ITERATOR_TYPES.includes(getType(item)) ? '{}' : stringify(item))
      })
      return `[${result}]`.replace(/\'/gi, '"')
    } else {
      // map, set, weakmap, weakset 返回 {}
      if (ITERATOR_TYPES.includes(type)) {
        return {}
      }
      // 对象中key 和 value 类型为 SPECIAL_TYPES 都会被忽略
      const result = Object.keys(data)
      .filter(key => !SPECIAL_TYPES.includes(getType(data[key])) && !OBJECT_KEY_IGNORE.includes(getType(key)))
      .map(key => {
        // 这里对特殊类型的数据做了处理，若直接返回{}，在字符串转化中会转化成[object Object]
        return ITERATOR_TYPES.includes(getType(data[key])) ? `'${key}':{}` : `'${key}':${stringify(data[key])}`
      })
      return `{${result}}`.replace(/\'/gi, '"')
    }
  }
}

function stringify2(data) {
  const type = getType(data)
  if(!isObject(data)) {
    if(type === 'null') return null
    else if(type === 'number') {
      return [NaN, Infinity, -Infinity].includes(data) ? null : data
    } else if(type == 'boolean') return data
    else return String(data)
  } else {
    if(type === 'date') return data.toISOString()
    if(Array.isArray(data)){
      let result = data.map(item => {
        return SPECIAL_TYPES.includes(item) ? 'null' : (ITERATOR_TYPES.includes(item) ? '{}' : stringify2(item))
      })
      return `[${result}]`.replace(/\'/gi, '"')
    } else {
      if(ITERATOR_TYPES.includes(type)) return {}
      const result = Object.keys(data)
      .filter(key => !SPECIAL_TYPES.includes(getType(key) && !['symbol', 'function'].includes(getType(data[key]))))
      .map(key => {
        return ITERATOR_TYPES.includes(getType(data[key])) ? `${key}:{}` : `${key}:${stringify2(data[key])}`
      })
      return `{${result}}`.replace(/\'/gi, '"')
    }
  }
}

const func = () => 1
const map = new Map()
map.set('a', 2)
const set = new Set()
const loop = { name: 'wfy', age: 28  }
loop.inner = loop
const arr = [ 1,2,3 ]
arr.push(arr)
const obj = {
  a: { name: 'wfy', age: 28 },
  b: [1, 2, 3, Symbol('b'), undefined, () => 6, map],
  c: undefined,
  t: null,
  d: Symbol('b'),
  e: () => 1,
  f: NaN,
  f: [Symbol('b'), undefined, null, () => 1],
  [Symbol('1')]: 3,
  undefined: 2,
  func,
  g: new Map(),
  date: new Date(),
  boolean: true,
  reg: /\/ee/,
  null: null,
  map,
  set,
  // loop
}

// console.log(JSON.stringify(obj))
const stringObj = stringify(obj)
console.log('stringObj is: -- ', stringObj)
console.log('JSON.stri is: -- ', JSON.stringify(obj))
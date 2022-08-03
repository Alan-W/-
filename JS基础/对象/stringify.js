const { getType, isObject } = require('../share')

/**
 * 
 * @param {*} data 
 * 循环引用报错，bigInt报错
 */

function isCycle(data) {
  const set = new Set()
  let dected = false
  const detect = (obj) => {
    if(!isObject(obj)) return false
    if(set.has(obj)) return dected = true
    set.add(obj)
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        detect(obj[key])
      }
    }
    set.delete(obj)
  }
  detect(data)
  return dected
}


const data1 = {
  a: 1,
  b: { n: 2 }
}

data1.d = data1

console.log('isCycle(data1)', isCycle(data1))
/**
 * 1. 循环引用会报错
 * 2. BigInt类型会报错
 * 3. Symbol, undefined, function 类型作为对象的key或者值时，整个数据会被忽略掉, 作为数组中的某一项时，会返回null
 * 4. Number，Boolean，null 不会转化成字符转，会返回本身，number 类型中 [NaN, Infinity, -Infinity] 的数据会返回null
 * 5. Regexp, Map, Set, WeakMap, WeakSet 的值会被转化成 {}
 * 6. Date 类型的数据会被转换成 Date.toISOString()
 */

const SPECIAL_TYPE = ['symbol', 'undefined', 'function']
const ITERATOR_TYPE = ['map', 'set', 'weakmap', 'weakset', 'regexp']

function stringify(data) {
  const type = getType(data)
  if(type === 'bigint') throw 'error bigint'
  if(isCycle(data)) throw 'cycle use'
  if(!isObject(data)) {
    if(type === 'number') return [NaN, Infinity, -Infinity].includes(data) ? null : data
    else if(type === 'boolean' || data === null) return data
    return `'${String(data)}'`
  } else {
    if(ITERATOR_TYPE.includes(type)) return '{}'
    if(type === 'date') {
      return `'${data.toISOString()}'`
    }
    if(Array.isArray(data)) {
      let result = []
      result = data.map(item => SPECIAL_TYPE.includes(getType(item)) ? 'null' : stringify(item))
      result = `[${result}]`.replace(/\'/g, '"')
      return result
    } else {
      let result = Object.keys(data)
      result = result.filter(key => !SPECIAL_TYPE.includes(getType(key)) && !SPECIAL_TYPE.includes(getType(data[key])))
      .map(key => {
        return `'${key}':${stringify(data[key])}`
      })
      result = `{${result}}`.replace(/\'/g, '"')
      return result
    }
  }
}

const reg = /\./
const set = new Set()
const map = new Map()
const date = new Date()
const sym = Symbol()
const fun = () => 4

const test = {
  n:1,
  b1: true,
  reg,
  set,
  map,
  sym,
  d: undefined,
  fun,
  [Symbol()]: 4,
  s2: sym,
  date,
  ayyay: [3,4,5,'eee', sym],
  // undefined: undefined,
  // null: null,
  // v: [reg, null, undefined, fun, sym, map],
  // a: null,
  // b: NaN,
  // c: undefined,
  // d: Infinity,
  // e: -Infinity,
  // f2: NaN
}
console.log('原生JSON.stringify',JSON.stringify(test))
console.log('自定义--.stringify', stringify(test))










// 判断循环引用
const data2 = {
  // a: data3
}
const data3 = {
  a: data2
}
data2.a = data3
const obj = {
  data1,
  data2
}



function isCycle2(data) {
  let isCycled = false
  const cacheSet = new Set()
  function toDetect(curData) {
    if(!isObject(curData)) return false
    if(cacheSet.has(curData)) {
      return isCycled = true
    }
    cacheSet.add(curData)
    for (const key in curData) {
      if(curData.hasOwnProperty(key)) {
        if(toDetect(curData[key])) break
      }
    }
    cacheSet.delete(curData)
  }
  toDetect(data)
  return isCycled
}

console.log('isCycle2(obj)', isCycle2(obj))
console.log('isCycle(obj)', isCycle(obj))
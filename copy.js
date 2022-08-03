function shallowCopy(data) {
  let result = null
  const dataType = Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
  if (['number', 'string', 'date', 'function', 'null','undefined'].includes(dataType)) {
    result = data
    return result
  }
  result = dataType === 'array' ? [] : {}
  for(let key in data) {
    result[key] = data[key]
  }
  return result
}
// console.log('shallowCopy([1,2,3, {a: 1}]) is: -- ', shallowCopy([1,2,3, {a: 1}]))
// console.log('shallowCopy(1) is: -- ', shallowCopy(1))

function isObject (data) {
  return typeof (data === 'object' && data) || typeof data === 'function'
}

function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
}

function deepCopy(data, cache = new WeakMap()) {
  if (cache.get(data)) return cache.get(data)
  const dataType = getType(data)
  if (['number', 'string', 'null','undefined'].includes(dataType)) {
    return data
  }
  let dist = null
  if (dataType === 'date') {
    return new Date(data)
  } else if (dataType === 'function') {
    return  data.call(this, ...arguments)
  } else if (dataType === 'regexp') {
    return new RegExp(data.source, data.flags)
  } else if (dataType === 'map') {
    dist = new Map()
    for (const [key, value] of data) {
      dist.set(key, deepCopy(value, cache))
    }
    // return dist
  } else if (dataType === 'set') {
    dist = new Set()
    for (const value of data) {
      dist.add(deepCopy(value, cache))
    }
    // return dist
  } else if (dataType === 'array') {
    dist = []
  } else {
    dist = {}
  }
  cache.set(data, dist)
  // plainBbject
  for(let key in data) {
    if (data.hasOwnProperty(key)) {
      dist[key] = deepCopy(data[key], cache)
    }
  }
  return dist
}
const m = new Map()
m.set('a', 'b')

function deepCopy2(data, cache = new WeakMap()) {
  if(cache.has(data)) return cache.get(data)
  const dataType = getType(data)
  if(['number', 'string', 'boolean', 'undefined', 'null'].includes(dataType)) return data
  let dist = null
  switch (dataType) {
    case 'date':
      dist = new Date(data)
    case 'regexp':
      dist = new RegExp(data)
      break;
    case 'function': 
      console.log('this is: -- ', this)
      dist = data.bind(this, ...arguments)
      break
    case 'map':
    case 'weakmap':
      dist = dataType === 'map' ? new Map() : new WeakMap()
      for (const [key, value] of object) {
        dist.set(key, deepCopy(value, cache))
      }
      break;
    case 'set':
    case 'weakset':
      dist = dataType === 'set' ? new Set() : new WeakSet()
      for (const value of object) {
        dist.add(deepCopy(value, cache))
      }
      break;
    case 'array':
      dist = []
      break
    case 'object':
      dist = {}
    default:
      break;
  }
  cache.set(data, dist)
  for (const key in data) {
    if (Object.hasOwnProperty.call(object, key)) {
      dist[key] = deepCopy(data[key], cache)
    }
  }
  return dist
}

const s = new Set()
s.add({ m })
const origin = { test: [1,2,3, {a: 1, b: { map: m, s }}] }
const deepCopy1 = deepCopy(origin)
console.log('deepCopy1', deepCopy1.test[3].b)


const { getType, isObject } = require('../share')

function deepCopy(data, cache = new WeakMap()) {
  if(cache.has(data)) return cache.get(data)
  if(!isObject(data)) return data
  else {
    let dist
    const type = getType(data)
    switch (type) {
      case 'map':
        dist = new Map()
        for(let [key, value] of data) {
          dist.set(key, deepCopy(value, cache))
        }
        break;
      case 'set':
        dist = new Set()
        for(let value of data) {
          dist.add(deepCopy(value, cache))
        }
        break;
      case 'object':
        dist = {}
        break;
      case 'array':
        dist = []
        break;
      default:
        break;
    }
    cache.set(data, dist)
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        dist[key] = deepCopy(data[key], cache)
      }
    }
    return dist
  }
}

const obj1 = {
  a: 1,
  b: { c: 2 }
}
const obj2 = deepCopy(obj1)
obj2.t = obj1
obj1.b.c = 3333
console.log('the obj2 is:-- ', obj2)
console.log('the obj1 is:-- ', obj1)
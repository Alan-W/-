function isObject(data) {
  return data && typeof data === 'object'
}

// 判断两个数据是否浅相等(浅相等：数据同一个位置数据是否相等，所有是浅相等)
function looseEqual(a, b) {
  if (a == b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          // 这里还是挺巧妙的，用下标去拿b里对应下标的值
          return looseEqual(e, b[i])
        })
      } else if(!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every((key) => {
          return looseEqual(a[key], b[key])
        })
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  } else if(!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
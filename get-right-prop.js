
function get(obj, path, defaultValue) {
  let pathArr = Array.isArray(obj) ? path.split(/\[(\d)+\]/).filter(item => item.length) : path.split('.')
  let curData = obj
  let i = 0
  while(pathArr.length) {
    const curPath = pathArr.shift()
    if(/\w+\[\d+\]/.test(curPath)) {
      const isArrayPath = curPath.split(/\[(\d)+\]/).filter(item => item.length)
      pathArr.splice(i, 0, ...isArrayPath)
      curData = curData[pathArr.shift()]
    } else {
      curData = curData[curPath]
    }
    i++
  }
  return curData === obj ? defaultValue : curData
}


const obj = {
  a: {
    b: {
      c: 'toutiao'
    }
  },
  target: [
    1,
    2,
    { c: [1,2,[2]] }
  ]
}

console.log(get(obj, 'target[2].c[2][0]', 'defaultValue'))
console.log(get(obj, 'a.b.c', 'defaultValue'))
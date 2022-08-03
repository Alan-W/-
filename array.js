// 数组的方法中能接受异步回调的方法是map, 其余都不可以
// Array.prototype.map接受两个参数： cb & this
Array.prototype.myMap = function(cb, ctx) {
  const result = new Array(this.length)
  const context = ctx || Object(this)
  for(let i = 0;i< context.length; i++) {
    if (i in context) {
      result[i] = cb.call(context, context[i], i, context)
    }
  }
  return result
}


const myMapResult = new Array(3).fill(1).myMap(async(item, idx, arr) => {
  console.log('myMap item, idx', item, idx, arr)
  await Promise.resolve(item)
})
const mapArrayResult = new Array(3).fill(1).map(async(item, idx, arr) => {
  console.log('item, idx', item, idx, arr)
  await Promise.resolve(item)
}, { ctx: 2 })

/**
 * 自定义reduce，数组空或者初始值没有抛异常
 * @param {Function} cb(curVal, index)，未指定初始值时，遍历从1开始
 * @param {*} initData, 未指定初始值时默认为数组第0项
 * @returns result
 */

Array.prototype._reduce = function(cb, initData) {
  const ctx = Object(this)
  let result = initData || ctx[0]
  const startIndex = !initData ? 1 : 0
  for(let i = startIndex; i < ctx.length; i++) {
    cb ? result = cb.call(ctx, result, ctx[i], i, ctx) : null
  }
  return result
}

const myReduce = [1,2,3]._reduce((cur, item) => {
  return cur + item
})

console.log('myReduce', myReduce)


// 递归实现数组的flat
Array.prototype._flat = function(level = Infinity, curLevel = 0) {
  if (curLevel >= level) return this
  return this.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? cur._flat(level, curLevel++) : cur)
  }, [])
}
// 利用循环实现
Array.prototype._flat2 = function(level = Infinity) {
  const result = []
  let quene = [...this]
  let curLevel = 0
  while(quene.length) {
    const cur = quene.shift()
    if (curLevel <= level && Array.isArray(cur)) {
      // 注意这里很巧妙，是将 cur 解构一层后放入quene第一层
      quene.unshift(...cur)
      curLevel++
    } else {
      result.push(cur)
    }
  }
  return result
}

const test = [
  [1, 2, 3],
  4,
  [5, 6, [7, 8]]
]
// console.log('test flat is: -- ', test._flat())
// console.log('test flat is: -- ', test._flat(1))
console.log('test flat is: -- ', test._flat2(1))
// console.log('test flat is: -- ', test._flat(1))

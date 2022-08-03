/**
 * 
 * @param {Function} fn 
 * @param {*} defaultVal 
 * @returns 
 * defaultVal 有则初始值为 defaultVal, 初始下标从0开始，如果没有defaultVal，则初始值为第0个元素，初四下标从1开始
 */
Array.prototype._reduce = function(fn, defaultVal) {
  if(!Array.isArray(this)) throw '非数组'
  let prevVal = defaultVal === undefined ? this[0] : defaultVal
  let i = defaultVal === undefined ? 1 : 0
  while(i < this.length) {
    prevVal = fn(prevVal, this[i], i, this)
    i++
  }
  return prevVal
}

const a = [1,2,3]
const b = a.reduce((prev, cur, index, array) => {
  console.log('the index is: -- ',index,  array)
  return prev + cur
})
const c = a._reduce((prev, cur, index, array) => {
  console.log('the index is: -- ', index, array)
  return prev + cur
}, 3)
console.log('the b is: -- ',b)
console.log('the c is: -- ',c)
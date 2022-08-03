Array.prototype._filter = function(fn) {
  const result = []
  let i = 0
  while(i < this.length) {
    if(fn(this[i], i)) result.push(this[i])
    i++
  }
  return result
}

const a = [1,2,3]
const b = a.filter(item => item>2)
const c = a._filter(item => item>2)
console.log('the b is: -- ', b)
console.log('the c is: -- ', c)
Array.prototype._map = function(fn) {
  let i = 0
  const result = []
  while(i < this.length) {
    result[i] = fn(this[i], i)
    i++
  }
  return result
}

const a = [1,2,3]
async function asyncFun(data) {
  setTimeout(() => {
    Promise.resolve(data)
  }, 100);
}
const b = a.map(async (item, index) => {
 return await asyncFun(item)
})

const c = a._map(async (item, index) => {
  return await asyncFun(item)
})


console.log('the b is: -- ', b)
console.log('the c is: -- ', c)
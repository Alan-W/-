function isInstanceof(a, b) {
  let curProto = a.__proto__
  const res = []
  while(curProto) {
    res.push(curProto)
    if(curProto === b.prototype) return true
    curProto = curProto.__proto__
  }
  return res
}

function Person(name) {
  this.name = name
}

const p = new Person('wfy')

console.log('p instanceof Person', p instanceof Person)
console.log('p instanceof Object', p instanceof Object)
console.log('p instanceof Function', p instanceof Function)

console.log('Person instanceof Function', Person instanceof Function)
console.log('Person instanceof Person', Person instanceof Object)

console.log('{} instanceof Object', {} instanceof Object)
console.log('Object.prototype', Object.prototype)

console.log(isInstanceof(p, Person))
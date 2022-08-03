const a = 'const-a'
let b = 'let b'
var c = 'var x'
function func(b) {
  const test = 'test'
  console.log('b is: -- ', b)
  console.log('test is: -- ', test)
}
function test(a) {
  // const a = 'a'
  const b = 'b in test'
  console.log('a', a)
  console.log('b', b)
  func()
}
test(a)
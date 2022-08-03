// 十六进制 0-9, A-F
// 小于10进制： 0-n
// 1 < base < 17

const { Stack } = require('./index.js')
const numMap = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F'
}
function mulBase(num, base) {
  const s = new Stack()
  while(num > 0) {
    let remainder = parseInt(num % base)
    s.push(remainder > 9 && base > 9 ? numMap[remainder] : remainder)
    num = Math.floor(num / base)
  }
  let temp = s.dataStore.reverse().join('')
  temp = base === 16 ? '0x' + temp : base === 8 ? '0' + temp : temp
  return temp
}

console.log(mulBase(8, 3))
console.log(mulBase(175, 16))
console.log(mulBase(125, 8))
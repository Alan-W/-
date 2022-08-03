/**
 * 判断字符串s中括号是否匹配
 * 括号类型: (), {}, []
 */

const { Stack }  = require('./index.js')

function isCorrectBrackets(str) {
  const s = new Stack()
  const leftBracketMap = {
    '(': ')',
    '{': '}',
    '[': ']'
  }
  const rightBracketMap = {
    ')': '(',
    '}': '{',
    ']': '['
  }
  for (let i = 0; i < str.length; i++) {
    if (leftBracketMap[str[i]]) {
      s.push(str[i])
    } else if(rightBracketMap[str[i]]) {
      if(leftBracketMap[s.peek()] === str[i]) {
        s.pop()
      }
    }
  }
  return s.top === 0
}


console.log(isCorrectBrackets('[(1+2){}[]'))
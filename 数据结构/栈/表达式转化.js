/**
 * 将中序表达式转化为后序表达式并利用栈输出结果
 * op1 op1 operator
 * 使用两个栈，一个用来存储操作数，一个用来存储操作符，设计并实现一个js函数，该函数可以将中缀表达式转换为后缀表达式，然后利用栈对该表达式求值。
 */

const { Stack } = require("./index.js")

function infixToPostfix(exp) {
  const isOperator  = char => '+-/*()'.includes(char)
  const isBracket = char => '()'.includes(char)
  const comparePriority = { '*': 2, '/': 2, '+': 1, '-': 1 }
  const operandS = new Stack()
  const operatorS = new Stack()
  for (let i = 0; i < exp.length; i++) {
    const char = exp[i]
    if (isOperator(char)) {
      if (isBracket(char)) {
        if (char === '(') { // 遇到左括号直接入栈
          operatorS.push(char)
        } else if(char === ')') { // 遇到右括号，操作符栈出栈直到'('
          while(operatorS.peek() != '(') {
            operandS.push(operatorS.pop())
          }
          operatorS.pop() // 左括号出栈
        }
      } else {
        while(operatorS.top && comparePriority[char] <= comparePriority[operatorS.peek()]) { // 当前操作符优先级小于等于栈顶的操作符优先级，将栈顶操作符写入后缀表达式中
          operandS.push(operatorS.pop())
        }
        operatorS.push(char)
      }
    } else {
      operandS.push(char)
    }
  }
  while(operatorS.top) {
    operandS.push(operatorS.pop())
  }
  let str = ''
  while(operandS.top) {
    str = operandS.pop() + str
  }
  return str
}

console.log(infixToPostfix('(8+2)/3-4*7'))
 // '82+3/47*-'
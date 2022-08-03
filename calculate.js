/**
 * @param {string} s
 * @return {number}
 */
 function calculate(s) {
  const priority = { '+': 1, '-': 1, '*': 2, '/': 2 }
  const operatorStack = []
  const operandStack = []
  s = s.replace(/\s*/, '')
  for(let i = 0; i < s.length; i++) {
    const char = s[i]
    if('+-*/'.includes(char)) {
        const top = operatorStack[operatorStack.length-1]
        while(operatorStack.length && priority[char] <= priority[top]) {
          operandStack.push(operatorStack.pop())
        }
        operatorStack.push(char)
    } else {
      operandStack.push(char)
    }
  }
  console.log(operandStack, 'operandStack')
  console.log(operatorStack, 'operatorStack')
};

calculate('2+3/1+5') 
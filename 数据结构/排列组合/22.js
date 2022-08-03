/**
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 * @param {*} n 
 * @returns 
 */

var generateParenthesis = function(n) {
  const res = []
  function helper(index, str, leftNum, rightNum) {
    if(index === n * 2) {
      res.push(str)
      return
    }
    // 选择 '('
    if(leftNum < n 
      && ((!str || str.charAt(str.length - 1) === '(') || (str.charAt(str.length - 1) === ')' && rightNum <= leftNum))) {
      str += '('
      helper(index+1, str, leftNum+1, rightNum)
      // 回溯
      str = str.slice(0, -1)
    }
    // 选择 ')'
    if(rightNum <= leftNum) {
      str += ')'
      helper(index+1, str, leftNum, rightNum + 1)
      // 回溯
      str = str.slice(0, -1)
    }
  }
  helper(0, '', 0, 0)
  return res
};

console.log(generateParenthesis(3))
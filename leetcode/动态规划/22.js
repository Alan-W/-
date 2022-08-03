/**
 * 括号的生成
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例 1：

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]

 */

// 每次都是在原本的基础上找位置放下 '(' 和 ')'
var generateParenthesis = function(n) {
  let result = new Set(['()'])
  for(let i = 2; i <= n; i++) {
    const nextSet = new Set()
    for (const s of result) {
      for(let j = 0; j < s.length; j++) {
        nextSet.add(s.slice(0, j) + '()' + s.slice(j))
      }
    }
    result = nextSet
  }
  return [...result]
};

// dfs
var generateParenthesis = function(n) {
  let result = []
  const dfs = (i) => {
    if (i === 1) return '()'
    const subStr = dfs(--n)
    result.push(subStr)
    for(let j = 0; j < result.length; j++) {
      // result.push('(')
    }
  }
  dfs(n)
  return result
};

console.log('generateParenthesis(2)', generateParenthesis(2))
console.log('generateParenthesis(3)', generateParenthesis(3))
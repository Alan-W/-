/**
* 221. 最大正方形
在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。

*/

/**
* @param {character[][]} matrix
* @return {number}
*/
var maximalSquare = function(matrix) {
  const dp = new Array(matrix.length)
  /**
  dp[i][j]表示以(i,j)为右下角的最大正方形边长
  dp[i][j] 和 dp[i-1][j], dp[i-1][j-1], dp[i][j-1] 有关
  dp[i][j] = min(dp[i-1][j], dp[i-1][j-1], dp[i][j-1]) + 1 || 1
  */
  const m = matrix.length, n = matrix[0].length
  let max = 0
  for(let i = 0; i < m; i++) {
    dp[i] = []
    for(let j = 0; j < n; j++) {
      dp[i][j] = parseInt(matrix[i][j])
      max = Math.max(dp[i][j], max)
    }
  }
  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      if(matrix[i][j] == 0) {
        continue
      }
      // 三者且都大于0
      if(dp[i-1][j] && dp[i-1][j-1] && dp[i][j-1]) {
        dp[i][j] = Math.min(dp[i-1][j], dp[i-1][j-1], dp[i][j-1]) + 1
        max = Math.max(dp[i][j] ** 2, max)
      }
    }
  }
  return max
};

const matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
const m1 = [["0","1"],["1","0"]]
const m2 = [["0"]]
const m3 = [
  ["1","1","1","1","1","1","1","1"],
  ["1","1","1","1","1","1","1","0"],
  ["1","1","1","1","1","1","1","0"],
  ["1","1","1","1","1","0","0","0"],
  ["0","1","1","1","1","0","0","0"]
]
console.log(maximalSquare(matrix))
console.log(maximalSquare(m1))
console.log(maximalSquare(m2))
console.log(maximalSquare(m3))
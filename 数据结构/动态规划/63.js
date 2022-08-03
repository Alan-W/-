/**
 * 63. 不同路径 II
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。
现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
网格中的障碍物和空位置分别用 1 和 0 来表示。
 */


/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
 var uniquePathsWithObstacles = function(obstacleGrid) {
  const m = obstacleGrid.length, n = obstacleGrid[0].length
  const dp = []
  dp[0] = []
  dp[0][0] = obstacleGrid[0][0] === 1 ? 0 : 1
  for(let i = 1; i < m; i++) {
    dp[i] = []
    dp[i][0] = obstacleGrid[i][0] === 1 ? 0 : dp[i-1][0]
  }
  for(let j = 1; j < n; j++) {
    dp[0][j] = obstacleGrid[0][j] === 1 ? 0 : dp[0][j-1]
  }

  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      if(obstacleGrid[i][j] === 1) {
        dp[i][j] = 0
        continue
      }
      dp[i][j] = dp[i-1][j] + dp[i][j-1]
    }
  }
  return dp[m-1][n-1]
};

const obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
const obstacleGrid1 = [[0,1],[0,0]]
console.log(uniquePathsWithObstacles(obstacleGrid))
console.log(uniquePathsWithObstacles(obstacleGrid1))
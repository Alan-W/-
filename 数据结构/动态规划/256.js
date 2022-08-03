/**
 * 假如有一排房子，共 n 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。
当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 n x 3 的正整数矩阵 costs 来表示的。
例如，costs[0][0] 表示第 0 号房子粉刷成红色的成本花费；costs[1][2] 表示第 1 号房子粉刷成绿色的花费，以此类推。
请计算出粉刷完所有房子最少的花费成本
 */

/**
 * @param {number[][]} costs
 * @return {number}
 */
 var minCost = function(costs) {
  /* 动态规划： dp[i][j] 表示第i号房粉刷成 j 号色的最小成本
    i 号房的选择只和 i-1 号房的颜色有关
    dp[i][j] = costs[i][j] + Math.min(dp[i-1][非j], dp[i-1][非j])
    dp[i][0] = costs[i][0] + Math.min(dp[i-1][1], dp[i-1][2])
    dp[i][1] = costs[i][1] + Math.min(dp[i-1][0], dp[i-1][2])
    dp[i][2] = costs[i][2] + Math.min(dp[i-1][0], dp[i-1][1])
  */
  let min = 0
  const dp = new Array(costs.length)
  
  /* dp[i][0] 表示第i号房选择红色的成本
    dp[i][1] 表示第i号房选择蓝色的成本
    dp[i][2] 表示第i号房选择绿色的成本
  */
  // 一个房子的选择
  dp[0] = []
  dp[0][0] = costs[0][0]
  dp[0][1] = costs[0][1]
  dp[0][2] = costs[0][2]
  for(let i = 1; i < costs.length; i++) {
    dp[i] = [Infinity, Infinity, Infinity]
    dp[i][0] = costs[i][0] + Math.min(dp[i-1][1], dp[i-1][2])
    dp[i][1] = costs[i][1] + Math.min(dp[i-1][0], dp[i-1][2])
    dp[i][2] = costs[i][2] + Math.min(dp[i-1][1], dp[i-1][0])
  }
  // 最后一个dp 的最小值就是最小成本
  return Math.min(...dp[costs.length - 1])
};

const costs = [[5,8,6],[19,14,13],[7,5,12],[14,15,17],[3,20,10]]
console.log(minCost(costs))
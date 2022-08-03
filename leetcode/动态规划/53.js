// 寻找最大子序列和
/* 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
  [-2,1,-3,4,-1,2,1,-5,4]
  子数组 是数组中的一个连续部分 
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
  var maxSubArray = function(nums) {
    if (nums.length === 1) return nums[0]
    // 动态规划：
    // dp[i] = dp[i-1] + dp[i]
    // max = Math.max(dp[i], max)
    const dp = []
    // let max = -Infinity
    let max = (dp[0] = nums[0])
    for(let i = 1; i < nums.length; i++) {
      // 当前的最大合计 = 前一个的合计 + 当前数 或者是  当前数 自己 取较大的
      /* dp[i] = nums[i] + Math.max(0, dp[i-1])
      // 更新max 的值，计算了 dp[i-1], dp[i] 所谓“连续”
      max = Math.max(dp[i], max, dp[i-1]) */

      // 另一种方法
      dp[i] = nums[i]
      if (dp[i-1] > 0) {
        dp[i] += dp[i-1]
      }
      max = Math.max(dp[i], max)
    }
    return max
  };

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))
console.log(maxSubArray([-2,-3,-1]))
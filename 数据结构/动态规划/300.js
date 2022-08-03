/**
* 300. 最长递增子序列
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
*/

/**
* @param {number[]} nums
* @return {number}
*/
var lengthOfLIS = function(nums) {
  /**
    动态规划, dp[i]表示以nums[i]结尾的最长上升子序列
    dp[i] = (dp[j] + 1) 往回找，找到 0 < nums[j] < nums[i]，找到依次取 max(dp[0~j]) + 1
    */
  let max = -Infinity
  // 初始化数组dp，表示以nums[i]为结尾的最长上升子序列，初始化为1，因为包含自己的至少是1个
  const dp = new Array(nums.length).fill(1)
  for(let i = 0; i < nums.length; i++) {
    for(let j = 0; j < i; j++) {
      if(nums[i] > nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i])
      }
    }
    max = Math.max(max, dp[i])
  }
  return dp
};

const nums = [10,9,2,5,3,7,101,18]
console.log(lengthOfLIS(nums))
/**
 * 45. 跳跃游戏 II
  给你一个非负整数数组 nums ，你最初位于数组的第一个位置。
  数组中的每个元素代表你在该位置可以跳跃的最大长度。
  你的目标是使用最少的跳跃次数到达数组的最后一个位置。
  假设你总是可以到达数组的最后一个位置。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
  /* const dp = []
  function helper(index, steps) {
    if(index >= nums.length) {
      return steps
    }
    for(let i = 1; i <= nums[index]; i++) {
      helper(index + i, steps + 1)
    }
    dp[index] = Math.min((dp[index] || Infinity), steps)
    return dp[index]
  }

  helper(0, 0)
  return dp[nums.length-1] */
  let steps = 0, curEnd = 0, fathest = 0
  for(let i = 0; i < nums.length - 1; i++) {
    // 每次找到最大边界
    fathest = Math.max(i + nums[i], fathest)
    // 一旦有i超过了原本的边界,需要再跳一次
    if(i === curEnd) {
      steps++
      curEnd = fathest
    }
  }
  return steps
};
const va1 = [5,6,4,4,6,9,4]
console.log(jump(nums = va1))
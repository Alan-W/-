/**
 * 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
  数组中的每个元素代表你在该位置可以跳跃的最大长度。
  判断你是否能够到达最后一个下标。
 * @param {*} nums 
 */

var canJump = function(nums) {
  let fathest = 0
  for(let i = 0; i < nums.length - 1; i++) {
    fathest = Math.max(i + nums[i], fathest)
    if(fathest <= i) return false
    if(fathest >= nums.length - 1) return true
  }
  return fathest >= nums.length - 1
};

console.log(canJump([3,2,1,0,4]))
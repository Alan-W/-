/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
// 固定一位之后做三数之和
var fourSum = function(nums, target) {
  nums = nums.sort((a, b) => a-b)
  const res = []
  const len = nums.length
  for (let i = 0; i < nums.length; i++) {
    let left = i + 1, right = len - 1
    // 外层去重
    if(i && nums[i] === nums[i-1]) continue
    // 三数之和
    while(left < right) {
      // i 固定，left --> high 之间做三数之和
      // 三数之和相当于left 是固定的
      let dynamic = left + 1
      while(dynamic < right) {
        const sum = nums[i] + nums[left] + nums[dynamic] + nums[right]
        if(sum === target) {
          res.push([nums[i], nums[left], nums[dynamic], nums[right]])
          while(dynamic < right && nums[dynamic] === nums[dynamic+1]) dynamic++
          while(dynamic < right && nums[right] === nums[right-1]) right--
          dynamic++
          right--
        } else if(sum < target) {
          dynamic++
        } else {
          right--
        }
      }
      // 内层去重
      while(left < right && nums[left] === nums[left+1]) left++
      right = len - 1
      left++
    }
  }
  return res
};

const nums = [-3,-1,0,2,4,5], target = 0
const nums1 = [1,0,-1,0,-2,2], target1 = 0
const nums2 = [2,2,2,2,2], target2 = 8
const nums3 = [-2,-1,-1,1,1,2,2], target3 = 0
console.log(fourSum(nums, target))
console.log(fourSum(nums1, target1))
console.log(fourSum(nums2, target2))
console.log(fourSum(nums3, target3))
/**
 * 统计一个数字在排序数组中出现的次数。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let left = 0, right = nums.length - 1
  let res = 0
  while(left <= right) {
      let mid = left + Math.floor((right - left) / 2)
      if(nums[mid] === target) {
          right = mid - 1
      } else if(nums[mid] < target) {
          left = mid + 1
      } else if(nums[mid] > target) {
          right = mid - 1
      }
  }
  while(nums[left] === target) {
    left++
    res++
  }
  return res
};
const nums = [5,7,7,8,8,10], target = 8
const nums1 = [2,2], target1 = 2
console.log(search(nums1, target1))
console.log(search(nums, target))
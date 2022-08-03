/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
  /*const map = new Map()
  for(let i = 0; i < nums.length; i++) {
      if(map.has(target - nums[i])) {
          return [map.get(target - nums[i]), i]
      }
      else map.set(nums[i], i)
  } */
  // 双指针法
  nums = nums.map((item, idx) => ([item, idx]))
  nums = nums.sort((a, b) => a[0] - b[0])
  let left = 0, right = nums.length - 1
  while(left < right) {
      const sum = nums[left][0] + nums[right][0]
      if(sum < target) left++
      else if(sum > target) right--
      else return [nums[left][1], nums[right][1]]
  }
};
const nums = [2,7,11,15], target = 9
console.log(twoSum(nums, target))
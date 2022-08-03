/**
* @param {number[]} nums
* @return {number[][]}
*/
var threeSum = function(nums) {
  nums = nums.sort((a, b) => a - b)
  const res = []
  for(let i = 0; i < nums.length; i++) {
    let left = i + 1, right = nums.length - 1
    if(i && nums[i] == nums[i-1]) continue
    while(left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if(sum === 0) {
        res.push([ nums[i], nums[left], nums[right]])
        while(left < right && nums[left] === nums[left+1]) left++
        while(left < right && nums[right] === nums[right-1]) right--
        left++
        right--
      } else if(sum < 0) {
        left++
      } else {
        right--
      }
    }
  }
  return res
};

const nums = [-1,0,1,2,-1,-1,-4, -1,2]
const params = [-2,0,0,2,2]
const params1 = [1,-1,-1,0]
console.log('threeSum(params)', threeSum(params))
console.log('threeSum(nums)', threeSum(nums))
console.log('threeSum(params1)', threeSum(params1))
/**
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
  解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 * @param {*} nums 
 * @returns 
 */

var subsets = function(nums) {
  const res = []
  const list = []
  function helper(index, list) {
    if(index === nums.length) {
      res.push([...list])
      return res
    }
    // 不算当前数值
    helper(index + 1, list)
    // 将当前的放入list
    list.push(nums[index])
    helper(index + 1, list)
    // 回溯
    list.pop()
  }
  helper(0, list)
  return res
};

function subsets1(nums) {
  const res = []
  const temp = []
  // res.push(temp)
  function helper(arr, cur) {
    if(!arr.length) { 
      // return cur
    }
    res.push([...cur])
    for(let i = 0; i < arr.length; i++) {
      temp.push(arr[i])
      const curRes = helper(arr.slice(i+1), temp)
      // res.push([...curRes])
      temp.pop()
    }
    // return cur
  }

  helper(nums, [])
  return res
}

console.log(subsets([1, 2, 3]))
console.log(subsets1([1, 2, 3]))
// 全排列
// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

var permuteUnique = function(nums) {
  const res = []
  nums = nums.sort()
  const used = new Array(nums.length).fill(false)
  function helper(cur) {
    if(cur.length === nums.length) {
      res.push([...cur])
      return
    }
    for(let i = 0; i < nums.length; i++) {
      if(used[i]) continue
      if(i && nums[i] === nums[i-1] && !used[i-1]) continue
      cur.push(nums[i])
      used[i] = true
      helper(cur)
      cur.pop()
      used[i] = false
    }
  }
  helper([], 0, 0)
  return res
};

console.log(permuteUnique([1,1,3]))
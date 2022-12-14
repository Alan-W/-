/**
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
  candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 
  对于给定的输入，保证和为 target 的不同组合数少于 150 个。
  * @param {number[]} candidates
  * @param {number} target
  * @return {number[][]}
 */

var combinationSum = function(candidates, target) {
  const res = []
  function helper(minus, list, index) {
    if(minus === 0) {
      res.push([...list])
      return
    }
    if(minus < 0) return
    // i 从 index 开始，证明不能往回选，因为是组合，这里如果求的排列，则每次从0开始
    for (let i = index; i < candidates.length; i++) {
      const cur = candidates[i];
      list.push(cur)
      helper(minus - cur, list, i)
      list.pop()
    }
  }
  helper(target, [], 0)
  return res
};

console.log(combinationSum([3,12,9,11,6,7,8,5,4], 15))
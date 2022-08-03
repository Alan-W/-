/**
 * 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
  candidates 中的每个数字在每个组合中只能使用 一次 。
  注意：解集不能包含重复的组合。
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  const res = []
  candidates = candidates.sort((a, b) => a - b)
  function helper(minus, list, index) {
    if(!minus) {
      res.push([...list])
      return
    }
    if(minus < 0) return
    for (let i = index; i < candidates.length; i++) {
      // 剪枝一部分
      if(minus - candidates[i] < 0) break
      // 这个是回溯时到这里的判断，同一层进入的时候，相同元素从最后一个等值下标开始
      if(i > index && candidates[i-1] === candidates[i]) {
        continue
      }
      const cur = candidates[i];
      list.push(cur)
      helper(minus - cur, list, i+1)
      list.pop()
    }
  }
  helper(target, [], 0)
  return res
};

console.log(combinationSum2([10,1,2,2,7,6,1,5], 8))
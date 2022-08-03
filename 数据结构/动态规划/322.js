/**
 * 322. 零钱兑换
给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。

计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。

你可以认为每种硬币的数量是无限的。
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  let min = Infinity
  const cache = {}
  function helper(target) {
    if(target < 0) return -1
    if(target === 0) {
      return 0
    }
    if(cache[target]) return cache[target]
    let res = Infinity
    for(let i = 0; i < coins.length; i++) {
      const subProblem = helper(target - coins[i])
      if(subProblem === -1) continue
      res = Math.min(subProblem + 1, res)
    }
    cache[target] = res === Infinity ? -1 : Math.min(res, min)
    return cache[target]
  }
  return helper(amount)
};

const coins = [5, 2, 1], amount = 11
console.log(coinChange(coins, amount))
console.log(coinChange([2], 3))
console.log(coinChange([1], 1))
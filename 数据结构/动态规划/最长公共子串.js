/**
 * 找出 str1 和 str2 中最长的公共子串
 * 动态规划分析：dp[i][result] 表示 str1[i]和str2[i]的比较结果，result为0表示不相等，result 的结果其实就是当前位置相等： i-1 位置上的reuslt+1， 不等则置为0
 * dp[i][result] = dp[i-1][result]+1
 */

function findCommonStr(str1, str2) {
  // 初始化二维数组
  const dp = new Array(str1.length).fill([]).map(() => new Array(str2.length).fill(0))
  let max = -Infinity
  dp[0][0] = str1[0] === str2[0] ? 1 : 0

  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      if(i-1<0 || j-1 < 0) {
        dp[i][j] = str1[i] != str2[j] ? 0 :  1
      } else {
        dp[i][j] = str1[i] != str2[j] ? 0 : dp[i-1][j-1] + 1
      }
      
      max = Math.max(max, dp[i][j])
    }
  }
  return max
}

function findCommonStr1(str1, str2) {
  const dp = new Array(str1.length).fill(0)
  let max = -Infinity
  for(let i = 0; i < str1.length; i++) {
    let j = 0, start = i, count = 0, isLoop = false, curMax = 0
    while(j < str2.length) {
      while(str1[start] === str2[j] && start < str1.length) {
        start++
        count++
        isLoop = true
        j++
      }
      if(isLoop) {
        curMax = Math.max(count, curMax)
        count = 0
        isLoop = false
      }
      j++
    }
    dp[i] = Math.max(dp[i], curMax)
    max = Math.max(max, dp[i])
  }
  return max
}
console.log(findCommonStr1('aabd','daabbc'))
console.log(findCommonStr('aabd','daabbc'))
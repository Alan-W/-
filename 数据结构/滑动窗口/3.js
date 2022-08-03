/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * 示例 1:
  输入: s = "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(str) {
  let left = 0, right = 0
  let maxLen = -Infinity
  while(right < str.length) {
    right++
    const char = str[right]
    let curStr = str.slice(left, right)
    maxLen = Math.max(maxLen, curStr.length)
    while(curStr.includes(char)) {
      left++
      curStr = str.slice(left, right)
    }
  }
  return maxLen

};


const str = 'abcdabcbb'
console.log('lengthOfLongestSubstring(abcabcbb)', lengthOfLongestSubstring(str))
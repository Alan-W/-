/**
 * 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。
  换句话说，s1 的排列之一是 s2 的 子串 。
  输入：s1 = "ab" s2 = "eidbaooo"
  输出：true
  解释：s2 包含 s1 的排列之一 ("ba").
 */

  /**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  let isContain = false
  let left = 0, right = 0
  while(right < s2.length) {
    const char = s2[right]
    right++
    console.log('即将进入的字符是: -- ', char)
    const subStr = s2.slice(left, right)
    console.log('当前的子串是： -- ', subStr)
    let i = 0; let isCurContain = true
    while(i < subStr.length && !subStr.includes(s1[i])) {
      i++
      isCurContain = false
    }
    left = i + left
    console.log('the left is: -- ', left)
    if(isCurContain) {
      isContain = true
      break
    }
  }
  return isContain
};

const s1 = "ab", s2 = "eidbdaooo"
console.log(checkInclusion(s1, s2))
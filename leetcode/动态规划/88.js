/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  let i = 0
  nums1 = nums1.slice(0, m)
  while(nums2.length) {
    const cur = nums2.shift()
    while(nums1[i] <= cur) {
      i++
      n--
    }
    i > m - 1 ? nums1[i] = cur : nums1.splice(i, 0, cur)
  }
  return nums1
};
const nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
console.log('merge(nums1, m , nums2, n)', merge(nums1, m , nums2, n))
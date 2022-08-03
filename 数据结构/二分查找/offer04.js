// 在一个 n * m 的二维数组中，
// 每一行都按照从左到右递增的顺序排序，
// 每一列都按照从上到下递增的顺序排序。
// 请完成一个高效的函数，
// 输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
  let left = 0, top =0, right = matrix[0].length - 1, bottom = matrix.length - 1
  if(matrix[bottom][right] < target || matrix[top][0] > target) return false
  let res = false
  // // 纵向二分，查找边界
  // while(top <= bottom) {
  //   let hMid = top + Math.floor((bottom - top) / 2)
  //   if(matrix[hMid][0] === target || matrix[hMid][right] === target) return true
  //   else if(matrix[hMid][0] > target) {
  //     bottom = hMid- 1
  //   } else if(matrix[hMid][right] < target) {
  //     top = hMid + 1
  //   } else if(matrix[hMid][0] <= target && matrix[hMid][right] >= target) {
  //     // 缩小下边界，去寻找上边界
  //     bottom = hMid - 1
  //     // 扩大上边界，去寻找下边界
  //     top = hMid + 1
  //   }
  // }
  // [top, bottom] = [bottom, top]
  // console.log('top bottom', top, bottom)
  for(let i = top; i <= bottom; i++) {
    while(left <= right) {
      let mid = left + Math.floor((right - left) / 2)
      if(matrix[i][mid] === target) {
        res = true
        break
      }
      else if(matrix[i][mid] > target) right = mid -1
      else if(matrix[i][mid] < target) left = mid + 1
    }
    left = 0
    right =  matrix[0].length - 1
    if(res) break
  }
  return res
};

const matrix = [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]

console.log(findNumberIn2DArray(matrix, 18))
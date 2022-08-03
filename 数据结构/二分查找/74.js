/**
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

  每行中的整数从左到右按升序排列。
  每行的第一个整数大于前一行的最后一个整数。
 */

  /**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  if(!matrix.length) return false
  const m = matrix.length - 1, n = matrix[0].length - 1
  function getRowCol(index) {
    const r = parseInt(index / n), c = index % n
    return matrix[r][c]
  }
  let left = 0, right = n * m -1
  while(left <= right) {
    let mid = left + Math.floor((right - left)/2)
    const cur = getRowCol(mid)
    if(cur === target) return true
    else if(cur < target) left = mid + 1
    else if(cur > target) right = mid -1
  }
  return false
};

const matrix = [
  [1]
]
console.log(searchMatrix(matrix, target))
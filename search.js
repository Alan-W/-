// 二分查找，时间复杂度 O(logn)，二分查找的前置条件是数据被排好序了
const halfSearch = (data, target) => {
  if (data.length === 1) return data[0] === target ? target : null
  const mid = Math.floor(data.length / 2)
  if (data[mid] === target) return data[mid]
  if (data[mid] < target) {
    return halfSearch(data.slice(mid, data.length), target)
  } else {
    return halfSearch(data.slice(0, mid), target)
  }
}

const data = [2,3,4,5,6,7,8]
console.log('halfSearch(data, 8)', halfSearch(data, 1))
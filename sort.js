// 
/* function bubbleSort(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      let temp = arr[i]
      if (temp > arr[j]) {
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
} */


// 冒泡排序的思想是两两相邻的比较
function bubbleSort(arr) {
  let flag = false
  /* for(let i = 0; i< arr.length - 1; i++) {
    // arr.length - 1 - i; 因为每一轮外循环都会把后面的顺序排好
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j+1]) {
        const temp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = temp
        flag = true
      }
    }
    if (!flag) break
  } */
  /* for(let i = arr.length - 1; i > 0; i--) {
    for(let j = 0; j < i; j++) {
      if (arr[j] > arr[j+1]) {
        const temp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr */
  for(let i = 0; i < arr.length -1; i++) {
    for(let j = 0; j < arr.length - 1-i; j++) {
      if(arr[j] > arr[j+1]){
        [arr[j+1], arr[j]] = [arr[j], arr[j+1]]
      }
    }
  }
  return arr
}

// 选择排序，每次找到最小（大）的位置，下次跳过已经排序的位置
const chooseSort = (arr) => {
  let minIdx = 0
  for(let i = 0; i < arr.length - 1; i++) {
    minIdx = i;
    for(let j = i + 1; j < arr.length; j++) {
      if (arr[minIdx] > arr[j]) {
        minIdx = j
      }
    }
    // [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]]
    const temp = arr[minIdx]
    arr[minIdx] = arr[i]
    arr[i] = temp
  }
  return arr
}

// 快速排序
// 找到一个基准，将数组按照基准值分为两部分，小的在基准的左边，大的在基准的右边，每次递归左右两边的数组，递归的终止条件就是被递归的数组长度小于等于1
const quickSort = (arr) => {
  if (arr.length <= 1) return arr
  // 右移一位就相当于除以2，Math.floor(arr.length / 2)
  const mid = arr.length >> 1
  const left = [], right = [], pivoit = arr.splice(mid, 1)[0]
  for(let i = 0; i< arr.length; i++) {
    arr[i] > pivoit ? right.push(arr[i]) : left.push(arr[i])
  }
  return quickSort(left).concat(pivoit, quickSort(right))
}

console.log(bubbleSort([5,1,2,2,3]))
// console.log(chooseSort([6,0,5,1,2,3]))
// console.log(quickSort([6,0,5,1,2,3]))

function captureThreeNumbers(str) {
  let left = 0, right = 0
  let res = ''
  while(left < str.length) {
    const cur = str[left]
    if(!/\d/.test(cur)) {
      left++
      continue
    }
    right = left
    while(Math.abs(parseInt(str[right+1]) - parseInt(str[right])) === 1 && right - left <= 3) {
      right++
      res = str.slice(left, right+1)
      if(res.length === 3) break
    }
    if(res.length === 3) {
      return res
    }
    left++
  }
  return false
}

console.log(captureThreeNumbers('1234'))
console.log(captureThreeNumbers(''))


console.log('a8234'.match(/\d{3}/gi))
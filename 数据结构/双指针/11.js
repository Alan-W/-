var maxArea = function(height) {
  /* let res = 0
  for(let i = 0; i < height.length; i++) {
      for(let j = i + 1; j < height.length; j++) {
          res = Math.max(res, (j-i) * Math.min(height[i], height[j]))
      }
  }
  return res */
  let left = 0, right = height.length -1
    let res = 0
    while(left < right) {
      res = Math.max(res, (right - left) * Math.min(height[left], height[right]))
      if(height[left] < height[right]) left++
      else right--
    }
    return res
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]))
console.log(maxArea([1,1]))
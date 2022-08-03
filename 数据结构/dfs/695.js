/**
* @param {number[][]} grid
* @return {number}
*/
var maxAreaOfIsland = function(grid) {
  const m = grid.length, n = grid[0].length
  let max = 0
  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {
      if(grid[i][j] === 1) {
        const cur = dfs(i, j)
        max = Math.max(cur, max)
      }
    }
  }
  
  function dfs(x, y) {
    if(x < 0 || y < 0 || x >= m || y >= n) {
      return 0
    }
    if(grid[x][y] === 0) return 0
    grid[x][y] = 0
    const up = dfs(x, y-1)
    const down = dfs(x, y+1)
    const left = dfs(x-1, y)
    const right = dfs(x+1, y)
    const res = 1 + up + down + left + right
    return res
  }
  return max
};

const param1 = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
const param2 = [[0,0,0,0,0,0,0,0]]
console.log(maxAreaOfIsland(param1))
console.log(maxAreaOfIsland(param2))
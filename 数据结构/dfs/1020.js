/**
* @param {number[][]} grid
* @return {number}
*/
var numEnclaves = function(grid) {
  const m = grid.length, n = grid[0].length
  let res = 0
  // 将靠边的陆地都淹没成海洋，递归的去将靠边的陆地的上下左右变成海洋
  for (let i = 0; i < n; i++) {
    // 最上面一排
    dfs(0, i)
    // 最下面一排
    dfs(m-1, i)
  }

  for (let i = 0; i < m; i++) {
    // 最左面一排
    dfs(i, 0)
    // 最右面一排
    dfs(i, n-1)
  }
  for(let i = 0; i< m; i++) {
    for(let j = 0;j < n; j++) {
      if(grid[i][j] === 1) {
        res++
      }
    }
  }
  function dfs(x, y) {
    if(x < 0 || y < 0 || x >= m || y >= n) {
      return
    }
    // 已经是海水了
    if(grid[x][y] === 0) return
    grid[x][y] = 0
    // 递归找到靠边的，如果是陆地就变成海水
    dfs(x-1, y)
    dfs(x+1, y)
    dfs(x, y-1)
    dfs(x, y+1)
  }
  return res

};
// const grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
// console.log(numEnclaves(grid))
// const grid2 = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
// console.log(numEnclaves(grid2))
const grid3 = [[0],[1],[1],[0],[0]]
console.log(numEnclaves(grid3))
// 0
// 1
// 1
// 0
// 0
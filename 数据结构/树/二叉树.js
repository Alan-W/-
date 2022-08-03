const { Node } = require('./node.js')

// 二叉树
class BinaryTree {
  constructor() {
    this.root = null
  }

  // 构建二叉树
  generateTreeFromArr(arr) {
    if(!arr.length) return null
    this.root = new Node(arr[0])
    let isLeft = true
    const quenu = []
    quenu.push(this.root)
    for (let i = 1; i < arr.length; i++) {
      let curNode = quenu[0]
      if (isLeft) {
        if(arr[i] != null) {
          curNode.left = new Node(arr[i])
          quenu.push(curNode.left)
        }
        isLeft = false
      } else {
        if(arr[i] != null) {
          curNode.right = new Node(arr[i])
          quenu.push(curNode.right)
        }
        quenu.shift()
        isLeft = true
      }
    }
  }

  // 二叉查找树，较小的在左边，较大的在右边，插入节点
  bst_insert(data) {
    const newNode = new Node(data)
    if (!this.root) {
      this.root = newNode
      return
    }
    let currentNode = this.root
    let parent
    while(true) {
      parent = currentNode
      if(data < currentNode.value) {
        currentNode = currentNode.left
        if (!currentNode) {
          parent.left = newNode
          break
        }
      } else {
        currentNode = currentNode.right
        if (!currentNode) {
          parent.right = newNode
          break
        }
      }
    }
  }

  // 层序输出 BFS，BFS用的数据结构是对队列，而DFS用的是栈
  displyByLevel() {
    const quene = []
    quene.push(this.root)
    const result = []
    let level = 0
    while(quene.length) {
      let curLevelNum = quene.length
      result[level] = []
      for(let i = 0; i < curLevelNum; i++) {
        let currentNode = quene.shift()
        result[level].push(currentNode.value)
        if(currentNode.left) {
          quene.push(currentNode.left)
        }
        if(currentNode.right) {
          quene.push(currentNode.right)
        }
      }
      level++
    }
    return result
  }

  displayByLevel3() {
    const quene = []
    quene.push(this.root)
    const res = []
    while(quene.length) {
      const curLevelNums = quene.length
      const curLevelNodes = []
      for(let i = 0; i < curLevelNums; i++){
        const curNode = quene.shift()
        curLevelNodes.push(curNode.value)
        if(curNode.left) quene.push(curNode.left)
        if(curNode.right) quene.push(curNode.right)
      }
      res.push(curLevelNodes)
    }
    return res
  }

  /* dispayByLevel() {
    const quenue = [this.root]
    const result = []
    let level = 0
    while(quenue.length) {
      const curLevelNum = quenue.length
      result[level] = []
      for(let i =0; i < curLevelNum; i++) {
        const curNode = quenue.shift()
        result[level].push(curNode.val)
        if(curNode.left) {
          quenue.push(curNode.left)
        } else if (curNode.right){
          quenue.push(curNode.right)
        }
      }
      level++
    }
    return result
  } */

  // 使用递归层序输出，BFS
  displyByLevel2() {
    const nodes = []
    const res = []
    nodes.push(this.root)
    const bfs_level = (curLevelNodes) => {
      if(!curLevelNodes.length) return
      const curNodesValue = [] // 存放当前层节点的值
      const curNodesList = [] // 存放当前层的节点
      for (let i = 0; i < curLevelNodes.length; i++) {
        const node = curLevelNodes[i];
        curNodesValue.push(node.value)
        if(node.left) curNodesList.push(node.left)
        if(node.right) curNodesList.push(node.right)
      }
      res.push(curNodesValue)
      bfs_level(curNodesList)
    }
    bfs_level(nodes)
    return res
  }

  // 前序遍历：根-左-右，前序位置的代码在刚刚进入一个二叉树节点的时候执行
  preOrder(node) {
    if(!node) return
    console.log(node.value)
    this.preOrder(node.left)
    this.preOrder(node.right)
  }

  // 中序遍历：左-根-右，中序位置的代码在一个二叉树节点左子树都遍历完，即将开始遍历右子树的时候执行
  inOrder(node) {
    if(!node) return
    this.inOrder(node.left)
    console.log(node.value)
    this.inOrder(node.right)
  }

  // 后序遍历：左-右-根，后序位置的代码在将要离开一个二叉树节点的时候执行；
  postOrder(node) {
    if(!node) return
    this.postOrder(node.left)
    this.postOrder(node.right)
    console.log(node.value)
  }
  
  // 二叉树最大深度, 分解法
  depath() {
    let maxDepath = 0
    let depath = 0; // 当前节点的深度
    const traverse = (node) => {
      if(!node) return 0
      // 前序进入的时候+1
      depath++
      if(!node.left && !node.right) {
        maxDepath = Math.max(depath, maxDepath)
      }
      traverse(node.left)
      traverse(node.right)
      // 后序离开的时候-1
      depath--
    }
    traverse(this.root)
    return maxDepath
  }

  // 使用递归思想：一个树的最大深度 = Math.max(左子树的最大深度，右子树的最大深度) + 1
  max_depath(node) {
    if(!node) return 0
    const leftMaxDepath = this.max_depath(node.left)
    const rightMaxDepath = this.max_depath(node.right)
    const maxDepath = Math.max(leftMaxDepath, rightMaxDepath) + 1
    return maxDepath
  }

  // 最小深度
  min_depath(node) {
    if(!node) return 0
    const leftMinDepath = this.min_depath(node.left)
    const rightMinDepath = this.min_depath(node.right)
    if(node.left && !node.right) return leftMinDepath + 1
    else if(!node.left && node.right) return rightMinDepath + 1
    else return Math.min(leftMinDepath, rightMinDepath) + 1
  }

  min_depath2(root) {
    const quenue = []
    quenue.push(root)
    let depath = 0
    let minDepth = Infinity
    let curNode = root
    while(quenue.length) {
      depath++
      const curLevelNodeNum = quenue.length
      for(let i = 0; i < curLevelNodeNum; i++) {
        const curNode = quenue[i]
        if(!curNode.left && !curNode.right) {
          minDepth = Math.min(minDepth, depath)
        }
        if(curNode.left) quenue.push(curNode.left)
        if(curNode.right) quenue.push(curNode.right)
      }
      quenue.shift()
    }
    return minDepth
  }

  // 使用分解法前序遍历, 一棵树的前序遍历 = 根 + 左子树的前序遍历 + 右子树的前序遍历
  preOrder2(node) {
    if(!node) return []
    const leftTreePreOrder = this.preOrder2(node.left)
    const rightTreePreOrder = this.preOrder2(node.right)
    const res = [node.value].concat(leftTreePreOrder, rightTreePreOrder)
    return res
  }

  // 力扣543，最长”直径“ = 左子树的最大深度 + 右子树的最大深度
  maxLength() {
    let maxDiameter = 0
    const maxDepath = (node) => {
      if(!node) return 0
      const leftMaxDepath = maxDepath(node.left)
      const rightMaxDepath = maxDepath(node.right)
      maxDiameter = Math.max(maxDiameter, rightMaxDepath + leftMaxDepath)
      return 1 + Math.max(leftMaxDepath, rightMaxDepath)
    }
    maxDepath(this.root)
    return maxDiameter
  }

  hasPathSum (root, targetSum) {
    if(!root) return targetSum === 0
    const leftRes = this.hasPathSum(root.left, targetSum - root.value)
    const rightRes = this.hasPathSum(root.right, targetSum - root.value)
    if(!root.left && !root.right) return targetSum === root.value
    return leftRes || rightRes
  }
}

/* const tree = new BinaryTree()
tree.generateTreeFromArr([1,2,3,4,5,6])
tree.displyByLevel() */

/* const tree2 = new BinaryTree()
tree2.bst_insert(23)
tree2.bst_insert(45)
tree2.bst_insert(16)
tree2.bst_insert(37)
tree2.bst_insert(3)
tree2.bst_insert(99)
tree2.bst_insert(22)
console.log('tree2', tree2)
tree2.displyByLevel() */

const tree3 = new BinaryTree()
tree3.generateTreeFromArr([1,2,3,4,5,6,7,8])
console.log('层序输出1：', tree3.displyByLevel())
console.log('层序输出2：', tree3.displyByLevel2())
console.log('层序输出3：', tree3.displayByLevel3())


/* console.log('*****************-- 前序遍历--***********：')
tree3.preOrder(tree3.root)
console.log('*****************-- 中序遍历--***********：')
tree3.inOrder(tree3.root)
console.log('*****************-- 后序遍历--***********：')
console.log('当前树的最大深度：', tree3.depath())
console.log('当前树的最大深度：', tree3.max_depath(tree3.root))
console.log('前序遍历实现1：')
tree3.preOrder(tree3.root)
console.log('前序遍历实现2：', tree3.preOrder2(tree3.root))
console.log('长路径和：', tree3.maxLength()) */

const tree4 = new BinaryTree()
tree4.generateTreeFromArr([3,9,20,null,null,15,7])
// console.log('层序输出：', tree4.displyByLevel2())
// tree4.generateTreeFromArr([2,null,3,null,4,null,5,null,6])
// console.log('最小深度：', tree4.min_depath(tree4.root))
console.log('最小深度：', tree4.min_depath2(tree4.root))

// console.log(tree4.hasPathSum(tree4.root, 22))
/**
 * 给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和。
 * 二叉数左节点永远小于右节点
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
//  [10,5,15,3,7,13,18,1,null,6]
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

function treeList(list) {
  let curNode = new TreeNode(list.shift())
  const result = [curNode]
  let baseLeft = baseRight = null
  let count = 0
  while(list.length) {
    leftNode = new TreeNode(list.shift())
    rightNode = new TreeNode(list.shift())
    curNode.left = leftNode
    curNode.right = rightNode
    result.push(leftNode, rightNode)
    count++
    if ((count % 2)) {
      baseLeft = curNode.left
      baseRight = !baseRight ? curNode.right : baseRight
    } else {
      baseRight = curNode.right
      baseLeft = !baseLeft ? curNode.left : baseLeft
    }
    curNode = (count % 2) ? baseLeft : baseRight
  }
  return result
}

console.log('treeList', treeList([10,5,15,3,7,13,18,1,null,6]))

/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
  var rangeSumBST = function(root, low, high) {
    if (!root) return 0
    if (root.val >= low && root.val <= high) {
      return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high)
    } else return 0
  };

  rangeSumBST
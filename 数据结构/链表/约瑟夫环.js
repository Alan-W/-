// 使用循环链表，n个人围城一圈，第m个人会被杀掉，找出最后存活的两个人
const { Node } = require('./node.js')
const { LoopLinkList } = require('./loop-link-list')


function searchLivePerson(n, m, reset) {
  const ring = new LoopLinkList(1)
  ring.generatorTargetLenList(n-1)
  let i = 1
  let count = 0
  let currentNode = ring.head
  while(n - count > reset) {
    if (!(i % m)) {
      ring.remove(currentNode.value)
      count++
      i = 0
    }
    currentNode = currentNode.next
    i++
  }
  return ring
}

const reset = searchLivePerson(40, 3, 2)
reset.display()
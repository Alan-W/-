const {Node} = require('./node.js')

// 循环链表
class LoopLinkList {
  constructor(headVal = 'head') {
    this.head = new Node(headVal)
    this.head.next = this.head
  }

  // 根据ele查找当前节点
  find(value) {
    let currentNode = this.head
    while(currentNode && currentNode.value !== value) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  // 插入节点
  insert(newElement, posNodeValue) {
    let currentNode = new Node(newElement)
    const targetNode = this.find(posNodeValue)
    currentNode.next = targetNode.next
    targetNode.next = currentNode
  }

  // 打印
  display() {
    let currentNode = this.head
    while(currentNode && currentNode.next != this.head) {
      console.log(currentNode)
      currentNode = currentNode.next
    }
    console.log(currentNode)
  }

  // 查找指定节点的前一个节点
  findPreviousNode(value) {
    let currentNode = this.head
    while(currentNode.next != this.head && currentNode.next.value != value) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  // 删除指定元素
  remove(value) {
    let previousNode = this.findPreviousNode(value)
    if (previousNode.next === this.head) this.head = this.head.next
    previousNode.next = previousNode.next.next
  }
  // 初始化一个长度为n 的循环链表
  generatorTargetLenList(n) {
    let i = 1
    let currentNode = this.head
    let prevNode = this.head
    while(i <= n) {
      currentNode = new Node(++i)
      prevNode.next = currentNode
      prevNode = currentNode
    }
    prevNode.next = this.head
    return this.head
  }
  // 向后移动n位
  back(currentNodeVal, n) {
    let targetNode = this.find(currentNodeVal)
    while(n--) {
      targetNode = this.find(targetNode.value).next
    }
    return targetNode
  }

  // 向前移动n位
  advance(currentNode = this.head, n) {
    let targetNode = currentNode || this.find(currentNode)
    while(n--) {
      targetNode = this.findPreviousNode(targetNode)
    }
    return targetNode
  }

}
module.exports.LoopLinkList = LoopLinkList
const l1 = new LoopLinkList(1)
l1.generatorTargetLenList(9)
console.log(l1.back(2, 3), 'l1.back(3)')
console.log(l1.advance(5, 1), 'l1.advance(5,1)')
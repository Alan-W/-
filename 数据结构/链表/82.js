function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

// 需要哑结点的情况：头结点存在被删除的情况
// 初始节点指向的是哑结点
// head 实在迭代中一步一步更换的
var deleteDuplicates = function(head) {
  if(!head || !head.next) return head
  const dummyNode = new ListNode(-1, head)
  let curNode = dummyNode
  while(curNode.next) {
    let fastNode = curNode.next
    // 这个循环至少都会走一次
    while(fastNode && curNode.next.val === fastNode.val) {
      fastNode = fastNode.next
    }
    // curNode 和 fastNode 中间隔着一个，curNode 和前置节点似的
    // 中间相差一个元素
    if(curNode.next.next == fastNode) {
      curNode = curNode.next
    } else {
      // 有相同元素，直接跳过，curNode指向fastNode.next
      curNode.next = fastNode
    }
  }
  return dummyNode.next
};
// [1,2,3,3,4,4,5]
const head = {
  val: 1,
  next: {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 2,
        next: {
          val: 3,
          next: {
            val: 4,
            next: {
              val: 5,
              next: {
                val: 5,
                next: null
              }
            }
          }
        }
      }
    }
  }
}
console.log('deleteDuplicates(head)', deleteDuplicates(head))
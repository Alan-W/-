/**
 * @param {number} capacity
 */
// Map 先放的在前面，后放的在后面
// 性能不高
const LRUCache = function(capacity) {
  this.capacity = capacity
  this.cacheMap = new Map()
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key, initVal) {
  if(this.cacheMap.has(key)) {
    const curVal = initVal || this.cacheMap.get(key)
    this.cacheMap.delete(key)
    this.cacheMap.set(key, initVal || curVal)
    return initVal || curVal
  } else return -1
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  if(!this.cacheMap.has(key) && this.cacheMap.size === this.capacity) {
    // const firstKey = Array.from(this.cacheMap.keys())[0]
    // 删掉第一个key，最早的
    const firstKey = this.cacheMap.keys().next().value
    this.cacheMap.delete(firstKey)
  }
  if(this.cacheMap.has(key)) this.get(key, value)
  else this.cacheMap.set(key, value)
};

/* 
const l = new LRUCache(2)
l.put(2,1)
l.put(1,1)
l.put(2,3)
l.put(4,1)
console.log('l', l)
console.log(l.get(1))
console.log(l.get(2)) */

/********************8 加入链表解 **************************/
const LRUCache2 = function(capacity) {
  // 头结点、尾结点知识为了标记位置，并不存放任何有意义的值
  /**
   * 相当于 
   * head: {} <-> node <-> node2 <-> node3 <-> {}tail
   * */ 
  this.capacity = capacity
  this.cacheMap = new Map()
  this.head = {}
  this.tail = {}
  this.head.next = this.tail
  this.tail.pre = this.head
  this.size = 0
}

LRUCache2.prototype.get = function(key) {
  if(this.cacheMap.has(key)) {
    const node = this.cacheMap.get(key)
    this.moveToHead(key, node.value)
    return node.value
  } else return -1
}

LRUCache2.prototype.put = function(key, value) {
  if(this.cacheMap.has(key)) {
    this.moveToHead(key, value)
  } else {
    if(this.size < this.capacity) {
      this.addHeadNode(key, value)
    } else {
      this.deleteTail()
      this.addHeadNode(key, value)
    }
  }
}

LRUCache2.prototype.addHeadNode = function( key, value) {
  const newNode = { key, value }
  newNode.next = this.head.next // 新节点的下一个指向当前头结点的下一个，头结点永远为记录位置的，没有实际的值，只有next,pre
  this.head.next.pre = newNode
  this.head.next = newNode // 移动头结点
  newNode.pre = this.head // 第一个有意义的节点得前置就是头结点
  this.cacheMap.set(key, newNode)
  this.size++
}

LRUCache2.prototype.deleteNode = function(key) {
  const node = this.cacheMap.get(key)
  node.pre.next = node.next
  node.next.pre = node.pre
  this.size--
  this.cacheMap.delete(key)
}

LRUCache2.prototype.deleteTail = function() {
  const curTail = this.tail.pre // 当前真真有值的尾结点
  curTail.pre.next = this.tail // 移动尾节点
  this.tail.pre = curTail.pre
  this.cacheMap.delete(curTail.key)
  this.size--
}

LRUCache2.prototype.moveToHead = function(key, value) {
  this.deleteNode(key)
  this.addHeadNode(key, value)
}

const l2 = new LRUCache2(2)
l2.put(2,2)
l2.put(3,3)
l2.put(4,4)
console.log(l2.get(3))
console.log(l2.get(1))
// console.log(l2)
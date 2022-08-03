// 后入先出，栈顶操作

class Stack {
  constructor() {
    this.top = 0
    this.dataStore = []
  }

  pop() {
    const result = this.dataStore[--this.top]
    if (!this.top) this.dataStore = []
    return result
  }

  push(ele) {
    return this.dataStore[this.top++] = ele
  }

  peek() {
    return this.dataStore[this.top-1]
  }

  clear() {
    this.top = 0
  }

  list() {
    this.top--
    while (this.top >= 0) {
      console.log(this.dataStore[this.top--])
    }
  }
}


exports.Stack = Stack
/* const s1 = new Stack()
s1.push(1)
s1.push(2)
s1.push(3)
s1.push(4)
s1.list() */
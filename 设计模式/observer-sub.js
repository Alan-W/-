/**
 * 观察者模式
 */

// ObserverList 帮助观察者去管理订阅者，要做的事情就是通知变化
let did = 0
class Dep {
  constructor() {
    this.subs = []
    this.id = ++did
  }
  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(id) {
    const idx = this.subs.findIndex(sub => sub.id === id)
    this.subs.splice(idx, 1)
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

// 借助Dep来帮助自己管理订阅者，承担的角色的目标/数据
class Observer {
  constructor() {
    this.dep = new Dep()
  }
}

// 订阅者，作为视图层，watch，computed 等角色出现，要提供update接口供观察者调用
class Subscriber {
  constructor(id) {
    this.id = id
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  update() {
    console.log('我要去更新了')
    if (this.id === 1) {
      console.log('走条件1 的更新')
    } else {
      console.log('走条件2的更新')
    }
  }
}

// 调用示例
const ob1 = new Observer()
const subs1 = new Subscriber(1)
const subs2 = new Subscriber(2)

ob1.dep.addSub(subs1)
ob1.dep.addSub(subs2)


ob1.dep.notify()

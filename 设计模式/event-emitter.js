// 发布订阅模式

class EventEmitter {
  constructor() {
    this.eventsMap = new Map()
  }

  on(name, cb) {
    console.log('this.eventsMap.has(name)', this.eventsMap.has(name), this.eventsMap.get(name))
    this.eventsMap.has(name) ? this.eventsMap.set(name, [...this.eventsMap.get(name), cb]) : this.eventsMap.set(name, [cb])
  }

  off(name) {
    if (!name) {
      for (const event of this.eventsMap) {
        this.eventsMap.delete(event)
      }
    } else {
      this.eventsMap.delete(name)
    }
  }

  emit(name, ...args) {
    console.log(this.eventsMap.get(name))
    this.eventsMap.get(name)?.forEach(event => {
      event && event(args)
    })
  }
}

const a = new EventEmitter()
a.on('click', () => { console.log('a click1') })
a.on('click', () => { console.log('a click2') })
a.emit('click')
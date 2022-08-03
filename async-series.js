// 条件：
const urls = ['url5', 'url4', 'url3', 'url2', 'url1']
const getResponse = (url, index) => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      resolve(url)
    }, 1000)
  })
}
// 实现异步串行
// const asyncArrs = urls.map((item, index) => getResponse(url, index))
/* for await (const request of asyncArrs) {
  const result = request()
  console.log('request()', result)
} */
const asyncSeries = (asyncArrs) => {
  console.log('asyncSeries', new Date())
  return new Promise((resolve, reject) => {
    const result = new Array(asyncArrs.length).fill(1)
    const doTask = (i) => {
      getResponse(asyncArrs[i]).then(res => {
        if(i === asyncArrs.length) resolve(result)
        else {
          result[i] = res
          doTask(i+1)
        }
      }).catch(res => {
        if(i === asyncArrs.length) resolve(result)
        else {
          result[i] = res
          doTask(i+1)
        }
      })
    }
    doTask(0)
  })
}

/* 
asyncSeries(urls).then(res => {
  console.log('串行的结果', res)
  console.log('after asyncSeries', new Date())
})
 */
/**
 * 利用 reduce 方法实现异步串行
 * @param {*} asyncArr 异步数组
 * @returns promise object
 */
const asyncSeries2 = (asyncArr = []) => {
  // 利用reduce去实现
  return asyncArr.reduce((promiseChain, curAsync) => {
    promiseChain.then(curAsync).catch(curAsync)
  }, Promise.resolve())
}

// 异步并行
const asyncParallel = (asyncArr, limit = Infinity) => {
  const result = new Array(asyncArr.length).fill(1)
  let count = 0, curIdx = 0, curCounts = 0
  return new Promise((resolve) => {
    const doTask = () => {
      curIdx = curIdx + curCounts
      curCounts = Math.min(limit, asyncArr.length - curIdx)
      for(let i = curIdx; i < curCounts + curIdx; i++) {
        getResponse(urls[i], i).then(res => {
          result[i] = res
          count++
          count === asyncArr.length ? resolve(result) : doTask()
        }).catch(res => {
          result[i] = res
          count++
          count === asyncArr.length ? resolve(result) : doTask()
        })
      }
    }
    doTask()
  })
}

// 方法2
const asyncParallel1 = (asyncArr, limit = Infinity) => {
  const len = asyncArr.length
  let stepNum = Math.min(limit, len), curToIdx = 0, count = 0;
  const result = []
  const doTask = () => {
    stepNum = Math.min(limit, len - curToIdx)
    curToIdx = curToIdx + stepNum
    let idx = curToIdx
    while((curToIdx - idx) < stepNum) {
      getResponse(urls[idx], idx).then(res => {
        console.log('idx', idx)
        count++
        result[idx] = res
        count != len && doTask()
        console.log('异步并行结束1：', new Date().toTimeString())
      }).catch(err => {
        count++
        result[idx] = err
        count != len && doTask()
      })
      idx++
    }
  }
}


/* console.log('异步并行开始：', new Date().toTimeString())
asyncParallel(urls, 3).then(res => {
  console.log('异步并行结束：', new Date().toTimeString())
})
console.log('异步并行开始1：', new Date().toTimeString())
asyncParallel1(urls, 3) */


/* let count = 0
getResponse(urls[count], count).then(res => {
  console.log('the res is: -- ', res)
  if (count === urls.length) return
  count += 1
  getResponse(urls[count], count)
}) */




/* ******************************************************************** SCHEDULER ************************************************************************ */



// 异步限制 scheduler
/*
JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善下面代码的Scheduler类，使以下程序能够正常输出：
可以扩展为 N 个并发任务的限制
  class Scheduler {
    add(promiseCreator) { ... }
    // ...
  }
  const timeout = time => {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    }
  })
    
  const scheduler = new Scheduler()
    
  const addTask = (time,order) => {
    scheduler.add(
      () => timeout(time)
      .then(
        ()=>console.log(order)
      )
    )
  }
  addTask(1000, '1')
  addTask(500, '2')
  addTask(300, '3')
  addTask(400, '4')
  // output: 2 3 1 4
  整个的完整执行流程：
  起始1、2两个任务开始执行
  500ms时，2任务执行完毕，输出2，任务3开始执行
  800ms时，3任务执行完毕，输出3，任务4开始执行
  1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
  1200ms时，4任务执行完毕，输出4
*/

const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
  
/* 
 * 如果我们不加限制，直接调用：

    addTask(timeout(1000).then(_ => console.log(1)))
    addTask(timeout(500).then(_ => console.log(2)))
    addTask(timeout(300).then(_ => console.log(3)))
    addTask(timeout(400).then(_ => console.log(4)))

  * 输出的结果肯定是按照计时器的时间先后输出的 3 4 2 1
*/

// 并发代码的实现

class Scheduler {
  constructor(limit = Infinity) {
    // 并发的限制个数
    this.max = limit
    // 存放异步队列
    this.queue = []
    // 当前正在运行的任务数
    this.runCount = 0
  }

  add(promiseGenerator) {
    this.queue.push(promiseGenerator)
    this.run()
  }

  // 根据题目意思，run是在外界调用完add后自动触发执行的
  // 所以run里面不用循环去执行批量执行异步任务，相当于任务是一个一个加入队列后执行的，并不是一批任务去限制
  run() {
    if (this.queue.length && (this.runCount < this.max)) {
      // 先进先出
      const promiseGenerator = this.queue.shift()
      this.runCount++
      promiseGenerator().then(_ => {
        this.runCount --
        this.run()
      })
    }
  }

  // 扩展，批量传入一批任务，实现并发的限制
  batchRun(promiseArr) {
    while(promiseArr.length) {
      let count = Math.min(promiseArr.length, this.max)
      while(count--) {
        promiseArr.shift()()
      }
    }
  }
}

const scheduler = new Scheduler(2)

const addTask = (time, order) => {
  scheduler.add(
    () => timeout(time)
    .then(_ => {
      console.log(order)
    })
  )
}

/* addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(400, 4) */

const promiseArr = new Array(4).fill(0)
promiseArr[0] = () => timeout(1000).then(_ => console.log(1))
promiseArr[1] = () => timeout(500).then(_ => console.log(2))
promiseArr[2] = () => timeout(300).then(_ => console.log(3))
promiseArr[3] = () => timeout(400).then(_ => console.log(4))

scheduler.batchRun(promiseArr)

// 两种方式输出都是 3 4 2 1




// 防抖是任何事件都在触发后的n秒真正触发
const debounce = (immedidate, wait, fn) => {
  let timer = null
  return function() {
    immedidate && fn.apply(arguments)
    timer && clearTimeout(timer)
    timer = setTimeout(_ => {
      fn.apply(this, arguments)
    }, wait)
  }
}

// 节流是在时间段内，fn只触发一次
const throttle = (wait, fn) => {
  let time =  Date.now()
  return function(...args) {
    if (Date.now() - time >=  wait) {
      fn.apply(this, args)
      time = Date.now()
    }
  }
}
window.debounce = debounce
window.throttle = throttle

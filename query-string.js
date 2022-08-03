// 获取url参数

const getQueryParams = str => {
  const reg = 
  return str.match(reg)
}

console.log(getQueryParams('https://fed.taobao.org/blog/2016/04/26/performance-composite/?a=1&b=2&c=4'))
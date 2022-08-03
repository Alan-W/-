function strTempl(str, obj) {
  const reg = /\$\{(\w*)\}/g
  return str.replace(reg, (...args) => {
    const key = args?.[1]
    return obj[key]
  })

}

const name = 'aaa'
const obj = {
  name: 'www',
  age: 18
}
console.log(strTempl("${name}333${age}", obj))
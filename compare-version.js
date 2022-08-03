function compareVersion(v1, v2) {
  let v1Str = v1.split('.')
  let v2Str = v2.split('.')
  let res = 0
  while(v1Str.length && v2Str.length) {
    let curV1 = v1Str.shift().replace(/^0+(?=[1-9]+)|^0+$/, '')
    let curV2 = v2Str.shift().replace(/^0+(?=[1-9]+)|^0+$/, '')
    let i = 0
    while(i < curV1.length && i < curV2.length) {
      if(+(curV1.charAt(i)) > +curV2.charAt(i)) {
        res = 1
      } else if(+curV1.charAt(i) < +curV2.charAt(i)) {
        res = -1
      }
      i++
      if(res) break
    }
    curV1 = curV1.slice(i)
    curV2 = curV2.slice(i)
    if(curV1.length) res = 1
    if(curV2.length) res = -1
    if(res) break
  }
  if(res) return res
  v1Str = v1Str.join('')
  v2Str = v2Str.join('')
  if(v1Str.length && +v1Str) res = 1
  if(v2Str.length && +v2Str) res = -1
  return res
}

function compareVersion2(version1, version2) {
  const v1 = version1.split('.')
  const v2 = version2.split('.')
  for(let i = j = 0; i < v1.length || j < v2.length; i++, j++) {
    let x = i < v1.length ? parseInt(v1[i]) : 0
    let y = j < v2.length ? parseInt(v2[j]) : 0
    if(x < y) return -1
    else if(x > y) return 1
  }
  return 0
}


const v1 = '1.1000'
const v2 = '1.10'
console.log('compareVersion(v1, v2)', compareVersion(v1, v2))
console.log('compareVersion2(v1, v2)', compareVersion2(v1, v2))
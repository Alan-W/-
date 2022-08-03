function list2Tree(arr) {
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    map.set(cur.id, { ...cur, children: [] })
  }
  const result = []
  for(let [id, item] of map) {
    if(!item.pid) {
      result.push(item)
    } else {
      const curParent = map.get(item.pid)
      curParent.children.push(item)
    }
  }
  return JSON.stringify(result)
}

function list2Tree2(arr) {
  const traverse = id => {
    return arr.filter(item => item.pid === id).map(inner => {
      return {
        ...inner,
        children: traverse(inner.id)
      }
    })
  }
  
  const result = arr.filter(item => !item.pid).map(cur => {
    return { ...cur, children: traverse(cur.id)}
  })
  return JSON.stringify(result)
}

function list2Tree3(data) {
  function traverse(pid) {
    return data.filter(item => item.pid === pid).map(inner => ({
      ...inner,
      children: traverse(inner.id)
    }))
  }
  const res = data.filter(item => !item.pid).map(item => {
    return {
      ...item,
      children: traverse(item.id)
    } 
  })
  return JSON.stringify(res)
}

const list = [
  { id: 1, data: '全国', pid: null },
  { id: 11, data: '北京', pid: 1 },
  { id: 111, data: '朝阳', pid: 11 },
  {id: 12, data: '甘肃', pid: 1}
]

// console.log(list2Tree(list))
// console.log(list2Tree2(list))
console.log(list2Tree3(list))
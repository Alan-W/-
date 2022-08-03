// JS 中的各种for
// for

/*
  forEach
  forEach 针对的是可迭代对象，Map, Set, Array, arguments，这里不包括string
*/

const forEachMapData = new Map()
forEachMapData.set('a', 1)
forEachMapData.set('b', 2)
forEachMapData.set('c', 3)
forEachMapData.forEach(item => {
  console.log('for each map data, item is', item)
})


/* 
  for ...in
  适用于数组和对象，会在被范文数据原型上的所有属性，所以性能不好，要使用的话，加以加上 hasOwnProperty，所有可可枚举属性
  for(let key in data) {
    // data 为对象时 key 是对象的键
    // data 为数组是 key 是数组的下标，但是下标的类型是字符串类型
  }
*/ 
const forInArrayData = [1,2,3]
const forInObjData = { a: 1, b: 2, c: 3 }
for(let key in forInArrayData) {
  if (forInArrayData.hasOwnProperty(key)) {
    console.log('for in array data, key is idx: -- ', key, typeof(key))
  }
}
// symbol 类型的数据不能被 for...in 遍历到
for(let key in forInObjData) {
  if (forInObjData.hasOwnProperty(key)) { // 优化
    console.log('for in object data, key is key: -- ', key)
  }
}


/* 
  for ...of
  遍历可迭代对象，所谓的“可迭代”就是具备Symbol.iterator 属性的数据
  JS 中内置的可迭代对象数据格式有：Array, String, Map, Set, TypedArray, arguments 等，注意这里不包括Object类型
*/

const forOfArrayData = [1,2,3]
const forOfMapData = new Map()
forOfMapData.set('a', 1)
forOfMapData.set('b', 2)
forOfMapData.set('c', 3)
const forOfIteratorData = {
  [Symbol.iterator]: function* (){
    yield { a: 1 }
    yield { b: 2 }
    yield { c: 3 }
  }
}
const forOfString = 'abc'
for(let key of forOfArrayData) {
  console.log('for of array data, key is idx: -- ', key, typeof(key)) // idx, number
}

for(let [key, value] of forOfMapData) {
  console.log('for of map data, every item is: -- ', key, value)
}
// 内置了[Symbol.iterator]属性的数据都可以用 for ... of 来迭代
for(let item of forOfIteratorData) {
  console.log('for of iterator data, every item is: -- ', item)
}
// 字符串也是可迭代对象
for(let item of forOfString) {
  console.log('for of string data, every item is: -- ', item)
}



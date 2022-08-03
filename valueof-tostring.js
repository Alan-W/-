// 对象和数字进行比较的时候：
/* 
  1、若对象中有[Symbol.toPrimitive] ，则返回这个key定义的值，如果没有，到步骤2
  2、返回valueOf定义的返回值，如果未定义valueof，则到步骤三
  3、返回toString定义的返回值
*/

const obj = {
  val: 1,
  valueOf(){
    return this.val++
  }
}
console.log('obj == 1 && obj == 2 && obj == 3', obj == 1 && obj == 2 && obj == 3)
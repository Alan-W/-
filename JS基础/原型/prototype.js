// 原型链继承：子类型无法向父类型传递参数，子类型原型上新增方法需要在原型指向之后
function car(name) {
  this.name = name
}

car.prototype.setColor = function(color) {
  this.color = color
}

function childCar(price) {
  this.price = price
}

childCar.prototype = new car()
const c1 = new car('我的第一辆车')
c1.setColor('red')
c1.size = 'big'
const child1 = new childCar(1000)
child1.setColor('lalal')
console.log('child1 is: -- ', child1)
console.log('child1.__ptoto__', child1.__proto__)

console.log('the c1 is: -- ', c1)
console.log('c1.__proto__ === car.prototype', c1.__proto__ === car.prototype)
console.log('c1.__proto__ .constructor === car', c1.__proto__.constructor=== car)

// 组合继承，利用Object.create方法
function Parent(name) {
  this.name = name
}

Parent.prototype.setAge = function(age) {
  this.age = age
}

function Child(name, age) {
  Parent.call(this, name)
  this.name = name
  this.age = age
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const obj = {
  a: 1,
  b: 2
}
const test = Object.create(obj)
console.log('test', test)
console.log('test.prototype === obj.__proto__', test.__proto__ === obj)
// Object.create()创建的新对象的__proto__ 指向参数

// new 关键字发生的事儿: const instance = new Foo()
/* const obj = {}
obj.call(obj)
obj.__proto__ = FOO.prototype
return FOO() ? FOO() : obj */


for(let key in c1) {
  console.log('key', key)
}
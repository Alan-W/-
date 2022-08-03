class SuperClass {
  constructor(name) {
    this.name = name
  }
  toString() {
    console.log('this.name is: -- ', this.name)
  }
}

class SubClass extends SuperClass {
  constructor(name) {
    const s1 = super(name)
    console.log('s1', s1)
    console.log('s1.__proto__', s1.__proto__)
    console.log('s1.__proto__ === SuperClass.prototype', s1.__proto__ == SuperClass.prototype)
    console.log('s1.__proto__ === SubClass.prototype', s1.__proto__ == SubClass.prototype)
    console.log('s1 instanceof SubClass', s1 instanceof SubClass)
    console.log('s1 instanceof SuperClass', s1 instanceof SuperClass)
    this.name = name
  }

  func(){
    
  }
}

const super1 = new SuperClass('super')
console.log('super.__proto__', super1.__proto__)
console.log('super1.__proto__ === SuperClass.prototype', super1.__proto__ == SuperClass.prototype)
const sub1 = new SubClass('sub')
console.log('SubClass.prototype', SubClass.prototype)
console.log('SubClass.__proto__ === SuperClass', SubClass.__proto__ === SuperClass)
console.log('SubClass.prorotype instanceof SuperClass', SubClass.prorotype instanceof SuperClass)
console.log('SubClass instanceof SuperClass', SubClass instanceof SuperClass)
console.log('SubClass.prototype.constructor', SubClass.prototype.constructor)
console.log('Object.getPrototypeOf(subClass)', Object.getPrototypeOf(SubClass))
console.log('typeof SubClass', typeof SubClass)



/**
 * 总结
 * 1. ES6 的继承，使用extends 关键字，子类构造函数必须先调用super获取this
 * 2. __proto__属性指向构造该对象的构造函数所指向的原型对象（指向的是个对象）
 * 3. ES6 Class 作为构造函数的语法糖，既有__proto__属性也有prototype属性
 * 4. 因为：子类.prototype === 父类，所以：子类.__ptoto__ === 父类
 * 5. 子类.prototype.__proto__ = 父类.prototype
 */
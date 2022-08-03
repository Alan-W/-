function Parent(name) {
  this.name = name
}

Parent.prototype.getName = function() {
  console.log('this.name', this.name)
}

function Child(name) {
  Parent.call(this, name)
  this.age = 18
}


Parent.prototype.getName1 = function() {
  console.log('this.name', this.name)
}


Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
const c1 = new Child('child')
c1.getName1()





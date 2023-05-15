function Person(name) {
  this.name = name;
}

Object.prototype.test = 'test';

let p = new Person('kj');

console.log(p.__proto__ === Person.prototype);

console.log(Person === Person.prototype.constructor);

console.log(Person.prototype.__proto__ === Object.prototype);

console.log(Object.prototype.__proto__ === null);

for (let a in p) {
  console.log(a);
}

console.log(Object.keys(p))
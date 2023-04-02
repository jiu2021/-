function student(name, age) {
  this.name = name;
  this.age = age;

}

let p = new student('xiaoming', 11);
console.log(p);

function myNew(fn, ...args) {
  const obj = {};
  obj.__proto__ = fn.prototype;
  const res = fn.apply(obj, args);

  return typeof res === 'object' ? res : obj;
}

let p1 = myNew(student, 'xiaogang', 12);
console.log(p1);


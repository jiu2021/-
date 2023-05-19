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
  console.log(res)
  return typeof res === 'object' ? res : obj;
}

let p1 = myNew(student, 'xiaogang', 12);
console.log(p1);

function my_new(constructor, ...args) {
  let obj = {};

  obj.__proto__ = constructor.prototype;

  constructor.apply(obj, args);

  return obj
}


let p2 = my_new(student, 'xiaogang', 13);
console.log(p2)
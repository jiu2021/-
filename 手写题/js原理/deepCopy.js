function deepClone(obj) {
  // 先判断是对象还是数组
  let copy = obj instanceof Array ? [] : {};
  for (let key in obj) {
    // 判断是否是对象上的属性，而不是原型上的属性
    if (obj.hasOwnProperty(key)) {
      // obj[key] 是否是对象，如果是对象，递归遍历
      copy[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }
  return copy;
}

function deepClone2(obj) {
  return JSON.parse(JSON.stringify(obj)) //无法实现对象方法的深拷贝
}

// test
let obj = {
  name: 'jack',
  birth: { year: '1997', month: '10' },
  hello() {
    console.log('hello')
  }
};
let arr = [
  obj,
  deepClone(obj)
]





function my_deepClone(obj) {
  let copy = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }

  return copy;
}

console.log(my_deepClone(arr)) // {name: 'jack', birth: {…}}
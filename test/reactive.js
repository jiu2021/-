// const obj = {};

// Object.defineProperty(obj, 'a', {
//   set(val) {
//     console.log(`开始设置新值: ${val}`)
//   },
//   get() {
//     console.log(`开始读取属性`)
//     return 1;
//   },
//   // writable: true
// })

// // obj.a = 2 // 开始设置新值: 2
// obj.a // 开始获取属性 
// console.log(obj, obj.a, Object.keys(obj))


const new_obj = {
  a: 12
}

const proxy = new Proxy(new_obj, {
  get: function (target, p) {
    if (p in target) {
      console.log('get', target[p])
      return target[p];
    } else {
      throw Error('null')
    }
  },
  set: function (target, p, val, proxy) {
    if (p in target) {
      console.log('set', target[p])
      return Reflect.set(target, p, val, proxy);
    } else {
      throw Error('null')
    }
  }
});

console.log(proxy.a);

proxy.a = 15

console.log(proxy.a)

console.log(proxy, new_obj)
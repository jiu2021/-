function pAll(_promises) {
  return new Promise((resolve, reject) => {
    // Iterable => Array
    const promises = Array.from(_promises);
    const len = promises.length;
    // 结果用一个数组维护
    const r = [];
    let count = 0;
    for (let i = 0; i < len; i++) {
      // Promise.resolve 确保把所有数据都转化为 Promise
      Promise.resolve(promises[i])
        .then((o) => {
          // 因为 promise 是异步的，保持数组一一对应
          r[i] = o;
          // 如果数组中所有 promise 都完成，则返回结果数组
          if (++count === len) {
            resolve(r);
          }
          // 当发生异常时，直接 reject
        })
        .catch((e) => reject(e));
    }
  });
}

const timer = new Promise((resolve) => {
  setTimeout(() => {
    resolve(11);
  }, 1000);
})

const res = pAll([timer]);

setTimeout(() => {
  console.log(res)
}, 2000)



function myPAll(p_arr) {
  return new Promise((resolve, reject) => {
    let arr = Array.from(p_arr);
    const res_arr = []
    for (let p of p_arr) {
      Promise.resolve(p).then((res) => {
        res_arr.push(res)
        if (res.length == p_arr.length) {
          resolve(res_arr);
        }
      }).catch((e) => reject(e));
    }
  })
}
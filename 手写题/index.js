
Promise.resolve().then((resolve) => {

  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('222'))
    }, 0)
  }).catch(e => {
    console.log(e)
  })
}).catch((e) => {
  console.log(e)
})


var a = 1;

var obj = {
  a: 2,
  A() {
    const B = () => {
      console.log(this.a)
    }
    return B
  }
}

obj.A()()
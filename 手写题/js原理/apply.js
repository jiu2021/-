/*手写bind()*/

// Function.prototype.myApply = function (context, args) {
//   context.fn = this;
//   let res;
//   if (!args) {
//     res = context.fn();
//   } else {
//     res = context.fn(...args)
//   }

//   delete context.fn
//   return res;
// }

// 先给Function原型尚扩展个方法并接收2个参数

Function.prototype.myApply = function (context, args) {

  // 默认不传就是window，可以用es6给参数设置默认参数
  context = context || window
  args = args ? args : []

  //  给context新增一个独立无二的属性以免覆盖原有属性
  const key = Symbol()
  context[key] = this

  // 通过隐式绑定的方式调用函数
  const result = context[key](...args)

  // 删除添加的属性
  delete context[key]

  // 返回函数调用的返回值
  return result
}


// test
let obj = {
  name: 'jack'
}

function test(arg1, arg2, arg3) {
  console.log(this.name) // jack
  console.log(arg1, arg2, arg3); // 1 2 3
}
// test.apply(obj, [1, 2, 3]);

test.myApply(obj, [1, 2, 3]);
// console.log(obj);



// call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：
// call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔，直接放到后面 obj.myFun.call(db,'成都', ... ,'string' )。
// apply 的所有参数都必须放在一个数组里面传进去 obj.myFun.apply(db,['成都', ..., 'string' ])。
// bind 除了返回是函数以外，它 的参数和 call 一样。


Function.prototype.newApply = function (ctx, args) {
  args = args || [];
  ctx = ctx || window;

  const key = Symbol();
  ctx[key] = this;

  const res = ctx[key](...args)

  delete ctx[key]

  return res;
}

test.newApply(obj, [1, 2]);
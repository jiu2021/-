# js面试

### 简述事件循环

<img title="" src="https://segmentfault.com/img/remote/1460000012925884" alt="" width="427" data-align="center">

- 必须单线程，但要非阻塞，通过异步

- 事件队列：异步代码的执行，遇到异步事件不会等待它返回结果，而是将这个事件挂起，继续执行执行栈中的其他任务。当异步事件返回结果，将它放到事件队列中，被放入事件队列不会立刻执行起回调，而是等待当前执行栈中所有任务都执行完毕，主线程空闲状态，主线程会去查找事件队列中是否有任务，如果有，则取出排在第一位的事件，并把这个事件对应的回调放到执行栈中，然后执行其中的同步代码。

- 宏任务与微任务：每次执行一个宏任务后要清空微任务队列

- 先说基本知识点，宏任务、微任务有哪些

- 说事件循环机制过程，边说边画图出来
  
  <img title="" src="https://segmentfault.com/img/remote/1460000012925885" alt="" data-align="center" width="197">

- 说async/await执行顺序注意，可以把 chrome 的优化，做法其实是违法了规范的，V8 团队的PR这些自信点说出来，显得你很好学，理解得很详细，很透彻。

- 把node的事件循环也说一下，重复1、2、3点，node中的第3点要说的是node11前后的事件循环变动点。

宏任务（macrotask）：setTimeout、setInterval、setImmediate、I/O、UI rendering  
微任务（microtask）：promise.then、process.nextTick、MutationObserver、queneMicrotask(开启一个微任务)

### typeof和instanceof

- typeof的返回值是一个字符串，用来说明变量的数据类型；

- instanceof的返回值是布尔值，用于判断一个变量是否属于某个对象的实例。

### Map和WeakMap

- `Map` 的键可以是任意类型，`WeakMap` 只接受对象作为键（null除外），不接受其他类型的值作为键
- 强引用：`Map` 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键； 弱引用：`WeakMap` 的键是弱引用，键所指向的对象可以被垃圾回收，此时键是无效的
- `Map` 可以被遍历， `WeakMap` 不能被遍历

### 浏览器垃圾回收

- 标记清除：是当变量进入环境时，将这个变量标记为“进入环境”。当变量离开环境时，则将其标记为“离开环境”。标记“离开环境”的就回收内存
- 引用计数：跟踪记录每个值被引用的次数，释放引用次数是0的值所占的内存

### 闭包

**闭包**（closure）是一个函数以及其捆绑的周边环境状态（**lexical environment**，**词法环境**）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。

它可以记住产生时的词法作用域。

柯里化、代替全局变量

```js
        var fn  =function(){
            var sum = 0
            return functn(){
                sum++
                console.log(sum);
            }
        }
        fn1=fn() 
        fn1()   //1
        fn1()   //2
        fn1()   //3
        fn1 = null // fn1的引用fn被手动释放了
        fn1=fn()  //num再次归零
        fn1() //1
```

**不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。**

**内存溢出一般是指执行程序时，程序会向系统申请一定大小的内存，当系统现在的实际内存少于需要的内存时，就会造成内存溢出。**

### == 和 ===

===：

1. 如果是引用类型，则两个变量必须指向同一个对象（同一个地址）；
2. 如果是基本类型，则两个变量除了类型必须相同外，值还必须相等。

==：会有自动类型转换

### promise

1. 对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

`Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

**状态可传递：**

```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
```

**catch()**

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

错误会向后传递，直到被捕获，但不会传递到外层代码。

**finally()**

`finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

**all()**

用于将多个 Promise 实例，包装成一个新的 Promise 实例。

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

1. 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

2. 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

注意是修后返回的promise的状态

**race()**

同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

**allsetted()**

用来确定一组异步操作是否都结束了（不管成功或失败）。所以，它的名字叫做”Settled“，包含了”fulfilled“和”rejected“两种情况。

方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 Promise 对象都发生状态变更（不管是`fulfilled`还是`rejected`），返回的 Promise 对象才会发生状态变更。

状态变成`fulfilled`后，它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象。

```javascript
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
```

**any()**

方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。

```javascript
Promise.any([
  fetch('https://v8.dev/').then(() => 'home'),
  fetch('https://v8.dev/blog').then(() => 'blog'),
  fetch('https://v8.dev/docs').then(() => 'docs')
]).then((first) => {  // 只要有一个 fetch() 请求成功
  console.log(first);
}).catch((error) => { // 所有三个 fetch() 全部请求失败
  console.log(error);
});
```

只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

**Promise.resolve()**

返回一个resolved的promise对象

**Promise.rejected()**

返回一个reject的promise对象

## ES6

- let和const

- 解构赋值

- 函数
  
  参数默认值，rest参数，箭头函数

- 箭头函数
  
  （1）函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。
  
  （2）不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
  
  （3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
  
  （4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

- symbol 表示独一无二的值

- set和map

- 字符串
  
  迭代器接口，模板字符串

- Proxy 
  
  可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

- Reflect

- Promise

- Generator
  
  执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

- async
  
  Generator的语法糖，返回值为Promise

- class
  
  面向对象的三个基本特征：封装、继承、多态
  
  ```js
  class A {
    constructor() {
      console.log(new.target.name);
    }
  }
  class B extends A {
    constructor() {
      super();
    }
  }
  new A() // A
  new B() // B
  ```

- ES6模块
  
  CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
  
  CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

## 原型链

当谈到继承时，JavaScript 只有一种结构：对象。每个实例对象（object）都有一个私有属性（称之为 __proto__）指向它的构造函数的原型对象（**prototype**）。该原型对象也有一个自己的原型对象（__proto__），层层向上直到一个对象的原型对象为 `null`。根据定义，`null` 没有原型，并作为这个**原型链**中的最后一个环节

<img title="" src="https://img-blog.csdnimg.cn/20200724104747689.png" alt="" width="348" data-align="center">

## 变量提升、函数提升

- 函数提升只针对具名函数，而对于赋值的匿名函数，并不会存在函数提升。

- 函数提升优先级高于变量提升，且不会被同名变量声明覆盖，但是会被变量赋值后覆盖。而且存在同名函数与同名变量时，优先执行函数。

## for in 和 for of

简单来说就是它们两者都可以用于遍历，不过`for in`遍历的是数组的索引（`index`），而`for of`遍历的是数组元素值（`value`）

- for in
  
  使用`for in`会遍历数组所有的可枚举属性，包括原型

- for of
  
  `for of`遍历的是数组元素值，而且`for of`遍历的只是数组内的元素，不包括原型属性和索引
  
  `for of`适用遍历数/数组对象/字符串/`map`/`set`等拥有迭代器对象（`iterator`）的集合，但是**不能遍历对象**，因为没有迭代器对象，但如果想遍历对象的属性，你可以用`for in`循环（这也是它的本职工作）或用内建的`Object.keys()`方法

## 迭代器和生成器

### 迭代器

在 JavaScript 中，**迭代器**是一个对象，它定义一个序列，并在终止时可能返回一个返回值。更具体地说，**迭代器是通过使用 `next()` 方法实现 [Iterator protocol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol) 的任何一个对象**，该方法返回具有两个属性的对象： `value`，这是序列中的 next 值；和 `done` ，如果已经迭代到序列中的最后一个值，则它为 `true` 。如果 `value` 和 `done` 一起存在，则它是迭代器的返回值。

### 生成器

虽然自定义的迭代器是一个有用的工具，但由于需要显式地维护其内部状态，因此需要谨慎地创建。生成器函数提供了一个强大的选择：它允许你定义一个包含自有迭代算法的函数，同时它可以自动维护自己的状态。生成器函数使用 [`function*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)语法编写。最初调用时，生成器函数不执行任何代码，而是返回一种称为 Generator 的迭代器。通过调用生成器的下一个方法消耗值时，Generator 函数将执行，直到遇到 yield 关键字。

```js
function* walkPreOrder(node) {
  if (!node) return

  // 做些什么
  yield node
  if (node.children) {
    for (let child of node.children) {
      yield* walkPreOrder(child)
    }
  }
}

// 用法
for(let node of walkPreOrder(root)){
  console.log(node)
}
```

- 普通函数使用 function 声明，生成器函数用 function*声明
- 普通函数使用 return 返回值，生成器函数使用 yield 返回值
- 普通函数是 run to completion 模式，即普通函数开始执行后，会一直执行到该函数所有语句完成，在此期间别的代码语句是不会被执行的；生成器函数是 run-pause-run 模式，即生成器函数可以在函数运行中被暂停一次或多次，并且在后面再恢复执行，在暂停期间允许其他代码语句被执行

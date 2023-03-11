# js面试

### 简述事件循环

- 必须单线程，但要非阻塞，通过异步

- 事件队列：异步代码的执行，遇到异步事件不会等待它返回结果，而是将这个事件挂起，继续执行执行栈中的其他任务。当异步事件返回结果，将它放到事件队列中，被放入事件队列不会立刻执行起回调，而是等待当前执行栈中所有任务都执行完毕，主线程空闲状态，主线程会去查找事件队列中是否有任务，如果有，则取出排在第一位的事件，并把这个事件对应的回调放到执行栈中，然后执行其中的同步代码。

- 宏任务与微任务：每次执行一个宏任务后要清空微任务队列

- 先说基本知识点，宏任务、微任务有哪些

- 说事件循环机制过程，边说边画图出来

- 说async/await执行顺序注意，可以把 chrome 的优化，做法其实是违法了规范的，V8 团队的PR这些自信点说出来，显得你很好学，理解得很详细，很透彻。

- 把node的事件循环也说一下，重复1、2、3点，node中的第3点要说的是node11前后的事件循环变动点。

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

### 浏览器渲染

1.代码解析：浏览器向服务器请求到了 HTML 文档后便开始解析，产物是 DOM ，根据 CSS 生成 CSSOM（CSS对象模型）

2.对象合成：将 DOM 和 CSSOM 合并产生渲染树（render tree）

3.布局（layout）：有了渲染树，知道了所有节点的样式，便根据这些节点以及样式计算它们在浏览器中确切的大小和位置

4.绘制（paint）：即遍历render树，把节点绘制到浏览器上

简述：浏览器会把HTML解析成DOM，把CSS解析成CSSOM，DOM和CSSOM合并就产生了渲染树（Render Tree） 有了RenderTree，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。

- html 一边解析一边显示，css 的加载和解析不会阻塞 html 文档的解析
- css 必须完全解析完毕才能进入生成渲染树环节，css的解析会阻塞js的执行，必须等到CSSOM生成后才能执行 js
- js 的执行会阻塞 html 文档的解析（加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续渲染。原因是JavaScript可以修改DOM，所以必须把控制权让给它）

重绘不改变dom结构，重排改变渲染树一部分

### 闭包

**闭包**（closure）是一个函数以及其捆绑的周边环境状态（**lexical environment**，**词法环境**）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。

它可以记住产生时的词法作用域。

柯里化、代替全局变量

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

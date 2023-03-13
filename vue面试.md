# vue面试

### vue3.0 中为什么要使用 Proxy，有什么改进

1. Vue2.x 通过给每个对象添加`getter setter`属性去改变对象,实现对数据的观测,Vue3.x 通过 Proxy 代理目标对象,且一开始只代理最外层对象,嵌套对象`lazy by default` ,性能会更好
2. 支持数组索引修改,对象属性的增加,删除
- `Proxy` 作为新标准将受到浏览器厂商重点持续的性能优化

- `Proxy` 能观察的类型比 `defineProperty` 更丰富

- `Proxy` 不兼容IE，也没有 `polyfill`, `defineProperty` 能支持到IE9

- `Object.definedProperty` 是劫持对象的属性，新增元素需要再次 `definedProperty`。而 `Proxy` 劫持的是整个对象，不需要做特殊处理

- 使用 `defineProperty` 时，我们修改原来的 `obj` 对象就可以触发拦截，而使用 `proxy`，就必须修改代理对象，即 `Proxy` 的实例才可以触发拦截

### react 与 vue 数组中 key 的作用是什么

diff 算法需要比对虚拟 dom 的修改，然后异步的渲染到页面中，当出现大量相同的标签时，vnode 会首先判断 key 和标签名是否一致，如果一致再去判断子节点一致，使用 key 可以帮助 diff 算法提升判断的速度，在页面重新渲染时更快消耗更少

### v-if和v-show

v-show 总是会进行编译和渲染的工作 - 它只是简单的在元素上添加了 `display: none;` 的样式。v-show 具有较高的初始化性能成本上的消耗，但是使得转换状态变得很容易。 相比之下，v-if 才是真正「有条件」的：它的加载是惰性的，因此，若它的初始条件是 false，它就不会做任何事情。这对于初始加载时间来说是有益的，当条件为 true 时，v-if 才会编译并渲染其内容。切换 v-if 下的块儿内容实际上时销毁了其内部的所有元素，比如说处于 v-if 下的组件实际上在切换状态时会被销毁并重新生成，因此，切换一个较大 v-if 块儿时会比 v-show 消耗的性能多。

### Vue 中 nextTick 的实现原理是什么

Vue.nextTick() 方法是用来在 DOM 更新完成后执行回调函数的。其原理是利用 JavaScript 引擎的异步任务队列，在 DOM 更新完成后执行回调函数。

当 Vue 更新 DOM 时，它实际上是异步执行的。这意味着，当你修改 Vue 实例的数据时，Vue 并不会立即更新 DOM，而是将其放入一个队列中。当队列中所有的修改都执行完毕后，Vue 才会更新 DOM。Vue.nextTick() 方法的作用就是等待这个队列中的所有操作完成后，执行回调函数。

具体来说，当你在 Vue 实例上调用 nextTick(callback) 方法时，callback 函数会被推入一个异步任务队列中。在下一次 DOM 更新周期之前，JavaScript 引擎会执行该任务队列中的所有任务，包括你刚刚推入的 callback 函数。因此，当 callback 函数被执行时，Vue 实例的 DOM 已经更新完成。

需要注意的是，Vue.nextTick() 方法返回一个 Promise 对象，这个 Promise 会在 DOM 更新完成后解决，所以你也可以使用 async/await 来等待 DOM 更新完成

### vue3相对于vue2改变

- 监测机制的改变（Object.defifineProperty —> Proxy）
  
  改善了
  
  - 检测不到对象属性的添加和删除
  - 数组`API`方法无法监听到
  - 需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题

- treeshaking打包面积变小
  
  - 编译阶段利用`ES6 Module`判断哪些模块已经加载
  - 判断那些模块和变量未被使用或者引用，进而删除对应代码

- composition api
  
  - 在逻辑组织和逻辑复用方面，`Composition API`是优于`Options API`
  - 因为`Composition API`几乎是函数，会有更好的类型推断。
  - `Composition API`对 `tree-shaking` 友好，代码也更容易压缩
  - `Composition API`中见不到`this`的使用，减少了`this`指向不明的情况
  - 如果是小型组件，可以继续使用`Options API`，也是十分友好的

- 模板

- 对象式的组件声明⽅式 （class）

- 使⽤ts

- 其它⽅⾯的更改：⽀持⾃定义渲染器、 ⽀持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件、基于 treeshaking 优化，提供了更多的内置功能

### diff算法

diff算法的本质是找出两个对象之间的差异，目的是尽可能复用节点。

- 同级⽐较，再⽐较⼦节点

- 先判断⼀⽅有⼦节点⼀⽅没有⼦节点的情况(如果新的children没有⼦节点，将旧的⼦节点移除)

- ⽐较都有⼦节点的情况(核⼼diffff)

- 递归⽐较⼦节点

### data为什么必须是函数

- 根实例对象`data`可以是对象也可以是函数（根实例是单例），不会产生数据污染情况
- 组件实例对象`data`必须为函数，目的是为了防止多个组件实例对象之间共用一个`data`，产生数据污染。采用函数的形式，`initData`时会将其作为工厂函数都会返回全新`data`对象

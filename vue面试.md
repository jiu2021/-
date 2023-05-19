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

### 事件绑定

 Vue 在挂载实例前，有相当多的工作是进行模板的编译，将 template 模板进行编译，解析成 AST 树，再转换成 render 函数，而在编译阶段，就是对事件的指令做收集处理。在 template 模板中，定义事件的部分是属于 XML 的 Attribute，所以收集指令时需要匹配 Attributes 以确定哪个 Attribute 是属于事件。编译模板提取事件收集指令以及生成 render 字符串和 render 函数，但是事件真正的绑定到 DOM 上还是离不开事件注册，此阶段就发生在 patchVnode 过程中，在生成完成 VNode 后，进行 patchVnode 过程中创建真实 DOM 时会进行事件注册的相关钩子处理。invokeCreateHooks 就是一个模板指令处理的任务，他分别针对不同的指令为真实阶段创建不同的任务，针对事件，这里会调 updateDOMListeners 对真实的 DOM 节点注册事件任务。最终添加与移除事件都是调用的 add 与 remove 方法，最终调用的方法即 DOM 的 ddEventListener 方法与 removeEventListener 方法。

- vue 通过解析 template 里的 html 提取出 DOM 上的所有属性
- 过正则匹配出对应的事件名和对应的事件执行方法
- 通过 gen 方法生成事件虚拟渲染函数，事件作为属性注入到虚拟 DOM 里
- 在 el 的 events 里维护了事件和事件对应的内容方法以及修饰符，以及是否是动态事件名等信息
- 虚拟 DOM 转化到实际 DOM，并调用原生 addEventListener 绑定事件

### Vue 中 nextTick 的实现原理是什么

Vue.nextTick() 方法是用来在 DOM 更新完成后执行回调函数的。其原理是利用 JavaScript 引擎的异步任务队列，在 DOM 更新完成后执行回调函数。

当 Vue 更新 DOM 时，它实际上是异步执行的。这意味着，当你修改 Vue 实例的数据时，Vue 并不会立即更新 DOM，而是将其放入一个队列中（缓冲在同一事件循环中发生的所有数据变更）。当队列中所有的修改都执行完毕后，Vue 才会更新 DOM。Vue.nextTick() 方法的作用就是等待这个队列中的所有操作完成后，执行回调函数。

具体来说，当你在 Vue 实例上调用 nextTick(callback) 方法时，callback 函数会被推入一个异步任务队列中。在下一次 DOM 更新周期之前，JavaScript 引擎会执行该任务队列中的所有任务，包括你刚刚推入的 callback 函数。因此，当 callback 函数被执行时，Vue 实例的 DOM 已经更新完成。

> 当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。
> 
> `nextTick()` 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。

Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

### 双向绑定原理

- vue 里面用到了观察者模式，默认组件渲染的时候，会创建一个 watcher，并且渲染视图
- 当渲染视图的时候，会取 data 中的数据，会进行依赖收集，使用weakmap结构记录
- 同时让 watcher 也记住 dep ，dep 和 watcher 是多对多的关系，因为一个属性可能对应多个视图，一个视图对应多个数据
- 如果数据发生变化，也就是在 set 的时候，会触发 dep.notify() ，通知 dep 中存放的 watcher 去更新
- 每次更新数据都会同步调用 watcher 中 update 方法，此时就可以将更新的逻辑缓存起来，等会同步更新数据的逻辑执行完毕后，依次调用 (去重的逻辑)

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

### 生命周期

![](/Users/jiu/Library/Application%20Support/marktext/images/2023-03-27-15-22-37-image.png)

### computed和methods

1. computed 是基于响应性依赖来进行缓存的。只有在响应式依赖发生改变时它们才会重新求值, 也就是说, 当msg属性值没有发生改变时, 多次访问 reversedMsg 计算属性会立即返回之前缓存的计算结果, 而不会再次执行computed中的函数。但是methods方法中是每次调用, 都会执行函数的, methods它不是响应式的。  
2. computed中的成员可以只定义一个函数作为只读属性, 也可以定义成 get/set变成可读写属性, 但是methods中的成员没有这样的。
3. watch的使用场景是：当在data中的某个数据发生变化时, 我们需要做一些操作, 或者当需要在数据变化时执行异步或开销较大的操作时. 我们就可以使用watch来进行监听。

### 比较react

**Vue 使用的是 web 开发者更熟悉的模板与特性**，Vue的API跟传统web开发者熟悉的模板契合度更高，比如Vue的[单文件组件](https://www.zhihu.com/search?q=%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1066629375%7D)是以模板+JavaScript+CSS的组合模式呈现，它跟web现有的HTML、JavaScript、CSS能够更好地配合。React 的特色在于[函数式编程](https://www.zhihu.com/search?q=%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1066629375%7D)的理念和丰富的技术选型。Vue 比起 React 更容易被前端工程师接受，这是一个直观的感受；React 则更容易吸引在 FP 上持续走下去的开发者。

从**使用习惯和思维模式**上考虑，对于一个没有任何Vue和React基础的web开发者来说， Vue会更友好，更符合他的思维模式。React对于拥有函数式编程背景的开发者以及一些并不是以web为主要开发平台的开发人员而言，React更容易接受。这并不意味着他们不能接受Vue，Vue和React之间的差异对他们来说就没有web开发者那么明显。可以说，**Vue更加注重web开发者的习惯**。

实现上，Vue跟React的最大区别在于数据的reactivity，就是反应式系统上。**Vue提供反应式的数据，当数据改动时，界面就会自动更新，而React里面需要调用方法SetState。我把两者分别称为**[Push-based](https://www.zhihu.com/search?q=Push-based&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1066629375%7D)**和**Pull-based。所谓Push-based就是说，改动数据之后，数据本身会把这个改动推送出去，告知渲染系统自动进行渲染。在React里面，它是一个Pull的形式，用户要给系统一个明确的信号说明现在需要重新渲染了，这个系统才会重新渲染。两者并没有绝对的优劣之分，更多的也是思维模式和开发习惯的不同。

两者不是完全互斥的，比如说在React里面，你也可以用一些第三方的库像MobX实现Push-based的系统，同时你也可以在Vue2.0里面，通过一些手段，比如把数据freeze起来，让数据不再具有反应式特点，或者通过手动调用组件更新的方法来做一个pull-based系统。所以两者并没有一个绝对的界限，只是默认的倾向性不同而已。

- 都是数据驱动

- 都有组件化

- 都用虚拟dom

- 响应式原理不同

- 模板不同

- 渲染过程不同

### 数组监听

vue 出于性能的考虑，没有用 Object.defineProperty 去监听数组，而是通过覆盖数组的原型的方法，对常用的七种方法（[ 'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse' ]）进行了变异，以此来实现对数组的监听。

### vuex

1. Vuex本质是一个对象
2. Vuex对象有两个属性，一个是install方法，一个是Store这个类
3. install方法的作用是将store这个实例挂载到所有的组件上，注意是同一个store实例。
4. Store这个类拥有commit，dispatch这些方法，Store类里将用户传入的state包装成data，作为new Vue的参数，从而实现了state 值的响应式。

区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化，如果你开着 devtool 调用一个异步的 actions，你可以清楚地看到它所调用的 mutations 是何时被记录下来的，并且可以立刻查看它们对应的状态。

### 路由

- hash
  
  在 url 中的 # 之后对应的是 hash 值, 其原理是**通过hashChange() 事件监听hash值**的变化, 根据路由表对应的hash值来判断加载对应的路由加载对应的组件

- history
  
  利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。pushState()方法可以改变URL地址且不会发送请求，replaceState()方法可以读取历史记录栈，还可以对浏览器记录进行修改。
  这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。

## vue深入

### 设计前瞻

### 目录结构

- compiler-core    编译器核心库

- compiler-core 浏览器的编译时

- compiler-ssr 服务端渲染

- compiler-sfc 单文件组件

- reactivity 响应式

- runtime-core     运行时核心库

- runtime-dom     浏览器的运行时

- server-render 服务端渲染

- sfc-playground 单文件组件工具

### 编译时

![](/Users/jiu/Library/Application%20Support/marktext/images/2023-03-20-16-29-58-image.png)

js ast多了codegennode帮助生成render函数

**compile将vue模板编译成render函数**

- 初次渲染--挂载

- 更新渲染--打补丁

纯编译时损失灵活性

vue选择两者结合，运行时进行差异比对

### 运行时

**render接受vnode和container渲染成真实节点**

纯运行时必须提供复杂的js对象

### 响应式

Relfect保证安全的使用Proxy：

在复杂的使用场景保持正确的上下文，这是 Reflect 一系列 API的一个重要意义所在。

reciver：最初被调用的对象

reactive：

- 通过proxy的handler实现数据监听

- 需要使用effect副作用函数

- 基于weakmap的依赖收集
  
  ![](/Users/jiu/Library/Application%20Support/marktext/images/2023-04-24-15-45-54-image.png)
  
  指定对象、指定属性的依赖收集

- 存在一对多的依赖关系

ref：

- 未使用监听

- 生成了RefImpl的的实例对象

- 通过get set value定义了两个属性函数，通过主动触发来实现依赖收集和触发

- 必须使用.value保证响应性

### 虚拟dom

1. 兼容性好。因为Vnode本质是JS对象，所以不管Node还是浏览器环境，都可以操作；
2. 减少了对Dom的操作。页面中的数据和状态变化，都通过Vnode对比，只需要在比对完之后更新DOM，不需要频繁操作，提高了页面性能；

### diff算法

![](/Users/jiu/Library/Application%20Support/marktext/images/2023-03-20-15-23-05-image.png)

旧节点和新节点的子节点均为数组时使用

- 自前向后
  
  找相同的node，不同跳出

- 自后向前
  
  找相同的node，不同跳出

- 新多于旧
  
  新建节点

- 旧多于新
  
  删除节点

- 乱序
  
  **第一步： 通过老节点的key找到对应新节点的index:开始遍历老的节点，判断有没有key， 如果存在key通过新节点的keyToNewIndexMap找到与新节点index,如果不存在key那么会遍历剩下来的新节点试图找到对应index。**
  
  **第二步：如果存在index证明有对应的老节点，那么直接复用老节点进行patch，没有找到与老节点对应的新节点，删除当前老节点。**
  
  **第三步：newIndexToOldIndexMap找到对应新老节点关系。**
  
  **为什么要得到最长稳定序列**
  
  因为我们需要一个序列作为基础的参照序列，其他未在稳定序列的节点，进行移动。

### 组件

- 本质上是个对象

- 组件渲染通过render函数处理

- 生命周期即方法回调

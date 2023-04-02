# vue深入

## 设计前瞻

### 目录结构

- compiler-core    编译器核心库

- compiler-core    浏览器的编译时

- compiler-ssr       服务端渲染   

- compiler-sfc       单文件组件

- reactivity             响应式

- runtime-core      运行时核心库

- runtime-dom     浏览器的运行时

- server-render    服务端渲染

- sfc-playground  单文件组件工具

### 运行时

render接受vnode和container渲染成真实节点 

纯运行时必须提供复杂的js对象

### 编译时

![](/Users/jiu/Library/Application%20Support/marktext/images/2023-03-20-16-29-58-image.png)

js ast多了codegennode帮助生成render函数

compile将vue模板编译成render函数

- 初次渲染--挂载

- 更新渲染--打补丁

纯编译时损失灵活性

vue选择两者结合，运行时进行差异比对

### 响应式

Relfect保证安全的使用Proxy

reactive：

- 通过proxy的handler实现数据监听

- 需要使用effect副作用函数

- 基于weakmap的依赖收集
  
  <img title="" src="file:///Users/jiu/Library/Application%20Support/marktext/images/2023-04-02-11-13-05-image.png" alt="" data-align="center" width="413">
  
  指定对象、指定属性的依赖收集

- 存在一对多的依赖关系

ref:

- 未使用监听

- 生成了RefImpl的的实例对象

- 通过get set value定义了两个属性函数，通过主动触发来实现依赖收集和触发

- 必须使用.value保证响应性

## 虚拟dom

1. 兼容性好。因为Vnode本质是JS对象，所以不管Node还是浏览器环境，都可以操作；
2. 减少了对Dom的操作。页面中的数据和状态变化，都通过Vnode对比，只需要在比对完之后更新DOM，不需要频繁操作，提高了页面性能；

## diff算法

![](/Users/jiu/Library/Application%20Support/marktext/images/2023-03-20-15-23-05-image.png)

旧节点和新节点的子节点均为数组时使用

- 自前向后

- 自后向前

- 新多于旧

- 旧多于新

- 乱序
  
  **第一步： 通过老节点的key找到对应新节点的index:开始遍历老的节点，判断有没有key， 如果存在key通过新节点的keyToNewIndexMap找到与新节点index,如果不存在key那么会遍历剩下来的新节点试图找到对应index。**
  
  **第二步：如果存在index证明有对应的老节点，那么直接复用老节点进行patch，没有找到与老节点对应的新节点，删除当前老节点。**
  
  **第三步：newIndexToOldIndexMap找到对应新老节点关系。**
  
  **为什么要得到最长稳定序列**
  
  因为我们需要一个序列作为基础的参照序列，其他未在稳定序列的节点，进行移动。

## 组件

- 本质上是个对象

- 组件渲染通过render函数处理

- 生命周期即方法回调

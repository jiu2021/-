# CSS面试

### flex

**flex：**

- flex-grow

  设置 flex 项 [主尺寸](https://www.w3.org/TR/css-flexbox/#main-size) 的 flex 增长系数

- flex-shrink

  指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。

- flex-basis

  指定了 flex 元素在主轴方向上的初始大小。如果不使用 [`box-sizing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing) 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸

**flex-flow：**

- [`flex-direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction): `row`
- [`flex-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap): `nowrap`

### 层叠

z-index是在父元素的基础上进行层叠

### 命名冲突

BEM是Block（块）、Element（元素）、Modifier（修饰符）的简写，是一种组件化的 CSS 命名方法和规范

### 盒模型

box-sizing：content-box不包括padding和border

border-box

### css变量

css变量减少样式重复定义，比如同一个颜色值要在多个地方重复使用，以前通过less和sass预处理做到，现在css变量也可以做到，方便维护，提高可读性

### 选择器

+号 相邻兄弟选择器

～号 后续兄弟选择器
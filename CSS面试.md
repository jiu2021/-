# CSS面试

### flex

默认 === 0 1 auto

flex：1 === 1 1 0

**flex：**

- flex-grow（0）
  
  设置 flex 项 [主尺寸](https://www.w3.org/TR/css-flexbox/#main-size) 的 flex 增长系数

- flex-shrink（1）
  
  指定了 flex 元素的收缩规则。flex 元素仅在**默认宽度之和大于容器的时候**才会发生收缩，其收缩的大小是依据 flex-shrink 的值。

- flex-basis（auto）
  
  指定了 flex 元素在主轴方向上的初始大小。如果不使用 [`box-sizing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing) 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸
  
  auto：根据设置的宽高，否则根据内容
  
  0：忽视宽高，根据内容

**flex-flow：**

- [`flex-direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction): `row`
- [`flex-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap): `nowrap`

auto 是 flex-basis 的默认值，长度等于灵活项目(弹性子元素)的长度。如果该项目未指定长度(未设置width或height属性)，则长度将根据内容决定

flex-basic:0; 即使元素设置了 width 或 height 也会被忽略掉，以元素自身内容大小为弹性子元素的伸缩基准值

**align-items：**

[`align-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) 属性可以使元素在交叉轴方向对齐。

- `stretch`
- `flex-start`
- `flex-end`
- `center`

**justify-content：**

[`justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)属性用来使元素在主轴方向上对齐

- `flex-start`

- `stretch`

- `flex-end`

- `center`

- `space-around`

- `space-between`

### position

`absolute`：元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。

`relative`：该关键字下，元素先放置在未添加定位时的位置（相对于自身定位），再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。position:relative 对 table-*-group, table-row, table-column, table-cell, table-caption 元素无效。

### 层叠

z-index是在父元素的基础上进行层叠

### 命名冲突

BEM是Block（块）、Element（元素）、Modifier（修饰符）的简写，是一种组件化的 CSS 命名方法和规范

### 盒模型

box-sizing：content-box宽高不包括padding和border，是标准盒模型

border-box

### css变量

css变量减少样式重复定义，比如同一个颜色值要在多个地方重复使用，以前通过less和sass预处理做到，现在css变量也可以做到，方便维护，提高可读性

### 选择器

+号 相邻兄弟选择器

～号 后续兄弟选择器

## 伪类/伪元素

伪类用于选择DOM树之外的信息，包含那些匹配指定状态的元素 ，比如:visited，:active，:hover，:focus；或是 不能用简单选择器进行表示的信息 ；表示元素的一种状态。
伪元素包含那些满足一定逻辑条件的DOM树中的元素，比如: ::before, ::after

## 未知宽高居中

- inline-block + vertical-align：middle

- absolute + translate

- flex

## 样式穿透

- `css`可以使用`>>>`，`/deep/`，`::v-deep`
- `less`和`node-sass`可以使用`/deep/`，`::v-deep`
- `dart-sass`可以使用`::v-deep`
- `vue2.7`以上版本以及包括`vue3`，应该使用`:deep()`

## CSS in JS

CSS Modules 并不是 CSS 官方的标准，也不是浏览器的特性，而是使用一些构建工具，比如 webpack，对 CSS 类名和选择器限定作用域的一种方式（类似命名空间）。通过 CSS Modules，我们可以实现 CSS 的局部作用域，Class 的组合等功能。最后我们知道 CSS Loader 实际上是通过两个库进行实现的。其中， `postcss-modules-scope` —— 实现CSS Modules 的样式隔离（Scope Local）以及继承（Extend）和 `postcss-modules-values` ——在模块文件之间传递任意值

## 响应式布局

实现响应式布局的方式有如下：

- 媒体查询
- 百分比
- vw/vh
- rem

## 1px边框

```css
.scale-1px{
  position: relative;
  border:none;
}
.scale-1px:after{
  content: '';
  position: absolute;
  bottom: 0;
  background: #000;
  width: 100%;
  height: 1px;
  /*核心是利用transform缩放边框*/
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
```

```js
if(window.devicePixelRatio && devicePixelRatio >= 2){
  document.querySelector('ul').className = 'scale-1px';
}
```

 **`devicePixelRatio`** 返回当前显示设备的*物理像素*分辨率与*CSS 像素*分辨率之比。

我们在设计1px的边框时，我们是想要1px的物理像素。如果我们仅仅根据设备像素比来计算出需要书写的CSS像素时，又会因为不同浏览器的策略而出现许多兼容性问题，针对此问题，我们可以通过伪元素+transform的手段来解决。
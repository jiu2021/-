# html面试

### 头部

```html
<DOCTYPE html>
```

声明文档类型

| 标签                                                      | 描述                |
| ------------------------------------------------------- | ----------------- |
| [<head>](https://www.runoob.com/tags/tag-head.html)     | 定义了文档的信息          |
| [<title>](https://www.runoob.com/tags/tag-title.html)   | 定义了文档的标题          |
| [<base>](https://www.runoob.com/tags/tag-base.html)     | 定义了页面链接标签的默认链接地址  |
| [<link>](https://www.runoob.com/tags/tag-link.html)     | 定义了一个文档和外部资源之间的关系 |
| [<meta>](https://www.runoob.com/tags/tag-meta.html)     | 定义了HTML文档中的元数据    |
| [<script>](https://www.runoob.com/tags/tag-script.html) | 定义了客户端的脚本文件       |
| [<style>](https://www.runoob.com/tags/tag-style.html)   | 定义了HTML文档的样式文件    |

<!DOCTYPE html>

<!DOCTYPE html>

### H5新特性

- 语义化标签
  
  1. 代码结构清晰，可读性高，减少差异化，便于团队开发和维护。
  2. 对搜索引擎友好，良好的结构和语义，有助于爬虫抓取更多的有效信息。
  3. 提升页面的阅读性(结构性增强)，对于使用屏幕阅读器的人来说会更友好

- 新增媒体元素

- canvas

- 本地存储

- webworker

- 新增表单控件

### 图片懒加载

- 位置计算 + 滚动事件 (Scroll) + DataSet API
  
  offsetTop、offsetLeft 与最近具有定位的祖先元素的距离（client中border宽度）
  
  offsetWidth、offsetHeight 包括padding和border（client不包括border和padding）
  
  offsetX、offsetY 相对于容器（client 相对于文档）
  
  scrollWidth、scrollHeight 内容可视区➕被隐藏区
  
  scrollTop、scrollLeft  内容顶部到可视区顶部

- getBoundingClientRect API + Scroll with Throttle + DataSet API
  
  **`Element.getBoundingClientRect()` 方法返回元素的大小及其相对于视口的位置**

- loading = lazy

### DOM

[`DocumentFragments` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment "Currently only available in English (US)") 是 DOM 节点。它们不是主 DOM 树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到 DOM 树。在 DOM 树中，文档片段被其所有的子元素所代替。

因为文档片段存在于**内存中**，并不在 DOM 树中，所以将子元素插入到文档片段时不会引起页面[回流](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow)（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。

### BFC

块级格式上下文

1. BFC元素垂直方向的边距会发生重叠。属于不同BFC外边距不会发生重叠
2. BFC的区域不会与浮动元素的布局重叠。
3. BFC元素是一个独立的容器，外面的元素不会影响里面的元素。里面的元素也不会影响外面的元素。
4. 计算BFC高度的时候，浮动元素也会参与计算(清除浮动)

BFC元素特性表现原则就是，内部子元素再怎么翻江倒海，翻云覆雨都不会影响外部的元素

- overflow: hidden（不为visible）
- display: inline-block、flex、table-cell
- position: fixed、absolute（不是static或reletive）
- `float` 的值不为 `none`

content-box是标准盒模型，boder-box是IE盒模型

### 元素隐藏

空间：

display:none隐藏后不占据额外空间，它会产生回流和重绘，而visibility:hidden和opacity:0元素虽然隐藏了，但它们仍然占据着空间，它们俩只会引起页面重绘。

继承：

display:none不会被子元素继承，但是父元素都不在了，子元素自然也就不会显示了

visibility:hidden 会被子元素继承，可以通过设置子元素visibility:visible 使子元素显示出来

opacity: 0 也会被子元素继承，但是不能通过设置子元素opacity: 0使其重新显示

事件绑定：

display:none 的元素都已经不再页面存在了，因此肯定也无法触发它上面绑定的事件；

visibility:hidden 元素上绑定的事件也无法触发；

opacity:0元素上面绑定的事件是可以触发的。

## 脚本标签

1.先来试个一句话解释仨，当浏览器碰到 `script` 脚本的时候：

1. `<script src="script.js"></script>`
   
   没有 `defer` 或 `async`，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 `script` 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

2. `<script async src="script.js"></script>`
   
   有 `async`，加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）。

3. `<script defer src="myscript.js"></script>`
   
   有 `defer`，加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要在所有元素解析完成之后，`DOMContentLoaded` 事件触发之前完成。

<img title="" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/894d84e8a7e0497091a26e43e1a84237~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png" data-align="center">

## 块级元素、行内元素和行内块

**block：**

- 每个块级元素都是独自占一行；
- 高度，行高，外边距（margin）以及内边距（padding）都可以控制；
- 元素的宽度如果不设置的话，默认为父元素的宽度（父元素宽度100%；
- 多个块状元素标签写在一起，默认排列方式为从上至下；

**inline：**

- 不会独占一行，相邻的行内元素会排列在同一行里，直到一行排不下才会自动换行，其宽度随元素的内容而变化；
- 高宽无效，对外边距（margin）和内边距（padding）仅设置左右方向有效 上下无效；
- 设置行高有效，等同于给父级元素设置行高；
- 元素的宽度就是它包含的文字或图片的宽度，不可改变；
- 行内元素中不能放块级元素，a 链接里面不能再放链接；

**inline-block：**

- 高度、行高、外边距以及内边距都可以控制；
- 默认宽度就是它本身内容的宽度，不独占一行，但是之间会有空白缝隙，设置它上一级的 font-size 为 0，才会消除间隙；

/*手写jsonp*/
/*原理：<script>标签的src属性并不被同源策略所约束，所以可以获取任何服务器上脚本并执行。*/

var newscript = document.createElement('script');
newscript.src = 'https://www.adb.com?callback=fn'
document.body.appendChild(newscript);

function fn(data) {
  console.log(data);
}
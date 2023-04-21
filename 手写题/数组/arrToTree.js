function convertToTree(regions, rootId = "0") {
  // TODO: 在这里写入具体的实现逻辑
  // 将平铺的结构转化为树状结构，并将 rootId 下的所有子节点数组返回
  // 如果不存在 rootId 下的子节点，则返回一个空数组
  let resArr = []
  regions.forEach(element => {
    if (element.pid == rootId) {
      resArr.push(element)
      element.children = convertToTree(regions, element.id)
    }
  });
  return resArr
}


let input_arr = [
  {
    id: "51", // 区域 id
    name: "四川省", // 区域名字
    pid: "0", // 区域的父级区域 id
  },
  {
    id: "5101",
    name: "成都市",
    pid: "51", // 成都的父级是四川省，所以 pid 是 51
  },
  {
    id: "52", // 区域 id
    name: "湖北省", // 区域名字
    pid: "0", // 区域的父级区域 id
  },
  // ...
];

console.log(convertToTree(input_arr));
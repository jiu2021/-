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

const root = {
  type: 'a',
  children: [
    {
      type: 'b',
      children: [
        {
          type: 'c',
        }
      ]
    },
    {
      type: 'd'
    }
  ]
}

// 用法
for (let node of walkPreOrder(root)) {
  console.log(node)
}
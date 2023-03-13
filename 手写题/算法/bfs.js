const tree = {
  val: 2345,
  children: [
    {
      val: 3456,
      children: [
        {
          val: 23456,
          children: []
        },
        {
          val: 6777,
          children: [
            {
              val: 66,
              children: []
            }
          ]
        }
      ]
    },
    {
      val: 4545,
      children: [
        {
          val: 44,
          children: []
        },
        {
          val: 5,
          children: []
        }
      ]
    }
  ]
}



function bfs(tree_obj) {
  if (!tree_obj) return;

  const res = []
  const queue = [];
  queue.push(tree_obj);

  while (queue.length != 0) {
    const { val, children } = queue.shift();
    val && res.push(val);
    if (children) {
      for (let child of children) {
        queue.push(child);
      }
    }
  }

  return res;
}

console.log(bfs(tree));

var b = 1
console.log(this, this.b, typeof this)
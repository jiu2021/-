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

const res = [];
function dfs(tree_obj) {
  if (!tree_obj) return;
  tree_obj.val && res.push(tree_obj.val);
  if (tree_obj.children) {
    for (let child of tree_obj.children) {
      dfs(child)
    }
  }
}

dfs(tree)

console.log(res)
// [
//   2345, 3456, 23456,
//   6777,   66,  4545,
//     44,    5
// ]
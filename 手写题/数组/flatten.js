var flatten = function (arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      //res = res.concat(flatten(arr[i]))
      res.push(...flatten(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res;
}

console.log(flatten([1, [1, 2, [2, 4]], 3, 5]));  // [1, 1, 2, 2, 4, 3, 5]


function my_flat(arr) {
  let res = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      res = res.concat(my_flat(item))
    } else {
      res.push(item)
    }
  }

  return res;
}

console.log(my_flat([1, [1, 2, [2, 4]], 3, 5]));
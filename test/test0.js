// function sortVersion(versions) {
//   // write code here
//   versions.sort((v1, v2) => {
//     return compareV(v1, v2);
//   })
// }

// // 比较单个版本号
// function compareV(v1, v2) {
//   v1 = v1.split('.');
//   v2 = v2.split('.');
//   let i = 0;
//   while (i < v1.length && i < v2.length) {
//     if (parseInt(v1[i]) > parseInt(v2[i])) {
//       return 1
//     } else if (parseInt(v1[i]) < parseInt(v2[i])) {
//       return -1
//     } else {
//       i++
//     }
//   }
//   return v1.length > v2.length ? 1 : -1;
// }

// let v_arr = ["1.32.0", "1.4", "4", "2.1.2", "3.3.3.3.3.3.3"];
// sortVersion(v_arr);

// console.log(v_arr)


const test_str = "[[1, 2], 3, 4, [5, 6, 7, 3, 1], 8, [9]]";
const test_arr = JSON.parse(test_str);


function flat(arr, res) {
  for (let item of arr) {
    if (item instanceof Array) {
      flat(item, res);
    } else {
      res.push(item);
    }
  }
  return res
}
const new_arr = flat(test_arr, [])
console.log(test_arr, new_arr);
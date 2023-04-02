function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  const left_arr = arr.slice(0, mid);
  const right_arr = arr.slice(mid);
  return merge(mergeSort(left_arr), mergeSort(right_arr));
}

function merge(left_arr, right_arr) {
  let i = 0, j = 0;
  const res = []
  while (i < left_arr.length && j < right_arr.length) {
    if (left_arr[i] <= right_arr[j]) {
      res.push(left_arr[i++]);
    } else {
      res.push(right_arr[j++])
    }
  }
  while (i < left_arr.length) {
    res.push(left_arr[i++]);
  }
  while (j < right_arr.length) {
    res.push(right_arr[j++]);
  }

  return res
}

const arr_1 = [2, 3, 1, 7, 5, 8];
const new_arr = mergeSort(arr_1);

console.log(arr_1, new_arr)


function quicksort(arr) {
  if (arr.length <= 1) return arr;
  let pivotIndex = arr.length >> 1;
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quicksort(left).concat(pivot, quicksort(right));
}
const arr = [4, 3, 5, 2, 1, 6]

// console.log(quicksort(arr));   //  [1, 2, 3, 4, 5, 6]


function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr
}
// bubbleSort(arr)

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let base = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > base) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = base;
  }
}


// insertSort(arr)
// console.log(arr)

function quick_new(arr) {
  if (arr.length <= 1) return arr;
  // let pivot_index = Math.floor(arr.length / 2);
  // let pivot = arr.splice(0, 1)[0];
  let pivot_index = 0;
  let pivot = arr[pivot_index];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (i == pivot_index) continue;
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i])
    }
  }

  return quick_new(left).concat(pivot, quick_new(right));
}

// quick_new(arr);
// console.log(arr, quick_new(arr));


function pivot_partition(arr, left, right) {
  let i = left, j = right;
  while (i < j) {
    while (i < j && arr[j] >= arr[left]) j--;
    while (i < j && arr[i] <= arr[left]) i++;

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  [arr[i], arr[left]] = [arr[left], arr[i]];
  return i;
}

function quick(arr, left, right) {
  if (left >= right) return;
  const pivot = pivot_partition(arr, left, right);

  quick(arr, left, pivot - 1);
  quick(arr, pivot + 1, right);
}

quick(arr, 0, arr.length - 1);
console.log(arr);
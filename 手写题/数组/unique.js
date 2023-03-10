// 因为 NaN !== NaN 所以去重不掉
function unique(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] === array[i]) {
        array.splice(j, 1);
        j--;
      }
    }
  }
  return array;
}

// 都能去重
Array.from(new Set(arr))
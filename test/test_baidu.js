function findNum(a, x) {
  let res = x;
  let tmp = x;
  let count = 0;
  let res_arr = [];
  while (x > 0 && a > 0) {
    // 末位相同
    if (x % 2 == 0 && a % 2 == 0) {
      res += Math.pow(2, count)
      res_arr.push(res)
    } else if (x % 2 == 1 && a % 2 == 1) {
      res -= Math.pow(2, count)
      res_arr.push(res)
    }
    
    count++;
    x = x >> 1;
    a = a >> 1;
  }
  console.log(res_arr)
  res_arr = res_arr.filter(val => val <= tmp);
  res_arr.sort((a, b) => a - b);
  return res_arr.pop();
}



let res = findNum(3, 2);
console.log(res);
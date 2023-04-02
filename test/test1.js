
// let n = 5, m = 5;
// let food = [1, 2, 2, 4, 5];
// let box = [1, 3, 7, 9, 15]
// function getNum(n, m, food, box) {
//   //  巧克力大小排序
//   food.sort((a, b) => a - b);
//   // 对于每个大小的包
//   for (let max of box) {
//     let count = 0
//     let sum = 0;
//     for (let i = 0; i < food.length; i++) {
//       sum += food[i] * food[i]
//       if (sum <= max) {
//         count++
//       }
//     }
//     console.log(count)
//   }
// }

// const readline = require('readline');
// process.stdin.setEncoding('utf-8');

// let rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
// rl.prompt();

// let solveMeFirst = (a, b) => {
//   // Your code
//   return a + b;
// }

// rl.on('line', function (data) {
//   let arr = data.split(' ');
//   console.log(arr);
//   if (arr && arr.length == 2) {
//     let c = solveMeFirst(+arr[0], +arr[1]);
//     process.stdout.write('' + c + '\n');
//   }
// });

// const num = 3;
// const in_arr = [1, 2, 3];
// const out_arr = [1, 2, 3];

// function isTrue(num, in_arr, out_arr) {
//   let i = 0, j = in_arr.length - 1;

//     while(j >= 0) {
//       if (in_arr[j] == out_arr[0]) {

//         out_arr.shift();

//       } else {
//         j--;
//       }
//     }

// }


let i;
for (i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 0);
}
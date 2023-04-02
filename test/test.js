// class RefImpl {
//   _rawValue;
//   _value;
//   dep;
//   __v_isRef = true;

//   constructor(value) {
//     this._value = value;
//     // 看看value 是不是一个对象，如果是一个对象的话
//     // 那么需要用 reactive 包裹一下
//   }

//   get value() {
//     // 收集依赖
//     console.log('get', this._value)
//     return this._value;
//   }

//   set value(newValue) {
//     // 当新的值不等于老的值的话，
//     // 那么才需要触发依赖
//     this._value = newValue;
//     console.log('set')
//   }
// }

// const ref = new RefImpl('11');

// ref.value;

// ref.value = '22'

// ref.value;


var letterCombinations = function (digits) {
  if (digits == '') return [];
  let res = [];
  const dic = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  dfs(digits, dic, 0, '', res);
  return res
};

function dfs(digits, dic, start, track, res) {
  if (start == digits.length) {
    res.push(track);
    return;
  }
  let str = dic[parseInt(digits[start]) - 2];
  console.log(str)
  for (let i = start; i < str.length; i++) {
    track = track + str[i];
    dfs(digits, dic, i + 1, track, res);
    track = track.slice(0, -1);
  }

}
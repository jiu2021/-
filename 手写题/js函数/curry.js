/**
 * 通用的 curry 化
 * @param {*} targetfn 
 * @returns 
 */
function curry(targetfn) {
  var numOfArgs = targetfn.length;
  return function fn() {
    if (arguments.length < numOfArgs) {
      // 递归
      return fn.bind(null, ...arguments);
    } else {
      return targetfn.apply(null, arguments);
    }
  }
}

function sum(a, b, c) {
  return a + b + c;
}

const curried = curry(sum);
console.log(curried(1)(2)(3)) // 6
console.log(curried(1, 2)(3)) // 6

function sum2(...args1) {
  let x = args1.reduce((prev, next) => { return prev + next; })
  return function (...args2) {
    if (args2.length == 0) return x;
    let y = args2.reduce((prev, next) => { return prev + next; })
    return sum2(x + y)
  }
}

console.log(sum2(1, 2, 2, 5)(7)()) // 17

function new_curry(fn) {
  return function curry(...args) {
    if (args.length < fn.length) {
      return curry.bind(null, ...args);
    } else {
      return fn.apply(null, args)
    }
  }
}

const use_curry = new_curry(sum);

let res = use_curry(1, 2)(3);
console.log(res)


function myCurry(targetfn) {
  let len = targetfn.length;
  function fn() {
    if (arguments.length < len) {
      return fn.bind(null, ...arguments);
    } else {
      return targetfn.apply(null, ...arguments);
    }
  }

  return fn
}


function curry(...args){
  let judge=(...arg)=>{
    if(arg.length===0){
      return args.reduce((pre,item)=>
        pre+item
      )
    }else{
        args.push(...arg)
    }
    return (...argss)=>judge(...argss)
  }
  return judge
}
const fn = curry(1,2,3)
const fn2 = fn(4)
console.log(fn2() );
// function throttle(fn, wait) {
//   let pre = new Date();
//   return function () {
//     let context = this;
//     let args = arguments;
//     let now = new Date();
//     if (now - pre >= wait) {
//       fn.apply(context, args);
//       pre = now;
//     }
//   }
// }


function throttle(fn, interval = 1000, imd = false) {
  let last_time = 0;
  let imdC = true;

  function _throttle(...args) {

    if (imdC && imd) {
      fn.apply(this, args);
      imdC = false;
    }

    const now_time = new Date().getTime();
    const remain = now_time - last_time;
    if (remain > interval) {
      fn.apply(this, args);

      last_time = now_time;
      imdC = false;
    }
  }

  return _throttle;
}


function throttle_1(fn, wait = 1000, imd = false) {
  let pre_time = 0;
  let imd_c = true;

  function _throttle(...args) {
    if (imd_c && imd) {
      fn.apply(this, args);
      imd_c = false;
    }

    const cur_time = new Date().getTime();
    if (cur_time - pre_time > wait) {
      fn.apply(this, args);

      pre_time = cur_time;
      imd_c = false;
    }

  }

  return _throttle;
}
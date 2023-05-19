// function debounce(fn, wait) {
//   let timeout = null;
//   return function () {
//     let context = this;
//     let args = arguments;
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       fn.apply(context, args);
//     }, wait);
//   }
// }


function debounce(fn, delay = 1000, imd = false) {
  let timer = null;
  let imdC = true

  function _debounce(...args) {
    if (timer) {
      clearTimeout(timer);
    }

    // 当是第一次触发，且需要立即触发
    if (imdC && imd) {
      fn.apply(this, args);

      imdC = false;
    }

    timer = setTimeout(() => {
      fn.apply(this, args);

      imdC = false;
    }, delay);
  }

  return _debounce;
}


function debounce_1(fn, delay = 1000, imd = false) {
  let timer = null;
  let imd_c = true;

  function _debounce(...args) {
    if (timer) {
      clearTimeout(timer);
    }

    if (imd_c && imd) {
      fn.apply(this, args);

      imd_c = false;
    }

    timer = setTimeout(() => {
      fn.apply(this, args);

      imd_c = false;
    }, delay);
  }

  return _debounce;
}




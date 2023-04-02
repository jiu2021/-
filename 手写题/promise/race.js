function prace(promiseArray) {
  return new Promise((resolve, reject) => {
    promiseArray.forEach((item) => {
      Promise.resolve(item).then(
        (val) => {
          resolve(val);
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
};
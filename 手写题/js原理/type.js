function getType(data) {
  // TODO：待补充代码
  if (typeof data !== "object") {
    return typeof data;
  }

  return Object.prototype.toString.call(data).slice(8, -1);
}



console.log(getType(getType))
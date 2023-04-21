/*手写bind()*/

Function.prototype.bindNew = function (context, ...args) {
  return (...newArgs) => this.apply(context, [...args, ...newArgs]);
};

// test
const test = {
  name: "fy",
  showName: function (...last) {
    console.log(this.name + " is " + last);
  },
};

test.showName("handsome"); // fy is handsome
test.showName.bind({ name: "kj" }, "handsome")('vugyv', 'vjygv');
test.showName.bindNew({ name: "kj" })('kj', 'fasdfa');



Function.prototype.my_bind = function (ctx, ...arg) {
  return (...newarg) => this.apply(ctx, [...arg, ...newarg]);
}
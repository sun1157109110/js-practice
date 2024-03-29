Array.prototype.myForeach = function (callback, thisArg) {
  if (this == undefined) throw new Error("this is null or undefined");
  if (typeof callback !== "function")
    throw new TypeError("this is not function");
  const arr = this;
  let len = this.length;
  let k = 0; 
  //通过一个 while 循环来实现，循环的终止条件是前面获取到的数组的长度（也就是说后期改变数组长度不会影响遍历次数），while 循环里，会先把当前遍历项的下标转为字符串，通过 HasProperty 方法判断数组对象中是否有下标对应的已初始化的项，有的话，获取对应的值，执行回调，没有的话，不会执行回调函数，而是直接遍历下一项。
  //如此看来，forEach 不对未初始化的值进行任何操作（稀疏数组）
  while (k < len) {
    if (k in this) {
      callback.call(thisArg, arr[k], k, arr);
    }
    k++;
  }
};
const list = [1, 2, 7,,];
console.log(
  list.myForeach((item) => {
    item * 5;
    console.log('@');
  })
);
console.log([...list.keys()]);
// list.forEach((data) => {
//   data + 1;
// });
// console.log(list);
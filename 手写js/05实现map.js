Array.prototype.myMap = function (callback) {
  if (this == undefined) throw new Error("this is null or undefined");
  if (typeof callback !== "function")
    throw new TypeError("this is not function");
  const res = [];
  const arr = this;
  for (let i in arr) {
    if (Object.prototype.hasOwnProperty.call(this, i)) {
      res.push(callback.call(this, arr[i], i, arr));
    }
  }
  return res;
};
const list = [1, 2, 7, 3, 5];
console.log(list.myMap((item) => item * 5));
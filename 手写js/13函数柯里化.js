// function add() {
//   const _args = [...arguments];
//   function fn() {
//     _args.push(...arguments);
//     return fn;
//   }
//   // const fn = (...rest2)=>{
//   //     __args.push(...rest2);
//   //     return fn
//   // }
//   fn.valueOf = function () {
//     return _args.reduce((pre, cur) => pre + cur);
//   };
//   console.log(_args.reduce((pre, cur) => pre + cur));
//   return fn;

// }
function add() {
  const _args = [...arguments];

  function fn() {
    _args.push(...arguments);
    return fn;
  }
  fn.toString = function () {
    return _args.reduce((sum, cur) => sum + cur);
  };
  return fn;
}
arr = [1];
console.log(null instanceof Object);
/* --------------------------------------------------------- */
function currying(func) {
  let len = func.length; //func参数形参的数量
  return _currying.call(this, func, len);
}

function _currying(func, len = func.length, ...args) {
  // type here
  return function fn() {
    let _args = [...args, ...arguments]; //收集参数
    if (_args.length >= len) {
      //如果参数数量已经达到,就返回结果
      return func.apply(this, _args);
    } else {
      //否则继续递归
      return _currying.call(this, func, len, ..._args);
    }
  };
}
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = currying(add);

console.log(curriedAdd(1)(2)(3)); // 输出 6
console.log(curriedAdd(1, 2)(3)); // 输出 6
console.log(curriedAdd(1)(2, 3)); // 输出 6


// function curry(fn, ...args) {
//   return fn.length <= args.length ?
//     fn(...args) :
//     curry.bind(null, fn, ...args);
// }
// function add(x, y) {
//   return x + y
// }
// let fn = curry(add)
// let f = currying(add)
// console.log(f(1));
// console.log(fn(1));
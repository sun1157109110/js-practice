// // 示例
// let count = 1;
// let promiseFunction = () =>
//   new Promise(rs =>
//     window.setTimeout(() => {
//       rs(count++);
//     })
//   );
// let firstFn = firstPromise(promiseFunction);
// firstFn().then(console.log); // 1
// firstFn().then(console.log); // 1
// firstFn().then(console.log); // 1

// 业务需求中，经常有只需要请求一次，以防止用户重复点击行为导致的触发重复请求。
// 传递请求方法（执行后返回promise），返回一个新方法。连续触发时，只执行一次。

function firstPromise(promiseFn) {
  let p = null
  return async function (...args) {
    return p ? p : p = promiseFn.apply(this, args).finally(() => {
      p = null
    })
  }
}
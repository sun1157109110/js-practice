/* 
请你编写一个异步函数 promisePool ，它接收一个异步函数数组 functions 和 池限制 n。它应该返回一个 promise 对象，当所有输入函数都执行完毕后，promise 对象就执行完毕。
输入：
functions = [
  () => new Promise(res => setTimeout(res, 300)),
  () => new Promise(res => setTimeout(res, 400)),
  () => new Promise(res => setTimeout(res, 200))
]
n = 2
输出：[[300,400,500],500]
解释
传递了三个函数。它们的睡眠时间分别为 300ms、 400ms 和 200ms。
在 t=0 时，执行前两个函数。池大小限制达到 2。
当 t=300 时，第一个函数执行完毕后，执行第3个函数。池大小为 2。
在 t=400 时，第二个函数执行完毕后。没有什么可执行的了。池大小为 1。
在 t=500 时，第三个函数执行完毕后。池大小为 0，因此返回的 promise 也执行完成。

输入：
functions = [
  () => new Promise(res => setTimeout(res, 300)),
  () => new Promise(res => setTimeout(res, 400)),
  () => new Promise(res => setTimeout(res, 200))
]
n = 5
输出：[[300,400,200],400]
解释：
在 t=0 时，所有3个函数都被执行。池的限制大小 5 永远不会满足。
在 t=200 时，第三个函数执行完毕后。池大小为 2。
在 t=300 时，第一个函数执行完毕后。池大小为 1。
在 t=400 时，第二个函数执行完毕后。池大小为 0，因此返回的 promise 也执行完成。

输入：
functions = [
  () => new Promise(res => setTimeout(res, 300)),
  () => new Promise(res => setTimeout(res, 400)),
  () => new Promise(res => setTimeout(res, 200))
]
n = 1
输出：[[300,700,900],900]
解释：
在 t=0 时，执行第一个函数。池大小为1。
当 t=300 时，第一个函数执行完毕后，执行第二个函数。池大小为 1。
当 t=700 时，第二个函数执行完毕后，执行第三个函数。池大小为 1。
在 t=900 时，第三个函数执行完毕后。池大小为 0，因此返回的 Promise 也执行完成。

0 <= functions.length <= 10
1 <= n <= 10
*/
var promisePool = async function (functions, n) {
  // 使用 Set 存储正在执行的任务队列
  let queue = new Set();
  let resolved = [];

  for (const task of functions) {
    // 将正在执行的任务加入到队列中
    const x = task().then((res) => {
      // 任务执行完成后将结果存到 resolved 数组中
      resolved.push(res);
      // 完成后移出正在执行队列
      queue.delete(x);
    })
    queue.add(x);
    // 控制线程池执行最大数
    if (queue.size >= n) {
      await Promise.race(queue);
    }
  }
  // 执行完所有任务后才返回执行结果
  await Promise.allSettled(queue);
  return resolved;
};
/**
 * const sleep = (t) => new Promise(res => setTimeout(res, t));
 * promisePool([() => sleep(500), () => sleep(400)], 1)
 *   .then(console.log) // After 900ms
 */

var promisePool = async function (functions, n) {
  let res  = []
   await Promise.all([...new Array(n)].map(async () => {
    while (functions.length) {
      let v = await functions.shift()()
      res.push(v)
    }
  }))
  return res
};


const sleep = (t) => new Promise(res => setTimeout(res, t));
promisePool([
    () => new Promise(res => setTimeout(()=>{res(1)}, 300)),
    () => new Promise(res => setTimeout(()=>{res(2)}, 400)),
    () => new Promise(res => setTimeout(()=>{res(3)}, 50))
  ],2)
  .then(console.log) // After 900ms

  //https://juejin.cn/post/7244346901126316089
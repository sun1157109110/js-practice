//es9
async function* asyncPool(concurrency, iterable, iteratorFn) {
  const executing = new Set();
  async function consume() {
    const [promise, value] = await Promise.race(executing);
    executing.delete(promise)
    return value
  }
  for (let item of iterable) {
    let p = (async () => iteratorFn(item, iterable)).then((value) => [p, value])
    executing.add(p);
    if (executing.size >= concurrency) {
      yield await consume()
    }
  }
  while (executing.size) {
    yield await consume();
  }
}
//es7
async function asyncPool(concurrency, iterable, iteratorFn) {
  const ret = [];// 所有执行中的 promises
  const executing = []; // 正在执行中的 promises
  for (let item of iterable) {
    //promise p is a promise
    //接受 iteratorFn 的返回值:Promise
    let p = Promise.resolve().then(() => iteratorFn(item, iterable));
    ret.push(p)
    // 如果执行的数组 大于等于 最大并发限制 那么我们就要控制并发
    if (iterable.length >= concurrency) {
      const e = p.then(() => {
        executing.splice(executing.indexOf(e), 1)
      });
      // p.then 返回的 一个Promise 我们把它放到正在执行数组中,一旦执行完 便剔除对应的值
      executing.push(e)
      //核心代码:正在执行的 promises 数组 大于等于 `最大并发限制` 用.race 方法释放一个执行最快的
      if (executing.length >= concurrency) {
        await Promise.race(executing)
      }
    }
  }
  //返回一个 Promise.all
  return Promise.all(ret)
}
//example
const timeout = (ms) => new Promise((resolve) => setTimeout(() => resolve(ms), ms));
(async()=>{
  console.log(await asyncPool(2, [1000, 5000, 3000, 2000], timeout));
})()

//https://segmentfault.com/a/1190000020980101
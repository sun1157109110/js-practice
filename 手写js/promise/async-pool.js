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
  const ret = [];
  const executing = [];
  for (let item of iterable) {
    //promise p is a promise
    let p = Promise.resolve().then(() => iteratorFn(item, iterable));
    ret.push(p)
    if (iterable.length >= concurrency) {
      const e = p.then(() => {
        executing.splice(executing.indexOf(e), 1)
      });
      executing.push(e)
      if (executing.length >= concurrency) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}
//example
const timeout = (ms) => new Promise((resolve) => setTimeout(() => resolve(ms), ms));
(async()=>{
  console.log(await asyncPool(2, [1000, 5000, 3000, 2000], timeout));
})()
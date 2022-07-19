// let o = {};
// o.a = 1
// Object.defineProperty(o,'b',{value:22,configurable:false,writable:false,enumerable:true})
// console.log(Object.getOwnPropertyDescriptor(o,'b'));
// o.b = 33
// console.log(o.b);
// async function test() {
//   let p = await Promise.race([Promise.resolve(1),Promise.resolve(2)])
//   return p
// }
// console.log(test());
async function* asyncPool(concurrency, iterable, iteratorFn) {
  const executing = new Set();
  async function consume() {
    const a = await Promise.race(executing);
    const [promise, value] = a
    console.log(a);
    executing.delete(promise);
    return value;
  }
  for (const item of iterable) {
    // Wrap iteratorFn() in an async fn to ensure we get a promise.
    // Then expose such promise, so it's possible to later reference and
    // remove it from the executing pool.
    const promise = (async () => await iteratorFn(item, iterable))().then(
      value => [promise, value]
    );
    executing.add(promise);
    if (executing.size >= concurrency) {
      yield await consume();
    }
  }
  while (executing.size) {
    yield await consume();
  }
}
const timeout = ms => new Promise(resolve => setTimeout(() => resolve(ms), ms));


(async function() {
  for await (const ms of asyncPool(2, [1000, 5000, 3000, 2000], timeout)) {
    console.log(ms);
  }
})();
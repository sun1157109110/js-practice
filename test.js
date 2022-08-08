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
// async function* asyncPool(concurrency, iterable, iteratorFn) {
//   const executing = new Set();
//   async function consume() {
//     const a = await Promise.race(executing);
//     const [promise, value] = a
//     console.log(a);
//     executing.delete(promise);
//     return value;
//   }
//   for (const item of iterable) {
//     // Wrap iteratorFn() in an async fn to ensure we get a promise.
//     // Then expose such promise, so it's possible to later reference and
//     // remove it from the executing pool.
//     const promise = (async () => await iteratorFn(item, iterable))().then(
//       value => [promise, value]
//     );
//     executing.add(promise);
//     if (executing.size >= concurrency) {
//       yield await consume();
//     }
//   }
//   while (executing.size) {
//     yield await consume();
//   }
// }
// const timeout = ms => new Promise(resolve => setTimeout(() => resolve(ms), ms));


// (async function() {
//   for await (const ms of asyncPool(2, [1000, 5000, 3000, 2000], timeout)) {
//     console.log(ms);
//   }
// })();
// function* ge() {
//   const n1 = yield 1
//   console.log(n1);
//   const n2= yield 2
//   console.log(n2);
//   return 3
// }
// let g = ge();
// console.log(g);
// console.log(g.next(1));
// console.log(g.next(222));
// console.log(g.next(333));
// let ins ='["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]'

// console.log([...ins].filter((i)=>i!=='['&&i!==']'&&i!=='"'&&i!==',').join('').split(' ').reverse());
// let ss = [...ins].filter((i)=>i!=='['&&i!==']'&&i!=='"'&&i!==',').join('').split(' ').reverse()
// for(let i =0;i<ss.length-1;i++){
//     ss[i] +=' '
// }
// console.log(ss);
// console.log('---------------');
// let res = [];
// ss.forEach((i)=>{
//     res.push(...i)
// })
// console.log(('['+res.toString()+']'));
let s ="A man, a plan, a canal: Panama"
console.log(s.match(/\w/g));
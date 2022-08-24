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


// let [num,colors] = readline().split(' ').map(Number);
// let time = 0;
// let dp = Array(num).fill(0).map(()=>Array(2).fill(0));
// let map = readline().split(' ').map(Number)
// for(let i =1;i<num;i++){
//     let arr = readline().split(' ').map(Number);
//     dp[i][0] = Math.min(dp[i-1][0]+map[0]*arr[0],dp[i-1][1]+map[1]*arr[0])
//     dp[i][1] = Math.min(dp[i-1][0]+map[1]*arr[0],dp[i-1][1]+map[1]*arr[1])
//     if(map.includes(arr[0])){
//         let index = map.findIndex(i=>i=arr[0])
//         dp[i][0] = dp[i-1][index]
//     } 
//     if(map.includes(arr[1])){
//         let index = map.findIndex(i=>i=arr[1])
//         dp[i][1] = dp[i-1][index]    
//     }
//     map = [...arr]
// }
// print(Math.min(dp[num-1][0],dp[num-1][1]))
// print(dp)
// function fn(num) {
//   if(num===0)return 0
//   return fn(num-1)+num
// }
// console.log(fn(10));
// function fn(num) {
//   console.log(num);
//   let timer = setTimeout(()=>{fn(num-1)}, 1000);
//   if(num===0)clearTimeout(timer)
// }
// fn(10)
// function mySetInterval(fn,time) {
//   let timer = null
//   function interval() {
//     fn();
//     timer = setTimeout(interval, time);
//   }
//   interval()
//   return {
//     cancel:()=>{
//       clearTimeout(time)
//     }
//   }
// }
// let count = 0
// let a = mySetInterval(()=>{console.log(count++);},1000)
// if(count===10)a.cancel()

// console.log(parseFloat('1/2'));
// console.log(Math.fround(1/3+1/3+1/3));
// console.log(0.1+0.2);
// function solution(X, Y) {
//   // write your code in JavaScript (JavaScript (Node.js 8.9.4))
//   function chu(nums){
//       return nums.reduce((pre,cur)=>)
//   }
//   let nums = [];
//   let res = 0
//   for(let i = 0;i<X.length;i++){
//       let arr =  [X[i],Y[i]]
//       nums.push(arr)
//   }
//   for(let i = 0;i<nums.length;i++){

//   }
//   let sum = 0
//   function recur(start){
//       if(sum===1){
//           res=res%(Math.pow(10,9)+7) + 1
//       };
//       for(let i = start;i<nums.length;i++){
//           sum+=chu(nums[i]);
//           recur(i+1)
//           sum-=chu(nums[i])
//       }   
//   }
//   recur(0)
//   return res
// }
// console.log(solution([1,2,3,1,2,12,8,4],[5,10,15,2,4,15,10,5]));
// // console.log(solution([1,1,1],[2,2,2]));



// function solution(X, Y) {
//   // write your code in JavaScript (JavaScript (Node.js 8.9.4))
//   function chu(nums){
//       return nums[0]/nums[1]
//   }
//   function CalculateFraction(fractionList) {
//   if (fractionList && fractionList.length > 0) {
//   //分子
//   let molecule = 0;
//   //分母
//   let denominator = 0;
//   //分子集合
//   let molecules = [];
//   //分母集合
//   let denominators = [];
//   fractionList.forEach(item => {
//       if (item.indexOf("/") > -1) {
//       let i = item.indexOf("/");
//       molecules.push(item.substring(0, i));
//       denominators.push(item.substring(i + 1, item.length));
//       }
//   });
//   //循环分母找出最小公倍数
//   let pre = parseInt(denominators[0]);
//   let multiple = pre;
//   for (var j = 1; j < denominators.length; j++) {
//       let n = parseInt(denominators[j]);
//       multiple = pre > n ? pre : n;
//       while (multiple <= pre * n) {
//           if (multiple % pre == 0 && multiple % n == 0) {
//               break;
//           }
//           multiple++;
//       }
//       pre = multiple;
//   }
//   denominator = multiple;
//   //循环计算分子相加/相减
//   for (var k = 0; k < molecules.length; k++) {
//       //加法
//       molecule += molecules[k] * (denominator / denominators[k]);
//       //减法
//       //molecule -= molecules[k] * (denominator / denominators[k]);
//   };
//   //结果判断 分子不能小于分母
//   return molecule / denominator;
//   // if (molecule < denominator) {
//   // return false;
//   // }
//   // return true;
//   }
//   }
//   let nums = [];
//   let res = 0
//   for(let i = 0;i<X.length;i++){
//       // let arr =  [X[i],Y[i]]
//       nums.push(X[i]+'/'+Y[i])
//   }
//   for(let i = 0;i<nums.length;i++){

//   }
//   let path = []
//   function recur(start){
//       if(CalculateFraction(path)===1){
//           res=res%(Math.pow(10,9)+7) + 1
//       };
//       for(let i = start;i<nums.length;i++){
//           path.push(nums[i])
//           recur(i+1)
//           path.pop(nums[i])
//       }   
//   }
//   recur(0)
//   return res
// }
// console.log(solution([1,2,3,1,2,12,8,4],[5,10,15,2,4,15,10,5]));
// function solution(A, X, Y) {
//   let res = Number.MAX_SAFE_INTEGER
//   // let count = 0
//   // let sum = 0
//   for (let i = 0; i < A.length; i++) {
//     let index = i
//     let count = 0
//     let sum = 0
//     while (index<A.length&&count < X) {
//       sum += A[index]
//       index += Y
//       count++
//     }
//     if(count===X)res = Math.min(res, sum)
//   }
//   return res
//   // function recur(start){
//   //     if(count===X){
//   //         res = Math.min(res,sum)
//   //     }
//   //     for(let i = start;i<A.length;i++){

//   //     }
//   // }
//   // recur(0);
// }
// console.log(solution([4, 2, 5, 4, 3, 5, 1, 4, 2, 7], 3, 2));
// const obj = {
//   foo:'foo1',
//   bar1:function () {
//     console.log(this.foo);
//   },
//   bar2:function () {
//     var arr = ()=>{
//       console.log(this.foo);
//     }
//     arr()
//   },
//   bar3:()=>{
//     console.log(this);
//   }
// }
// console.log(obj.bar3());
// function util (func) {
//   return (...arg) => new Promise((resolve, reject) => {
//     console.log('arg',arg);
//     console.log(func);
//     func(...arg, (err, ...arg1) => {
//       if (err) reject(err)
//       else resolve(arg1)
//     })
//   })
// }
// const obj = {
//   getData (callback) {
//     console.log(callback);
//     callback(null, 'Niko', 18) // 返回两个参数，姓名和年龄
//   }
// }

// // 这时使用promisify肯定是不行的
// // 因为Promise.resolve只接收一个参数，所以我们只会得到 Niko

// util(obj.getData)().then((res)=>{console.log(...res)}) // Niko


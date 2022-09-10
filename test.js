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

// console.log(false==null);
// let val = 'smart';
// const s = 'midea is' + (val==='smart')?'Good':'Perfect'
// console.log(s);

// 1
// 5
// 1 0 12
// 2 1 1
// 3 1 45
// 4 3 5
// 5 2 1
// 0 44 4
// let n = parseInt(readline());
// let tree = [{
//   id: 1,
//   pid: 0,
//   v: 12,
//   children: [{
//     id: 2,
//     pid: 1,
//     v: 33,
//     children: [{
//       id: 3,
//       pid: 1,
//       v: 11
//     }]
//   }, {
//     id: 4,
//     pid: 1,
//     v: 55,
//     children: [{
//       id: 5,
//       pid: 4,
//       v: 66
//     }]
//   }]
// }]
// var largestValues = function (tree) {
//   if (!tree) return [];
//   let queue = [tree[0]];
//   let res = []
//   while (queue.length !== 0) {
//     let len = queue.length
//     let max = Number.MIN_SAFE_INTEGER
//     let min = Number.MAX_SAFE_INTEGER
//     for (let i = 0; i < len; i++) {
//       let node = queue.shift();
//       max = Math.max(max,node.v)
//       min = Math.min(min,node.v)
//       if (node.children) {
//         for (let i = 0; i < node.children.length; i++) {
//           queue.push(node.children[i])
//         }
//       }
//     }
//     console.log('max',max);
//     console.log('min',min);
//     res.push(max-min)
//   }
//   return res
// };
// console.log(largestValues(tree));
// function jsonToTree(data) {
//   let res = []
//   let map = {};
//   data.forEach(e => {
//     map[e.id] = e
//   });
//   data.forEach(e => {
//     let parent = map[e.pid];
//     if (parent) {
//       (parent.children || (parent.children = [])).push(e)
//     } else {
//       res.push(e)
//     }
//   });
//   return res
// }
// while (n--) {
//   let m = parseInt(readline());
//   let res = []
//   while (m--) {
//     let [id, p, v] = readline().trim().split(' ').map(Number)
//     res.push({
//       id,
//       pid: p,
//       v
//     })
//   }
//   let avs = []
//   let arr = jsonToTree(res)
// }
// function ListNode(val, next) {
//   this.val = (val===undefined ? 0 : val)
//   this.next = (next===undefined ? null : next)
// }
// let count =100
// let num = 0
// let ret = new ListNode(0,null)
// let pre = ret
// while (count--){
//   let cur = new ListNode(++num,null)
//   pre.next = cur;
//   pre = cur
// }
// // 请根据题目要求确定返回值类型和参数列表(输入)
// function solution(head) {
//   // 在这⾥书写你的代码
//   let pre = null;
//     let cur = head;
//     if(!head)return null
//     while(cur){
//         let temp = cur.next;
//         cur.next = pre;
//         pre = cur;
//         cur = temp
//     }
//     return pre
// }

// // 本题面试官未设置测试用例
// // 请在 main 函数书写自己的测试代码
// function main() {
//   // 测试代码参考示例，请根据题目修改
//   let res = solution(ret.next);
//   if (res.val === 100) {
//     console.log('succeed t', res);
//   } else {
//     console.log('failed',res);
//   }
// }

// function solution(arr) {
//   // 在这⾥书写你的代码
//   let map = new Map();
//   for(let i =0;i<arr.length;i++){
//     map.set(arr[i],map.get(arr[i])+1||1)
//   }
//   return [...map.entries()].sort((a,b)=>b[1]-a[1])[0][0]
// }

// // 本题面试官未设置测试用例
// // 请在 main 函数书写自己的测试代码
// function main() {
//   // 测试代码参考示例，请根据题目修改
//   let ret = solution([2,3,5,2,2]);
//   if (ret === 2) {
//     console.log('succeed got', ret);
//   } else {
//     console.log('failed', ret);
//   }
// }
// main()

// console.log(undefined+1);
// let len = arr.length;
// let oddCnt = Math.floor(len/2);
// let evenCnt = n-oddCnt;
// let res = Number.MAX_SAFE_INTEGER
// let even = new Map();
// let odd =new Map();
// for(let i =0;i<n;i++){
//   if(i%2===0){
//     even.set(arr[i],(even.get(arr[i]+1)||1))
//   }else{
//     odd.set(arr[i],(odd.get(arr[i]+1)||1))
//   }
// }
// for(let a of even.keys()){
//   for(let b of odd.keys()){
//     if(a===b)continue
//     res = Math.min(res,evenCnt-even.get(a)+oddCnt-odd.get(b))
//   }
// }

// process.stdin.resume();
// process.stdin.setEncoding('utf-8');
// let input = '';
// process.stdin.on('data', (data) => {
//     input += data;
// });
// process.stdin.on('end', () => {
//     let inputArray = input.split('\n');
//     let [n,m] = inputArray.shift().split(' ').map(Number)
//     let arr = inputArray.map(i=>i.split)
//     function dfs(row,col){
//         if()
//     }
//     /**
//      * 待实现函数，在此函数中填入答题代码
//      * doFunc()
//      */
//     console.log(4)
//     process.exit();
// });
// function test(arr) {
//   const m = {}
//   sss = fn(arr[0]);
//   table = arr[1].split(' ')
//   for(let i =0;i<table.length;++i){
//     m[table[i].toLowerCase()] = i
//   }
//   for(let i =0;i<sss.length;i++){
//     const iiiiindex = m[sss[i].toLowerCase()]
//     if(iiiiindex){
//       sss[i] = iiiiindex
//     }
//   }
//   return sss.join(' ')

//   function fn(ssss1) {
//     let res = [];
//     let start = 0;
//     let flag = false;
//     for(let i =0;i<ssss1.length;i++){
//       if(ssss1[i] == '\"' && !flag){
//         flag = true
//       }else if(ssss1[i] == ' '&& !flag){
//         res.push(ssss1.slice(start,i))
//         start = i+1
//       }else if(ssss1[i] =='\"' && flag){
//         res.push(ssss1.slice(start,i+1))
//         start = i+2
//         flag = false
//       }
//     }
//     res.push(ssss1.slice(start))
//     return res
//   }
// }
// console.log((0.1*100+0.2*100)/100);
// var readline = require('readline')
// // 创建读取行接口对象
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })
// rl.on('line', function(line) {
//   //line为输入的单行字符串，split函数--通过空格将该行数据转换为数组。
//   let [s1,s2]= line.split(' ')

//   console.log(func(line).toString());
// })
// var func = function(s) {
//     const ss = [];
//     const map = new Map();
//     map.set('}','{');
//     map.set(']','[');
//     map.set(')','(');
//     let arr = [...map.entries()]
//     for(let i = 0;i<s.length;i++){
//         if(!map.has(s[i])){
//             ss.push(s[i])
//         }else{
//             let str = ss.pop();
//             let res = arr.find((i)=>i[1]===str)
//             if(map.get(s[i]) !==str )return [res[0],i]
//         }
//     }
//     if(ss.length!==0){
//         let str = ss.pop();
//         let res = arr.find((i)=>i[1]===str)
//         return [res[0],s.length+1]
//     }
// };
// window.value = 'v';
// function fn() {
//   console.log(this.value);
// }
// function callArrowFn() {
//   const arrowFn = ()=>{
//     console.log(this.value);
//   }
//   arrowFn()
// }
// function getArrowFn() {
//   const arrowFn = ()=>{
//     console.log(this.value);
//   }
//   return arrowFn
// }
// const objA = {
//   value:'a',
//   fn:fn
// }
// const objB = {
//   value:'b',
//   fn: callArrowFn
// }
// const objC = {
//   value:'c',
//   fn:getArrowFn()
// }
// fn()
// objA.fn();
// objB.fn();
// objC.fn()
// console.log(1-'2');
// console.log(1+'2');
// var a = (b=1,c=2);
// console.log(a,b,c);
// function f(params) {
//   return f
// }
// console.log(new f() instanceof f);
// function side(arr) {
//   arr[0] = arr[2];
//   console.log(arr);
// }
// function a(a,b,c=3) {
//   c=10;
//   side(arguments)
//   return a+b+c
// }
// console.log(a(1,1,1));

// (function (params) {
//   var a=(b=5)

// })()
// console.log(b);
// console.log(a);

// var a = 1;
// var a;
// console.log(a);
// function Foo(){
//   getName = function(){console.log(1);}
//   return this
// }
// Foo.getName = function(){console.log(2);}
// Foo.prototype.getName = function(){console.log(3);}
// var getName = function(){console.log(4);}
// function getName(){console.log(5);}
// Foo.getName()
// getName();
// Foo().getName()
// getName()
// const [a=1,b=2,c=3] = [4,null];
// console.log(a,b,c);

// function fn(arr) {
//   let res = 0;
//   arr.sort((a,b)=>a-b)
//   for(let i = 0;i<arr.length;i++){
//     for(let j =i+1;j<arr.length;j++){
//       for(let k = j+1;k<arr.length;k++){
//         if(arr[i]*arr[i] + arr[j]*arr[j] === arr[k]*arr[k])res++
//       }
//     }
//   }
//   return res
// }
// console.log(fn([3,4,5]));
// console.log('It"s t-eleven'.split(/\s+/));
// let obj = {num1:117};
// let res = obj;
// obj.child = obj = {num2:935}
// var x = y = res.child.bun2;
// console.log(obj.child);
// console.log(res.num1);
// console.log(y);
// hello()
// var hello = function(){
//   console.log('1');
// }
// function hello(params) {
//   console.log('2');
// }

console.log('b'.charCodeAt()-'a'.charCodeAt());
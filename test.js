// async function test(){
//    const a = await Promise.reject('@');
//    console.log(a);
// };
// test()
// console.log(`[2]['to'].coupang`.replace(/\[(\d+)\]/g, '.$1'));
// const fs = require('fs')
// fs.readFile('./1.txt','utf-8',(err,dataStr)=>{
//   console.log(err);
//   console.log(dataStr);
// })
// console.log(new Date().toString());
// console.log('-------------------');
// console.log(new Date().toDateString());
// console.log('-------------------');
// console.log(new Date().toLocaleString());
// console.log('-------------------');
// console.log(Date.now());
// try {
//   throw new Error('eeeeee')
// } catch (error) {
//   console.log(error.message);
// }finally{
//   console.log(111);
// }
// console.log('155'.padStart(7,'0'));
// console.log(new Date('2022-5-14 03:07:45').getTime());
// const obj = {hh:'aaa'}
// function a(aa,bb){
//   console.log(aa,bb);
// }
// const arr = {c:44,d:55}
// a(...arr)
// function *test(){
//   yield 1;
//   yield 2;
//   return 3
// }
// const handle = test();
// console.log(console.log(handle));
// console.log(handle.next());
// console.log(handle.next());

// async function a(params) {
//  try {
//   await Promise.reject('@@@')
//   await Promise.reject('!!!')
//  } catch (error) {
//    console.log(error);
//  }
// }
// a()
async function ccc(params) {
  const a = await Promise.reject('@')
  console.log(a);
}
ccc()
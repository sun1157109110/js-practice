// function myPromisify(fn) {
//   return (...args)=>new Promise((resolve, reject) => {
//     fn(...args,(error,arg)=>{
//       if(error)reject(error)
//       else resolve(arg)
//     })
//   })
// }

//例题
function myPromisify(fn) {
  return (...args)=>new Promise((resolve, reject) => {
    fn(...args,(...arg)=>{
      console.log(arg);
     resolve(arg)
    })
  })
}
function fn(val1,val2,cb) {
  setTimeout(() => {
    cb(val1+val2)
  }, 1);
}
const resFn = myPromisify(fn);
resFn(1,2).then(([v])=>{
  console.log(v);
})
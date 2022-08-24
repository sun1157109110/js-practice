Promise.retry = function (promiseFn, time) {
  return new Promise((resolve, reject) => {
      let fn = function () {
          promiseFn().then(res => {
              resolve(res)
          }).catch(err => {
              if (time > 0) {
                  console.log(`倒数第${time}次重试`);
                  time--;
                  fn()
              } else {
                  console.log('重试次数使用完毕，依然失败');
                  reject(err)
              }
          })
      }
      fn()
  })
}

//测试
let a = function () {
  return new Promise((res, rej) => {
      let num = Math.random() * 10;
      num < 5 ? res('数字小于5，成功') : rej('数字大于5，失败');
  })
}

Promise.retry(a, 3).then(res => {
  console.log(`res:${res}`);
}).catch(err => {
  console.log(`err:${err}`);
})

// function request(requestFunc,time) {
//   let count = 1;
//   return function timeoutPromise() {
//       const timeout = new Promise((resolve)=>{
//           setTimeout(()=>{
//               resolve();
//           },time)
//       }).then(()=>{
//           if(count === 3) {
//               throw Error('请求超时')
//           } else {
//               count++;
//               timeoutPromise();
//           }
//       })
//       Promise.race([requestFunc,timeout])
//   }
// }
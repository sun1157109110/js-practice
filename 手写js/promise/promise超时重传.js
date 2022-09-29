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

// //测试
// let a = function () {
//   return new Promise((res, rej) => {
//       let num = Math.random() * 10;
//       num < 5 ? res('数字小于5，成功') : rej('数字大于5，失败');
//   })
// }

// Promise.retry(a, 3).then(res => {
//   console.log(`res:${res}`);
// }).catch(err => {
//   console.log(`err:${err}`);
// })

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
let count = 0;
function fakeRequest() {
    return new Promise((resolve, reject) => {
        if (++count > 3) {
            resolve("data");
        } else {
            reject(new Error("failed"));
        }
    });
}

function sendWithRetry(fn, onSuccess, onCancel) {
    // TODO
    let counter = 1000;
    let timer;

    const inner = () => {
        fn().then(res => onSuccess(res)).catch(() => {
            timer = setTimeout(inner, counter);
            console.log('counter', counter);
            counter *= 2;

        });
    }

    inner();

    return function () {
        // TODO
        if (timer) {
            clearInterval(timer);
            onCancel();
        }
    };
}

let time = 0;
setInterval(() => {
    console.log(++time);
}, 1000);

const cancel = sendWithRetry(
    fakeRequest,
    (data) => {
        console.log("结果：", data);
    },
    () => {
        console.log("被取消了");
    }
);

setTimeout(() => {
    cancel(); // 取消、中断轮询
}, 15000);
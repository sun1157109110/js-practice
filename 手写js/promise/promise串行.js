//写法1
//实现promise串行函数
function serialPromise(array) {
  let res = []
  return new Promise((resolve, reject) => {
    array
      .reduce((pre, cur) => {
        return pre.then(cur).then((value) => {
          res.push(value)
        })
      }, Promise.resolve())
      .then(() => {
        resolve(res)
      })
  })
}
//要求实现promise串行
//我的做法是async + await
const promises = [p1, p2, p3];

const TimingFn = (promises) => {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const res = await promises[i]();
      console.log(res);
    }
    resolve();
  });
};

let resultPromise = TimingFn(promises).then(() => {
  console.log("全部都串行执行完了");
});

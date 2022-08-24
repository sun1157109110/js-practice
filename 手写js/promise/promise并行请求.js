//promise.all并行请求限制
function multiRequest(urls, maxNum) {
  const len = urls.length
  let count = 0
  const res = Array(len).fill(false)
  while (count < maxNum) {
    next()
  }
  function next() {
    count++
    return new Promise((resolve, reject) => {
      if (count >= len) {
        !res.includes(false) && resolve(res)
      }
      console.log(`开始${count},${new Date().toLocaleString()}`)
      fetch(urls[count])
        .then((value) => {
          res[count] = value
          console.log(`完成${count},${new Date().toLocaleString()}`)
          if (count < maxNum) next()
        })
        .catch((err) => {
          res[count] = err
          console.log(`结束${count},${new Date().toLocaleString()}`)
          if (count < maxNum) next()
        })
    })
  }
}

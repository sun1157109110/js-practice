(async()=>{
  console.log(1);
  setTimeout(() => {
    console.log('@');
  }, 1000);
  await new Promise((resolve, reject) => {
    console.log(3);
    resolve(444)
  }).then((res)=>{
    console.log(res);
  })
  console.log(1000);
})()
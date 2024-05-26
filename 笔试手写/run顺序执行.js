//封装一个run函数能够顺序执行arr里函数 cb最后执行

const fn1 = (next)=>{
  setTimeout(() => {
    next('xx','xx2')
  }, 1000);
}
const fn2 = (arg,arg2,next)=>{
  console.log('arg',arg,arg2);
  next('fn3')
}
const fn3 = (arg,next)=>{
  console.log(arg);
  next()
}
const arr = [fn1,fn2,fn3];

const run = (arr,cb)=>{
  function next() {
    if(arr.length){
      let fn = arr.shift()
      fn(...arguments,next)
    }else{
      cb()
    }
  }
  next()
}
run(arr,()=>{console.log('end')})
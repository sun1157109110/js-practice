function myReduce(fn,initV) {
  if(typeof fn !=='function')throw new Error('fn is not function')
  if(!Array.isArray(this))throw new Error('this is not array')
  if(this.length===0)throw new TypeError('Reduce of empty array with no initial value')
  let arr = this
  let acc = arguments.length===1?arr[0]:initV
  index = arguments.length === 1?1:0
  for(let i = index;i<arr.length;i++){
    acc = fn(acc,arr[i],i,arr)
  }
  return acc
}
let arr = [1,2]
// console.log(myReduce.call(arr,(pre,cur)=>pre+cur));
// console.log(null == undefined);
// console.log(arr.reduce((pre,cur)=>pre+cur));
function* gen() {
  const num1 = yield 1
  console.log('num1',num1)
  const num2 = yield 2
  console.log(num2)
  return 3
}
const g = gen()
console.log(g.next(111)) // { value: 1, done: false }
console.log(g.next(11111))
console.log(g.next())
console.log(g.next())
// 11111
//  { value: 2, done: false }
// console.log(g.next(22222)) 
// 22222
// { value: 3, done: true }




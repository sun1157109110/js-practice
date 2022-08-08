function add(a, b) {
  let sum = a;
  while(b){
      sum = a ^ b;//不进位情况之和
      b = (a & b) << 1;//进位所产生的需加上的数
      a = sum;
  }
return sum;
}
function minus(a, b){
let c = add(~b, 1);
return add(a, c);
}
function mul(a, b){
  let a1,b1;
  if(a < 0) a1 = add(~a, 1);//取绝对值
  else a1 = a;
  if(b < 0) b1 = add(~b, 1);//取绝对值
  else b1 = b;
  let sum = 0;
  while(b1){
      if(b1 & 1){
          sum = add(sum, a1);
      }
      a1 = a1 << 1;
      b1 = b1 >> 1;
  }
  if((a ^ b) < 0)//如果有一个是负数的话结果也会是负数，所以取反加一
      return add(~sum, 1);
  else return sum;
}
function devide(a, b){   
  let a1,b1;
  if(a < 0) a1 = add(~a, 1);//取绝对值
  else a1 = a;
  if(b < 0) b1 = add(~b, 1);//取绝对值
  else b1 = b;
let res = 0;

  for(let i = 31; i >= 0; i = minus(i, 1)){//为了避免使用--，所以调用减的函数
      if((a1 >> i) >= b1)//这里是为了避免溢出，所以用a1右移而不是b1左移
      {
          res = add(res, (1 << i));
          a1 = minus(a, (b1 << i));
      }
  }
  if((a ^ b) < 0)//如果是负数，就取反再加一
      res = add(~res, 1);
  return res;
}

// console.log(add(19, 13));
// console.log(minus(19, 13));
// console.log(mul(2, 6));
// console.log(devide(10, 2));
// console.log(parseInt(10101010011100,2));
function currying(func){
    let len = func.length;//func参数形参的数量
    return _currying.call(this,func,len)
};
function _currying(func, len = func.length, ...args){
    // type here
    return function fn() {
        let _args = [...args, ...arguments];//收集参数
        if (_args.length >= len) {//如果参数数量已经达到,就返回结果
            return func.apply(this, _args)
        } else {//否则继续递归
            return _currying.call(this, func, len, ..._args)
        }
    }
}



// function currying(func, len = func.length, ...args) {
//     // type here
//     return function fn() {
//         let _args = [...args, ...arguments];
//         if (_args.length >= len) {
//             return func.apply(this, _args)
//         } else {
//             return currying.call(this, func, len, ..._args)
//         }
//     }
// }


const add = currying(function (a, b, c, d) {
    return a + b + c + d;
})
const a11 = add(1)
console.log(a11);
// assert.equal(a11(2)(3)(4), 10)
// assert.equal(a11(2, 3, 4), 10)
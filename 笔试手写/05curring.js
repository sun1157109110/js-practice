// function currying(func){
//     let len = func.length;//func参数形参的数量
//     return _currying.call(this,func,len)
// };
// function _currying(func, len = func.length, ...args){
//     // type here
//     return function fn() {
//         let _args = [...args, ...arguments];//收集参数
//         if (_args.length >= len) {//如果参数数量已经达到,就返回结果
//             return func.apply(this, _args)
//         } else {//否则继续递归
//             return _currying.call(this, func, len, ..._args)
//         }
//     }
// }

//实现add()
// add(1)  //1
// add(1)(2) //3
// add(1,2)(3) //6
// add(1)(2,3) //6
// add(1)(2)(3) //6
//方法一
function add() {
    let _args = [...arguments];

    function fn() {
        _args.push(...arguments)
        return fn
    }
    fn.valueOf = () => {
        return _args.reduce((pre, cur) => pre + cur)
    }
    return fn
}
console.log(add(1)(2)(3).valueOf())
//方法二 通用版本
function currying(fn,len=fn.length) {
    return _currying.call(this, fn, len)
}

function _curring(fn, len, ...args) {
    return function () {
        let _args = [...args, ...arguments]//收集参数
        if (_args.length >= len) {
            fn.apply(this, _args)
        } else {
            return _curring.call(this, fn, len, ..._args)
        }
    }
}
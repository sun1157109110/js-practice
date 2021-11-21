function call(context = window,...args){
    if(typeof this !== 'function')throw new TypeError('this is not function');
    //创建符号
    let fn = Symbol('fn');
    context[fn] = this;
    let res = context[fn](...args);
    delete context[fn];
    return res
}
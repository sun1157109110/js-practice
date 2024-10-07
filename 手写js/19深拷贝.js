function deepClone(target, hash = new WeakMap()) {
    if (typeof target !== 'object' || !target) return;
    let clone = Array.isArray(target) ? [] : {};
    //如果map里存有对象 则直接返回所对应的对象 防止循环引用
    if (hash.has(target)) return hash.get(target);
    hash.set(target, clone)
    //考虑symbols
    let symbols = Object.getOwnPropertySymbols(target);
    for (let symbol of symbols) {
        if (typeof target[symbol] === 'object' && target[symbol] !== null) {
            clone[symbol] = deepClone[symbol]
        } else {
            clone[symbol] = target[symbol]
        }
    };
    //考虑Date,Reg
    for (let i in target) {
        if (Object.prototype.hasOwnProperty.call(target, i)) {
            // clone[i] = typeof target[i] === 'object' && target[i] !== null ? deepClone(target[i], hash) : target[i];
            if (typeof target[i] === 'object' && target[i] !== null) {
                clone[i] = deepClone(target[i], hash)
            } else if (target[i] instanceof Date){
                clone[i] = new Date(target[i])
            }else if(target[i] instanceof RegExp){
                clone[i] = new RegExp(target[i])
            }else{
                clone[i] = target [i]
            }
        }
    }
    return clone

};
let fn = Symbol('fn');
let a = {
    b: 1,

};
a[fn] = 'aaaaaa'
a.test = new Date();
// console.log(Object.getOwnPropertySymbols(a));
for (let i in a) {
    console.log(i);
};
console.log(deepClone(a));


function deepClone(obj, hash = new WeakMap()) {
    // 处理null和undefined的情况
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // 处理Date对象
    if (obj instanceof Date) {
        return new Date(obj);
    }
    
    // 处理正则表达式对象
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    // 处理函数
    if (typeof obj === 'function') {
        return obj.bind(null);  // 返回一个绑定的副本，保证函数拷贝
    }

    // 处理循环引用，防止无限递归
    if (hash.has(obj)) {
        return hash.get(obj);
    }

    // 处理数组
    if (Array.isArray(obj)) {
        const arr = [];
        hash.set(obj, arr);  // 存储对该对象的引用，防止循环
        obj.forEach((item, index) => {
            arr[index] = deepClone(item, hash);
        });
        return arr;
    }

    // 处理普通对象
    const cloneObj = {};
    hash.set(obj, cloneObj);  // 存储对象引用，防止循环

    Object.keys(obj).forEach(key => {
        cloneObj[key] = deepClone(obj[key], hash);
    });

    // 处理Symbol属性
    const symbolKeys = Object.getOwnPropertySymbols(obj);
    symbolKeys.forEach(symbol => {
        cloneObj[symbol] = deepClone(obj[symbol], hash);
    });

    return cloneObj;
}

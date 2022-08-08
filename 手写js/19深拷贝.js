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
// console.log(Object.getOwnPropertySymbols(a));
for (let i in a) {
    console.log(i);
};
console.log(Reflect.ownKeys(a));
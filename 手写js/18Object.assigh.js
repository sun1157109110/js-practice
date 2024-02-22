//将参数对象可枚举属性的值分配到目标对象上
Object.defineProperty(Object,
    'assign', {
        value: function (target, ...args) {
            if (!target) throw new TypeError('Cannot convert undefined or null to object');
            let o = Object(target);
            for (let i = 0; i < args.length; i++) {
                if (args[i]) {
                    for (let j in args[i]) {
                        if (Object.prototype.hasOwnProperty.call(args[i], j)) {
                            o[j] = args[i][j]
                        }
                    }
                }
            };
            return o
        },
        enumerable: false,
        configurable: true,
        writable: true
    }
)

function deepMerge(target, ...source) {
    //     source
    // 实现代码
    // // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    // 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
    function fn(obj1, obj2) {
        for (let key in obj2) {
            obj1[key] = obj1[key] && obj1[key].toString() === '[object Object]' &&
                (obj2[key] && obj2[key].toString() === '[object Object]') ?
                fn(obj1[key], obj2[key]) : (obj1[key] = obj2[key])
        }
        return obj1
    }
    for(let o of source){
        target = fn(target,o)
    }
    //     target={...target,...fn(source[0],source[1])}
    return target
}

function fn(obj1, obj2) {
    for (let key in obj2) {
        obj1[key] = obj1[key] && obj1[key].toString() === '[object Object]' &&
            (obj2[key] && obj2[key].toString() === '[object Object]') ?
            fn(obj1[key], obj2[key]) : (obj1[key] = obj2[key])
    }
    return obj1
}
console.log(deepMerge({a:1,b:{c:1}},{b:{c:3,d:6}},{e:666}));
console.log(Object.assign({a:1},{a:2}));
// console.log(JSON.parse(deepMerge({}, {a: 1, b: {c: 2, d: 3}},{b: {c: 4, e: 5}})))

// console.log(deepMerge({a: 1, b: {c: 2, d: 3}},{b: {c: 4, e: 5}}))
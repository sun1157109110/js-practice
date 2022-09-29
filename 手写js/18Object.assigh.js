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
        function fn(obj1,obj2){
            for(let key in obj2){
                obj1[key] = obj1[key]&&obj1[key].toString() === '[object Object]'&&
                    (obj2[key]&&obj2[key].toString() === '[object Object]')
                    ?deepMerge(obj1[key],obj2[key]):(obj1[key]=obj2[key])
            }
            return obj1
        }
    //     target={...target,...fn(source[0],source[1])}
        return fn(target,source[0])
    }
    // console.log(JSON.parse(deepMerge({}, {a: 1, b: {c: 2, d: 3}},{b: {c: 4, e: 5}})))
    
    // console.log(deepMerge({a: 1, b: {c: 2, d: 3}},{b: {c: 4, e: 5}}))
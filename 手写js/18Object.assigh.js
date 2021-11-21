//将参数对象可枚举属性的值分配到目标对象上
Object.defineProperty(Object,
    'assign',{
        value:function(target,...args){
            if(!target)throw new TypeError('Cannot convert undefined or null to object');
            let o = Object(target);
            for(let i =0;i<args.length;i++){
                if(args[i]){
                    for(let j in args[i]){
                        if(Object.prototype.hasOwnProperty.call(args[i],j)){
                            o[j] = args[i][j]
                        }
                    }
                }
            };
            return o
        },
        enumerable:false,
        configurable:true,
        writable:true
    }
    )
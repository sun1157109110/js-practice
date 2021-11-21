function bind(context,...args){
    //判断this类型
    if(typeof this !== 'function')throw new TypeError('this is not function');
    const fn = this;
    return function Fn(){
        if(this instanceof Fn){
            return new fn(...args,...arguments)
        }else{
            return fn.apply(context,[...args,...arguments])
        }
    }
}
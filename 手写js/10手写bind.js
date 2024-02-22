function bind(context, ...args) {
    //判断this类型
    if (typeof this !== 'function') throw new TypeError('this is not function');
    const fn = this;
    function F() {
        //原型
        if (this instanceof Fn) {
            return new fn(...args, ...arguments)
        } else {
            return fn.apply(context, [...args, ...arguments])
        }
    };
    let newF = function () {};
    newF.prototype = this.prototype
    F.prototype = new newF();
    return F;
}
//所以无论foo执行多少bind 都是第一次bind的对象！
//后面的bind只能改变上一个bind的this指向，例如foo.bind(obj).bind(obj2) 改变的是 foo.bind(obj)的this指向是obj2； 最终foo执行是的绑定的this是由第一次bind的对象决定，即foo.bind(obj)的obj
//https://blog.csdn.net/qq_51368103/article/details/126309800
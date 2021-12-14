function bind(context, ...args) {
    //判断this类型
    if (typeof this !== 'function') throw new TypeError('this is not function');
    const fn = this;
    function Fn() {
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
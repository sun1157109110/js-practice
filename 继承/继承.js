//1.原型链继承
function Father(name){
    this.name= name
}
function Son1(){
    this.name = 'son'
};
Son1.prototype = new Father();
//缺点:1.不能向构造函数传递参数 2.(所有实例共享父类原型上的属性.)(父类实例)在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱;实例属性摇身一变成为了原型属性
function SuperType() {
    this.colors = ["red", "blue", "green"];
    }
    function SubType() {}
    // 继承 SuperType
    SubType.prototype = new SuperType();
    let instance1 = new SubType();
    instance1.colors.push("black");
    console.log(instance1.colors); // "red,blue,green,black"
    let instance2 = new SubType();
    console.log(instance2.colors); // "red,blue,green,black"
/* -------------------------------------------------------------------------------------------- */
//构造函数继承
function Son2(){;
    Father.call(this,'son')
    this.name = 'son2'
};
//缺点:1.没有继承父类原型

//组合继承
function Son3(){
    Father.call(this,'son')
    this.name = 'son3'
};
Son3.prototype = new Father();
Son3.prototype.constructor = Son3
//缺点:调用了两次父类构造函数,组合继承的缺点就是使用超类型的实例做为子类型的原型，导致添加了不必要的原型属性.

//寄生组合继承
function Child(){
    Father.call(this)
    this.name = 'child'
};
Child.prototype =Object.create(Father.prototype);
Child.prototype.constructor = Child;
const kid = new Child();
console.log(kid.__proto__.__proto__===Father.prototype);
let num = Number.MAX_SAFE_INTEGER
console.log(num);

//原型继承
function object(o){
    function F(){};
    F.prototype = o;
    return new F()
}
//基于已有的对象来创建新的对象
//原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。

//寄生继承
function inhert(o){
    let clone = object(o);//创建一个新对象
    clone.b = 222;//以某种方式增强新对象;
    return clone;//返回对象
};
let o = {a:1};
let o1 = object(o);
console.log(o1.a);
//寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解是一种继承
//这种继承的优点就是对一个简单对象实现继承，如果这个对象不是自定义类型时。缺点是没有办法实现函数的复用。
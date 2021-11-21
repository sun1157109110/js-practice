//1.原型链继承
function Father(name){
    this.name= name
}
function Son1(){
    this.name = 'son'
};
Son1.prototype = new Father();
//缺点:1.不能向构造函数传递参数 2.所有实例共享父类原型上的属性;

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
//缺点:调用了两次父类构造函数

//寄生组合继承
function Child(){
    Father.call(this)
    this.name = 'child'
};
//寄生
Child.prototype =Object.create(Father.prototype);
Child.prototype.constructor = Child;
const kid = new Child();
console.log(kid.__proto__.__proto__===Father.prototype);
let num = Number.MAX_SAFE_INTEGER
console.log(num);
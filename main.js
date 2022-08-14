console.log('main');
console.log('main');
console.log('main');
class A{
  constructor(){
    this.a = this.h
  }
  h = 'hhhh'
 p = 'aaaa'
}
class B extends A{
  constructor(){
    super();
    this.b = 'bbbb'
  }
}
let o = new B();
console.log(Object.getPrototypeOf(B) === A.prototype);
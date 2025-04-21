# 实现instanceof
```js
//instanceof 判断构造函数的原型是否在实例对象的原型链上
function _instanceof(instance, constructor) {
  let prototype = constructor.prototype;
  let objPrototype = Object.getPrototypeOf(instance);
  while (objPrototype) {
    if (prototype === objPrototype) return true;
    objPrototype = Object.getPrototypeOf(objPrototype);
  }
  return false;
}
function Person() { };
function Foo() { };
let a = new Person();
let f = new Foo();
console.log(_instanceof(f, Person));
```
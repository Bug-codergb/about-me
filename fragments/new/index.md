# new操作符做了什么
> es6之前，js通过构造函数借助new关键字来实例化一个对象，本文记录一下new实例化的一个过程
- 一个非箭头函数都会存在一个属性prototype,不管它是否通过new关键字实例化
```js
  function fn(){};
  console.log(fn.prototype) //{constructor}
```
- new关键字则是在构造函数内部创建一个空对象，最终返回这一对象的过程。
1. 构造函数内部创建一个空对象    const obj = new Object();
2. 将空对象obj的__proto__指向构造函数的prototypeobj.__proto__=fn.prototype
3. 执行构造函数，构造函数的this指向创建出来的对象objconst res = fn.apply(obj,args),如果存在参数args;
4. 返回构造函数的执行结果，结果为对象，则返回对象，new关键字失效，否则返回obj
5. 完整代码
```js
function _new(fn,...args){
  let obj = {};
  let Constructor = fn;
  obj.__proto__ = Constructor.prototype;
  const ret = Constructor.apply(obj, args);
  return typeof ret === 'object' ? ret : obj;
}
```
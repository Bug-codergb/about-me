# 手写call-bind-apply
## 手写call
```js
Function.prototype.gbCall = function (thisArg,...rest) {
  let fn = this;
  thisArg = thisArg ? Object(thisArg) : window;
  thisArg.fn = fn;
  let res = thisArg.fn(...rest);
  delete thisArg.fn;
  return res;
}
let obj = { name: "12" };
function foo(a,b) {
  console.log(this);
  return a + b;
}
let res = foo.gbCall(12, 1, 2);
console.log(res);
```
## 手写apply
```js
//与call类似
```
## 手写bind
```js
Function.prototype.gbBind = function (thisArg, ...argArr) {
  let fn = this;
  function _gbBind(...args) {
    thisArg = thisArg ? Object(thisArg) : window;
    thisArg.fn = fn;
    let finalParams = [...argArr,...args]
    let res = thisArg.fn(finalParams);
    delete thisArg.fn;
    return res;
  }
  return _gbBind;
}
```
# 闭包又称函数闭包或者词法闭包

是在支持函数是一等公民的编程语言中出现的一种结构体，它存储了一个函数和一个关联的环境。

当捕捉闭包的时候，它的自由变量会在捕捉的时候被确定，这样即使脱离了捕捉上下文，它也能照常运行。每创建一个函数，闭包就会在函数被创建出来的时候同时被创建。

例子，工具函数缓存
```js
//来自vue3源码工具函数
const cacheStringFunction = (fn) => {
  const cache = Object.create(null);//这里的cache就可以缓存所有函数以及函数的处理结果
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }
}
const capitalize = cacheStringFunction((str) => {
  str.charAt(0).toUpperCase();
})

```

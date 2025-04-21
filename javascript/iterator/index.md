# 迭代器
> es6定义了迭代器，它是一个函数，返回一个对象，该对象有一个next方法，next方法返回两个属性，value:本次迭代的值，done：迭代是否结束

- 比如要获取一个函数定义时候的参数(练习)
```js
function iterator() {
  const isFunction = Object.prototype.toString
    .call(this)
    .includes("object Function");
  if (isFunction) {
    const fnStr = this.toString();
    const exp = /function\s+\w+\(([^)]+)\)/;
    const match = fnStr.match(exp);
    if (match && match[1]) {
      const params = match[1];

      let arr = params.split(",");
      let index = -1;
      return {
        next: function () {
          index++;
          return {
            value: arr[index],
            done: index >= arr.length,
          };
        },
      };
    } else {
      return {
        next() {
          return {
            vallue: undefined,
            done: true,
          };
        },
      };
    }
  } else {
    throw new Error("no iterator");
  }
}
function fn(a,b,d) {}
let obj = {};
fn[Symbol.iterator] = iterator;
for (let item of fn) {
  console.log(item);//输出a,b,d
}

```
- 遍历一个对象
```js
let arr = [1,2,3,4,5];

let object={};
object[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
for(let item of object){
  console.log(item)//1，2，3，4，5，6
}
//迭代器就是一个函数，可以将数组的迭代器复制给对象Symbol.iterator属性

```
- 解构(一道面试题)
```js

Object.prototype[Symbol.iterator] = function(){
  const keys = Object.keys(this);
  let index = -1;
  return {
    next:()=>{
      index++;
      return {
        value:this[keys[index]],
        done:index>=keys.length
      }
    }
  }
}
let [a,b] = {a:12,b:54};
console.log(a,b)


```
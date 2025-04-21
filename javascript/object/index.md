# 对象的基本操作
## 对象的遍历形式
**先举一个例子**
```js
let fmt = Symbol.for("fmt");
function Person(name, age) {
  this.name = name;
  this.age = age;
  this[fmt] = "app"
}
Person.prototype.address = "北京";
Person.prototype.eat = function () {
  console.log("eatting")
}
let p = new Person("coder", 12);

```
- for...in 遍历 (可以遍历到对象原型上的属性和方法,但是没有遍历到symbol类型的属性)
```js
for (const key in p) {
  console.log(key);
}
```
- Object.keys获取所有key，遍历keys,无法获取到原型上的方法和属性，同样无法获取symbol类型的属性
```js
const keys = Object.keys(p);
console.log(keys);//不可以遍历到原型上的属性和方法

```
- Reflect.ownKeys,获取所有key，遍历keys,同样无法获取原型上的属性和方法，但是可以获取symbol类型的属性
```js
const ownKeys = Reflect.ownKeys(p);
console.log(ownKeys);

```
- Object.getOwnPropertyNames获取所有属性的名称,同样无法获取原型上的属性和方法，同样无法获取symbol类型的属性
```js
const properties = Object.getOwnPropertyNames(p);
console.log(properties);  
```
- Object.getOwnPropertySymbols获取对象上的所有symbol类型的属性
```js
console.log(Object.getOwnPropertySymbols(p))
```
- Object.entries获取对象key,value的键值数组，最终返回一个二维数组
```js
const entries = Object.entries(p);
console.log(entries)

```
- Object.getOwnPropertyDescriptors获取对象上所有属性的描述符，无法获取原型上的属性，但是可以获取symbol类型的属性
```js
console.log(Object.getOwnPropertyDescriptors(p));

```

<table>
  <thead>
    <th>方法</th>
    <th>是否可以便利到原型上的属性</th>
    <th>是否可以遍历到Symbol属性</th>
    <th>返回值</th>
  </thead>
  <tbody>
    <tr>
        <td>for...in</td>
        <td>是</td>
        <td>是</td>
        <td>--</td>
    </tr>
    <tr>
        <td>Object.keys</td>
        <td>否</td>
        <td>否</td>
        <td>key数组</td>
    </tr>
    <tr>
        <td>Reflect.ownKeys</td>
        <td>否</td>
        <td>是</td>
        <td>key数组</td>
    </tr>
<tr>
        <td>Object.getOwnPropertyNames</td>
        <td>否</td>
        <td>否</td>
        <td>key数组</td>
    </tr>
<tr>
        <td>Object.getOwnPropertySymbols</td>
        <td>否</td>
        <td>是</td>
        <td>symbol类型的key数组</td>
    </tr>
<tr>
        <td>Object.entries</td>
        <td>否</td>
        <td>否</td>
        <td>key,value组成的二维数组</td>
    </tr>
<tr>
        <td>Object.getOwnPropertyDescriptors</td>
        <td>否</td>
        <td>是</td>
        <td>属性描述符数组</td>
    </tr>
  </tbody>
</table>
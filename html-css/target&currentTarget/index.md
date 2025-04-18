# 事件回调的currentTarget和target
- dom结构
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 300px;
        height: 200px;
        border: 1px solid pink;
      }
      .inner {
        width: 50%;
        height: 100px;
        border: 1px solid skyblue;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="inner"></div>
    </div>
  </body>
</html>

```
box为父元素，inner为子元素，然后为box绑定点击事件，但是点击在inner上
```js
const box = document.querySelector(".box");

box.addEventListener("click", function (e) {
  console.log(e.currentTarget,"currentTarget");//box
  console.log(e.target,"target");//inner
});
```
最终结果为 currentTarget为绑定事件的元素，target为当前点击的元素
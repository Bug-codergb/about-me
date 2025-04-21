# 三栏布局实现方案
## 浮动实现
```html
   <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          .container {
            height: 200px;
          }
          .left,
          .right {
            height: 100%;
            background-color: pink;
            width: 200px;
          }
          .left {
            float: left;
          }
          .right {
            float: right;
            background-color: skyblue;
          }
          .main {
            height: 100%;
            background-color: #bfa;
            margin: 0 210px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="left"></div>
          <div class="right"></div>
          <div class="main"></div>
        </div>
      </body>
    </html>
  ```
预览

 <div :class="$style.container">
    <div :class="$style.left"></div>
    <div :class="$style.right"></div>
          <div :class="$style.main"></div>
</div>

## table-cell实现
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .container {
        display: table;
        height: 200px;
        width: 100%;
      }
      .left,
      .right {
        display: table-cell;
        width: 200px;
      }
      .left {
        background-color: pink;
      }
      .right {
        background-color: skyblue;
      }
      .main {
        background-color: #bfa;
        display: table-cell;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left"></div>
      <div class="main"></div>
      <div class="right"></div>
    </div>
  </body>
</html>

```
预览
 <div :class="$style['g-container']">
      <div :class="$style['g-left']"></div>
      <div :class="$style['g-main']"></div>
      <div :class="$style['g-right']"></div>
    </div>

<style module>
.container {
            height: 200px;
          }
          .left,
          .right {
            height: 100%;
            background-color: pink;
            width: 200px;
          }
          .left {
            float: left;
          }
          .right {
            float: right;
            background-color: skyblue;
          }
          .main {
            height: 100%;
            background-color: #bfa;
            margin: 0 210px;
          }
.g-container {
        display: table;
        height: 200px;
        width: 100%;
      }
      .g-left,
      .g-right {
        display: table-cell;
        width: 200px;
      }
      .g-left {
        background-color: pink;
      }
      .g-right {
        background-color: skyblue;
      }
      .g-main {
        background-color: #bfa;
        display: table-cell;
      }
</style>
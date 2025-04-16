> 虚拟列表是前端多数据优化性能一个重要的解决方案，优化前端渲染性能
### 虚拟列表dom结构
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    #container{
      width: 500px;
      height: 600px;
      border: 1px solid pink;
    }
    #virtual-list-container{
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
    .virtual-list-item{
      height: 100px;
      border: 1px solid pink;
    }
  </style>
</head>
<body>
  <div id="container">
    <div id="virtual-list-container">
      <div id="virtual-list"></div>
    </div>
  </div>
  <script src="./01_定高虚拟列表.js"></script>
  <script>
    let virtualList = new VirtualList("virtual-list-container","virtual-list",102);
    let arr=[]
    for(let i=0;i<40;i++){
      arr.push(i)
    }
    virtualList.init(arr)
  </script>
</body>
</html>
```    
### js代码实现
```js
class VirtualList{
  /*
  * @viewSelector: 可视区的高度
  * @virtualListSelector：虚拟列表dom
  * @itemHeight：每一个元素的高度，因为是定高虚拟列表，所以要指定每一个元素的高度
  * */  
  constructor(viewSelector,virtualListSelector,itemHeight){
    this.startIndex = 0 //当前视口的列表元素的开始索引
    this.endIndex = 0   //当前视口的列表元素的结束索引
    this.viewSelector = document.getElementById(viewSelector)
    this.virtualListSelector = document.getElementById(virtualListSelector)
    this.itemHeight = itemHeight

    this.maxViewCount = 0 //当前视口能显示元素的最大数量
    this.dataSource = []  //虚拟列表的所有数据
    this.renderList = []  //当前视口所渲染的数据，一般为maxViewCount条

  }
  init(dataSource){
    this.dataSource = dataSource
    this.maxViewCount = Math.ceil(this.viewSelector.offsetHeight / this.itemHeight)+1//注意要加一防止恰好除整，没有滚动条

    this.bindEvent()
    this.render()
  }
  bindEvent(){
    this.viewSelector.addEventListener("scroll",this.handleScrollEvent.bind(this))
  }
  handleScrollEvent(){
    const scrollTop = this.viewSelector.scrollTop
    this.startIndex = Math.floor(scrollTop / this.itemHeight) //当全部卷去了，才能记为startIndex
    
    this.computedEndIndex()
    this.computedRenderList()
    this.computedStyle()
    this.render()
  }
  // 获取当前视口最后一个元素
  computedEndIndex(){
    let endIndex = this.startIndex + this.maxViewCount // 开始索引+视口元素数量
    this.endIndex = this.dataSource[endIndex] ? endIndex : this.dataSource.length
  }
  //获取可视区元素
  computedRenderList(){
    this.renderList = this.dataSource.slice(this.startIndex,this.endIndex)  
  }
  //列表被卷去的高度，需要再向下移动回来，通过transform，设置height防止滚动条越来越长
  computedStyle(){
    this.virtualListSelector.style.height = `${this.dataSource.length * this.itemHeight - this.startIndex*this.itemHeight}px`
    this.virtualListSelector.style.transform = `translateY(${this.startIndex*this.itemHeight}px)`
  }
  render(){
    this.computedEndIndex()
    this.computedRenderList()
    //渲染列表，别忘记设置class哦
    let itemListDom = this.renderList.map((item)=>`<div class="virtual-list-item">${item}</div>`).join("")
    this.virtualListSelector.innerHTML = itemListDom;

    this.computedStyle()
  }
}

```
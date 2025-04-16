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
        .fs-estimated-virtuallist-container{
            width: 400px;
            height: 600px;
        }
        #fs-estimated-virtuallist-content{
            width: 100%;
            height: 100%;
            overflow-y: auto;
            border: 1px solid skyblue;
        }
        .fs-estimated-virtuallist-list-item{
            border: 1px solid pink;
            width: 100%;
        }
    </style>
</head>
<body>
<div class="fs-estimated-virtuallist-container">
    <div id="fs-estimated-virtuallist-content" ref="contentRef">
        <div id="fs-estimated-virtuallist-list" ref="listRef">
            <!-- <div class="fs-estimated-virtuallist-list-item" v-for="i in renderList" :key="i.id" :id="String(i.id)">
              <slot name="item" :item="i"></slot>
            </div> -->
        </div>
    </div>
</div>

<script src="./02_不定高虚拟列表.js"></script>
<script>
    let virtualList = new VirtualList("fs-estimated-virtuallist-content","fs-estimated-virtuallist-list",47)
    let arr=[]
    for(let i=0;i<arr.length;i++){
        arr[i].id = i
    }
    virtualList.init(arr)
</script>
</body>
</html>
```    
### js代码实现
```js
//二分查找
const binarySearch = (list, value) => {
    let left = 0,
        right = list.length - 1,
        templateIndex = -1;
    while (left < right) {
        const midIndex = Math.floor((left + right) / 2);
        const midValue = list[midIndex].bottom;
        if (midValue === value) return midIndex + 1;
        else if (midValue < value) left = midIndex + 1;
        else if (midValue > value) {
            if (templateIndex === -1 || templateIndex > midIndex) templateIndex = midIndex;
            right = midIndex;
        }
    }
    return templateIndex;
}
//虚拟列表类
class VirtualList{
    constructor(contentSelector,listSelector,estimateHeight){
        this.viewHeight = 0 //视口高度
        this.listHeight = 0 // 整个列表的高度
        this.startIndex =  0//视口元素的开始索引
        this.endIndex = 0//视口元素的结束索引
        this.maxCount = 0//视口能显示的最大元素数量，需要通过预估高度推断出来
        this.estimateHeight = estimateHeight//每一个元素的预估高度
        this.offsetDis = 0

        this.dataSource = []
        this.renderList = []

        this.position = []//所有元素的位置信息，为每一个元素设置一个位置信息（真实信息），top:距离第一个元素的高度，bottom:top+元素自身高度,dHeight:真实高度和预估高度的差值

        this.contentDom = document.getElementById(contentSelector)
        this.listDom = document.getElementById(listSelector)
    }
    init(dataSource){
        this.viewHeight = this.contentDom.offsetHeight
        this.dataSource = dataSource || []
        this.maxCount = Math.ceil(this.viewHeight/this.estimateHeight)+1


        this.initPosition()

        this.bindEvent()

        this.computedEndIndex()
        this.computedRenderList()
        this.computedOffsetDis()
        this.computedStyle()
        this.render()
        queueMicrotask(()=>{
            this.setPosition()
            console.log(this.position)
        })

    }
    initPosition(){
        const pos = []
        for(let i=0;i<this.dataSource.length;i++){
            const item = this.dataSource[i]
            pos.push({
                index: item.id,//id为每一个元素的索引，或者通过其他的字段设置，可以标识元素在列表中是第几个
                height: this.estimateHeight,//初始化的时候是预估高度
                top: i*this.estimateHeight,
                bottom:(i+1)*this.estimateHeight,
                dHeight:0
            })
        }
        this.position = [...this.position,...pos]
    }
    //当元素更新到真实dom后，更新每一个元素的位置信息
    setPosition(){
        const nodes = this.listDom.children;
        if(!nodes || !nodes.length) return;
        [...nodes].forEach((node)=>{
            const rect = node.getBoundingClientRect()

            const id = node.getAttribute("data-id")
            const itemPos = this.position[Number(id)]
            const dHeight = itemPos.height - rect.height;//预测高度 - 实际高度
            if(dHeight){
                itemPos.height = rect.height
                itemPos.bottom = itemPos.bottom - dHeight
                itemPos.dHeight = dHeight
            }
        })

        const firstId = Number(nodes[0].getAttribute("data-id"))
        const len = this.position.length
        let firstDtHeight = this.position[firstId].dHeight

        this.position[firstId].dHeight = 0

        for(let i=firstId+1;i<len;i++){
            const pos = this.position[i]
            pos.top = this.position[i-1].bottom
            pos.bottom =  pos.bottom - firstDtHeight

            if(pos.dHeight!==0){
                firstDtHeight+=pos.dHeight

                pos.dHeight =0
            }
        }
        this.listHeight = this.position[len-1].bottom;
    }
    bindEvent(){
        this.contentDom.addEventListener("scroll",this.handleScroll.bind(this))
    }
    handleScroll(){
        const { scrollTop, clientHeight,scrollHeight } = this.contentDom

        this.startIndex = binarySearch(this.position,scrollTop);


        this.computedEndIndex()
        this.computedRenderList()
        this.computedOffsetDis()
        this.computedStyle()

        this.setPosition()
        this.render()
    }
    computedRenderList(){
        this.renderList = this.dataSource.slice(this.startIndex,this.endIndex)
    }
    computedEndIndex(){
        let endIndex = this.startIndex + this.maxCount
        this.endIndex = this.dataSource[endIndex] ? endIndex:this.dataSource.length
    }
    computedOffsetDis(){
        this.offsetDis = this.startIndex > 0 ? this.position[this.startIndex - 1].bottom : 0
    }
    computedStyle(){
        this.listDom.style.height = `${this.listHeight - this.offsetDis}px`
        this.listDom.style.transform = `translate3d(0,${this.offsetDis}px,0)`
    }
    render(){
        const template = this.renderList.map((item)=>`<div class="fs-estimated-virtuallist-list-item" data-id="${item.id}">${item.id}-${item.content}</div>`).join("")
        this.listDom.innerHTML = template;
    }
}
```
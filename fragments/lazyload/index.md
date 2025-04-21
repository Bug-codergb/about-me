# 实现图片懒加载
1. 获取当前图片元素的父元素，（在获取父元素，直到某个祖先元素设置了overflow:scroll）
    ```js
    //根据当前元素，获取其第一个开启了overflow:scroll|auto的元素
    export function getCurrentParent(el:HTMLElement) {
      let _parent = el.parentNode;
      while (_parent) {
        const overflowStyle = getComputedStyle(_parent as Element)['overflow'];
        if (/(auto)|(scroll)/.test(overflowStyle)) {
          return _parent;
        }
        _parent = _parent.parentNode;
      }
    }
    ```
2. 当用户滚动鼠标时，判断图片是否到了可视区域   
```js
/*
* containerHeight:开启了overflow的祖先元素
* */
export function judgeVisible(el:HTMLElement,containerHeight:number) {
  return el.getBoundingClientRect().top <= containerHeight;
}
```
3. 如果在可视区则，渲染img
```js
renderImg(src).then(() => {
          imgRef.current?.setAttribute("src", src);
          imgRef.current!.loaded = true;
        }).catch((e) => {
          imgRef.current?.setAttribute("src", error);
          imgRef.current!.loaded = true;
        })
```
```js
export function renderImg(src:string) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  })
}
```

**预览**


<script setup>
import { ref ,useTemplateRef,nextTick,onMounted} from "vue";
function getCurrentParent(el) {
  let _parent = el.parentNode;
  while (_parent) {
    const overflowStyle = getComputedStyle['overflow'];
    if (/(auto)|(scroll)/.test(overflowStyle)) {
      return _parent;
    }
    _parent = _parent.parentNode;
  }
}
function judgeVisible(el,containerHeight) {
 
  const top = el.getBoundingClientRect().top - imgRef.value.getBoundingClientRect().top
  
  return top <= containerHeight;
}
function renderImg(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  })
}
const imgList = ref([
  {
    url:"/about-me/1.jpg",
    ref:null
  },
  {
    url:"/about-me/2.jpg",
ref:null
  },
  {
    url:"/about-me/3.jpg",
ref:null
  },
  {
    url:"/about-me/4.jpg",
ref:null
  },
  {
    url:"/about-me/5.jpg",
ref:null
  },  
])
const imgRef = useTemplateRef("img-container")
const ulRef = useTemplateRef("ul")

const fn=()=>{
  const offsetHeight = imgRef.value.offsetHeight
 
  
  for(let item of imgList.value){
    const el = item.ref
    const img = el.querySelector("img")
    const isVisible = judgeVisible(el,offsetHeight)

    if(isVisible && img.getAttribute('data-loaded') === null){
        img.setAttribute("src","/about-me/6.jpg")    
        renderImg(item.url).then(()=>{
            setTimeout(()=>{

img.setAttribute("src",item.url)
            img.setAttribute("data-loaded","1")
            },500)
        }).catch((e)=>{
            img.setAttribute("src","/about-me/6.jpg")
            img.setAttribute("data-loaded","1")
        })
    }
  }
}
onMounted(()=>{

  nextTick(()=>{
        fn()
  
  })
})
const handleScroll=()=>{
  fn()
  console.log("--")
}
</script>

<div :class="$style.container" ref="img-container" @scroll="handleScroll">
  <ul ref="ul" :class="$style.ul">
    <li :class="$style['img-item-li']" v-for="item in imgList" :key="item.url" :ref="(el)=>item.ref=el">
        <img :class="$style['img-item']" src="/6.jpg"/>
    </li>
  </ul>
</div>

<style module>
.container{
  width:300px;
  height: 320px;
  overflow-y:scroll ;
  
}
.img-item{
  width:100%;
  vertical-align: baseline;
  height: 300px;  
}
.ul{
  margin:0!important;
  padding:0!important;
 
}
.img-item-li{
  margin:0!important;
  padding:0!important;
  list-style:none;
}
</style>
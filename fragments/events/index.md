# 发布订阅模式
> 发布订阅模式是前端常用的一种设计模式，比如vue的响应式系统
## 整体结构
![图片描述](/events.png)
## 代码描述
```js
class EventEmitter{
  constructor(){
    this.events={}
  }
  on(eventName,callback,once = false){
    if(typeof callback !=='function'){
      throw new Error("callback must be a function")
    }
    if(!this.events[eventName]){
      this.events[eventName] = []
    }
    this.events[eventName].push({
      callback,
      once
    })
  }

  emit(eventName,...args){
    const events = this.events[eventName]
    if(!events || events.length === 0) return this;

    this.events[eventName] = events.filter(event=>{
      event.callback(...args)
      return !event.once
    })

    return this
  }

  off(eventName,callback){
    if(!this.events[eventName]) return this
    if(!callback){
      delete this.events[eventName]
    }else{
      this.events[eventName] = this.events[eventName].filter((item)=>item.callback !==callback)
    }
    return this
  }
  once(eventName, callback) {
    return this.on(eventName, callback, true);
  }
}

const emitter = new EventEmitter();
emitter.on('data1', (data) => {
  console.log('收到数据1-1:', data);
});
emitter.on('data1', (data) => {
  console.log('收到数据1-2:', data);
});

emitter.on('data2', (data) => {
  console.log('收到数据2:', data);
});
emitter.once("once",()=>{
  console.log("我只执行一次")
})
emitter.emit("data1")
emitter.emit("data2")

emitter.emit("once")
emitter.emit("once")

emitter.off("data1")
emitter.off("data2")
console.log(emitter.events)

```
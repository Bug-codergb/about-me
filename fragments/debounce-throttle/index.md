# 防抖函数和节流函数的实现流程
## 防抖函数
> 防抖函数是前端开发中非常重要的一个工具函数，其核心原理就是在间隔时间内如果再次执行函数fn，则清除定时器
- 实现思路
  ```js
    /*
     * @fn: 需要执行防抖的函数
     * @dely: 延迟执行的时间
     * @immediate: 是否立即执行      
     */
    function debounce(fn,dely,immediate = false){
      let timer = null
      let isInvoked = false
      let _debounce = function(...args){
        
        if(timer){
          clearTimeout(timer)
        }
        // 如果是立即执行，执行完毕后，isInvoked置为true，下次再执行就走防抖
        if(immediate && !isInvoked){
          fn.apply(this,args)
          isInvoked = true
          return
        }

        timer = setTimeout(()=>{
          fn.apply(this,args)
          isInvoked = false
        },dely)
      }
      // 用于取消防抖函数  
      _debounce.cancel = function(){
        if(timer){
          clearTimeout(timer)
          time = null
          isInvoked = false
        }
      }
      return _debounce
    }
  ```
## 节流函数 
> 节流函数与防抖函数不同的是，如果函数fn一直被执行，截流函数就是将该函数fn隔一段时间执行
- 实现思路
  ```js
    function throttle(fn, interval,immediate=true) {
        let startTime = 0;
        let t = null;
        return function _throttle(...args){
            let nowTime = new Date().getTime();
            if (!immediate && startTime ===0) {
                startTime = nowTime;
            }
            if (t) {
                clearTimeout(t);
            }
            let waitTime = interval - (nowTime - startTime);
            if (waitTime <= 0) {
                fn.apply(this,args);
                startTime = nowTime;
            } else {
            t = setTimeout(() => {
                    fn.apply(this, args);
                },interval)
            }
        }
    }
  ```
> 防抖和截流函数都是前端常用的工具函数，但是概念容易混淆，所有要掌握其核心原理，想要准确使用，可以使用```lodash```库自带的防抖和截流函数  

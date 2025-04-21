# useEffect基本使用
## useEffect如何在初始化的时候不执行，只有依赖改变才执行
我们可以通过一个变量来标识，useEffect是否应该执行，注意该变量只能通过useRef来定义
```js
import React,{memo,useEffect,useState,useRef} from "react"
const UseEffect=()=>{
  const [count,setCount] = useState(0);
  const isInitialMount = useRef(true);
  useEffect(()=>{
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    console.log('依赖项变化了');
  },[count])

  const handleAdd=()=>{
    setCount(count+1)
  }
  return <div>
    <button onClick={()=>handleAdd()}>+</button>
  </div>
}
export default memo(UseEffect)

```
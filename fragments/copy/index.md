- 在浏览器环境下点击按钮复制文本
```js
  function copyText(text){
    if(navigator.clipboard){
      navigator.clipboard.writeText(text)
    }else{
      const input = document.createElement("input")
      input.setAttribute("value",text)
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
    }
  }
```

<script setup>
import {ElMessage} from "element-plus";
function copyText(text){
    if(navigator.clipboard){
      navigator.clipboard.writeText(text)
    }else{
      const input = document.createElement("input");
      input.setAttribute("value",text);
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input)
    }
  }
const handleClick=()=>{
  copyText("床前明月光");
  ElMessage.success("复制成功")
  console.log(ElMessage.success)
}
</script>

<div class="container">
  <span>窗前明月光</span>
  <button :class="$style.btn" @click="handleClick">点击复制文字</button>
</div>

<style module>
.btn{
  background-color:#7eacf9;
  color:#fff;  
  margin:0 0 0 20px;  
  padding:3px 10px;
  border-radius: 4px;  
}
</style>
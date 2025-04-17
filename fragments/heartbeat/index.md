> WebSocket心跳机制是前端使用socket非常重要的一个机制，不断检测当前socket是否处于连接状态

```js
class WsApp extends WebSocket {
  constructor(url, options) {
    super(url);
    this.heartBeatTimer = null;
    this.reconnectTimer = null;
    const {wsReconnect} = options;
    this.wsReconnect = wsReconnect;
    this.init();
  }

  init() {
    this.bindEvent();
  }

  bindEvent() {
    this.addEventListener("open", this.handleOpen);
    this.addEventListener("message", this.handleMessage);
    this.addEventListener("close", this.handleClose);
    this.addEventListener("error", this.handleError);
  }
  // 建立连接后，开始心跳
  handleOpen() {
    this.startHeartBeat();
  }
  //收到消息后，判断是心跳，还是消息
  handleMessage(e) {
    const {mode, message} = this.receiveMsg(e);
    switch (mode) {
      case "heart_beat":
        console.log("heart beat");
        break;
      case "message":
        console.log("处理消息", message);
      default:
    }
  }
  // 关闭了之后，执行重连
  handleClose() {
    this.heartBeatTimer && clearInterval(this.heartBeatTimer);
    this.heartBeatTimer = null;

    this.reconnectTimer && clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;

    console.log("socket 关闭");
    this.reconnect();
  }
  // 失败后，同样执行重连
  handleError() {
    clearInterval(this.heartBeatTimer);
    this.heartBeatTimer = null;
    this.reconnect();
  }
  // 当socket打开后，执行心跳
  /*
  * readState: 0 已创建，但是未打开
  * readState: 1 连接已经打开，准备通信
  * readState: 2 连接正在关闭
  * readState: 3 连接已经关闭或无法打开
  * */
  startHeartBeat() {
    this.heartBeatTimer = setInterval(() => {
      this.readyState === 1 &&
      this.sendMsg({
        mode: "heart_beat",
        message: '"heart beat"',
      });
      if (this.readyState !== 1) {
        clearInterval(this.heartBeatTimer), (this.heartBeatTimer = null);
      }
    }, 3000);
  }

  reconnect() {
    this.reconnectTimer = setTimeout(() => {
      window.navigator.onLine && this.wsReconnect();
    }, 1000);
  }

  sendMsg(data) {
    this.send(JSON.stringify(data));
  }

  receiveMsg(e) {
    return JSON.parse(e.data);
  }

  create(url) {
    return new WsApp(url, options);
  }
}

export default WsApp;

```

```js
let ws = null;

function wsConnect() {
  ws = new WsApp("ws://localhost:8888/heart", {
    wsReconnect,
  });
}

//重连
function wsReconnect() {
  if (!ws) {
    return wsConnect();
  }
  if (ws && ws.reconnectTimer) {
    clearTimeout(ws.reconnectTimer);
    ws.reconnectTimer = null;
    wsConnect();
  }
}

wsConnect();
```
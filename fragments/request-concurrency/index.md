> 由于现代浏览器的请求并发数一般为6-10个，所以在日常开发中，有时候需要我们去控制请求并发数，防止请求过多，导致请求被取消
```js
class Task {
  constructor(options) {
    const { queue, maxCount } = options;
    this.taskQueue = queue || [];
    this.maxCount = maxCount || 3;
  }
  run() {
    if (!this.taskQueue.length) return;

    let count = Math.min(this.maxCount, this.taskQueue.length);
    for (let i = 0; i < count; i++) {
      let task = this.taskQueue.shift();
      this._runTask(task);
      this.maxCount--;
    }
  }
  _runTask(task) {
    task()
      .then((res) => {})
      .catch((er) => {})
      .finally(() => {
        this.maxCount++;
        this.run();
      });
  }
}

```
class Promise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = [];

    const resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.handlers.forEach(handler => this.handle(handler));
        this.handlers = [];
      }
    };

    const reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.handlers.forEach(handler => this.handle(handler));
        this.handlers = [];
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 返回一个promise以支持链式调用
    return new Promise((resolve, reject) => {
      // 创建一个handler对象用来解析then方法的回调函数和解析（或者拒绝）
      const handler = {
        onFulfilled,
        onRejected,
        resolve,
        reject,
      };

      // 如果是pedding状态表示尚未完成，我们把它放到Promise的处理程序队列中：handlers数组
      if (this.state === 'pending') {
        this.handlers.push(handler);
      } else {
        // 如果不是pedding状态则表示已经完成（成功或者失败），我们把它立即执行，确保Promise在已经完成的情况下仍然能触发回调
        this.handle(handler);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  handle(handler) {
    // 如果Promise状态为已经完成
    if (this.state === 'fulfilled') {
      // 如果传递了 onFulfilled 函数就调用它并传入结果，然后再获取它的返回值返回到下一个then的链式调用
      if (typeof handler.onFulfilled === 'function') {
        try {
          const result = handler.onFulfilled(this.value)
          handler.resolve(result);
        } catch (error) {
          handler.reject(error);
        }
      } else {
        // 没有 onFulfilled 说明没有调用 then 函数
        handler.resolve(this.value);
      }
    // 如果Promise状态为已失败
    } else if (this.state === 'rejected') {
      if (typeof onRejected === 'function') {
        try {
          const result = handler.onRejected(this.value);
          // 这里表示上一个 promise 成功完成
          handler.resolve(result);
        } catch (error) {
          handler.reject(error);
        }
      } else {
        handler.reject(this.value);
      }
    }
  }

  static resolve(value) {
    return new Promise(resolve => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
}

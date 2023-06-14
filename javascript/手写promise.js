class Promise {
  constructor(executor) {
    this.status = 'pendding';
    this.value = undefined;
    this.handlers = [];

    const resolve = value => {
      if (this.status === 'pendding') {
        this.status = 'fulfilled';
        this.value = value;
        this.handlers.forEach(handler => this.handle(handler));
        this.handlers = [];
      }
    }

    const reject = reason => {
      if (this.status === 'pendding') {
        this.status = 'rejected';
        this.value = reason;
        this.handlers.forEach(handler => this.handle(handler));
        this.handlers = [];
      }
    }
    
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    // 返回一个 promise 保证链式调用
    return new Promise((resolve, reject) => {
      const handler = {
        onFulfilled,
        onRejected,
        resolve,
        reject
      };
      // 如果状态还是 pendding 就把 handler 收集起来, 否则就调用 handle 直接执行
      if (this.status === 'pendding') {
        this.handlers.push(handler);
      } else {
        this.handle(handler)
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  handle(handler) {
    // 等待用户调用 resolve 或者 reject 执行 handle
    if (this.status === 'fulfilled') {
      // 如果是成功状态并且 onFulfilled 是一个函数, 就调用它并把值作为参数传递
      if (typeof handler.onFulfilled === 'function') {
        try {
          // 如果有返回值，需要作为下一个 then 的 resolve 的结果
          const result = handler.onFulfilled(this.value);
          handler.resolve(result);
        } catch (error) {
          handler.reject(error);
        }
      } else {
        // 如果没有 onFulfilled 函数也要确保链式调用继续把结果返回给下一个 then 的 resolve 的结果
        handler.resolve(this.value);
      }
    } else if (this.status === 'rejected') {
      // 操作基本和成功的一致
      if (typeof handler.onRejected === 'function') {
        try {
          // 这里如果有返回值一样将返回值作为下一个 then 的 resolve 的结果
          const result = handler.onRejected(this.value);
          handler.resolve(result);
        } catch (error) {
          handler.reject(error);
        }
      } else {
        // 如果没有 onRejected 函数也要确保链式调用继续把结果返回给下一个 then 的 reject 的结果
        handler.reject(this.value);
      }
    }
  }
}

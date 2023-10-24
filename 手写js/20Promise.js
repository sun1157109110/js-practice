// 定义三种状态
const PENDING = 'PENDING' // 进行中
const FULFILLED = 'FULFILLED' // 已成功
const REJECTED = 'REJECTED' // 已失败

class myPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    // 成功态回调函数队列
    this.onFulfilledCallbacks = []
    // 失败态回调函数队列
    this.onRejectedCallbacks = []
    //将异步操作的结果传递出去;
    const resolve = (value) => {
      if (this.status == PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach((data) => {
          data(this.value)
        })
      }
    }
    const reject = (reason) => {
      // 只有进行中状态才能更改状态
      if (this.status == PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach((data) => {
          data(this.reason)
        })
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    //当回调函数不存在时进行 值传递和异常穿透
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }
    const self = this
    return new Promise((resolve, reject) => {
      /* 
               1.如果抛出异常,return的promise就会失败,reason就是error
               2.如果回调函数不是promise,return的promise结果成功,value就是返回的值
               3.如果回调函数返回是promise,return的promise结果就是这个promise 的结果
               */
      if (self.status === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          try {
            //模拟微任务
            setTimeout(() => {
              const result = onFulfilled(self.value)
              result instanceof Promise
                ? result.then(resolve, reject)
                : resolve(result)
            })
          } catch (error) {
            reject(error)
          }
        })
        self.onRejectedCallbacks.push(() => {
          try {
            //模拟微任务
            setTimeout(() => {
              const result = onRejected(self.reason)
              result instanceof Promise
                ? result.then(resolve, reject)
                : resolve(result)
            })
          } catch (error) {
            reject(error)
          }
        })
      } else if (self.status === FULFILLED) {
        try {
          //模拟微任务
          setTimeout(() => {
            const result = onRejected(self.value)
            result instanceof Promise
              ? result.then(resolve, reject)
              : resolve(result)
          })
        } catch (error) {
          reject(error)
        }
      } else if (self.status === REJECTED) {
        try {
          //模拟微任务
          setTimeout(() => {
            const result = onRejected(self.value)
            result instanceof Promise
              ? result.then(resolve, reject)
              : resolve(result)
          })
        } catch (error) {
          reject(error)
        }
      }
    })
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
  //将现有对象转化为promise对象
  static resolve(value) {
    if (value instanceof Promise) {
      return value
    } else {
      return new Promise((resolve, reject) => {
        resolve(value)
      })
    }
  }
  static reject(reason) {
    if (value instanceof Promise) {
      return value
    } else {
      return new Promise((resolve, reject) => {
        reject(reason)
      })
    }
  }
  static all(promiseArr) {
    return new Promise((resolve, reject) => {
      let values = []
      let count = 0
      promiseArr.forEach((promise, index) => {
        Promise.resolve(promise).then(
          (value) => {
            values[index] = value
            count++
            if (count === promiseArr.length) resolve(values)
          },
          (error) => {
            reject(error)
          }
        )
      })
    })
  }
  static race(promiseArr) {
    //有一个率先成功 就返回成功的promise实例
    return new Promise((resolve, reject) => {
      promiseArr.forEach((promise, index) => {
        Promise.resolve(promise).then(
          (value) => {
            resolve(value)
          },
          (error) => {
            reject(error)
          }
        )
      })
    })
  }
  //Promise.allSettled
  static allSettled(PromiseArr) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(PromiseArr)) {
        throw new Error('arguments must be an array')
      }
      const len = PromiseArr
      const res = []
      function handlePromise(i, item) {
        res[i] = item
        len--
        if (len === 0) {
          resolve(res)
        }
      }
      for (let i = 0; i < len; i++) {
        Promise.resolve(PromiseArr[i]).then(
          (value) => {
            handlePromise(i, { type: 'fulfilled', value })
          },
          (reason) => {
            handlePromise(i, { type: 'rejected', reason })
          }
        )
      }
    })
  }
  //finally
  finally(cb) {
    return this.then(
      (data) => {
        return Promise.resolve(cb()).then(() => data)
      },
      (err) => {
        return Promise.resolve(cb()).then(() => {throw err})
      }
    )
  }
  static any(promises) {
    // resolve必须等到有一个成功的结果
    // reject所有的都失败才执行reject
    const reasons = [];
    return new HYPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, (err) => {
          reasons.push(err);
          if (reasons.length === promises.length) {
            reject(new AggregateError(reasons));
          }
        });
      });
    });
  }
}




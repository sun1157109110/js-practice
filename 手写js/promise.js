//定义三种状态
const PENDING = 'PENDING'; //进行中
const FULFILLED = 'FULFILLED'; //成功
const REJECTED = 'REJECTED'; //失败状态

class Promise {
    //同步执行的回调函数
    constructor(executor) {
        this.value = undefined;
        this.reason = undefined;
        this.status = PENDING;
        this.onFulfilledCallBack = [];
        // 失败态回调函数队列
        this.onRejectedCallbacks = [];
        //内部定义成功时调用的函数
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onFulfilledCallBack.forEach((item) => {
                    item(value)
                })
            }
        }
        //内部定义失败时调用的函数
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallBack.forEach((item) => {
                    item(reason)
                })
            }
        }
        //同步执行自执行函数
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    };
    //函数绑定在原型上 指定用于得到成功value的成功回调和得到失败reason的失败回调 并返回一个promise
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => {
            throw new Error(reason instanceof Error ? reason.message : reason)
        };
        const self = this;
        return new Promise((resolve, reject) => {
            if (self.status === PENDING) {
                self.onFulfilledCallBack.push(() => {
                    try {
                        //模拟微任务
                        setTimeout(() => {
                            const result = onFulfilled(self.value);
                            result instanceof Promise ? result.then(resolve, reject) : resolve(result)
                        })
                    } catch (error) {
                        reject(error)
                    }
                });
                self.onRejectedCallBack.push(() => {
                    try {
                        //模拟微任务
                        setTimeout(() => {
                            const result = onRejected(self.reason);
                            result instanceof Promise ? result.then(resolve, reject) : resolve(result)
                        })
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if (self.status === onFulfilled) {
                try {
                    //模拟微任务
                    setTimeout(() => {
                        const result = onFulfilled(self.value);
                        result instanceof Promise ? result.then(resolve, reject) : resolve(result)
                    })
                } catch (error) {
                    reject(error)
                }
            } else {
                try {
                    //模拟微任务
                    setTimeout(() => {
                        const result = onRejected(self.reason);
                        result instanceof Promise ? result.then(resolve, reject) : resolve(result)
                    })
                } catch (error) {
                    reject(error)
                }
            }
        })
    };
    //then的语法糖
    catch (onRejected) {
        this.then(undefined, onRejected)
    };
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
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
    static all(promiseArr) {
        let len = promiseArr.length;
        //记录成功的promise数
        let count = 0;
        let valueArr = []
        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                //promise.all处理确保每个都是promise实例
                Promise.resolve(promiseArr[i]).then(
                    (value) => {
                        valueArr.push(value);
                        count++;
                        if (count === len) resolve(valueArr)
                    },
                    (reason) => {
                        reject(reason)
                    }
                )
            }
        })
    }
    static race(promiseArr) {
        return new Promise((resolve, reject) => {
            promiseArr.forEach((promise, index) => {
                Promise.resolve(promise).then((value) => {
                    resolve(value)
                }, (error) => {
                    reject(error)
                })
            })
        })
    }
}
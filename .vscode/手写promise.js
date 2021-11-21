//手写js 构造函数 then catch Promise.resolve Promise.reject Promise.all rice 方法
//定义三种状态
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class Promsie {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        //成功的回调函数
        this.onFullfilledCallbacks = [];
        //失败
        this.onRejectedCallbacks = [];
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onFullfilledCallbacks.forEach((item) => {
                    item(this.value)
                })
            };
        };
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach((item) => {
                    item(this.reason)
                })
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    };
    then(onFullfilled, onRejected) {
        onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => {
            throw reason
        };
        const self = this;
        return new Promise((resolve, reject) => {
            if (self.status === PENDING) {
                self.onFullfilledCallbacks.push(() => {
                    //模拟微任务
                    try {
                        setTimeout(() => {
                            let result = onFullfilled(self.value);
                            result instanceof Promise ? result.then(resolve, reject) : resolve(result)
                        }, );
                    } catch (error) {
                        reject(error)
                    }
                });
                self.onRejectedCallbacks.push(() => {
                    try {
                        //模拟微任务
                        setTimeout(() => {
                            const result = onRejected(self.reason)
                            result instanceof Promise ? result.then(resolve, reject) : resolve(result);
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
                        result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                    })
                } catch (error) {
                    reject(error);
                }
            } else if (self.status === REJECTED) {
                try {
                    //模拟微任务
                    setTimeout(() => {
                        const result = onRejected(self.value)
                        result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                    })
                } catch (error) {
                    reject(error);
                }
            }
        })
    };
    catch (onRejected) {
        return this.then(undefined, onRejected)
    };
    static resolve(value) {
        if (value instanceof Promise) {
            return value
        } else {
            return new Promise((resolve, reject) => {
                resolve(value)
            })
        }
    };
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    };
    static all(promiseArr) {
        let len = promiseArr.length
        const values = [];
        let count = 0;
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promiseArr.length; i++) {
                //确保每一个都是promise实例
                Promise.resolve(promiseArr[i]).then(
                    (value) => {
                        values[i] = value;
                        count++;
                        if (count === len) {
                            resolve(values)
                        }
                    },
                    (error) => {
                        reject(error)
                    }
                )
            }
        })
    };
    static race(promiseArr) {
        return new Promsie((resolve, reject) => {
            for (let i = 0; i < promiseArr.length; i++) {
                Promise.resolve(promiseArr[i]).then((value)=>{
                    resolve(value)
                },
                (error)=>{
                    reject(error)
                })
            }
        })
    }
}
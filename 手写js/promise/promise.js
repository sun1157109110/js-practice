//定义三种状态
const PENDING = 'PENDING'; //进行中
const FULFILLED = 'FULFILLED'; //成功
const REJECTED = 'REJECTED'; //失败状态

class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined;
        this.reason = undefined;
        this.onFulfillCallback = [];
        this.onRejectedCallback = [];
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onFulfillCallback.forEach((item) => {
                    item(value)
                })
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallback.forEach((item) => {
                    item(reason)
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
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => {
            throw new Error(reason instanceof Error ? reason.message : reason)
        }
        const self = this;
        return new Promise((resolve, reject) => {
            if (self.status === PENDING) {
                self.onFulfillCallback.push(() => {
                    try {
                        setTimeout(() => {
                            const res = onFulfilled(self.value)
                            typeof res instanceof Promise ? res.then(resolve, reject) : resolve(res)
                        });
                    } catch (e) {
                        reject(e)
                    }
                });
                self.onRejectedCallback.push(() => {
                    try {
                        setTimeout(() => {
                            const res = onRejected(self.reason)
                            typeof res instanceof Promise ? res.then(resolve, reject) : resolve(res)
                        });
                    } catch (e) {
                        reject(e)
                    }
                })
            };
            if (self.status === FULFILLED) {
                try {
                    setTimeout(() => {
                        const res = onFulfilled(self.value)
                        typeof res instanceof Promise ? res.then(resolve, reject) : resolve(res)
                    });
                } catch (e) {
                    reject(e)
                }
            }
            if (self.status === REJECTED) {
                try {
                    setTimeout(() => {
                        const res = onRejected(self.reason)
                        typeof res instanceof Promise ? res.then(resolve, reject) : resolve(res)
                    });
                } catch (e) {
                    reject(e)
                }
            }
        })
    }
    catch (onRejected) {
        return this.then(undefined, onRejected)
    }
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
        if (!Array.isArray(PromiseArr)) {
            throw new Error('arguments must be an array')
        }
        let res = [];
        let count = 0;
        return new Promise((resolve, reject) => {
            promiseArr.forEach((promise, i) => {
                Promise.resolve(promise).then((value) => {
                    count++;
                    res[i] = value
                    if (count === promiseArr.length) {
                        resolve(res)
                    }
                }, (e) => {
                    reject(e)
                })
            })
        })
    }
    static allSettled(promiseArr) {
        if (!Array.isArray(PromiseArr)) {
            throw new Error('arguments must be an array')
        }
        let res = []
        let count = promiseArr.length
        return new Promise((resolve, reject) => {
            promiseArr.forEach((promise, i) => {
                Promise.resolve(promise).then((value) => {
                    res[i] = {
                        status: 'fulfilled',
                        value
                    }
                    count--
                    if (count === 0) resolve(res)
                }, (reason) => {
                    res[i] = {
                        status: 'rejected',
                        reason
                    }
                    count--
                    if (count === 0) resolve(res)
                })
            })
        })
    }
    static race(promiseArr) {
        if (!Array.isArray(PromiseArr)) {
            throw new Error('arguments must be an array')
        }
        //有一个率先成功 就返回成功的promise实例
        return new Promise((resolve, reject) => {
            promiseArr.forEach((promise) => {
                Promise.resolve(promise).then((v) => {
                    resolve(v)
                }, (reason) => {
                    reject(reason)
                })
            })
        })
    }
    //finally
    finally(cb) {
        return this.then(
            (data) => {
                return Promise.resolve(cb()).then(() => data)
            },
            (err) => {
                return Promise.resolve(cb()).then(() => {
                    throw err
                })
            }
        )
    }
    static any(promises) {
        // resolve必须等到有一个成功的结果
        // reject所有的都失败才执行reject
        const reasons = [];
        return new Promise((resolve, reject) => {
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
    async try (fn) {
        try {
            await fn()
        } catch (e) {
            return Promise.reject(e)
        }
    }
    //https://www.kancloud.cn/xiaoyulive/frontend/582122
}
class EventPubSub {
    constructor() {
        this.events = {};
    };
    //订阅
    on(type, callback) {
        if (!this.events[type]) {
            this.events[type] = [callback]
        } else {
            this.events[type].push(callback)
        }
    };
    //解除订阅
    off(type, callback) {
        if (!this.events[type] || this.events[type].indexOf(callback) === -1) {
            return
            //若无第二个参数则删除该事件的订阅和发布
        } else if (!callback) {
            delete this.events[type]
        } else {
            this.events[type] = this.events[type].filter((event) => event !== callback);
            if (!this.events[type].length) delete this.events[type]
        }
    };
    //发布
    emit(type, ...args) {
        if (!this.events[type]) return;
        return this.events[type].forEach((event) => {
            event(...args)
        })
    };
    //执行一次
    once(type, callback) {
        //注意this
        let self = this
        function f() {
            callback();
            self.off(type, callback)
        };
        this.on(type, f)
    }

};

// 使用如下 
let event = new EventPubSub();
const handle = (...rest) => {
    console.log(rest);
};
event.on("click", handle);
event.emit("click", 1, 2, 3, 4);
event.off("click", handle);
event.emit("click", 1, 2);
event.once("dbClick", () => {
    console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick")
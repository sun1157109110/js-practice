
//实现有并行限制的promise调度器
class Scheduler {
  constructor() {
    this.queue = []
    this.maxCount = 2
    this.runCount = 0
  }
  //将promise加入到队列中
  add(promiseCreator) {
    this.queue.push(promiseCreator)
  }
  //每次从队列中取出promise并执行 递归调用
  request() {
    if (!this.queue || !this.queue.length || this.runCount >= this.maxCount)
      return
    this.runCount++
    this.queue
      .shift()()
      .then(() => {
        this.runCount--
        this.request()
      })
  }
  //启动函数
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request()
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

const scheduler = new Scheduler()

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
scheduler.taskStart()
// output: 2 3 1 4
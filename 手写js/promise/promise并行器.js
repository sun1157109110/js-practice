
// //实现有并行限制的promise调度器
// class Scheduler {
//   constructor() {
//     this.queue = []
//     this.maxCount = 2
//     this.runCount = 0
//   }
//   //将promise加入到队列中
//   add(promiseCreator) {
//     this.queue.push(promiseCreator)
//   }
//   //每次从队列中取出promise并执行 递归调用
//   request() {
//     if (!this.queue || !this.queue.length || this.runCount >= this.maxCount)
//       return
//     this.runCount++
//     this.queue
//       .shift()()
//       .then(() => {
//         this.runCount--
//         this.request()
//       })
//   }
//   //启动函数
//   taskStart() {
//     for (let i = 0; i < this.maxCount; i++) {
//       this.request()
//     }
//   }
// }

// const timeout = (time) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, time)
//   })

// const scheduler = new Scheduler()

// const addTask = (time, order) => {
//   scheduler.add(() => timeout(time).then(() => console.log(order)))
// }

// addTask(1000, '1')
// addTask(500, '2')
// addTask(300, '3')
// addTask(400, '4')
// scheduler.taskStart()
// // output: 2 3 1 4


// 创建 TaskScheduler 实例
const scheduler = new TaskScheduler({ maxConcurrent: 3 });

// 定义一些模拟任务
const createTask = (id, duration, shouldFail = false) => ({
  id,
  execute: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error(`Task ${id} failed`));
        } else {
          resolve(`Task ${id} completed`);
        }
      }, duration);
    }),
  priority: Math.floor(Math.random() * 10), // 随机优先级 0-9
  retry: { times: 2, interval: 1000 }
});

// 添加事件监听器
scheduler.on('taskAdded', (task) => console.log(`Task added: ${task.id}`));
scheduler.on('taskStart', (task) => console.log(`Task started: ${task.id}`));
scheduler.on('taskComplete', (task, result) =>
  console.log(`Task completed: ${task.id}, Result: ${result}`)
);
scheduler.on('taskFail', (task, error) =>
  console.log(`Task failed: ${task.id}, Error: ${error.message}`)
);
scheduler.on('taskCancel', (task) => console.log(`Task cancelled: ${task.id}`));

// 添加任务
scheduler.addTask(createTask('A', 2000));
scheduler.addTask(createTask('B', 1000));
scheduler.addTask(createTask('C', 3000));
scheduler.addTask(createTask('D', 1500, true)); // 这个任务会失败
scheduler.addTask(createTask('E', 2500));

// 开始执行任务
scheduler.start();

// 取消一个任务
setTimeout(() => scheduler.cancelTask('E'), 1000);

// 暂停调度器
setTimeout(() => {
  console.log('Pausing scheduler');
  scheduler.pause();
}, 5000);

// 恢复调度器
setTimeout(() => {
  console.log('Resuming scheduler');
  scheduler.resume();
}, 7000);

// 在所有任务完成后打印统计信息
setTimeout(() => {
  const stats = scheduler.getStats();
  console.log('Final stats:', stats);
}, 15000);



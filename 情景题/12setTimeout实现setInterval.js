 /* myInterval */
 let myInterval = () => {
   function mySetInterval(fn, time) {
     let timer = null

     function interval() {
       fn();
       timer = setTimeout(interval, time);
     }
     interval()
     return {
       cancel: () => {
         clearTimeout(time)
       }
     }
   }
   let count = 0
   let a = mySetInterval(() => {
     console.log(count++);
   }, 1000)
   if (count === 10) a.cancel()
 }

 /*准时setInterval*/
 let interval = () => {
   const interval = 1000
   const startTime = new Date().getTime()
   // 模拟服务器返回的剩余时间
   let time = 60000
   let count = 0
   let timeCounter
   if (time >= 0) {
     timeCounter = setTimeout(countDown, interval)
   }

   function countDown() {
     count++
     const gap = new Date().getTime() - (startTime + count * interval)
     let nextTime = interval - gap
     if (nextTime < 0) {
       nextTime = 0
     }
     time -= interval
     console.log(`误差：${gap} ms，下一次执行：${nextTime} ms 后，离活动开始还有：${time} ms`)
     if (time <= 0) {
       clearTimeout(timeCounter)
     } else {
       timeCounter = setTimeout(countDown, nextTime)
     }
   }
 }
 /* 0延时定时器 */
 (function () {
   const timeouts = [];
   const messageName = "zero-timeout-message";

   // 只有一个回调函数参数
   function setZeroTimeout(fn) {
     timeouts.push(fn);
     window.postMessage(messageName, "*");
   }

   function handleMessage(event) {
     if (event.source === window && event.data === messageName) {
       event.stopPropagation();
       if (timeouts.length > 0) {
         const fn = timeouts.shift();
         fn();
       }
     }
   }
   window.addEventListener("message", handleMessage, true);
   window.setZeroTimeout = setZeroTimeout;

   //测试
   let startTime = new Date().getTime()
   let count = 0
   setTimeout(doFunc)

   function doFunc() {
     count++
     console.log(new Date().getTime() - startTime + 'ms')
     startTime = new Date().getTime()
     if (count < 10) {
       setTimeout(doFunc)
     }
   }


 })();
//防抖
//事件触发后一定时间内回调函数调用 如果在这段时间内事件再次出发 那么重新计时
function debounce(fn,time){
    let timer = null;
    return function(){
        if(timer){
            clearTimeout(timer)
        };
        timer = setTimeout(()=>{
            fn.apply(this,arguments)
        },time)
    }
}

// //节流 将一段时间内的多次触发变为一次触发
// function throttle(fn,time){
//     let begin = 0;
//     return function(){
//         let nowTime = Date.now()
//         if(nowTime-begin>time){
//             begin = nowTime
//             fn.apply(this,arguments)
//         }
//     }
// }

// function throttle(fn,time){
//     let flag = true;
//     return function(){
//         if(!flag)return;
//         flag = false;
//         setTimeout(()=>{
//             fn.apply(this.arguments);
//             flag = true
//         },time)
//     }
// };

// function throttle(func, time) {
//     let timeout;
//     return function () {
//         if (!timeout) {
//             func.apply(this, arguments);
//             timeout = setTimeout(() => {
//                 timeout = null;
//             }, time);
//         }
//     };
// }
// console.log('111');

//防抖
function debounce(fn, time) {
    let timer = null;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this,arguments)
            }, time);
        }else{
            clearTimeout(timer)
        }
    }
}
//节流
function throttle(fn,time) {
    let time = 0;
    return function () {
        let now = Date.now()
        if(now-time>time){
            time = now
            fn.apply(this,arguments)
        }
    }
}
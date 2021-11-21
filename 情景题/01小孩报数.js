//有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈， 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?
function lastChild(num, count) {
    let childList = [];
    for (let i = 0; i < num; i++) {
        childList[i] = i + 1
    };
    let counter = 0; //当前报数
    let outChild = 0; //出圈的小孩数量
    let cur = 0; //当前索引;
    while (outChild < num - 1) {
        if(childList[cur]!==0){
            counter++;
        };
        if(counter===count){
            childList[cur]===0;
            counter=0;
            outChild++;
        };
        cur++;
        if(cur===num-1)cur=0;
    };
    for(let i =0;i<num;i++){
        if(childList[i]!==0)return childList[i]
    }

};
// console.log(lastChild(30,3));
var startTime = new Date().getTime();
var count = 0;
//耗时任务
setInterval(function(){
    var i = 0;
    while(i++ < 100000000);
}, 0);


setInterval(function(){
    count++;
    console.log(count + ' --- ' + (Date.now() - (startTime+count*1000)));
}, 1000);

const a;
console.log(a);
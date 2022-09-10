//有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈， 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?
function childNum(num, count){
    let allplayer = [];    
    for(let i = 0; i < num; i++){
        allplayer[i] = i + 1;
    }
    
    let exitCount = 0;    // 离开人数
    let counter = 0;      // 记录报数
    let curIndex = 0;     // 当前下标
    
    while(exitCount < num - 1){
        if(allplayer[curIndex] !== 0) counter++;    
        
        if(counter == count){
            allplayer[curIndex] = 0;                 
            counter = 0;
            exitCount++;  
        }
        curIndex++;
        if(curIndex == num){
            curIndex = 0               
        };           
    }    
    for(i = 0; i < num; i++){
        if(allplayer[i] !== 0){
            return allplayer[i]
        }      
    }
}
//正向模拟
var lastRemaining = function(n, m) {
    let arr = [];
    let count = 0;
    let index = 0
    while(n--){
        arr.unshift(n)
    }
    while(arr.length>1){
        index= (index+m-1)%arr.length
        arr.splice(index,1);
    }
    return arr.shift()
};
//约瑟夫环反向模拟
var fn = function (n, m) {
    let pos = 0;
    for (let i = 2; i <= n; i++) {
        pos = (pos + m) % i;
    }
    return pos;
};
console.log(lastRemaining(30,3));
console.log(fn(30,3));
console.log(childNum(30,3));

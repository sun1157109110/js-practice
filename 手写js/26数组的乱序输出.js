const getRandomArr = (array,count)=>{ 
    let point = array.length-count;
    let res = []
    for(let i =array.length-1;i>=point;i--){
        //随机算法
        let index = Math.floor(i*Math.random());
        //其实也不会相等
        if(index!==i){
            [array[index],array[i]] =[array[i],array[index]];
        }
        res.push(array[i])
    };
    return res
};
console.log(getRandomArr([5,8,9,40,26,54,22],7));
Array.prototype.filter = function(callBack,thisArg){
    if(this == undefined)throw new Error('this is null or undefined');
    if(typeof callBack !== 'function')throw new Error('this is not function');
    const arr = this;
    const res = [];
    for(let i in arr){
        if(Object.prototype.hasOwnProperty.call(arr,i)){
            if(callBack.call(thisArg,arr[i],i,arr)){
                res.push(arr[i])
            }
        }
    }

}
console.log(typeof '1' === 'string');
function deepClone(target){
    if(!target||typeof target !=='object')return;
    let newObject = Array.isArray(target)?[]:{};
    for(let i in target){
        if(Object.prototype.hasOwnProperty.call(target,i)){
            newObject[i] = typeof target[i] === 'object'?deepClone(target[i]):target[i]
        }
    };
    return newObject
}
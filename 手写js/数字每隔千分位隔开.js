//12233.589;
function format(num) {
    let numStr = num.toString();
    let intStr = '';
    let numStrList = [];
    if (numStr.indexOf('.') !== -1) {
        numStrList = numStr.split('.');
        intStr = numStrList[0]
        console.log(numStrList);
    };
   
    let len = intStr.length;
    let temp = '';
    while (len % 3&&len>3) {
        temp += ',' + intStr.slice(len-3, len) ;
        intStr = intStr.substring(0,len-2)
        len-=3;
    };
    
    if(intStr){
       temp = intStr+temp
    };
    return numStrList[1]?temp+'.'+numStrList[1]:temp
    
};
console.log(format(12.255));
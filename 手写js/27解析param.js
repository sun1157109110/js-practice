//'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
function parseParam(url){
    let obj = {}
    let paramStr = url.split('?')[1];
    // console.log(paramStr);
    let arr = paramStr.split('&');
    console.log(arr);
    for(let i =0;i<arr.length;i++){
        arr[i] = arr[i].split('=');
        let [key,val] = arr[i];//解构赋值
        val = decodeURIComponent(val)//解码
        if(key in obj&&arr.length>1){
            obj[key] = [].concat(obj[key],val)
            // if(Array.isArray(obj[key])){
            //     obj[key].push(val)
            // }else{
            //     obj[key] = [obj[key],val]
            // }
        }else{
            obj[key] = val?val:true
        }
    }
    // console.log(arr);
    return obj
};
console.log(parseParam('http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'));

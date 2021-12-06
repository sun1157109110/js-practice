function ajax(method,url){
    return new Promise((resolve,reject)=>{
        //创建xml对象,ie5/ie6没有xml方法
        let xhr = XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
        //开启请求
        //第三个参数异步,同步的话代码会卡在xhr.send()这一步，等到所有的数据都传输完成，才会往下执行
        xhr.open(method,url,true);
        xhr.onReadyStateChange = ()=>{
            if(xhr.readyState!==4)return;
            if(xhr.status>=200||xhr.status<300||xhr.status===304){
                resolve(xhr.responseText)
            }else{
                reject(new Error(xhr.statusText))
            }
        };
        xhr.setRequestHeader('Accept','application/json');
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')//post需要设置;
        xhr.send();
    })
}
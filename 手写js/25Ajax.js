function ajax(method,url){
    return new Promise((resolve,reject)=>{
        //创建xml对象,ie5/ie6没有xml方法
        let xml = XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
        //设置事件处理程序;等待数据响应
        //必须在open()前指定 保证跨域浏览器兼容性
        xml.onreadystatechange = ()=>{
            if(xml.readyState!==4)return;
            if(xml.statues>=200&&xml.statues<300||xml.statues===304){
                resolve(xml.responseText)
            }else{
                reject(xml.statues)
            }
        };
        //调用open
        xml.open(method,url,true);

    })
}
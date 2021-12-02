function jsonp({url,params,callBack}){
    const getUrl = ()=>{
        let dataUrl = '';
        for(let key in params){
            if(Object.prototype.hasOwnProperty.call(params,key)){
                dataUrl +=`${key}=${params[key]}&`;
            }
        };
        dataUrl +=`callback=${callBack}`;
        return `${url}?${dataUrl}`
    };
    return new Promise((resolve,reject)=>{
        let scriptEle = document.createElement('script');
        scriptEle.src = getUrl();
        document.body.appendChild(scriptEle);
        window[callBack] = (data)=>{
            resolve(data);
            document.removeChild(scriptEle)
        };
        
    })
};
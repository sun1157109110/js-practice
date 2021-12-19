class Route{
    constructor(){
        this.routes = {};
        this.currentHash = '';
        this.fresh = this.fresh.bind(this);
        window.addEventListener('load',this.fresh,false);
        window.addEventListener('hashchange',this.fresh,false)
    }
    setRoute(url,callBack){
        this.routes[url] = callBack || function(){};
    };
    //更新
    fresh(){
        //获取url 把'#'去掉
        this.currentHash = window.location.hash.slice(1)||'/';
        if(this.currentHash in this.routes)this.routes[this.currentHash]();
    }
}
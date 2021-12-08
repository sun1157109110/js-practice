class Element{
    constructor(tag,props,children){
        this.tag = tag;//节点名
        this.props = props;//属性
        this.value = value;//节点值
        this.type = type;//节点类型
        this.children = []
    }
    appendChild(VNode){
        this.children.push(VNode)
    }
    
};
function render(VNode){
    let nodeType = VNode.type;
    let rDom = null;
    //若是元素节点
    if(nodeType===1){
        rDom = document.createElement(VNode.tag);
        for(let prop in VNode.props){
            if(Object.prototype.hasOwnProperty.call(VNode,prop)){
                rDom.setAttribute(prop,VNode[prop])
            }
        };
        //对子节点递归
        for(let i = 0;i<VNode.length;i++){
            rDom.appendChild(render(VNode.children[i]))
        }
        //如果是文本节点
    }else if(nodeType === 3){
        rDom = document.createTextNode(VNode.value)
    };
    return rDom
}
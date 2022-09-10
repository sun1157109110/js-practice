// 转换前：
let source = [{
  id: 1,
  pid: 0,
  name: 'body'
}, {
  id: 2,
  pid: 1,
  name: 'title'
}, {
  id: 3,
  pid: 2,
  name: 'div'
}]
// 转换为: 
let tree = [{
  id: 1,
  pid: 0,
  name: 'body',
  children: [{
    id: 2,
    pid: 1,
    name: 'title',
    children: [{
      id: 3,
      pid: 1,
      name: 'div'
    }]
  }]
}]
function jsonToTree(data) {
  let res = []
  let map = {};
  data.forEach(e => {
    map[e.id] = e
  });
  data.forEach(e => {
    let parent = map[e.pid];
    if(parent){
      (parent.children||(parent.children=[])).push(e)
    }else{
      res.push(e)
    }
  });
  return res
}
console.log(jsonToTree(source));












//去重版本
function fn(data) {
  let res = []
  let map = {};
  data.forEach(e => {
    map[e.id] = e
  });
  data.forEach(e => {
    let parent = map[e.pid];
    if(parent){
//       (parent.child||(parent.child=[])).push(e)
        if(parent.child&&!parent.child.find(i=>i.id===e.id)){
            parent.child.push(e)
        }else if(!parent.child){
            parent.child = [e]
        }
    }else{
      res.push(e)
    }
  });
  return res
}
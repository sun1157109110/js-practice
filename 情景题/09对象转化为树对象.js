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
function listToTree(data) {
  let res = []
  let map = {};
  data.forEach(e => {
    map[e.id] = e
  });
  data.forEach(e => {
    let parent = map[e.parentId];
    if(parent){
      (parent.children||(parent.children=[])).push(e)
    }else{
      res.push(e)
    }
  });
  return res
}
console.log(listToTree(source));

const arrayToTree = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  const tree = [];
  const map = {};
  // 本次遍历的目的是为了防止在arr数据混乱的情况下，下面的【map[pid]】找不到对应的值
  arr.forEach((item, index) => {
    map[item.id] = index; // 以id为key，下标为value，方便后面根据pid，找到原来数组的下标，然后添加children
  });
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    item.children = [];
    const pid = item.pid || 0;
    if (pid !== 0) {
      const parent = arr[map[pid]]["children"];
      // 可能原来的数据存在一定混乱，这样可以更加严谨一点，不报push属性找不到的错
      if (Array.isArray(parent)) {
        parent.push(item);
      } else {
        parent = [item];
      }
    } else {
      tree.push(item);
    }
  }
  return tree;
};

// test
const arr = [
  { id: 1, pid: null, name: "1" },
  { id: 2, pid: null, name: "2" },
  { id: 3, pid: 1, name: "3" },
  { id: 4, pid: 1, name: "4" },
  { id: 5, pid: 2, name: "5" },
  { id: 6, pid: 2, name: "6" },
  { id: 7, pid: null, name: "7" },
];

console.log(arrayToTree(arr));












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
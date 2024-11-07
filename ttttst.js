function get(obj, path) {
  // console.log(typeof path);
  if (!obj) return undefined
   // 对路径名进行处理，用正则
  if (typeof path === 'string') {
      path =  path.split('.')
  }
  console.log(path,'@');

  if ((/^[a-zA-Z]+\[\d+\]$/).test(path[0])) {
      s = path[0].match(/^([a-zA-Z]+)\[(\d+)\]$/)[1]
      d = path[0].match(/^([a-zA-Z]+)\[(\d+)\]$/)[2]
      path.splice(0,1,s,d)
      
 }
  if (path.length === 1) {
      return obj.hasOwnProperty(path[0])? obj[path[0]] : undefined
  }
  if (path.length > 1) {
      return get(obj[path[0]],path.slice(1))
  }
}

var object = { 'a': { 'b': [{ 'c': 3 }] } };
console.log(get(object, 'a.b[0].c'),'@@');

const obj = {
a: {
  b: {
    c: 42
  }
}
};
// console.log(get(obj, 'a.b.c')); // 输出: 42
// console.log(get(obj, ['a', 'b', 'c'])); // 输出: 42
// console.log(get(obj, 'a.b.d')); // 输出: undefined
// console.log(get(obj, 'x.y.z')); // 输出: undefined
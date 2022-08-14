let arr = '<div>{{$0}}({{$1}})</div>,好未来,TAL'.split(',')
let s = arr.shift();
for(let i =0;i<arr.length;i++){
    s = s.replace(/\{\{\$(\w+)\}\}/g,function(match,key) {
      console.log(match);
      console.log(key);
      return arr[key]
    });
}
console.log(s);
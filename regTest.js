// let hd = `张三:010-99999999,李四:020-88888888`;
// // console.log(hd.match(/\d{3}.\d{7,8}/g))
// let reg =new RegExp('\\d{3}.\\d{7,8}','g')
// console.log(reg.exec(hd),reg.lastIndex);//可连续使用 有flag时与match不一样
// console.log(reg.exec(hd),reg.lastIndex);
// console.log(hd.match(/[^:\d\-,]/g));//用户名
// const url = `
//   https://www.houdunren.com
//   hdcms.com
// `;
// console.log(url.match(/.+/g));
// let hd = `
//   <span>
//     houdunren
//     hdcms
//   </span>
// `;
// let res = hd.match(/<span>.*<\/span>/s);
// console.log(res[0]);
// let str = "houdunren.com";
// console.log(str.search(/\.com/i));
// let str = "houdunren";
// let reg = /[\w]/ig;
//直接使用matchAll返回一个迭代对象
// let res = str.matchAll(reg);
// console.log(res.next());
// for(let i of res){
//   console.log(i);
// }
// let str = "2023/02-12";
// console.log(str.split(/[\-/]/));

// let htmlStr = '<body><a></a></body>'
// let htmlStr2 = '<></>'
// console.log('<h1></h1>'.match(/^<\/?\w+>/g));

// function isHtml(s) {
//   const arr = s.match(/<\/?\w+>/g)
//   // console.log(arr);
//   if (!s || !arr || arr.length % 2 !== 0) return false;
//   let ss = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i][1] !== '/') {
//       ss.push(arr[i])
//     } else {
//       if (ss.pop() !== arr[i].replace('/', '')) {
//         return false
//       }
//     }
//   }
//   return true
// }
// console.log(isHtml(htmlStr));
// console.log(isHtml(htmlStr2));
// console.log(isHtml(''));
// console.log(isHtml('<h1></h1>'));
// let hd = `张三:010-99999999,李四:020-88888888`;
// //“-”在[]中是区间匹配的意思，所以要转义
// let res = hd.match(/[^:\d\-,]+/g);
// console.log(res);
// const rgba = 'rgba(255,20,10,0.54)'

// console.log(rgba.replace(/\s+/g, '').match(/[.\d]+/g));

// const s = '50a6we8y20x';
// const arr = s.split(/[\D]+/g).filter(i => i)
// const sarr = s.split(/\d+/).filter(i => i)
// console.log(arr);
// console.log(sarr);
// console.log(s.match(/\D+/g));
// setInterval(() => {
//   console.log(1);
// }, 1000);
let arr = '<div>{{$0}}({{$1}})</div>,好未来,TAL'.split(',')
let s = arr.shift();
for(let i =0;i<arr.length;i++){
    s = s.replace(/\{\{\$(\w+)\}\}/g,function(match,key) {
      // console.log(match);
      console.log(key);
      return arr[key]
    });
}
console.log(s);

// console.log((s.match(/\{\{\$(\w+)\}\}/g)));

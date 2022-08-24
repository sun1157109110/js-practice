let htmlStr = '<body><a></a></body>'
let htmlStr2 = '<></>'
// console.log('<h1></h1>'.match(/^<\/?\w+>/g));
function isHtml(s) {
  const arr = s.match(/<\/?\w+>/g)
  // console.log(arr);
  if (!s || !arr || arr.length % 2 !== 0) return false;
  let ss = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] !== '/') {
      ss.push(arr[i])
    } else {
      if (ss.pop() !== arr[i].replace('/', '')) {
        return false
      }
    }
  }
  return true
}
// console.log(isHtml(htmlStr));
// console.log(isHtml(htmlStr2));
// console.log(isHtml(''));
// console.log(isHtml('<h1></h1>'));
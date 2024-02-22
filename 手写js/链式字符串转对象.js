//input ["a","b","c","d","e","f","g"]

//output {"a":{"b":{"c":{"d":{"e":{"f":"g"}}}}}}
function handler(arr) {
  const len = arr.length;
  let prev = {
    [arr[len - 2]]: arr[len - 1],
  };
  for (let i = len - 3; i >= 0; i--) {
    prev = {
      [arr[i]]: prev,
    };
  }
  return prev;
}

console.log(handler(["a", "b", "c", "d", "e", "f", "g"]));

function fn(arr) {
  const len = arr.length;
  let o = {};
  let res = o
  for (let i = 0; i < arr.length-1; i++) {
    if(i+1===len-1){
      o[arr[i]] = arr[len-1]
    }else{
      o[arr[i]] = {}
    }
    o = o[arr[i]]
  }
  return res
}
console.log(fn(["a", "b", "c", "d", "e", "f", "g"]));


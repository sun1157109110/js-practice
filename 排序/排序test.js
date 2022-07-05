//冒泡排序
const arr = [5, 3, 7, 1, 3, 90, 6];

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let isBubble = true //优化
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        isBubble = false
      }
    }
    if (isBubble) break
  }
  return arr
}
// console.log(bubbleSort([1,2,3,4,5]));

//插入排序
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let target = i
    for (let j = i - 1; i >= 0; j--) {
      if (arr[target] < arr[j]) {
        [arr[target], arr[j]] = [arr[j], arr[target]]
        target = j
      } else {
        break
      }
    }
  }
  return arr
}
// console.log(insertSort(arr));

//选择排序
function selectSort(num) {
  for (let i = 0; i < num.length; i++) {
    let min = i
    for (let j = i; j < num.length; j++) {
      if(num[min]>num[j]){
        min = j
      }
    }
    if(min!==i)[num[min],num[i]] = [num[i],num[min]]
  }
  return num
}
// console.log(selectSort([1,3,2,7,5]));
//归并排序
function mergeSort(num) {
  if(num.length<2)return num;
  let mid = Math.floor(num.length/2);
  let l = mergeSort(num.slice(0,mid));
  let r = mergeSort(num.slice(mid));
  num = merge(l,r);
  return num
}
function merge(l,r) {
  let res = []
  while(l.length&&r.length){
    if(l[0]>r[0]){
      res.push(r.shift())
    }else{
      res.push(l.shift())
    }
  }
  res = l.length>0?[...res,...l]:[...res,...r]
  return res
}
console.log(mergeSort(arr));
//快排

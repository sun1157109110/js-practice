//冒泡排序
const arr = [5, 3, 7, 1, 3, 90, 6];

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let isBubble = true //优化
    for (let j = 0; j < arr.length - 1-i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        isBubble = false
      }
    }
    if(isBubble)break
  }
  return arr
}
// console.log(bubbleSort([1,2,3,4,5]));

//插入排序
function insertSort(arr) {
  for(let i = 1;i<arr.length;i++){
    let target = i
    for(let j = i-1;i>=0;j--){
      if(arr[target]<arr[j]){
        [arr[target],arr[j]] = [arr[j],arr[target]]
        target = j
      }else{
        break
      }
    }
  }
  return arr
}
console.log(insertSort(arr));
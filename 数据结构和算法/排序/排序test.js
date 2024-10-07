//冒泡排序
//时间O(n2) 空间O(1) 稳定
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
//直接插入 O(n2) 空间O(1) 稳定
//希尔     O(n1.3) 空间O(1) 不稳定
function insertionSort(nums) {
  // 外循环：已排序元素数量为 1, 2, ..., n
  for (let i = 1; i < nums.length; i++) {
      let base = nums[i],
          j = i - 1;
      // 内循环：将 base 插入到已排序部分的正确位置
      while (j >= 0 && nums[j] > base) {
          nums[j + 1] = nums[j]; // 将 nums[j] 向右移动一位
          j--;
      }
      nums[j + 1] = base; // 将 base 赋值到正确位置
  }
}
// console.log(insertSort(arr));

//选择排序
//直接选择 O(n2) 空间O(1) 不稳定
//堆排序 O(nlogn) 最坏 O(nlogn) 空间O(1) 不稳定
function selectSort(num) {
  for (let i = 0; i < num.length; i++) {
    let min = i
    for (let j = i; j < num.length; j++) {
      if (num[min] > num[j]) {
        min = j
      }
    }
    if (min !== i)[num[min], num[i]] = [num[i], num[min]]
  }
  return num
}
// console.log(selectSort([1,3,2,7,5]));
//归并排序
//O(nlogn) 空间O(1) 稳定
function mergeSort(num) {
  if (num.length < 2) return num;
  let mid = Math.floor(num.length / 2);
  let l = mergeSort(num.slice(0, mid));
  let r = mergeSort(num.slice(mid));
  num = merge(l, r);
  return num
}

function merge(l, r) {
  let res = []
  while (l.length && r.length) {
    if (l[0] > r[0]) {
      res.push(r.shift())
    } else {
      res.push(l.shift())
    }
  }
  res = l.length > 0 ? [...res, ...l] : [...res, ...r]
  return res
}
// console.log(mergeSort(arr));
//快排
//O(nlogn) 最坏O(n2) 空间O(nlogn) 不稳定
function quickSort(num, start, end) {
  if (end - start < 1) return;
  let l = start,
    r = end,
    target = num[start];
  while (l < r) {
    while (l < r && num[r] >= target) r--;
    if (l < r) {
      [num[l], num[r]] = [num[r], num[l]];
      l++;
    }
    while (l < r && num[l] <= target) l++;
    if (l < r) {
      [num[l], num[r]] = [num[r], num[l]];
      r--;
    }
  }
  quickSort(num, start, l-1);
  quickSort(num, l+1, end)
  return num
}
function quickSort2(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort2(left), ...middle, ...quickSort2(right)];
}


// console.log(quickSort(arr,0,arr.length-1));
console.log(quickSort2(arr));

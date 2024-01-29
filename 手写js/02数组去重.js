 // const arr = [1.2, 4, 2, 4, 1, 6, 9, 6];
 // //使用set
 // const newArr = new Set(arr);
 // //使用splice删除
 //  console.log("@");
 //  (function () {
 //    const delSame = (nums) => {
 //      nums.sort((a, b) => a - b);
 //      let len = nums.length;
 //      for (let i = 0; i < nums.length; i++) {
 //        if (i > 0 && nums[i] === nums[i - 1]) {
 //          nums.splice(i, 1);
 //          i -= 1;
 //        }
 //      }
 //      return nums;
 //    };
 //    console.log(delSame([1, 1, 3, 4, 7, 3, 7, 9, 1]));
 //  })();
 // const way1 = (array) => {
 //   for (let i = 0; i < array.length; i++) {
 //     for (let j = i + 1; j < array.length; j++) {
 //       if (array[i] === array[j]) {
 //         array.splice(j, 1);
 //         j--;
 //         array.length--;
 //       }
 //     }
 //   }
 //   return array;
 // };
 // //indexOf
 // const way2 = (array) => {
 //   const res = [];
 //   for (let i = 0; i < array.length; i++) {
 //     if (res.indexOf(array[i]) === -1) {
 //       res.push(array[i]);
 //     }
 //   }
 //   return res;
 // };
 //sort去重
 function unique(arr) {
   if (!Array.isArray(arr)) {
     console.log("type error!");
     return;
   }
   arr = arr.sort();
   var arrry = [arr[0]];
   for (var i = 1; i < arr.length; i++) {
     if (arr[i] !== arr[i - 1]) {
       arrry.push(arr[i]);
     }
   }
   return arrry;
 }
 var arr = [
   1,
   1,
   "true",
   "true",
   true,
   true,
   15,
   15,
   false,
   false,
   undefined,
   undefined,
   null,
   null,
   NaN,
   NaN,
   "NaN",
   0,
   0,
   "a",
   "a",
   {},
   {},
 ];
 console.log(unique(arr));
 // [0, 1, 15, "NaN", NaN, NaN, {}, {}, "a", false, null, true, "true", undefined]

 //
 function unique(arr) {
   if (!Array.isArray(arr)) {
     console.log('type error!')
     return
   }
   var array = [];
   for (var i = 0; i < arr.length; i++) {
     if (!array.includes(arr[i])) { //includes 检测数组是否有某个值
       array.push(arr[i]);
     }
   }
   return array
 }
 var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
 console.log(unique(arr))
 //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}] 

 //includes
 //  function unique(arr) {
 //    if (!Array.isArray(arr)) {
 //      console.log('type error!')
 //      return
 //    }
 //    var array = [];
 //    for (var i = 0; i < arr.length; i++) {
 //      if (!array.includes(arr[i])) { //includes 检测数组是否有某个值
 //        array.push(arr[i]);
 //      }
 //    }
 //    return array
 //  }
 //  var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
 //  console.log(unique(arr))
 //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]   

 //filter去重
 //  function unique(arr) {
 //    return arr.filter(function (item, index, arr) {
 //      //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
 //      return arr.indexOf(item, 0) === index;
 //    });
 //  }
 //  var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
 //  console.log(unique(arr))
 //[1, "true", true, 15, false, undefined, null, "NaN", 0, "a", {}, {}]

 //递归去重
 function unique(arr) {
   var array = arr;
   var len = array.length;

   array.sort(function (a, b) { //排序后更加方便去重
     return a - b;
   })

   function loop(index) {
     if (index >= 1) {
       if (array[index] === array[index - 1]) {
         array.splice(index, 1);
       }
       loop(index - 1); //递归loop，然后数组去重
     }
   }
   loop(len - 1);
   return array;
 }
 var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
 console.log(unique(arr))
 //[1, "a", "true", true, 15, false, 1, {}, null, NaN, NaN, "NaN", 0, "a", {}, undefined]
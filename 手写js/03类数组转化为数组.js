// 通过 call 调用数组的 slice 方法来实现转换

// javascript复制代码Array.prototype.slice.call(arrayLike);


// 通过 call 调用数组的 splice 方法来实现转换

// javascript复制代码Array.prototype.splice.call(arrayLike, 0);


// 通过 apply 调用数组的 concat 方法来实现转换

// javascript复制代码Array.prototype.concat.apply([], arrayLike);


// 通过 Array.from 方法来实现转换

// javascript复制代码Array.from(arrayLike);

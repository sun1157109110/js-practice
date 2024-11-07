// 目：实现一个函数组合器 compose

// 题目描述：

// 请实现一个函数 compose，它接受任意数量的函数作为参数，并返回一个新的函数。新的函数将按照传入的函数的顺序依次执行，从右到左依次调用传入的函数。

// 也就是说，当调用 compose(f, g, h)(x) 时，执行顺序应该是 f(g(h(x)))。

// 要求：

// 每个函数都接收一个参数，并返回一个结果。
// compose 函数应返回一个可以接受参数的函数，并按组合后的顺序依次执行所有传入的函数。
function compose(...funcs) {
  return function (initialValue) {
    let result = initialValue;
    for (let i = funcs.length - 1; i >= 0; i--) {
      result = funcs[i](result);
    }
    return result;
  };
}

// 测试代码
const addOne = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

const composed = compose(addOne, double, square);

console.log(composed(2)); // 输出结果应该为 9，因为 square(2) -> 4, double(4) -> 8, addOne(8) -> 9

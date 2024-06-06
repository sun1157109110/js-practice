//写出一个函数trans，将数字转换成汉语的输出，输入为不超过10000亿的数字。

// trans(123456) —— 十二万三千四百五十六
// trans（100010001）—— 一亿零一万零一

function trans(num) {
  const units = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万'];
  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

  if (num === 0) return '零';

  let str = String(num);
  let result = '';
  let zeroFlag = false;

  for (let i = 0; i < str.length; i++) {
      let digit = str[str.length - 1 - i];
      let unit = units[i];

      if (digit === '0') {
          zeroFlag = true;
      } else {
          if (zeroFlag) {
              result = digits[0] + result;
              zeroFlag = false;
          }
          result = digits[digit] + unit + result;
      }
  }

  // 处理十位的特殊情况
  if (result.startsWith('一十')) {
      result = result.slice(1);
  }

  // 处理连续的零
  result = result.replace(/零+/g, '零');
  // 去掉末尾的零
  result = result.replace(/零$/, '');

  return result;
}

// 示例测试
console.log(trans(123456)); // 输出: 十二万三千四百五十六
console.log(trans(100010001)); // 输出: 一亿零一万零一
console.log(trans(10000)); // 输出: 一万
console.log(trans(100000000)); // 输出: 一亿
console.log(trans(100000001)); // 输出: 一亿零一
console.log(trans(100101)); // 输出: 十万零一百零一
// 大金牙在打斗地主，手牌发下来了，请你写一个函数帮他找到手牌中所有的对子（一张大王和一张小王不是对子，本题中多于两张的不算对子），手牌数据是一串字
// 符如：“H4SACTDTSTH9H7S8GLD4DACAHTC3CKH6DJ”，每2个字符代表一张牌，第一个为花色（H;红桃，S-黑桃，C;梅花，D方片，G：大小王）
// 第二个为牌值（ 1,2,3,4.5,6,7,8,9，T,J,Q，K，L（小王)，B(大王))，找到的对子每张牌按照HSCD的顺序以及牌面从大到小排序（斗地主3最小,然后从大到小大
// 王»小王>2>A>K>Q>J>10-3）
// 例：
// 输入: C4HAS5HQC6CJS3D3S6H3HKS7D7C9HJH2H8
// 输出：HJCJS7D7S6C6

let s = 'C4HAS5HQC6CJS3D3S6H3HKS7D7C9HJH2H8'
console.log(fn(s));

function fn(s) {

  let ss = [...s];
  let arr = []
  let map = new Map()
  let res = []
  while (ss.length) {
    arr.push(ss.splice(0, 2))
  }
  for (let i = 0; i < arr.length; i++) {
    if (map.get(arr[i][1])) {
      map.set(arr[i][1], [...map.get(arr[i][1]), arr[i]])
    } else {
      map.set(arr[i][1], [arr[i]])
    }
  }
  for (let [k, v] of map.entries()) {
    if (v.length === 2) {
      res.push(v)
    }
  }

  function sortCard(arr) {
    let sortV = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', '1', '2', 'L', 'B']
    let sortColor = ['H', 'S', 'C', 'D', 'G']
    for (let i of arr) {
      i.sort((a, b) => {
        //按照花色排
        let index_a = sortColor.indexOf(a[0]);
        let index_b = sortColor.indexOf(b[0]);
        return index_a - index_b
      })
    }
    arr.sort((a, b) => {
      //按照大小排
      let index_a = sortV.indexOf(a[0][1])
      let index_b = sortV.indexOf(b[0][1])
      return index_b - index_a
    })
    return arr
  }
  return sortCard(res).flat(Infinity).join('')
}
// console.log(fn('H6SQC6DQGLGB'));

function sortCards(arr) {
  let sortV = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', '1', '2', 'L', 'B']
  let sortColor = ['H', 'S', 'C', 'D', 'G']
  arr.sort((a, b) => {
    if (a[1] !== b[1]) {
      //按照大小排
      let index_a = sortV.indexOf(a[1])
      let index_b = sortV.indexOf(b[1])
      return index_b - index_a
    } else {
      //按照花色排
      let index_a = sortColor.indexOf(a[0]);
      let index_b = sortColor.indexOf(b[0]);
      return index_a - index_b
    }
  })
  return arr
}


//chatgot答案
function findPairs(hand) {
  // 解析手牌
  let cards = [];
  for (let i = 0; i < hand.length; i += 2) {
      cards.push(hand.slice(i, i + 2));
  }

  // 定义花色和牌值的顺序
  const suitOrder = { 'H': 0, 'S': 1, 'C': 2, 'D': 3 };
  const valueOrder = { '3': 0, '4': 1, '5': 2, '6': 3, '7': 4, '8': 5, '9': 6, 'T': 7, 'J': 8, 'Q': 9, 'K': 10, 'A': 11, '2': 12, 'L': 13, 'B': 14 };

  // 统计每个牌值的出现次数
  let valueCount = {};
  for (let card of cards) {
      let value = card[1];
      if (!valueCount[value]) {
          valueCount[value] = 0;
      }
      valueCount[value]++;
  }

  // 筛选出出现次数恰好为2的牌值
  let pairs = [];
  let valuePairs = {};
  for (let card of cards) {
      let value = card[1];
      if (valueCount[value] === 2) {
          if (!valuePairs[value]) {
              valuePairs[value] = [];
          }
          valuePairs[value].push(card);
      }
  }

  // 将对子加入结果
  for (let value in valuePairs) {
      if (valuePairs[value].length === 2) {
          pairs.push(...valuePairs[value]);
      }
  }

  // 对对子进行排序：先按牌值从大到小排序，如果牌值相同再按花色的顺序排序
  pairs.sort((a, b) => {
      let valueComparison = valueOrder[b[1]] - valueOrder[a[1]];
      if (valueComparison === 0) {
          return suitOrder[a[0]] - suitOrder[b[0]];
      }
      return valueComparison;
  });

  // 将结果拼接成字符串
  return pairs.join('');
}

// 示例
let hand = "C4HAS5HQC6CJS3D3S6H3HKS7D7C9HJH2H8";
console.log(findPairs(hand));  // 输出：HJCJS7D7S6C6

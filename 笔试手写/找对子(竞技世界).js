// 大金牙在打斗地主，手牌发下来了，请你号一个函数帮他找到手牌中所有的对子（炸即大小王不是对子，本题中多于两张的不算对子），手牌数据是一串字
// 符如：“H4SACTDTSTH9H7S8GLD4DACAHTC3CKH6DJ”，每2个字符代表一张牌，第一个为花色（H;红桃，S-黑桃，C;梅花，D方片，G：大小王）
// 第二个为牌值（ 1,2,3,4.5,6,7,8,9，T,J,Q，K，L（小王)，B(大王))，找到的对子每张牌按照HSCD的顺序以及牌面大小排序（斗地主3最小大
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
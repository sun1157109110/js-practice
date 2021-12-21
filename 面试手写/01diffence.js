/**
 *
 *  requirement：
 *
 *  const src = [3, 6, 9]
 *  const target = [1, 6, 8]
 *
 *  const diff = difference(src, target)
 *
 *  console.log(diff) // [3, 9]
 *
 **/
function difference(src, target) {
    // type here
    let res = [];
    for (let i = 0; i < src.length; i++) {
        //indexOf不行
        if (!target.includes(src[i])) {
            res.push(src[i])
        }
    }
    return res

}
console.log([NaN,1].includes(NaN));
console.log(Number.isNaN('1'));

// const src = ['nan', 'feng', 'hao']
// const target = ['aa', 'xiao', 'hao']

// assert.deepEqual(difference(src, target), ['nan', 'feng'])
// const src = [1, NaN, 3]
// const target = [NaN, 5, NaN]

// assert.deepEqual(difference(src, target), [1, 3])
// const src = [1, NaN, 3];
// const target = [5, 'k'];

// assert.equal(difference(src, target).toString(), '1,NaN,3')
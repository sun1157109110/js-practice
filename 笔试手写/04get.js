/**
 *
 *  requirement：
 *
 *  const obj = { selector: { to: { coupang: "FE Coder"} }, target: [1, 2, { name: 'PangPang'}] }
 *  const path = 'selector.to.coupang'
 *
 *  const val = getByPath(obj, path)
 *
 *  console.log(val) // FE Coder
 *
 **/
//  const obj = {
//     selector: {
//         to: {
//             coupang: "FE Coder"
//         }
//     },
//     target: [1, 2, {
//         name: 'PangPang'
//     }]
// }
// const path = 'selector.to.coupang'
// const target = 'FE Coder'

function getByPath(obj, path, defaultValue = undefined) {
    //path有数组和字符串两种
    if (typeof path === 'string') {
        //将字符串分割成数组  a[0].c.b => a.0.c.b
        path = path.replace(/\[(\d+)\]/, '.$1').split('.')
    } else if (!Array.isArray(path)) {
        return defaultValue
    }
    let result = obj;
    for (let key of path) {
        result = Object(result)[key];
        if (result == undefined) {
            return defaultValue
        }
    };
    return result
}


// assert.equal(getByPath(obj, path), target)
const obj = {
    selector: {
        to: {
            coupang: "FE Coder"
        }
    },
    target: [1, 2, {
        name: 'PangPang'
    }]
}
const path = 'target[1]'
// const target = 2

// assert.equal(getByPath(obj, path), target)
// const obj = {
//     selector: {
//         to: {
//             coupang: "FE Coder"
//         }
//     },
//     target: [1, 2, {
//         name: 'PangPang'
//     }]
// }
// const path = `['selector']['to'].coupang`
// const target = 'FE Coder'

// assert.equal(getByPath(obj, path), target)
console.log(getByPath(obj, path));
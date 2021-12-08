//12233.589;
function format(num) {
    let numStr = num.toString();
    let intStr = '';
    let numStrList = [];
    let symbol = ''
    if (numStr.indexOf('.') !== -1) {
        numStrList = numStr.split('.');
        intStr = numStrList[0][0] === '-' || '+' ? numStrList[0].slice(1) : numStrList[0];
        if (numStrList[0][0] === '-' || '+') symbol = numStrList[0][0]
        console.log(numStrList);
    };
    console.log(intStr);
    let len = intStr.length;
    let temp = '';
    while (len > 3) {
        temp = ',' + intStr.slice(len - 3) + temp;
        intStr = intStr.substring(0, len - 3)
        len -= 3;
    };
    console.log(temp);
    if (intStr) {
        temp = intStr + temp
    };
    return numStrList[1] ? symbol + temp + '.' + numStrList[1] : symbol + temp

};


function format_with_array(number) {
    var arr = (number + '').split('.');
    var int = arr[0].split('');
    var fraction = arr[1] || '';
    var r = "";
    var len = int.length;
    int.reverse().forEach(function (v, i) {
        if (i !== 0 && i % 3 === 0) {
            r = v + "," + r;
        } else {
            r = v + r;
        }
    })
    return r + (!!fraction ? "." + fraction : '');
}

console.log(format(-849823664.12488));
console.log(849823664.12488.toLocaleString());
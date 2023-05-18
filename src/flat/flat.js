arr = [[11, 20], 30, [40, 50, [60, 70, [80, 92, [110, 911]]]]]

function flagFn1(arr) {
    return arr.flat(Infinity, true);
}

function flagFn2(arr) {
    arr = arr.toString().split(',');
    let newArr = arr.map(item => {
        item = +item;
        return item;
    })
    return newArr;
}
// console.log(flagFn1(arr));
console.log(flagFn2(arr));
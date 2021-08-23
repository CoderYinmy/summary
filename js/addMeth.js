/**
 * 位运算、或运算、与运算
 * 给一组数  1，2，4，8，16, 32, 64  这几个数都代表不同的意思，接口动态返回他们相加的值（存在多个数相加）怎么判断这个和是  哪几个数相加的
 */

var arr = [1, 2, 4, 8, 16, 32, 64]
var sum = 7 // 这个是后端返回给你的数值

var res = (sum & 64) > 0 // 用这个判断是否存在 64
let arr2 = arr.filter(v => {
    console.log((sum & v),v,sum)
    return (sum & v) > 0
})
console.log(arr2) // print false
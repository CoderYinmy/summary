/**
 * JSON.stringify(value, replacer, space)
 * 1、value 序列化为JSON字符串的值
 * 2、replacer 
 * - 参数是一个函数，所有序列化值都要经过该函数处理；
 * - 参数是一个数组，只有这个数组中的属性才能被序列化 
 * - 参数是null或者不传，对象都将被序列化；
 * 3、space 空格（美化作用）
 */

console.log(JSON.stringify({ name: '111', sex: 'woman' }))

console.log(JSON.stringify({ name: '111', sex: 'woman', num: 100 }, (key, value) => {
    return typeof value == 'number' ? undefined : value
}))

console.log(JSON.stringify({ name: '111', sex: 'woman', num: 100 }, ['name']))
console.log(JSON.stringify({ name: '111', sex: 'woman', num: 100 }, null, 2))

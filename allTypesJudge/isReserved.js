/**
 * 选中  $ 或  or_ 开头的
 */

exports.isReserved = function isReserved(v) {
   var c = ( v + '').charCodeAt(0)
   return c == 0x24 || c == 0x5f
}
//正则校验url
export function validatorUrl( value, callback) {
    const strRegex =
        '^((https|http|ftp)://)?' +
        "(([\\w_!~*'()\\.&=+$%-]+: )?[\\w_!~*'()\\.&=+$%-]+@)?" +
        '(([0-9]{1,3}\\.){3}[0-9]{1,3}' +
        '|' +
        '(localhost)|' +
        "([\\w_!~*'()-]+\\.)*" +
        '\\w+\\.' +
        '[a-zA-Z]{1,6})' +
        '(:[0-9]{1,5})?' +
        '((/?)|' +
        "(/[\\w_!~*'()\\.;?:@&=+$,%#-]+)+/?)$"
    var str = new RegExp(strRegex, 'i')
    if(str.test(encodeURI(value)) == false) {
        callback('请输入正确的url')
    }else {
        callback('000')
    }
}
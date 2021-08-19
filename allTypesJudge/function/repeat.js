exports.repeat = function repeat(str, n) {
    let res = ''
    while (n) {
        if (n % 2) {
            res += str
        }
        if (n > 1) {
            str += str
        }

        n >>= 1
    }

    return res

}
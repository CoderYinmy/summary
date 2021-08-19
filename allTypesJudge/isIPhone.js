exports.isIPhone = function isIPhone(v) {
    return v && /\biPhone\b|\bipod\b/i.test(v)
}
const range = [1, 2]
const range2 = '[1,]&[4,5]&[10,15]'

function validate(value, range) {
    if (Array.isArray(range)) {
        return range.includes(value)
    } else if (typeof range === 'string') {
        const list = range.split('&')
        const ast = list.map(function (range) {
            const r = range.split('')
            const leftState = r.shift()
            const rightState = r.pop()

            range = r.join('')
            const [minValue, maxValue] = range.split(',')
            const min = {
                value: toNumber(minValue, false),
                include: isInclude(leftState),
            }

            const max = {
                value: toNumber(maxValue, true),
                include: isInclude(rightState),
            }

            return {
                min,
                max,
            }
        })

        const state = ast
            .map(function (range) {
                return check(value, range)
            })
            .includes(true)

        return state
    }
}

function toNumber(value, flag) {
    value = value.trim()

    if (value === '') {
        return flag ? Infinity : -Infinity
    }

    return +value
}

function isInclude(flag) {
    return ['[', ']'].includes(flag)
}

function check(value, range) {
    const { min, max } = range
    let leftState, rightState

    if (min.include) {
        leftState = min.value <= value
    } else {
        leftState = min.value < value
    }

    if (max.include) {
        rightState = value <= max.value
    } else {
        rightState = value < max.value
    }

    return leftState && rightState
}

const res = validate(1, range)

console.log(res)

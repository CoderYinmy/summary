;(function(a, b) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = b()
  } else if (typeof define === 'function' && define.amd) {
    define([], b())
  } else if (typeof exports === 'object') {
    exports['qs'] = b()
  } else {
    a['qs'] = b()
  }
})(this, function() {
  function splitOnFirst(string, separator) {
    if (!(typeof string === 'string' && typeof separator === 'string')) {
      throw new TypeError('Expected the arguments to be of type `string`')
    }
    if (separator === '') {
      return [string]
    }
    var separatorIndex = string.indexOf(separator)
    if (separatorIndex == -1) {
      return [string]
    }

    return [
      string.slice(0, separatorIndex),
      string.slice(separatorIndex + separator.length)
    ]
  }

  function encode(value) {
    return encodeURIComponent(value)
  }
  function decode(value) {
    return decodeURIComponent(value)
  }
  //生成query string
  function stringify(object) {
    if (!object) return ''

    var result = []
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        var value = object[key]

        if (value === undefined) {
          continue
        }

        if (value === null) {
          result.push(encode(key))
        }

        result.push(encode(key) + '=' + encode(value))
      }
    }

    return result.filter(x => x.length > 0).join('&')
  }
  // 解析 query object
  function parse(input) {
    var ret = Object.create(null)

    if (typeof input !== 'string') {
      return ret
    }

    input = input.trim().replace(/^[?#&]/, '')

    if (!input) {
      return ret
    }

    for (var param of input.split('&')) {
      var split = splitOnFirst(param.replace(/\+/g, ' '), '=')
      var key = split[0]
      var value = split[1]

      value = value === undefined ? null : decode(value)

      key = decode(key)

      ret[key] = value
    }

    return ret
  }
  // 移除 hash
  function removeHash(input) {
    var hasStart = input.indexOf('#')
    if (hasStart !== -1) {
      input = input.slice(0, hasStart)
    }

    return input
  }
  // 抽离 query string
  function extract(input) {
    input = removeHash(input)
    var queryStart = input.indexOf('?')
    if (queryStart === -1) {
      return ''
    }

    return input.slice(queryStart + 1)
  }

  // 解析 url
  function parseUrl(input) {
    return {
      url: removeHash(input).split('?')[0] || '',
      query: parse(extract(input))
    }
  }

  return {
    parse,
    stringify,
    parseUrl
  }
})

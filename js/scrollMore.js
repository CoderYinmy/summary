this.$dom.on(
  window,
  'scroll',
  this.$kit.debounce(function() {
    if (that.isOverLoaded) {
      return
    }

    if (
      document.body.offsetHeight -
        (window.innerHeight + (window.scrollY || window.pageYOffset)) <
      200
    ) {
      that.onPullingUpListener()
    }
  }, 250)
)
if (
  document.body.offsetHeight -
    (window.innerHeight + (window.scrollY || window.pageYOffset)) <
  200
) {
  that.onPullingUpListener()
}
function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex
  return function() {
    const length = Math.max(arguments.length - startIndex, 0)

    const rest = Array(length)

    let index = 0
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex]
    }
    switch (startIndex) {
      case 0:
        return func.call(this, rest)
      case 1:
        return func.call(this, arguments[0], rest)
      case 2:
        return func.call(this, arguments[0], arguments[1], rest)
    }
    const args = Array(startIndex + 1)
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index]
    }
    args[startIndex] = rest
    return func.apply(this, args)
  }
}

const delay = restArguments(function(func, wait, args) {
  return setTimeout(function() {
    return func.apply(null, args)
  }, wait)
})

const throttle = function(func, wait, options) {
  let timeout, context, args, result
  let previous = 0
  if (!options) options = {}

  const later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }

  const throttled = function() {
    const now = Date.now()
    if (!previous && options.leading === false) previous = now
    const remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function() {
    clearTimeout(timeout)
    previous = 0
    timeout = context = args = null
  }

  return throttled
}

const debounce = function(func, wait, immediate) {
  let timeout, result

  const later = function(context, args) {
    timeout = null
    if (args) result = func.apply(context, args)
  }

  const debounced = restArguments(function(args) {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(later, wait)
      if (callNow) result = func.apply(this, args)
    } else {
      timeout = delay(later, wait, this, args)
    }

    return result
  })

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

// 获取滚动条的高度
function getScrollTop() {
  var scrollTop = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop
  } else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}

// 获取当前可视范围的高度
function getClientHeight() {
  var clientHeight = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(
      document.body.clientHeight,
      document.documentElement.clientHeight
    )
  } else {
    clientHeight = Math.max(
      document.body.clientHeight,
      document.documentElement.clientHeight
    )
  }
  return clientHeight
}

// 获取文档完整的高度
function getScrollHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  )
}

var defaults = {
  delay: 1e2,
  threshold: 200,
  callback: function() {
    console.log('加载更多。。。')
  }
}

function load(options = {}) {
  var userOptions = Object.assign({}, defaults, options)

  window.addEventListener(
    'scroll',
    debounce(function() {
      if (
        getScrollTop() + getClientHeight() - getScrollHeight() <
        userOptions.threshold
      ) {
        userOptions.callback()
      }
    }, userOptions.delay)
  )
}

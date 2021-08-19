exports.isSupportPointerEvents = function isSupportPointerEvents() {
    return !!(
        window.navigator.pointerEnabled ||
        window.PointerEvent ||
        ('maxTouchPoints' in window.navigator &&
            window.navigator.maxTouchPoints > 0)

    )
}
// window.navigator.maxTouchPoints   最大触摸点
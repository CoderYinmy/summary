////两栏布局鼠标拖拽及计算屏幕偏移量
function dragControllerDiv(boxC, leftC, midC) {
    var resize = document.getElementsByClassName('resize')
    var left = document.getElementsByClassName(leftC)
    var mid = document.getElementsByClassName(midC)
    var box = document.getElementsByClassName(boxC)
    for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function (e) {
            //颜色改变提醒
            resize[i].style.background = '#fff'
            var startX = e.clientX
            resize[i].left = resize[i].offsetLeft
            // 鼠标拖动事件
            document.onmousemove = function (e) {
                var endX = e.clientX
                var moveLen = resize[i].left + (endX - startX)
                var maxT = box[i].clientWidth - resize[i].offsetWidth

                if (moveLen < 32) moveLen = 32
                if (moveLen > maxT - 600) moveLen = maxT - 600

                resize[i].style.left = moveLen

                for (let j = 0; j < left.length; j++) {
                    left[j].style.width = moveLen + 'px'
                    mid[j].style.width =
                        box[i].clientWidth - moveLen - 10 + 'px'
                }
            }
            // 鼠标松开事件
            document.onmouseup = function (evt) {
                //颜色恢复
                resize[i].style.background = '#fff'
                document.onmousemove = null
                document.onmouseup = null
                resize[i].releaseCapture && resize[i].releaseCapture() //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
            }
            resize[i].setCapture && resize[i].setCapture()
            return false
        }
    }
}
export default dragControllerDiv

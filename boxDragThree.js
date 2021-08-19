//三栏布局鼠标拖拽及计算屏幕偏移量
export function dragControllerDivLeft() {
    var $restBox = document.getElementById('right')

    var $box = document.getElementById('box')
    var $left = document.getElementById('left')
    var $resize = document.getElementById('resize')
    var $mid = document.getElementById('mid')

    $resize.onmousedown = function (e) {
        var startX = e.clientX
        $resize.left = $resize.offsetLeft
        var restBoxWidth = $restBox.clientWidth
        var realBoxWidth = $box.clientWidth - restBoxWidth

        document.onmousemove = function (e) {
            var endX = e.clientX
            var moveLen = $resize.left + (endX - startX) // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            // debugger;
            $resize.style.left = moveLen // 设置左侧区域的宽度

            $left.style.width = moveLen + 'px'
            $mid.style.width = realBoxWidth - moveLen + 'px'
        }

        document.onmouseup = function (evt) {
            //颜色恢复
            document.onmousemove = null
            document.onmouseup = null
            $resize.releaseCapture && $resize.releaseCapture() //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
        }

        $resize.setCapture && $resize.setCapture() //该函数在属于当前线程的指定窗口里设置鼠标捕获

        return false
    }
}
export function dragControllerDivRight() {
    var $restBox = document.getElementById('left')

    var $box = document.getElementById('box')
    var $mid = document.getElementById('mid')
    var $resize = document.getElementById('resize2')
    var $right = document.getElementById('right')

    $resize.onmousedown = function (e) {
        var startX = e.clientX
        var restBoxWidth = $restBox.clientWidth
        $resize.left = $resize.offsetLeft - restBoxWidth // 临时记录
        var boxWidth = $box.clientWidth - restBoxWidth // 盒子影响的宽度

        document.onmousemove = function (e) {
            var endX = e.clientX
            var moveLen = $resize.left + (endX - startX) //
            // 设置坐标
            $resize.style.left = moveLen + restBoxWidth // 左侧整体的宽度
            $mid.style.width = moveLen + 'px'
            $right.style.width = boxWidth - moveLen + 'px'
        }

        document.onmouseup = function (evt) {
            //颜色恢复
            document.onmousemove = null
            document.onmouseup = null
            $resize.releaseCapture && $resize.releaseCapture() //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
        }

        $resize.setCapture && $resize.setCapture() //该函数在属于当前线程的指定窗口里设置鼠标捕获

        return false
    }
}

/**
 * 用法
    <div id="left"></div>
    <div id="resize" class="resize"></div>
    <div id="mid"></div>
    <div id="resize" class="resize"></div>
    <div id="right"></div>
 */

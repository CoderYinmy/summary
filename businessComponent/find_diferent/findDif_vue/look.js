import API from "@/utils/axios/api";
import Vue from "vue";
import { Toast, Dialog } from "vant";
Vue.use(Toast).use(Dialog);

function findDif(paramsApi) {
  // setTimeout(function(){
  //     Vue.prototype.$eventbus.emit(null, 1,2,3) // 失败
  // },1000)

  // return;

  const originArea = document.getElementById("origin");
  const originContext = originArea.getContext("2d");

  const compareArea = document.getElementById("compare");
  const compareContext = compareArea.getContext("2d");

  let origin;
  let compare;
  let points;

  let enable_hard_model = false;
  let is_continue = true;
  let level = 0;
  let count_down_millis = -1;
  let start;

  function reset() {
    is_continue = true;
    count_down_millis = -1;
    start = undefined;

    let timeline = document.getElementById("timeline");
    timeline.style.width = "0px";

    let level_status = document.getElementById("level_status");
    level_status.innerHTML = 1 + level;
  }

  /**
   * 倒计时检查及时间条
   */
  function step(timestamp) {
    if (start === undefined) start = timestamp;
    const elapsed = timestamp - start;

    let element = document.getElementById("timeline");
    // 这里使用`Math.min()`确保元素刚好停在200px的位置。
    element.style.width =
      Math.min((300 * elapsed) / count_down_millis, 300) + "px";
    // 颜色变化
    let r = Math.min((255 * elapsed) / count_down_millis, 255);
    let g = Math.min(127 - (127 * elapsed) / count_down_millis, 255);
    let b = Math.min(255 - (255 * elapsed) / count_down_millis, 255);
    element.style.backgroundColor = "rgba(" + r + "," + g + "," + b + ", 0.9)";

    // element.innerHTML = '' + (count_down_millis - elapsed)/1000;

    let remain = document.getElementById("remain_status");
    remain.innerHTML = points.length;

    let level_status = document.getElementById("level_status");
    level_status.innerHTML = 1 + level;

    let remain_time = document.getElementById("remain_time");
    let left_time = parseInt((count_down_millis - elapsed) / 1000);
    remain_time.innerHTML =
      left_time < 5
        ? "<span style='color:red'>" + left_time + "</span>"
        : left_time;

    // 倒计时
    if (elapsed <= count_down_millis) {
      if (!checkFinal()) {
        window.requestAnimationFrame(step);
      }
    } else {
      checkFinal(true);
    }
  }

  /**
   * 继续下一局
   */
  function generateNextLevel() {
    if (!is_continue) {
      return;
    }

    Toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
    // 请求加载
    let request = new XMLHttpRequest();
    request.open("get", "api/game/findDifferent/" + level);
    request.send(null); /*不发送数据到服务器*/

    request.onload = function() {
      /*XHR对象获取到返回信息后执行*/
      if (request.status == 200) {
        /*返回状态为200，即为数据获取成功*/
        let data = JSON.parse(request.responseText);
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].name);
        }

        points = data.points;
        count_down_millis = data.countDownSeconds * 1000;

        originArea.addEventListener(
          "click",
          function(e) {
            checkPointPosition(e);
          },
          false
        );

        compareArea.addEventListener(
          "click",
          function(e) {
            checkPointPosition(e);
          },
          false
        );

        drawImage(data);
      }
    };
  }

  /**
   * 准备
   */
  function ready() {
    if (origin.complete && compare.complete) {
      window.requestAnimationFrame(step);
    }
  }

  /**
   * 绘图
   */
  function drawImage(data) {
    Toast.clear();
    origin = new Image();
    origin.src = data.originImg;

    compare = new Image();
    compare.src = data.compareImg;

    origin.onload = function() {
      originContext.drawImage(origin, 0, 0, 300, 300);
      ready();
    };

    compare.onload = function() {
      compareContext.drawImage(compare, 0, 0, 300, 300);
      ready();
    };
  }

  /**
   * 画圈圈
   */
  function drawCircle(ctx, x, y, r) {
    ctx.strokeStyle = "#F00";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
  }

  /**
   * 游戏结束检查
   * 仅在倒计时的时候检查
   * 并由倒计时检测时间
   */
  function apiSucOrFail(level) {
    let data = {
      activity_id: paramsApi.activity_id,
      token: paramsApi.token,
      type: 2,
      num: level,
    };

    let url = "api/activity/game";
    API.$post(url, data).then((res) => {
      if (res.data.code == 1) {
        Vue.prototype.$eventbus.emit(null, 3, res.data.data.user_info); // 添加摇骰子机会 res.data.data;
      }
    });
  }
  function checkFinal(isTimeoutOrFinish) {
    // 直接结束
    if (isTimeoutOrFinish) {
      is_continue = false;
      //结束
      //   alert("时间到，游戏结束！");
      apiSucOrFail(-1);
      Dialog.alert({
        message: "时间到，挑战失败！",
        theme: "round-button",
      }).then(() => {
        // Vue.prototype.$eventbus.emit(null, 1); // 失败
        // on close
      });
      return true;
    }

    // 点已全部被检出
    if (points && points.length == 0) {
      setTimeout(function() {
        Dialog.alert({
          message: "挑战成功！是否进入下一关",
          theme: "round-button",
          confirmButtonText: "继续",
        })
          .then(() => {
            // Vue.prototype.$eventbus.emit(null, 2); // 成功
            is_continue = true;
            reset();
            ++level;

            if (level == 3 || level == 5 || level == 10 || level == 15 || level == 20) {
              // TODO 添加一次摇骰子机会
              apiSucOrFail(level);
            }
            generateNextLevel();
          })
        // if (window.confirm("恭喜过关！是否进入下一关")) {
        // } else {
        //   // 不继续退出
        //   is_continue = false;
        //   alert("游戏已结束！");
        // }
      }, 100);

      return true;
    }

    // 超时未找全
    // if (points && points.length > 0) {
    //     // 游戏结束需要的计分操作
    //     is_continue = false;
    //     alert("游戏结束！");

    //     return true;
    // }

    // 游戏继续
    return false;
  }

  /**
   * 检查点是否落在规定点内
   * 并标识
   */
  function checkPointPosition(e) {
    let pointTries = points.length;

    for (let i = 0; i < points.length; i++) {
      let transX = (300 / origin.width) * points[i].hitX;
      let transY = (300 / origin.height) * points[i].hitY;
      let widthDis = e.offsetX - transX;
      let heightDis = e.offsetY - transY;
      let distanceSquare = widthDis * widthDis + heightDis * heightDis;

      let transR = (300 / origin.width) * points[i].squareR;
      let originSquare = transR * transR;
      if (originSquare >= distanceSquare) {
        // 上下图均画圈
        drawCircle(originContext, transX, transY, transR);
        drawCircle(compareContext, transX, transY, transR);

        points.splice(i, 1);
        break;
      }

      pointTries--;
    }

    if (enable_hard_model && pointTries == 0) {
      checkFinal(true);
    }
  }

  //   window.onload = function() {
  //     generateNextLevel();
  //   };
  generateNextLevel();
}

export default findDif;

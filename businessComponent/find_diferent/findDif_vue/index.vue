<template>
  <div
    class="game__wrap"
    :style="{
      backgroundImage: 'url(' + contentImg + ')',
      backgroundSize: '100%',
    }"
  >
    <div class="header__wrap">
      <van-icon
        name="arrow-left"
        color="#fff"
        size="3rem"
        @click="goBackPage"
      />
      <div class="left">
        <img class="page__img" src="../../common/image/tit7.png" alt="" />
      </div>
      <div class="right"></div>
    </div>
    <div class="container">
      <canvas id="compare" width="300" height="300"></canvas>
      <div id="game_status" class="game_status">
        <div id="" class="level_status">等级</div>
        <div id="level_status" class="level_status"></div>
        <div id="" class="remain_status">剩余不同处</div>
        <div id="remain_status" class="remain_status"></div>
        <div id="" class="remain_status">剩余时间</div>
        <div id="remain_time" class="remain_status"></div>
      </div>
      <div id="timeline_bar" class="timeline_bar">
        <div id="timeline" class="timeline"></div>
      </div>
      <canvas id="origin" width="300" height="300"></canvas>
    </div>

    <div class="dialog__rule" style="color: #666" v-show="showPoster">
      <div :class="{ dialog__poster: showPoster }"></div>
      <div
        class="dialog__content"
        :style="{
          backgroundImage:
            'url(' +
            (status == 0
              ? require('../../common/image/diaBg6.png')
              : status == 1
              ? require('../../common/image/diaBg5.png')
              : require('../../common/image/diaBg4.png')) +
            ')',
          backgroundSize: '100% 100%',
        }"
      >
        <img
          class="dialogBtn_img"
          v-if="status == 0"
          src="../../common/image/btn3.png"
          alt=""
          @click="beginGame"
        />
        <img
          class="dialogBtn_img"
          v-if="status == 1"
          src="../../common/image/btn2.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import findDiff from "./LookForDif";
import Vue from "vue";
import { Toast, Dialog, Icon } from "vant";
import API from "@/utils/axios/api";
Vue.use(Toast).use(Dialog).use(Icon);
import look from "./look";

export default {
  data() {
    return {
      contentImg: require("../../common/image/bg3.png"),
      showPoster: true,
      status: 0, //0 开始  1成功  2失败
      checkReturn: null,
    };
  },
  created() {},
  mounted() {
  },
  watch: {
    showPoster(v) {
      this.openDia(v);
    },
    checkReturn(v) {
      console.log(v);
    },
  },
  methods: {
    //开始游戏
    beginGame() {
      this.showPoster = false;
      let data = {
        activity_id: this.$store.state.activity__info.activity_id,
        token: this.$store.state.token,
      };
      this.checkReturn = look(data);
      var _this = this;
      this.$eventbus.on(function (res) {
        //1失败  2 成功  3 添加摇骰子=
        _this.$store.commit("getLife_num", arguments[1]);
        _this.$store.commit("getIntegral", arguments[1].score);
        console.log(res, arguments, this, _this);
      });
    },
    goBackPage() {
      this.$router.back();
    },
    openDia(v) {
      if (v) {
        document.body.style = "overflow:hidden";
      } else {
        document.body.style = "";
      }
    },
  },
};
</script>

<style lang='less' scoped>
.game__wrap {
  min-height: 100%;
  padding: 0 0 20px;
  .header__wrap {
    display: flex;
    width: 100%;
    padding: 10px 0;
    justify-content: space-around;
    align-items: center;
    .left {
      width: 60%;
    }
  }
  .container {
    color: #fff;
  }
}

.page__img {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.timeline_bar {
  width: 100%;
  height: 8px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timeline {
  width: 300px;
  background: rgba(0, 200, 255, 0.9);
  border-radius: 5px;
  height: 8px;
}
.game_status {
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 10px;
  font-size: 12px;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
}
.game_status div {
  margin: 0px 10px;
}
.dialogBtn_img {
  width: 50%;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%);
}
.dialog__rule {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
  left: 0;
  .dialog__poster {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .dialog__content {
    position: relative;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 85%;
    height: 30%;
    transform: translate(-50%, -50%);
    // background: #f4e5d0;
    background: transparent;
    z-index: 99;
    border-radius: 10px;
    .dialog_tit {
      width: 50%;
      position: absolute;
      left: 50%;
      top: -5%;
      transform: translate(-50%);
    }
    .content_con {
      height: 90%;
      overflow-y: auto;
      padding: 0 15px;
      color: #666;
    }
  }
}
</style>
<template>
  <div class="talent_poster">
    <div class="content_container">
      <vue-canvas-poster
        :widthPixels="1000"
        :painting="painting"
        @success="canvasSuccess"
        @fail="canvasFail"
      ></vue-canvas-poster>
      <img :src="posterImg" />
      <div class="tipTxt">长按保存或分享</div>
      <!--关闭-->
      <div style="width: 100%; text-align: center">
        <div class="cancleBtn" @click="$emit('hideposter')">
          <span id="close"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "weixin-js-sdk";
export default {
  middleware: "",
  props: {},
  components: {},
  data() {
    return {
      showPoster: true,
      posterImg: "", //生成的海报
      painting: {
        width: "600px",
        height: "814px",
        background: "",
        views: [
          {
            type: "qrcode",
            content: "",
            css: {
              bottom: "350px",
              left: "0",
              right: "275px",
              color: "#000",
              background: "#fff",
              width: "0px",
              height: "0px",
              borderWidth: "10px",
              borderColor: "#fff",
            },
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    open(item) {
      this.painting.background = item.bgImg;
      this.painting.views[0].content = item.codeUrl;
      this.painting.views[0].css = item.css;
    },
    canvasSuccess(src) {
      this.posterImg = src;
    },
    canvasFail(err) {
      alert(err);
    },
    saveImg() {
      wx.saveImageToPhotosAlbum({
        filePath: this.posterImg,
        success(res) {},
        fail(err) {
          console.log(err);
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.talent_poster {
  width: 100%;
  height: 100%;
  .content_container {
    position: fixed;
    width: 80%;
    top: 50%;
    left: 50%;
    overflow: hidden;
    z-index: 999;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
      margin-bottom: 10px;
    }
  }
  .cancleBtn {
    display: inline-block;
    padding: 0px 4px 8px;
    margin-top: 20px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #ccc;
    #close {
      display: inline-block;
      width: 20px;
      height: 1px;
      background: #ccc;
      transform: rotate(45deg);
    }

    #close::after {
      content: "";
      display: block;
      width: 20px;
      height: 1px;
      background: #ccc;
      transform: rotate(-90deg);
    }
  }
  .tipTxt {
    text-align: center;
    color: #ccc;
  }
}
</style>
 
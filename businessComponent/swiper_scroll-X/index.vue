<template>
  <div class="lucky__page">
    <div class="roulette-container" id="roulette-container-1">
      <div class="roulette-container-open" id="roulette-container-1-open"></div>
      <ul id="item-case-goods-1" class="item-case-goods">
        <li
          class="item-small-case restricted"
          v-for="(item, index) in scrollList"
          :key="index"
          :data-id="item.goods_id"
        >
          <img class="case" :src="item.image" alt="" />
        </li>
      </ul>
    </div>
    <!-- <div class="try_btn">
      <div class="btn" @click="tryBtnFn">试试手气</div>
    </div> -->
  </div>
</template>

<script>
import Scroll from "./index";
export default {
  props: {
    scrollList: Array,
    changeItemData: Object,
  },
  data() {
    return {
      scoll: null,
    };
  },
  mounted() {
    this.scoll = new Scroll({
      eleID: "roulette-container-1",
      scrollID: "item-case-goods-1",
      targetID: "roulette-container-1-open",
      pageSize: 6,
    });
    let id = this.changeItemData.goods_id;
    this.scoll.start(id);
  },
  methods: {
    tryBtnFn() {
      this.scoll.start(2);
    },
  },
};
</script>

<style lang="less" scoped>

.lucky__page {
  padding: 10px;
  // border: 2px solid;
  // border-color: #ccc;
  // border-radius: 10px;
  background: #fff;
}
.btn {
  display: inline-block;
  padding: 5px 20px;
  background: #f90;
  color: #fff;
  border-radius: 15px;
}
.try_btn {
  margin-top: 20px;
  text-align: center;
}

.item-case-open {
  animation: mymove 0.5s infinite ease;
}

@-webkit-keyframes mymove {
  from {
    left: 0px;
  }
  to {
    left: -100%;
  }
}

.roulette-container {
  position: relative;
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 185px;
  //   background: #181818 !important;
}

.roulette-container-open {
  box-sizing: border-box;
  border: 1px solid transparent;
  position: absolute;
  height: 100% !important;
  width: 100% !important;
  left: 50% !important;
  margin-left: -139px !important;
  z-index: 99 !important;
  border-radius: 10px;
  /*z-index: 100000 !important;*/
}

.item-case-goods {
  word-break: keep-all;
  white-space: nowrap;
  padding: 0px;
  margin: 0px;
  z-index: 99 !important;
  /*will-change: transform;*/
}

.item-case-goods li {
  width: 265px !important;
  height: 164px !important;
  //   border: 1px solid green;
  box-sizing: border-box;
  margin: 10px 2px;
  // border: 1px solid #f90;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
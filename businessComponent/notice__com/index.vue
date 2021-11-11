<template>
  <div id="marquee"></div>
</template>

<script>
import "./index.css";
import Marquee from "./index";

export default {
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return {
      marquee: null,
    };
  },
  mounted() {
    this.marquee = new Marquee(document.getElementById("marquee"), null, {
      loop: true,
      speed: 2,
    });
  },
  watch: {
    list(newVal, oldVal) {
      if (newVal.length > 0) {
        this.marquee.append(newVal, true);
        this.marquee.start();
      }
    },
  },
};
</script>

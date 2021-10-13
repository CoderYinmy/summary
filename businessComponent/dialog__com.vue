<template>
  <div class="dialog__com" v-show="dialogVis">
    <div class="dia_poster" @click="dialogVis == false"></div>
    <div class="dia_content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVis: false,
    };
  },
  methods: {},
};
</script>

<style>
.dialog__com {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.dia_poster {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.dia_content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
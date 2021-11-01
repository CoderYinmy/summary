####分享图片
安装 vue-canvas-poster
在 main 中引入
import VueCanvasPoster from 'vue-canvas-poster'
Vue.use(VueCanvasPoster)

<div style="height: 100%; position: relative; overflow: hidden">
<!--弹框黑色半透明背景-->
<div @click="hidePosters" :class="{ hidePoster: showPoster }"></div>
<!--弹出的海报组件-->
<invite-poster
ref="invitePoster"
v-show="showPoster"
@hideposter="hidePosters"
@touchmove.stop.prevent ></invite-poster>
</div>
//定义变量
showPoster: false,
hidePoster: false,
//海报 dialog
.hidePoster {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 998;
background: rgba(0, 0, 0, 0.6);
}

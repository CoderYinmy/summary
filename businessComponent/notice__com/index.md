####横向滚动公告栏
引入
import scrollX from ’地址‘
注册组件并调用
<scroll-x :list="horScrollXList"></scroll-x>
定义变量
horScrollXList: [],
赋值
this.horScrollXList = array.map(function (v) {
if (v.title == "谢谢参与") {
v.title = "<span class='txtColor'>" + v.title + "</span>";
}
return `${v.nickname}: 通过抽奖获得“ ${v.title} ”*1`;
});

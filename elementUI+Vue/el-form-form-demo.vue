<template>
  <div class="ns-table">
    <el-form ref="form" :model="form" :rules="form.rules">
      <el-table :data="form.params">
        <el-table-column label="name">
          <template slot-scope="scope">
            <el-form-item
              :prop="'params.' + scope.$index + '.name'"
              :rules="form.rules.name"
            >
              <el-input v-model="scope.row.name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="encode">
          <template slot-scope="scope">
            <el-form-item
              :prop="'params.' + scope.$index + '.encode'"
              :rules="form.rules.encode"
            >
              <el-input v-model="scope.row.encode"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="Setting">
          <template slot-scope="scope">
            <el-button @click="onClickHandle(scope.$index)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <el-button @click="onSubmitHandle">Submit</el-button>
  </div>
</template>

<script>
/**
 * 应用到了
 * 1. 多维表单的校验 https://element.eleme.cn/#/zh-CN/component/form 中 -> 动态增减表单项
 * 2. 动态改变表单的 prop & rules https://www.cnblogs.com/midnight-visitor/p/12409805.html
 * 3. 表格中的 scope 属性
 */
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      form: {
        params: [
          {
            name: 1,
            encode: 2,
          },
        ],
        rules: {
          name: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
          ],
          encode: [
            { required: true, message: "请选择活动区域", trigger: "change" },
          ],
        },
      },
    };
  },
  methods: {
    /**
     * 点击添加按钮
     * @param {number} index The index is which button was clicked
     * @return {undefined} No returns
     */
    onClickHandle(index) {
      this.form.params.splice(index, 0, {
        name: "",
        encode: "",
      });
    },
     /**
     * 点击上传按钮
     * @return {undefined} No returns
     */
    onSubmitHandle(){
      this.$refs.form.validate(valid=>{
        if(valid){
          // TODO 校验成功的逻辑
          alert('success')
        }else{
          // TODO 检验失败的逻辑
          alert('fail')
        }
      })
    }
  },
};
</script>
<style>
.el-form-item__error{position:relative;}
.cell{height: 60px !important;}
</style>
<style scoped>
.ns-table {
  width: 100%;
}
.el-form-item{
  height: 66px;
}
</style>
<template>
    <el-cascader
        ref="cascader"
        v-model="cascaderValue"
        :options="cascaderData"
        placeholder="请选择部门类型"
        :props="{
            value: 'id',
            label: 'name',
            children: 'childens',
        }"
        @change="handleTypeChange"
        :show-all-levels="false"
        :key="isResouceShow"
    >
    </el-cascader>
</template>

<script>
export default {
    data() {
        return {
            cascaderValue: "",
            cascaderData: [],
            isResouceShow: "0",
        };
    },
    methods: {
        handleTypeChange(v) {
            //获取Id
            const currentId =
                this.$refs["cascader"].getCheckedNodes()[0].data.id;
            this.pfOrgAo.orgTypeId = currentId;
        },
        clearFn() {
            this.cascaderValue = ""; //清空v-model
            ++this.isResouceShow; //key值自增
            this.cascaderData = []; //清空内容
            // this.$refs[formName].resetFields();//清空form表单
        },
    },
};
</script>

<style>
</style>
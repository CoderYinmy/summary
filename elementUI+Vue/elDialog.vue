<template>
    <!-- 自定义el-dialog组件 -->
    <el-dialog
        v-el-drag-dialog
        class="pf-dialog"
        :visible.sync="dialogFormVisible"
    >
        <div slot="title" class="dialog-title">
            <i class="icon_border el-icon-s-operation"></i>
            <span class="title-text">title</span>
        </div>

        <div slot="footer" class="dialog-footer">
            <el-button
                @click="submit('form')"
                style="background: #099778; opacity: 0.8; color: #fff"
                icon="el-icon-circle-check"
                >确 定</el-button
            >
            <el-button @click="cancle('form')" icon="el-icon-circle-close"
                >取 消</el-button
            >
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
        };
    },
    methods: {
        submit() {
            this.$emit("submitFn", param);
        },
        cancle() {
            this.$emit("cancleFn", param);
        },
    },
};
</script>

<style>
</style>
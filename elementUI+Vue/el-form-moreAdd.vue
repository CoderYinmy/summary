<template>
    <div class="ns-dict-dialog-wrapper">
        <div v-for="(form, i) in forms" :key="i">
            <el-form
                ref="form"
                :rules="rules"
                :model="forms[i]"
                label-width="120px"
            >
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item label="字典明细名称" prop="codeName">
                            <el-input v-model="forms[i].codeName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item label="字典明细编码" prop="dictCode">
                            <el-input
                                v-model="forms[i].dictCode"
                            ></el-input> </el-form-item
                    ></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item label="字典明细值" prop="codeValue">
                            <el-input
                                v-model="forms[i].codeValue"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="6">
                        <el-button @click="onAddFormClickHandle"
                            >添加</el-button
                        >
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item label="排序" prop="sort">
                            <el-input
                                v-model="forms[i].sort"
                            ></el-input> </el-form-item
                    ></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item label="描述" prop="remarks">
                            <el-input
                                v-model="forms[i].remarks"
                            ></el-input> </el-form-item
                    ></el-col>
                </el-row>
            </el-form>
        </div>

        <div>
            <el-button @click="onSubmit('form')">确定</el-button>
            <el-button @click="onSubmitCancel('form')">取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "NsDictAddDialog",
    data() {
        return {
            forms: [
                {
                    codeName: "",
                    dictCode: "",
                    codeValue: "",
                    sort: "",
                    remarks: ""
                }
            ],
            rules: {
                codeName: [
                    {
                        required: true,
                        message: "字典名称不能为空",
                        trigger: "blur"
                    }
                ],
                dictCode: [
                    {
                        required: true,
                        message: "字典编码不能为空",
                        trigger: "blur"
                    }
                ],
                codeValue: [
                    {
                        required: true,
                        message: "字典项值不能为空",
                        trigger: "blur"
                    }
                ],
                sort: [
                    {
                        required: true,
                        message: "排序不能为空",
                        trigger: "blur"
                    }
                ],
                remarks: [
                    {
                        required: true,
                        message: "描述不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        onAddFormClickHandle() {
            this.forms.push({
                codeName: "",
                dictCode: "",
                codeValue: "",
                sort: "",
                remarks: ""
            });
        },
        onSubmit() {
            let self = this;
            let { forms } = this;
            let proms = [];
            for (let i = 0, il = forms.length; i < il; i++) {
                let form = forms[i];
                let f = this.$refs["form"][i];

                let prom = new Promise((resolve, reject) => {
                    f.validate(valid => {
                        if (valid) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });

                proms.push(prom);
            }

            Promise.all(proms)
                .then(res => {
                    // TODO: 提交表单
                    console.log("success");
                    this.$emit("submit", this.forms);
                })
                .catch(err => {
                    // TODO: 处理错误
                    console.log("fail");
                });
        },
        onSubmitCancel(formName) {
            this.$emit("close");
            // this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="scss">
.ns-dict-dialog-wrapper {
    .el-form-item {
        margin-bottom: 20px;
    }
}
</style>
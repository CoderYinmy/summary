<template>
    <div class="ns-table">
        <el-form ref="form" :model="form" :rules="form.rules">
            <el-table :data="form.params">
                <el-table-column label="字典项名称">
                    <template slot-scope="scope">
                        <el-form-item
                            :prop="'params.' + scope.$index + '.codeName'"
                            :rules="form.rules.codeName"
                            class="tipCode"
                        >
                            <el-input v-model="scope.row.codeName"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="字典项编码">
                    <template slot-scope="scope">
                        <el-form-item
                            :prop="'params.' + scope.$index + '.dictCode'"
                            :rules="form.rules.dictCode"
                            class="tipCode"
                        >
                            <el-input v-model="scope.row.dictCode"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="字典项值">
                    <template slot-scope="scope">
                        <el-form-item
                            :prop="'params.' + scope.$index + '.codeValue'"
                            :rules="form.rules.codeValue"
                            class="tipCode"
                        >
                            <el-input v-model="scope.row.codeValue"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="排序">
                    <template slot-scope="scope">
                        <el-form-item
                            :prop="'params.' + scope.$index + '.sort'"
                            :rules="form.rules.sort"
                            class="tipCode"
                        >
                            <el-input
                                maxlength="5"
                                min="1"
                                v-model="scope.row.sort"
                                onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"
                            ></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="备注">
                    <template slot-scope="scope">
                        <el-form-item
                            :prop="'params.' + scope.$index + '.remarks'"
                            :rules="form.rules.remarks"
                            class="tipCode"
                        >
                            <el-input v-model="scope.row.remarks"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="新增">
                    <template slot-scope="scope">
                        <el-button @click="onClickHandle(scope.$index)"
                            >添加</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <div class="footer">
            <el-button @click="onSubmitHandle('form')">提交</el-button>
            <el-button @click="onCancelHandle('form')">取消</el-button>
        </div>
    </div>
</template>

<script>
/**
 * 应用到了
 * 1. 多维表单的校验 https://element.eleme.cn/#/zh-CN/component/form 中 -> 动态增减表单项
 * 2. 动态改变表单的 prop & rules https://www.cnblogs.com/midnight-visitor/p/12409805.html
 * 3. 表格中的 scope 属性
 */
export default {
    name: "HelloWorld",
    props: {
        msg: String
    },
    data() {
        return {
            form: {
                params: [
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
                            message: "请输入字典名称",
                            trigger: "blur"
                        }
                    ],
                    dictCode: [
                        {
                            required: true,
                            message: "请输入字典编码",
                            trigger: "change"
                        }
                    ],
                    codeValue: [
                        {
                            required: true,
                            message: "请输入字典值",
                            trigger: "change"
                        }
                    ],
                    sort: [
                        {
                            required: true,
                            message: "请输入字典排序",
                            trigger: "change"
                        }
                    ],
                    remarks: [
                        {
                            required: true,
                            message: "请输入字典备注",
                            trigger: "change"
                        }
                    ]
                }
            }
        };
    },
    methods: {
        /**
         * 点击添加按钮
         * @param {number} index The index is which button was clicked
         * @return {undefined} No returns
         */
        onClickHandle(index) {
            this.form.params.push({
                codeName: "",
                dictCode: "",
                codeValue: "",
                sort: "",
                remarks: ""
            });
        },
        /**
         * 点击上传按钮
         * @return {undefined} No returns
         */ onSubmitHandle(form) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    // TODO 校验成功的逻辑
                    console.log(this.form.params);
                    this.$emit("submit", this.form.params);
                    this.form.params = [
                        {
                            codeName: "",
                            dictCode: "",
                            codeValue: "",
                            sort: "",
                            remarks: ""
                        }
                    ];
                } else {
                    // TODO 检验失败的逻辑
                    console.log("fail");
                }
            });
        },
        onCancelHandle(form) {
            this.$emit("close");
            this.form.params = [
                {
                    codeName: "",
                    dictCode: "",
                    codeValue: "",
                    sort: "",
                    remarks: ""
                }
            ];
        }
    }
};
</script>
<style scoped>
.ns-table {
    width: 100%;
}
.tipCode {
    height: 60px;
}
.footer {
    margin: 10px auto;
    text-align: center;
}
</style>
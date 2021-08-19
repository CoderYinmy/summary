<template>
    <div>
        <el-form
            :model="passwordANumberModel"
            :rules="rulesForm"
            ref="passwordAccountForm"
            class="mata-form"
        >
            <!-- <el-form-item label="原密码"  label-width="80px" prop="oldPassword">
                <el-input v-model="passwordANumberModel.oldPassword" maxlength="16" type="password" style="width: 320px"></el-input>
            </el-form-item> -->
            <el-form-item label="新密码" prop="password" label-width="80px">
                <el-input
                    v-model="passwordANumberModel.password"
                    @input="handleEditNewPassword"
                    :minlength="passwordRuleData.minLenght"
                    :maxlength="passwordRuleData.maxLenght"
                    placeholder="请输入新密码"
                    type="password"
                    style="width: 320px"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="确认密码"
                label-width="80px"
                prop="comfirmPassword"
            >
                <el-input
                    v-model="passwordANumberModel.comfirmPassword"
                    :minlength="passwordRuleData.minLenght"
                    :maxlength="passwordRuleData.maxLenght"
                    placeholder="请再次输入密码"
                    type="password"
                    style="width: 320px"
                ></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        let this_ = this;
        //此处即表单发送之前验证,验证新密码和原密码是否一样
        var validateNewPassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入新密码"));
            }
            let message = verifyPassword(this_.passwordRuleData, value);
            if (message !== undefined) {
                callback(new Error(message));
            } else {
                callback();
            }
        };
        //此处即表单发送之前验证，验证新密码和确认密码是否一致
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.passwordANumberModel.password) {
                callback(new Error("与新密码不一致"));
            } else {
                callback();
            }
        };
        return {
            passwordANumberModel: {
                id: "",
                oldPassword: "",
                password: "",
                comfirmPassword: "",
            },
            rulesForm: {
                password: [
                    {
                        required: true,
                        message: "请设置新密码",
                        trigger: "blur",
                    },
                    { validator: validateNewPassword, trigger: "blur" },
                ],
                comfirmPassword: [
                    {
                        required: true,
                        message: "请再次输入密码",
                        trigger: "blur",
                    },
                    { validator: validatePass2, trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        //获取密码校验标准
        getPasswordRule() {
            UserManagerService.passwordVerifiers()
                .then((res) => {
                    if (res.code == 0) {
                        this.passwordRuleData = res.data;
                    }
                })
                .catch((err) => {});
        },
    },
};
</script>

<style>
</style>
<template>
    <div class="uploadImg">
        <!-- <div class="uploadImg_tit">图标</div> -->
        <div class="uploadImg_img">
            <template v-if="imgDefault">
                <img :src="'data:image/jpg;base64,' + currentImg" />
            </template>
            <!-- <template v-else>
                <img :src="currentSource" />
            </template> -->

            <el-button size="small" class="uploadBtn" @click="onFileSubmit">
                上传图标
            </el-button>
            <!-- 限制前端上传格式 -->
            <div slot="tip" class="el-upload__tip">只能上传jpg/gif/png格式文件</div>
            <input
                style="display: none"
                ref="fileInput"
                type="file"
                @change="onFileChangeHandler"
            />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        imgDefault: String
    },
    data() {
        return {
            currentSource: "",
            picFormData: null,
            currentImg: ""
        };
    },
    watch: {
        imgDefault: {
            immediate: true, // 很重要！！！
            handler(val) {
                this.currentImg = val;
            }
        }
    },
    mounted() {
        this.currentImg = this.imgDefault;
    },
    methods: {
        //选择图片
        onFileSubmit() {
            this.$refs.fileInput.click();
        },
        //监听图片改变
        onFileChangeHandler(event) {
            let self = this;
            /* 获取到你选择的文件 */
            let file = this.$refs.fileInput.files[0];
            /* 限制文件上传类型 */
            let suffixName = file.name.substring(file.name.lastIndexOf('.') + 1);   /* 得到文件后缀名 */
            if (suffixName !== 'jpg' && suffixName !== 'gif' && suffixName !== 'png' ) {
                this.$message.warning("上传文件只能是 jpg、gif、png 格式!");
                return;
            }
            /* 限制文件上传大小 */
            let isLtSize = file.size / 1024 / 1024 < 10;
            if (!isLtSize) {
                this.$message.warning("上传文件不能超过 10MB!");
                return;
            }
            
            let fileReader = new FileReader();

            fileReader.onload = function(e) {
                self.currentSource = e.target.result;
                // self.currentSource = e.currentTarget.result;
            };

            fileReader.readAsDataURL(file);
            self.currentImg = "";
            let formData = new FormData();
            formData.append("file", file);
            // this.picFormData = formData;
            this.$emit("formData", formData);
        }
    }
};
</script>
<style scoped>
.uploadImg {
    display: flex;
    /* margin-bottom: 20px; */
}
.uploadImg_tit {
    width: 80px;
    text-align: center;
}
.uploadImg_img img {
    display: inline-block;
    min-width: 100px;
    height: 80px;
    border: 1px solid #ccc;
    vertical-align: bottom;
}
.uploadBtn {
    background: #099778;
    opacity: 0.8;
    color: #fff;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
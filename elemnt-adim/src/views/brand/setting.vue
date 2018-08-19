<template>
  <div class="component">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item v-show="false" label="品牌ID：" prop="brandId">
        <el-input v-model="form.brandId"></el-input>
      </el-form-item>
      <el-form-item label="品牌名称：" prop="name">
        <el-input v-model="form.name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO：" prop="logo">
        <el-upload v-model="form.logo"
          name="image"
          class="avatar-uploader"
          :action="uploadImageUrl"
          :show-file-list="false"
          :on-success="handleLogoSuccess"
          :before-upload="beforeLogoUpload">
          <img v-if="form.logo" :src="form.logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="品牌介绍" prop="descriptionImgUrl">
        <el-upload
          name="image"
          class="avatar-uploader"
          :action="uploadImageUrl"
          :show-file-list="false"
          :on-success="handleDescSuccess">
          <img v-if="form.descriptionImgUrl" :src="form.descriptionImgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
  import api from '../../api/index'

  export default {
    name: 'index',
    data() {
      return {
        uploadImageUrl: api.url + '/api/pcadmin/common/uploadImage',
        form: {
          brandId: '',
          name: '',
          logo: '',
          descriptionImgUrl: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          logo: [
            { required: true, message: '请上传品牌LOGO', trigger: 'change' }
          ],
          descriptionImgUrl: [
            { required: true, message: '请上传品牌介绍', trigger: 'change' }
          ]
        }
      }
    },
    components: {},
    computed: {},
    methods: {
      handleLogoSuccess(res, file) {
        this.form.logo = res.data
      },
      beforeLogoUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 1
        if (!isJPG) {
          this.$message.error('上传LOGO图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传LOGO图片大小不能超过 1MB!')
        }
        return isJPG && isLt2M
      },
      handleDescSuccess(res, file) {
        this.form.descriptionImgUrl = res.data
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false
          } else {
            this.doHandler()
          }
        })
      },
      async doHandler() {
        // alert(this.form.brandId)
        if (this.form.brandId && this.form.brandId > 0) {
          await api.brandUpdate(this.form)
          this.$alert('品牌资料修改成功', '提示')
        } else {
          const json = await api.brandAdd(this.form)
          // alert(json.data)
          this.form.brandId = json.data.brandId
          this.$alert('添加成功', '提示')
        }
      },
      async init() {
        const json = await api.brandPicture(this.form)
        this.form.brandId = json.data.brandId
        this.form.name = json.data.name
        this.form.logo = json.data.logo
        this.form.descriptionImgUrl = json.data.descriptionImgUrl
      }
    },
    created: function() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .component {
    margin: 15px;
    padding: 15px;
    background: #fff;
  }

  .feel-input {
    width: 248px;
    margin-right: 20px;
    margin-left: 10px;
  }

  .time-input {
    width: 140px;
    .el-date-editor.el-input {
      width: 100%;
    }
  }

  li {
    float: left;
    padding: 0 10px;
    cursor: pointer;
    color: #666;
    &.xs, &:hover {
      color: #3096f8;
    }
  }
</style>

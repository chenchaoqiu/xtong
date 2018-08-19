<template>
  <div class="login-container">
    <img src="@/images/dlbs.png" alt="">
<!--找回密码1-->
    <el-form v-if="zhaohui" class="login-form" autoComplete="off" :model="loginForm" ref="loginForm" label-position="left">

      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input maxlength="11" name="username" type="text" v-model="loginForm.username" autoComplete="off" placeholder="请输入注册时的手机号"
        />
      </el-form-item>
      <div style="overflow: hidden">
        <el-form-item prop="username" style="width: 65%;float: left">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="yzm" />
        </span>
          <el-input maxlength="5" name="username" type="text" v-model="loginForm.validateVal" autoComplete="off" placeholder="图形验证码"
          />
        </el-form-item>
        <img @click="validate" style="float: right;width: 30%;height: 51px;margin-top: 0px;" :src="loginForm.validate" >
      </div>
      <div style="overflow: hidden">
        <el-form-item prop="username" style="width: 65%;float: left">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="yzm" />
        </span>
          <el-input maxlength="4" name="username" type="text" v-model="loginForm.getPwdMobileVal" autoComplete="off" placeholder="短信验证码"
          />
        </el-form-item>
        <el-button @click="getPwdMobileCode" type="primary" style="width:30%;height: 51px;float: right;" :loading="loading">获取验证码</el-button>
      </div>
      <el-button @click="findPass" type="primary" style="width:100%;margin-bottom:20px;height: 51px;" :loading="loading">找回密码</el-button>
    </el-form>
<!--找回密码2-->
    <el-form v-else class="login-form" autoComplete="off" :model="loginForm" ref="loginForm" label-position="left">

      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password" />
        </span>
        <el-input maxlength="8" name="password" type="password" v-model="loginForm.password" autoComplete="off" placeholder="请输入6-8位新密码"
        />
      </el-form-item>
      <el-button @click="setNewPass" type="primary" style="width:100%;margin-bottom:20px;height: 51px;" :loading="loading">设置新密码</el-button>
    </el-form>
  </div>
</template>

<script>
import api from '../../api/index'

export default {
  name: 'pass',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        validateVal: '',
        validateCodeKey: '',
        validate: '',
        getPwdMobileVal: '',
        getPwdMobileKey:''
      },
      loading: false,
      zhaohui:true,
      ck:{close(){}},/*弹窗监控*/
    }
  },
  methods: {
    async getValidateCodeKeys(){
       const json = await api.getValidateCodeKey({});
       this.loginForm.validateCodeKey = json.data;
       this.loginForm.validate=api.url+'/api/validateCode?key='+json.data;
    },
    async sendForgetPwdMobileCode(){
      const json = await api.sendForgetPwdMobileCode({
        mobile:this.loginForm.username,
        validateCodeKey:this.loginForm.validateCodeKey,
        validateCode:this.loginForm.validateVal
      });
      if(json.imei_error_code==0){
        this.$message({message:'验证码已发送',type:'success'});
      }
    },
    async validateForgetPwdMobileCode(){
      const json = await api.validateForgetPwdMobileCode({
        mobile:this.loginForm.username,
        mobileCode:this.loginForm.getPwdMobileVal
      });
      if(json.imei_error_code==0){
        this.loginForm.getPwdMobileKey=json.data;
        this.zhaohui=false;
      }
    },
    async resetPassword(){
        /*设置新密码*/
      const json = await api.resetPassword({
        mobile:this.loginForm.username,
        password:this.loginForm.password,
        resetPasswordKey:this.loginForm.getPwdMobileKey,
      });
      if(json.imei_error_code==0){
        this.$alert('密码修改成功！', '', {
          confirmButtonText: '确定',
          type:'success',
          callback: action => {
            this.$router.push({ path: '/login' })
          }
        });
      }
    },
    validate(){
        /*点击图形验证码key*/
      this.getValidateCodeKeys();
    },
    getPwdMobileCode(){
        /*获取手机验证码*/
        this.ck.close();
      if(this.loginForm.username.length!=11){this.ck=this.$message({message:'手机号码输入错误！',type:'error'});return;}
      if(this.loginForm.validateVal.length!=5){this.ck=this.$message({message:'图形验证码输入错误！',type:'error'});return;}
      this.sendForgetPwdMobileCode();
    },
    findPass(){
        /*找回密码*/
      this.ck.close();
      if(this.loginForm.username.length!=11){this.ck=this.$message({message:'手机号码输入错误！',type:'error'});return;}
      if(this.loginForm.getPwdMobileVal.length!=4){this.ck=this.$message({message:'手机验证码输入错误！',type:'error'});return;}
        this.validateForgetPwdMobileCode();
    },
    setNewPass(){
      /*设置新密码*/
      this.ck.close();
      if(this.loginForm.username.length!=11){this.ck=this.$message({message:'手机号码输入错误！',type:'error'});return;}
      if(this.loginForm.password.length<6){this.ck=this.$message({message:'新密码输入错误！',type:'error'});return;}
      if(!this.loginForm.getPwdMobileKey){this.ck=this.$message({message:'请验证手机号码！',type:'error'});return;}
        this.resetPassword();
    }
  },
  mounted:function () {
    /*mounted*/
    this.getValidateCodeKeys();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

img{
  display: block;
  margin:20vh auto 0;
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #222;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #ffffff;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background:url("../../images/bj.jpg");
  background-size:100% 100%;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 0px 35px 15px 35px;
    margin: 46px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>

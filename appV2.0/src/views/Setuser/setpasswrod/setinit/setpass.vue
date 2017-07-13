<template>
  <div>
    <i-header title='密码设置'></i-header>
      <div class="userpass">
        <div>
          <span>手机号：</span>
          <input type="text" placeholder="请输入手机号" maxlength="11" />
          <button type="button">获取验证码</button>
        </div>
        <div>
          <span>验证码：</span>
          <input type="text" placeholder="请输入验证码" />
        </div>
      </div>
      <div class="userpass">
        <div>
          <span>设置新密码：</span>
          <input type="password" placeholder="请输入6位数字密码" />
        </div>
        <div>
          <span>确认新密码：</span>
          <input type="password" placeholder="请再次输入支付密码" />
        </div>
      </div>
  </div>
</template>

<script>
  import iHeader from '../../../../components/i-header'
  export default {
    data(){
      return {

      }
    },
    methods: {

    },
    created(){

    },
    components: {
      iHeader
    }
  }
</script>

<style lang='less' rel="stylesheet/less" scoped>
    .userpass{
        line-height: 45px;
        background: #fff;
        font-size: 16px;
        margin-top: 10px;
    }
    .userpass div{
        margin:0 15px;
        border-top:1px solid #e5e5e5;
        overflow: hidden;
    }
    .userpass div:first-child{
      border:none;
    }
    .userpass span{
        float: left;
    }
    .userpass input{
        float: left;
        font-size:16px;
        border:none;
        outline: none;
        height:25px;
        margin:10px 10px;
    }
    .userpass button{
        float: right;
        width:75px;
        height:27px;
        border:none;
        outline:none;
        background: #fa597e;
        -webkit-border-radius:20px;
        -moz-border-radius:20px;
        border-radius:20px;
        font-size:12px;
        color:#fff;
        margin:9px 0;
    }
</style>

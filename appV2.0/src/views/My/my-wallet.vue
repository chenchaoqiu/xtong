<template>
  <div class="wall-bg">
    <!--公共头部-->
    <div class="i-header">
      <header class="tohop_head container">
        <div class="text-center">
          <!--<a onclick="window.history.go(-1)" href="javascript:;" class="fl arrows"></a><span v-text="title"></span>-->
          <a @click="goback" href="javascript:;" class="fl arrows"></a><span>我的钱包</span>
          <router-link to="billingRecord" class="fr" style="color: #000;font-size: 14px">明细</router-link>
        </div>
      </header>
    </div>
    <div class="container wall-box">
      <div><img src="../../../static/images/Profit.png" width="30" height="30"> 我的余额（元）</div>
      <div><span class="wall-ye">{{msg.data.money?msg.data.money :'0'}}</span></div>
    </div>

    <a href="" class="rech-btn tc">
      充值
    </a>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getBalance} from  '../../api'
  export default {
    data(){
      return {
        msg: ''
      }
    },
    methods: {
      goback() {
        this.$store.dispatch('goBack')// 发送后退的状态
        // 后退
        this.$router.go(-1)
      },
      getBalance(){
        this.$http.get(getBalance()).then(res => {
          this.msg = res.data
        })
      }
    },
    created(){
      this.getBalance()
    }
  }
</script>

<style lang='less' rel="stylesheet/less" scoped>
  header {
    /*background-color: none;*/
    height: 46px;
    text-align: center;
    font-size: 18px;
    .text-center {
      height: 100%;
      line-height: 46px;
      color: #d2516d;
      span:last-child {
        line-height: 46px;
      }
      .arrows {
        margin-top: 14px;
        vertical-align: middle;
      }
    }
  }

  // 钱包背景
  .wall-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(../../../static/images/wall-bg.png) no-repeat;
    background-size: 100%;
    .rech-btn {
      width: 92%;
      height: 45px;
      display: inline-block;
      background: #e66280;
      border-radius: 5px;
      color: #fff;
      margin: 50% auto;
      line-height: 45px;
      font-size: 18px;
      text-align: center;
      margin-left: 15px;
      margin-right: 15px;
      margin-bottom: 0;
    }
  }

  // 钱包余额
  .wall-box {
    text-align: center;
    margin: 120px auto;
    font-size: 16px;
    .wall-ye {
      font-size: 26px;
      color: #e66280;
    }
  }


</style>

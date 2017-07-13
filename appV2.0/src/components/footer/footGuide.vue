<template>
  <!--公共底部组件-->
  <div>
    <!--底部-->
    <div class="pf footr_box">
      <section @click='gotoAddress("/index/home")'>
        <span><img
          :src="$route.path.indexOf('home') !== -1 ? './static/images/b-homea.png':'./static/images/b-home.png'"></span>
        <span class="text" :class="{activeCol:$route.path.indexOf('home') !== -1 ? true : false}">首页</span>
      </section>
      <section @click='gotoAddress("/index/information")'>
        <span><img
          :src="$route.path.indexOf('information') !== -1 ? './static/images/b-zxa.png': './static/images/b-zx.png'"></span>
        <span class="text" :class='{activeCol:$route.path.indexOf("information") !== -1 ? true : false}'>资讯</span>
      </section>
      <section @click='gotoAddress("/index/shop")'>
        <span><img
          :src="$route.path.indexOf('shop') !== -1 ? './static/images/b-ma.png': './static/images/b-m.png'"></span>
        <span class="text" :class='{activeCol:$route.path.indexOf("shop") !== -1 ? true : false}'>门店</span>
      </section>
      <section @click='gotoAddress("/index/my")'>
        <span><img
          :src="$route.path.indexOf('my') !== -1 ? './static/images/b-mya.png': './static/images/b-my.png'"></span>
        <span class="text" :class='{activeCol:$route.path.indexOf("my") !== -1 ? true : false}'>我的</span>
      </section>
    </div>

  </div>
</template>

<script>
  export default {
    methods: {
      gotoAddress(path) {
        this.$router.push(path)
      }
    }
  }

</script>

<style lang='less' rel='stylesheet/less' scoped>
  /*底部样式*/

  .footr_box {
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    background: #fff;
    z-index: 100;
    display: flex;
    box-shadow: 0 0.06rem 0.06rem rgba(0, 0, 0, .5);
    section {
      flex: 1;
      flex-direction: column;
      display: flex;
      align-items: center;
      text-align: center;
      padding-top: 6px;
      > span:first-child {
        display: block;
        width: 27px;
      }
      img {
        width: 100%;
      }
    }
  }

  .activeCol {
    color: #d1506d;
  }

  .text {
    font-size: 12px;
  }
</style>




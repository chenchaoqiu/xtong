<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <!--<div class='view'>-->
    <!--<transition name='fade'>-->
    <transition :name="transitionName">
      <!--<keep-alive>-->
      <router-view class="child-view"></router-view>
      <!--</keep-alive>-->
    </transition>
    <!--</div>-->

  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'
  import {Loading} from 'vux'
  export default {
    data() {
      return {
        bottomNav: 'movies',
        bottomNavColor: 'movies',
        transitionName: 'vux-pop-in' // 动画
      }
    },
    methods: {
      handleChange(val) {
        this.bottomNav = val
      },
      // 切换动画
      tooge() {
        if (this.goBack) { // 如果状态是false 那么是后退
          this.transitionName = 'vux-pop-out';
          this.$store.dispatch('noBack')
        } else {
          this.transitionName = 'vux-pop-in'
        }
      }

    },
    components: {
      Loading
    },
    computed: {
      ...mapState({
        isLoading: state => state.vux.isLoading,
        goBack: state => state.mutations.goBack
      })
    },

    created() {
      console.log(this.isLoading);
      console.log(this.goBack);
      // 当created函数时监测路由信息,防止页面刷新tab高亮错误
      // var tmpArr = this.$route.path.split('/')
      // this.handleChange(tmpArr[1])
      // 防止在index页刷新时底部显示
      // var path = this.$route.path.substring(1)
      // this.footerChange(path)
    },
    watch: {
      $route(to) {
        this.tooge()
      }
    },


  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '~vux/src/styles/1px.less';
  // 动画
  .child-view {
    // position: absolute;
    //  // transition: all .3s cubic-bezier(.55, 0, .1, 1);
    /*transition: all .3s cubic-bezier(.55, 0, .1, 1);*/
    width: 100%;
  }

  .vux-toast {
    font-size: large;
  }

  .weui-toast {
    font-size: large;
  }

  /*动画*/

  /*.fade-enter-active {*/
  /*transition: opacity .3s;*/
  /*}*/

  /*.fade-enter,*/
  /*.fade-leave-active {*/
  /*opacity: 0;*/
  /*}*/

  /*.slide-left-enter,*/
  /*.slide-right-leave-active {*/
  /*opacity: 0;*/
  /*-webkit-transform: translate(350px, 0);*/
  /*transform: translate(350px, 0);*/
  /*}*/

  /*.slide-left-leave-active,*/
  /*.slide-right-enter {*/
  /*opacity: 0;*/
  /*-webkit-transform: translate(-50px, 0);*/
  /*transform: translate(-50px, 0);*/
  /*}*/

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    -webkit-transition: all 500ms;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
    -webkit-perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    -webkit-transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    -webkit-transform: translate3d(-100%, 0, 0);
  }

</style>

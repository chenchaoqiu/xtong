<!--主页-->
<template>
  <div>
    <!--位置-->
    <!--<div class="position" v-show='showHeader'>-->
    <!--<mu-appbar :title="positionMsg?positionMsg:'广州市'">-->
    <!--<mu-icon-button icon='search' slot="left"/>-->
    <!--<mu-icon-button icon='expand_more' slot="right"/>-->
    <!--</mu-appbar>-->
    <!--</div>-->

    <keep-alive>
      <transition name="fade">
        <router-view class="index-view"></router-view>
      </transition>
    </keep-alive>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import footGuide from '../../components/footer/footGuide'
  import {setStore} from '../../utils/mUtils.js'
  export default {
    data() {
      return {
        activeTab: 'recommend',
        //        位置
        positionMsg: '',
      }

    },

    computed: mapGetters([
      // 监测头部
      'showHeader'
    ]),
    methods: {
      //        tab切换
      handleTabChange(val) {
        this.activeTab = val;
        // 拼接url
        this.$router.push({path: '/index/' + val})
      },
      //      头部显示隐藏
      handChange(path) {
        if (path != 'recommend') {
          //发送状态  如果不等于  recommend 就要隐藏
          this.$store.dispatch('hideHeader')
        } else {
          this.$store.dispatch('showHeader')
        }
      },
      //      推荐变成返回箭头
      arrowsChange() {
        var changeContent = document.querySelector('.mu-tab-text');
        changeContent.innerHTML = `<span class="arrows"></span>`
      },
      arrowsReturn() {
        var changeContent = document.querySelector('.mu-tab-text');
        changeContent.innerHTML = "推荐"
      },
    },
    created() {
      // this.getpositionMsg()
    },
    // watch函数监测路由的变化,保持tab面板的高亮位置正确
    watch: {
//      '$route'(to, from) {
//        const path = to.path
//        var tmpArr = path.split('/')
//        if (tmpArr[1] === 'index') {
//          this.handleTabChange(tmpArr[2])
//          // 推荐改变
//          if (tmpArr[2] !== 'recommend') {
//            this.arrowsChange()
//          } else {
//            this.arrowsReturn()
//          }
//
//        }
//        // 截取第二个参数 如果不等于recommend 就隐藏头部和底部    整个app中 只有当  path === '/index/recommend' 的时候才有定位头部
//        this.handChange(tmpArr[2])
//      }
    },
    mounted() {
      // 当函数时监测路由信息,防止页面刷新tab高亮错误
//      var tmpArr = this.$route.path.split('/')
//      if (tmpArr[1] === 'index') {
//        this.handleTabChange(tmpArr[2])
//        // 解决刷新时检测不到状态
//        if (tmpArr[2] != 'recommend') {
//          this.$store.dispatch('hideHeader')
//          this.arrowsChange(); // 变成箭头
//        } else {
//          this.arrowsReturn();// 变成推荐
//        }
//      }


    },
    components: {
      footGuide
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @color: #d1506d;
  .mu-appbar {
    background: #fff;
    color: @color;
    height: 44px;
  }
.index-view{
  margin-bottom:70px;
}
  .view-tabs {
    background-color: rgb(247, 247, 247); // background-color: #fff;
    color: rgba(0, 0, 0, .87);
    height: 46px;
    display: flex;
    > .mu-tab-link {
      color: rgba(102, 102, 102, 1);
      flex: 1;
      width: 20%;
    }
    > .mu-tab-active {
      color: @color;
    }
  }

  .fade-enter-active {
    transition: opacity .3s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>

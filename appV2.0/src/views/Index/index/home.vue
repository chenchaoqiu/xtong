<template>
  <!--首页-->
  <div class="recommend">
    <!--轮播图-->
    <div style="" class="swiper-box">
      <swiper :options="swiperOption">
        <swiper-slide v-for='(item,i) in msgs.data' :key='i'>
          <a :href="item.href">
            <img :src="item.pic" class="banner-item" :alt="item.name">
          </a>
        </swiper-slide>
        <div v-if='msgs' class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!--美容  预约 -->
    <!--<div class="im_door container">-->
    <!--<mu-flexbox>-->
    <!--<mu-flexbox-item class="flex-demo">-->
    <!--<router-link class="serve first-a" to='#' @click.native="open">-->
    <!--<span></span><i>美容师上门</i>-->
    <!--</router-link>-->
    <!--</mu-flexbox-item>-->
    <!--<mu-flexbox-item class="flex-demo">-->
    <!--<router-link class="serve" to='/appointmentShop'>-->
    <!--<span class="last-store"></span><i>预约到店</i>-->
    <!--</router-link>-->
    <!--</mu-flexbox-item>-->
    <!--</mu-flexbox>-->
    <!--</div>-->
    <!--美容  预约 -->

    <!--套餐流程-->
    <!--<div class="container im_package clearfix">-->
    <!--<div class="im_padd fl">-->
    <!--<router-link to="/setCourse">-->
    <!--<img class="img-responsive center-block" src="../../../../static/images/package011.png"/>-->
    <!--</router-link>-->
    <!--</div>-->
    <!--<div class="right-img">-->
    <!--<div class="img-top">-->
    <!--<router-link to="/index/facialBeauty">-->
    <!--<img class="img-responsive center-block" src="../../../../static/images/package02.png"/>-->
    <!--</router-link>-->
    <!--</div>-->
    <!--<div class="img-bottom">-->
    <!--<router-link to="/index/plastic">-->
    <!--<img class="img-responsive center-block" src="../../../../static/images/package03.png"/>-->
    <!--</router-link>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--套餐流程end-->

    <!--热门项目 接收一个对象-->
    <!--<hot-project :hotmsgs='hotmsgs'></hot-project>-->
    <!--&lt;!&ndash;美容师上门弹出层&ndash;&gt;-->
    <!--<div>-->


    <i-tab></i-tab>
    <div style="height: 10px;background: #f3f3f3"></div>
    <!--爱美宝典-->
    <div class="love-mei">
      <div class="container">
        <!--标题-->
        <p class="title"><span class="t1" style="">爱美宝典</span>
          <router-link to="/" style="color: #666" class="fr">All>></router-link>
        </p>
      </div>
      <i-infor class="vux-1px-b"></i-infor>
      <i-infor class="vux-1px-b"></i-infor>
      <i-infor></i-infor>


    </div>

    <!--门店地图-->
    <div class="store-mei">
      <p class="title container" style="height: 40px;line-height: 40px">
        <span class="t1" style="color: #ff4946">门店地图</span>
        <router-link to="/" style="color: #666" class="fr">All>></router-link>
      </p>
      <!--门店地图-->
      <div class="stores-map">
        <div class="store-box">
          <div>
            <router-link to="/">
              <div class="store-img"><img src="../../../../static/images/fa_con.png" alt=""></div>
              <div class="store-name">艾菲芭骏景北苑会所</div>
              <div class="store-start">
                <x-icon class="fl" type="ios-star" size="20" style="fill:#e66c49;"></x-icon>
                <x-icon class="fl" type="ios-star" size="20" style="fill:#e66c49;"></x-icon>
                <x-icon class="fl" type="ios-star" size="20" style="fill:#e66c49;"></x-icon>
                <x-icon class="fl" type="ios-star" size="20" style="fill:#e66c49;"></x-icon>
                <x-icon class="fl" type="ios-star" size="20" style="fill:#e66c49;"></x-icon>
                <span class="fl">顶级</span>

              </div>
              <div class="store-ads pr">
                <span>广州天河区珠江新城affsdasfasffffffsa</span>
                <span class="fr" style="right: 0;">2.5km</span>
                <x-icon type="ios-location-outline" size="20" style="fill:#70d4e1;float: right;"></x-icon>
              </div>
            </router-link>
          </div>
          <div style="width:auto;margin: 0;">
            <router-link to="/" style=""> <!--查看全部组件-->
              <i-all style="margin-left: 10px;"></i-all>
            </router-link>
          </div>
        </div>

      </div>
    </div>
    <div style="height: 10px;background: #f3f3f3"></div>
    <!--当季分享-->
    <div class="recommend-mei">
      <p class="title container" style="height: 40px;line-height: 40px">
        <span class="t1" style="color: #c05cff">当季推荐</span>
        <router-link to="/" style="color: #666" class="fr">All>></router-link>
      </p>

      <div class="recommend-box">
        <div class="recommend-item">
          <div class="vux-1px" style="width: 125px;height: 100px;">
            <img style="width: 100%;height: 100%" src="../../../../static/images/fa_con.png"
                 alt=""></div>
          <div style="color: #333;font-size: 15px">背部热石护理</div>
          <div style="color: #fd7474;font-size: 13px">￥168</div>
        </div>
        <!--查看全部组件-->
        <i-all style="margin-left: 10px;"></i-all>
      </div>
    </div>
    <!--私人订制banner-->
    <div class="container private-banner">
      <div><img src="../../../../static/images/private-banner.png" alt=""></div>
    </div>
    <!--热门项目-->
    <div class="hot-mei">
      <div class="title vux-1px-b">- 热门项目 -</div>
      <div class="hot-item container clearfix">
        <div class="hot-img-box vux-1px fl"><img src="" alt=""></div>
        <div class="hot-msg">
          <div style="font-size: 15px">超级无敌补水疗程</div>
          <div class="pr" style="margin-top: 5px;">
            <span style="color: #fd7474;font-size: 15px">￥398</span>
            <span style="text-decoration:line-through;color: #999">￥998</span>
            <span class="fr" style="color: #666666">2.5km</span>
            <x-icon type="ios-location-outline" size="20" style="fill:#70d4e1;" class="fr"></x-icon>
          </div>
          <div class="pic pr">
            <x-icon type="ios-clock-outline" size="20" class="icon-clok"></x-icon>
            <span class="icon-clok" style="font-size: 13px;margin-left: 3px;">30分支</span>
            <span class="pa" style="right: 0;font-size: 10px;color: #999999">313付款</span>
          </div>
          <div>
            <i-label :text="'美白哈哈'"></i-label>
            <i-label :text="'美白哈哈'"></i-label>
            <i-label :text="'美白哈哈'"></i-label>
          </div>
        </div>
      </div>


    </div>

  </div>
</template>
<script>
  //  import { XIcon } from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import hotProject from '../Recommend/hotProject.vue'
  //  标签组件
  import iLabel from '../../../components/i-label.vue'
  //  资讯列表组件
  import iInfor from '../information/chird/i-infor'
  import iTab  from './chird/tab'
  import iAll  from './chird/view-all.vue'
  import {getBanner, getHotProject} from '../../../api'
  import {Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore} from 'vux'
  export default {
    data() {
      return {
        // 轮播图
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay: 4000,
          autoplayDisableOnInteraction: false,
          loop: true
        },
        msgs: {},
        hotmsgs: {},
        dialog: false
      }
    },
    created() {
      this.getBanner();
      this.getHotProject()
    },
    methods: {
      // 轮播图请求
      getBanner() {
        this.$http.get(getBanner()).then(res => {
          this.msgs = res.data
        })
      },
      // 热门项目请求
      getHotProject() {
        this.$http.get(getHotProject()).then(res => {
          this.hotmsgs = res.data
        })

      },
      // 显示隐藏弹出层
      open() {
        this.dialog = true
      },
      close() {
        this.dialog = false
      }
    },
    components: {
      swiper,
      swiperSlide,
      hotProject,
      iTab,
      iLabel,
      iAll,
      Scroller,
      iInfor
    }

  }
</script>
<style lang="less" ref="stylesheet/less" scoped>
  // 轮播图
  .swiper-box {
    height: 6.8rem;
    a {
      display: block;
      height: 6.8rem;
      img {
        display: block;
        height: 100%;
      }
    }
  }

  .hot-mei {
    background: #fff;
    .title {
      text-align: center;
      height: 35px;
      line-height: 35px;
      font-size: 16px;
      color: #333;
    }
    .icon-clok {

      color: #6e6e6e;
    }
    .hot-item {
      padding-top: 7px;
      padding-bottom: 7px;
      border-bottom: 10px solid #f3f3f3;
      .hot-img-box {
        width: 125px;
        height: 100px;
      }
    }
    .hot-msg {
      padding-left: 13px;
      overflow: hidden;
      .pic {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
    }
  }

  /*私人订制banner*/
  .private-banner {
    height: 5.12rem;
    background: #f3f3f3;
    display: flex;
    align-items: center;
    div {
      height: 4.6rem;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

  }

  .recommend {
    width: 100%;
    .banner-item {
      width: 100%;
    }

    .im_door {
      margin-top: 10px;
      background: #fff;
      height: 76px;
      margin-bottom: 10px;
    }

    .mu-flexbox {
      height: 100%;
      .flex-demo {
        height: 100%;
        padding: 10px 0px;
      }
    }
    .first-a {
      border-right: 1px solid #ccc;
    }

    .serve {
      color: #333;
      display: block;
      line-height: 55px;
      height: 55px;

      > i {
        font-style: normal;
        overflow: hidden;
        margin-left: 5px;
      }

      > span {
        padding-top: 10px;
        float: left;
        width: 50px;
        height: 50px;
        background: url('../../../../static/images/door.png') no-repeat;
        background-size: 80%;
        margin-left: 20px;
        background-origin: content-box;
      }

      .last-store {
        background: url('../../../../static/images/store.png') no-repeat;
        background-size: 80%;
      }
    }

    /*套餐流程*/
    .im_package {
      background: #fff;
      padding-top: 15px;
      margin-bottom: 10px;

      .im_padd {
        padding-left: 0px;
        padding-right: 0px;
        width: 33.33333333333333%;
        border-right: 1px solid #CCCCCC;
      }

      .img-responsive {
        display: block;
        height: auto;
        max-width: 100%;
      }

      .right-img {
        overflow: hidden;

        .img-top {
          height: 3.2rem;
          border-bottom: 1px solid #ccc;
        }

        .img-responsive {
          height: 100%;
        }

        .img-bottom {
          height: 3.2rem;
        }
      }
    }
  }

  a {
    color: #666;
  }

  /*标题*/
  .title {
    height: 36px;
    line-height: 36px;
    .t1 {
      color: #fb849d;
      font-size: 16px;
    }
    .t1:before {
      content: '';
      display: inline-block;
      width: 15px;
      height: 14px;
      vertical-align: middle;
      margin: 0 5px 2.5px 0;
    }
  }

  .love-mei {
    background: #fff;
    margin-bottom: 10px;
    .t1:before {
      background: url("../../../../static/images/love-icon.png") no-repeat;
      background-size: cover;
    }
  }

  // 门店
  .store-mei {
    background: #fff;
    .stores-map {
      width: 100%;
    }
    .store-box {
      display: flex;
      overflow: auto;
      padding-bottom: 12px;

      > div {
        width: 180px;
        margin-left: 10px;
      }
      > div:first-child {
        margin-left: 15px;
      }
    }
    .t1:before {
      background: url("../../../../static/images/stores-icon.png") no-repeat;
      background-size: cover;
    }
    .store-img {
      width: 180px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    /*店名*/
    .store-name {
      color: #333;
      font-size: 13px;
    }
    .store-start {
      color: #e56945;
    }
    .store-ads {
      span:first-child {
        display: inline-block;
        width: 115px;
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
      }
    }
  }

  /*当前推荐*/
  .recommend-mei {
    background: #fff;
    .t1:before {
      width: 14px;
      background: url("../../../../static/images/rec-icon.png") no-repeat;
      background-size: cover;
    }
  }

  .recommend-box {
    display: flex;
    overflow: auto;
    padding-bottom: 5px;
    /*width: 1200px;*/
  }

  .recommend-item {

    margin-left: 10px;
  }

  // 标签
  /*.label {*/
  /*box-sizing: border-box;*/
  /*width: 60px;*/
  /*height: 18px;*/
  /*font-size: 13px;*/
  /*border: 1px solid #ccc;*/
  /*color: #e66280;*/
  /*line-height: 18px;*/
  /*border-radius: 9px;*/
  /*text-align: center;*/
  /*}*/
</style>

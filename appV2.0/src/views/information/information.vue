<template>
  <!--资讯首页-->
  <div class="information">
    <!--标题-->

    <i-header title="资讯" :arrow="false" style="text-align: center;position: relative">
      <router-link to="/collection" class="pa" style="font-size: 14px;color: #666;right: 15px;" slot="right">我收藏的</router-link>
    </i-header>
    <!--</div>-->
    <!--轮播图 待抽取-->
    <swiper style="height: 160px" auto loop :show-dots="false">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index"><img :src="item">
      </swiper-item>
    </swiper>
    <!--tab切换-->
    <div>
      <tab :line-width="1" custom-bar-width="62px" style="margin-bottom: 10px;">
        <tab-item selected>面部美颜</tab-item>
        <tab-item>纤体塑形</tab-item>
        <tab-item>四季养生</tab-item>
        <tab-item>光电医学</tab-item>
      </tab>
      <!--资讯列表组件-->
      <i-infor style="margin-bottom: 10px;"></i-infor>
      <i-infor style="margin-bottom: 10px;"></i-infor>
      <i-infor style="margin-bottom: 10px;"></i-infor>
      <i-infor style="margin-bottom: 10px;"></i-infor>
    </div>


  </div>

</template>
<script>
  import {Swiper, SwiperItem, Tab, TabItem} from 'vux'
  import iHeader from '../../components/i-header.vue'
  import iInfor from './chird/i-infor'
  const imgList = [
    'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
    'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
    'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
  ];
  export default {
    data(){
      return {
        demo04_list: imgList,
      }
    },
    components: {
      Swiper,
      SwiperItem,
      Tab,
      TabItem,
      iInfor,
      iHeader
    },
  }
</script>
<style scoped lang="less">

  @colf: #fff; //
  @cole6: #e66280;
  @c6: #666;
  /*标题*/
  .infor-t {
    text-align: center;
    line-height: 44px;
    height: 44px;
    background: @colf;
    div {
      color: @cole6;
      font-size: 18px;
    }
    a {
      right: 15px;
      top: 0;
      color: @c6;
      font-size: 14px;
    }
  }
</style>

<template>
  <!--当季推荐-->
  <div>
    <i-header title="当季推荐"></i-header>
    <swiper style="height: 160px" auto loop :show-dots="false">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index"><img :src="item">
      </swiper-item>
    </swiper>
    <div style="background: #fff;margin-top: 10px;">
      <project-item distance="30km"></project-item>
      <project-item distance="30km"></project-item>
      <project-item distance="30km"></project-item>
    </div>








  </div>
</template>
<script>
  import iHeader from '../../components/i-header.vue'
  import {Swiper, SwiperItem} from 'vux'
  import projectItem from '../../components/projectItem.vue'
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
      iHeader,
      projectItem
    }
  }
</script>

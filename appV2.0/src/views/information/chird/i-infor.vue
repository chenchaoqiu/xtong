<template>
  <!--资讯列表组件-->
  <div style="background: #fff">
    <!--资讯-->
    <div class="infor-item clearfix">
      <router-link to="/inforDet?id=1">
        <div class="fl infor-img vux-1px">
          <img src="../../../../static/images/fa_con.png" alt="">
        </div>
        <div class="describe pr">
          <div style="color: #333;font-size: 15px">眉毛变形记</div>
          <div style="color:#666;font-size: 13px">拒绝手残  教你好好画眉.......
            惺惺惜惺惺想寻寻寻惺
          </div>
          <div>
            <i-label class="pa" style="bottom: 0;left: 13px;" :text="'美白哈哈'"></i-label>
            <span class="pa" style="bottom: 0;right: 0;">时间</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  //  标签组件
  import iLabel from '../../../components/i-label.vue'
  export default {
    props: [],
    components: {
      iLabel
    }
  }
</script>
<style scoped lang="less">
  .infor-item {
    margin: 0px 15px;
    background: #fff;
    > a {
      display: inline-block;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }

  // 资讯图片
  .infor-img {
    width: 170px;
    height: 102px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .describe {
    overflow: hidden;
    height: 102px;
    padding-left: 13px;
  }
</style>

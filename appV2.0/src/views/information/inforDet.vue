<template>
  <div class="inforDet">
    <!--资讯详情-->
    <i-header title="资讯详情" class="pr">
      <div slot="right" class="pa" style="right: 15px;top: 4px;">
        <x-icon type="ios-upload-outline" size="24" class="a" style="stroke-width:10;"></x-icon>
        <mu-checkbox class="" uncheckIcon="favorite_border" checkedIcon="favorite" iconClass="demo-checkbox"/>
      </div>
    </i-header>
    <!--文章内容-->
    <div class="article-box mb10">
      <div class="tc">文章标题</div>
    </div>
    <!--店铺-->
    <div style="height: 100px;background: #fff" class="mb10">店铺</div>
    <div class='container'>热门资讯</div>
    <iInfor class="mb10"></iInfor>
    <iInfor class="mb10"></iInfor>
    <iInfor class="mb10"></iInfor>
  </div>
</template>
<script>
  import iHeader from '../../components/i-header.vue'
  import iInfor from './chird/i-infor.vue'
  export default {
    data(){
      return {
        value: true
      }
    },
    components: {
      iHeader,
      iInfor
    }

  }

</script>
<style lang="less" scoped>
  .article-box {
    background: #fff;
    height: 400px;
  }

  .demo-checkbox {

  }

  .a {

  }
</style>

<template>
  <!--人气排行页面-->
  <div class="popRanking">
    <i-header title="人气排行"></i-header>
    <div style="background-color: #fff;margin-top: 10px;">
      <project-item distance="2.5km">
        <span slot="label" class="ranking-icon0"></span>
      </project-item>
      <project-item distance="2.5km">
        <span slot="label" class="ranking-icon1"></span>
      </project-item>
      <project-item distance="2.5km">
        <span slot="label" class="ranking-icon2"></span>
      </project-item>
      <project-item distance="2.5km"></project-item>
    </div>
  </div>

</template>
<script>
  import iHeader from '../../components/i-header.vue'
  import projectItem from '../../components/projectItem.vue'
  export default{
    components: {
      iHeader,
      projectItem
    }
  }
</script>
<style lang="less" scoped>
  /*.ranking-icon {*/

  /**/
  /*}*/
  span {
    position: absolute;
    left: 4px;
    top: 0;
    width: 17px;
    height: 20px;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .ranking-icon0 {
    background-image: url("../../../static/images/rank1.png");
  }

  .ranking-icon1 {
    background-image: url("../../../static/images/rank2.png");
  }

  .ranking-icon2 {
    background-image: url("../../../static/images/rank3.png");
  }
</style>

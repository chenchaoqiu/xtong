<template>
  <!--账单记录-->
  <div class="billing-record">
    <!--账单记录-->
    <iHeader title="账单记录"></iHeader>
    <ul class="eject full-god project-detail-tab ">
      <li class="active" @click="">全部</li>
      <li class="">充值</li>
      <li class="">消费</li>
    </ul>

  </div>
</template>
<script>
  import iHeader from '../../components/i-header.vue'
  export default {
    components: {
      iHeader
    }
  }

</script>

<style lang="less" rel="stylesheet/less" scoped>
  .eject {
    width: 100%;
    display: flex;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #999;
    font-size: 15px;
    background-color: #f3f3f3;
    li {
      flex: 1;
    }
  }

  .project-detail-tab > .active {
    background-color: #e66280;
    color: #fff;
  }

</style>

<template>
  <!--标签组件-->
  <span class="i-label vux-1px">{{text}}</span>
</template>
<script>
  export default {
    props: [
      'text'
    ]
  }
</script>
<style scoped lang="less">
  // 标签
  .i-label {
    display: inline-block;
    box-sizing: border-box;
    width: 60px;
    height: 18px;
    font-size: 13px;
    color: #e66280;
    line-height: 18px;
    border-radius: 10px;
    text-align: center;
  }

  .vux-1px:before {
    border-color: #e5e5e5;
    border-radius: 20px;
  }
</style>

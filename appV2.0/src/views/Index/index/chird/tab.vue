<template>
  <!--tab-->
  <div class="container">
    <div class="tab">
      <router-link to="/">
        <div >
          <div class="tdi" style="background-image:url(../../../../../static/images/facialBeauty.png);"></div>
          <div style="margin-top: 7px;">面部美颜</div>
        </div>
      </router-link>
      <router-link to="/">
        <div >
          <div class="tdi" style="background-image:url(../../../../../static/images/plastic.png);"></div>
          <div style="margin-top: 7px;">面部美颜</div>
        </div>
      </router-link>
      <router-link to="/">
        <div >
          <div class="tdi" style="background-image:url(../../../../../static/images/health.png);"></div>
          <div style="margin-top: 7px;">纤体塑形</div>
        </div>
      </router-link>
      <router-link to="/">
        <div >
          <div class="tdi" style="background-image:url(../../../../../static/images/medicine.png);"></div>
          <div style="margin-top: 7px;">四季养生</div>
        </div>
      </router-link>
    </div>
    <div style="margin-top: 15px" class="tab">
      <router-link to="/">
        <div >
          <div class="tdi" style="background-image:url(../../../../../static/images/meal.png);"></div>
          <div style="margin-top: 7px;">套餐疗程</div>
        </div>
      </router-link>
      <router-link to="/">
        <div >
          <div class="tdi" style="background-image:url(../../../../../static/images/hot.png);"></div>
          <div style="margin-top: 7px;">人气项目</div>
        </div>
      </router-link>
      <router-link to="/">
        <div >
          <div class="tdi" style="background-image:url(../../../../../static/images/custom.png);"></div>
          <div style="margin-top: 7px;">私人订制</div>
        </div>
      </router-link>
      <router-link to="/">
        <div >
          <div class="tdi" style="background-image:url(../../../../../static/images/all.png);"></div>
          <div style="margin-top: 7px;">全部项目</div>
        </div>
      </router-link>
    </div>
  </div>

</template>
<style lang="less" scoped>
  // tab栏
  .container{
    padding: 15px;
    background: #fff;
  }
  .tab {
    text-align: center;
    box-sizing: border-box;

    display: flex;
    justify-content: space-around;

    > a {
      color: #666;
      .tdi {
        margin: 0 auto;
        background-size: cover;
        background-repeat: no-repeat;
        width: 2.13rem;
        height: 2.13rem;
      }
    }
  }
</style>

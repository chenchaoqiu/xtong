<template>
  <div style="background: #fff;">
    <i-header title='我的收藏'></i-header>
    <!--tab-->
    <div class="container-fluid collect-box">
      <div>
        <ul class="list-inline text-center">
          <li @click="shoptab=false,addfacoriters('项目')" :class="!shoptab?'active':''">项目(<span class="project_num">2</span>)</li>
          <li @click="shoptab=true,addfacoriters('门店')" :class="shoptab?'active':''">门店(<span class="shop_num">0</span>)</li>
        </ul>
      </div>
    </div>
    <!--内容-->
    <div class="container coll-list">
      <ul :class="!shoptab?'project_list':'shop_list'">    <!--project_list,shop_list-->
        <router-link v-for="(time,i) in poin" :iddata="time.value_id" to="?">
          <li>
            <div class="row res_pro_in">
              <div class="col-xs-12">
                <!--项目与门店区别与shoptab值-->
                <div class="col-xs-5 res_imgbox">
                  <img :src="!shoptab?'time.favorite_img':''" class="img-responsive center-block">
                </div>
                <!--项目列-->
                <div v-if="!shoptab" class="col-xs-5 res_name">
                  <p>{{time.favorite_name}}</p>
                  <p class="res_time"><i></i>{{time.service_time}}min</p>
                  <p class="ord_pri">
                    <span class="">￥</span>
                    <i>{{time.price}}</i>
                  </p>
                </div>
                <!--门店列-->
                <div v-if="shoptab" class="col-xs-5 res_name">
                  <p class="coll-name">{{time.favorite_name}}</p>
                  <p>020-11111111</p>
                </div>
                <!--项目与门店区别与shoptab值-->
                <div class="col-xs-2 ord_numb">
                  <span class="arrow"></span>
                </div>
              </div>
            </div>
          </li>
        </router-link>
        </ul>
    </div>
  </div>
</template>

<script>
  import iHeader from '../../components/i-header'
  import {addfacoriters} from '../../api'
  export default {
    components: {
      iHeader
    },
    data () {
      return {
        shoptab:false,
        poin:[]
      }
    },
    methods: {
      addfacoriters(e){
          this.$http.get(addfacoriters(e)).then(res=>{
              console.log(res)
            this.poin=res.data.data;
          });
      }
    },
    created(){
        this.addfacoriters('项目');
    }
  }
</script>

<style lang='less' rel="stylesheet/less" scoped>
  .container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  a, a:hover, a:focus, a:active {
    text-decoration: none;
    color: #b2b2b2;
  }
  .collect-box {
    height: 44px;
    line-height: 42px;
    background: #e7e7e7;
    margin-bottom: 10px;
  }
  .list-inline {
    padding-left: 0;
    list-style: none;
  }
  .text-center {
    text-align: center;
  }
  .collect-box ul>li {
    width: 48%;
    padding: 0;
    font-size: 16px;
  }
  .list-inline>li {
    display: inline-block;
    padding-right: 5px;
    padding-left: 5px;
  }
  .collect-box ul>li.active {
    border-bottom: 1px solid #d1506d;
    color: #d1506d;
  }
  .coll-list {
    padding: 0;
  }
  .coll-list .res_pro_in {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  .res_pro_in {
    margin-bottom: 10px;
  }
  .col-xs-12{
    overflow:hidden;
    width:100%;
  }
  .col-xs-5 {
    width: 41.66666666666667%;
    float:left;
    padding-right: 15px;
    padding-left: 15px;
  }
  .img-responsive {
    display: block;
    height: auto;
    max-width: 100%;
  }
  .ord_pri {
    color: #f67476;
    margin-top: 15px;
    font-size: 16px;
  }
  .res_time>i {
    width: 17px;
    height: 17px;
    display: inline-block;
    background: url(../../../static/images/time.png) no-repeat;
    background-size: 80%;
    vertical-align: middle;
  }
  .ord_numb {
    padding-right: 0;
    padding-left: 0;
    position: relative;
  }
  .col-xs-2 {
    width: 16.666666666666664%;
    float: left;
    padding-right: 15px;
    padding-left: 15px;
  }
  .coll-list .ord_numb>.arrow {
    margin-top: 35px;
    margin-left: 20px;
  }
  .arrow {
    background: url(../../../static/images/cou_r.png) no-repeat;
    width: 12px;
    height: 10px;
    display: inline-block;
    background-size: 50%;
    margin-left: 5px;
    margin-top: 5px;
  }
  .shop_list .coll-name {
    font-size: 18px;
    margin: 10px 0;
  }
</style>

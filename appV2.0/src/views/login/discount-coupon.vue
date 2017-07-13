<template>
<div>
  <i-header title='优惠劵'></i-header>
  <div class="discount_coupon">
    <ol>
      <li v-for="(time,i) in tory" :class="i===size?'cur':''" @click="usrusb(i)">{{time.title}}（{{time.ags}}）</li>
    </ol>
    <div class="conversion" id="gap">
      <div class="conversion_cent">
        <dl>
          <dt class="fl"><input @blur="coupon($event.target)" type="text" placeholder="请输入优惠码" class="recocode"></dt>
          <dd class="fr"><button type="button" class="cash-btn" @click="getcouponvaduih(value)">兑换</button></dd>
        </dl>
      </div>
    </div>
    <div class="tickets">
      <div class="ticket no-user" style="display: block;">
        <div v-for="(time,i) in toys" class="common_use_quanj">
          <div class="common_use">
            <div class="common_use_L fl" :id="yhjtur[0]?'':'have_expired'"><!--￥--><span>{{time.price}}</span></div>
            <div class="common_use_R fr">
              <ul>
                <li class="fl">
                  <dl>
                    <dt>{{time.nmae}}</dt>
                    <dd>{{time.explain}}</dd>
                  </dl>
                </li>
                <li class="fr" v-if="yhjtur[0]"><button type="button">立即使用</button></li>
                <li class="fr" v-if="yhjtur[1]"><img src="../../../static/images/yishiyong.png"></li>
              </ul>
              <div class="useful_life">有效期：{{time.start_time}}-{{time.end_time}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import {getcouponvalline,getcouponvaduih} from '../../api'
  import iHeader from '../../components/i-header'
  export default {
    data() {
      return {
        tory:[{title:'可使用',ags:'0'},{title:'已使用',ags:'1'},{title:'已过期',ags:'2'}],     /*title调用*/
        yhjtur:[true,false],      /*判断使用状态*/
        couurl:[{},{type:'used'},{type:'old'}],     /*接口类型*/
        toys:[],       /*回调数据*/
        size:0,
        value:''
      }
    },
    methods: {
      getcouponvalline() {
//          数量管理
        for(var i in this.couurl){
          this.coupone(this.couurl[i].type,i,false);
        }
      },
      usrusb(i){
//          点击切换
          this.size=i;
          this.switch(i);
      },
      coupone(type,i,us){
//          公共接口
        this.$http.get(getcouponvalline(),{params:{type:type}}).then(res => {
          var data=res.data.data;
          this.tory[i].ags=data.length;
//          根据接口值调用
          if(type=='used' && us==true){       /*已使用*/
//            console.log(data);
            this.toys=data;
            this.yhjtur=[false,true];
          }else if(type=='old'&& us==true){  /*已过期*/
//            console.log(data);
            this.toys=data;
            this.yhjtur=[false,false];
          }else if(type==undefined && us==false){   /*可使用*/
//            console.log(data);
            this.toys=data;
            this.yhjtur=[true,false];
          }
//          接口调用结束
        });
      },
      getcouponvaduih(ikey){
          this.$http.get(getcouponvaduih(ikey)).then(res => {
              alert(res.data.message);
              for(var i in this.couurl){
                this.coupone(this.couurl[this.size].type,this.size,this.switch(this.size));
              }
          });
      },
      switch(i){
        switch (i){
          case 0:
            this.coupone(this.couurl[i].type,i,false);
            return false;
            break;
          default:
            this.coupone(this.couurl[i].type,i,true);
            return true;
        }
      },
      coupon(e){
          this.value=e.value;
      }
    },
    created() {
      this.getcouponvalline();
    },
    components: {
      iHeader
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .conversion {
    width: 100%;
    height: auto;
    height: 60px;
  }
  .discount_coupon ol {
    width: 100%;
    height: 50px;
  }
  .discount_coupon ol li {
    float: left;
    font-size: 17px;
    width: 33.3%;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
  .discount_coupon .cur {
    border-bottom: 1px solid #fff;
    cursor: pointer;
    color: black;
    color: #D0516F;
  }
  #gap, .knead, #top, .Reservation {
    background: #FFF;
    margin-bottom: 10px;
  }
  .conversion_cent, .common_use {
    width: 95%;
    height: auto;
    margin: auto;
  }
  .conversion_cent dl {
    padding-top: 5px;
  }
  .conversion_cent dt {
    width: 70%;
    height: 40px;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .conversion_cent dt input, .conversion_cent dd button {
    width: 100%;
    height: 100%;
    color: #666666;
    margin-top: 4px;
    font-size: 16px;
    text-indent: 10px;
    border: 0;
    border: 1px solid #E6E6E6;
    border-radius: 6px;
  }
  .conversion_cent dd button {
    width: 90%;
    float: right;
    background: none;
    font-size: 20px;
  }
  .ticket {
    border-top: 0;
    min-height: 100px;
    display: none;
  }
  .common_use_quanj {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    overflow: auto;
  }
  .conversion_cent, .common_use {
    width: 95%;
    height: auto;
    margin: auto;
  }
  .common_use_L, #have_expired {
    width: 25%;
    height: 80px;
    line-height: 80px;
    font-size: 20px;
    color: #FFF;
    text-align: center;
    background: url(../../../static/images/tongyongj.png) no-repeat;
    background-size: 100% 100%;
  }
  #have_expired {
    background: url(../../../static/images/weishiy.png) no-repeat;
  }
  .common_use_L span {
    font-size: 40px;
  }
  .common_use_R{
    background: #ffffff;
    width: 75%;
    height: 80px;
  }
  .common_use_R ul {
    width: 100%;
    height: auto;
    overflow: auto;
  }
  .common_use_R ul li dl {
    line-height: 23px;
    margin: 5px 0 0 5px;
    border-bottom: 1px dashed #e66280;
    max-width: 161px;
    white-space: nowrap;
    overflow: hidden;
  }
  .common_use_R ul li dl dt {
    font-size: 16px;
  }
  .common_use_R ul li dl dd {
    font-size: 14px;
    color: #666666;
    margin-bottom: 3px;
  }
  .conversion_cent dd {
    width: 30%;
    height: 40px;
  }
  .useful_life {
    color: #999999;
    font-size: 13px;
    margin-left: 10px;
    margin-top: 4px;
  }
  .common_use_R ul li button {
    color: #e66280;
    border: 0;
    border-radius: 10px;
    padding: 3px 5px;
    font-size: 15px;
    border: 1px solid #e66280;
    background: none;
    margin-top: 10px;
    margin-right: 10px;
  }
  .common_use_R ul li img {
    width: 70px;
    height: 50px;
  }
  </style>

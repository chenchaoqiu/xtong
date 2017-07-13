<template>
<div>
  <i-header title='我的积分'></i-header>
  <div class="currently_ad" id="gap">
    <dl>
      <dt><img src="../../../static/images/jifen.png">当前积分</dt>
      <dd id="integral">{{toys.integral}}</dd>
      <dd id="particulars"><router-link to="/integral">查看明细&gt;&gt;</router-link></dd>
    </dl>
    <a @click="sesi=true" href="javascript:;" class="cd-popup-trigger"><img src="../../../static/images/bangzh.png"></a>
  </div>

  <div class="shopping_mall">
      <ul>
        <li v-for="i in 2" :class="i==tur?'hit':''" @click="i==1?getintegrationger(true,i):getintegrationger(false,i)">{{i==1?'积分商城':'兑换记录'}}</li>
        <!--<li class="">兑换记录</li>-->
      </ul>
      <div class="coins">
        <div class="coin coup-list" style="display: block;">
          <div v-for="(time,i) in toys.data" class="General_notes">
            <div class="General_notes_L fl">
              <ol>
                <li>￥<b>{{time.price}}</b></li>
                <li>
                  <dl>
                    <dt>{{time.type_name}}</dt>
                    <dd>{{time.explain}}</dd>
                  </dl>
                </li>
              </ol>
            </div>
            <div class="General_notes_R fr">
              <dl>
                <dt>{{time.integral}}积分可兑现</dt>
                <dd><button type="button">立即兑换</button></dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
  </div>

  <div @click="sesi=false" class="cd-popup" :class="sesi?'is-visible':''" role="alert"> <!-- is-visible-->
    <div class="cd-popup-container">
      <div class="Integral_Help" v-if="sesi">
        <div class="shuom">积分说明：</div>
        <div class="qiand">连续签到越多获得积分也就越多</div>
        <div class="shuom">积分有啥用？</div>
        <div class="qiand">积分可用户兑换相应的项目或优惠券</div>
      </div>
      <a @click="sesi=false" href="javascript:;" class="cd-popup-close img-replace">关闭</a>
    </div> <!-- cd-popup-container -->
  </div>
</div>
</template>
<script>
  import {getintegrationger} from '../../api'
  import iHeader from '../../components/i-header'
  export default {
    data() {
        return {
        toys:[],
        tur:1,
        sesi:false
      }
    },
    methods: {
      getintegrationger(el,i){
          this.tur=i;
          this.$http.get(getintegrationger(el)).then(red =>{  /*true为初始化调用接口（含积分商城数据），false为兑换记录的接口*/
              this.toys=red.data;
          });
      }
    },
    created() {
        this.getintegrationger(true,1);
    },
    components: {
      iHeader
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .currently_ad {
    width: 100%;
    padding: 20px 0;
    height: auto;
    text-align: center;
  }
  #gap, .knead, #top, .Reservation {
    background: #FFF;
    margin-bottom: 10px;
    position: relative;
  }
  .currently_ad dt {
    color: #333333;
    font-size: 18px;
    margin: 10px 0;
  }
  .currently_ad dd {
    font-size: 30px;
    color: #333333;
    font-weight: 300;
  }
  #particulars {
    color: #717171;
    font-size: 13px;
    margin: 18px 0;
  }
  .currently_ad dt img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .shopping_mall ul {
    height: 50px;
    margin-bottom: 10px;
  }
  .shopping_mall ul li {
    float: left;
    font-size: 15px;
    height: 50px;
    line-height: 50px;
    width: 50%;
    text-align: center;
    cursor: pointer;
    background: #fff;
    color: #999999;
  }
  .shopping_mall .hit {
    border-bottom: 1px solid #fff;
    cursor: pointer;
    background: #D0516D;
    color: #FFF;
  }
  .coins {
    width: 100%;
    height: auto;
  }
  .coin {
    border-top: 0;
    min-height: 100px;
    display: none;
  }
  .General_notes {
    width: 95%;
    margin: auto;
    margin-bottom: 10px;
    height: 95px;
  }
  .General_notes_L {
    width: 70%;
    height: 90px;
    background: url(../../../static/images/jifen_L.png) no-repeat;
    background-size: 100% 100%;
  }
  .General_notes_L ol {
    display: -webkit-box;
    float: left;
  }
  .General_notes_L ol li:first-child {
    color: #e66280;
    margin-top: 20px;
    font-size: 18px;
    margin-left: 10px;
  }
  .General_notes_L ol li b {
    font-size: 36px;
  }
  .General_notes_L ol dl {
    margin-top: 20px;
    margin-left: 7px;
    font-size: 17px;
  }
  .General_notes_L ol dl dt {
    line-height: 30px;
  }
  .General_notes_L ol dl dd {
    color: #666666;
  }
  .General_notes_R {
    width: 30%;
    height: 90px;
    text-align: center;
    background: url(../../../static/images/jifen_R.png) no-repeat;
    background-size: 100% 100%;
  }
  .General_notes_R dl {
    color: #FFF;
    margin-top: 18px;
  }
  .General_notes_R dt {
    font-size: 10px;
    line-height: 30px;
  }
  .General_notes_R dd button {
    color: #FFF;
    padding: 5px 10px;
    background: none;
    border: 1px solid #FFF;
    border-radius: 5px;
    font-size: 15px;
  }
  .fr {
    float: right;
  }
  .fl {
    float: left;
  }
  .cd-popup-trigger {
    display: inline-block;
    position: absolute;
    top:25px;
    right:25px;
  }
  .cd-popup-trigger img {
    width: 20px;
    height: 20px;
    margin-top: -15px;
  }
  .cd-popup {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(94, 110, 141, 0.9);
    opacity: 0;
    visibility: hidden;
    -webkit-transition: opacity 0.3s 0s, visibility 0s 0.3s;
    -moz-transition: opacity 0.3s 0s, visibility 0s 0.3s;
    transition: opacity 0.3s 0s, visibility 0s 0.3s;
  }
  .cd-popup.is-visible {
    opacity: 1;
    visibility: visible;
    -webkit-transition: opacity 0.3s 0s, visibility 0s 0s;
    -moz-transition: opacity 0.3s 0s, visibility 0s 0s;
    transition: opacity 0.3s 0s, visibility 0s 0s;
  }
  .cd-popup-container {
    position: relative;
    width: 80%;
    max-width: 400px;
    margin: 7em auto;
    background: #FFF;
    border-radius: .25em .25em .4em .4em;
    text-align: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    -webkit-transform: translateY(-40px);
    -moz-transform: translateY(-40px);
    -ms-transform: translateY(-40px);
    -o-transform: translateY(-40px);
    transform: translateY(-40px);
    -webkit-backface-visibility: hidden;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    transition-property: transform;
    -webkit-transition-duration: 0.3s;
    -moz-transition-duration: 0.3s;
    transition-duration: 0.3s;
  }
  .is-visible .cd-popup-container {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }
  .Integral_Help {
    width: 100%;
    height: auto;
    text-align: -webkit-left;
  }
  .Integral_Help, .shuom {
    font-size: 20px;
    padding-top: 23px;
    color: #D14B6B;
  }
  .shuom, .qiand {
    padding: 5px 0;
    padding-left: 15px;
  }
  .Integral_Help .qiand {
    color: #666666;
    font-size: 18px;
  }
  .cd-popup-container .cd-popup-close {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 30px;
    height: 30px;
  }
  .cd-popup-container a {
    color: #2a53a5;
    text-decoration: underline;
  }
  .img-replace {
    display: inline-block;
    overflow: hidden;
    text-indent: 100%;
    color: transparent;
    white-space: nowrap;
  }
  .cd-popup-container .cd-popup-close::before {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    left: 8px;
  }
  .cd-popup-container .cd-popup-close::before, .cd-popup-container .cd-popup-close::after {
    content: '';
    position: absolute;
    top: 12px;
    width: 14px;
    height: 3px;
    background-color: #8f9cb5;
  }
  .cd-popup-container .cd-popup-close::after {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    right: 8px;
  }
</style>

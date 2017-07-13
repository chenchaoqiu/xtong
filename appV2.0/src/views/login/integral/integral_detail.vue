<template>
    <div>
      <i-header title='积分明细'></i-header>
      <div class="currently_ad">
        <dl>
          <dt><img src="../../../../static/images/jifen.png">当前积分</dt>
          <dd id="integral">{{toys.integral}}</dd>
        </dl>
      </div>

      <div class="demo">
        <div class="history" style="min-height: 300px;">
          <div class="history-date">
            <ul>
              <li onload="alert()" v-for="(time,i) in toys.list" :datel="dongh?'leik':''" class="bounceInDown" ><!--:class="dongh?'leik':''"-->
                <dl style="display: block;">
                  <dt>
                    <b class="grey">+{{time.integral}}</b>
                    <span class="big">{{time.source}}</span>
                    <span>{{time.add_time}}</span>
                  </dt>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
  import {getintegrationger} from '../../../api'
  import iHeader from '../../../components/i-header'
  export default {
    data() {
      return {
        toys:[],
        dongh:false
      }
    },
    methods: {
      getintegrationger(){
//          积分明细接口
          this.$http.get(getintegrationger('jfmxi')).then(rel=>{
              console.log(rel.data.data);
              this.toys=rel.data.data;
            this.dongh=true;
          });
      }
    },
    created() {
      this.getintegrationger();
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
    background: #fff;
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
  .currently_ad dt img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .demo {
    width: 100%;
    height: auto;
    margin: 50px 0;
  }
  .history {
    background: url(../../../../static/images/line04.gif) repeat-y 31px 0;
    position: relative;
  }
  .history-date {
    overflow: hidden;
    position: relative;
  }
  .history-date ul {
    padding-top: 1px;
  }
  .history-date ul li {
    background: url(../../../../static/images/icon07.gif) no-repeat 24px 0;
    padding-bottom: 20px;
    zoom: 1;
    margin-top: -20px;
  }
  .history-date ul li:first-child{
    margin-top:0px;
  }
  .history-date ul li dl {
    float: left;
    padding-left: 41px;
    margin-top: -8px;
    font-family: '微软雅黑';
  }
  .history-date ul li dl dt {
    color: #737373;
  }
  .history-date ul li dl dt b {
    color: #666666;
    font-size: 25px;
  }
  .history-date ul li dl dt span {
    display: block;
    color: #787878;
    font-size: 12px;
  }
  .history-date ul li dl dt .big {
    font-size: 12px;
  }
  .history-date ul li:after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  li:first-child .grey {
    color: #e66280;
  }
  .history-date ul li[datel='leik']{
    margin-top: 0px;
    transition: 2s;
    -moz-transition: 2s;
    -o-transition: 2s;
    -webkit-transition: 2s;
  }
</style>

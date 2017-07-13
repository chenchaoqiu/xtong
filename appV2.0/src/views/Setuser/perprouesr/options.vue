<template>
  <div>
    <i-header title='个人资料'></i-header>
    <div class="head_portrait">
      <a class="btn01" data-toggle="modal" href="javascript:;">
        <dl>
          <label>
            <dt class="fl"><span>头像</span></dt>
            <dd class="fr"><img src="/static/images/skip.png" style="margin-top:40px;"></dd>
            <dd class="Avatar fr"><img src="http://192.168.1.112/image//images/default_women_avatar.png"></dd>
          </label>
        </dl>
      </a>
    </div>
    <div>
      <ul>
        <li class="list-child">
          <span class="fl">手机号</span>
          <span class="fr">13124564585</span>
        </li>
        <li class="list-child">
          <span class="fl">昵称</span>
          <span style="margin-left: 10px;" class="fr"><img src="/static/images/skip.png" alt="" /></span>
          <div style="height: 100%;min-width: 40px;text-align: center;" class="fr" contentEditable="true">陈林</div>
        </li>
        <li class="list-child" @click="Sex">
          <span class="fl">性别</span>
          <span style="margin-left: 10px;" class="fr"><img src="/static/images/skip.png" alt="" /></span>
          <span class="fr">{{xibie}}</span>
        </li>
        <li class="list-child">
          <datetime class="diwei" confirm-text="确认" cancel-text="取消" @on-change="change" :min-year="minyear" :max-year="maxyear" :title="'Birthday'"></datetime>
          <span class="fl">生日</span>
          <span style="margin-left: 10px;" class="fr"><img src="/static/images/skip.png" alt="" /></span>
          <span class="fr">{{fete || fete2}}</span>
        </li>
        <li class="list-child">
          <router-link style="overflow: hidden;display: block;color: inherit;" to="/site/site">
            <span class="fl">地址管理</span>
            <span style="margin-left: 10px;" class="fr"><img src="/static/images/skip.png" alt="" /></span>
          </router-link>
        </li>
      </ul>
    </div>
    <div v-if="tachua" class="tachua">
        <div @click="tachua=false" class="tackmb"></div>
        <div class="tacktext">
          <ul>
            <li v-for="(tiem,i) in sex" @click="xibie=$event.target.innerText,tachua=false;">{{tiem.eil}}</li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
  import { Datetime, Group,  XButton } from 'vux'
  import iHeader from '../../../components/i-header'
  export default {
    components: {
      Datetime,
      Group,
      XButton,
      iHeader
    },
    data () {
      return {
          maxyear:'',           //最大的年份
          minyear:'',           //最小的年份
          fete:'',              //返回生日弹出框值
          fete2:'2017-06-05',   //生日初始化
          tachua:false,         //是否显示性别弹出框
          sex:[{eil:'保密'},{eil:'男'},{eil:'女'}],   //弹出性别选择
          xibie:'男'           //性别初始化
      }
    },
    methods: {
      year(){
        var date=new Date;
        this.maxyear=date.getFullYear();
        this.minyear=this.maxyear-70;
      },
      change(varle){
        this.fete=varle;
      },
      Sex(){
          this.tachua=true;
      },
      Xibie(e){
          console.log(e)
        this.xibie=e;
      }
    },
    created(){
      this.year();
    }
  }
</script>

<style lang='less' rel="stylesheet/less" scoped>
  .head_portrait {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #E7E7E7;
    background: #fff;
    margin-top: 10px;
  }
  .head_portrait dl {
    padding: 0 15px;
  }
  .nickname a, .head_portrait a {
    color: #000;
  }
  .head_portrait dt {
    margin-top: 35px;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .head_portrait dd.Avatar {
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 100%;
    float: right;
    margin: 15px 20px 0 0;
  }
  .head_portrait dd.Avatar img {
    width: 100%;
    height: 100%;
  }
  ul{
    background: #fff;
  }
  .list-child{
    position: relative;
    height:50px;
    line-height:50px;
    border-bottom: 1px solid #E5E5E5;
    font-size:15px;
    margin:0 10px;
  }
  .list-child span img{
      height: 15px;
  }
  .diwei{
    display: block;
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    opacity: 0;
  }
  .tackmb,.tachua,.tacktext{
    position: fixed;
    top:0;
    left:0;
  }
  .tackmb{
    width:100%;
    height:100%;
    background: #000;
    opacity:.6;
  }
  .tacktext{
    color:#fff;
    width:80%;
    height:139px;
    background: #fff;
    left:50%;
    top:50%;
    margin-left: -40%;
    margin-top:-40%;
    border:10px solid #E4E4E4;
  }
  .tacktext ul{
    width: 100%;
    height:100%;
  }
  .tacktext li{
    width:100%;
    height:40px;
    line-height: 40px;
    border-bottom: 1px solid #E4E4E4;
    text-align: center;
    font-size: 16px;
    color:#000;
  }
</style>

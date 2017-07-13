<template>
  <div>
    <i-header title='帐户安全'></i-header>
    <div class="Setuser">
      <ul>
        <li>
          <router-link to="/setinit/setpass">
            <span class="lef">修改支付密码</span>
            <span class="rig">
            <x-icon class="youhi" type="chevron-right" size="12" style="fill:#666;"></x-icon>
          </span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import iHeader from '../../../components/i-header'
  export default {
    data(){
      return {

      }
    },
    methods: {

    },
    created(){

    },
    components: {
      iHeader
    }
  }
</script>

<style lang='less' rel="stylesheet/less" scoped>
  .Setuser{
    line-height: 45px;
    text-indent: 15px;
  }
  .Setuser p{
    font-size:17px;
    color: #333;
  }
  .Setuser ul{
    background: #fff;
  }
  .Setuser li{
    border-top:1px solid #e5e5e5;
    overflow: hidden;
    font-size: 15px;
    color: #666;
    margin-top:10px;
  }
  .Setuser li a{
    display: block;
    overflow: hidden;
    color: #333;
  }
  .Setuser li:first-child{
    border:none;
  }
  .Setuser span.lef{
    float: left;
  }
  .Setuser span.rig{
    float: right;
    margin-right: 15px;
  }
  .Setuser .zuohi{
    position: relative;
    font-size: 13px;
    color: #999;
  }
  .Setuser .youhi{
    margin-left: 2px;
  }
  .Setuser .zuohi b{
    position: absolute;
    top: -2px;
    right: -3px;
    width:5px;
    height:5px;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    display: block;
    background: #fa597e;
  }
  #ureisl{
    margin:30px 15px 0;
    height:40px;
    line-height: 40px;
    background: #e66280;
    text-align: center;
    color:#fff;
    border-radius:5px;
    font-size: 17px;
  }
  #ureisl:active{
    opacity:.6;
    -moz-opacity:.6;
    filter:alpha(opacity=60);
    color:#d2cae6;
  }
</style>

<template>
  <div>
    <i-header title='地址管理' class="pr">
      <span @click="Setdz('新增')" slot="right" class="pa" style="right: 15px; top:0;color: #d1506d;font-size: 24px;">+</span>
    </i-header>
    <div style="text-align: center;margin-top: 40%;">
      <img width="50" src="/static/images/fixed.png" />
      <p style="color: #666;font-size:0.682rem;margin:10px 0; ">您还没有添加地址哦~</p>
      <p><button @click="Setdz('新增')" style="border:none;outline:none;background: #e66280;border-radius: 5px;width:100px;height: 35px;color: #fff;" type="button">添加地址</button></p>
    </div>
    <!--显示已有的地址-->
    <div class="address-box">
      <ul>
        <li>
          <div class="page-middle">
            <div class="cc">
              <div class="page-info-top page-but">
                <p class="page-name"> 陈林 <span class="page-numb">13122288838</span></p>
                <p class="page-add">夜13路;夜17路;夜19路;夜25路;夜34路;夜38路;夜41路;夜46路;夜47路;夜51路;夜93路;夜97路车陂</p>
              </div><div class="page-top">
              <span class="box-wrap"><i class="item addrs-png checked" data-id="202"></i><span> 默认地址</span></span>
              <span class="page-delete">
                <span @click="Setdz('编辑')" class="a address-edit" data-id="202"><img src="/static/images/edit.png"> 编辑</span>
                <span class="a address-del" data-id="202"><img src="/static/images/delete.png"> 删除</span>
              </span>
            </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--地址填写,false-->
    <div v-if="Tchu" class="tcktxdz" :style="Lift">
      <div class="contain">
        <div class="col-xs-4 return">
          <a @click="tuichu"></a>
        </div>
        <div class="col-xs-4 pro_det">
          <a>添加地址</a>
        </div>
        <div class="col-xs-4 add-del">
          <a></a>
        </div>
      </div>
      <div class="container add-box">
        <ul>
          <li v-for="(time,i) in setgoto" :class="setgotrue[i].ekli?'cuow':''" class="vux-1px-b">
            <label>{{time.name}}</label>
            <input :value="setgofalse?'':textdizhi[i]" :maxlength="time.Blur==='电话'?11:''" @blur="Nameurs(i,time.Blur,$event.target)" type="text" class="add-name" :placeholder="time.value">
          </li>
        </ul>
      </div>
      <div class="container default-add">
        <p><span>设为默认地址</span><span class="pull-right meal-check" data-value="0"></span></p>
      </div>
      <div class="container">
        <input @click="queren()" type="button" class="add-keep" value="确定新增">
      </div>
    </div>
  </div>
</template>

<script>
  import iHeader from '../../../../components/i-header'
  export default {
    data (){
      return{
        Lift:'left:100%',     //地址弹出效果
        Tchu:false,       //是否开启地址填写
        setgoto:[       //地址记录
          {name:'姓名：',value:'请输入名字',Blur:'姓名'},
          {name:'电话：',value:'请输入电话',Blur:'电话'},
          {name:'所在地区：',value:'请选择地址',Blur:'地区'},
          {name:'详细地址：',value:'请输入详细地址',Blur:'详细地区'}
        ],
        setgotrue:[{ekli:false},{ekli:false},{ekli:false},{ekli:false}],
        setgofalse:true,        //首次选择，还有首次进入显示什么状态
        textdizhi:[]
      }
    },
    methods:{
      Nameurs(size,i,e){
          //填写地址
        var This=this;
        var el=e.value;
        switch (i){
          case '姓名':
              if(el!=''){
                this.textdizhi[size]=el;
                this.setgotrue[size].ekli=false;this.setgofalse=false;
              }else{this.setgotrue[size].ekli=true;}
              break;
          case '电话':
              if(el!=''&&/^1(3|4|5|7|8)\d{9}$/.test(el)){
                this.textdizhi[size]=el;
                this.setgotrue[size].ekli=false;this.setgofalse=false;
              }else{this.setgotrue[size].ekli=true;}
              break;
          case '地区':
              if(el!=''){
                this.textdizhi[size]=el;
                this.setgotrue[size].ekli=false;this.setgofalse=false;
              }else{this.setgotrue[size].ekli=true;}
              break;
          case '详细地区':
              if(el!=''){
                this.textdizhi[size]=el;
                this.setgotrue[size].ekli=false;this.setgofalse=false;
              }else{this.setgotrue[size].ekli=true;}
              break;
          default :
              alert('无法识别，请刷新页面，如再不行，还请您及时反馈，谢谢！');
        }
      },
      /*确认地址*/
      queren(){
          /*/webapi/index.php?app=member&format=json&act=address_search&source=h5&keyword=车陂*/    //搜索接口
          /*/webapi/index.php?app=member&act=address_read&id=202&source=h5*/      //修改地址接口
          /*/webapi/index.php?app=member&act=address&source=h5*/      //显示地址接口
        /*
        * var contactman = $('#username').val();   新增地址
         var mobile = $('#mobile').val();
         var address = $('#address').val();
         var room = $('#deta').val();
         var is_default = $('.meal-check').attr('data-value')
         if( contactman != '' && mobile != '' && address != '' && room != '' ){
         callAjax(addobj,{"source":"h5","contactman":contactman,"mobile":mobile,"address":address,"room":room,"is_default":is_default},"/webapi/index.php?app=member&act=address_add","get");
         }
        * */
          if(this.setgotrue[0].ekli||this.setgotrue[1].ekli||this.setgotrue[2].ekli||this.setgotrue[3].ekli||this.setgofalse){
              /*误区*/
              alert('为了您的宝贝能精准送达，请填好正确的信息！')
          }else{
            this.textdizhi=[];
          }
      },
      Setdz(e){
        //新增或修改地址页面
        if(e=='编辑'){
          this.textdizhi=['陈林4','13154654555','广州4','广州诶'];
          this.setgofalse=false;
        }else{
          this.textdizhi=[];
          this.setgofalse=true;
        }

        //出来效果
        var This=this;
        this.Tchu=true;
        setTimeout(function(){
          This.Lift='left:0';
        },10);
        /*-----分割线-----*/
      },
      tuichu(){
        //退出新增或修改地址页
        var This=this;
        this.Lift='left:100%';
        setTimeout(function (){
          This.Tchu=false;
        },500);
      }
    },
    created(){

    },
    components: {
      iHeader
    }
  }
</script>

<style lang='less' rel="stylesheet/less" scoped>
  .tcktxdz{
    width:100%;
    height:100%;
    position: fixed;
    top:0px;
    left:100%;
    background: #fff;
    transition: 0.5s;
  }
  .contain {
    height: 45px;
    line-height: 45px;
    border-bottom: 5px solid #e5e5e5;
    background-color: #fff;
    padding-left: 15px;
  }
  .col-xs-4 {
    width: 33.33333333333333%;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    float: left;
  }
  .return>a {
    width: 20px;
    height: 30px;
    display: inline-block;
    background: url(../../../../../static/images/return.png) no-repeat;
    background-size: 70%;
    position: absolute;
    left: 0;
    top: 10px;
  }
  .pro_det>a {
    font-size: 18px;
    color: #d1506d;
  }
  label {
    display: inline-block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .add-box>ul>li {
    border-bottom-color:#ccc;
    padding: 10px 0;
  }
  .add-box>ul>li.cuow:after{
    border-bottom-color:#c10d0d;
  }
  .add-box>ul>li>label {
    color: #666;
    font-size: 16px;
    font-weight: normal;
  }
  .add-box>ul>li>input {
    border: 0;
    height: 35px;
    line-height: 35px;
    padding-left: 10px;
    outline:none;
    width:75%;
  }
  .default-add {
    background: #fff;
    padding: 15px;
  }
  .meal-check {
    background: url(../../../../../static/images/adrsss_03.png) no-repeat;
    width: 16px;
    height: 16px;
    display: inline-block;
    background-size: 100%;
    margin-left: 5px;
    margin-top: 5px;
  }
  .checked{
    background: url(../../../../../static/images/Currently-selected.png) no-repeat;
    width: 16px;
    height: 16px;
    display: inline-block;
    background-size: 100%;
    margin-left: 5px;
    margin-top: 5px;
  }
  .pull-right {
    float: right!important;
  }
  .add-keep {
    width: 100%;
    height: 35px;
    line-height: 35px;
    background: #e66380;
    color: #fff;
    font-size: 17px;
    border: 0;
    border-radius: 3px;
    margin-top: 20px;
    -webkit-appearance: button;
  }
  .page-middle {
    background-color: #f3f3f3;
    padding-top: 5px;
  }
  .cc {
    background-color: #fff;
    padding-left: 15px;
    padding-right: 15px;
  }
  .page-but {
    border-bottom: 1px solid #f3f3f3;
  }
  .page-name {
    font-size: 16px;
    color: #333333;
    height: 44px;
    line-height: 44px;
  }
  .page-numb {
    padding-left: 26px;
  }
  .page-add {
    height: 51px;
    color: #666666;
    font-size: 14px;
  }
  .page-top {
    width: 100%;
    height: 30px;
    line-height: 30px;
    display: inline-block;
  }
  .page-delete {
    float: right;
  }
  .a img {
    width: 18px;
    height: 16px;
  }
  .address-del {
    margin-left: 20px;
  }
</style>

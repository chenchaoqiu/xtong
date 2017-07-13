<template>
  <div class="prize">
    <i-header title="有奖调查" class="pr">
      <div slot="right" class="rules" @click="open">奖励规则</div>
    </i-header>
    <div class="prize-box">
      <div class="prize-content">
        <!--每一块选项-->
        <div class="opt-box">
          <div class="opt-title ce6" ref="lis3">1、您的性别是</div>
          <!--选项-->
          <mu-radio name="c" label="我是美女" nativeValue="ccc" class="demo-radio" @change="allCheck($refs.lis3)"/>
          <mu-radio name="c" label="我是帅哥" nativeValue="ddd" class="demo-radio" @change="allCheck($refs.lis3)"/>
          <div>
          </div>
        </div>
        <!--提交按钮-->
        <div style="margin:0 auto;width: 150px;padding-top: 15px;">
          <mu-raised-button label="提交" class="demo-raised-button" secondary @click="submitPrize()"
                            :disabled="!(optClgLeng==optListLeng)"/>
        </div>
      </div>
    </div>
    <!--获得优惠券-->
    <div>
      <mu-dialog :open="dialog2" dialogClass="get-prize" @close="close">
        <div class="dialog2">
          <p style="font-size: 16px">恭喜您!</p>
          <p style="font-size: 19px">获得<span style="color: #ffc333">30元</span>代金卷一张</p>
          <div class="juanbg"><span style="font-size: 22px">￥</span><span style="font-size: 36px">30</span></div>
          <mu-raised-button label="去使用" backgroundColor="#ffb400" to="/canUsedC" />
        </div>
      </mu-dialog>
    </div>


    <!--奖励规则弹出-->
    <mu-dialog :open="dialog"
               title="-奖励规则-"
               @close="close"
               titleClass="dialog-title-prize"
               bodyClass="dialog-body-prize">
      <div class="dialog-content">
        <p class="c3" style="">填完调查内容后有机会获得以下奖品：</p>
        <p> 1、现金10元 </p>
        <p> 2、30元代金券1张</p>
        <p>3、免费体验项目1次</p>
        <p>4、精美小礼品</p>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
  import iHeader from '../../../components/i-header.vue'
  //  import {Checker, CheckerItem, Checklist} from 'vux'
  export  default {
    data () {
      return {
        dialog: false,
        dialog2: false,
        optClgLeng: 0,// 已选单选框的长度
        optListLeng: 1,//所有单选框长度
      }
    },
    methods: {
      open () {
        this.dialog = true
      },
      close () {
        this.dialog = false;
        this.dialog2 = false
      },

      // 提交
      submitPrize(){
        this.dialog2 = true;
      },
      //全部是否选中
      allCheck(v){
        v.classList.add('ls');
        this.checkTrue()
      },
//      判断所有选框已选
      checkTrue(){
        var optList = document.querySelectorAll('.opt-box');
        this.optListLeng = optList.length;// 总共多少条
        var optClg = document.querySelectorAll('.ls');
        this.optClgLeng = optClg.length;
      }
    },

    mounted(){
    },
    components: {
      iHeader
    },

  }
</script>
<style lang="less" scoped>

  button {
    width: 150px;
    height: 45px;
  }

  .opt-box {
    padding: 0 30px;
    font-size: 15px;
    color: #333;
    .opt-title {
      padding: 10px 0;
      font-size: 18px;
      line-height: 32px;
    }

  }

  .dialog2 {
    padding-top: 48px;
    color: #fff;
    text-align: center;
    a{
      width: 115px;
      height: 30px;
      border-radius: 15px;
      margin-top: 35px;
    }
    /*优惠价背景*/
    .juanbg {
      background: url("../../../../static/images/juanbg.png") no-repeat;
      background-size: cover;
      line-height: 56px;
      width: 150px;
      height: 56px;
      margin: 0 auto;
      margin-top: 15px;
    }
  }

  .dialog-content {
    > p {
      font-size: 13px;
      line-height: 24px;
    }
  }

  .rules {
    position: absolute;
    color: #666;
    top: 0;
    right: 15px;
    font-size: 14px;
  }

  .prize-box {
    height: 93%;
    width: 100%;
  }

  .prize-content {
    height: 100%;
    width: 100%;
    background: url("../../../../static/images/prize-bg.png") no-repeat;
    background-size: cover;
  }
</style>

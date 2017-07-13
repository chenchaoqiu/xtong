<template>
  <div>

    <div class="container">

      <div>
        <div class="logo">
          <img src="../../../static/images/login-logo.png" alt="i美logo">
        </div>
      </div>
      <ul class="login-ul">
        <li>
          <label>手机号:</label>
          <!--<input type="text" v-model="phoneNumber" class="tel" placeholder='请输入手机号码'/>-->
          <!--<mu-text-field type="number" v-model="phoneNumber" class="tel" hintText="请输入手机号码"/>-->
          <mu-text-field type="number" @blur='verifyPhone(phoneNumber)' v-model="phoneNumber" :maxLength="11"
                         label="请输入手机号码" :errorText="errormsg" hintText="请输入手机号码" class="tel" labelFloat/>
          <br/>
        </li>
        <li class='yzm'>
          <label>验证码:</label>
          <mu-text-field type="number" @blur='verifyVrifyCode(verifyCode)' v-model="verifyCode" label="请输入验证码"
                         :maxLength="4" :errorText="verifyCodeE" class="messagenum" hintText="请输入验证码" labelFloat/>
          <!--<input type="text" v-model="verifyCode" class="messagenum" placeholder='请输入验证码'/>-->
          <input type="button" value="获取验证码" class="getnum fr" @click="getCode($event)"/>
        </li>
        <li class="inv-con" ref="li">
          <label>邀请码</label>
          <mu-text-field type="number" v-model="inviteCode" label="请输入邀请码" class="messagenum" hintText="请输入邀请码"
                         labelFloat/>
        </li>
        <!--信息提示-->
        <!--<li class="hint" v-if="errormsg">
            <p>{{errormsg}}</p>
          </li>-->
      </ul>
      <p class="ty">
        <i class='checked checkedBg' @click="disagree($event,$refs.login)"></i><span>我已阅读并同意i美</span><a>
        《用户使用协议》</a></p>
      <!--<input type="button" value="登 录" class="login-ok" ref="login" @click="login"/>-->
      <mu-raised-button label="登 录" class="demo-raised-button login-ok" ref="login" @click="login"/>
      <span class="fr inv" @click="showInvite($refs.li)">填写邀请码</span>
    </div>
    <!--弹出层-->
    <div>
      <mu-dialog :open="dialog" title="i美" @close="close">
        {{codeMessage}}
        <mu-flat-button slot="actions" primary @click="close" label="确定"/>
      </mu-dialog>
    </div>

  </div>
</template>


<script>
  // base 64
  import {md5, base64} from 'vux'
  import {getLogin, getmember} from '../../api/index'
  export default {
    data() {
      return {
        // 手机号码
        phoneNumber: '',
        // 验证码
        verifyCode: '',
        verifyCodeE: '',// 验证码错误信息
        // 邀请码
        inviteCode: '',
        //        错误信息
        errormsg: '',
        dialog: false,
        codeMessage: '',//  返回的验证码信息
      }
    },
    methods: {
      // 组件方法
      close() {
        this.dialog = false;
      },

      //        验证手机号码
      verifyPhone(phone) {
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(Number(phone)))) {
          this.errormsg = '手机号码有误，请检查！';
          return false;
        } else {
          this.errormsg = '';
          return true;
        }
      },
      //      验证验证码
      verifyVrifyCode(code) {
        // 长度为4的纯数字
        if (!(/^\d{4}$/.test(Number(code)))) {
          this.verifyCodeE = '验证码有误，请检查！'; // 规则不正确验证
          return false;
        } else {
          this.verifyCodeE = '';
          return true;
        }
      },
      // 不同意用户协议
      disagree(e, login) {
        var i = e.target;
        //  检查是否有这个类名 没有就添加 一开始没有
        if (!i.classList.contains('checkedBr')) {  // 为假
          i.classList.remove('checkedBg');
          i.classList.add('checkedBr');
          login.style.backgroundColor = 'rgb(204, 204, 204)';
          login.setAttribute('disabled', 'disabled')
        } else {
          i.classList.add('checkedBg');
          i.classList.remove('checkedBr');
          login.style.backgroundColor = '#d1506d';
          login.removeAttribute('disabled')
        }
      },
      // 获取验证码
      getCode(e) {
        // 当点击时先获取手机的长度及是否符合规则 验证手机号码  接收返回值
        if (!this.verifyPhone(this.phoneNumber)) return; // 如果为假
        var e = e.target;
        e.setAttribute('disabled', 'disabled');
        //手机号码加密
        var mobile = base64.encode(this.phoneNumber);
        var paramsM = { // 获取验证码
          params: {
            mobile: mobile,
            sign: '123',
            act: 'code'
          }
        };
        this.$http.get(getLogin(), paramsM).then(res => {
          // 判断验证码
          this.codeMessage = res.data.message;
          this.dialog = true;
          this.dialog = ''
        });


        // 重新发送
        var time = 60; // 时长
        var timer = setInterval(function () {
          time--;
          e.value = time + '秒后重新发送';
          if (!time) {
            time = 0;
            clearInterval(timer);
            e.removeAttribute('disabled');
            e.value = '重新发送';
          }
        }, 1000)
      },
      // 显示邀请码
      showInvite(li) {
        li.classList.toggle('inv-con');
      },
      // 点击登陆   //  需要的参数 1 *手机号码  2  *验证码  3 可选参数 邀请码
      login() {

        //验证手机 及 验证码 规则
        if (this.verifyPhone(this.phoneNumber) && this.verifyVrifyCode(this.verifyCode)) {
          //          手机号码加密
          let mobile = base64.encode(this.phoneNumber);
          //          验证码md5加密
          let verifyCode = md5(this.verifyCode);
          //          邀请码
          let inviteCode = this.inviteCode;
          //发送请求
          var params = {   // 获取token配置
            params: {
              act: 'check_code',
              mobile: mobile,   //  手机号码
              sign: '123',      // 标记
              code: verifyCode, //  验证码
              source: 'h5',     // 标记h5
              invite_code: inviteCode //邀请码
            }
          };
          this.$http.get(getLogin(), params).then(res => {
            // let
            // let  im_token,is_new,is_send,error
            console.log(res.data);
            if (res.data.error == 0) { // 0 代表成功获取token
              this.errormsg = '';
              this.verifyCodeE = '';
              window.localStorage.setItem('token',res.data.data.im_token);//保存token
              // console.log('登陆成功')
              this.$http.get(getmember()).then(res => {
                console.log(res.data);
                // 将数据存在sessionStorage 中
                sessionStorage.setItem('im_token', JSON.stringify(res.data));// 用户信息
                this.$store.dispatch('loginYes');
                window.history.go(-1)  // 返回
              })
            } else { // 错误验证码
              this.verifyCodeE = '登陆失败，请检查验证码！';
            }
          })
        } else {
          this.verifyCodeE = '请检查验证码格式是否正确！';
        }
      }
    },
    mounted() {

    }

  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  /*登录页*/

  .container {

    .logo {
      width: 6rem;
      height: 6rem;
      margin: 3rem auto 0;
      img {
        width: 100%;
      }
    }
    .login-ul {

      > li {
        margin-bottom: .44rem;
        position: relative;
      }
      // 错误提示
      .hint {
        color: #ff4081;
      }
    }
  }

  .tel {
    border: 0;
    padding-left: 10px;
    font-size: 16px;
  }

  .messagenum {
    border: 0;
    padding-left: 10px;
    font-size: 16px;
    /*width: 50%;*/
  }

  .getnum {
    border: 0;
    border: 1px solid #e66280;
    background: #fff;
    padding: 3px;
    color: #e66280;
    border-radius: 5px;
    position: absolute;
    right: 0px;
  }

  .login-ok {
    width: 100%;
    background: #d1506d;
    border: 0;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    border-radius: 7px;
    color: #fff;
  }

  .inv {
    margin-top: 10px;
    color: #e66280;
    text-decoration: underline;
  }

  .ty {
    margin-bottom: 10px;
    line-height: 28px;
  }

  .ty > a {
    color: #e66280;
  }

  .inv-con {
    display: none;
  }

  .return > i {
    width: 20px;
    height: 30px;
    display: inline-block;
    /*background: url(../../../static/return.png) no-repeat;*/
    background-size: 70%;
    position: absolute;
    left: 0;
    top: 10px;
  }

  .ty .checked {
    width: 16px;
    height: 16px;
    display: inline-block;
    background-size: 100%;
    margin: 5px 5px 0px;
  }

  .checkedBr {
    border-radius: 50%;
    border: 1px solid #ff4081;
  }

  .checkedBg {
    background: url(../../../static/images/Currently-selected.png) no-repeat;
  }
</style>

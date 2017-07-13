// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {AjaxPlugin} from 'vux'
Vue.use(AjaxPlugin);// axios
import router from './router'// 路由
import store from './store'// VUEX
import MuseUI from 'muse-ui'// MuseUI
import 'muse-ui/dist/muse-ui.css'// 自定义主题
import './assets/theme.less'
import setWechatTitle from './utils/setWechatTitle.js'// spa动态微信标题
import './utils/rem'//rem
const FastClick = require('fastclick'); // 消除移动端点击延迟
FastClick.attach(document.body);
import "./assets/css/base.css";// 全局css
Vue.use(MuseUI);
require('es6-promise').polyfill();// 解决浏览器不支持promise
Vue.config.productionTip = false;
store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false,     // 加载状态
    // isLogin: true,     // 是否登陆状态  后期会根据接口或者其他参数
    // LoginShow: false,  // 是否要显示登陆组件
    // animate: 'in'      // 动画
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    // getToken(state, payload){
    //   state.isLogin = payload.isLogin
    // },
    // showLogin(state, payload) {
    //   state.LoginShow = payload.LoginShow
    // },
    // animateStatus(state, payload){
    //   state.animate = payload.animate
    // }
  }
});
const http = Vue.http;
const whiteList = ['/index', '/index/recommend', '/login', '/shop','/index/home']; // 不需要登陆的页面
router.beforeEach((to, from, next) => {
  typeof to.meta.pageTitle !== undefined && setWechatTitle(to.meta.pageTitle);//设置标题
  http.get('/webapi/index.php?format=json&app=meal&act=check_login&source=h5').then(res => {
    // 没登录
    if (res.data.error) { // 如果没登陆 并且要去的页面不是白名单页面
      console.log('没登录');
      if (whiteList.indexOf(to.path) != -1) { //  找到白名单
        store.commit('updateLoadingStatus', {
          isLoading: true,
        });
        next()
      } else {
        next('/login')
        // next()
      }
    } else {
      console.log(store);
      // 加载动画
      store.commit('updateLoadingStatus', {
        isLoading: true
      });
      console.log('登录了');
      if (to.path === '/login') { //  跳转到
        next({path: '/'});
      }
      next()
    }
  })


});

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});


import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
const index = resolve => require(['../views/Index/index'], resolve);// 首页主构
const home = resolve => require(['../views/Index/index/home'], resolve);// 首页
const my = resolve => require(['../views/My/my'], resolve);// 首页
const information = resolve => require(['../views/Index/information/information'], resolve);// 资讯
const collection = resolve => require(['../views/Index/information/collection'], resolve);// 资讯收藏
const inforDet = resolve => require(['../views/Index/information/inforDet'], resolve);// 资讯详情
const shop = resolve => require(['../views/Shop/shop.vue'], resolve);// 店铺

import recommend from '../views/Index/Recommend/recommend' // 推荐
import facialBeauty from '../views/Index/FacialBeauty/facialBeauty' // 面部美容
import plastic from '../views/Index/Plastic/plastic'       // 美体塑性
import order from '../views/Order/order'// 订单页
import shopOrder from '../views/Order/shopOrder' // 到店订单
import doorOrder from '../views/Order/doorOrder' // 上门订单
import shopOrderAll from '../views/Order/orderDev/shopOrderAll' // 上门订单
import obligation from '../views/Order/orderDev/obligation' // 待付款
import paid from '../views/Order/orderDev/paid' // 已支付
import underway from '../views/Order/orderDev/underway' // 进行中
import done from '../views/Order/orderDev/done' // 已完成
import evaluate from '../views/Order/orderDev/evaluate' // 待评价
import cancel from '../views/Order/orderDev/cancel' // 已取消
// 套餐介绍须知
import mealDescription from '../components/meal-description'
// 套餐支付
import mealPay from '../components/meal-pay'
import confirmOrder from '../components/confirmOrder'
const myMealdetails = resolve => require(['../views/My/my-mealdetails'], resolve);// 已支付套餐详情
const billingRecord = resolve => require(['../views/My/billing-record'], resolve);// 钱包
const login = resolve => require(['../views/login/Login.vue'], resolve);// 登陆

export default new Router({
  // scrollBehavior: () => ({y: 0}),
  routes: [{
    path: '/index',
    component: index,
    children: [
      {path: 'home', component: home, meta: {pageTitle: '首页'}},
      {path: 'my', component: my, meta: {pageTitle: '我的'}},// 我的
      {path: 'information', component: information, meta: {pageTitle: '资讯'}},// 我的
      {path: 'shop', component: shop, meta: {pageTitle: '店铺'}},// 我的
      // 推荐
      // {path: 'recommend', component: recommend, meta: {pageTitle: '首页'}},
      // 面部美容
      {path: 'facialBeauty', component: facialBeauty, meta: {pageTitle: '面部美容'}},
      // 美体塑性
      {path: 'plastic', component: plastic, meta: {pageTitle: '美体塑性'}},
      // 四季养生
      {path: 'health', component: require('../views/Index/Health/health.vue'), meta: {pageTitle: '四季养生'}},
      // 光电医学
      {path: 'medicine', component: require('../views/Index/Medicine/medicine.vue'), meta: {pageTitle: '光电医学'}}
    ]
  },
    // 资讯收藏
    {path: '/collection', component: collection, meta: {pageTitle: '收藏列表'}},
    // 资讯详情
    {path: '/inforDet', component: inforDet, meta: {pageTitle: '资讯详情'}},
    { // 门店列表  预约到店
      path: '/appointmentShop',
      component: require('../views/appointmentShop/shopList.vue'),
    },
    { // 门店列表  预约到店
      path: '/appointmentShop/:id',
      component: require('../views/appointmentShop/shopListDet.vue'),
    },
    {
      // 项目详细信息
      path: '/appointmentShop/projectItemDet/:id',
      component: require('../components/projectItemDet.vue'),
      meta: {
        pageTitle: '项目详情'
      }
    },
    { // 订单确认
      path: '/confirmOrder',
      component: require('../components/confirmOrder.vue'),
      meta: {
        pageTitle: '订单'
      }
    },
    { //套餐疗程
      path: '/setCourse',
      component: require('../views/setCourse/mealList.vue')
    },
    { //套餐介绍须知使用方法
      path: '/mealDescription',
      component: mealDescription
    },
    { // 套餐支付页面
      path: '/mealPay',
      component: mealPay,
      meta: {
        pageTitle: '套餐支付'
      }
    },
    {
      path: '/confirmOrder',
      component: confirmOrder
    },
    {
      // 套餐疗程列表详细信息
      path: '/mealdeta/:id',
      component: require('../views/setCourse/Mealdeta/mealdeta.vue')
    },
    { // 订单
      path: '/order',
      component: order,
      // 订单分为到店订单和上门订单
      redirect: '/order/all',
      // children: [{ // 到店订单
      //     path: 'shopOrder',
      //     component: shopOrder,
      children: [{ // 全部
        path: 'all',
        component: shopOrderAll,
        meta: {
          pageTitle: '我的订单(已预约)'
        },
      },
        { // 待付款
          path: 'obligation',
          component: obligation,
          meta: {
            pageTitle: '我的订单(待付款)'
          },
        },
        { // 已支付
          path: 'paid',
          component: paid,
          meta: {
            pageTitle: '我的订单(已支付)'
          },
        },
        { // 进行中
          path: 'underway',
          component: underway,
          meta: {
            pageTitle: '我的订单(进行中)'
          },
        },
        { // 已完成
          path: 'done',
          component: done,
          meta: {
            pageTitle: '我的订单(已完成)'
          },
        },
        { // 待评价
          path: 'evaluate',
          component: evaluate,
          meta: {
            pageTitle: '我的订单(待评价)'
          },
        },
        { // 已取消
          path: 'cancel',
          component: cancel,
          meta: {
            pageTitle: '我的订单(已取消)'
          },
        }
      ]
    },
    { // 上门订单
      path: '/doorOrder',
      component: doorOrder,
      meta: {
        pageTitle: '我的订单(已预约)'
      }
    },
    { // 我的
      path: '/my',
      component: require('../views/My/my'),
      meta: {
        pageTitle: '个人中心'
      }
    },
    { // 我的积分
      path: '/mypoints',
      component: require('../views/login/my-points'),
      meta: {
        pageTitle: '我的积分'
      }
    },
    { // 积分明细
      path: '/integral',
      component: require('../views/login/integral/integral_detail'),
      meta: {
        pageTitle: '积分明细'
      }
    },
    { // 用户设置
      path: '/setuser',
      component: require('../views/Setuser/setuser'),
      meta: {
        pageTitle: '设置'
      }
    },
    { // 帐户安全
      path: '/setpasswrod',
      component: require('../views/Setuser/setpasswrod/setaccounts'),
      meta: {
        pageTitle: '帐户安全'
      }
    },
    { // 密码设置
      path: '/setinit/setpass',
      component: require('../views/Setuser/setpasswrod/setinit/setpass'),
      meta: {
        pageTitle: '密码设置'
      }
    },
    { // 登录
      path: '/login', component: login,
      meta: {pageTitle: '登陆'}
    },
    { // 账户管理
      path: '/account',
      component: require('../components/Account.vue'),
      meta: {
        pageTitle: '账户管理'
      }
    },
    { // 我的套餐
      path: '/myMeal',
      component: require('../views/login/myMeal.vue'),
      meta: {
        pageTitle: '我的套餐'
      }
    },
    { // 我的套餐详情
      path: '/myMealdetails', component: myMealdetails,
      meta: {pageTitle: '套餐详情'}
    },
    { // 优惠券
      path: '/discountCoupon',
      component: require('../views/login/discount-coupon.vue'),
      meta: {pageTitle: '优惠券'}
    },
    { // 我的积分
      path: '/myPoints',
      component: require('../views/login/my-points.vue'),
      meta: {pageTitle: '我的积分'}
    },
    { // 我的钱包
      path: '/myWallet',
      component: require('../views/My/my-wallet.vue'),
      meta: {
        pageTitle: '我的钱包'
      }
    },
    { // 我的钱包
      path: '/billingRecord', component: billingRecord,
      meta: {pageTitle: '账单记录'}
    },
    { // 默认跳转到 '/index/recommend'
      path: '*',
      redirect: '/index/home'
    }
  ]
})

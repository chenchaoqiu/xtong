import Vue from 'vue'
import Router from 'vue-router'
import {role,roles} from '@/utils/role'

/**
 * hidden: true                   是否显示在侧边栏，true：不显示；false或者不填为显示
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
   role: ['admin','editor']     will control the page role (you can set multiple roles)
   title: 'title'               the name show in submenu and breadcrumb (recommend set)
   icon: 'svg-name'             the icon show in the sidebar,
   noCache: true                if fasle ,the page will no be cached(default is false)
 }
 **/

Vue.use(Router)
/* Layout */
import Layout from '@/views/layout/Layout'


export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  { path: '/pass', component: () => import('@/views/password/password'), hidden: true, meta:{title: '找回密码'} },
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    meta: {
      title: '业务概览',
      icon: 'dashboard'
    },
    children: [
      { path: 'index', component: () => import('@/views/businessCase/index'), name: '业务概览',
        meta: { title: '业务概览', icon: 'gk', noCache: true ,role:(role[0]) }}
    ],
    hidden:roles(role[0])
  },
  {
    path: '1',
    component: Layout,
    redirect: 'plan',
    children: [{
      path: '/plan/list',
      component: () => import('@/views/plan/list'),
      name: 'index',
      meta: { title: '计划管理', icon: 'jh', noCache: true ,role:(role[1]) }
    }],
    hidden:roles(role[1])
  },
  {
    path: '2',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '日程管理',
      icon: 'dashboard'
    },
    children: [
      // { path: '/plan/list', component: () => import('@/views/plan/list'), name: '计划列表', meta: { title: '计划列表', noCache: true }},
      { path: '/plan/sonList', component: () => import('@/views/plan/sonList'), name: '日程管理',
        meta: { title: '日程管理', icon: 'rc' , noCache: true ,role:(role[1]) }}
    ],
    hidden:roles(role[1])
  },
  {
    path: '4',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '订单管理',
      icon: 'dashboard'
    },
    children: [
      { path: '/order/list', component: () => import('@/views/order/list'), name: '订单管理',
        meta: { title: '订单管理', icon: 'dd', noCache: true ,role:(role[2]) }},
    ],
    hidden:roles(role[2])
  },
  {
    path: '3',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '客户管理',
      icon: 'dashboard'
    },
    children: [
      { path: '/member/list', component: () => import('@/views/member/list'), name: '客户管理',
        meta: { title: '客户管理', icon: 'kh', noCache: true ,role:(role[0]) }}
    ],
    hidden:roles(role[0])
  },
  {
    path: '5',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '员工管理',
      icon: 'dashboard'
    },
    children: [
      { path: '/employee/list', component: () => import('@/views/employee/list'), name: '员工管理',
        meta: { title: '员工管理', icon: 'yg', noCache: true ,role:(role[2]) }}
    ],
    hidden:roles(role[2])
  },
  {
    path: '5',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '合作商',
      icon: 'dashboard'
    },
    children: [
      { path: '/bizzPartner/list', component: () => import('@/views/bizzPartner/list'), name: '合作商',
        meta: { title: '合作商', icon: 'hzs', noCache: true ,role:(role[2]) }}
    ],
    hidden:roles(role[2])
  },
  {
    path: '6',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '资料管理',
      icon: 'zl',
      role:(role[3])
    },
    children: [
      { path: '/salePackage/list', component: () => import('@/views/salePackage/index'), name: '卡项管理', meta: { title: '卡项管理', noCache: true ,role:(role[3]) }},
      { path: '/proficient/list', component: () => import('@/views/proficient/list'), name: '专家资料', meta: { title: '专家资料', noCache: true ,role:(role[3])}},
      { path: '/project/list', component: () => import('@/views/project/list'), name: '项目资料', meta: { title: '项目资料', noCache: true ,role:(role[3])}},
      { path: '/brand/setting', component: () => import('@/views/brand/setting'), name: '品牌资料', meta: { title: '品牌资料', noCache: true ,role:(role[3])}},
    ],
    hidden:roles(role[3])
  },
  {
    path: '7',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '设置',
      icon: 'sz',
      role:(role[3])
    },
    children: [
      { path: '/department/setting', component: () => import('@/views/DepartmentManagement/DepartmentManagement'), name: '部门设置', meta: { title: '部门设置', noCache: true ,role:(role[3])}},
      { path: '/actionRecord/list', component: () => import('@/views/actionRecord/list'), name: '操作日志', meta: { title: '操作日志', noCache: true ,role:(role[3])}}
    ],
    hidden:roles(role[3])
  }
  /* {
    path: '/index1',
    component: Layout,
    redirect: 'noredirect',
    meta:{title:'4454'},
    children: [{
      path: 'dev',
      component: () => import('@/views/index1/index'),
      name: 'index',
      meta: { title: '首页1', icon: 'dashboard', noCache: true ,role:[1,2,3]}
    },
      {
        path: 'dev',
        component: () => import('@/views/index1/index'),
        name: 'index',
        meta: { title: '首页1', icon: 'dashboard', noCache: true}
      }]
  }*/
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  /* {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: '错误页面',
      icon: '404'
    },
    children: [
      { path: '401', component: () => import('@/views/errorPage/401'), name: 'page401', meta: { title: '401', noCache: true }},
      { path: '404', component: () => import('@/views/errorPage/404'), name: 'page404', meta: { title: '404', noCache: true }}
    ]
  },
  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'log', component: () => import('@/views/errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  },
  { path: '*', redirect: '/404', hidden: true }*/
]

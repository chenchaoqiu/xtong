import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'
import {
  MessageBox
} from 'element-ui'
import {
  scriptes
} from '@/utils/index'

const api = {
  pageSize: 20,
  url: scriptes(),
  connector(e) {
    let resolve, reject;
    const promist = new Promise(function (res, req) {
      resolve = res
      reject = req
    })
    request(e).then(res => {
      resolve(res.data)
    })
    return promist
  },
  querys(e) {
    if (!e) {
      e = {}
    }
    if (!e.tokens) {
      e.token = JSON.parse(getToken()).token;
      e.pageSize = this.pageSize;
    }
    delete e.tokens;
    return e
  },
  pageList(e) {
    return this.connector({
      url: '/api/pcadmin/plan/pageList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  actionRecordList(e) {
    return this.connector({
      url: '/api/pcadmin/actionRecord/pageList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  memberGetList(e) {
    return this.connector({
      url: '/api/pcadmin/member/getList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  employeeGetList(e) {
    return this.connector({
      url: '/api/pcadmin/employee/getList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  employeeAdd(e) {
    return this.connector({
      url: '/api/pcadmin/employee/add',
      method: 'POST',
      params: this.querys(e)
    })
  },
  employeeDetail(e) {
    return this.connector({
      url: '/api/pcadmin/employee/detail',
      method: 'POST',
      params: this.querys(e)
    })
  },
  employeUpdate(e) {
    return this.connector({
      url: '/api/pcadmin/employee/update',
      method: 'POST',
      params: this.querys(e)
    })
  },
  salePackageList(e) {
    return this.connector({
      url: '/api/pcadmin/salePackage/list',
      method: 'POST',
      params: this.querys(e)
    })
  },
  planPageList(e) {
    return this.connector({
      url: '/api/pcadmin/plan/pageList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  bizzPartnerPageList(e) {
    return this.connector({
      url: '/api/pcadmin/bizzpartner/pageList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  planSonPageList(e) {
    return this.connector({
      url: '/api/pcadmin/plan/sonPageList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  expertsList(e) {
    /*专家列表*/
    return this.connector({
      url: '/api/pcadmin/proficient/list',
      method: 'POST',
      params: this.querys(e)
    })
  },
  orderList(e) {
    return this.connector({
      url: '/api/pcadmin/order/list',
      method: 'POST',
      params: this.querys(e)
    })
  },
  categoryList(e) {
    return this.connector({
      url: '/api/pcadmin/category/getList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  projectList(e) {
    return this.connector({
      url: '/api/pcadmin/project/getList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  brandAdd(e) {
    return this.connector({
      url: '/api/pcadmin/brand/add',
      method: 'POST',
      params: this.querys(e)
    })
  },
  brandUpdate(e) {
    return this.connector({
      url: '/api/pcadmin/brand/update',
      method: 'POST',
      params: this.querys(e)
    })
  },
  brandPicture(e) {
    return this.connector({
      url: '/api/pcadmin/brand/picture',
      method: 'POST',
      params: this.querys(e)
    })
  },
  departmentGetTreeList(e) {
    return this.connector({
      url: '/api/pcadmin/department/getTreeList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  getValidateCodeKey(e) {
    /*获取图形验证码授权key*/
    e.tokens = true;
    return this.connector({
      url: '/api/pcadmin/common/getValidateCodeKey',
      method: 'POST',
      params: this.querys(e)
    })
  },
  sendForgetPwdMobileCode(e) {
    /*发送忘记密码手机验证码*/
    e.tokens = true;
    return this.connector({
      url: '/api/pcadmin/common/sendForgetPwdMobileCode',
      method: 'POST',
      params: this.querys(e)
    })
  },
  validateForgetPwdMobileCode(e) {
    /*验证忘记密码手机验证码*/
    e.tokens = true;
    return this.connector({
      url: '/api/pcadmin/common/validateForgetPwdMobileCode',
      method: 'POST',
      params: this.querys(e)
    })
  },
  resetPassword(e) {
    /*重置密码*/
    e.tokens = true;
    return this.connector({
      url: '/api/pcadmin/common/resetPassword',
      method: 'POST',
      params: this.querys(e)
    })
  },
  addBizzpartner(e) {
    /*新增合作商*/
    return this.connector({
      url: '/api/pcadmin/bizzpartner/add',
      method: 'POST',
      params: this.querys(e)
    })
  },
  modifyBizzpartner(e) {
    /*修改合作商*/
    return this.connector({
      url: '/api/pcadmin/bizzpartner/modify',
      method: 'POST',
      params: this.querys(e)
    })
  },
  addProject(e) {
    /*新增项目*/
    return this.connector({
      url: '/api/pcadmin/project/add',
      method: 'POST',
      params: this.querys(e)
    })
  },
  addMember(e) {
    /* 新增客户 */
    return this.connector({
      url: '/api/pcadmin/member/add',
      methods: 'POST',
      params: this.querys(e)
    })
  },
  getMeployeeList(e) {
    /* 员工列表 */
    return this.connector({
      url: '/api/pcadmin/employee/getList',
      methods: 'POST',
      params: this.querys(e)
    })
  },
  departmentGetTreeList(e) {
    /* 员工列表 */
    return this.connector({
      url: '/api/pcadmin/department/getTreeList',
      methods: 'POST',
      params: this.querys(e)
    })
  },
  getBizzpartnerList(e) {
    /* 合作商列表 */
    return this.connector({
      url: '/api/pcadmin/bizzpartner/list',
      methods: 'POST',
      params: this.querys(e)
    })
  },
  addSalePackage(e) {
    /*新增项目*/
    return this.connector({
      url: '/api/pcadmin/salePackage/add',
      method: 'POST',
      params: this.querys(e)
    })
  },
  changeStatus(e) {
    /*上下架项目*/
    return this.connector({
      url: '/api/pcadmin/salePackage/changeStatus',
      method: 'POST',
      params: this.querys(e)
    })
  },
  salePackageDetail(e) {
    /*项目详情*/
    return this.connector({
      url: '/api/pcadmin/salePackage/detail',
      method: 'POST',
      params: this.querys(e)
    })
  },
  salePackageModify(e) {
    /*上下架项目*/
    return this.connector({
      url: '/api/pcadmin/salePackage/modify',
      method: 'POST',
      params: this.querys(e)
    })
  },
  proficientShow(e) {
    /*上下架项目*/
    return this.connector({
      url: '/api/pcadmin/proficient/show',
      method: 'POST',
      params: this.querys(e)
    })
  },
  proficientDelete(e) {
    /*上下架项目*/
    return this.connector({
      url: '/api/pcadmin/proficient/delete',
      method: 'POST',
      params: this.querys(e)
    })
  },
  proficientAdd(e) {
    /*上下架项目*/
    return this.connector({
      url: '/api/pcadmin/proficient/add',
      method: 'POST',
      params: this.querys(e)
    })
  },
  proficientModify(e) {
    /*上下架项目*/
    return this.connector({
      url: '/api/pcadmin/proficient/modify',
      method: 'POST',
      params: this.querys(e)
    })
  },
  getTagList(e) {
    /* 获取标签列表*/
    return this.connector({
      url: '/api/pcadmin/tag/getList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  /*部门设置：添加部门*/
  AddDepartment(e) {
    return this.connector({
      url: '/api/pcadmin/department/add',
      method: 'POST',
      params: this.querys(e)
    })
  },
  /*部门设置：修改部门名称 */
  ChangeName(e) {
    return this.connector({
      url: '/api/pcadmin/department/update',
      method: 'POST',
      params: this.querys(e)
    })
  },
  /*部门设置：删除部门 Delete department*/
  DeleteDepartment(e) {
    return this.connector({
      url: '/api/pcadmin/department/delete',
      method: 'POST',
      params: this.querys(e)
    })
  },
  addTag(e) {
    /* 添加标签 */
    return this.connector({
      url: '/api/pcadmin/tag/add',
      method: 'POST',
      params: this.querys(e)
    })
  },
  planTodayList(e) {
    /*首页-业务概览数据*/
    return this.connector({
      url: '/api/pcadmin/plan/todayList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  deleteTag(e) {
    /* 删除标签*/
    return this.connector({
      url: '/api/pcadmin/tag/delete',
      method: 'POST',
      params: this.querys(e)
    })
  },
  employeeConsole(e) {
    /*首页-业务概览数据*/
    return this.connector({
      url: '/api/pcadmin/employee/console',
      method: 'POST',
      params: this.querys(e)
    })
  },
  orderTransactionData(e) {
    /*首页-业务概览数据*/
    return this.connector({
      url: '/api/pcadmin/order/transactionData',
      method: 'POST',
      params: this.querys(e)
    })
  },
  projectUpdate(e) {
    /*编辑计划*/
    return this.connector({
      url: '/api/pcadmin/project/update',
      method: 'POST',
      params: this.querys(e)
    })
  },
  salePackageList(e) {
    /*商品列表*/
    return this.connector({
      url: '/api/pcadmin/salePackage/list',
      method: 'POST',
      params: this.querys(e)
    })
  },
  planAdd(e) {
    /*申请计划*/
    return this.connector({
      url: '/api/pcadmin/plan/add',
      method: 'POST',
      params: this.querys(e)
    })
  },
  planDetail(e) {
    /* 计划详情*/
    return this.connector({
      url: '/api/pcadmin/plan/detail',
      method: 'POST',
      params: this.querys(e)
    })
  },
  memberDetail(e) {
    /* 客户详情*/
    return this.connector({
      url: '/api/pcadmin/member/detail',
      method: 'POST',
      params: this.querys(e)
    })
  },
  updateMember(e) {
    /* 修改客户*/
    return this.connector({
      url: 'api/pcadmin/member/update',
      method: 'POST',
      params: this.querys(e)
    })
  },
  orderAdd(e) {
    /* 新建订单*/
    return this.connector({
      url: '/api/pcadmin/order/add',
      method: 'POST',
      params: this.querys(e)
    })
  },
  CommunicationDetails(e){
    /* 计划管理详情里面的沟通记录 */
    return this.connector({
      url: '/api/pcadmin/communicationLog/pageList',
      method: 'POST',
      params: this.querys(e)
    })
  },
  orderDetail(e) {
    /* 订单详情*/
    return this.connector({
      url: '/api/pcadmin/order/detail',
      method: 'POST',
      params: this.querys(e)
    })
  },
  CommunicationRelease5(e){
    /* 计划管理详情里面的沟通记录 发布*/
    return this.connector({
      url: '/api/pcadmin/communicationLog/add',
      method: 'POST',
      params: this.querys(e)
    })
  },
  orderAudit(e) {
    /* 客户详情*/
    return this.connector({
      url: '/api/pcadmin/order/audit',
      method: 'POST',
      params: this.querys(e)
    })
  }
}

export default api;

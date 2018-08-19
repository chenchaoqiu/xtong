import {
	wxRequest,url
} from '../utils/wxRequest';

let env = "-test" //-dev 或者 -test
const apiMall = url;
//const apiMall = 'http://t.mall.mobile.ivymei.com/wxClient/'

//检测手机号码是否存在
const getcode = (params) => wxRequest(params, apiMall + 'api/common/getVerifyCode');
//登陆
const login = (params) => wxRequest(params, apiMall + 'api/common/login');
//自动登录
const againLogin = (params) => wxRequest(params, apiMall + 'api/common/autoLogin');
//授权登录
const selfRegisterLogin = (params) => wxRequest(params, apiMall + 'api/common/selfRegisterLogin');
// 修改姓名
const editName = (params) => wxRequest(params, apiMall + 'api/spreader/updateName');
// 发送修改手机的短信接口
const ValidateCode = (params) => wxRequest(params, apiMall + 'api/spreader/validateCode');
// 修改手机号
const UpdateMobile = (params) => wxRequest(params, apiMall + 'api/spreader/updateMobile');
//授权登录
const getCustom = (params) => wxRequest(params, apiMall + 'api/spreader/userList');
//获取用户信息
const getUserInfo = (params) => wxRequest(params, apiMall + 'api/spreader/detail');
//活动团队列表
const activityList = (params) => wxRequest(params, apiMall + 'api/spreader/activityList');
//首页数据
const getSpreaderInfo = (params) => wxRequest(params, apiMall + 'api/spreader/info');
//组织团队列表
const groupList = (params) => wxRequest(params, apiMall + 'api/organization/team');
//根据spreaderId获取每个组的成员列表--活动团队详情
const GroupDetails = (params) => wxRequest(params, apiMall + 'api/activity/team');
//订单详情
const orderDetails = (params) => wxRequest(params, apiMall + 'api/order/detail');
//获取活动列表
const getActiveList = (params) => wxRequest(params, apiMall + 'api/active/list');
//推广订单
const spreadOrder = (params) => wxRequest(params, apiMall + 'api/spreader/orderList');
//推广员认领用户
const confirmActivityUser = (params) => wxRequest(params, apiMall + 'api/spreader/confirmActivityUser');
//活动详情
const activeDetail = (params) => wxRequest(params, apiMall + 'api/active/detail');
//用户确认
const userConfirmList = (params) => wxRequest(params, apiMall + 'api/activity/userConfirmList');
//服务商家列表
const getcompanyList = (params) => wxRequest(params, apiMall + 'api/spreader/companyList');
//生成商家二维码
const companyQrCode = (params) => wxRequest(params, apiMall + 'api/spreader/companyQrCode');
module.exports = {
	// sendSubscribeMessage,
  getcode,
  login,
  againLogin,
  selfRegisterLogin,
  editName,
  ValidateCode,
  UpdateMobile,
  getCustom,
  getUserInfo,
  activityList,
  getSpreaderInfo,
  groupList,
  GroupDetails,
  orderDetails,
  getActiveList,
  spreadOrder,
  confirmActivityUser,
  activeDetail,
  userConfirmList,
  getcompanyList,
  companyQrCode,
}



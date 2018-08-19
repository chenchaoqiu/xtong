import {
	wxRequest,
	url,
	APPNAME
} from '../utils/wxRequest';

let env = "-test" //-dev 或者 -test
const apiMall = url;

//const apiMall = 'http://t.mall.mobile.ivymei.com/wxClient/'

//登陆
const login = (params) => wxRequest(params, apiMall + 'common/login',true,false);
//获取图形验证码的key
const getValidateCodeKey = (params) => wxRequest(params, apiMall + 'common/getValidateCodeKey',false,false);
//获取图形验证码
const validateCode = (params) => wxRequest(params, apiMall + 'validateCode',false,false);
//获取短信验证码的key
const getPwdMobileCode = (params) => wxRequest(params, apiMall + 'common/sendForgetPwdMobileCode');
//验证忘记密码手机验证码
const validateForgetPwdMobileCode = (params) => wxRequest(params, apiMall + 'common/validateForgetPwdMobileCode');
//重置密码接口
const resetPassword = (params) => wxRequest(params, apiMall + 'common/resetPassword');
//工作台
const console = (params) => wxRequest(params, apiMall + 'employee/console');
//计划列表
const planList = (params) => wxRequest(params, apiMall + 'plan/list');
//计划列表-分页
const planPageList = (params) => wxRequest(params, apiMall + 'plan/pageList');
//日程横向日历
const scheduleCalendar = (params) => wxRequest(params, apiMall + 'plan/scheduleCalendar',false);
//日程列表
const scheduleList = (params) => wxRequest(params, apiMall + 'plan/scheduleList');
//全部业务
const scheduleAllList = (params) => wxRequest(params, apiMall + 'plan/list');
//员工详情
const getEmployeeDetail = (params) => wxRequest(params, apiMall + 'employee/detail');
//获取手机验证码
const sendChangePhoneMobileCode = (params) => wxRequest(params, apiMall + 'common/sendChangePhoneMobileCode');
//订单列表
const orderList = (params) => wxRequest(params, apiMall + 'order/list');
//订单详情
const orderDetail = (params) => wxRequest(params, apiMall + 'order/detail');
//项目列表
const projectList = (params) => wxRequest(params, apiMall + 'salePackage/list');
//分类列表接口
const getList = (params) => wxRequest(params, apiMall + 'category/getList');
//员工业绩
const getEmployeeAchieve = (params) => wxRequest(params, apiMall + 'employee/achieve');
//获取顾客列表（按中文首先字母大写显示分组排序）
const listGroupByCn = (params) => wxRequest(params, apiMall + 'member/listGroupByCn');
//获取相关人列表
const listGroupDpt = (params) => wxRequest(params, apiMall + 'employee/listGroupDpt');
//申请计划
const planAdd = (params) => wxRequest(params, apiMall + 'plan/add');
//已申请计划详情
const planDetail = (params) => wxRequest(params, apiMall + 'plan/detail');
//设立计划详情
const setupDetail = (params) => wxRequest(params, apiMall + 'plan/setupDetail');
//设立计划--保存
const planSetup = (params) => wxRequest(params, apiMall + 'plan/setup');
//修改计划
const planModify = (params) => wxRequest(params, apiMall + 'plan/modify');
//我的团队-个人详情
const employeeDetail = (params) => wxRequest(params, apiMall + 'employee/detail');
//专家资料列表
const proficientList = (params) => wxRequest(params, apiMall + 'proficient/list');
//专家详情页
const proficientDetail = (params) => wxRequest(params, apiMall + 'proficient/detail');
//商品详情页
const salePackagDetail = (params) => wxRequest(params, apiMall + 'salePackage/detail');
//合作商列表
const bizzpartnerList = (params) => wxRequest(params, apiMall + 'bizzpartner/list');
//合作商详情
const bizzpartnerDetail = (params) => wxRequest(params, apiMall + 'bizzpartner/detail');
//获取客户列表
const getMemberList = (params) => wxRequest(params, apiMall + 'member/getList');
//更换密码
const updatePassword = (params) => wxRequest(params, apiMall + 'employee/updatePassword');
//更换手机号码
const updatePhone = (params) => wxRequest(params, apiMall + 'common/changePhone');
//创建订单
const orderAdd = (params) => wxRequest(params, apiMall + 'order/add');
//改名字
const updataName = (params) => wxRequest(params, apiMall + 'employee/updataName');
//改生日
const updataBirthday = (params) => wxRequest(params, apiMall + 'employee/updataBirthday');
//沟通记录
const getPageList = (params) => wxRequest(params, apiMall + 'communicationLog/pageList');
//添加沟通记录
const addCommuniLog = (params) => wxRequest(params, apiMall + 'communicationLog/add');
//订单修改
const orderModify = (params) => wxRequest(params, apiMall + 'order/modify');
//订单审核
const orderAudit = (params) => wxRequest(params, apiMall + 'order/audit');
//订单收款
const repay = (params) => wxRequest(params, apiMall + 'order/repay');
//执行人完成子计划
const finishExecutor = (params) => wxRequest(params, apiMall + 'plan/finishExecutor',false);
//执行人列表
const getExecutorList = (params) => wxRequest(params, apiMall + 'plan/executorList');
//计划详情
const getPlandetail = (params) => wxRequest(params, apiMall + 'plan/detail');
//获取分组数据
const getGroupByBizzPartner = (params) => wxRequest(params, apiMall + 'member/groupByBizzPartner');
//客户详情
const getMemberDetail = (params) => wxRequest(params, apiMall + 'member/detail');
//品牌资料
const brandPicture = (params) => wxRequest(params, apiMall + 'brand/picture');
//计划数量统计
const countByStatus = (params) => wxRequest(params, apiMall + 'plan/countByStatus');
//获取客户列表
const memberList = (params) => wxRequest(params, apiMall + 'member/list');
//修改客户
const updateMember = (params) => wxRequest(params, apiMall + 'member/update');
//添加客户
const addMember = (params) => wxRequest(params, apiMall + 'member/add');
//数据概况-客户类型汇总
const typeList = (params) => wxRequest(params, apiMall + 'member/typeList');
//数据概况-客户来源汇总
const groupByBizzPartner = (params) => wxRequest(params, apiMall + 'member/groupByBizzPartner');
//更新用户信息
const updateUserInfo = (params) => wxRequest(params, apiMall + 'common/updateUserInfo');
//合作商家列表
const getSourceList = (params) => wxRequest(params, apiMall + 'bizzpartner/sourceList');
module.exports = {
	url,
	login,
	getValidateCodeKey,
	validateCode,
	getPwdMobileCode,
	validateForgetPwdMobileCode,
	resetPassword,
	console,
	planList,
	scheduleCalendar,
	scheduleList,
	scheduleAllList,
	getEmployeeDetail,
	sendChangePhoneMobileCode,
	orderList,
	orderDetail,
	projectList,
	getList,
	getEmployeeAchieve,
	listGroupByCn,
	listGroupDpt,
	planAdd,
	planDetail,
	setupDetail,
	planSetup,
	planModify,
	employeeDetail,
	proficientList,
	proficientDetail,
	salePackagDetail,
	bizzpartnerList,
	bizzpartnerDetail,
	getMemberList,
	updatePassword,
	updatePhone,
	orderAdd,
	updataName,
	updataBirthday,
	getPageList,
	addCommuniLog,
	orderModify,
	orderAudit,
	repay,
	finishExecutor,
	getExecutorList,
	getPlandetail,
	getGroupByBizzPartner,
	getMemberDetail,
	brandPicture,
	countByStatus,
	memberList,
	updateMember,
	addMember,
	typeList,
	groupByBizzPartner,
	updateUserInfo,
	getSourceList,
	planPageList,
}



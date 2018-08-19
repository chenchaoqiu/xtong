import {
	wxRequest,
	url
} from '../utils/wxRequest';
let apiMall = url;
let env = "-test" //-dev 或者 -test

//微信的jscode换取sessionKey
const wxJsCode2Session = (params) => wxRequest(params, apiMall + "api/wechat/jscode2session");
const user2session = (params) => wxRequest(params, apiMall + "api/wechat/user2session?jsoncallback=?");

//检测手机号码是否存在
const getcode = (params) => wxRequest(params, apiMall + 'api/employee/getVerifyCode');
//登陆
const login = (params) => wxRequest(params, apiMall + 'api/employee/login');
//授权登录
const againLogin = (params) => wxRequest(params, apiMall + 'api/employee/againLogin');
//授权登录
const selfRegisterLogin = (params) => wxRequest(params, apiMall + 'api/employee/selfRegisterLogin');
//首页数据
const getHomeData = (params) => wxRequest(params, apiMall + 'api/achieve/homepageData');
//顾客列表
const customerlist = (params) => wxRequest(params, apiMall + 'api/customer/list');
//顾客信息
const custormeintion = (params) => wxRequest(params, apiMall + 'api/customer/detail');
//还款订单
const cusdetails = (params) => wxRequest(params, apiMall + 'api/order/needPayDetail');
//搜索
const search = (params) => wxRequest(params, apiMall + 'api/customer/listByNameOrMobile');
// 修改姓名
const editName = (params) => wxRequest(params, apiMall + 'api/employee/updateName');
//修改身份码
const editId = (params) => wxRequest(params, apiMall + 'api/employee/updateAuthCode');
//保存签名
const signatureSave = apiMall + 'api/book/complete';
//预约列表
const orderope = (params) => wxRequest(params, apiMall + 'api/book/list');
//开始服务
const orderstati = (params) => wxRequest(params, apiMall + 'api/book/begin');
//已关闭
const close = (params) => wxRequest(params, apiMall + 'api/employee/updateAuthCode');
//待操作详情
const orderd = (params) => wxRequest(params, apiMall + 'api/book/detail');
// 获取员工个人资料接口
const getUserDetail = (params) => wxRequest(params, apiMall + 'api/employee/detail');
// (美容师/顾问)每日合计数据
const employeeDayAchieve = (params) => wxRequest(params, apiMall + 'api/achieve/employeeDayAchieve');
// (美容师顾问) 每日业绩详情数据(含：销售、消耗、手工费、服务人数)
const employeeAchieve = (params) => wxRequest(params, apiMall + 'api/achieve/employeeAchieve');
//  员工每月业绩合计数据（店长看的）
const employeeMonthAchieve = (params) => wxRequest(params, apiMall + 'api/achieve/employeeMonthAchieve');
//预约详情
const getAppointmentDetails = (params) => wxRequest(params, apiMall + 'api/book/detail');

// 获取分类列表接口
const list = (params) => wxRequest(params, apiMall + 'api/category/list');
// 按分类筛选商品列表接口
const product = (params) => wxRequest(params, apiMall + 'api/product/list');
// 选择规格接口
const guige = (params) => wxRequest(params, apiMall + 'api/product/detail');
// 添加购物
const addcart = (params) => wxRequest(params, apiMall + 'api/cart/add');
// 获取购物车列表
const cartlist = (params) => wxRequest(params, apiMall + 'api/cart/list');
//	修改购物车
const cartUpdate = (params) => wxRequest(params, apiMall + 'api/cart/update');
//	还原购物车
const updateOriginPrice = (params) => wxRequest(params, apiMall + 'api/cart/updateOriginPrice');
//创建订单接口
const orderadd = (params) => wxRequest(params, apiMall + 'api/order/add');
// 获取购物车最低预付款金额、购物车总额
const amountMinPay = (params) => wxRequest(params, apiMall + 'api/cart/amountMinPay');

//生成结算码
const generateSettlement = (params) => wxRequest(params, apiMall + 'api/order/remainPayCode');
//结算信息
const getOrderPayInfo = (params) => wxRequest(params, apiMall + 'api/order/payInfo');
//项目详情
const getProjectDetails = (params) => wxRequest(params, apiMall + 'api/book/projectList');
//获取用户信息
const getUserInfo = (params) => wxRequest(params, apiMall + 'api/member/detail');
//授权码接口
const postAuth = (params) => wxRequest(params, apiMall + 'api/book/auth');
const yyAuth = (params) => wxRequest(params, apiMall + 'api/book/auth',false);
//获取员工列表
const getEmployeeList = (params) => wxRequest(params, apiMall + 'api/employee/list');
// 预约到店时间列表
const getArriveTimeList = (params) => wxRequest(params, apiMall + 'api/book/arriveTimeList');
//新增预约接口
const addNewBook = (params) => wxRequest(params, apiMall + 'api/book/add');
//顾问列表接口
const employeeList = (params) => wxRequest(params, apiMall + 'api/employee/list');
//预约项目列表
const getNewOrderProjectList = (params) => wxRequest(params, apiMall + 'api/book/newOrderProjectList');
//取消预约，提示信息
const closeReason = (params) => wxRequest(params, apiMall + 'api/book/closeReason?comanyId=1');// 获取用户基本信息接口-新增预约接口
const memberBase = (params) => wxRequest(params, apiMall + 'api/member/base');
// 获取预约工作表数据格式接口
const timeTable = (params) => wxRequest(params, apiMall + 'api/book/timeTable');
// 取消预约成功接口
const deleBook = (params) => wxRequest(params, apiMall + 'api/book/close');
// 接受预约
const acceptBook = (params) => wxRequest(params, apiMall + 'api/book/accept');
//加单
const newOrder = (params) => wxRequest(params, apiMall + 'api/book/newOrder');
// 保存填写或确定预约
const selBook = (params) => wxRequest(params, apiMall + 'api/book/confirmSelect');
//重设
const resSet = (params) => wxRequest(params, apiMall + 'api/book/confirmSelect');
//获取预约列表
const getAppointmentProjectList = (params) => wxRequest(params, apiMall + 'api/book/projectList');
//确认预约到店接口
const arrivedSure = (params) => wxRequest(params, apiMall + 'api/book/arrived');
//开消耗单接口
const saveConsumeList = (params) => wxRequest(params, apiMall + 'api/book/saveConsumeList');
//修改预约
const SetEdit = (params) => wxRequest(params, apiMall + 'api/book/edit');
//扫码进来获取流水号
const sceneParams = (params) => wxRequest(params, apiMall + 'api/wx/sceneParams');
//扫码进来获取订单详情
const payDetail = (params) => wxRequest(params, apiMall + 'api/order/payDetail');
//扫码进来提交订单
const confirmPay = (params) => wxRequest(params, apiMall + 'api/order/confirmPay');
module.exports = {
	getcode,
	login,
	againLogin,
	selfRegisterLogin,
	getHomeData,
	customerlist,
	custormeintion,
	editName,
	editId,
	search,
	getUserDetail,
	signatureSave,
	employeeDayAchieve,
	employeeAchieve,
	cusdetails,
	getAppointmentDetails,
	employeeMonthAchieve,
	list,
	product,
	guige,
	addcart,
	cartlist,
	cartUpdate,
	orderadd,
	amountMinPay,
	getOrderPayInfo,
	orderope,
	getProjectDetails,
	orderd,
	orderstati,
	generateSettlement,
	getEmployeeList,
	employeeList,
	getNewOrderProjectList,
	closeReason,
	getUserInfo,
	postAuth,
	getArriveTimeList,
	addNewBook,
	memberBase,
	timeTable,
	deleBook,
	acceptBook,
	newOrder,
	selBook,
	yyAuth,
	resSet,
	getAppointmentProjectList,
    arrivedSure,
    saveConsumeList,
    SetEdit,
    updateOriginPrice,
    sceneParams,
    payDetail,
    confirmPay
}

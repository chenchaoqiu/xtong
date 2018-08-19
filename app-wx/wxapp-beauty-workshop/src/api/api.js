import {
	wxRequest,
	url,
	APPNAME
} from '../utils/wxRequest';

let env = "-test" //-dev 或者 -test
const apiMall = url;
//const apiMall = 'http://t.mall.mobile.ivymei.com/wxClient/'

//发送客服信息
const sendSubscribeMessage = (params) => wxRequest(params, apiMall + 'api/common/sendSubscribeMessage');
//获取预约列表
const getAppointmentList = (params) => wxRequest(params, apiMall + 'api/book/bookings');
//获取时间表
const getArriveTimeList = (params) => wxRequest(params, apiMall + 'api/book/arriveTimeList');
//可使用项目列表
const getUsableProjectList = (params) => wxRequest(params, apiMall + 'api/book/ableList');
//获取预约详情
const getAppointmentDetail = (params) => wxRequest(params, apiMall + 'api/book/detail');
//新增预约
const addAppointment = (params) => wxRequest(params, apiMall + 'api/book/add');
//取消预约
const cancelAppointment = (params) => wxRequest(params, apiMall + 'api/book/cancel');
//更新预约
const updateAppointment = (params) => wxRequest(params, apiMall + 'api/book/update');
//获取分类列表
const getCategoryList = (params) => wxRequest(params, apiMall + 'api/category/list');
//按分类筛选商品列表
const getProductList = (params) => wxRequest(params, apiMall + 'api/product/list');
//检测手机号码是否存在
const getcode = (params) => wxRequest(params, apiMall + 'api/employee/getVerifyCode');
//登陆
const login = (params) => wxRequest(params, apiMall + 'api/employee/login');
//授权登录
const againLogin = (params) => wxRequest(params, apiMall + 'api/common/login');
//手机
const bindMobile = (params) => wxRequest(params, apiMall + 'api/member/bindMobile');
//按服务包id获取服务包详情接口
const getProductDetail = (params) => wxRequest(params, apiMall + 'api/product/detail');
//我的服务-已完成
const getDoneList = (params) => wxRequest(params, apiMall + 'api/book/doneList');
//我的服务-待使用
const getAbleList = (params) => wxRequest(params, apiMall + 'api/book/ableList');
//我的订单
const getOrderList = (params) => wxRequest(params, apiMall + 'api/order/list');
//订单详情
const getOrderDet = (params) => wxRequest(params, apiMall + 'api/order/detail');
//获取用户信息
const getUserInfo = (params) => wxRequest(params, apiMall + 'api/member/detail');
//更新用户信息
const updateUserInfo = (params) => wxRequest(params, apiMall + 'api/member/update');
//购物车列表，填写订单
const getCar = (params) => wxRequest(params, apiMall + 'api/cart/list');
//删除、修改购物车
const getCarupdate = (params) => wxRequest(params, apiMall + 'api/cart/update');
//创建订单
const setOrder = (params) => wxRequest(params, apiMall + 'api/order/add');
//获取验证码
const verifyCode = (params) => wxRequest(params, apiMall + 'api/member/verifyCode');
//切换门店
const tabShop = (params) => wxRequest(params, apiMall + 'api/shop/listByDistance');
//支付签名
const wxPay = (params) => wxRequest(params, apiMall + 'api/order/wxPay');
//生成流水号(orderSn:订单编号（必填）,type:订单流水类型 类型，0、订单支付，1为还款，2为退款(退项目) （必填）,return moneySn)
const createOrderMoney = (params) => wxRequest(params, apiMall + 'api/order/moneySnCreate');
//通过扫码进来支付，获取到scene才调起该接口
const scene = (params) => wxRequest(params, apiMall + 'api/member/sceneParams');
//通过扫码进来支付，获取到scene,如果是现金支付、pos支付、余额支付时，直接调起该接口结算
const confirmPay = (params) => wxRequest(params, apiMall + 'api/order/confirmPay');
//添加购物车
const addcart = (params) => wxRequest(params, apiMall + 'api/cart/add',false);
//再次购买
const addAgain = (params) => wxRequest(params, apiMall + 'api/order/addAgain');
//待使用服务详情
const getSpecDetail = (params) => wxRequest(params, apiMall + 'api/order/specDetail');
//订单项目消费耗卡记录
const projectConsumeDetail = (params) => wxRequest(params, apiMall + 'api/order/projectConsumeDetail');
//首页banner
const getBannerList = (params) => wxRequest(params, apiMall + 'api/banner/list');
//预约操作日志接口
const getLogList = (params) => wxRequest(params, apiMall + 'api/booking/logList');
//扫码进来活动模板
const activityPage = (params) => wxRequest(params, apiMall + 'api/activity/getActivityPageDetail');
//活动模板添加购物车
const activityAddCart = (params) => wxRequest(params, apiMall + 'api/activity/addCart');
//创建活动订单
const activityAdd = (params) => wxRequest(params, apiMall + 'api/order/activityAdd');
//手机验证接口
const activityBindMobile = (params) => wxRequest(params, apiMall + 'api/member/activityBindMobile');
//已登录小程序的用户通过场景值进入到活动队列接口
const addMq = (params) => wxRequest(params, apiMall + 'api/activity/addMq');
//已完成服务详情
const serviceDetail = (params) => wxRequest(params, apiMall + 'api/booking/serviceDetail');
//收集formId
const collect = (params) => wxRequest(params, apiMall + 'api/formId/collect',false);
//首页为我推荐
const recommend = (params) => wxRequest(params, apiMall + 'api/product/recommend');
//门店详情
const shop_detail = (params) => wxRequest(params, apiMall + 'api/shop/detail');
//获取红包活动详情接口
const red_packet = (params) => wxRequest(params, apiMall + 'api/activity/getRedpacketDetail');
//助力活动首页详情接口
const getHomeFriendPushDetail = (params) => wxRequest(params, apiMall + 'api/activity/getHomeFriendPushDetail');
//打开了此活动页面
const recordUserOpenActivity = (params) => wxRequest(params, apiMall + 'api/activity/recordUserOpenActivity');
//按marketId发送红包接口
const sendRedpacket = (params) => wxRequest(params, apiMall + 'api/activity/sendRedpacket',false,false);
//领取礼物
const getFriendPushGift = (params) => wxRequest(params, apiMall + 'api/activity/getFriendPushGift');
//获取助力活动详情
const getFriendPushDetail = (params) => wxRequest(params, apiMall + 'api/activity/getFriendPushDetail',false);
//获取活动参数
const getSceneParams = (params) => wxRequest(params, apiMall + 'api/member/sceneParams',false);
//根据2个经纬度计算2点之间的距离
const calculateDistance = (params) => wxRequest(params, apiMall + 'api/shop/calculateDistance',false);
//我的页面-获取广告素材
const GetAd = (params) => wxRequest(params, apiMall + 'api/advertisement/getAd');
//获取用户美丽圈用户列表接口
const getBeautyCircleList = (params) => wxRequest(params, apiMall + 'api/member/getBeautyCircleList');
//转增详情
const sendDetail = (params) => wxRequest(params, apiMall + 'api/order/sendDetail');
//取消转赠
const sendCancel = (params) => wxRequest(params, apiMall + 'api/order/sendCancel');
//分享用户关系绑定
const addMemberCompanyShare = (params) => wxRequest(params, apiMall + 'api/member/addMemberCompanyShare');
//领取赠品接口
const sendReceive = (params) => wxRequest(params, apiMall + 'api/order/sendReceive');
//获取用户分享金列表
const shareMoney = (params) => wxRequest(params, apiMall + 'api/member/getRebateMoneyRecord');
//被邀请码
const acceptInvite = (params) => wxRequest(params, apiMall + 'api/member/acceptInvite');
//可赠送项目接口
const assignPageList = (params) => wxRequest(params, apiMall + 'api/gift/assignPageList');
//已赠送项目接口
const sendPageList = (params) => wxRequest(params, apiMall + 'api/gift/sendPageList');
//商家会员邀请码
const inviteQrCode = (params) => wxRequest(params, apiMall + 'api/member/inviteQrCode');
//转赠
const sendCreate = (params) => wxRequest(params, apiMall + 'api/order/sendCreate');
//确认转赠
const sendConfirm = (params) => wxRequest(params, apiMall + 'api/order/sendConfirm');

module.exports = {
	sendSubscribeMessage,
	getAppointmentList,
	getUsableProjectList,
	getArriveTimeList,
	getCategoryList,
	addAppointment,
	cancelAppointment,
	updateAppointment,
	getProductList,
	getProductDetail,
	getDoneList,
	getOrderList,
	getOrderDet,
	getcode,
	login,
	againLogin,
	bindMobile,
	getUserInfo,
	updateUserInfo,
	getCar,
	setOrder,
	getCarupdate,
	getAbleList,
	verifyCode,
	getAppointmentDetail,
	tabShop,
	wxPay,
	addcart,
	getSpecDetail,
	projectConsumeDetail,
	getBannerList,
	getLogList,
	scene,
	confirmPay,
	createOrderMoney,
	addAgain,
	activityPage,
	activityAddCart,
	activityAdd,
	activityBindMobile,
	addMq,
	serviceDetail,
	recommend,
	collect,
	shop_detail,
	red_packet,
	getHomeFriendPushDetail,
	recordUserOpenActivity,
	sendRedpacket,
	getFriendPushGift,
	getFriendPushDetail,
	getSceneParams,
	GetAd,
	getBeautyCircleList,
	calculateDistance,
	sendDetail,
	sendCancel,
	addMemberCompanyShare,
	sendReceive,
	shareMoney,
	acceptInvite,
	assignPageList,
	sendPageList,
	inviteQrCode,
	sendCreate,
	sendConfirm,
	APPNAME
}



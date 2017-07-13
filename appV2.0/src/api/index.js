// 请求api地址
// const _baseUrl = 'http://im.ivymei.com' // 开发+
// http://192.168.1.112/webapi/index.php?app=other&act=index_ banner
import axios from 'axios'

export default {

  // 区域列表
  getArea(city_id = 440100) { // 默认传入 广州
    return `/webapi/index.php?app=area&act=info_list&format=json&city_id=${city_id}`
  },
  // 套餐列表
  getMealList() {
    return `/webapi/index.php?app=meal&act=info_list`
  },
  // 套餐详情
  getMealListDet(id) {
    return `/webapi/index.php?app=meal&act=detail&${id}&source=h5`
  }


}

// 首页轮播图
let getBanner = () => {
  return '/webapi/index.php?format=json&app=other&act=index_banner&channel=4&position=index&source=h5'
}
// 套餐详情
let getMealListDet = (id) => {
  return `/webapi/index.php?app=meal&act=detail&source=h5&${id}`
}
// 确认订单信息
/**
 * id 项目ID，用以在session中查询相应数据，并在接口中判断用
 *
 */
let getProjectMsg = (id) => {
  return `/webapi/index.php?format=json&app=project&act=order_info&id=${id}`
}

/***
 * 立刻下单
 * id   项目ID，用以在session中查询相应数据，并在接口中判断用
 */
export const confirmOrder = () => {
  return `/webapi/index.php?app=project&act=confirm_order`
}

// 预约时间 床位

/****
 * @param {*} day      时间  ymd
 * @param {*} Shop_id  门店id
 */

let getCartTime = (day, Shop_id) => {
  return `/webapi/index.php?format=json&app=cart&act=time&day=${day}&shop_id=${Shop_id}`
}
/**
 *项目订单  门店
 */
let getShopenil = () => {
  return '/webapi/index.php?format=json&app=shop&act=get_info'
}
let retnShopsleess = (Shop_id) => {
  return `/webapi/index.php?format=json&app=shop&act=shop_info&shop_id=${Shop_id}`
}

/**
 * 根据地区获取    门店列表
 * @param {*} district_id 地区id
 * @param {*} lat         经纬度
 * @param {*} lng         经纬度
 * @param {*} page_no     页码
 * @param {*} page_size   条数
 */

let getShopList = (lat = '', lng = '', page_no = 1, page_size = 10) => {
  return `/webapi/index.php?app=shop&act=info_list&page_size=${page_size}&page_no=${page_no}`
}

// 门店列表详情  id : 门店id  id = xxx
let shopListDet = (id) => {
  return `webapi/index.php?format=json&app=shop&act=detail&${id}&source=h5`
}
// 热门项目
let getHotProject = () => {
  return '/webapi/index.php?app=project&act=hot_index'
}
/**
 * 项目列表
 * @param {*} shop_id  门店 id
 * @param {*} pageNo
 * @param {*} page_size
 */
let getProjectItems = (shop_id, pageNo = 1, page_size = 10) => {
  return `/webapi/index.php?app=project&act=info_list&page_no=${pageNo}&page_size=${page_size}${shop_id ? '&shop_' + shop_id : ''}`

}
// 项目详情
let getProjectDet = (id) => {
  return `/webapi/index.php?app=project&act=detail&${id}&source=h5`
}
// 获取套餐列表
/**
 * shop_id 门店id
 */
let getMealList = () => {
  return `/webapi/index.php?app=meal&act=info_list`
}


// 评价接口
// 可传参数
/**
 *  page_no  否  页码 默认1
 *  page_size  否  默认100（可选5,10,15,20,30,40,50,80,100,150,200,300,500）
 *  ** project_id/ project _id_arr  否  im_project项目分类表中id, project_arr数组方式传输多个ID。(两参数不能同时存在)
 *  beautician_id  否  美容师ID，用以获取美容师评价
 *  stars/ stars_arr  否  Stars星级值, project_arr数组方式传输多个ID。(两参数不能同时存在)无效
 *  member_id  否  上门/到店(1: 上门, 2：到店, 3：上门+到店)
 *  shop_id  否  门店id
 *  sort  否  排序字段(星级stars,添加时间[最新]add_time)
 *  sort_order  否  默认desc(顺序从大到小),asc（倒序从小到大）(小写)
 */
let getComment = () => {
  return '/webapi/index.php?app=comment&act=info_list&source=h5'
}
/**
 * 登陆接口
 * act    Code获取验证码
 * mobile 手机号码(必须使用 MIME base64 对数据进行编码)
 * sign   标签，表示设备的标记（最好用内核id或者是CPU序号等，方便记录查询） 之前默认是h5
 * 获取 token值
 * act    Check_code 验证信息
 * invite_code 邀请码  否
 * source h5          是
 *
 */
let getLogin = () => {
  return '/webapi/index.php?app=login'
}
// 进入用户中心
let getmember = () => {
  return '/webapi/index.php?app=member&format=json&act=index&source=h5'
}
/**
 * 获取个人中心的个人二维码 邀请码
 * source   h5 （WEB端用以标明数据来源)
 */
export const inviteCode = () => {
  return `/webapi/index.php?&act=invite&app=member`
}
/**
 * 签到接口
 */
export const signIn = () => {
  return `/webapi/index.php?app=favorite&act=sign&source=h5`
}

/**
 * 我的积分、积分明细
 */
export const getintegrationger = (el) => {
  switch (el){
    case true:
      return `/webapi/index.php?&act=list&app=coupon&source=h5`;
      break;
    case false:
      return `/webapi/index.php?app=member&act=integral_record&source=h5`;
      break;
    case 'jfmxi':
      return `/webapi/index.php?app=member&act=integral_history&source=h5`;
      break;
    default:
      return alert('接口错误！请证实参数！');
  }
}
/**
 * 获取全部会员卡门店列表     app的会员卡列表获取，从saas提供的接口中
 * im_token
 * page_no    页码 默认为1
 * page_size  个数 默认为了10
 */
export const memberCard = () => {
  return `/webapi/index.php?&act=shop_list&app=member_card`
}
/**
 * 会员卡划扣接口   在saas生成预约订单
 * im_token     用于获取用记信息，WEB端依旧使用source=h5以区分
 * shop_id  门店ID
 * service_time   服务时间 2017-04-28 21：30
 * project_id     项目ID
 * meal_id        套餐ID 若存在则必须传值，不存在则不传
 */
export const memberCardAddBook = (shop_id, service_time, project_id) => {
  return `/webapi/index.php?&act=add_book&app=member_card&shop_id=${shop_id}&service_time=${service_time}&project_id=${project_id}`
}


// 获取我的套餐列表
//两个参数  page_no page_size
let getMembermealList = () => {
  return '/webapi/index.php?app=member&act=meal&source=h5'
}
/**
 * 套餐一键预约-预约（确认下单）
 *  project_ids   数组key是项目ID，值是数量，格式如project_ids[100]=1 project_ids[101]=2 表示两个项目ID分别是100,101，数量分别是1,2
 * shop_id        门店ID
 * name       下单人
 * mobile     默认会员手机号，填写后填写后的值
 * service_time   服务时间
 * meal_id      套餐ID
 *  meal_order_sn   套餐名
 */
export const mealPaytype = () => {
  return `/webapi/index.php?app=cart&act=meal_paytype`
}

/**
 * 推送通知
 * 获取推送的链接，活动的添加在im_notice表中
 *
 */
export const pushNotice = () => {
  return `/webapi/index.php?app=notice&act=index`
}
/**
 * 金币活动接口    从im_gold表中获取所有的可兑换的项目列表
 * im_token
 */
export const goldIndex = () => {
  // 1.首页接口
  return `/webapi/index.php?app=gold&act=index`
}
/**
 * id 套餐或者优惠券ID
 */
export const goldInterchange = (id) => {
  return `/webapi/index.php?app=gold&act=interchange&id=${id}`
}


/**获取我的套餐详情
 *  使用套餐划扣项目列表，im_member_meal,im_member_meal_project
 * order_sn 订单状态要求处于status=1(已经支付) TC2016082310298549
 * id       订单状态要求处于status=1(已经支付)12367
 * shop_id    当存在默认门店时，需要传入门店ID，判断该套餐是否存在于该门店
 */

let getmyMealdetails = (order_sn) => {
  return `/webapi/index.php?act=meal_detail&app=member&source=h5&order_sn=${order_sn}`
}
// 判断是否登陆
let loginTrue = () => {
  return '/webapi/index.php?format=json&app=meal&act=check_login&source=h5'
}

// let loginTrue = () => {
//   let api = '/webapi/index.php?format=json&app=meal&act=check_login&source=h5';
//   return axios.get(api).then(res => {
//     return Promise.reject(res.data)
//   })
// }

/**获取favorite收藏列表接口调用请求说明  请求方式: GET
 * edit  add 添加收藏   del 删除收藏
 * favorite_type meal(套餐)project项目shop门店（商家）beautician美容师
 * value  对应上值的ID值
 *
 */
let favorite = () => {
  return '/webapi/index.php?app=favorite&act=index&source=h5'
}
// 充值中心
let getBalance = () => {
  return '/webapi/index.php?app=member&act=purse&source=h5' // 获取余额
}
/**
 * 充值选项
 * im_token  组合后的im_token值
 */
export const topupOptions = () => {
  return `/webapi/index.php?app=member&act=recharge`
}

/**
 * 获取充值订单号
 * price        充值金额
 * give_money   赠送金额（默认0）
 * pay_method   支付方式wxpayAPP内微信支付 wxpay_h5服务号内支付 alipay支付宝支付 yue余额支付 mealpay套餐支付
 * item_id      充值选项ID
 */
export const getTopupNumber = () => {
  return `/webapi/index.php?app=cart&act=add_recharge`
}
/**
 * 获取余额的消费记录
 * im_token  组合后的im_token值
 * type     空或者all为全部，spend消费记录,recharge
 */
export const getBalanceRecord = () => {
  return `/webapi/index.php?app=member&act=accout&type=recharge`
}

/**
 * 获取推广用户列表
 * im_token   组合后的im_token值
 *  type      type=order_count为订单推广数量，order_price累计付款金额 month本月新增用户 all_user用户数量
 * page_size  数据记录数
 * page_no    页码
 */
export const getSpreadAdiminList = () => {
  return `/webapi/index.php?app=member&act=spread&type=order_count`
}
/**
 * 获取用户的推广收益记录
 * im_token 组合后的im_token值
 * type     type= already已经收益，expect预期收益  ，out推广收益提现记录
 */

export const getSpreadAdiminEarnings = () => {
  return `/webapi/index.php?app=member&act=profit&type=already`
}
/**
 * 获取用户的推广收益提转余额的记录
 * im_token 组合后的im_token值
 */
export const getASERecord = () => {
  return `/webapi/index.php?app=member&act=profit_edit&type=already`
}
/**
 *  积分兑换优惠券列表
 *  im_token 组合后的im_token值
 */
export const getCanintegral = () => {
  return `/webapi/index.php?&act=list&app=coupon&source=h5`

}


/**
 * 积分兑换优惠券记录
 * im_token token,用以标明用户
 *
 */
export const getIntegralERecord = () => {
  return `/webapi/index.php?app=member&act=integral_record`
}
/*
* 优惠劵使用情况
*
* */
export const getcouponvalline = () => {
  return `/webapi/index.php?app=coupon&act=index&source=h5`
}
/*
 * 兑换优惠卷
 *
 * */
export const getcouponvaduih = (i_key) => {
  return `/webapi/index.php?&act=exchange&app=coupon&source=h5&i_key=`+i_key
}
/***
 * 获取积分历史记录
 * im_token   组合后的im_token值
 * page_size  页码大小
 * page_no    第几页
 */
export const getIntegralHrecord = () => {
  return `/webapi/index.php?app=member&act=integral_history`
}
/***
 * 获取用户的地址列表
 * im_token   组合后的im_token值
 */
export const getAdminAddress = () => {
  return `/webapi/index.php?app=member&act=address`
}

/***
 * 添加用户的地址，写入im_address表
 *  im_token={组合后的im_token值}
 * 必须值
 * province   省
 * city       市
 * district   区
 * address    地址
 * contactman 联系人
 * mobile     电话
 * is_default 是否默认 1 是 0否
 * room       用户填写详细地址
 *
 */
export const addAdminAddress = () => {
  return `/webapi/index.php?app=member&act=address_add`
}
/**
 * WEB端地址添加
 * web的地址添加三步骤：1.保存当面数据 2.保存搜索到的地址 3.返回到列表页
 * 必须接收一个参数 判断当前要操作的步骤
 *
 *
 */
export const webAddressAdd = (step) => {
  // 1保存当前页面数据
  if (step = 'save_data') return '/webapi/index.php?&act=address_save_data&app=member&source=h5';
  // 2 保存搜索到地址
  if (step = 'save_search') return '/webapi/index.php?&act=address_save_search&app=member&source=h5';
  // 3.返回到列表页
  if (step = 'get_address') return '/webapi/index.php?&act=get_address&app=member&source=h5';
}


/***
 *     根据ID修改指定的地址中的参数
 *      id  地址序号ID
 *  province   省
 * city        市
 * district    区
 * address     地址
 * mobile      手机号
 * contactman  联系人
 * room        用户输入详细地址
 * is_default  是否默认
 */
export const addressRead = () => {
  return `/webapi/index.php?app=member&act=address_read`
}
/**
 * 地址删除
 * id  地址序号ID
 */

export const addressDel = () => {
  return `/webapi/index.php?app=member&act=address_del`
}
/***
 * 设置默认地址
 *  id  地址序号ID
 * source  h5 web端必加
 * is_default 是否为默认 0 不是默认  1设置为默认
 */
export const addressSetDefault = () => {
  return `/webapi/index.php?app=member&act=set_default`
}

/***
 地址搜索接口  传入关键字，然后在百度接口中找到相关的地点列表
 * source=h5 （WEB端用以标明数据来源）
 * keyword      关键字
 */
export const addressSearch = (keyword) => {
  return `/webapi/index.php?app=member&act=address_search&keyword=${keyword}`
}

/**
 * 套餐下单
 * meal_id 套餐 id
 * num  购买数量
 * total_price 总价格
 */
let placeOrderMeal = () => {
  return '/webapi/index.php?app=cart&act=add_meal&source=h5'
}


/**
 * 套餐   支付
 * @param {*} order_sn 生成的订单号
 * @param {*} paytype  支付方式
 */
let mealPay = (order_sn, paytype = 0) => {
  if (paytype == 0) {
    // console.log("余额")
    return `/webapi/index.php?app=cart&act=balance_pay&source=h5&order_sn=${order_sn}`
  }
  if (paytype == 1) {
    console.log("支付宝")
    return `http://m.ivymei.com/index.php?/pay/do_alipay/${order_sn}`
  }
  if (paytype == 2) {
    //console.log("微信")
    return `http://www.ivymei.com/pay/jsapi.php?pay_order_sn=${order_sn}`
  }

}

/**
 * 取消订单    根据订单号查找指定的订单，im_order,更改状态
 * order_sn   订单状态要求处于status=0或者status=1 都可以取消订单。
 */
export const cancelOrder = () => {
  return `/webapi/index.php&app=order&act=cancel_order`
}
/***
 * 订单确认完成，点击后可评价
 *  order_sn  订单状态要求处于status=1,2
 *
 */
export const submitEnd = () => {
  return `/webapi/index.php&app=order&act=submit_end`
}
/**
 * app下单前获取用户余额
 * &im_token={组合后的im_token值}
 * order_sn 订单状态要求处于status=1,2
 */
export const payAllAmend = () => {
  return `/webapi/index.php?app=cart&act=pay_all`
}


/**
 * 获取常到门店
 *  project_id    在项目下单时需要传入项目ID，以过滤掉常去门店中没有该项目的门店
 *  meal_id       在套餐下单时需要传入套餐ID，以过滤掉常去门店中没有该套餐的门店
 *  lng  经度
 *  lat  纬度
 */
export const oftenToShop = () => {
  return `/webapi/index.php?app=shop&act=pusually&source=h5&format=json`
}
/**
 * 获取门店二维码
 * shop_id   门店id
 */
export const getShopqrCode = () => {
  return `/webapi/index.php?app=shop&act=qrimg&`
}

/****
 *  提交指定的用户反馈数据
 *  content 反馈内容
 *  im_token  组合后的im_token值
 *   type_id  类型（默认0反馈，1举报）
 */

export const feedbackAdmin = (content, im_token) => {
  return `/webapi/index.php?app=member&act=feedback&im_token=${im_token}&content=${content}`
}


export {
  // 首页轮播图
  getBanner,
  // 根据地区获取门店列表
  getShopList,
  // 门店列表详情
  shopListDet,
  // 热门项目
  getHotProject,
  // 项目列表
  getProjectItems,
  // 项目详情
  getProjectDet,
  // 套餐列表
  getMealList,
  // 套餐详情
  getMealListDet,
  // 评论
  getComment,
  // 登陆
  getLogin,
  // 进入用户中心
  getmember,
  // 会员中心套餐列表
  getMembermealList,
  // 我的套餐详情
  getmyMealdetails,
  // 判断是否登陆
  loginTrue,
  // 充值中心
  getBalance,
  // 套餐下单
  placeOrderMeal,
  // 项目下单
  getProjectMsg,
  // 床位预约 时间
  getCartTime,
  //选中门店显示到门店栏
  getShopenil,
  // 套餐支付
  mealPay,
  // 收藏列表
  favorite,
  //返回门店值
  retnShopsleess,
}

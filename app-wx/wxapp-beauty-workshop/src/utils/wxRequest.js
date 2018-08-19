import wepy from 'wepy';
import util from './util';
/*import md5 from './md5';*/
import tip from './tip'

const API_SECRET_KEY = 'local.mall.mobile.ivymei.com';
const TIMESTAMP = util.getCurrentTime();

// const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase());
const url = 'https://t.mall.mobile.ivymei.com/wxClient/';
const companySn = 'COM2135';
const APPNAME = 'witness速美工场';


async function getSession () {
	const {rawData='',signature='',encryptedData='',iv=''} = wx.getStorageSync('USER_DATA');
	let {code} = await wepy.login(),query = {
		rawData,
		signature,
		encryptedData,
		iv,
		code,
		key: wx.getStorageSync("KEY") || ''
	};
	let {data} = await wxRequest({query},url+'api/common/login');
	wx.setStorageSync('session', data);
}

const wxRequest = async(params = {}, url, isLoading = true ,showTo = true) => {
	isLoading && tip.loading();
	let ajaxData = params.query || {};
	/*ajaxData.sign = SIGN;*/
	ajaxData.time = TIMESTAMP;
	ajaxData.token = wx.getStorageSync('session').token || '';
	ajaxData.shopSn = wx.getStorageSync('shop').shopSn || '';
	ajaxData.companySn = companySn;

	let {data} = await wepy.request({
		url: url,
		method: params.method || 'GET',
		data: ajaxData,
		header: { 'Content-Type': 'application/json' },
	}).then().catch(error => {
		wx.showToast({
			title: '服务器繁忙',
			icon : 'none',
			duration : 1500
		});
	});

	tip.loaded();

	if (!data) {
		return;
	}
	if (data.imei_error_code == 0) {
		return data;
	} else if (data.imei_error_code == 700) {

	} else if (data.imei_error_code == 600) {
		getSession();
	} else {
	  if(showTo){
      wx.showToast({
        title: data.imei_error_msg,
        icon : 'none',
        duration : 1500
      });
    }
	}
	return data;
};

module.exports = {
	wxRequest,
	url,
	APPNAME
}

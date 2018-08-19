import wepy from 'wepy';
import util from './util';
import md5 from './md5';
import tip from './tip'


const API_SECRET_KEY = 'local.mall.mobile.ivymei.com';
const TIMESTAMP = util.getCurrentTime();
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase());

const url = 'https://t.mall.mobile.ivymei.com/wxEmployee/'

async function getSession () {
    const {rawData='',signature='',encryptedData='',iv=''} = wx.getStorageSync('USER_DATA');
    let {code} = await wepy.login(),query = {
        rawData,
        signature,
        encryptedData,
        iv,
        code,
    };
    let {data} = await wxRequest({query},url+'api/employee/againLogin');
	wx.setStorageSync('session', data);
}

const wxRequest = async(params = {}, url,isLoading = true) => {
	isLoading && tip.loading();
	console.log(isLoading)
	let ajaxData = params.query || {};
	ajaxData.sign = SIGN;
	ajaxData.time = TIMESTAMP;
	ajaxData.token = wx.getStorageSync('session').token || '';

	let res = await wepy.request({
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
	let data = res.data;
	if (!data) {
		return res;
	}

	if (data.imei_error_code == 0) {
		return data;
	} else if (data.imei_error_code == 700) {
		/*wx.showToast({
			title: data.imei_error_msg,
			icon : 'none',
			duration : 1500
		});*/
	} else if (data.imei_error_code == 600) {
        getSession();
	} else {
		var showModal = false;
		if(url.indexOf('api/employee/selfRegisterLogin') > 0){
			showModal = true;
		} else if(url.indexOf('api/employee/getVerifyCode') > 0){
			showModal = true;
		}
		
		if(showModal){
			wx.showModal({
			  title: '提示',
			  showCancel: false,
			  content: data.imei_error_msg,
			  success: function(res) {
				if (res.confirm) {
					return data;
				  //console.log('用户点击确定')
				} else if (res.cancel) {
					return data;
				  //console.log('用户点击取消')
				}
			  }
			})
		} else {
			wx.showToast({
				title: data.imei_error_msg,
				icon : 'none',
				duration : 1500
			});
		}

		return data;
	}
};

module.exports = {
	wxRequest,
	url
}

var pay= {
  async wxPay(e){
    /*pay.wxPay({
     monS:json.data.moneySn,//必填，流水订单号
     This:this,//必填
     api:api,//必填
     url:'/pages/order/order',//必填，成功后跳转
     navstuta:true,//选填，成功后退回一页,否则在当前页加载页面
     oreS:''//必填，失败后跳转订单详情
     success:成功回调函数，如果return false，就禁止接下来的跳转动作
     fail:失败回调函数，如果return false，就禁止接下来的跳转动作
     });*/

    const json = await e.api.wxPay({
     query: {
      moneySn:e.monS,
     }
     });
     wx.requestPayment({
     'timeStamp': json.data.timeStamp,
     'nonceStr': json.data.nonceStr,
     'package': json.data.package,
     'signType': json.data.signType,
     'paySign': json.data.paySign,
     'success':function(res){
       /*支付成功*/
       if(e.success){
         if(e.success()==false){
           return;
         }
       }
       if(e.navstuta){
         /*返回一页*/
         wx.navigateBack({
           delta:e.url
         })
       }else{
         wx.redirectTo({
           url:e.url
         })
       }
     },
     'fail':function(res){
        /*支付失败*/
        if(e.fail){
          if(e.fail()==false){
            return;
          }
        }
       wx.showToast({
         title: '支付失败',
         icon: 'none',
         duration: 2000
       })
       if(e.oreS){
         wx.redirectTo({
           url:'/pages/order/details/details?orderid='+e.oreS
         })
       }
     }
     })
    e.This.$apply();
  }
}
module.exports =  pay;

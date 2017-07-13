<template>
  <!--订单确认页面-->
  <div class="confirmOrder">
    <i-header title="订单确认"></i-header>
    <!-- 预约人 -->
    <div class='container order_ok'>
		<div class="res_yuyue">
			<label>预约人</label>：
			<input type="text" class="res_num" :value="time.user">
			<span class="pull-right">(可修改)</span>
		</div>
		<div class="res_tel">
			<label>电话</label>：
			<input type="text" class="res_num" :value="time.mobile" disabled="true">
			<span class="pull-right"></span>
		</div>
	</div>
	<!-- 服务项目 -->
	<div class="container res_pro">
		<h5>服务项目：</h5>
		<div class="res_pro_in">
			<div class="col-xs-12">
				<div class="res_imgbox">
					<img :src="time.default_pic" class="img-responsive">
				</div>
				<div class="res_name">
					<h4>{{time.name}}</h4>
					<p class="res_time"><i></i><span class="order_time">{{time.service_time}}</span>min</p>
					<p class="ord_pri"><span class="">￥</span><i class="ord_price">{{time.price}}</i></p>
				</div>
				<div class="col-xs-3 ord_numb">
					<span :class='woie?"el":""' class="min" @click='reduce(0)'>-</span>
					<input type="text" :value='end[0]' class="ord_num" id="server_num" disabled="">
					<span :class='woie?"el":""' class="add" @click='add(0)'>+</span>
				</div>
			</div>
		</div>
	</div>
	<!-- 店长推荐 -->
	<div class="container ord_recom">
		<h5 @click="show()">店长推荐：<a class="pull-down" :date="showll?'sh':''"></a></h5>
		<ul :class="showll?'':'hidden'">
			<li v-for="(item,i) in msg">
				<div class="container res_pro">
					<div class="res_pro_in">
						<div class="col-xs-12">
							<div class="res_imgbox">
								<img :src="item.default_pic" class="img-responsive">
							</div>
							<div class="res_name">
								<h4>{{item.name}}</h4>
								<p class="res_time">
									<i></i><span class="order_time">{{item.service_time}}</span>min
								</p>
								<p class="ord_pri">
									<span class="">￥</span><i class="ord_price">{{item.price}}</i>
								</p>
							</div>
							<div class="col-xs-3 ord_numb">
								<span class="min" @click='reduce(i+1)'>-</span>
								<input type="text" :value="end[i+1]||0" class="ord_num" id="server_num" disabled="">
								<span class="add" @click='add(i+1)'>+</span>
							</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<mu-circular-progress id="pjiajg" style="margin:10px auto;display: none;" :size="40" />
	<!-- 选择门店和时间 -->
	<div class="container store-time">
		<p class="store-time-title">选择门店和时间</p>
		<ul class="">
			<li>
				<router-link :to="'../appointmentShop/'">
					<div class="store" @click='recordURL()'>
						<p v-text="mend.name?mend.name:'请选择门店：'"></p>
						<a></a>
						<div :style="mend.name?'display:block':'display:none'" class="store-text">{{mend.address}}</div>
					</div>
				</router-link>
			</li>
			<li>
				<div class="store time" @click="timebolck()">
					<p>预约时间</p>
					<a></a>
					<div class="store-text" style='display:block;'>{{fultime}}</div>
				</div>
			</li>
		</ul>
	</div>
	<!-- 选择时间栏 -->
	<div class="time-mask" @click='timenone()' :class='timeII?"overfolw":""' :style='Opacity'></div>
	<!-- 上面是遮罩层 -->
	<div class="ord_time_box" :class='timeII?"overfolw":""'>
		<div class="ord_ulbox">
			<ul class="list-inline" :style="ULwidth">
				<li v-for='(YEL,i) in Year' :class="i==lsie?'cur':''" @click='seindev(i)'>
					<dl><dt>{{min[1]+'-'+YEL.yesl}}</dt><dd></dd></dl>
				</li>
			</ul>
		</div>
		<div class="ord_minutes container">
			<mu-circular-progress :style="disl?'display: block':'display:none'" style="margin:40px auto;" :size="40" />
			<ul class="list-inline" :style="disl?'display: none':'display:block'">
				<li v-for='(YEL,i) in getDAY' @click='Fulfil(YEL.time)'><input type="button" :value="YEL.time"></li>
			</ul>
		</div>
	</div>
	<!-- 底部 -->
	<div class="ord_footer_box">
		<div class="col-xs-5 ord_footer_l">
			<p class="server_time">服务时长：<span class="server_min">{{time.service_time}}</span>min</p>
			<p class="order_number">数量：<span>1</span>个</p>
		</div>
		<div class="col-xs-4 ord_footer_c">
			<span class="">￥</span><i>{{jiaqian}}</i>
		</div>
		<div class="col-xs-3 text-center buy">确定</div>
	</div>
  </div>
</template>
<script>
  // 项目详情
  import { getProjectMsg,getCartTime,getShopenil } from '../api'
  // 头部
  import iHeader from './i-header'
  import bottomPay from './bottom_pay'
  export default {
  	data(){
  		return{
  			time:[],
  			end:[1],
  			showll:false,
  			msg:[],
  			mend:[],
  			woie:true,
  			ULwidth:'width:100px',		//控制弹出时间月糟宽度
  			timeII:false,				//弹出时间框的开关
  			Opacity:'opacity:0',
  			DAte:'',		/*获取时间栏*/
  			min:[],			/*0、年份，1、月份，2、天*/
  			Year:[],			/*一个月剩下多少天集合*/
  			getTime:function(year,month,day){},		/*一天时间的方法*/
  			getDAY:'',		/*一天时间的集合*/
  			getDayslnOneMonth:function(year,month,day){},	/*导出一个月剩下的天数到getDAY*/
  			lsie:0, 						/*时间选择高亮*/
  			fultime:'',				/*返回时间到页面的值*/
  			disl:true,			/*时间的加载状态*/
        jiaqian:'',
        yongshi:''
  		}
  	},
  	methods:{
  		getProjectMsg(){
  			this.$http.get(getProjectMsg(this.$route.query.id)).then(res=>{
  				// console.log(res.data.data);
  				this.time=res.data.data.project;
  				this.msg=res.data.data.project.pro_push;
  				this.jiaqian=res.data.data.project.price;
  			});
  		},
  		add(i){
  			if(this.end[i]==undefined){this.end[i]=0}
  			this.end[i]++;
  			if(i==0){
  			    this.jiaqian=this.jiaqian*1+this.time.price*1;
        }else{
            this.jiaqian=this.jiaqian*1+this.msg[i-1].price*1;
        }
  			if(this.woie==true){this.woie=false;}else{this.woie=true}
  		},
  		reduce(i){
  			// 购物车运算减
  			if(this.end[i]==undefined){this.end[i]=0}
  			this.end[i]--;
  			if(this.end[i]<0){
  				alert('最少选一次');
  				this.end[i]=0;
  				return ;
  			}
        if(i==0){
          this.jiaqian=this.jiaqian*1-this.time.price*1;
        }else{
          this.jiaqian=this.jiaqian*1-this.msg[i-1].price*1;
        }
  			if(this.woie==true){this.woie=false;}else{this.woie=true}
  		},
  		show(){
  			// 店长推荐
  			var THIS=this;
  			if(THIS.showll==false){
  				THIS.showll=true;
	  		}else{
	  			THIS.showll=false;
	  		}
  		},
  		getCartTime(){
  			// 门店时间操作
  			// console.log(document.referrer)
  			var thl=this;
  			thl.getTime=function(year,month,day){
  				thl.disl=true;
  				thl.$http.get(getCartTime(year+month+day,6)).then(res=>{
	  				thl.getDAY=res.data.data;
	  				thl.disl=false;
	  			});
  			}
  			//月份天数
  			this.DAte = new Date();
	   		this.min.push(this.DAte.getFullYear());
	   		this.min.push((this.DAte.getMonth()+1)<10?"0"+(this.DAte.getMonth()+1):(this.DAte.getMonth()+1));
	   		this.min.push(this.DAte.getDate()<10?"0"+this.DAte.getDate():this.DAte.getDate());
  			thl.getDayslnOneMonth = function(year,month,day){
  				month = parseInt(month,10);
  				var d= new Date(year,month,0);
  				thl.Year=[];
  				for(day;day<=d.getDate();day++){
  					thl.Year.push({yesl:day});
  				}
  				return thl.Year;
  			}
  			this.getTime(this.min[0],this.min[1],this.min[2]);
  		},
  		getShopenil(){
  			// 门店操作
  			// 存储当前页的url
  			sessionStorage.URL=window.location.href;
  			this.$http.get(getShopenil()).then(res=>{
  				if(res.data.data==undefined){
  					this.mend.name=false;
  				}else{
  					this.mend.name=true;
  					this.mend=res.data.data;
  				}
  				// console.log(res.data);
  				// this.mend=res.data.data;
  			});
  		},
  		recordURL(){
  			// 设置是否选择门店入口
  			/*
			*这里不能存当前页的url，因为这个点击会触发a超链接，最后获取到下一页的url
			*所以选择性放到getShopenil()里面
  			*/
  			sessionStorage.FALSE=false;
  		},
  		timebolck(){
  			/*
			*点击弹出时间窗口的操作
			*月份天数加载
			*服务时间加载
  			*/
  			if(this.mend.address==undefined){
  				alert('请先选择门店！')
  			}else{
	  			this.getDayslnOneMonth(this.min[0],this.min[1],this.min[2]);
	  			var thl=this;
	  			this.ULwidth='width:'+63*(this.Year.length+1)+'px';
	  			this.timeII=true;
	  			setTimeout(function(){
	  				thl.Opacity='opacity:0.7';
	  			},10);
  			}
  		},
  		seindev(i){
  			this.lsie=i;
  			this.getTime(this.min[0],this.min[1],this.Year[i].yesl);
  		},
  		Fulfil(SL){
  			this.fultime=this.min[0]+" "+this.min[1]+"-"+this.Year[this.lsie].yesl+" "+SL;
  			this.timeII=false;
  		},
  		timenone(){
  			this.timeII=false;
  			this.Opacity="opacity:0";
  		}
  	},
  	components: {
	    iHeader,
	    bottomPay
  	},
  	created(){
  		this.getProjectMsg();
  		this.getShopenil();
  		this.getCartTime();
  	}
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.child-view{
	    position:inherit;
		background:#fff !important;
	}
	/*预约人信息*/
	.order_ok {
	    background: #fff;
	    margin-top: 10px;
	    margin-bottom: 10px;
	    .res_yuyue {
		    border-bottom: 1px solid #ccc;
   			font-size: 15px;
		}
		label {
		    font-weight: bold;
		}
		input {
		    border: none;
		    outline:none;
		}
		span {
		    color: #999;
		    float: right!important;
		}
		>div {
		    height: 49px;
		    line-height: 45px;
		}
		.res_tel>input {
		    border: 0;
		    background: #fff;
		}
	}
	/*服务项目*/
	.res_pro {
	    padding-bottom: 5px;
	    overflow:hidden;
	    .res_pro h5 {
		    margin: 15px 0;
		    font-size: 15px;
		    font-family: "Comic Sans MS","幼圆","黑体",sans-serif;
		}
		.res_pro_in {
		    margin-bottom: 10px;
		    margin-right: -15px;
    		margin-left: -15px;
		}
		.col-xs-12{
			padding:0 15px;
		}
		.res_imgbox {
		    padding-left: 0;
		    float:left;
		    width: 41.66666666666667%;
		    margin-right:15px;
		}
		.img-responsive {
		    display: block;
		    height: auto;
		    max-width: 100%;
		}
		.res_name {
		    padding: 0;
		    float:left;
		    width: 33.33333333333333%;
		}
		.res_name>h4 {
		    font-family: "Comic Sans MS","幼圆","黑体",sans-serif;
		    margin-bottom: 5px;
		    font-size: 15px;
		}
		.res_time>i {
		    width: 17px;
		    height: 17px;
		    display: inline-block;
		    background: url(../../static/images/time.png) no-repeat;
		    background-size: 80%;
		    vertical-align: middle;
		}
		.ord_pri {
		    color: #f67476;
		    margin-top: 15px;
		    font-size: 16px;
		}
		.ord_numb{
			position:relative;
			float: left;
			top:37px;
		}
		.ord_numb>span.min {
		    color: #e66280;
		    font-size: 16px;
		    font-weight: bold;
		    border: 1px solid #ccc;
		    padding: 3px 7px;
		    border-radius: 3px;
		    background: #f1f1f1;
		    position: absolute;
		    top: 10px;
		    left: 5px;
		    z-index: 2;
		}
		.ord_numb>input {
		    width: 24px;
		    height: 32px;
		    border: 0;
		    text-align: center;
		    background: #f1f1f1;
		    position: absolute;
		    top: 10px;
		    left: 28px;
		    font-size: 14px;
		}
		.ord_numb>span.add {
		    color: #e66280;
		    font-size: 16px;
		    font-weight: bold;
		    border: 1px solid #ccc;
		    padding: 3px 5px;
		    border-radius: 3px;
		    background: #f1f1f1;
		    position: absolute;
		    top: 10px;
		    left: 52px;
		    z-index: 2;
		}
	}
	/*店长推荐*/
	.ord_recom {
	    border-top: 1px solid #ccc;
	    background: #f5f5f5;
	    padding-bottom: 5px;
	    margin-top: 5px;
	    h5{
		    margin: 15px 0;
		    font-size: 15px;
		    color: #000;
		    font-family: "Comic Sans MS","幼圆","黑体",sans-serif;
		}
		h5>.pull-down {
			transform:rotate(180deg);
			-ms-transform:rotate(180deg);
			-moz-transform:rotate(180deg);
			-webkit-transform:rotate(180deg);
			-o-transform:rotate(180deg);
		    width: 15px;
		    height: 15px;
		    background: url(../../static/images/extension.png) no-repeat;
		    display: inline-block;
		    float: right;
		}
		h5>.pull-down:hover{
			 transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -o-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            transition: All 0.1s ease-in-out;
            -webkit-transition: All 0.1s ease-in-out;
            -moz-transition: All 0.1s ease-in-out;
            -o-transition: All 0.1s ease-in-out;
		}
		h5>.pull-down[date="sh"]{
			transform:rotate(0deg) scale(1.2);
			-ms-transform:rotate(0deg) scale(1.2);
			-moz-transform:rotate(0deg) scale(1.2);
			-webkit-transform:rotate(0deg) scale(1.2);
			-o-transform:rotate(0deg) scale(1.2);
			 transition: All 0.1s ease-in-out;
            -webkit-transition: All 0.1s ease-in-out;
            -moz-transition: All 0.1s ease-in-out;
            -o-transition: All 0.1s ease-in-out;
		}
		.hidden {
		    display: none;
		}
	}
	/*选择门店和时间*/
	.store-time{
		margin-bottom: 49px;
	}
	.store-time-title{
		margin: 15px 0;
	    font-size: 15px;
	    padding-bottom: 10px;
	    border-bottom:1px solid #ccc;
	}
	.store{
		padding-bottom:10px;
		overflow: hidden;
		border-bottom:1px solid #ccc;
	    color: #333;
	    font-size:14px;
	}
	.store p{
		float: left;
	}
	.store a{
		width: 8px;
	    height: 14px;
	    float: right;
	    background: url(../../static/images/cou_r.png) no-repeat;
	    background-size: 100%;
	}
	.store-text{
		float: left;
		width: 100%;
		display: none;
	}
	.time{
		margin-top: 15px;
	}
	/*选择时间栏*/
	.ord_time_box {
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    background: #fff;
	    z-index: 9999;
	    height: auto;
	    width: 100%;
	    padding-bottom: 10px;
	    height: 370px;
	    display: none;
	}
	.overfolw {
    	display: block;
	}
	.ord_ulbox {
	    width: 100%;
	    background: #f3f3f3;
	    overflow: auto;
	    line-height: 45px;
	    height: 45px;
	}
	.ord_time_box>.ord_ulbox>ul{
		min-width: 100%;
	    height: 46px;
	    line-height: 40px;
	}
	.ord_ulbox>ul>li {
	    padding-left: 15px;
	    font-size: 15px;
	    font-weight: bold;
	    padding-bottom: 3px;
	}
	.ord_ulbox>ul>li dl{
		margin:0;
	}
	.list-inline>li {
	    display: inline-block;
	    padding-right: 5px;
	    padding-left: 5px;
	}
	.ord_time_box>.ord_ulbox>ul>li.cur {
	    color: #e66280;
	    font-size: 18px;
	}
	.list-inline {
	    padding-left: 0;
	    list-style: none;
	}
	.ord_minutes>ul>li {
	    width: 70px;
	    height: 28px;
	    margin: 10px 5px 5px 5px;
	    text-align: center;
	    line-height: 28px;
	}
	.ord_minutes>ul>li>input {
	    border: 1px solid #999;
	    border-radius: 3px;
	    color: #999;
	    width: 70px;
	    text-align: center;
	    background: #fff;
	    padding:5px 0;
	}
	.time-mask {
	    width: 100%;
	    height: 100%;
	    position: fixed;
	    background: #000;
	    z-index: 9998;
	    top: 0;
	    left: 0;
	    display: none;
	}
	.time-mask.overfolw{
		display: block;
		/*opacity: 0.7;*/
		transition: opacity 0.4s;
        -webkit-transition: opacity 0.4s;
        -moz-transition: opacity 0.4s;
        -o-transition: opacity 0.4s;
	}
	/*底部*/
	.ord_footer_box {
	    width: 100%;
	    height: 49px;
	    position: fixed;
	    bottom: 0px;
	    left: 0;
	    z-index: 999;
	    background: #fff;
	}
	.ord_footer_l{
		float: left;
		width: 41.66666666666667%;
		padding-right: 15px;
    	padding-left: 15px;
        padding-top: 5px;
	}
	.ord_footer_c{
		float: left;
		padding-right: 15px;
	    padding-left: 15px;
	    width: 33.33333333333333%;
	    color: #f67476;
    	font-size: 16px;
    	margin-top:12px;
	}
	.buy {
		float: left;
	    background: #d1506d;
	    color: #fff;
	    font-size: 18px;
	    line-height: 49px;
    	width: 25%;
    	text-align:center;
	}
</style>

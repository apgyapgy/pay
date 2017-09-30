<template>
	<div class="order-list">
		<div class="weui-cell weui-cell_access left0">
	        <div class="weui-cell__bd line36">
	            <span> 交易时间：</span>
	            <i class="select-date" :class="{'weui-icon-success':orderDt=='0','weui-icon-circle':orderDt!='0'}" @click="changeOrderDt(0)"></i>今天
	            <i class="select-date" :class="{'weui-icon-success':orderDt=='1','weui-icon-circle':orderDt!='1'}" @click="changeOrderDt(1)"></i>昨天
	            <i class="select-date" :class="{'weui-icon-success':orderDt=='2','weui-icon-circle':orderDt!='2'}" @click="changeOrderDt(2)"></i>近7天
	        </div>
	    </div>
	    <div class="weui-cell weui-cell_access left0">
	        <div class="weui-cell__bd line36">
	            <span> 支付方式：</span>
	            <i class="select-pay" :class="{'weui-icon-success':payMode=='','weui-icon-circle':payMode!=''}" @click="changePayMode('')"></i>全部
	            <i class="select-pay" :class="{'weui-icon-success':payMode=='0','weui-icon-circle':payMode!='0'}" @click="changePayMode('0')"></i>微信
	            <i class="select-pay" :class="{'weui-icon-success':payMode=='6','weui-icon-circle':payMode!='6'}" @click="changePayMode('6')"></i>支付宝
	        </div>
	    </div>
	    <div class="weui-cell weui-cell_access left0">
	        <div class="weui-cell__bd line36">
	            <span> 支付状态：</span>
	            <i class="select-payType" :class="{'weui-icon-success':orderSt=='200','weui-icon-circle':orderSt!='200'}" @click="changeOrderSt(200)"></i>成功
	            <i class="select-payType" :class="{'weui-icon-success':orderSt=='12','weui-icon-circle':orderSt!='12'}" @click="changeOrderSt(12)"></i>退款中
	            <i class="select-payType" :class="{'weui-icon-success':orderSt=='202','weui-icon-circle':orderSt!='202'}" @click="changeOrderSt(202)"></i>退款成功
	        </div>
	    </div>
		<div class="weui-panel">
		    <div class="weui-panel__bd">
		        <div class="weui-media-box weui-media-box_small-appmsg">
		            <div class="weui-cells">
		                <!--<div class="weui-form-preview__ft bgfff" style="padding: 20px;">-->
		                    <!--<div class="weui-form-preview__btn weui-form-preview__btn_default">-->
		                        <!--<span id="dailyAmtYuan" class="block blue font25"></span>-->
		                        <!--<span class="block font12">今日收款金额(元)</span>-->
		                    <!--</div>-->
		                    <!--<div class="weui-form-preview__btn weui-form-preview__btn_default">-->
		                        <!--<span id="dailyNum" class="block blue font25"></span>-->
		                        <!--<span class="block font12">今日收款笔数</span>-->
		                    <!--</div>-->
		                <!--</div>-->
		                <div id="orderList">
		                    <router-link :to="{ path:'/orderPayDetail',query:{orderNo:item.orderNo,payMode:item.payMode}}" v-for="item in orderList" :key="item.id" class="weui-cell weui-cell_access font14 line24" name='list' href="orderPayDetail.html">
		                        <div class="weui-cell__hd">
		                            <img class="weui-cell_icon payIcon" :src="chooseImg(item.payMode)" :alt="item.payModeShortDesc">
		                        </div>
		                        <div class="weui-cell__bd weui-cell_primary">
		                            <p>{{item.payModeShortDesc+item.orderStDesc}}</p>
		                            <p class="weui-media-box__desc font14">{{item.crtTs.substring(0,19)}}</p>
		                        </div>
		                        <div class="weui-cell__hd marginRt15">{{item.orderAmtYuan}}</div>
		                        <span class="weui-cell__ft"></span>
		                    </router-link>
		                </div>
		            </div>
		        </div>
		    </div>
		</div>
		<div id="dataTip" class="weui-panel" :class="{hide:orderList.length}">
		    <div class="weui-loadmore weui-loadmore_line">
		        <span class="weui-loadmore__tips">暂无数据</span>
		    </div>
		</div>
	</div>

</template>
<script>
    $(function() {
        FastClick.attach(document.body);
    });
</script>
<script>
	import {httpUrl} from '../../assets/js/http_url.js';
	export default{
		data(){
			return{
				payMode:'',
				orderSt:200,
				orderDt:0,
				orderList:[],
			}
		},
		methods:{
			changePayMode:function(mode){//改变支付类型
				this.payMode = mode;
				this.getOrderData();
			},
			changeOrderSt:function(status){//改变支付状态
				this.orderSt = status;
				this.getOrderData();
			},
			changeOrderDt:function(dt){//改变支付时间
				this.orderDt = dt;
				this.getOrderData();
			},
			getOrderData:function(){
				var _params = {
					payMode:this.payMode,//支付方式 0 微信， 6 支付宝
	                orderSt:this.orderSt,//支付状态 200 成功，202 退款成功，12 退款中
	                orderDt:this.orderDt //支付日期 0 今天，1 昨日，2 近一周， 3 近一月
				}
				this.$http.jsonp(httpUrl.couponManage,
					{params:_params}
				).then((response) => {
					console.log("success:",response.body);
					var _res = response.body;
					if(_res.code == 200){
						if(_res.data.datas && _res.data.datas.length>0){
							this.orderList = _res.data.datas;
						}else{
							this.orderList = [];
						}
					}else{
						$.alert(_res.desc);
					}
				},(response)=>{
					console.log("error:",response.body);
				});
			},
			chooseImg:function(mode){//根据返回的payMode显示支付宝或微信图片
				if(mode == 0){//微信支付
					return 'static/images/wxPay-icon.png';
				}else{
					return 'static/images/aliPay-icon.png';
				}
			}
		},
		created:function(){
			this.getOrderData();
		},
    beforeRouteLeave (to, from, next) {
      $.closeModal();
      next();
    },
	}
</script>

<style scoped>
  .marginRt15{
    margin-right: 15px;
  }
  .rt15{
    right: 15px;
  }
</style>

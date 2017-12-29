<template>
	<div class="order-pay-detail">
		<div class="weui-cells" name="payCell">
		    <div class="weui-cell weui-cell_access font14 line24" name='payCell' href="orderPayDetail.html">
		        <div class="weui-cell__hd">
		            <img id="payImg" class="weui-cell_icon payIcon" :src="changeIcon" alt="交易查询">
		        </div>
		        <div class="weui-cell__bd weui-cell_primary">
		            <p id="desc">{{detail.payModeShortDesc+detail.orderStDesc}}</p>
		            <p class="weui-media-box__desc font14 payTs">{{subString(detail.payTs,0,19)}}</p>
		        </div>
		        <div class="weui-cell__hd orderAmtYuan">￥{{detail.orderAmtOrgYuan}}</div>
		    </div>
		</div>
		<div class="weui-form-preview">
		    <div class="weui-form-preview__bd">
		        <div class="weui-form-preview__item">
		            <label class="weui-form-preview__label">收款金额</label>
		            <span class="weui-form-preview__value orderAmtYuan">{{detail.orderAmtOrgYuan}}</span>
		        </div>
		        <!-- <div class="weui-form-preview__item" v-show="detail.showCoupon">
	              <label class="weui-form-preview__label">优惠金额</label>
	              <span class="weui-form-preview__value orderAmtYuan">{{detail.couponAmtYuan}}</span>
	            </div> -->
	            <div class="weui-form-preview__item" v-show='detail.orderTp==7'>
	              <label class="weui-form-preview__label">富友公司会员卡余额</label>
	              <span class="weui-form-preview__value orderAmtYuan">{{detail.depositAmtYuan}}</span>
	            </div>
		        <div class="weui-form-preview__item">
		            <label class="weui-form-preview__label">商户名称</label>
		            <span class="weui-form-preview__value">{{detail.mchNm}}</span>
		        </div>
		        <div class="weui-form-preview__item">
		            <label class="weui-form-preview__label">支付时间</label>
		            <span class="weui-form-preview__value">{{subString(detail.payTs,0,19)}}</span>
		        </div>
		        <div class="weui-form-preview__item">
		            <label class="weui-form-preview__label">支付方式</label>
		            <span class="weui-form-preview__value">{{detail.payModeShortDesc}}</span>
		        </div>
		        <div class="weui-form-preview__item">
		            <label class="weui-form-preview__label">商户号</label>
		            <span class="weui-form-preview__value">{{detail.mchId}}</span>
		        </div>
		        <div class="weui-form-preview__item">
		            <label class="weui-form-preview__label">交易单号</label>
		            <span class="weui-form-preview__value">{{detail.orderNo}}</span>
		        </div>
		    </div>
		</div>
		<div class="weui-form-preview__bd">
        	<router-link :to="{path:'orderManage',query:{isFrom:'superOrder',superOrderDt:''+superOrderDt}}" class="weui-btn weui-btn_primary">返 回</router-link>
		    <p class="line36 txtCenter">客服电话：95138</p>
		</div>
	</div>
</template>
<script>
	import {httpUrl} from '../../assets/js/http_url.js';
	export default{
		data(){
			return{
				orderNo:'',
				payMode:'',
				superOrderDt:'',
				detail:{},
			}
		},
		methods:{
			//http://localhost:8090/orderPayDetail?orderNo=200401709120000000504
			initData:function(){
				var _params = {
					orderNo:this.orderNo
				};
				this.$http.jsonp(httpUrl.orderDetail,{
					params:_params
				}).then((response)=>{
					var _res = response.body;
					console.log(_res);
					if(_res.code == 200){
						this.detail = _res.data;
					}else{
						$.alert(_res.desc);
					}
				},(response)=>{
					console.log("error:",response.body);
				});
			},
			subString:function(_str,_s,_e){
				if(_str){
					_str = _str+'';
					return _str.substring(_s,_e);
				}else{
					return '';
				}
			},
		},
		computed:{
			changeIcon:function(){
				if(this.payMode == 6){
					return 'https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/aliPay-icon.png';
				}else{
					return 'https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/wxPay-icon.png';
				}
			},
		},
		created:function(){
			if(this.$route.query.orderNo){
				this.orderNo = this.$route.query.orderNo;
			}
			if(this.$route.query.payMode){
				this.payMode = this.$route.query.payMode;
			}
		    if(this.$route.query.superOrderDt || this.$route.query.superOrderDt==0){
		        this.superOrderDt = this.$route.query.superOrderDt;
		    }
		    var obj={
		        isFrom:'superOrder',
		        superOrderDt:''+this.superOrderDt,
		    };
		    sessionStorage.setItem("fromOrder",JSON.stringify(obj));
			this.initData();
		},
	    beforeRouteLeave (to, from, next) {
	      $.closeModal();
	      next();
	    },
	}
</script>

<style scoped>
	#sendBtn{
		min-width:80px;
	}
	#sendBtn.disabled{
		background:#999;
	}
	.weui-dialog__bd .block.return{
		line-height: 40px; text-align: left;
	}
	.weui-dialog__bd .block.code-wraper{
		border: 1px solid #d6d6d6; height: 40px; margin-bottom: 10px;
	}
	.weui-dialog__bd .block.code-wraper #yanzm{
		width: 50%; padding-left: 5px; height: 36px; line-height: 36px;
	}
	#sendBtn{
		margin: 4px; padding: 0 5px;
	}
</style>

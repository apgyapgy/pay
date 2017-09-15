<template>
	<div class="order-pay-detail">
		<div class="weui-cells" name="payCell">
		    <div class="weui-cell weui-cell_access font14 line24" name='payCell' href="orderPayDetail.html">
		        <div class="weui-cell__hd">
		            <img id="payImg" class="weui-cell_icon payIcon" :src="changeIcon" alt="交易查询">
		        </div>
		        <div class="weui-cell__bd weui-cell_primary">
		            <p id="desc"></p>
		            <p class="weui-media-box__desc font14 payTs"></p>
		        </div>
		        <div class="weui-cell__hd orderAmtYuan"></div>
		    </div>
		</div>
		<div class="weui-form-preview">
		    <!--<div class="weui-form-preview__hd">-->
		        <!--<label class="weui-form-preview__label">付款金额</label>-->
		        <!--<em class="weui-form-preview__value">¥2400.00</em>-->
		    <!--</div>-->
		    <div class="weui-form-preview__bd">
		        <div class="weui-form-preview__item">
		            <label class="weui-form-preview__label">应收金额</label>
		            <span class="weui-form-preview__value orderAmtYuan">{{detail.orderAmtYuan}}</span>
		        </div>
		        <div class="weui-form-preview__item">
		            <label class="weui-form-preview__label">商户名称</label>
		            <span class="weui-form-preview__value" id="mchNm">{{detail.mchNm}}</span>
		        </div>
		        <div class="weui-form-preview__item">
		            <label class="weui-form-preview__label">支付时间</label>
		            <span class="weui-form-preview__value payTs">{{subString(detail.payTs,0,19)}}</span>
		        </div>
		        <div class="weui-form-preview__item">
		            <label class="weui-form-preview__label">支付方式</label>
		            <span class="weui-form-preview__value" id="payType">{{detail.payModeShortDesc}}</span>
		        </div>
		        <div class="weui-form-preview__item">
		            <label class="weui-form-preview__label">商户号</label>
		            <span class="weui-form-preview__value" id="mchId">{{detail.mchId}}</span>
		        </div>
		        <div class="weui-form-preview__item">
		            <label class="weui-form-preview__label">交易单号</label>
		            <span class="weui-form-preview__value" id="orderNo">{{detail.orderNo}}</span>
		        </div>
		    </div>
		</div>
		<div v-show="detail.canRefund" class="weui-form-preview__bd">
		    <a @click="showReturnMoneyModal" id="returnMoney" href="javascript:;" class="weui-btn weui-btn_primary">申请退款</a>
		    <p class="line36 txtCenter">客服电话：95138</p>
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
				orderNo:'',
				payMode:'',
				detail:{}
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
			sendNumber:function(){//发送验证码
				console.log("sendNumber")
				this.$http.jsonp(httpUrl.smsRefund,{})
				.then((response)=>{
					var _res = response.body;
					if(_res.code != 200){
						$.closeModal();
						$.alert(_res.desc);
					}else{
						$.toast('验证码已发送',1000);
					}
				},(response)=>{

				});
			},
			returnMoney:function(orderNo,code){
				var _params = {
					orderNo:this.orderNo,
					code:this.code
				};
				this.$http.jsonp(httpUrl.orderRefund,
					{params:_params}
				).then((response)=>{
					var _res = response.body;
					if(_res.code != 200){
						$.closeModal();
						if(_res.desc){
							$.alert(_res.desc,function(){
								window.location.reload();
							});
						}else{
							$.alert('系统异常，请稍后重试');
						}
					}else{
						window.location.reload();
					}
				},(response)=>{

				});
			},
			showReturnMoneyModal:function(){//显示退款对话框
				var mobile = sessionStorage.getItem('loginId');
				var _this = this;
				$.modal({
		            title: '短信验证',
		            text: '<div><span class="block" style="line-height: 40px; text-align: left">短信将发送至：'+mobile+'</span><span class="block" style="border: 1px solid #d6d6d6; height: 40px; margin-bottom: 10px">' +
		            '<input id="yanzm" placeholder="请输入验证码" class="fl" type="tel" style="width: 50%; padding-left: 5px; height: 36px; line-height: 36px;">' +
		            '<a id="sendBtn" @click="sendNumber" href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary fr" style="margin: 4px; padding: 0 5px;">获取验证码</a></div>',
		            autoClose: false,
		            buttons: [
		                { text: "取消", className: "default",
		                    onClick: function(){
		                        $.closeModal();
		                    }
		               },{ text: "确定", onClick: function(){
		                        //点击确认
		                        console.log('验证码：'+$('#yanzm').val());
		                        var num = $('#yanzm').val();
		                        if(num){
		                            $.closeModal();
		                            $.alert("退款申请已提交，5个工作日到账", function() {
		                                //退款
		                                _this.returnMoney(orderNo,num);
		                            });
		                        }else{
		                            $.toast("请选输入验证码", "text");
		                        }
		                    }
		                }
		            ]
		        });
			}
		},
		computed:{
			changeIcon:function(){
				if(this.payMode == 6){
					return '/static/images/aliPay-icon.png';
				}else{
					return '/static/images/wxPay-icon.png';
				}
			}
		},
		created:function(){
			if(this.$route.query.orderNo){
				this.orderNo = this.$route.query.orderNo;
			}
			if(this.$route.query.payMode){
				this.payMode = this.$route.query.payMode;
			}
			this.initData();
			var _this = this;
			$("#sendBtn").click(function(){
				_this.sendNumber();
			});
		},
    beforeRouteLeave (to, from, next) {
      $.closeModal();
      next();
    },
	}
</script>

<style scoped>
</style>

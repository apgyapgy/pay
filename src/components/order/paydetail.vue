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
		        <div class="weui-cell__hd orderAmtYuan">￥{{detail.orderAmtYuan}}</div>
		    </div>
		</div>
		<div class="weui-form-preview">
		    <!--<div class="weui-form-preview__hd">-->
		        <!--<label class="weui-form-preview__label">付款金额</label>-->
		        <!--<em class="weui-form-preview__value">¥2400.00</em>-->
		    <!--</div>-->
		    <div class="weui-form-preview__bd">
		        <div class="weui-form-preview__item" v-show="detail.showCoupon">
		            <label class="weui-form-preview__label">应收金额</label>
		            <span class="weui-form-preview__value orderAmtYuan">{{detail.orderAmtOrgYuan}}</span>
		        </div>
            <div class="weui-form-preview__item" v-show="detail.showCoupon">
              <label class="weui-form-preview__label">优惠金额</label>
              <span class="weui-form-preview__value orderAmtYuan">{{detail.couponAmtYuan}}</span>
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
		<div v-show="detail.canRefund" class="weui-form-preview__bd">
		    <a @click="showReturnMoneyModal" id="returnMoney" href="javascript:;" class="weui-btn weui-btn_primary">申请退款</a>
		    <p class="line36 txtCenter">客服电话：95138</p>
		</div>

		<div class="weui-mask" :class="{'weui-mask--visible':showDialogFlag}"></div>
		<div class="weui-dialog" :class="{'weui-dialog--visible':showDialogFlag}">
			<div class="weui-dialog__hd">
				<strong class="weui-dialog__title">短信验证</strong>
			</div>
			<div class="weui-dialog__bd">
				<div>
					<span class="block return">
						短信将发送至：{{mobile}}
					</span>
					<span class="block code-wraper">
						<input v-model="yzm" id="yanzm" placeholder="请输入验证码" class="fl" type="tel">
						<a ref="sendBtn" id="sendBtn" @click="sendNumber" href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary fr" :class="{disabled:cutdownTime!=0}">{{cutdownText}}</a>
					</span>
				</div>
			</div>
			<div class="weui-dialog__ft">
				<a @click="cancelRefund" href="javascript:;" class="weui-dialog__btn default">取消</a>
				<a @click="sureRefund" href="javascript:;" class="weui-dialog__btn ">确定</a>
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
				orderNo:'',
				payMode:'',
				detail:{},
				mobile:'',//loginId
				cutdownTime:0,
				timer:null,
				showDialogFlag:false,
				yzm:''
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
				if(this.cutdownTime != 0){
					return;
				}
				var _this = this;
				console.log("sendNumber");
				this.$http.jsonp(httpUrl.smsRefund,{})
				.then((response)=>{
					var _res = response.body;
					if(_res.code != 200){
						$.toptip(_res.desc, 'error');
						/*if(res.desc == '该验证码已发送，请1分钟后再试'){
							$.toptip(_res.desc, 'success');
							//$.alert(_res.desc);
						}else{
							$.closeModal();
							$.alert(_res.desc);
						}*/
					}else{
						//$.toast('验证码已发送',1000);
						_this.cutdownTime = 61;
						_this.cutdown();
					}
				},(response)=>{

				});
			},
			returnMoney:function(){
				var _this = this;
				var _params = {
					orderNo:this.orderNo,
					code:this.yzm
				};
				this.$http.jsonp(httpUrl.orderRefund,
					{params:_params}
				).then((response)=>{
					var _res = response.body;
					if(_res.code != 200){
						if(_res.desc){
							$.toptip(_res.desc, 'error');
						}else{
							$.toptip('系统异常，请稍后重试', 'warning');
						}
					}else{
            _this.showDialogFlag = false;
            $.alert("退款申请已提交，5个工作日到账",function(){
              _this.initData();
              //window.location.reload();
            });
					}
				},(response)=>{

				});
			},
			showReturnMoneyModal:function(){//显示退款对话框
				this.showDialogFlag = true;
				this.cutdownTime = 0;
			},
			getUserInfo:function(){
				var params = {};
				this.$http.jsonp(httpUrl.home, {
					params: Object.assign(params, httpUrl.com_params)
				}).then((response) => {
			        if(response.data.code==200){
			          if(response.data.data){
			              window.sessionStorage.loginId = response.data.data.loginId;
			              this.mobile = response.data.data.loginId;
			          }
			        }else {
			          $.alert(response.data.desc);
			        }
		      	}, (response) => {
		        	console.log('响应失败：'+response);
		      	});
			},
			cutdown:function(){
				//console.log("down:",this.cutdownTime);
				var _this = this;
				_this.timer = null;
				function down(){
					window.clearTimeout(_this.timer);
					_this.cutdownTime--;
					console.log(_this.cutdownTime);
					if(_this.cutdownTime >0 ){
						_this.timer = window.setTimeout(function(){
							down();
						},1000);
					}else{
						this.cutdownTime = 0;
					}
				}
				down();
			},
			cancelRefund:function(){
				window.clearTimeout(this.timer);
				this.showDialogFlag = false;
				this.cutdownTime = 0;
				this.yzm = '';
			},
			sureRefund:function(){
				if(!(/^\d{6}$/.test(this.yzm))){
					$.toast('请输入6位数验证码','text');
					return;
				}
				if(this.yzm){
					this.returnMoney();
				}else{
					$.toast("请输入验证码", "text");
				}
			}
		},
		computed:{
			changeIcon:function(){
				if(this.payMode == 6){
					return 'static/images/aliPay-icon.png';
				}else{
					return 'static/images/wxPay-icon.png';
				}
			},
			cutdownText:function(){
				if(this.cutdownTime == 0){
					return '发送验证码';
				}else{
					return this.cutdownTime + 's';
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
			//获取手机号以备获取验证码之用
			var mobile = sessionStorage.getItem('loginId');
			if(!mobile){
				this.getUserInfo();
			}else{
				this.mobile = mobile;
			}
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

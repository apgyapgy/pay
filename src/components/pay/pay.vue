<template>
	<div class="pay">
		<header class='main-header'>
		    <h1 class="main-title">
		        <!--<img id="mchLogo" class="mchLogo" src="./shop-icon.png">-->
		        <img id="mchLogo" class="mchLogo" src="https://static.fuiou.com//sys/o2o2/mch/2017/08/25/1503669938650ImageSelector_20170825_220709.JPEG">
		    </h1>
		    <p class='main-sub-title' id="mchNm">富友电子商务</p>
		</header>
		<div class="main-panel">
		    <div class="main-con">
		        <label>金额：</label>
		        <!--<div style="float: right; text-align: right">¥-->
		        <!--</div>-->
		        <input id="input-money" @fuous="preventKeyBoard" class="weui-input main-input" :value="payPrice" type="text"  maxlength="14" readonly autofocus/>
		        <input type="text" id="per" style="display:none">
		        <input type="text" id="text1" style="display:none">
		    </div>
		    <a id="addRemarks" @click="addRemark" class="main-tip">添加备注</a>
		    <span class="pay-coupon" @click="showCoupon">-￥10(可用优惠券两张)</span>
		    <!--<label class="remarks"></label><a id="updateRemarks" class="main-tip">修改</a>-->
		</div>
		<footer class="main-footer">
		    <p>由富友收件宝提供技术支持</p>
		    <!--<p>由富友收件宝<img src="images/fuiou.png" style="height: 20px">提供技术支持</p>-->
		    <table class="main-table" width="100%" border="0" cellspacing="0" cellpadding="0">
		        <tr>
		            <td @click="inputNum('1')" width="25%" class="border-left0 border-bottom0 border-right0"><a class="number" data-values="1">1</a></td>
		            <td @click="inputNum('2')" width="25%" class="border-bottom0 border-right0"><a class="number" data-values="2">2</a></td>
		            <td @click="inputNum('3')" width="25%" class="border-bottom0 border-right0"><a class="number" data-values="3">3</a></td>
		            <td @click="delInput" class="border-right0 border-bottom0 border-right0"><a id="del" class="del">←</a></td>
		        </tr>
		        <tr>
		            <td @click="inputNum('4')" class="border-left0 border-bottom0 border-right0"><a class="number" data-values="4">4</a></td>
		            <td @click="inputNum('5')" class="border-bottom0 border-right0"><a class="number" data-values="5">5</a></td>
		            <td @click="inputNum('6')" class="border-bottom0 border-right0"><a class="number" data-values="6">6</a></td>
		            <td @click="goToPay" class="border-right0" rowspan="3" id="pay" :class="{pay:payFlag}"><a class="payName" :class="{white:payFlag}" v-html="getPayModeText"></a></td>
		        </tr>
		        <tr>
		            <td @click="inputNum('7')" class="border-left0 border-bottom0 border-right0"><a class="number" data-values="7">7</a></td>
		            <td @click="inputNum('8')" class="border-bottom0 border-right0"><a class="number" data-values="8">8</a></td>
		            <td @click="inputNum('9')" class="border-bottom0 border-right0"><a class="number" data-values="9">9</a></td>
		        </tr>
		        <tr>
		            <td @click="inputNum('0')" class="border-left0 border-right0" colspan="2"><a class="number" data-values="0">0</a></td>
		            <td @click="addDot" class="border-right0"><a class="number" data-values=".">.</a></td>
		        </tr>
		    </table>
		</footer>
		<div id="coupon-wrapper" :class="{active:showCouponFlag}" @click.self="closeCoupon">
			<div class="coupons">
				<div class="title">可用优惠券</div>
				<div class="weui-cells weui-cells_checkbox coupons-content clear">
				  	<label v-for="(item,index,key) in couponsList" @click.self="changeCoupon(item.num)" class="weui-cell weui-check__label" :for="joinId(item.id)">
					    <div class="weui-cell__hd">
					      	<input type="radio" class="weui-check" name="checkbox1" :id="joinId(item.id)" checked="checked">
					      	<i class="weui-icon-checked"></i>
					    </div>
					    <div class="weui-cell__bd">
					      	<p>满100减10元</p>
					    </div>
				  	</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data(){
			return{
				showCouponFlag:false,
				couponsList:[
					{
						id:1,
						num:10,
						text:'满100减10元'
					},
					{
						id:2,
						num:20,
						text:'满200减20元'
					}
				],
				couponPrice:0,//优惠价，默认为0,
				remarkText:'',//备注信息
				payPrice:'0',
				payMode:6,//支付方式 ，0微信支付，6支付宝支付
				payFlag:false,//为ture,按钮显示为绿色背景，为false无背景
			}
		},
		methods:{
			showCoupon:function(){//显示弹窗
				this.showCouponFlag = true;
			},
			closeCoupon:function(){//关闭弹窗
				this.showCouponFlag = false;
			},
			joinId:function(_id){//拼接id,为s+id
				return "s"+_id;
			},
			changeCoupon:function(_price){//选择优惠券
				this.couponPrice = _price;
				this.showCouponFlag = false;
			},
			addRemark:function(){//点击添加备注弹出添加备注供用户输入备注信息
				var _this = this;
				$.prompt({
				  	title: '提示',
				  	text: '请输入备注内容',
				  	input: _this.remarkText,
				  	empty: false, // 是否允许为空
				  	onOK: function (text) {
				    	//点击确认
				    	text = $.trim(text);
					  	if(text){
					  		_this.remarkText = text;
					  	}
				  	},
				  	onCancel: function () {//点击取消
				  	},
				});
			},
			inputNum:function(num){//输入数字
		  		console.log("num:",num);
		  		if(this.payPrice.indexOf(".") != -1){
		  			if(this.payPrice.length - this.payPrice.indexOf(".") <= 2){
		  				this.changePayPrice(num);
		  			}
		  		}else{
		  			this.changePayPrice(num);
		  		}
		  	},
		  	delInput:function(){//删除已有输入
		  		this.payPrice = '0';
		  		this.payFlag = false;
		  	},
		  	goToPay:function(){//去支付
		  		console.log("goToPay");
		  	},
		  	addDot:function(){//输入小数点
		  		console.log("input dot");
		  		if(this.payPrice.indexOf(".") == -1){//无小数点
		  			this.changePayPrice(".");
		  		}
		  	},
		  	changePayPrice:function(_s){
		  		if(_s == 0 && this.payPrice == '0'){
		  			
		  		}else if(_s != 0 && this.payPrice == '0'){
		  			this.payFlag = true;
		  			this.payPrice = _s;
		  		}else{
		  			this.payFlag = true;
		  			this.payPrice += _s;
		  		}
		  	},
		  	preventKeyBoard:function(){
		  		document.activeElement.blur();//去除默认键盘弹框
            	input.selectionEnd = this.value.length; //选中区域右边界
		  	}
		},
		computed:{
			getPayModeText:function(){
				if(this.payMode == 6){
					return '支付宝<br/>支付';
				}else if(this.payMode == 0){
					return '微信<br/>支付'
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../assets/style/pay/pay.less";
</style>
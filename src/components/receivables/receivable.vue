<template>
	<div>
		<div class="receivable">
		    <div class="main-con">
		        <label>成本金额：</label>
		        <div id="input-money" class="weui-input main-input">￥{{payPrice}}</div>
		    </div>
        <div v-show="mchntRateAmt" class="txtRight tip">商户成本金额：{{mchntRateAmt}}</div>
        <div v-show="amtTp==1" class="txtRight tip">富友会员卡余额：{{amtLeftYuan}}</div>
		</div>
		<footer class="main-footer">
		    <p>由富友收件宝提供技术支持</p>
		    <table class="main-table" width="100%" border="0" cellspacing="0" cellpadding="0">
		        <tr>
		            <td @touchstart="inputNum('1')" width="25%" class="border-left0 border-bottom0 border-right0"><a class="number" data-values="1">1</a></td>
		            <td @touchstart="inputNum('2')" width="25%" class="border-bottom0 border-right0"><a class="number" data-values="2">2</a></td>
		            <td @touchstart="inputNum('3')" width="25%" class="border-bottom0 border-right0"><a class="number" data-values="3">3</a></td>
		            <td @touchstart="delInput" class="border-right0 border-bottom0 border-right0"><a id="del" class="del">←</a></td>
		        </tr>
		        <tr>
		            <td @touchstart="inputNum('4')" class="border-left0 border-bottom0 border-right0"><a class="number" data-values="4">4</a></td>
		            <td @touchstart="inputNum('5')" class="border-bottom0 border-right0"><a class="number" data-values="5">5</a></td>
		            <td @touchstart="inputNum('6')" class="border-bottom0 border-right0"><a class="number" data-values="6">6</a></td>
		            <td @touchstart="receivableClk" class="border-right0" rowspan="3" id="pay" :class="[{pay:payFlag}]">
		            	<a class="payName" :class="{white:payFlag}">扫码<br>收款</a>
		            </td>
		        </tr>
		        <tr>
		            <td @touchstart="inputNum('7')" class="border-left0 border-bottom0 border-right0"><a class="number" data-values="7">7</a></td>
		            <td @touchstart="inputNum('8')" class="border-bottom0 border-right0"><a class="number" data-values="8">8</a></td>
		            <td @touchstart="inputNum('9')" class="border-bottom0 border-right0"><a class="number" data-values="9">9</a></td>
		        </tr>
		        <tr>
		            <td @touchstart="inputNum('0')" class="border-left0 border-right0" colspan="2"><a class="number" data-values="0">0</a></td>
		            <td @touchstart="addDot" class="border-right0"><a class="number" data-values=".">.</a></td>
		        </tr>
		    </table>
		</footer>
	</div>
</template>
<script>
  import wx from 'weixin-js-sdk'
	import {httpUrl} from '../../assets/js/http_url';
  import {publicJs} from '../../assets/js/public';
	export default{
		data(){
			return{
			  amtTp:'',//0:押金 1：预付款
        amtLeftYuan:'',//预付款余额
        orderTp:'',//订单模式：6押金模式 7预付款模式
				payPrice:'',
				payFlag:false,//为ture,按钮显示为绿色背景，为false无背景
        mchntRateAmt:'',
        mchntRate:1,
			}
		},
		methods:{
			inputNum:function(num){//输入数字
		  		if(this.payPrice.indexOf(".") != -1){//有小数点后输入0
		  			var _zeroFlag = false;
		  			var _dotIndex = this.payPrice.indexOf(".");
		  			if((_dotIndex < this.payPrice.length-1) && this.payPrice.substring(_dotIndex+1) == '0'){
		  				//小数点后第一位是0
		  				_zeroFlag = true;
		  			}
		  			if(this.payPrice.length - this.payPrice.indexOf(".") <= 2){
		  				if(_zeroFlag && num == '0'){
		  				}else{
		  					this.changePayPrice(num);
		  				}

		  			}
		  		}else{
					//if(num.substr(0,1)==0&&)
		  			this.changePayPrice(num);
		  		}
	  	},
      delInput:function(){//删除已有输入
		  		this.payPrice = '';
          this.mchntRateAmt = '';
		  		if(this.payFlag == true){
		  			this.payFlag = false;
		  		}
      },
      addDot:function(){//输入小数点
		  		if(this.payPrice.indexOf(".") == -1){//无小数点
		  			if(this.payPrice!=0){
			
		  				this.changePayPrice(".");
		  			}else{
					
		  				this.changePayPrice("0.");
		  			}
		  		}
	  	},
      changePayPrice:function(_s){//改变支付金额
	  	  if(_s == '0' && this.payPrice == '0'){//当前值为0，输入也为0，不做处理
		  		}else if(_s != '0' && this.payPrice == '0'){//当前值为0，输入不为0，直接将输入的赋给当前值
		  			if(this.payFlag == false){
		  				this.payFlag = true;
		  			}
		  			this.payPrice = _s;
		  		}else{//当前值不为0，输入不为0，拼接字符串
		  			if(this.payFlag == false){
		  				this.payFlag = true;
		  			}
		  			if(_s == '.' || _s == '0.'){
		  				this.payPrice += _s;
		  			}else{
		  				var _dotIndex = this.payPrice.indexOf(".");
			  			if(_dotIndex == -1){//没有小数点
			  				if(this.payPrice.length >=9){
			  					return;
			  				}
			  			}
			  			this.payPrice += _s;
		  			}
		  		}
		    var payPrice = publicJs.accMul(this.payPrice,100);
        this.mchntRateAmt = publicJs.accMul(this.mchntRate, this.payPrice).toFixed(2);
		    console.log('支付金额payPrice'+payPrice);
        console.log('折扣mchntRate'+this.mchntRate);
		    if(payPrice>0){	
				  this.payFlag = true;
			  }else{
			  	this.payFlag = false;
			  }
		  },
      preventKeyBoard:function(){
		  		document.activeElement.blur();//去除默认键盘弹框
          input.selectionEnd = this.value.length; //选中区域右边界
      },
      receivableClk:function () {
        var _that = this;
        if(_that.payFlag==false){
          return
        }
        var payPrice = publicJs.accMul(this.payPrice,100);
        console.log('payPrice：'+payPrice);
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            var result = res.resultStr.toString(); // 当needResult 为 1 时，扫码返回的结果
//            console.log('扫码返回的结果：'+result);
//            $.alert('结果'+result);
//            console.log('参数111：'+payPrice);
//            console.log('参数2：'+this.amtTp=='0'?'6':'7');
//            console.log('参数3：'+result);
            var _params = {
              orderAmt:payPrice.toString(),//金额
              orderTp:_that.amtTp=='0'?'6':'7',//订单类别 6押金模式 7预付款模式
              payCode:result,
            };
            console.log('参数：'+JSON.stringify(_params));
            _that.$http.jsonp(httpUrl.pay,{params:_params}).then(function(res){
              var _res = res.body;
              var _this = this;
              if(_res.code==200){
                console.log('数据：'+JSON.stringify(_res.data));
                console.log('付款码'+result);
                _that.$router.push({ path: '/result',query:{ result:result}});
                // $.alert('扫码成功',function () {
                //   _this.$router.push({ path: '/index' });
                // });
              }else{
                $.alert(_res.desc);
              }
            },(res)=>{
              console.log("error:",res.body);
            })
          }
        });
      },
		},
		mounted:function(){
      $("body").css({"background":"#eee","overflow":"auto"});
      this.$http.jsonp(httpUrl.toSVipPay).then(function(res){
        var _res = res.body;
        if(_res.code==200){
          //console.log('数据：'+JSON.stringify(_res.data));
          if(_res.data.mchntRate){
            this.mchntRate = _res.data.mchntRate;
          }
          this.amtTp = _res.data.depositAmt.amtTp;
          if(this.amtTp==1){//金额类别 0押金 1预付款
            this.amtLeftYuan = _res.data.depositAmt.amtLeftYuan;
          }
          console.log('微信参数：appId'+_res.data.jspApiDto.appId+',timestamp'+_res.data.jspApiDto.timestamp+',nonceStr'+_res.data.jspApiDto.nonceStr+',signature'+_res.data.jspApiDto.signature);
          //微信JS-SDK配置
          //alert('微信JS-SDK配置前URL：'+window.location.href);
          wx.config({
            debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId:_res.data.jspApiDto.appId, // 必填，公众号的唯一标识
            //appId:'wx45555',
            timestamp:_res.data.jspApiDto.timestamp, // 必填，生成签名的时间戳
            nonceStr:_res.data.jspApiDto.nonceStr, // 必填，生成签名的随机串
            signature:_res.data.jspApiDto.signature,// 必填，签名，见附录1
            jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.error(function(res) {
            alert("微信参数出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
            alert("toSVipPay报错：" + _res.data.randomStr);
          });
          wx.ready(function() {
            wx.checkJsApi({
              jsApiList : ['scanQRCode'],
              success : function(res) {
               if(res.checkResult.scanQRCode == false){
                 $.alert('请升级您的微信版本，体验新功能');
               }
              }
            });
          });
        }
      },function(res){
        console.log("获取参数失败：",res);
      });
		},
		created:function(){

		}
	}
</script>

<style scoped>
  .receivable{
    width: 100%;
    position: fixed;
    top: 50px;
  }
  .main-con{
    padding: 0 5px;
    border: 1px solid #999;
    height: 60px;
    line-height: 60px;
    border-radius: 4px;
    background: #FFFFFF;
    font-size: 22px;
    margin: 0 20px 20px 20px;
  }
  .main-input{
    width: 55%;
    height: 58px;
    line-height: 58px;
    float: right;
    text-align: right;
  }
  .tip{
    line-height: 26px;
    color: #ff6600;
    margin-right: 20px;
  }
  .main-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center
  }
  .main-footer p{
    font-size: 14px;
    color: #666;
    line-height: 30px;
    text-align: center;
  }
  .main-table a{
    display: block;
    color: #000000;
    font-size: 24px;
    line-height: 30px;
  }
  .main-table tr,.main-table td{
    border: 1px solid #999;
    height: 60px;
    line-height: 60px;
    background: #FFFFFF;
    font-weight: bold;
  }
  .main-table .border-left0{
    border-left: 0;
  }
  .main-table .border-right0{
    border-right: 0;
  }
  .main-table .border-bottom0{
    border-bottom: 0;
  }
  .main-table td.pay{
    background: #3cc51f;
    color: #FFFFFF;
  }
  .main-table a.white{
    color: #FFFFFF;
  }

  .main-footer #pay {
    font-weight: normal;
    margin-top: 5rem;
  }


</style>

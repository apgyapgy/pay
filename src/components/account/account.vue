<template>
  <div>
    <div class="receivable">
      <div class="main-con">
        <label>昨日余额：</label>
        <div id="input-money" class="weui-input main-input">￥{{payPrice}}</div>
      </div>
      <div class="txtLeft tip">注：输入昨日富友公司会员卡余额，</div>
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
          <td @touchstart="accountClk" class="border-right0" rowspan="3" id="pay" :class="[{pay:payFlag}]">
            <a class="payName" :class="{white:payFlag}">确定</a>
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
        amtLeftYuan:'',//预付款余额
        payPrice:'',
        payFlag:false,//为ture,按钮显示为绿色背景，为false无背景
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
        console.log('支付金额payPrice'+payPrice);
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
      accountClk:function () {
        var _that = this;
        if(_that.payFlag==false){
          return
        }
        var _params = {
          //amtLeftMch:publicJs.accMul(this.payPrice,100),//金额
          amtLeftMch:this.payPrice,//金额元
        };
        this.$http.jsonp(httpUrl.accountCheck,{params:_params}).then(function(res){
          var _res = res.body;
          var _this = this;
          if(_res.code==200){
            console.log('数据：'+JSON.stringify(_res.data));
            $.alert('提交成功',function () {
              _this.$router.push({ path: '/index' });
            });
          }else{
            $.alert(_res.desc);
          }
        },(res)=>{
          console.log("error:",res.body);
        })
      }
    }
  }
</script>

<style scoped>
  .receivable{
    margin: 50px 20px 0;
  }
  .main-con{
    padding: 0 5px;
    border: 1px solid #999;
    height: 60px;
    line-height: 60px;
    border-radius: 4px;
    background: #FFFFFF;
    font-size: 22px;
  }
  .main-input{
    width: 55%;
    height: 58px;
    line-height: 58px;
    float: right;
    text-align: right;
  }
  .tip{
    line-height: 40px;
    color: #999;
  }
  .main-footer {
    width: 100%;
    position: absolute;
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

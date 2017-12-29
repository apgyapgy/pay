<template>
  <div id="couponAdd">
    <div class="couponAdd">
      <div>
        优惠券名称：<span><input type="text" v-model="coupon.couponNm" class="inputLong" placeholder="名称" :readonly="isReadonly"></span>
      </div>
      <div>
        优惠券金额：<span><input id="amt" type="number" v-model="coupon.couponAmt" class="inputSmall" placeholder="金额" :readonly="isReadonly"> 元</span>
      </div>
      <div>
        优惠券数量：<span><input id="couponNumTotal" type="tel" v-model="coupon.couponNumTotal" class="inputSmall" placeholder="数量" :readonly="isReadonly"> 张</span>
      </div>
      <div>
        使用规则：<span>支付满 <input id="mixAmt" type="number" v-model="coupon.couponAmtMin" class="inputSmall" placeholder="金额" :readonly="isReadonly"> 元可用</span>
      </div>
      <div>
        有效日期：
        <span>
            <input type="text" id="startDt" v-model="coupon.couponLogo" class="inputDate" placeholder="开始日期" :readonly="isReadonly"> -
            <input type="text" id="expireDt" v-model="coupon.couponLogoTeam" class="inputDate" placeholder="结束日期" :readonly="isReadonly">
          </span>
      </div>
    </div>
    <div class="bottom">
      <a @click="updateCoupon" class="weui-btn weui-btn_primary" :class="!coupon.couponNumTotal?'weui-btn_disabled':''">提交</a>
      <router-link to="/coupon" class="weui-btn weui-btn_default">返回</router-link>
      <!--<a href="javascript:;" class="weui-btn weui-btn_default">取消</a>-->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {httpUrl} from '../../assets/js/http_url';
  import {publicJs} from '../../assets/js/public.js'
  export default {
    name: 'couponAdd',
    data () {
      return {
        coupon:{},
        isReadonly:true
      }
    },
    methods: {
      updateCoupon(){
        if(!this.coupon.couponNumTotal){
          return
        }
        let params = {
          couponNo: this.coupon.couponNo,
          couponNm: this.coupon.couponNm,
          startDt: $('#startDt').val(),
          expireDt: $('#expireDt').val(),
          couponAmt: publicJs.accMul(this.coupon.couponAmt,100),
          couponNumTotal: this.coupon.couponNumTotal,
          couponAmtMin: publicJs.accMul(this.coupon.couponAmtMin,100),
        };
        console.log('params'+JSON.stringify(params));
        var _this = this;
        _this.$http.jsonp(httpUrl.couponUpdate, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          console.log('响应：'+response.data);
          if(response.data.code==200){
              $.alert('修改成功',function () {
                _this.$router.push({ path: '/coupon' });
              });
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
      initCoupon(){
        let _this = this;
        let isSend = _this.$route.query.isSend;
        if(isSend==1){//已发送优惠券，仅可修改数量
          $('input').addClass('inputGray');
          $('#couponNumTotal').removeClass('inputGray').removeAttr('readonly');
        }else {//未发送优惠券，可修改全部信息
          _this.isReadonly = false;
        }
        let params = {
          couponNo: _this.$route.query.couponNo
        };
        _this.$http.jsonp(httpUrl.couponDetail, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          console.log('响应：'+response.data);
          if(response.data.code==200){
            _this.coupon = response.data.data;
            _this.coupon.couponAmt = publicJs.accDiv(_this.coupon.couponAmt,100);
            _this.coupon.couponAmtMin = publicJs.accDiv(_this.coupon.couponAmtMin,100);
            if(_this.isReadonly == false){
              $("#startDt").calendar({
                value: [_this.coupon.couponLogo],
                dateFormat: 'yyyy-mm-dd',
              });
              $("#expireDt").calendar({
                value: [_this.coupon.couponLogoTeam],
                dateFormat: 'yyyy-mm-dd',
              });
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      }
    },
    beforeRouteLeave (to, from, next) {
      $.closeModal();
      next();
    },
    mounted(){
      var _this = this;
      _this.initCoupon();
      //金额限制输入2位数字
      $('#amt').bind('input propertychange', function() {
        _this.coupon.couponAmt = _this.coupon.couponAmt.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
      });
      $('#mixAmt').bind('input propertychange', function() {
        _this.coupon.couponAmtMin = _this.coupon.couponAmtMin.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
      });
    },
  }
</script>

<style scoped >
  #couponAdd{
    line-height: 50px;
    font-size: 14px;
  }
  .couponAdd{
    background: #FFFFFF;
    padding: 15px;
  }
  .couponAdd span{
    color: #999999;
  }
  .inputLong{
    width: 60%;
    border: 1px solid #dddddd;
    line-height: 34px;
    border-radius: 3px;
    padding: 0 5px;
  }
  .inputSmall{
    width: 100px;
    border: 1px solid #dddddd;
    line-height: 34px;
    border-radius: 3px;
    padding: 0 5px;
  }
  .inputDate{
    width: 100px;
    border: 1px solid #dddddd;
    line-height: 34px;
    border-radius: 3px;
    padding: 0 5px;
  }
  .inputGray{
    background: #eeeeee;
    color: #999;
  }
  .bottom{
    margin: 20px 15px;
  }
</style>

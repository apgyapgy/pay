<template>
  <div id="couponAdd">
      <div class="couponAdd">
        <div>
          优惠券名称：<span>
          	<input ref="name" type="text" v-model="couponNm" class="inputLong" placeholder="名称">
          </span>
        </div>
        <div>
          优惠券金额：<span><input id="amt" ref="amt" type="number" v-model="couponAmt" class="inputSmall" placeholder="金额"> 元</span>
        </div>
        <div>
          优惠券数量：<span><input ref="num" type="tel" v-model="couponNumTotal" class="inputSmall" placeholder="数量"> 张</span>
        </div>
        <div>
          使用规则：<span>支付满 <input id="mixAmt" ref="minAmt" type="number" v-model="couponAmtMin" class="inputSmall" placeholder="金额"> 元可用</span>
        </div>
        <div>
          有效日期：
          <span>
            <input type="text" ref="starttime" class="inputDate coupon-time" placeholder="开始日期" readonly> -
            <input type="text" ref="endtime" class="inputDate coupon-time" placeholder="结束日期" readonly>
          </span>
        </div>
      </div>
      <div class="bottom">
        <a @click="addCoupon" href="javascript:;" class="weui-btn weui-btn_primary">提交</a>
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
        couponNm: '',
        couponAmt: '',
        couponNumTotal: '',
        couponAmtMin: '',
        date_default:[],
        dateStart:'',
        dateEnd:'',
      }
    },
    methods: {
      addCoupon(){
        if(!this.$refs.name.value){
          $.alert('优惠券名称不能为空');
          return;
        }
        if(!this.$refs.amt.value){
          $.alert('优惠券金额不能为空');
          return;
        }
        if(!this.$refs.num.value){
          $.alert('优惠券数量不能为空');
          return;
        }
        if(!this.$refs.minAmt.value){
          $.alert('规则不能为空');
          return;
        }
        if(!this.$refs.starttime.value || !this.$refs.endtime.value){
          $.alert('有效期不能为空');
          return;
        }
        var dateStart = this.$refs.starttime.value;
        var dateEnd = this.$refs.endtime.value;
        var bool = false;
        bool = publicJs.checkDate(dateStart,dateEnd,function () {
          $('#payRecord').html('');
          $('#dataTip').addClass('hide');
          $.alert('开始日期不能大于结束日期');
        });
        if(bool==true){
          let _this = this;
          let params = {
            couponNm: _this.couponNm,
            startDt: dateStart,
            expireDt: dateEnd,
            couponAmt: publicJs.accMul(_this.couponAmt,100),
            couponNumTotal: _this.couponNumTotal,
            couponAmtMin: publicJs.accMul(_this.couponAmtMin,100),
          };
          console.log('params'+JSON.stringify(params));
          _this.$http.jsonp(httpUrl.couponAdd, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
            console.log('响应：'+response.data);
            if(response.data.code==200){
                $.alert('提交成功',function () {
                  _this.$router.push({ path: '/coupon' });
                });
            }else {
              $.alert(response.data.desc);
            }
          }, (response) => {
            console.log('响应失败：'+response);
          });
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      $('.coupon-time').calendar("close");  //关闭弹窗
      $.closeModal();
      next();
    },
    mounted(){
    	var _this = this;
      $(_this.$refs.starttime).calendar({
        value: _this.date_default,
        dateFormat: 'yyyy-mm-dd',
        onOpen:function(){
          $(_this.$refs.name).trigger("blur");
          $(_this.$refs.amt).trigger("blur");
          $(_this.$refs.num).trigger("blur");
          $(_this.$refs.minAmt).trigger("blur");
        }
      });
      $(_this.$refs.endtime).calendar({
        value: _this.date_default,
        dateFormat: 'yyyy-mm-dd',
        onOpen:function(){
          $(_this.$refs.name).trigger("blur");
          $(_this.$refs.amt).trigger("blur");
          $(_this.$refs.num).trigger("blur");
          $(_this.$refs.minAmt).trigger("blur");
        }
      });
      //金额限制输入2位数字
      $('#amt').bind('input propertychange', function() {
        _this.couponAmt = _this.couponAmt.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
      });
      $('#mixAmt').bind('input propertychange', function() {
        _this.couponAmtMin = _this.couponAmtMin.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
      });
    }
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
  .bottom{
    margin: 20px 15px;
  }
</style>

<template>
  <div id="couponAdd">
      <div class="couponAdd">
        <div>
          优惠券名称：<span><input type="text" v-model="couponNm" class="inputLong" placeholder="名称"></span>
        </div>
        <div>
          优惠券金额：<span><input type="number" v-model="couponAmt" class="inputSmall" placeholder="金额"> 元</span>
        </div>
        <div>
          优惠券数量：<span><input type="tel" v-model="couponNumTotal" class="inputSmall" placeholder="数量"> 张</span>
        </div>
        <div>
          使用规则：<span>支付满 <input type="number" v-model="couponAmtMin" class="inputSmall" placeholder="金额"> 元可用</span>
        </div>
        <div>
          有效日期：
          <span>
            <input type="text" id="startDt" v-model="startDt" class="inputDate coupon-time" placeholder="开始日期" readonly> -
            <input type="text" id="expireDt" v-model="expireDt" class="inputDate coupon-time" placeholder="结束日期" readonly>
          </span>
        </div>
      </div>
      <div class="bottom">
        <a @click="addCoupon" href="javascript:;" class="weui-btn weui-btn_primary">提交</a>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {httpUrl} from '../assets/js/http_url';
  export default {
    name: 'couponAdd',
    data () {
      return {
        couponNm: '',
        couponAmt: '',
        couponNumTotal: '',
        couponAmtMin: ''
      }
    },
    methods: {
      addCoupon(){
        let _this = this;
        let params = {
          couponNm: _this.couponNm,
          startDt: $('#startDt').val(),
          expireDt: $('#expireDt').val(),
          couponAmt: _this.couponAmt,
          couponNumTotal: _this.couponNumTotal,
          couponAmtMin: _this.couponAmtMin
        };
        console.log('params'+JSON.stringify(params));
        this.$http.jsonp(httpUrl.couponAdd, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          console.log('响应：'+response.data);
          if(response.data.code==200){
            if(response.data.data.datas){
              $.alert('提交成功');
            }else{
              $.alert('提交失败'+response.data.desc);
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      }
    },
    mounted(){
      this.$nextTick(function () {
        $(".coupon-time").calendar({
          value: ['2017-09-12'],
          dateFormat: 'yyyy-mm-dd',
          // 自定义格式的时候，不能通过 input 的value属性赋值 '2016年12月12日' 来定义初始值，这样会导致无法解析初始值而报错。
          // 只能通过js中设置 value 的形式来赋值，并且需要按标准形式赋值（yyyy-mm-dd 或者时间戳)
        });
      })
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

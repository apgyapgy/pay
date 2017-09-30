<template>
  <div id="couponDetail" class="weui-form-preview bgeee">
    <div class="weui-form-preview__hd bgfff">
      <label class="weui-form-preview__label">优惠券金额</label>
      <em class="weui-form-preview__value">¥{{item.couponAmt}}</em>
    </div>
    <div class="weui-form-preview__bd bgfff">
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">活动ID</label>
        <span class="weui-form-preview__value">{{item.couponNo}}</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">优惠券名称</label>
        <span class="weui-form-preview__value">{{item.couponNm}}</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">优惠券数量</label>
        <span class="weui-form-preview__value">{{item.couponNumTotal}}张</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">使用规则</label>
        <span class="weui-form-preview__value">满{{item.couponAmtMin}}元可用</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">优惠券有效期</label>
        <span class="weui-form-preview__value">{{item.couponLogo}}至{{item.couponLogoTeam}}</span>
      </div>
    </div>
    <div class="weui-form-preview__bd marginTp bgfff" v-show="item.sendNum||item.sendAmt||item.usedNum||item.usedAmt||item.couponSt==1">
      <div class="weui-form-preview__item" v-show="item.sendNum">
        <label class="weui-form-preview__label">已发放数量</label>
        <span class="weui-form-preview__value">{{item.sendNum}}张</span>
      </div>
      <div class="weui-form-preview__item" v-show="item.sendAmt">
        <label class="weui-form-preview__label">已发放金额</label>
        <span class="weui-form-preview__value">{{item.sendAmt}}元</span>
      </div>
      <div class="weui-form-preview__item" v-show="item.usedNum">
        <label class="weui-form-preview__label">已使用数量</label>
        <span class="weui-form-preview__value">{{item.usedNum}}张</span>
      </div>
      <div class="weui-form-preview__item" v-show="item.usedAmt">
        <label class="weui-form-preview__label">已使用金额</label>
        <span class="weui-form-preview__value">{{item.usedAmt}}元</span>
      </div>
      <div class="weui-form-preview__item" v-show="item.couponSt==1">
        <label class="weui-form-preview__label">距活动结束还有</label>
        <span class="weui-form-preview__value">{{item.leftDays}}天</span>
      </div>
    </div>
    <div class="bottom">
      <router-link to="/coupon" class="weui-btn weui-btn_primary">返回</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {httpUrl} from '../../assets/js/http_url';
  import {publicJs} from '../../assets/js/public.js';
  export default {
    name: 'couponDetail',
    data () {
      return {
          item:{}
      }
    },
    methods: {
      initCoupon(){
        let params = {
          couponNo: this.$route.query.couponNo
        };
        this.$http.jsonp(httpUrl.couponDetail, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          console.log('响应：'+response.data);
          if(response.data.code==200){
            this.item = response.data.data;
            this.item.couponAmt = publicJs.accDiv(this.item.couponAmt,100);
            this.item.couponAmtMin = publicJs.accDiv(this.item.couponAmtMin,100);
            this.item.usedAmt = publicJs.accDiv(this.item.usedAmt,100);
            this.item.sendAmt = publicJs.accDiv(this.item.sendAmt,100);
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
      this.initCoupon();
    }
  }
</script>

<style scoped>
  .marginTp{
    margin-top: 10px;
  }
  .bottom{
    margin: 20px 15px;
  }
</style>

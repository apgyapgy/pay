<template>
  <div id="couponAdd">
    <div class="couponAdd">
      <div>
        优惠券名称：<span><input type="text" v-model="couponNm" class="inputLong" placeholder="名称" :readonly="isReadonly"></span>
      </div>
      <div>
        优惠券金额：<span><input type="number" v-model="couponAmt" class="inputSmall" placeholder="金额" :readonly="isReadonly"> 元</span>
      </div>
      <div>
        优惠券数量：<span><input id="couponNumTotal" type="tel" v-model="couponNumTotal" class="inputSmall" placeholder="数量" :readonly="isReadonly"> 张</span>
      </div>
      <div>
        使用规则：<span>支付满 <input type="number" v-model="couponAmtMin" class="inputSmall" placeholder="金额" :readonly="isReadonly"> 元可用</span>
      </div>
      <div>
        有效日期：
        <span>
            <input type="text" id="startDt" v-model="startDt" class="inputDate" placeholder="开始日期" :readonly="isReadonly"> -
            <input type="text" id="expireDt" v-model="expireDt" class="inputDate" placeholder="结束日期" :readonly="isReadonly">
          </span>
      </div>
    </div>
    <div class="bottom">
      <a @click="updateCoupon" class="weui-btn weui-btn_primary">提交</a>
      <!--<a href="javascript:;" class="weui-btn weui-btn_default">取消</a>-->
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
        couponAmtMin: '',
        startDt:'',
        expireDt:'',
        isReadonly:true
      }
    },
    methods: {
      updateCoupon(){
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
        this.$http.jsonp(httpUrl.couponUpdate, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          console.log('响应：'+response.data);
          if(response.data.code==200){
              $.alert('修改成功');
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
      initCoupon(){
        let isSend = this.$route.query.isSend;
        if(isSend==1){//已发送优惠券，仅可修改数量
          $('input').addClass('inputGray');
          $('#couponNumTotal').removeClass('inputGray').removeAttr('readonly');
        }else {//未发送优惠券，可修改全部信息
          this.isReadonly = false;
        }
        let params = {
          couponNo: this.$route.query.couponNo
        };
        this.$http.jsonp(httpUrl.couponDetail, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          console.log('响应：'+response.data);
          if(response.data.code==200){
              this.couponNm = response.data.data.couponNm;
              this.couponAmt = response.data.data.couponAmt;
              this.couponNumTotal = response.data.data.couponNumTotal;
              this.couponAmtMin = response.data.data.couponAmtMin;
              this.startDt = response.data.data.couponLogo;
              this.expireDt = response.data.data.couponLogoTeam;
              if(this.isReadonly == false){
                $("#startDt").calendar({
                  value: [this.startDt],
                  dateFormat: 'yyyy-mm-dd',
                });
                $("#expireDt").calendar({
                  value: [this.expireDt],
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
    mounted(){
      this.initCoupon();
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
  .inputGray{
    background: #eeeeee;
    color: #999;
  }
  .bottom{
    margin: 20px 15px;
  }
</style>

<template>
  <div id="index" class="wf bgfff">
    <div class="header">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <img class="userPhoto fl" src="https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/user.png">
          <!--<img class="userPhoto fl" :src="mchLogo">-->
        </div>
        <div class="weui-cell__bd">
          <router-link to="/user" class="weui-cell weui-cell_access">
          {{data.mchNm}}
          </router-link>
        </div>
        <div class="weui-cell__ft white hide">
          <a href="javascript:void(0);" class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">退出</div>
            <span class="weui-cell__ft"></span>
          </a>
        </div>
      </div>
      <div class="index-money">
        <span class="block">账面余额</span>
        <b id="balanceYuan" class="block totalAmt">{{data.balanceYuan}}</b>
      </div>
    </div>
    <div class="index-content">
      <div class="weui-panel">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
              <div class="weui-form-preview__ft line30" style="padding: 20px;">
                <div class="weui-form-preview__btn weui-form-preview__btn_default">
                  <span id="dailyAmtYuan" class="block blue font25">{{data.dailyAmtYuan}}</span>
                  <span class="block font12">今日收款金额(元)</span>
                </div>
                <div class="weui-form-preview__btn weui-form-preview__btn_default">
                  <span id="dailyNum" class="block blue font25">{{data.dealNum}}</span>
                  <span class="block font12">今日收款笔数</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-grids wf">
      <router-link :to="{ path: 'orderManage'}" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/search-icon.png" alt="交易查询">
        </div>
        <p class="weui-grid__label">
          交易查询
        </p>
      </router-link>
      <router-link to="/payRecord" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/record-icon.png" alt="到账记录">
        </div>
        <p class="weui-grid__label">
          到账记录
        </p>
      </router-link>
      <router-link to="/coupon" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/coupon-icon.png" alt="优惠券">
        </div>
        <p class="weui-grid__label">
          优惠券
        </p>
      </router-link>
      <router-link :to="{ path: 'fansManage', query: { mchId:data.mchId}}" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/fans-icon.png" alt="粉丝管理">
        </div>
        <p class="weui-grid__label">
          粉丝管理
        </p>
      </router-link>
      <router-link :to="{ path: 'productManage'}" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/product-icon.png" alt="产品管理">
        </div>
        <p class="weui-grid__label">
          商品管理
        </p>
      </router-link>
      <router-link :to="{ path: 'tradeCount'}" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/trade-icon.png" alt="交易统计">
        </div>
        <p class="weui-grid__label">
          台卡交易统计
        </p>
      </router-link>
      <router-link v-show="data.vipMode!=2" :to="{ path: 'receivable'}" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/receivable-icon.png" alt="超级卡收款">
        </div>
        <p class="weui-grid__label">
          超级卡收款
        </p>
      </router-link>
      <!--<router-link :to="{ path: 'account'}" class="weui-grid js_grid">-->
      <router-link v-show="data.vipMode==1" :to="{ path: 'account'}" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/account-icon.png" alt="每日对账">
        </div>
        <p class="weui-grid__label">
          每日对账
        </p>
      </router-link>
    </div>
  </div>
</template>
<script>
import {httpUrl} from '../assets/js/http_url';
import {publicJs} from '../assets/js/public';
export default {
  name: 'index',
  data () {
    return {
      data:{},
      mchLogo:'https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/user.png',
    }
  },
  methods: {
    initData() {
      var params = {};
      this.$http.jsonp(httpUrl.home, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
        if(response.data.code==200){
          if(response.data.data){
            this.data = response.data.data;
            if(response.data.data.mchLogo){
              this.mchLogo = httpUrl.imgHost + response.data.data.mchLogo;
              window.sessionStorage.loginId = response.data.data.loginId;
            }
            this.$store.commit("MCHID", response.data.data.mchId);
          }
          //sessionStorage.setItem('loginId',response.data.data.loginId);
        }else {
          $.alert(response.data.desc);
        }
      }, (response) => {
        console.log('响应失败：'+response);
      });
    },
  },
  beforeRouteLeave (to, from, next) {
    $.closeModal();
    next();
  },
  mounted(){
    sessionStorage.removeItem("fromOrder");
    this.initData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
    width: 100%;
    float: left;
    background: #30b2fb;
    color: #FFFFFF;
    line-height: 40px;
  }
  .header .userPhoto{
    width: 40px;
    height: 40px;
    margin-right: 5px;
    border-radius: 100%;
  }
  .index-money{
    text-align: center;
    padding: 15px 0 15px 0;
  }
  .index-money .totalAmt{
    font-size: 50px;
    line-height: 60px;
  }
  .index-content{
    width: 100%;
    float: left;
    padding-right: 15px;
  }
  .header .weui-cell_access .weui-cell__ft::after{
    border-color: #FFFFFF;
  }
  .icons{
    width: 90px;
    border-radius: 5px;
    /*height: 90px;*/
  }
</style>

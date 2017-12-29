<template>
  <div id="coupon">
    <div>
      <router-link to="/index" class="addCouponBtn weui-btn weui-btn_default">返回首页</router-link>
      <router-link to="/couponAdd" class="addCouponBtn weui-btn weui-btn_primary">新增优惠券</router-link>
    </div>
    <div class="couponList font14 txtCenter bgfff">
      <div class="weui-flex title">
        <div class="weui-flex__item">名称</div>
        <div class="weui-flex__item">有效期</div>
        <div class="weui-flex__item">状态</div>
        <div class="weui-flex__item">操作</div>
      </div>
      <div v-show="isHaveData" class="weui-flex list" v-for="item in items">
        <router-link :to="{ path: 'couponDetail', query: { couponNo:item.couponNo }}" class="weui-flex__item green">{{item.couponNm}}</router-link>
        <div class="weui-flex__item">{{item.couponLogo}}至{{item.couponLogoTeam}}</div>
        <div class="weui-flex__item">{{item.couponStDesc}}</div>
        <div class="weui-flex__item">
          <div v-show="item.couponStDesc=='已上架'">
              <router-link :to="{ path: 'couponUpdate', query: { isSend:item.couponSended ,couponNo:item.couponNo }}" class="blue">修改</router-link>
              <a v-show="item.couponSended==0" @click="cancelCoupon(item)" class="blue">下架</a>
          </div>
        </div>
      </div>
      <div v-show="!isHaveData" class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {httpUrl} from '../../assets/js/http_url'
export default {
  name: 'index',
  data () {
    return {
      pageStart: '',
      pageEnd:'',
      items: [],
      isHaveData:true,
    }
  },
  methods: {
    //下架优惠券
    cancelCoupon(item){
      var _this = this;
      //alert('item'+JSON.stringify(item));
      $.confirm("下架后该活动结束且不能再次上架，是否确认下架该活动？", function() {
        var params = {
          couponNo:item.couponNo,
          couponNm: item.couponNm,       //优惠券名称
          startDt: item.couponLogo,        //活动开始时间
          expireDt: item.couponLogoTeam,       //活动结束时间
          couponAmt: item.couponAmt,      //优惠券金额
          couponNumTotal: item.couponNumTotal, //优惠券数量
          couponAmtMin: item.couponAmtMin,   //优惠券数量
          //couponStDesc:item.couponStDesc,
          couponSt:2,
        };
        _this.$http.jsonp(httpUrl.couponUpdate, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          console.log('响应：'+response.data);
          if(response.data.code==200){
            $.alert('下架成功',function () {
              _this.initData();
            });
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      }, function() {
        //点击取消后的回调函数
      });
    },
    initData() {
      var params = {
//        pageStart:this.pageStart,
//        pageEnd:this.pageEnd
      };
      this.$http.jsonp(httpUrl.coupon, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
        console.log('优惠券响应：'+response.data);
        if(response.data.code==200){
            if(response.data.data.datas.length>0){
              this.items = response.data.data.datas;
              this.isHaveData = true;
            }else{
              this.isHaveData = false;
            }
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
  mounted:function () {
    this.initData();
  }
}
</script>
<style scoped >
  .addCouponBtn{
    margin: 15px;
  }
  .couponList{
    margin: 15px 0;
  }
  .list{
    line-height: 20px;
    padding: 15px 0;
    color: #999999;
  }
  .title{
    line-height: 50px;
  }
  .title,.list{
    border-bottom: 1px solid #eeeeee;
  }
  .list a{
    padding: 0 5px;
    text-decoration:underline;
  }
  .weui-form-preview__ft{
    /*position: fixed;*/
    /*bottom: 0;*/
    /*background: #FFFFFF;*/
    /*padding: 15px;*/
  }
  .weui-form-preview__ft a{
    font-size: 16px;
    width: 80%;
    margin-top: 10px;
    margin-bottom: 10px;
    /*margin: 10px 0;*/
  }
</style>

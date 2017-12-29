<template>
  <div id="fansCoupon">
      <div class="couponList font14 txtCenter bgfff">
        <div class="weui-panel__hd txtLeft">可发送优惠券</div>
        <div class="weui-flex title marginLeft15">
          <div class="txtLeft" style="margin-left: 20px">选择</div>
          <div class="weui-flex__item">优惠券名称</div>
          <div class="weui-flex__item">剩余数量</div>
        </div>
        <div v-show="isHaveData" class="weui-flex list marginLeft15" v-for="item in couponItems">
          <div class="weui-cells_checkbox txtCenter">
            <label @click="selectCoupon($event)" class="weui-cell coupon-label" isSelect="false" :couponNo="item.couponNo">
                <input type="radio" class="weui-check" name="checkbox1">
                <i class="weui-icon-checked"></i>
            </label>
          </div>
          <div class="weui-flex__item txtLeft">{{item.couponNm}}</div>
          <div class="weui-flex__item">{{item.couponNum}}</div>
        </div>
        <div v-show="!isHaveData" class="weui-loadmore weui-loadmore_line">
          <span class="weui-loadmore__tips">暂无数据</span>
        </div>
      </div>
      <div class="weui-panel font14 weui-panel_access">
        <div class="weui-panel__hd">不可发送优惠券</div>
        <div class="weui-flex title txtCenter noSend color6">
          <!--<div class="txtLeft" style="margin-left: 20px">选择</div>-->
          <div class="weui-flex__item txtLeft">优惠券名称</div>
          <div class="weui-flex__item">剩余数量</div>
        </div>
        <div v-show="isHaveData2" class="weui-flex list txtCenter noSend" v-for="item in unSendItems">
          <!--<div class="weui-cells_checkbox txtCenter">-->
            <!--<label class="unCoupon-label" :couponNo="item.couponNo">-->
            <!--</label>-->
          <!--</div>-->
          <div class="weui-flex__item txtLeft">{{item.couponNm}}</div>
          <div class="weui-flex__item">{{item.couponNum}}</div>
        </div>
        <div v-show="!isHaveData2" class="weui-loadmore weui-loadmore_line">
          <span class="weui-loadmore__tips">暂无数据</span>
        </div>
      </div>
      <div class="empty"></div>
      <div class="weui-form-preview__ft wf">
        <div class="weui-flex wf txtCenter">
          <div class="weui-flex__item">
            <a @click="back" class="weui-btn weui-btn_default">
              返回
            </a>
          </div>
          <div class="weui-flex__item">
            <a @click="sendCoupon" class="weui-btn weui-btn_primary">
              发送
            </a>
          </div>
        </div>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {httpUrl} from '../../assets/js/http_url';
  export default {
    name: 'fansCoupon',
    data () {
      return {
        isFrom:'',
        unionId:'',
        couponItems:[],
        unSendItems:[],
        isHaveData:true,
        isHaveData2:true,
        unionNum:0
      }
    },
    methods: {
      back:function () {
        if(this.isFrom=='fansInfo'){
          this.$router.push({ path: '/fansInfo' });
        }else{
          this.$router.push({ path: '/fansManage' });
        }
      },
      selectCoupon(event){
        $('.coupon-label').attr('isSelect','false');
        var el = event.currentTarget;
        $(el).attr('isSelect','true');
      },
      couponList:function(){
        let params={
          unionNum:this.unionNum
        };
        this.$http.jsonp(httpUrl.couponQryDtl, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          if(response.data.code==200){
            if(response.data.data.couponsOK.length>0){
              this.couponItems = response.data.data.couponsOK;
              this.isHaveData = true;
            }else {
              this.isHaveData = false;
              this.couponItems = [];
            }
            if(response.data.data.couponsErr.length>0){
              this.unSendItems = response.data.data.couponsErr;
              this.isHaveData2 = true;
            }else {
              this.isHaveData2 = false;
              this.unSendItems = [];
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
      sendCoupon:function(){
        var _this =this;
        let couponNo = $('.coupon-label[isselect=true]').attr('couponNo');
        if(!couponNo){
          $.alert('请先选择优惠券');
        }else{
          //console.log('之还得回'+_this.unionId);
          let params = {
            couponNo:couponNo,
            unionId:_this.unionId
          }
          _this.$http.jsonp(httpUrl.sendCoupon, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
            if(response.data.code==200){
              $.alert('发送成功',function () {
//                if(_this.isFrom=='fansInfo'){
//                  _this.$router.push({ path: '/fansInfo' });
//                }
                if(_this.isFrom=='fansManage'){
                  _this.$router.push({ path: '/fansManage' });
                }
                else{
                  window.location.reload();
                }
              });
            }else {
              $.alert(response.data.desc);
            }
          }, (response) => {
            console.log('响应失败：'+response);
          });
        }
      },
    },
    beforeRouteLeave (to, from, next) {
      $.closeModal();
      next();
    },
    mounted() {
      let _this = this;
      let fansItems = _this.$store.state.fansItems;
      if(fansItems){
        _this.unionId = fansItems;
      }else{
        let localData = localStorage.getItem("fansItems");
        if(localData){
          _this.$store.commit('NEWFANSITEM', localData);
        }
        _this.unionId = localData;
      }
      if(_this.unionId.indexOf(',')>=0){
        _this.unionNum = _this.unionId.split(",").length-1;
      }else{
        _this.unionNum = 1;
      }
      console.log('用户数：'+_this.unionNum);
      _this.isFrom = _this.$route.query.isfrom;
      _this.couponList();
    },
  }
</script>

<style scoped >
  .weui-cell {
    padding: 0 15px;
  }
  .couponList{
    margin: 10px 0;
  }
  .list{
    line-height: 20px;
    padding: 15px 0;
    color: #999999;
  }
  .title{
    line-height: 40px;
  }
  .title,.list{
    border-bottom: 1px solid #eeeeee;
  }
  .list a{
    padding: 0 5px;
    text-decoration:underline;
  }
  .weui-form-preview__ft{
    position: fixed;
    bottom: 0;
    background: #FFFFFF;
    padding: 15px;
  }
  .weui-form-preview__ft a{
    font-size: 16px;
    width: 80%;
    margin-top: 10px;
    margin-bottom: 10px;
    /*margin: 10px 0;*/
  }
  .noSend{
    margin-left: 15px;
  }
  .marginLeft15{
    margin-left: 15px;
  }
</style>

<template>
  <div id="fansCoupon">
      <div class="couponList font14 txtCenter bgfff">
        <div class="weui-flex title">
          <div class="txtLeft" style="margin-left: 20px">选择</div>
          <div class="weui-flex__item">优惠券名称</div>
          <div class="weui-flex__item">剩余数量</div>
          <!--<div class="weui-flex__item">使用状态</div>-->
        </div>
        <div v-show="true" class="weui-flex list" v-for="item in couponItems">
          <div class="weui-cells_checkbox txtCenter">
            <label @click="selectCoupon($event)" class="weui-cell coupon-label" isSelect="false" :couponNo="item.couponNo">
                <input type="radio" class="weui-check" name="checkbox1">
                <i class="weui-icon-checked"></i>
            </label>
          </div>
          <div class="weui-flex__item txtLeft">{{item.couponNm}}</div>
          <!--<router-link :to="{ path: 'couponDetail', query: { couponNo:item.couponNo }}" class="weui-flex__item blue">{{item.couponNm}}</router-link>-->
          <div class="weui-flex__item">{{item.couponNum}}</div>
          <!--<div class="weui-flex__item">{{item.couponStDesc}}</div>-->
        </div>
        <div v-show="!isHaveData" class="weui-loadmore weui-loadmore_line">
          <span class="weui-loadmore__tips">暂无数据</span>
        </div>
      </div>
      <div class="weui-form-preview__ft wf">
      <div class="weui-flex wf txtCenter">
        <div class="weui-flex__item"><a @click="sendCoupon" class="weui-btn weui-btn_primary">发送</a></div>
        <!--<div class="weui-flex__item"><a href="javascript:;" class="weui-btn weui-btn_primary">批量发送消息</a></div>-->
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
        isHaveData:true
      }
    },
    methods: {
      selectCoupon(event){
        $('.coupon-label').attr('isSelect','false');
        var el = event.currentTarget;
        $(el).attr('isSelect','true');
      },
      couponList(){
        let params={couponSt:1};//0待上架 1已上架 2已下架 3已取消
        this.$http.jsonp(httpUrl.coupon, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          if(response.data.code==200){
            if(response.data.data.datas.length>0){
              this.isHaveData = true;
              this.couponItems = response.data.data.datas;
            }else{
              this.isHaveData = false;
              this.couponItems=[];
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
      sendCoupon(){
        var _this =this;
        let couponNo = $('.coupon-label[isselect=true]').attr('couponNo');
        if(!couponNo){
          $.alert('请先选择优惠券');
        }else{
          let params = {
            couponNo:couponNo,
            unionId:_this.unionId
          }
          _this.$http.jsonp(httpUrl.sendCoupon, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
            if(response.data.code==200){
              $.alert('发送成功',function () {
                if(_this.isFrom=='fansInfo'){
                  _this.$router.push({ path: '/fansInfo' });
                }else{
                  _this.$router.push({ path: '/fansManage' });
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
      if(this.$store.state.fansItems==''){
        let localData = localStorage.getItem("fansItems");
        this.$store.commit('newFansItem', localData);
        this.unionId = localData;
      }else{
        this.unionId = this.$store.state.fansItems;
      }
      this.isFrom = this.$route.query.isfrom;
      this.couponList();
    }
  }
</script>

<style scoped >
  .weui-cell {
    padding: 0 15px;
  }
  .couponList{
    margin: 15px 0 60px 0;
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
  bottom{
    position: fixed;
    bottom: 0;
    background: #FFFFFF
  }
  bottom a{
    font-size: 16px;
    width: 80%;
    margin-top: 10px;
    margin-bottom: 10px;
    /*margin: 10px 0;*/
  }
  .weui-form-preview__ft{
    position: fixed;
    bottom: 0;
    background: #FFFFFF
  }
  .weui-form-preview__ft a{
    font-size: 16px;
    width: 80%;
    margin-top: 10px;
    margin-bottom: 10px;
    /*margin: 10px 0;*/
  }
</style>

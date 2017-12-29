<template>
  <div>
    <div class="weui-panel weui-panel_access bgeee">
      <div class="weui-panel weui-panel_access" style="margin-bottom: 10px">
        <!--<div class="weui-panel__hd">文字组合列表</div>-->
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text">
            <span class="red block">{{order.orderStDesc}}</span>
            <!--distSt 0 锁箱中  1已锁箱  41锁箱失败-未锁箱-->
            <span class="weui-media-box__title" v-show="goodsDist.distSt==41">未锁箱</span>
            <span class="weui-media-box__title" v-show="goodsDist.distSt==1">已锁箱
              <small class="weui-media-box__title gray" v-show="goodsDist.boxNo">（箱号：{{goodsDist.boxNo}}）</small>
            </span>
            <span class="weui-media-box__title" v-show="goodsDist.distSt==0 && order.orderSt!=0">锁箱中</span>
            <a v-show="goodsDist.distSt==1 || goodsDist.distSt==41" @click="sendPro" href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary fr">发货</a>
          </div>
          <!--<div class="weui-media-box weui-media-box_text">-->
            <!--<span class="weui-media-box__title" v-show="goodsDist.boxNo">箱号：{{goodsDist.boxNo}}</span>-->
            <!--<a v-show="goodsDist.distSt==1" @click="sendPro" href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary fr">发货</a>-->
            <!--<span class="fr red">{{goodsDist.distStDesc}}</span>-->
          <!--</div>-->
          <div class="weui-media-box weui-media-box_text font14 color6">
            <!--<p>收货人：{{goodsDist.userNm}}</p>-->
            <p>收货地址：{{goodsDist.hostAddress}}</p>
            <p>联系电话：{{goodsDist.userMobile}}</p>
          </div>
        </div>
      </div>
      <div class="weui-panel__bd bgfff">
        <div class="weui-media-box weui-media-box_appmsg" v-for="goods in order.orderGoods">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="getImgSrc(goods.goodsImgLogo)">
          </div>
          <div class="weui-media-box__bd">
            <p class="pro-title weui-media-box__title font12">{{goods.goodsNm}}</p>
            <p class="pro-price">¥ {{goods.goodsAmtYuan}}</p>
            <p class="font12 fr">x {{goods.orderNum}}</p>
          </div>
        </div>
      </div>
      <div class="weui-form-preview">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item" v-show="order.couponAmtYuan>0">
            <label class="weui-form-preview__label">商品优惠</label>
            <span class="weui-form-preview__value">满{{order.couponAmtMinYuan}}减{{order.couponAmtYuan}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">运费</label>
            <span class="weui-form-preview__value">¥ {{order.distAmtYuan}}</span>
          </div>
          <!--<div class="weui-form-preview__item">-->
            <!--<label class="weui-form-preview__label">优惠券抵扣</label>-->
            <!--<span class="weui-form-preview__value">-¥ 5.00</span>-->
          <!--</div>-->
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label black">订单总价</label>
            <span class="weui-form-preview__value red">¥ {{order.orderAmtYuan}}</span>
          </div>
        </div>
      </div>
      <div class="weui-panel">
        <div class="weui-media-box weui-media-box_text font12 gray">
          <p>订单编号：{{order.orderNo}}</p>
          <p v-show="order.payOrderNo">交易流水：{{order.payOrderNo}}</p>
          <p>创建时间：{{getTimeStr(order.crtTs)}}</p>
          <p v-show="order.payTsTrue">支付时间：{{getTimeStr(order.payTs)}}</p>
          <p v-show="order.orderSt=='201'">发货时间：{{getTimeStr(goodsDist.distRealTs)}}</p>
          <p v-show="order.orderSt=='203'">完成时间：{{getTimeStr(goodsDist.popRealTs)}}</p>
        </div>
      </div>
    </div>
    <div class="return_button">
      <router-link :to="{path:'orderManage',query:{isFrom:'onLineOrder',orderSt:orderSt,orderSate:orderSate}}" class="weui-btn weui-btn_primary">返 回</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {httpUrl} from '../../assets/js/http_url.js';
  export default {
    name: 'index',
    data () {
      return {
        orderNo:'',
        order:{},
        goodsDist:{},
        goodsImgLogo:'',
        distId:'',
        orderSt:'',
        orderSate:''
      }
    },
    methods:{
      getImgSrc:function (src) {
        return httpUrl.imgHost+src
      },
      initData:function(){
        var _params = {
          orderNo:this.orderNo
        };
        this.$http.jsonp(httpUrl.onlineOrderDtl,{params:_params}).then((response)=>{
          var _res = response.body;
          if(_res.code == 200 && _res.data){
            this.order = _res.data.order;
            this.goodsDist = _res.data.goodsDist;
            this.distId = _res.data.order.orderGoods[0].distId;
            //console.log('信息'+this.goodsDist);
          }else{
            $.alert(_res.desc);
          }
        },(response)=>{
          console.log("error:",response.body);
        });
      },
      goodsSend:function () {
        //console.log('orderGoods:'+this.order);
        var _params = {
          distId:this.order.orderGoods[0].distId,
          hostId:this.goodsDist.hostId,
          boxNo:this.goodsDist.boxNo,
          distSt:this.goodsDist.distSt,
          orderNo:this.order.orderNo
          //distSt:41,//distSt 0 锁箱中  1已锁箱  41锁箱失败-未锁箱-
        };
        this.$http.jsonp(httpUrl.goodsSend,{params:_params}).then((response)=>{
          var _res = response.body;
          if(_res.code == 200){
            $.alert('发货成功');
            this.initData();
          }else{
            $.alert(_res.desc);
          }
        },(response)=>{
          console.log("error:",response.body);
        });
      },
      sendPro:function () {
        var that = this,text='',title='';
        if(that.goodsDist.distSt==41){//distSt 0 锁箱中  1已锁箱  41锁箱失败-未锁箱-
          title = '';
          text = '确认已配送完成？';
        }
        if(that.goodsDist.distSt==1){
          title = '已在快递柜前，确认开箱？';
          text = '点击"确认"箱门将打开，放置商品后请关闭箱门';
        }
        $.confirm({
          title: title,
          text: text,
          onOK: function () {
            //点击确认
            that.goodsSend();
          },
          onCancel: function () {
            //点击取消
          }
        });
      },
      getTimeStr:function (time) {
        if(time){
          return time.substring(0,19)
        }
      }
    },
    mounted(){
      this.orderNo = this.$route.query.orderNo;
      var orderSt = this.$route.query.orderSt;
      if(orderSt){
        this.orderSt = orderSt;
      }
      var orderSate = this.$route.query.orderSate;
      if(orderSate){
        this.orderSate = orderSate;
      }
      var obj={
        isFrom:'onLineOrder',
        orderSt:this.orderSt,
        orderSate:this.orderSate
      };
      sessionStorage.setItem("fromOrder",JSON.stringify(obj));
      this.initData();
    }
  }
</script>

<style scoped >
  .order-cell{
    width: 100%;float: left; font-size: 14px
  }
  .order-cell-lt{
    width: 80%; float: left
  }
  .order-cell-lf{
    margin-right: 5px;
  }
  .pro-title{
    width: 60%; float: left; line-height: 26px
  }
  .pro-price{
    width: 40%; float: left; text-align: right
  }
  .return_button{
    margin: 15px;
  }
  .return_button a{
    width: 100%;
  }
</style>

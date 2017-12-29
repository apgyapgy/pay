<template>
  <div>
    <div style="display: flex; top: 0; margin: 15px">
      <router-link style="width: 100%" :to="{path:'index'}" class="weui-btn weui-btn_primary">返回首页</router-link>
    </div>
    <div class="weui-navbar" style="top: 80px;">
      <div class="weui-navbar__item order-navbar-on">
        当面付订单
      </div>
      <div class="weui-navbar__item">
        线上订单
      </div>
      <div class="weui-navbar__item">
        超级卡订单
      </div>
    </div>
    <div class="empty-50"></div>
    <!--当面付查询条件-->
    <div v-show="nav0" class="order-cell-sel">
      <div>
          <span> 交易时间：</span>
          <i class="select-date" :class="{'weui-icon-success':orderDt=='0','weui-icon-circle':orderDt!='0'}" @click="changeOrderDt(0)"></i>今天
          <i class="select-date" :class="{'weui-icon-success':orderDt=='1','weui-icon-circle':orderDt!='1'}" @click="changeOrderDt(1)"></i>昨天
          <i class="select-date" :class="{'weui-icon-success':orderDt=='2','weui-icon-circle':orderDt!='2'}" @click="changeOrderDt(2)"></i>近7天
      </div>
      <div>
          <span> 支付方式：</span>
          <i class="select-pay" :class="{'weui-icon-success':payMode=='','weui-icon-circle':payMode!=''}" @click="changePayMode('')"></i>全部
          <i class="select-pay" :class="{'weui-icon-success':payMode=='0','weui-icon-circle':payMode!='0'}" @click="changePayMode('0')"></i>微信
          <i class="select-pay" :class="{'weui-icon-success':payMode=='6','weui-icon-circle':payMode!='6'}" @click="changePayMode('6')"></i>支付宝
      </div>
      <div>
          <span> 支付状态：</span>
          <i class="select-payType" :class="{'weui-icon-success':orderSt=='200','weui-icon-circle':orderSt!='200'}" @click="changeOrderSt(200)"></i>成功
          <i class="select-payType" :class="{'weui-icon-success':orderSt=='12','weui-icon-circle':orderSt!='12'}" @click="changeOrderSt(12)"></i>退款中
          <i class="select-payType" :class="{'weui-icon-success':orderSt=='202','weui-icon-circle':orderSt!='202'}" @click="changeOrderSt(202)"></i>退款成功
      </div>
    </div>
    <!--线上订单查询条件-->
    <div v-show="nav1" class="order-cell-sel">
      <div>
          <span>订单状态：</span>
          <i :class="{'weui-icon-success':orderSate=='-1','weui-icon-circle':orderSate!='-1'}" @click="changeOrderState('-1')"></i>全部
          <i :class="{'weui-icon-success':orderSate=='200','weui-icon-circle':orderSate!='200'}" @click="changeOrderState(200)"></i>待发货
          <i :class="{'weui-icon-success':orderSate=='201','weui-icon-circle':orderSate!='201'}" @click="changeOrderState(201)"></i>已发货
          <i :class="{'weui-icon-success':orderSate=='203','weui-icon-circle':orderSate!='203'}" @click="changeOrderState(203)"></i>已完成
      </div>
    </div>
    <!--超级卡订单查询条件-->
    <div v-show="nav2" class="order-cell-sel">
      <div>
        <span>交易时间：</span>
        <i :class="{'weui-icon-success':superOrderDt=='-1','weui-icon-circle':superOrderDt!='-1'}" @click="changeSuperOrderDt('-1')"></i>全部
        <i :class="{'weui-icon-success':superOrderDt=='0','weui-icon-circle':superOrderDt!='0'}" @click="changeSuperOrderDt(0)"></i>今天
        <i :class="{'weui-icon-success':superOrderDt=='1','weui-icon-circle':superOrderDt!='1'}" @click="changeSuperOrderDt(1)"></i>昨天
        <i :class="{'weui-icon-success':superOrderDt=='2','weui-icon-circle':superOrderDt!='2'}" @click="changeSuperOrderDt(2)"></i>近7天
      </div>
    </div>
    <!--当面付订单列表-->
    <div v-show="nav0" class="weui-panel">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells">
            <div id="orderList">
              <router-link :to="{ path:'payDetail',query:{orderNo:item.orderNo,payMode:payMode,orderSt:orderSt,orderDt:orderDt}}" v-for="item in orderList" :key="item.id" class="weui-cell weui-cell_access font14 line24" name='list'>
                <div class="weui-cell__hd">
                  <img class="weui-cell_icon payIcon" :src="chooseImg(item.payMode)" :alt="item.payModeShortDesc">
                </div>
                <div class="weui-cell__bd weui-cell_primary">
                  <p>{{item.payModeShortDesc+item.orderStDesc}}</p>
                  <p class="weui-media-box__desc font14">{{item.crtTs.substring(0,19)}}</p>
                </div>
                <div class="weui-cell__hd marginRt15">{{item.orderAmtYuan}}</div>
                <span class="weui-cell__ft"></span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--线上订单列表-->
    <div v-show="nav1" class="orderList-cell">
      <!--开始-->
      <div class="weui-panel weui-panel_access" v-for="item in childOrderList">
        <div class="weui-panel__bd">
          <div class="weui-panel__ft order-cell">
            <div class="weui-cell weui-cell_access">
              <div class="weui-cell__bd">
                <span class="order-cell-lf font12">订单号：{{item.orderNo}}</span>
                <!--<span class="weui-cell__ft"></span>-->
              </div>
              <span class="orderTp red">{{item.orderStDesc}}</span>
            </div>
            <!--<span class="orderTp red" v-show="item.orderSt==200">待发货</span>-->
            <!--<span class="orderTp red" v-show="item.orderSt==201">已发货</span>-->
            <!--<span class="orderTp red" v-show="item.orderSt==203">已完成</span>-->
          </div>
          <router-link :to="{ path:'orderDtl',query:{orderNo:item.orderNo,orderSate:orderSate,orderSt:orderSt,isFrom:'onLineOrder'}}"  class="weui-media-box weui-media-box_appmsg" v-for="good in item.orderGoods">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="getProImgSrc(good.goodsImgLogo)">
            </div>
            <div class="weui-media-box__bd">
                <p class="pro-title weui-media-box__title font12">{{good.goodsNm}}</p>
                <p class="pro-price">¥ {{good.orderAmtYuan/good.orderNum}}</p>
                <p class="font12 fr">x {{good.orderNum}}</p>
            </div>
          </router-link>
          <div class="weui-media-box__bd">
            <p class="order-cell-total">共{{item.goodsNum}}件，合计：¥ {{item.orderAmtYuan}}元(含运费¥ {{item.distAmtYuan}})</p>
          </div>
        </div>
      </div>
      <!--结束-->
    </div>
    <!--超级卡订单列表-->
    <div v-show="nav2" class="weui-panel">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells">
            <div id="superOrderList">
              <router-link :to="{ path:'superPayDetail',query:{orderNo:item.orderNo,payMode:'2',superOrderDt:superOrderDt,isFrom:'superOrder'}}" v-for="item in superOrderList" :key="item.id" class="weui-cell weui-cell_access font14 line24" name='list'>
                <div class="weui-cell__hd">
                  <img class="weui-cell_icon payIcon" :src="chooseImg(0)">
                </div>
                <div class="weui-cell__bd weui-cell_primary">
                  <p>{{item.payModeShortDesc+item.orderStDesc}}</p>
                  <p class="weui-media-box__desc font14">{{item.crtTs.substring(0,19)}}</p>
                </div>
                <div class="weui-cell__hd marginRt15">{{item.orderAmtOrgYuan}}</div>
                <span class="weui-cell__ft"></span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--暂无数据-->
    <div class="weui-panel" v-show="dataTip">
      <div class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import {httpUrl} from '../../assets/js/http_url.js';
  export default{
    data(){
      return{
        payMode:'',//支付方式
        orderSt:200,//订单状态
        orderSate:-1,//
        orderDt:0,//当面付交易时间
        orderType:0,//订单类型
        superOrderDt:'-1',//超级卡交易时间
        orderList:[],
        superOrderList:[],
        childOrderList:[],
        superOrderList:[],
        nav0:true,
        nav1:false,
        nav2:false,
        dataTip:false,
        proImgSrc:''
      }
    },
    methods:{
      getProImgSrc:function (src) {
        return httpUrl.imgHost + src;
      },
      changePayMode:function(mode){//改变支付类型
        this.payMode = mode;
        this.getOrderData();
      },
      changeOrderSt:function(status){//改变支付状态
        this.orderSt = status;
        this.getOrderData();
      },
      changeOrderDt:function(dt){//改变当面付支付时间
        this.orderDt = dt;
        this.getOrderData();
      },
      changeSuperOrderDt:function(dt){//改变支付时间
        this.superOrderDt = dt;
        this.getSuperOrder();
      },
      changeOrderState:function (status) {
        this.orderSt = status;
        this.orderSate = status;
        this.getChildOrderData();
      },
//      changeOrderType:function (type) {
//        this.orderType = type;
//        this.getChildOrderData();
//      },
      chooseImg:function(mode){//根据返回的payMode显示支付宝或微信图片
        if(mode == 0){//微信支付
          return 'https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/wxPay-icon.png';
        }else{
          return 'https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/aliPay-icon.png';
        }
      },
      //获取当面付订单
      getOrderData:function(){
        //alert(this.payMode);
        var _params = {
          orderSrc:9,////3用户小程序  9台卡二维码
          payMode:this.payMode,//支付方式 0 微信， 6 支付宝
          orderSt:this.orderSt,//支付状态 200 成功，202 退款成功，12 退款中
          orderDt:this.orderDt //支付日期 0 今天，1 昨日，2 近一周， 3 近一月
        }
        this.$http.jsonp(httpUrl.orderQry,
          {params:_params}
        ).then((response) => {
          console.log("success:",response.body);
          var _res = response.body;
          if(_res.code == 200){
            if(_res.data.datas && _res.data.datas.length>0){
              this.dataTip = false;
              this.orderList = _res.data.datas;
            }else{
              this.orderList = [];
              this.dataTip = true;
            }
          }else{
            $.alert(_res.desc);
          }
        },(response)=>{
          console.log("error:",response.body);
        });
      },
      //获取线上订单
      getChildOrderData:function(){
        var _params = {
          orderSrc:3,////3用户小程序  9台卡二维码
          needGoods:1,//查询订单是否需要同步查询出子订单 空-否 非空-是
          orderSt:this.orderSt,//200待发货,201已发货,203已完成
        }
        this.$http.jsonp(httpUrl.orderQry, {params:_params}).then((response) => {
          //console.log("success:",response.body);
          var _res = response.body;
          if(_res.code == 200){
            if(_res.data.datas && _res.data.datas.length>0){
              this.dataTip = false;
              this.childOrderList = _res.data.datas;
            }else{
              this.childOrderList = [];
              this.dataTip = true;
            }
          }else{
            $.alert(_res.desc);
          }
        },(response)=>{
          console.log("error:",response.body);
        });
      },
      //获取超级卡订单
      getSuperOrder:function(){
        var orderDt = this.superOrderDt;
        if(orderDt=='-1'){
          orderDt='';
        }
        var _params = {
          orderSrc:4,////3用户小程序  9台卡二维码  4超级卡
          payMode:2,//支付方式 0 微信，2超级卡 6 支付宝
          orderSt:200,//支付状态 200 成功，202 退款成功，12 退款中
          orderDt:orderDt //时间 0 今天，1 昨日，2 近7天
        }
        this.$http.jsonp(httpUrl.orderQry,
          {params:_params}
        ).then((response) => {
          console.log("success:",response.body);
          var _res = response.body;
          if(_res.code == 200){
            if(_res.data.datas && _res.data.datas.length>0){
              this.dataTip = false;
              this.superOrderList = _res.data.datas;
            }else{
              this.superOrderList = [];
              this.dataTip = true;
            }
          }else{
            $.alert(_res.desc);
          }
        },(response)=>{
          console.log("error:",response.body);
        });
      },
    },
    beforcreated:function(){
      //this.getOrderData();
    },
    beforeRouteLeave (to, from, next) {
      $.closeModal();
      next();
    },
    mounted(){
      var that = this;
      //切换tab标签
      $(".weui-navbar__item").click(function () {
        sessionStorage.removeItem("fromOrder");
        $(".weui-navbar__item").removeClass('order-navbar-on');
        $(this).addClass('order-navbar-on');
        var index = $(this).index();
        if(index==0){
          that.orderSt='200';
          that.orderSate = -1;
          that.payMode = '';
          that.nav0 = true;
          that.nav1 = false;
          that.nav2 = false;
          that.getOrderData();
          return;
        }
        if(index==1){
          that.orderSt = '-1';
          that.orderSate = -1;
          that.nav0 = false;
          that.nav1 = true;
          that.nav2 = false;
          that.getChildOrderData();
          return;
        }
        if(index==2){
          that.superOrderDt='-1';
          that.nav0 = false;
          that.nav1 = false;
          that.nav2 = true;
          that.getSuperOrder();
          return;
        }
      });
      var obj = JSON.parse(sessionStorage.getItem("fromOrder"));
      //console.log('obj:'+JSON.stringify(obj));
      if(obj){
        var isFrom = obj.isFrom;
        if(obj.orderSt){
          that.orderSt = obj.orderSt;
        }
        if(obj.orderDt){
          that.orderDt = obj.orderDt;
        }
        if(obj.payMode){
          that.payMode = obj.payMode;
        }
        if(obj.orderSate){
          that.orderSate = obj.orderSate;
        }
        if(obj.superOrderDt){
          that.superOrderDt = obj.superOrderDt;
        }
        if(isFrom=='taikaOrder'){
          that.nav0 = true;
          that.nav1 = false;
          that.nav2 = false;
          that.getOrderData();
        }
        if(isFrom=='onLineOrder'){
          $(".weui-navbar__item").removeClass('order-navbar-on');
          $(".weui-navbar__item").eq(1).addClass('order-navbar-on');
          that.orderSt = '-1';
          that.nav0 = false;
          that.nav1 = true;
          that.nav2 = false;
          that.getChildOrderData();
        }
        if(isFrom=='superOrder'){
          $(".weui-navbar__item").removeClass('order-navbar-on');
          $(".weui-navbar__item").eq(2).addClass('order-navbar-on');
          that.nav0 = false;
          that.nav1 = false;
          that.nav2 = true;
          that.getSuperOrder();
        }
      }else{
        that.getOrderData();
      }

      // var isFrom = that.$route.query.isFrom;
      // if(!isFrom){
      //   console.log('呵呵');
      //   that.getOrderData();
      // }
      // var orderSt = that.$route.query.orderSt;
      // if(orderSt){
      //   that.orderSt = orderSt;
      // }
      // var orderDt = that.$route.query.orderDt;
      // if(orderDt || orderDt==0){
      //   that.orderDt = orderDt;
      // }
      // var payMode = that.$route.query.payMode;
      // if(payMode || payMode==0){
      //   that.payMode = payMode;
      // }
      // var orderSate = that.$route.query.orderSate;
      // if(orderSate){
      //   that.orderSate = orderSate;
      // }
      // var superOrderDt = that.$route.query.superOrderDt;
      // if(superOrderDt || superOrderDt==0){
      //   that.superOrderDt = superOrderDt;
      // }
      // if(isFrom=='taikaOrder'){
      //   that.nav0 = true;
      //   that.nav1 = false;
      //   that.nav2 = false;
      //   that.getOrderData();
      // }
      // if(isFrom=='onLineOrder'){
      //   $(".weui-navbar__item").removeClass('order-navbar-on');
      //   $(".weui-navbar__item").eq(1).addClass('order-navbar-on');
      //   that.orderSt = '-1';
      //   //console.log('orderSt'+that.orderSt);
      //   that.nav0 = false;
      //   that.nav1 = true;
      //   that.nav2 = false;
      //   that.getChildOrderData();
      // }
      // if(isFrom=='superOrder'){
      //   $(".weui-navbar__item").removeClass('order-navbar-on');
      //   $(".weui-navbar__item").eq(2).addClass('order-navbar-on');
      //   that.nav0 = false;
      //   that.nav1 = false;
      //   that.nav2 = true;
      //   that.getSuperOrder();
      // }
    }
  }
</script>

<style scoped >
  .weui-navbar__item{
    /*background: #dedede;*/
  }
  .marginRt15{
    margin-right: 15px;
  }
  .weui-navbar__item{
    color: #999;
  }
  .empty-50{
    height: 50px;
  }
  .order-cell-sel{
    font-size: 14px;
    background: #FFFFFF;
    padding: 20px 15px 15px 15px;
  }
  .order-cell-sel>div{
    margin-bottom: 10px
  }
  .order-navbar-on{
    color: #0fa8ff;
    /*background: #0fa8ff;*/
    border-bottom: 2px solid #0fa8ff;
  }
  .orderTp{
    float: right;
    padding: 10px 0;
    font-size: 14px;
  }
  .order-cell{
    width: 100%;float: left; font-size: 14px
  }
  .order-cell-lt{
    width: 70%; float: left;padding: 10px 5px 10px 15px;
  }
  .order-cell-lf{
    margin-right: 5px;
  }
  .weui-cell_access .weui-cell__ft::after{
    right: inherit;
  }
  .pro-title{
    width: 60%; float: left; line-height: 26px
  }
  .pro-price{
    width: 40%; float: left; text-align: right
  }
  .order-cell-total{
    margin: 0 15px;
    font-size: 12px;
    line-height: 34px;
    border-top: 1px solid #eeeeee;
    text-align: right;
  }
  .order-cell-radio-title{
    width: 75px;
    float: left;
  }
</style>

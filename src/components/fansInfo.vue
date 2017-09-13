<template>
  <div id="coupon">
    <header class="weui-flex font14">
      <div class="fansPhoto">
        <img src="../../static/images/user2.png">
      </div>
      <div class="weui-flex__item gray line24">昵称：麦琪<br>
        省市：河南省周口市<br>
        性别：男<br>
        是否关注公众号：是<br>
        消费次数：10次<br>
        消费金额：100元<br>
        最近消费时间：2018-08-28 15:12:32</div>
    </header>
    <div class="couponList font14 txtCenter bgfff">
      <div class="weui-flex title">
        <div class="weui-flex__item">优惠券名称</div>
        <div class="weui-flex__item">有效日期</div>
        <div class="weui-flex__item">使用状态</div>
      </div>
      <div class="weui-flex list">
        <router-link to="/couponDetail" class="weui-flex__item blue">满150减20</router-link>
        <div class="weui-flex__item">2017-09-07至2017-09-30</div>
        <div class="weui-flex__item">进行中</div>
      </div>
      <div class="weui-flex list">
        <router-link to="/couponDetail" class="weui-flex__item blue">满150减20</router-link>
        <div class="weui-flex__item">2017-09-07至2017-09-30</div>
        <div class="weui-flex__item">进行中</div>
      </div>
      <div class="weui-flex list">
        <router-link to="/couponDetail" class="weui-flex__item blue">满150减20</router-link>
        <div class="weui-flex__item">2017-09-07至2017-09-30</div>
        <div class="weui-flex__item">进行中</div>
      </div>
    </div>
    <bottom class="weui-form-preview__ft wf">
      <div class="weui-flex wf txtCenter">
        <div class="weui-flex__item"><a href="javascript:;" class="weui-btn weui-btn_primary">发送优惠券</a></div>
        <div class="weui-flex__item"><a href="javascript:;" class="weui-btn weui-btn_primary">发送消息</a></div>
      </div>
    </bottom>
  </div>
</template>
<script type="text/ecmascript-6">
  import {httpUrl} from '../assets/js/http_url';
  export default {
    name: 'coupon',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        gridData: []
      }
    },
    methods: {
      cancel(){
        $.confirm("确认取消活动？", function() {
          //点击确认后的回调函数
        }, function() {
          //点击取消后的回调函数
        });
//        $.alert('优惠券已发放，不可取消活动');
      }
    }
  }
</script>

<style scoped >
  header{
    margin: 10px 0;
    background: #FFFFFF;
    padding: 10px;
  }
  .fansPhoto{
    width: 100px;
    text-align: center;
    margin-top: 20px
  }
  .fansPhoto img{
    width: 60px;
    height: 60px;
    border-radius: 100%;
    border: 1px solid #eeeeee;
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
</style>

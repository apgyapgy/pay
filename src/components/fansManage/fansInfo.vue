<template>
  <div id="fansInfo">
    <header class="weui-flex font14">
      <div class="fansPhoto">
        <img :src="userInfo.headImgUrl">
      </div>
      <div class="weui-flex__item gray line24">
        <div>昵称：{{userInfo.nickNm}}</div>
        <div v-show="userInfo.province">省市：{{userInfo.province}} {{userInfo.city}}</div>
        <div v-show="userInfo.sex!=0">性别：{{userInfo.sex==1?"男":"女"}}</div>
        <div>是否关注公众号：{{userInfo.openIdCircle ? "是" : "否"}}</div>
        <div>消费次数：{{userInfo.txnTotalNum}}</div>
        <div>消费金额：{{userInfo.txnTotalAmt}}</div>
        <div>最近消费时间：{{userInfo.txnLatestTs}}</div>
      </div>
    </header>
    <div class="couponList font14 txtCenter bgfff">
      <div class="weui-flex title">
        <div class="weui-flex__item">优惠券名称</div>
        <div class="weui-flex__item">有效日期</div>
        <div class="weui-flex__item">使用状态</div>
      </div>
      <div v-show="isHaveData" class="weui-flex list" v-for="item in items">
        <div class="weui-flex__item">{{item.couponNm}}</div>
        <!--<router-link :to="{ path: 'couponDetail', query: { couponNo:item.couponNo }}" class="weui-flex__item blue">{{item.couponNm}}</router-link>-->
        <div class="weui-flex__item">{{item.couponLogo}}至{{item.couponLogoTeam}}</div>
        <div class="weui-flex__item">{{item.couponStDesc}}</div>
      </div>
      <div v-show="!isHaveData" class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
    </div>
    <div class="empty"></div>
    <div class="weui-form-preview__ft wf">
      <div class="weui-flex wf txtCenter">
        <div class="weui-flex__item">
          <div @click="newFansItem" class="weui-btn weui-btn_primary">
            发送优惠券
          </div>
        </div>
        <!--<div class="weui-flex__item"><a href="javascript:;" class="weui-btn weui-btn_primary">批量发送消息</a></div>-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {httpUrl} from '../../assets/js/http_url';
  export default {
    name: 'fansInfo',
    data () {
      return {
        unionId:'',
        userInfo:{},
        items:[],
        isHaveData:true
      }
    },
    methods: {
      newFansItem:function () {
        this.$store.commit('NEWFANSITEM', this.unionId);
        //console.log('粉丝个人：'+this.$store.state.fansItems);
        this.$router.push({ path: '/fansCoupon',query:{ isfrom:'fansInfo'}});
      },
      returnIndex:function () {
        this.$router.push({ path: '/index' });
      },
      initData() {
        let params={
          unionId:this.unionId
        };
        this.$http.jsonp(httpUrl.userCoupon, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          console.log('响应：'+response.data);
          if(response.data.code==200){
            if(response.data.data.datas.length>0){
              this.isHaveData = true;
              this.items = response.data.data.datas;
            }else{
              this.isHaveData = false;
              this.items = [];
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      }
    },
    beforeRouteEnter(to,from,next){
      window.sessionStorage.backFlag = 'false';
      if(from.fullPath.indexOf('/fansCoupon')>=0 && to.fullPath=='/fansInfo'){
        window.sessionStorage.backFlag = 'true';
      }
      next();
    },
    beforeRouteLeave (to, from, next) {
      $.closeModal();
      if(from.fullPath=='/fansInfo' && to.fullPath.indexOf('/fansCoupon')>=0){
        if(window.sessionStorage.backFlag == 'true'){
          this.$router.push({ path: '/fansManage' });
        }else{
          next();
        }
      }else{
        next();
      }
    },
    mounted() {
      let fansInfo = this.$store.state.fansInfo;
      if(fansInfo){
        this.userInfo = JSON.parse(this.$store.state.fansInfo);
      }else{
        let localData = localStorage.getItem("fansInfo");
        if(localData){
          this.$store.commit('NEWUSER', localData);
        }
        this.userInfo = JSON.parse(localData);
      }
      this.unionId = this.userInfo.unionId;
      this.initData();
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
    margin: 15px 0 0 0;
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
</style>

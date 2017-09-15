<template>
  <div id="fansManage">
    <header>
      <div class="weui-flex border-bottom1 tabName">
        <a @click="userType($event)" qryType="0" class="weui-flex__item border-right1 blue"><b class="block font25">{{userNum.totalNum}}</b>所有用户</a>
        <a @click="userType($event)" qryType="1" class="weui-flex__item gray"><b class="block font25">{{userNum.latestNum}}</b>最近光顾</a>
      </div>
      <div class="weui-flex tabName">
        <a @click="userType($event)" qryType="2" class="weui-flex__item border-right1 gray"><b class="block font25">{{userNum.activityNum}}</b>活跃用户</a>
        <a @click="userType($event)" qryType="3" class="weui-flex__item gray"><b class="block font25">{{userNum.looseNum}}</b>流失用户</a>
      </div>
    </header>
    <div class="total font14">
      <div>
        <span>共<b class="red">{{userNum.totalNum}}</b>个粉丝，<b class="red">{{userNum.careNum}}</b>个已关注公众号</span>
        <a class="fr" @click="guanzhu">
          <!--<i class="weui-icon-success hide"></i>-->
          <i id="selIcon" class="weui-icon-circle"></i>关注公众号
        </a>
      </div>
    </div>
    <div class="weui-nav weui-flex wf txtCenter line50 tabOrder">
        <a @click="search($event)" name="amt" ref="amt" class="weui-flex__item weui-nav_a border-right1 weui-nav_on">
          <input class="weui-nav_input" type="text" id='amt'/>
          按金额<img src="../../../static/images/arrow.png">
          <!--<img src="../../static/images/arrow-down.png">-->
        </a>
        <a @click="search($event)" name="amount" ref="amount" class="weui-flex__item weui-nav_a border-right1 weui-nav_default">
          <input class="weui-nav_input" type="text" id='amount'/>
          按次数<img src="../../../static/images/arrow.png">
        </a>
        <a @click="search($event)" name="time" ref="time" class="weui-flex__item weui-nav_a border-right1 weui-nav_default">
          <input class="weui-nav_input" type="text" id='time'/>
          按时间<img src="../../../static/images/arrow.png">
        </a>
        <a @click="search($event)" name="pay" ref="pay" class="weui-flex__item weui-nav_a weui-nav_default">
          <input class="weui-nav_input" type="text" id='pay'/>
          支付方式<img src="../../../static/images/select.png">
          <!--<img src="../../static/images/selected.png">-->
        </a>
    </div>
    <div class="weui-panel weui-panel_access wf fans-list">
      <div class="weui-panel__bd">
        <!--<a @click="newUser(items[index])" class="weui-media-box weui-media-box_appmsg" v-for="(item,index) in items" >-->
        <router-link @click.native="newUser(items[index])" :to="{ path: 'fansInfo'}" class="weui-media-box weui-media-box_appmsg" v-for="(item,index) in items" >
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb imgRadius" :src="item.headImgUrl">
          </div>
          <div class="weui-media-box__bd">
            <p class="wf font14">
              <span>{{item.nickNm}}<img v-show="item.openIdCircle" class="titleImg" src="../../../static/images/weChat-icon.png"></span>
              <span class="fr">消费次数：{{item.txnTotalNum}}<br>消费金额：{{item.txnTotalAmt}}</span>
            </p>
            <p class="weui-media-box__desc wf line30">最近消费时间:{{item.txnLatestTs}}</p>
          </div>
        </router-link>
        <!--</a>-->
        <div v-show="!isHaveData" class="weui-loadmore weui-loadmore_line">
          <span class="weui-loadmore__tips">暂无数据</span>
        </div>
      </div>
    </div>
    <div class="weui-form-preview__ft wf">
      <div class="weui-flex wf txtCenter">
        <div class="weui-flex__item">
          <router-link @click.native="newFansItem()" :to="{ path: 'fansCoupon',query:{ isfrom:'fansManage'} }" class="weui-btn weui-btn_primary">
            批量发送优惠券
          </router-link>
        </div>
        <!--<div class="weui-flex__item"><a href="javascript:;" class="weui-btn weui-btn_primary">批量发送消息</a></div>-->
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {httpUrl} from '../../assets/js/http_url';
  import {publicJs} from '../../assets/js/public';
  export default {
    name: 'fansManage',
    data () {
      return {
        mchId:this.$route.query.mchId,
        items:[],
        userNum:{},
        qryType:0,//0:所有用户 1：最近光顾 2：活跃用户 3：流失用户
        selectItem:[
          {name:'amt',value:['由高到低','由低到高']},
          {name:'amount',value:['由多到少','由少到多'],index:[0,1]},
          {name:'time',value:['3天内','一周内','一月内'],index:[0,1,2]},
          {name:'pay',value:['全部','微信支付','支付宝支付'],index:[0,1,2]}
        ],
        openIdCircle:'',//是否已关注公众号
        txnLatestTsStart:'',
        txnWeekNumMin:'',
        txnWeekNumMin:'',
        txnMonthNumMax:'',
        payMode:'',
        orderBy:'',
//        txn_total_num		交易次数升序
//        txn_total_num desc  交易次数降序
//        txn_total_amt		交易金额升序
//        txn_total_amt desc 	交易金额降序
//        txn_latest_ts		最近交易时间升序
//        txn_latest_ts desc	最近交易时间降序
        isHaveData:false,
        unionId:'',
      }
    },
    methods: {
      //选择查询方式
      search:function(e){
        var el = e.currentTarget.getAttribute('name');
        $('.tabOrder a').removeClass('weui-nav_on').addClass('weui-nav_default');
        $('a[name='+el+']').addClass('weui-nav_on').removeClass('weui-nav_default');
      },
      //选择用户
      userType:function(event){
        $('.tabName>a').removeClass('blue').addClass('gray');
        var el = event.currentTarget;
        $(el).addClass('blue');
        this.qryType = $(el).attr('qryType');
        //console.log('userType'+this.qryType);
        this.getData();
      },
      guanzhu(){
        if($('#selIcon').hasClass('weui-icon-circle')){
          $('#selIcon').removeClass('weui-icon-circle').addClass('weui-icon-success');
          this.openIdCircle = 1;
        }else{
          $('#selIcon').removeClass('weui-icon-success').addClass('weui-icon-circle');
          this.openIdCircle = '';
        }
        this.getData();
      },
      getData() {
        if(this.qryType==0){//全部用户
          this.allData();
          return;
        }
        if(this.qryType==1){//最近光顾
          this.txnLatestTsStart = -3;
          this.txnWeekNumMin = '';
          this.txnMonthNumMax = '';
          this.txnTotalNumMin = '';
        }
        if(this.qryType==2){//活跃用户
          this.txnLatestTsStart = '';
          this.txnWeekNumMin = 3;
          this.txnMonthNumMax = '';
          this.txnTotalNumMin = '';
        }
        if(this.qryType==3){//流失用户
          this.txnLatestTsStart = '';
          this.txnWeekNumMin = '';
          this.txnMonthNumMax = 0;
          this.txnTotalNumMin = 0;
        }
        let qryParams ={
          mchId:this.mchId,
          txnLatestTsStart:this.txnLatestTsStart,
          txnWeekNumMin:this.txnWeekNumMin,
          txnWeekNumMin:this.txnWeekNumMin,
          txnMonthNumMax:this.txnMonthNumMax,
          orderBy:this.orderBy,
          payMode:this.payMode,
          openIdCircle:this.openIdCircle
        };
        //console.log('_this.qryParams'+json.stringify(_this.qryParams));
        this.$http.jsonp(httpUrl.fansQuery, {params: Object.assign(qryParams, httpUrl.com_params)}).then((response) => {
          if(response.data.code == 200){
            if(response.data.data.datas.length != 0){
              this.isHaveData = true;
              this.items = response.data.data.datas;
              //循环对象的可枚举属性
              this.unionId = '';
              for (var key of Object.keys(this.items)) {
                let time = this.items[key].txnLatestTs;
                this.items[key].txnLatestTs = time.split(".")[0];
                let amt = this.items[key].txnTotalAmt;
                this.items[key].txnTotalAmt = publicJs.accDiv(amt,100);
                this.unionId += this.items[key].unionId+',';
              }
            }else{
              this.items = [];
              this.isHaveData = false;
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
      allData(){
        let params = {
          mchId:this.mchId,
          txnLatestTsStart:'',
          txnWeekNumMin:'',
          txnMonthNumMax:'',
          txnTotalNumMin:'',
          orderBy:this.orderBy,
          payMode:this.payMode,
          openIdCircle:this.openIdCircle
        };
        this.$http.jsonp(httpUrl.fansManage, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          if(response.data.code==200){
            this.userNum = {
              activityNum:response.data.data.activityNum, //活跃用户
              latestNum:response.data.data.latestNum,   //最近光顾
              looseNum:response.data.data.looseNum,    //流失用户
              totalNum:response.data.data.totalNum,    //所有用户
              careNum:response.data.data.careNum,     //关注公众号
            };
            if(response.data.data.custs.length != 0){
              this.isHaveData = true;
              this.items = response.data.data.custs;
              //循环对象的可枚举属性
              this.unionId = '';
              for (var key of Object.keys(this.items)) {
                let time = this.items[key].txnLatestTs;
                this.items[key].txnLatestTs = time.split(".")[0];
                let amt = this.items[key].txnTotalAmt;
                this.items[key].txnTotalAmt = publicJs.accDiv(amt,100);
                this.unionId += this.items[key].unionId+',';
              }
            }else{
              this.items = [];
              this.isHaveData = true;
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
      newUser: function(item) {
        //console.log('粉丝：'+item);
        this.$store.commit('newUser', JSON.stringify(item))
      },
      newFansItem:function () {
        this.$store.commit('newFansItem', this.unionId);
      }
    },
    beforeRouteLeave (to, from, next) {
      $.each(this.selectItem,function(i,obj) {
        $('#'+obj.name).picker("close");
      });
      $.closeModal();
      next();
    },
    mounted(){//等整个视图渲染完毕，用 vm.$nextTick 替换掉 mounted
      var _this = this;
      _this.allData();
      _this.$nextTick(function () {
        //选择查询方式
        $.each(_this.selectItem,function(i,obj) {
          $('#'+obj.name).picker({cols: [{textAlign: 'center', values: obj.value}],
            onChange: function(p, v, dv) {
              console.log(p, v, dv);
            },
            onClose: function(p, v, d){
              let val = $('#'+obj.name).val();
              switch(val){
                case '由高到低':
                  _this.orderBy = 'txn_total_amt desc';//交易金额降序
                  _this.payMode = '';
                  break;
                case '由低到高':
                  _this.orderBy = 'txn_total_amt';//交易金额升序
                  _this.payMode = '';
                  break;
                case '由多到少':
                  _this.orderBy = 'txn_total_num desc';//交易次数降序
                  _this.payMode = '';
                  break;
                case '由少到多':
                  _this.orderBy = 'txn_total_num';//交易次数升序
                  _this.payMode = '';
                  break;
                case '由近及远':
                  _this.orderBy = 'txn_latest_ts desc';//最近交易时间降序
                  _this.payMode = '';
                  break;
                case '由远及近':
                  _this.orderBy = 'txn_latest_ts';//最近交易时间升序
                  _this.payMode = '';
                  break;
                case '全部':
                  _this.orderBy ='';
                  _this.payMode = '';
                  break;
                case '微信支付':
                  _this.orderBy ='';
                  _this.payMode = '0';
                  break;
                case '支付宝支付':
                  _this.orderBy ='';
                  _this.payMode = '6';
                  break;
              };
              console.log('选择完了');
              _this.getData();
            }
          });
        });
      })
    }
  }
</script>

<style scoped >
  header{
    background: #FFFFFF;
    text-align: center;
  }
  header .weui-flex__item{
    padding: 20px;
    line-height: 30px;
  }
  .total{
    margin: 15px;
    line-height: 30px;
  }
  .imgRadius{
    border-radius: 100%;
    border: 1px solid #eeeeee;
  }
  .titleImg{
    margin-left: 4px;
  }
  .weui-nav_a{
    position: relative;
  }
  .weui-nav_input{
    width:100%;
    position: absolute;
    opacity: 0;
    height: 50px;
    left: 0;
  }
  .weui-nav_on{
    background: #FFFFFF;
    color: #0fa8ff;
    border-bottom: 1px solid #FFFFFF;
  }
  .up{
    background: url("../../../static/images/arrow-up.png") no-repeat right center;
    background-size: 16px 16px;
    padding-right: 16px;
  }
  .weui-nav_default{
    background: #f9f9f9;
    color: #999999;
    border-bottom: 1px solid #eeeeee;
  }
  .weui-panel::before{
    border-top:0;
  }
  .fans-list{
    margin-top: 0px;
    margin-bottom: 60px;
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

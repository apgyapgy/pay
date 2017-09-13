<template>
  <div id="fansManage">
    <header>
      <div class="weui-flex border-bottom1">
        <div class="weui-flex__item border-right1"><b class="block font25 blue">50.00</b>账面余额</div>
        <div class="weui-flex__item"><b class="block font25 blue">10</b>最近光顾</div>
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item border-right1"><b class="block font25 blue">50</b>活跃用户</div>
        <div class="weui-flex__item"><b class="block font25 blue">5</b>流失用户</div>
      </div>
    </header>
    <div class="total font14">
      <div>
        <span>共<b class="red">20</b>个粉丝，<b class="red">2</b>个已关注公众号</span>
        <span class="fr">
          <i class="weui-icon-success"></i>
          <!--<i class="weui-icon-circle"></i>-->
          关注公众号
        </span>
      </div>
    </div>
    <div class="weui-nav weui-flex wf txtCenter line50">
        <a @click="search($event)" name="amt" ref="amt" class="weui-flex__item weui-nav_a border-right1 weui-nav_on">
          <input class="weui-nav_input" type="text" id='amt'/>
          按金额<img src="../../static/images/arrow.png">
          <!--<img src="../../static/images/arrow-down.png">-->
        </a>
        <a @click="search($event)" name="amount" ref="amount" class="weui-flex__item weui-nav_a border-right1 weui-nav_default">
          <input class="weui-nav_input" type="text" id='amount'/>
          按次数<img src="../../static/images/arrow.png">
        </a>
        <a @click="search($event)" name="time" ref="time" class="weui-flex__item weui-nav_a border-right1 weui-nav_default">
          <input class="weui-nav_input" type="text" id='time'/>
          按时间<img src="../../static/images/arrow.png">
        </a>
        <a @click="search($event)" name="pay" ref="pay" class="weui-flex__item weui-nav_a weui-nav_default">
          <input class="weui-nav_input" type="text" id='pay'/>
          支付方式<img src="../../static/images/select.png">
          <!--<img src="../../static/images/selected.png">-->
        </a>
    </div>
    <div class="weui-panel weui-panel_access wf fans-list">
      <div class="weui-panel__bd">
        <router-link to="/fansInfo" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb imgRadius" src="../../static/images/user2.png">
          </div>
          <div class="weui-media-box__bd">
            <p class="wf font14">
              <span>王小二<img class="titleImg" src="../../static/images/weChat-icon.png"></span>
              <span class="fr">消费次数：10<br>消费金额：100</span>
            </p>
            <p class="weui-media-box__desc wf line30">最近消费时间:2017-09-07 12:25:06</p>
          </div>
        </router-link>
        <router-link to="/fansInfo" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb imgRadius" src="../../static/images/user2.png">
          </div>
          <div class="weui-media-box__bd">
            <p class="wf font14">
              <span>王小二<img class="titleImg" src="../../static/images/weChat-icon.png"></span>
              <span class="fr">消费次数：10<br>消费金额：100</span>
            </p>
            <p class="weui-media-box__desc wf line30">最近消费时间:2017-09-07 12:25:06</p>
          </div>
        </router-link>
        <router-link to="/fansInfo" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb imgRadius" src="../../static/images/user2.png">
          </div>
          <div class="weui-media-box__bd">
            <p class="wf font14">
              <span>王小二<img class="titleImg" src="../../static/images/weChat-icon.png"></span>
              <span class="fr">消费次数：10<br>消费金额：100</span>
            </p>
            <p class="weui-media-box__desc wf line30">最近消费时间:2017-09-07 12:25:06</p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="weui-form-preview__ft wf">
      <div class="weui-flex wf txtCenter">
        <div class="weui-flex__item"><a href="javascript:;" class="weui-btn weui-btn_primary">批量发送优惠券</a></div>
        <div class="weui-flex__item"><a href="javascript:;" class="weui-btn weui-btn_primary">批量发送消息</a></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  $(function() {
    FastClick.attach(document.body);
  });
  import {httpUrl} from '../assets/js/http_url';
  export default {
    name: 'fansManage',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        selectItem:[
          {name:'amt',value:['由高到低','由低到高']},
          {name:'amount',value:['由多到少','由少到多']},
          {name:'time',value:['3天内','一周内','一月内']},
          {name:'pay',value:['全部','微信支付','支付宝支付']}
        ],
      }
    },
    methods: {
      search:function(e){
        var el = e.currentTarget.getAttribute('name');
        $('.weui-flex__item').removeClass('weui-nav_on').addClass('weui-nav_default');
        $('a[name='+el+']').addClass('weui-nav_on').removeClass('weui-nav_default');
      },
    },
    mounted(){//等整个视图渲染完毕，用 vm.$nextTick 替换掉 mounted
      this.$nextTick(function () {
        //选择查询方式
        $.each(this.selectItem,function(i,obj) {
          $('#'+obj.name).picker({cols: [{textAlign: 'center', values: obj.value}],
            onChange: function(p, v, dv) {
              console.log(p, v, dv);
            },
            onClose: function(p, v, d){
              console.log("选择了："+$('#'+obj.name).val());
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
    background: url("../../static/images/arrow-up.png") no-repeat right center;
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

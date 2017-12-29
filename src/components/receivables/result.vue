<template>
    <div class="weui-msg result">
      <!-- <div>isShow:{{isShow}}</div>
      <div>orderSt:{{orderSt}}</div> -->
      <div>
        <div v-show='isShow' class="weui-msg__icon-area">
          <div v-show="orderSt==200">
            <img src="https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/sucess-icon.png">
            <h2>付款成功</h2>
          </div>
          <div v-show="orderSt!=200 && orderSt!=0">
            <img src="https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/fail-icon.png">
            <h2>付款失败</h2>
            <h5 class="gray">很遗憾，您没有付款成功！</h5>
          </div>
        </div>
        <div v-show='!isShow' class="weui-msg__icon-area">
          <div class="loadEffect">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </div>
          <h2>付款中...</h2>
          <h5 class="gray">用户付款中，请耐心等待！</h5>
        </div>
        <p class="weui-btn-area">
          <router-link :to="{ path: 'index'}" class="return-btn-default">返回首页</router-link>
          <router-link :to="{ path: 'receivable'}" class="return-btn-hover">继续收款</router-link>
        </p>
        <!-- <div class="weui-msg__text-area">
          <p class="txtCenter">商家实收</p>
          <h2 class="weui-msg__title">142.00元</h2>
          <p class="weui-msg__desc yellow">
            浮动金额：0.58元
          </p>
        </div> -->
        <!-- <div class="weui-msg__opr-area">
          <p class="weui-btn-area">
            <router-link :to="{ path: 'receivable'}" class="weui-btn weui-btn_primary">完 成</router-link>
            <router-link :to="{ path: 'index'}" class="weui-btn weui-btn_default">返回首页</router-link>
          </p>
        </div> -->
      </div>
    </div>
</template>

<script>
  import {httpUrl} from '../../assets/js/http_url';
  export default{
    data(){
      return{
        isShow:false,
        amtTp:'',//0:押金 1：预付款
        amtLeftYuan:'',//预付款余额
        bool:true,
        result:'',
        orderSt:'',
        timer:'',
        timesRun:0,
        websock: null,
      }
    },
    sockets:{
      connect: function(){//这里是监听connect事件
        this.id = this.$socket.id
      },
      // customEmit: function(val){//这里是监听customEmit事件
      //   console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
      // }
    },
    beforeRouteLeave (to, from, next) {
        clearInterval(this.timer);
        next();
    },
    method:function(){
      threadPoxi(){  // 实际调用的方法
          //参数
          const agentData = "mymessage";
          //若是ws开启状态
          if (this.websock.readyState === this.websock.OPEN) {
              this.websocketsend(agentData)
          }
          // 若是 正在开启状态，则等待300毫秒
          else if (this.websock.readyState === this.websock.CONNECTING) {
              let that = this;//保存当前对象this
              setTimeout(function () {
                  that.websocketsend(agentData)
              }, 300);
          }
          // 若未开启 ，则等待500毫秒
          else {
              this.initWebSocket();
              let that = this;//保存当前对象this
              setTimeout(function () {
                  that.websocketsend(agentData)
              }, 500);
          }
      },
      initWebSocket(){ //初始化weosocket
          //ws地址
          //const wsuri = process.env.WS_API + "/websocket/threadsocket";
          const wsuri = '接口地址';
          this.websock = new WebSocket(wsuri);
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
      },
      websocketonmessage(e){ //数据接收
          const redata = JSON.parse(e.data);
          console.log(redata.value);
      },
      websocketsend(agentData){//数据发送
          this.websock.send(agentData);
      },
      websocketclose(e){  //关闭
          console.log("connection closed (" + e.code + ")");
      }
    },
    created(){
        this.initWebSocket()
    },
    mounted:function(){
      $("body").css({"background":"#ffffff","overflow":"hidden"});

      this.$socket.emit('connect', val); //在这里触发connect事件

      this.result = this.$route.query.result;
      //alert('付款码'+this.result);
      var _params = {
        payCode:this.result
      }
      //设置定时器，每3秒执行一次
      var _this = this;
      _this.timer = setInterval(getPayResult,3000)
      function getPayResult() {
        console.log('执行了');
        _this.timesRun += 3;
        if(_this.timesRun === 60){
          clearInterval(_this.timer);
          $.alert('支付超时，实际付款结果请以微信消息推送通知为准',function(){
            _this.$router.push({ path: '/index'});
          });
        }
        let isWait = true;
        if(_this.bool){
          _this.$http.jsonp(httpUrl.scardOrderDtl,{params: Object.assign(_params, {isHide:true})}).then(function(res){
            var _res = res.body;
            console.log('scardOrderDtl接口返回'+JSON.stringify(_res));
            if(_res.code == 200){
              //alert('orderSt'+_res.data);
              if(_res.data){
                  _this.orderSt = _res.data.orderSt;
                  //成功
                  if(_this.orderSt==200){
                    isWait = false;
                    _this.isShow = true;
                    clearInterval(this.timer);
                  }
                  //失败
                  if(_this.orderSt!=200 && _this.orderSt!=0 ){
                    isWait = false;
                    _this.isShow = true;
                    clearInterval(this.timer);
                  }
                  // //处理中
                  // if(!_this.orderSt || _this.orderSt==0){
                  //   isWait = true;
                  //   _this.isShow = false;
                  // }
              }
            }else{
              clearInterval(this.timer);
              $.alert(_res.desc,function(){
                _this.$router.push({ path: '/index' });
              });
            }
            _this.bool = isWait;
          })
        }
         // for(let i=0; i < 5; i++){
         //    if(_this.bool){
         //      console.log('i='+i);
         //      if(i==4){
         //          newArray = false;
         //      }
         //      _this.bool = newArray;
         //    }
         //  }
      }
      getPayResult(); 
    }
  }
</script>

<style scoped>
  h2{
    color: #828282;
    margin-top: 15px;
  }
  .weui-msg__icon-area{
    margin-top: 50px;
  }
  .result{
    width: 100%;
    background-color: #fff;
  }
  .return-btn-default{
    width: 50%;
    margin:0 25%; 
    display: block;
    line-height: 40px;
    text-align: center;
    border-radius: 40px;
    background: #eeeeee;
    color: #999;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .return-btn-hover{
    width: 50%;
    margin:0 25%; 
    display: block;
    line-height: 40px;
    text-align: center;
    border-radius: 40px;
    background: #f57464;
    color: #fff;
    font-size: 20px;
    margin-bottom: 20px;
  }
  /*加载效果*/
  .loadEffect{
            width: 100px;
            height: 100px;
            position: relative;
            margin: 0 auto;
            margin-top:100px;
        }
        .loadEffect span{
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #f57665;
            position: absolute;
            -webkit-animation: load 1.04s ease infinite;
        }
        @-webkit-keyframes load{
            0%{
                -webkit-transform: scale(1.2);
                opacity: 1;
            }
            100%{
                -webkit-transform: scale(.3);
                opacity: 0.5;
            }
        }
        .loadEffect span:nth-child(1){
            left: 0;
            top: 50%;
            margin-top:-10px;
            -webkit-animation-delay:0.13s;
        }
        .loadEffect span:nth-child(2){
            left: 14px;
            top: 14px;
            -webkit-animation-delay:0.26s;
        }
        .loadEffect span:nth-child(3){
            left: 50%;
            top: 0;
            margin-left: -10px;
            -webkit-animation-delay:0.39s;
        }
        .loadEffect span:nth-child(4){
            top: 14px;
            right:14px;
            -webkit-animation-delay:0.52s;
        }
        .loadEffect span:nth-child(5){
            right: 0;
            top: 50%;
            margin-top:-10px;
            -webkit-animation-delay:0.65s;
        }
        .loadEffect span:nth-child(6){
            right: 14px;
            bottom:14px;
            -webkit-animation-delay:0.78s;
        }
        .loadEffect span:nth-child(7){
            bottom: 0;
            left: 50%;
            margin-left: -10px;
            -webkit-animation-delay:0.91s;
        }
        .loadEffect span:nth-child(8){
            bottom: 14px;
            left: 14px;
            -webkit-animation-delay:1.04s;
        }
</style>

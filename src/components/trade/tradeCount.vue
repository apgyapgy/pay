<template>
  <div id="trade">
    <!-- 导航 -->
    <div class="weui-navbar">
      <div class="weui-navbar__item blue" @click="changeNav($event,0)">全部</div>
      <div class="weui-navbar__item" @click="changeNav($event,1)">昨日</div>
      <div class="weui-navbar__item" @click="changeNav($event,2)">近7天</div>
      <div class="weui-navbar__item" @click="changeNav($event,3)">近1个月</div>
    </div>
    <div class="trade" v-show="isHavaData">
        <div class="trade-item" :class="type==0?'border-bottom1':''">
          <p class="font25">
            <b v-show="type==0">{{totalAmt}}</b>
            <b v-show="type==1">{{lastAmt}}</b>
            <b v-show="type==2">{{weekAmt}}</b>
            <b v-show="type==3">{{monthAmt}}</b>
          </p>
          交易金额
        </div>
        <div class="trade-item" :class="type==0?'border-bottom1':''">
          <p class="font25">
            <b v-show="type==0">{{totalNum}}</b>
            <b v-show="type==1">{{lastNum}}</b>
            <b v-show="type==2">{{weekNum}}</b>
            <b v-show="type==3">{{monthNum}}</b>
          </p>
          交易笔数
        </div>
        <div class="trade-item" v-show="type==0"><p class="font25"><b>{{todayAmt}}</b></p>当日交易金额</div>
        <div class="trade-item" v-show="type==0"><p class="font25"><b>{{todayNum}}</b></p>当日交易笔数</div>
    </div>
    <div class="dataTip" v-show="!isHavaData">暂无数据</div>
    <div id="eChart" style="width: 96%;height:240px;">
    </div>
  </div>
</template>

<script>
  import {httpUrl} from '../../assets/js/http_url';
  import {publicJs} from '../../assets/js/public';
  import echarts from 'echarts'
  export default {
    name: 'trade',
    data () {
      return {
        type:0,
        wxData:{},
        payData:{},
        totalAmt:'',
        totalNum:'',
        lastAmt:'',
        lastNum:'',
        weekAmt:'',
        weekNum:'',
        monthAmt:'',
        monthNum:'',
        todayAmt:'',
        todayNum:'',
        isHavaData:false
      }
    },
    methods: {
      changeNav:function (event,val) {
        $('.weui-navbar__item').removeClass('blue');
        var el = event.currentTarget;
        $(el).addClass('blue');
        this.type = val;
        if(val==0){//全部
          this.drawEchart(this.wxData.txnTotalAmtStr,this.wxData.txnTotalNum,this.payData.txnTotalAmtStr,this.payData.txnTotalNum);
        }
        if(val==1){//昨日
          this.drawEchart(this.wxData.txnLastAmtStr,this.wxData.txnLastNum,this.payData.txnLastAmtStr,this.payData.txnLastNum);
        }
        if(val==2){//近7天
          this.drawEchart(this.wxData.txnWeekAmtStr,this.wxData.txnWeekNum,this.payData.txnWeekAmtStr,this.payData.txnWeekNum);
        }
        if(val==3){//近1个月
          this.drawEchart(this.wxData.txnMonthAmtStr,this.wxData.txnMonthNum,this.payData.txnMonthAmtStr,this.payData.txnMonthNum);
        }
      },
      drawEchart:function (wxAmt,wxCount,payAmt,payCount) {
        console.log('wxAmt:'+wxAmt);
        console.log('wxCount:'+wxCount);
        console.log('payAmt:'+payAmt);
        console.log('payCount:'+payCount);
        var myChart = echarts.init(document.getElementById('eChart'));
        //myChart.showLoading();
        myChart.setOption({
          title : {
//            text: '用户交易统计',
//            subtext: '用户交易统计',
//            x:'center'
          },
          legend: {
            bottom:0,
            data: ['微信支付','支付宝支付']
          },
          series : [
            {
              name: '交易统计',
              type: 'pie',
              radius : '40%',//半径
              center: ['50%', '50%'],//圆心坐标
//              selectedMode:'single',
//              legendHoverLink:true,
              data:[
                {
                  value:wxAmt,
                  name:'微信支付',
//                  selected:true,
                  itemStyle: {
                    normal: {
                      color: '#a2cb29'
                    }
                  },
                  label: {
                    normal: {
                      formatter: [
                        '{title|{b}}{abg|}',
                        ' 总金额:{value|'+wxAmt+'}',
                        ' 总笔数:{count|'+wxCount+'}',
                      ].join('\n'),
                      backgroundColor: '#fff',
                      borderColor: '#ddd',
                      borderWidth: 1,
                      borderRadius: 4,
                      rich: {
                        title: {
                          color: '#eee',
                          align: 'center'
                        },
                        abg: {
                          backgroundColor: '#a2cb29',
                          width: '100%',
                          align: 'right',
                          height: 25,
                          borderRadius: [4, 4, 0, 0]
                        },
                        value: {
                          height: 20,
                          padding: [0, 5, 0, 5],
                          align: 'left'
                        },
                        count: {
                          height: 20,
                          align: 'left',
                          padding: [0, 5, 0, 5]
                        },
                      }
                    }
                  }
                },
                {
                  value:payAmt,
                  name:'支付宝支付',
                  itemStyle: {
                    normal: {
                      color: '#26baf1'
                    }
                  },
                  label: {
                    normal: {
                      formatter: [
                        '{title|{b}}{abg|}',
                        ' 总金额:{value|'+payAmt+'}',
                        ' 总笔数:{rate|'+payCount+'}',
                      ].join('\n'),
                      backgroundColor: '#fff',
                      borderColor: '#ddd',
                      borderWidth: 1,
                      borderRadius: 4,
                      rich: {
                        title: {
                          color: '#eee',
                          align: 'center'
                        },
                        abg: {
                          backgroundColor: '#26baf1',
                          width: '100%',
                          align: 'right',
                          height: 25,
                          borderRadius: [4, 4, 0, 0]
                        },
                        value: {
                          height: 20,
                          padding: [0, 5, 0, 5],
                          align: 'left'
                        },
                        rate: {
                          height: 20,
                          align: 'left',
                          padding: [0, 5, 0, 5]
                        },
                      }
                    }
                  }
                },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        //myChart.hideLoading();
      },
      initData() {
        //this.drawEchart('40000','1000','20000','1000');
        this.$http.jsonp(httpUrl.orderTj, {}).then((response) => {
          if(response.data.code==200){
            if(!response.data.data.datas||response.data.data.datas.length==0){
              //暂无数据
              return;
            }else{
              this.isHavaData = true;
            }
            var empty={
              txnTotalAmtStr:0,
              txnTotalNum:0,
              txnLastAmtStr:0,
              txnLastNum:0,
              txnWeekAmtStr:0,
              txnWeekNum:0,
              txnMonthAmtStr:0,
              txnMonthNum:0,
              txnTodayAmtStr:0,
              txnTodayNum:0
            };
            var wxData = empty, payData = empty;
            if(response.data.data.datas[0]&&response.data.data.datas[0].userTp==0){//微信支付
              wxData = response.data.data.datas[0];
            }
            if(response.data.data.datas[1]&&response.data.data.datas[1].userTp==1){//支付宝支付
              payData = response.data.data.datas[1];
            }
            if(response.data.data.datas[0]&&response.data.data.datas[0].userTp==1){
              payData = response.data.data.datas[0];
            }
            if(response.data.data.datas[1]&&response.data.data.datas[0].userTp==0){
              wxData = response.data.data.datas[0];
            }
            this.payData = payData;this.wxData = wxData;
            this.totalAmt = publicJs.accAdd(wxData.txnTotalAmtStr,payData.txnTotalAmtStr);
            this.totalNum= publicJs.accAdd(wxData.txnTotalNum,payData.txnTotalNum);
            this.lastAmt = publicJs.accAdd(wxData.txnLastAmtStr,payData.txnLastAmtStr);
            this.lastNum = publicJs.accAdd(wxData.txnLastNum,payData.txnLastNum);
            this.weekAmt = publicJs.accAdd(wxData.txnWeekAmtStr,payData.txnWeekAmtStr);
            this.weekNum = publicJs.accAdd(wxData.txnWeekNum,payData.txnWeekNum);
            this.monthAmt = publicJs.accAdd(wxData.txnMonthAmtStr,payData.txnMonthAmtStr);
            this.monthNum = publicJs.accAdd(wxData.txnMonthNum,payData.txnMonthNum);
            this.todayAmt = publicJs.accAdd(wxData.txnTodayAmtStr,payData.txnTodayAmtStr);
            this.todayNum = publicJs.accAdd(wxData.txnTodayNum,payData.txnTodayNum);
            if(this.type==0){//全部
              this.drawEchart(wxData.txnTotalAmtStr,wxData.txnTotalNum,payData.txnTotalAmtStr,payData.txnTotalNum);
            }
            if(this.type==1){//昨日
              this.drawEchart(wxData.txnLastAmtStr,wxData.txnLastNum,payData.txnLastAmtStr,payData.txnLastNum);
            }
            if(this.type==2){//近7天
              this.drawEchart(wxData.txnWeekAmtStr,wxData.txnWeekNum,payData.txnWeekAmtStr,payData.txnWeekNum);
            }
            if(this.type==3){//近1个月
              this.drawEchart(wxData.txnMonthAmtStr,wxData.txnMonthNum,payData.txnMonthAmtStr,payData.txnMonthNum);
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
    },
    mounted() {
      this.initData();
    }
  }
</script>

<style scoped >
  .weui-navbar__item:active{
    color: #0fa8ff;
  }
  .trade{
    margin: 65px 15px 15px 15px;
    display: flex;
    flex-wrap:wrap;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 20px;
  }
  .trade-item{
    flex-grow:1;
    text-align: center;
    padding: 20px;
    width: 50%;
  }
  .trade-item:nth-child(odd){
    border-right: 1px solid #eeeeee;
  }
  .trade-item:nth-child(even){
    border-right:0;
  }
  .dataTip{
    text-align: center;
    line-height: 200px;
  }
</style>

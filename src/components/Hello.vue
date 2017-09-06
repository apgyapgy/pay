<template>
  <div class="bgfff">
    <div class="index-header">
      <dl class="index-header-dl">
        <dt class="fl">
          <img id="mchLogo" class="userPhoto fl" src="../../static/images/user.png">
          <a id="mchNm" href="user.html" class="weui-cell_access"></a>
        </dt>
        <dd class="fr hide">
          <a class="weui-cell_access" href="userLogin.html">
            退出<span class="weui-cell__ft"></span>
          </a>
        </dd>
      </dl>
      <div class="index-money">
        <span class="block">账面余额</span>
        <b id="balanceYuan" class="block totalAmt"></b>
      </div>
    </div>
    <div class="index-content">
      <div class="weui-panel">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells">
              <div class="weui-form-preview__ft line30" style="padding: 20px;">
                <div class="weui-form-preview__btn weui-form-preview__btn_default">
                  <span id="dailyAmtYuan" class="block blue font25"></span>
                  <span class="block font12">今日收款金额(元)</span>
                </div>
                <div class="weui-form-preview__btn weui-form-preview__btn_default">
                  <span id="dailyNum" class="block blue font25"></span>
                  <span class="block font12">今日收款笔数</span>
                </div>
              </div>
            </div>
            <div class="weui-cells">
              <a id="orderList" class="weui-cell weui-cell_access">
                <div class="weui-cell__hd">
                  <img class="weui-cell_icon" src="../../static/images/search-icon.png" alt="交易查询"></div>
                <div class="weui-cell__bd weui-cell_primary">
                  <p>交易查询</p>
                </div>
                <span class="weui-cell__ft"></span>
              </a>
              <a class="weui-cell weui-cell_access" href="payRecord.html">
                <div class="weui-cell__hd">
                  <img class="weui-cell_icon" src="../../static/images/record-icon.png" alt="资金到账记录"></div>
                <div class="weui-cell__bd weui-cell_primary">
                  <p>资金到账记录</p>
                </div>
                <span class="weui-cell__ft"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  $(function() {
    FastClick.attach(document.body);
  });
</script>
<script>
import {httpUrl} from '../../config/http_url';
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      gridData: []
    }
  },
  methods: {
    fetchData() {
      var params = {
//        openId:'104_133_108_110_141_104_77_69_97_133_83_111_140_97_113_142_142_69_137_113_101_134_92_92_140_128_139_116_73_108_131_114_104_133_129_100_134_77_78_137_99_91_82_87_36',
//        loginId: '15900688940',
        qrId: '86542688',
        src:2,
        openId:3
      };
      this.$http.jsonp(httpUrl.user_bind, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
        // 响应成功回调
        console.log('成功'+response.data.code);
        this.gridData = response.data;
      }, (response) => {
        // 响应错误回调
        console.log('失败'+response);
      });
    },
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

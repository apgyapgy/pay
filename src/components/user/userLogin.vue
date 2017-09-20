<template>
  <div id="userLogin" class="login-panel">
    <p class="photo">
      <img src="../../../static/images/fuiou.png">
    </p>
    <div>
        <span class="block login-span">
            <label>账户</label>
            <input id="mobile" v-model="loginId" class="login-input font16" placeholder="请输入手机号" type="tel" maxlength="11">
        </span>
      <span class="block login-span">
            <label>密码</label>
            <input id="password" v-model="loginPwd" class="login-input font16" placeholder="请输入密码" type="password">
        </span>
      <p class="login-btn">
        <a id="login" @click="login" class="weui-btn weui-btn_primary">登录</a>
        <router-link to="/userPwd" class="forgetPwd font14">忘记密码</router-link>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {httpUrl} from '../../assets/js/http_url';
  import {publicJs} from '../../assets/js/public';
  export default {
    name: 'userLogin',
    data () {
      return {
        loginId:'',
        loginPwd:'',
        src:0
      }
    },
    methods: {
      login() {
        var params = {
          loginId: this.loginId,
          loginPwd: this.loginPwd,
          src:this.src,
        };
        this.$http.jsonp(httpUrl.login, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          if(response.data.code==200){
            this.$router.push({ path: '/index' })
          }else {
            $.alert(response.data.desc);
          }
          this.gridData = response.data;
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
    },
    mounted() {
      let src = publicJs.getAddressParam('src');
      if(src){
        this.src = src;
      }
    }
  }
</script>

<style scoped >
  .login-panel{
    margin: 20px;
  }
  .login-panel .photo{
    margin: 40px 0 30px 0;
    text-align: center;
  }
  .login-panel .photo img{
    width: 100px;
    border-radius: 100%;
  }
  .login-span{
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-bottom: 10px;
    padding: 0 10px;
    border-radius: 6px;
    border: 1px solid #d6d6d6;
    background: #ffffff;
    position: relative;
  }
  .login-input{
    width: 80%;
    height: 40px;
    line-height: 40px;
    margin-left: 5px;
    position: absolute;
    top:5px;
  }
  .login-btn{
    margin-top: 30px;
    text-align: center;
  }
  .forgetPwd{
    line-height: 30px;
    color: #10aeff;
  }
</style>

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate';
import App from './App'
import router from './router'
import store from './store/index'
import VueResource from 'vue-resource'
import VueWechat from 'vue-wechat-title'
import 'babel-polyfill'
import VueSocketio from 'vue-socket.io';
//Vue.use(VueSocketio, 'http://socketserver.com:1923');//监听的接口地址

// import VueWebsocket from "vue-websocket";
// Vue.use(VueWebsocket);
//Vue.use(VueWebsocket, "ws://otherserver:8080");//监听的接口地址

import './assets/css/weui.min.css'
import './assets/css/jquery-weui.min.css'
import './assets/css/common.css'

import './assets/js/jquery-2.1.4.js'
import './assets/js/jquery-weui.js'
import './assets/js/public.js'
import FastClick from './assets/js/fastclick.js'
FastClick.attach(document.body);


Vue.config.productionTip = false
// Vue.prototype.$http = axios
Vue.use(VueResource);
Vue.use(VueWechat);
Vue.use(VeeValidate);

Vue.http.options.emulateJSON = true;
// Vue.http.headers.contentType ='application/x-www-form-urlencoded;charset=utf-8';
Vue.http.interceptors.push((request, next) => {
  // 请求发送前的处理逻辑
  //console.log('isHide'+request.params.isHide);
  if(request.params.isHide && request.params.isHide==true){//是否隐藏laoding
    $.hideLoading();
  }else{
    $.showLoading();
  }
  request.jsonp = 'callback';
  request.credentials = true;
  request.header = {
      'content-type': 'application/json',
      'Cookie': 'JSESSIONID=' + sessionStorage.getItem('sessionId')
  };
  //let data = JSON.parse(request.data)
  next((response) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    // 请求发送后的处理逻辑
    setTimeout(function() {
      $.hideLoading();
    }, 500)
    var that = this;
    if(response.data.code=='40101'){
      //window.location.href='/o2oh5/mch/#/';//生产环境
      window.location.href='/h5/mch/#/';//测试环境
    }
    return response
  });
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import VueWechat from 'vue-wechat-title'
import 'babel-polyfill'

import './assets/css/weui.min.css'
import './assets/css/jquery-weui.min.css'
import './assets/css/common.css'
import './assets/js/fastclick.js'
import './assets/js/jquery-weui.js'
import './assets/js/public.js'

Vue.config.productionTip = false
// Vue.prototype.$http = axios
Vue.use(VueResource);
Vue.use(VueWechat);

Vue.http.options.emulateJSON = true;
// Vue.http.headers.contentType ='application/x-www-form-urlencoded;charset=utf-8';
Vue.http.interceptors.push((request, next) => {
  $.showLoading();
  request.jsonp = 'callback';
  //let data = JSON.parse(request.data)
  next((response) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    setTimeout(function() {
      $.hideLoading();
    }, 500)
    if(response.data.code=='40101'){
      window.location.href='/userLogin'
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

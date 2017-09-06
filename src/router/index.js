import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Pay from '@/components/pay/pay'

Vue.use(Router)

export default new Router({
	mode:'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      meta: {
        title: '首页'
      },
      component: Hello
    },
    {
    	path:'/pay',
    	name:'Pay',
    	meta:{
    		title:'支付'
    	},
    	component:Pay
    }
  ]
})

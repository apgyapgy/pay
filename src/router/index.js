import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
/*优惠券管理*/
import Coupon from '@/components/coupon/coupon'
import CouponDetail from '@/components/coupon/couponDetail'
import CouponAdd from '@/components/coupon/couponAdd'
import CouponUpdate from '@/components/coupon/couponUpdate'
/*粉丝管理*/
import FansManage  from '@/components/fansManage/fansManage'
import FansInfo from '@/components/fansManage/fansInfo'
import FansCoupon from '@/components/fansManage/fansCoupon'
/*交易查询*/
import OrderList from '@/components/order/list'
import OrderPayDetail from '@/components/order/paydetail'
/*资金到账*/
import PayRecord from '@/components/payRecord/recode'
/*用户*/
import UserLogin from '@/components/user/userLogin'
import User from '@/components/user/user'
import UserInfo from '@/components/user/info'
import UserPwd from '@/components/user/pwd'

Vue.use(Router)

export default new Router({
  base :'/h5/mch/',
  routes: [
    {
      path: '/',
      name: 'userLogin',
      meta: {
        title: '登录'
      },
      component: UserLogin,
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        title: '首页'
      },
      component: Index,
      // children:[
      //
      // ]
    },
    {
      path: '/orderList',
      name: 'orderList',
      meta: {
        title: '交易查询'
      },
      component: OrderList,
    },
    {
      path: '/orderPayDetail',
      name: 'orderPayDetail',
      meta: {
        title: '交易详情'
      },
      component: OrderPayDetail,
    },
    {
      path: '/payRecord',
      name: 'payRecord',
      meta: {
        title: '资金划账记录'
      },
      component: PayRecord,
    },
    {
      	path: '/fansManage',
      	name: 'fansManage',
      	meta: {
        	title: '粉丝管理'
      	},
      	component: FansManage,
    },
    {
      	path: '/fansInfo',
      	name: 'fansInfo',
      	meta: {
        	title: '粉丝详情'
      	},
      	component: FansInfo,
    },
    {
      path: '/fansCoupon',
      name: 'fansCoupon',
      meta: {
        title: '选择优惠券'
      },
      component: FansCoupon,
    },
    {
      	path:'/coupon',
      	name:'coupon',
      	meta:{
        	title:'优惠券'
      	},
      	component:Coupon
    },
    {
      	path:'/couponDetail',
      	name:'couponDetail',
      	meta:{
        	title:'优惠券详情'
      	},
      	component:CouponDetail
    },
    {
      	path:'/couponUpdate',
      	name:'couponUpdate',
      	meta:{
        	title:'修改优惠券'
      	},
      	component:CouponUpdate
    },
    {
      	path:'/couponAdd',
      	name:'couponAdd',
      	meta:{
        	title:'新增优惠券'
      	},
      	component:CouponAdd
    },
    {
    	path:'/user',
    	name:'user',
    	meta:{
    		title:'商户信息'
    	},
    	component:User
    },
    {
    	path:'/userInfo',
    	name:'userInfo',
    	meta:{
    		title:'商户详情'
    	},
    	component:UserInfo
    },
    {
    	path:'/userPwd',
    	name:'userPwd',
    	meta:{
    		title:'找回密码'
    	},
    	component:UserPwd
    }
  ]
})

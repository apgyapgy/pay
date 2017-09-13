import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/components/userLogin'
import Index from '@/components/index'
import Coupon from '@/components/coupon'
import CouponDetail from '@/components/couponDetail'
import CouponAdd from '@/components/couponAdd'
import CouponUpdate from '@/components/couponUpdate'
import FansManage  from '@/components/fansManage'
import FansInfo from '@/components/fansInfo'
import Coupons from '@/components/coupons/coupons'
import CouponManage from '@/components/coupons/manage'
import OrderList from '@/components/order/list'
import OrderPayDetail from '@/components/order/paydetail'
import PayRecord from '@/components/pay/recode'
import PaySuccess from '@/components/pay/success'
import QrCode from '@/components/qrcode/qrcode'
import User from '@/components/user/user'
import UserInfo from '@/components/user/info'
import UserPwd from '@/components/user/pwd'

Vue.use(Router)

export default new Router({
	//mode:'history',
	routes: [
	{
      	path: '/',
      	name: 'userLogin',
      	meta: {
        	title: '登录'
      	},
      	component: UserLogin,
      	children: [{
          	path: '/',
          	component: Index
        }]
	},
	{
      	path: '/index',
      	name: 'index',
      	meta: {
        	title: '首页'
      	},
      	component: Index,
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
    	path:'/coupons',
    	name:'Coupons',
    	meta:{
    		title:'我的卡券包'
    	},
    	component:Coupons
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
    	path:'/couponManage',
    	name:'couponManage',
    	meta:{
    		title:'优惠券管理'
    	},
    	component:CouponManage
    },
    {
    	path:'/orderList',
    	name:'orderList',
    	meta:{
    		title:'交易记录'
    	},
    	component:OrderList
    },
    {
    	path:'/orderPayDetail',
    	name:'orderPayDetail',
    	meta:{
    		title:'支付详情'
    	},
    	component:OrderPayDetail
    },
    {
    	path:'/payRecord',
    	name:'payRecord',
    	meta:{
    		title:'资金划账记录'
    	},
    	component:PayRecord
    },
	{
    	path:'/paySuccess',
    	name:'paySuccess',
    	meta:{
    		title:'支付结果'
    	},
    	component:PaySuccess
    },
    {
    	path:'/qrCode',
    	name:'qrCode',
    	meta:{
    		title:'二维码绑定'
    	},
    	component:QrCode
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

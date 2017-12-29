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
import OrderList from '@/components/order/orderList'
import PayDetail from '@/components/order/payDetail'
/*订单管理*/
import OrderManage from '@/components/order/orderManage'
import OrderDtl from '@/components/order/orderDtl'
import SuperPayDetail from '@/components/order/superPayDetail'

/*资金到账*/
import PayRecord from '@/components/payRecord/payRecord'
/*用户*/
import UserLogin from '@/components/user/userLogin'
import User from '@/components/user/user'
import UserInfo from '@/components/user/info'
import UserPwd from '@/components/user/pwd'
import Shop from '@/components/user/shop'
/*产品管理*/
import ProductManage from '@/components/product/productManage'
import ProductDtl from '@/components/product/productDtl'
/*交易统计*/
import TradeCount from '@/components/trade/tradeCount'

/*超级卡收款*/
import Receivable from '@/components/receivables/receivable'
import Result from '@/components/receivables/result'

/*每日对账*/
import Account from '@/components/account/account'

Vue.use(Router)

export default new Router({
  mode: 'hash',    //路由的模式
  //base :'/h5/mch/', //测试环境
  //base :'/o2oh5/mch/',//生产环境
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
      path: '/payDetail',
      name: 'payDetail',
      meta: {
        title: '交易详情'
      },
      component: PayDetail,
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
    		title:'密码'
    	},
    	component:UserPwd
    },
    {
      path:'/productManage',
      name:'productManage',
      meta:{
        title:'商品管理'
      },
      component:ProductManage
    },
    {
      path:'/productDtl',
      name:'productDtl',
      meta:{
        title:'添加商品'
      },
      component:ProductDtl
    },
    {
      path:'/orderManage',
      name:'orderManage',
      meta:{
        title:'订单管理'
      },
      component:OrderManage
    },
    {
      path:'/orderDtl',
      name:'orderDtl',
      meta:{
        title:'订单详情'
      },
      component:OrderDtl
    },
    {
      path:'/superPayDetail',
      name:'superPayDetail',
      meta:{
        title:'订单详情'
      },
      component:SuperPayDetail
    },
    {
      path:'/shop',
      name:'shop',
      meta:{
        title:'我的店铺'
      },
      component:Shop
    },
    {
      path:'/tradeCount',
      name:'tradeCount',
      meta:{
        title:'交易统计'
      },
      component:TradeCount
    },
    {
      path:'/receivable',
      name:'receivable',
      meta:{
        title:'超级卡收款'
      },
      component:Receivable
    },
    {
      path:'/result',
      name:'result',
      meta:{
        title:'支付结果'
      },
      component:Result
    },
    {
      path:'/account',
      name:'account',
      meta:{
        title:'每日对账'
      },
      component:Account
    }
  ]
})

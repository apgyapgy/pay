//环境
let localhostDev = true;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
let _host= localhostDev ? 'https://dswx-test.fuiou.com/o2o-mch/' : 'https://o2omch.fuiou.com/';
let _hrefUrl = localhostDev ? '/h5/mch/#/' : 'https://staticds.fuiou.com/sys/ds/o2oh5/mch/#/';
let _imgHost ='https://staticds.fuiou.com/';
//获取地址栏参数
function getAddressParam(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
};
let openId = getAddressParam('_PO2OMCHWXOPENID_');
if(!openId){
  //openId = sessionStorage.getItem('openId');
  openId = '104_133_108_110_141_104_77_69_97_133_83_111_140_97_113_142_142_69_137_113_101_134_92_92_140_128_139_116_73_108_131_114_104_133_129_100_134_77_78_137_99_91_82_87_36';
}
sessionStorage.setItem('openId',openId);
let _comparams = {
  'clientType': 2,
  'openId':openId
};
let httpUrl = {
  //登录过期跳转地址
  'hrefUrl':_hrefUrl,
  //图片域名
  'imgHost': _imgHost,
  //公共参数
  'com_params': _comparams,//客户端类型：0苹果IOS、1安卓Android、2微信公众号、3微信小程序
  //各接口名称
  'login':_host + '/user/bind',//登录
  'home':_host + '/user/home_open',//首页
  'coupon':_host + '/api/coupon/qry',//优惠券
  'couponAdd':_host + '/api/coupon/add',//新增优惠券
  'couponUpdate':_host + '/api/coupon/upd',//修改优惠券
  'couponDetail':_host + 'api/coupon/dtl',//优惠券详情,
  'orderQry':_host+'api/mch/order/qry',//订单管理
  'couponQryDtl':_host+'api/coupon/qryDtl',//优惠券查询(区分可用不可用)
  'orderDetail':_host+'api/mch/order/detail',//当面付订单详情
  'onlineOrderDtl':_host+'/api/mch/onlineOrder/detail',//线上订单详情
  'goodsSend':_host+'/api/mch/goodsSend',//发货
  'smsRefund':_host+'api/sms/refund',//发送验证码
  'orderRefund':_host+'api/mch/order/refund',//退款
  'paySearch':_host+'api/mch/pay_amt_st',//查询数据
  'phoneCode':_host+'api/sms/reset_pwd',//发送手机验证码
	'resetPwd':_host+'user/reset_pwd',
  'fansManage':_host + '/api/mch/cust_load',//粉丝管理
  'fansQuery':_host + '/api/mch/cust_qry',//粉丝查询
  'sendCoupon':_host + '/api/coupon/send',//批量发优惠券
  'userCoupon':_host + '/api/coupon/usrCoupon',//粉丝优惠券信息
  'shopQry':_host + '/api/mch/shopQry',//店铺信息
  'userInfo':_host +'/user/userInf',//商户信息
  'areaQry':_host +'/api/mch/areaQry',//小区配送地址
  'shopAdd':_host +'/api/mch/shopAdd',//新增店铺
  'shopMod':_host +'/api/mch/shopMod',//修改店铺
  'goodsAdd':_host +'/api/mch/goodsAdd',//新增商品
  'goodsQry':_host +'/api/mch/goodsQry',//商品信息查询
  'goodsMod':_host +'/api/mch/goodsMod',//修改商品信息
  'orderTj':_host +'/api/mch/orderTj',//交易统计
  'toSVipPay':_host +'/api/mch/toSVipPay',//微信SDK参数
  'pay':_host +'/api/mch/pay',//扫码下单
  'accountCheck':_host +'/api/mch/accountCheck',//每日对账
  'scardOrderDtl':_host +'/api/mch/scardOrderDtl',//下单信息查询
};
export {httpUrl}

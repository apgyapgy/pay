//环境
let localhostDev = true;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
let _host= localhostDev ? 'https://dswx-test.fuiou.com/o2o-mch/' : 'https://o2omch.fuiou.com/';
let _imgHost ='https://static.fuiou.com/';
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
  //图片域名
  'imgHost': _imgHost,
  //公共参数
  'com_params': _comparams,//客户端类型：0苹果IOS、1安卓Android、2微信公众号、3微信小程序
  //各接口名称
  'login': _host + '/user/bind',//登录
  'home': _host + '/user/home_open',//首页
  'coupon': _host + '/api/coupon/qry',//优惠券
  'couponAdd': _host + '/api/coupon/add',//新增优惠券
  'couponUpdate': _host + '/api/coupon/upd',//修改优惠券
  'couponDetail': _host + 'api/coupon/dtl',//优惠券详情,
  'couponManage':_host+'api/mch/order/qry',//优惠券管理
  'orderDetail':_host+'api/mch/order/detail',//订单详情
  'smsRefund':_host+'api/sms/refund',//发送验证码
  'orderRefund':_host+'api/mch/order/refund',//退款
  'paySearch':_host+'api/mch/pay_amt_st',//查询数据
  'phoneCode':_host+'api/sms/reset_pwd',//发送手机验证码
	'resetPwd':_host+'user/reset_pwd',
  'fansManage': _host + '/api/mch/cust_load',//粉丝管理
  'fansQuery': _host + '/api/mch/cust_qry',//粉丝查询
  'sendCoupon': _host + '/api/coupon/send',//批量发优惠券
  'userCoupon': _host + '/api/coupon/usrCoupon',//粉丝优惠券信息
};
export {httpUrl}

<template>
	<div class="user">
		<div class="login-panel">
		    <p class="photo">
		        <img class="mchLogo" :src="mchLogo">
		    </p>
        <div class="login-span fl">
          <router-link to="/shop" class="weui-cell_access link_a" name='list'>
            <label>商铺管理</label>
            <span class="weui-cell__ft"></span>
          </router-link>
        </div>
		    <!--<div class="login-span fl">-->
		        <!--<router-link to="userInfo" class="weui-cell_access link_a" name='list'>-->
		            <!--<label id="mchNm">{{mchNm}}</label>-->
		            <!--<span class="weui-cell__ft"></span>-->
		        <!--</router-link>-->
		    <!--</div>-->
		    <div class="login-span fl">
		        <router-link :to="{path: 'userPwd',query:{mobile:loginId}}" class="weui-cell_access link_a" name='list'>
		            <label class="fl">修改密码</label>
		            <div class="fr"><span class="weui-cell__ft" style="margin-right: 15px"></span></div>
		        </router-link>
		    </div>
		    <p class="login-btn">
		        <router-link to="/index" class="weui-btn weui-btn_primary">返回首页</router-link>
		    </p>
		</div>
	</div>
</template>
<script>
	import {httpUrl} from '../../assets/js/http_url';
	export default{
		data(){
			return {
				mchLogo:'https://static.fuiou.com/sys/ds/o2oh5/mch/static/images/user2.png',
				mchNm:'',
				loginId:'',
			}
		},
		methods:{
			initData:function(){
				var params = {};
			    this.$http.jsonp(httpUrl.home, {
			    	params: Object.assign(params, httpUrl.com_params)
			    }).then((response) => {
			    	console.log(response);
			        if(response.data.code==200){
			          	if(response.data.data){
				            this.mchNm = response.data.data.mchNm;
				            this.loginId = response.data.data.loginId;
				            if(response.data.data.mchLogo){
                      			this.mchLogo = httpUrl.imgHost + response.data.data.mchLogo;
                			}
				            console.log(this.mchNm)
			          	}
			        }else {
			          	$.alert(response.data.desc);
			        }
			    }, (response) => {
			        console.log('响应失败：'+response);
			    });
			}
		},
		mounted(){
			this.initData();
		}
	}
</script>

<style scoped>
  .mchLogo{
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: 1px solid #eeeeee;
  }
  .link_a{
    position: absolute;
    right: 15px;
    width: 100%;
    padding-left: 30px;
  }
</style>

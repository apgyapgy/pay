<template>
	<div class="user-pwd">
		<div class="pwd-panel">
		    <p class="photo">
		        <!--<img id="mchLogo" src="images/user2.png" style="width: 100px; height: 100px; border-radius: 100%;">-->
		    </p>
		    <div>
		        <span class="block pwd-span">
		            <input v-model="mobile" id="loginId" class="mobile-input font14" placeholder="请输入手机号" type="tel" maxlength="11">
		            <a @click="sendNumber" id="getNumber"  class="fr pwd-yzm weui-btn weui-btn_mini weui-btn_primary">获取验证码</a>
		        </span>
		        <span class="block pwd-span">
		            <input v-model="code" id="code" class="pwd-input font14" placeholder="请输入验证码" type="tel">
		        </span>
		        <span class="block pwd-span">
		            <input v-model="newPwd" id="newPwd" class="pwd-input font14" placeholder="请输入新密码" type="password">
		        </span>
		        <span class="block pwd-span">
		            <input v-model="newPwdRepeat" id="newPwd2" class="pwd-input font14" placeholder="请确认新密码" type="password">
		        </span>
		        <p class="login-btn">
		            <a @click="resetPwd" id="resetPwd" class="weui-btn weui-btn_primary">提交</a>
		        </p>
		    </div>
		</div>
	</div>
</template>
<script>
    $(function() {
        FastClick.attach(document.body);
    });
</script>
<script>
	import {httpUrl} from '../../assets/js/http_url.js';
	export default{
		data(){
			return{
				mobile:'',//用户名即手机号
				newPwd:'',//新密码
				newPwdRepeat:'',//确认密码
				code:'',//验证码
				loginPwdOld:''//旧密码
			}
		},
		methods:{
			sendNumber:function() {
		        if(!this.mobile){
		        	$.alert("请输入手机号");
		        }else{
		        	this.$http.jsonp(httpUrl.phoneCode,{
			        	params:{loginId:this.mobile}
			        }).then((response)=>{
			        	if(response.data.code != 200){
			        		$.alert(response.data.desc);
			        	}
			        },(response)=>{});
		        }
		    },
		    resetPwd:function(){
		    	if(!this.code || !this.newPwd || !this.newPwdRepeat){
		    		$.alert("请填写验证码和密码");
		    	}else{
		    		if(this.newPwd == this.newPwdRepeat){
		    			this.$http.jsonp(httpUrl.resetPwd,{
		    				params:{
		    					loginId:this.mobile,
		    					loginPwdOld:this.loginPwdOld,
		    					loginPwd:this.newPwd,
		    					code:this.code
		    				}
		    			}).then((response)=>{
		    				if(response.data.code!=200){
		    					$.alert(response.data.desc);
		    				}else{
		    					$.alert('密码修改成功',function () {
		    						this.$route.push({ path:'/userLogin',query: {_PO2OMCHWXOPENID_:sessionStorage.getItem('openId')}})
	                                //window.location.href ='userLogin.html?_PO2OMCHWXOPENID_='+sessionStorage.getItem('openId');
	                            });
		    				}
		    			},(response)=>{})
		            }else{
		                $.alert('两次输入密码不一致');
		            }
		    	}
		    }
		},
		created(){
			if(this.$route.query.mobile){
				this.mobile = this.$route.query.mobile;
			}
		}
	}
</script>

<style>
</style>
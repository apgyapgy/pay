<template>
	<div class="qr-code">
		<div class="qrCode">您的二维码尚未绑定激活，请绑定后使用</div>
		<div class="qrCode-panel">
		    <div>二维码编号：<label id="qrCodeNm">{{qrId}}</label></div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				qrId:''
			}
		},
		created(){
			console.log(this.$route.query)
			if(this.$route.query.qrId){
				this.qrId = this.$route.query.qrId;
			}
		}
	}
</script>

<style>
</style>
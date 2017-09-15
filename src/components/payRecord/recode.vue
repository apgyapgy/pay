<template>
	<div class="pay-recode">
		<div class="main-panel record-pannel">
		    <div class="record-date">
		        <label> 开始日期：</label>
		        <input id="dateStart" ref="starttime" class="record-time font14" type="text" placeholder="开始日期" readonly>
		    </div>
		    <div class="record-date">
		        <label> 结束日期：</label>
		        <input id="dateEnd" ref="endtime" class="record-time font14" type="text" placeholder="结束日期" readonly>
		    </div>
		    <div class="record-date">
		        <a @click="recordData" id="getRecord" href="javascript:;" class="weui-btn weui-btn_primary">查询</a>
		        <p class="line40 txtCenter blue font14">最多查询30天数据</p>
		    </div>
		</div>
		<div id="payRecord">
		    <div v-for="item in datas" class="weui-cells font14" name="payRecord">
		        <div class="weui-cell weui-cell_access line24">
		            <div class="weui-cell__bd weui-cell_primary">
		                <p>{{getFormatData(item.settleDt.toString())}}</p>
		            </div>
		            <div class="weui-cell__hd font16"><b>¥ {{item.payAmtYuan}}</b></div>
		        </div>
		        <div class="weui-form-preview">
		            <div class="weui-form-preview__bd">
		                <!--<div class="weui-form-preview__item">
		                    <label class="weui-form-preview__label">账号</label>
		                    <span class="weui-form-preview__value">{{item.mchNm}}</span>
		                </div>-->
		                <div class="weui-form-preview__item">
		                    <label class="weui-form-preview__label">账户</label>
		                    <span class="weui-form-preview__value">{{item.mchNm}}</span>
		                </div>
		                <div class="weui-form-preview__item">
		                    <label class="weui-form-preview__label">划款状态</label>
		                    <span class="weui-form-preview__value blue">{{item.payStDesc}}</span>
		                </div>
		            </div>
		        </div>
		    </div>
		</div>
		<div :class="{hide:!datas.length}" id="dataTip" class="weui-panel">
		    <div class="weui-loadmore weui-loadmore_line">
		        <span class="weui-loadmore__tips">暂无数据</span>
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
	import {publicJs} from '../../assets/js/public.js'
	//import common from '../../assets/js/common.js';
	export default{
		data(){
			return{
				date_default:[],
				maxDate:publicJs.getCurrentDate(),
				minDate:publicJs.getBeforeDate(30),
				dateStart:'',
				dateEnd:'',
				datas:[]
			}
		},
		methods:{
			drawRecord:function(data){
				console.log("data:",data);
				this.datas = data.data.datas;
		    },
		    recordData:function(){//查询数据
		    	var dateStart = this.$refs.starttime.value;
		    	var dateEnd = this.$refs.endtime.value;
		    	var bool = publicJs.checkDate(dateStart,dateEnd,function () {
		            $('#payRecord').html('');
		            $('#dataTip').addClass('hide');
		            $.alert('开始日期不能大于结束日期');
		        });
		        if(bool){
		            dateStart = dateStart.replace(/-/g,"");
		            dateEnd = dateEnd.replace(/-/g,"");
		            var _params = {
		            	dateStart:dateStart,
		            	dateEnd:dateEnd
		            };
		            this.$http.jsonp(httpUrl.paySearch,{
		            	params:_params
		            }).then((response)=>{
		            	var _res = response.body;
		            	if(_res.code != 200){
		            		$.alert(_res.desc);
		            	}else{
		            		this.drawRecord(_res);
		            	}
		            },(response)=>{});
		        }
		    },
		    getFormatData:function(time){
		    	var strDate = time.replace(/^(\d{4})(\d{2})(\d{2})$/,"$1-$2-$3"); //精确到日
  				return strDate;
		    }
		},
    beforeRouteLeave (to, from, next) {
      $('.record-time').calendar("close");  //关闭弹窗
      $.closeModal();
      next();
    },
		mounted:function(){
			//this.date_default.push(this.maxDate);
			$(this.$refs.starttime).calendar({
		        value: this.date_default,
		        dateFormat: 'yyyy-mm-dd',
		        // 自定义格式的时候，不能通过 input 的value属性赋值 '2016年12月12日' 来定义初始值，这样会导致无法解析初始值而报错。
		        // 只能通过js中设置 value 的形式来赋值，并且需要按标准形式赋值（yyyy-mm-dd 或者时间戳)
		        minDate:this.minDate,
		        maxDate:this.maxDate,
		    });
		    $(this.$refs.endtime).calendar({
		        value: this.date_default,
		        dateFormat: 'yyyy-mm-dd',
		        // 自定义格式的时候，不能通过 input 的value属性赋值 '2016年12月12日' 来定义初始值，这样会导致无法解析初始值而报错。
		        // 只能通过js中设置 value 的形式来赋值，并且需要按标准形式赋值（yyyy-mm-dd 或者时间戳)
		        minDate:this.minDate,
		        maxDate:this.maxDate,
		    });
		}
	}
</script>

<style scoped>
</style>

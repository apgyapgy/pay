<template>
  <div id="productDtl">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <label class="red"> 以下信息都必填</label>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">商品名称</label></div>
          <div class="weui-cell__bd">
            <!--<div contenteditable="true"></div>-->
            <textarea cols="2" name="goodsNm" maxlength="20" id="goodsNm" v-model="goodsNm" class="weui-input" style="height: auto; min-height: 24px;" type="text" placeholder="最多输入20字,只能输入中英文或数字" @blur="checkName">

            </textarea>
            <!--<input name="goodsNm" maxlength="20" id="goodsNm" v-model="goodsNm" class="weui-input hide" type="text" placeholder="填写">-->
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">商品类型</label></div>
          <div class="weui-cell__bd">
            <!--<input name="0" class="weui-input" type="text"/>-->
            <input id="picker1" class="weui-input" type="text" placeholder="请选择">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">商品状态</label></div>
          <div class="weui-cell__bd">
            <!--<input name="0" class="weui-input" type="text"/>-->
            <input id="picker2" class="weui-input" type="text" placeholder="请选择">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">售价 <small class="gray">(元)</small></label></div>
          <div class="weui-cell__bd">
            <input name="goodsAmt" v-model="goodsAmt" class="weui-input" type="number" placeholder="填写" @blur="getAmt">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">库存</label></div>
          <div class="weui-cell__bd">
            <input name="goodsNumTotal" v-model="goodsNumTotal" class="weui-input" type="number" placeholder="填写" @blur="getGoodNum">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">商品图片</label></div>
          <div class="weui-cell__bd">
            <small class="gray">不能大于1.5MB，点击图片可修改</small>
            <!--<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary">上传图片</a>-->
          </div>
        </div>
      </div>
      <div class="wrapper">
        <div class="file-wrapper">
          <input id="fileControl" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" class="file-control">
        </div>
      </div>
      <div class="bottom">
        <button class="weui-btn weui-btn_primary" type="button" @click="goodsSubmit">提交</button>
        <router-link :to="{path:'productManage'}" class="weui-btn weui-btn_default" type="button">返回</router-link>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {httpUrl} from '../../assets/js/http_url';
  import {publicJs} from '../../assets/js/public';
  import {importImage} from '../../assets/js/compressImage';
  export default {
    name: 'productDtl',
    data () {
      return {
        uploadCount:0,
        type:'',
        imgList:[],
        size: 0,
        shopId:'',
        proItems:'',
        goodsNo:'',
        goodsNm:'',
        goodsAmt:'',
        goodsTp:'',
        goodsSt:'',
        goodsNumTotal:'',
        goodsImgLogo:'',
      }
    },
    watch:{
      goodsAmt:function (value) {
        if(value){
          value = value.toString();
          value = value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
          if(value.indexOf(".")>=0){
            value = value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
          }
          value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
          value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
          if(value.indexOf(".")< 0 && value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            value= parseFloat(value);
          }
          this.goodsAmt = value;
        }
      },
    },
    methods: {
      checkName(){
        //正则表达式
        var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$");
        //判断输入框中有内容
        if(!reg.test(this.goodsNm))
        {
          $.alert("商品名称只能输入中英文或数字");
          //输入非法字符，清空输入框
          this.goodsNm ='';
        }
      },
      getAmt(){
        if(this.goodsAmt<=0||!this.goodsAmt){
          $.alert('售价必填，且不能小于0');
        }
      },
      getGoodNum(){
        let value = this.goodsNumTotal;
        if(value){
          var reg = /^\+?[1-9]\d*$/;
          if(!reg.test(value)){
            this.goodsNumTotal = '';
            $.alert("库存必填，且只能为大于0的整数");
          }else{
            if(value.length>4){
              value = value.substring(0,4);
            }
            this.goodsNumTotal = value;
          }
        }
      },
      initShop:function() {
        var params={};
        this.$http.jsonp(httpUrl.shopQry, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          if(response.data.code==200){
            if(response.data.data.datas[0]){
              this.shopId = response.data.data.datas[0].shopId;
              if(this.$route.query.type=='edit'){
                this.getProductInfo();
              }
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
      //获取商品状态
      getProTP:function (type) {//0待上架,1上架,2下架
        if(type==0){return '待上架'}
        if(type==1){return '上架'}
        if(type==2){return '下架'}
      },
      getProTPStr:function (type) {//0待上架,1上架,2下架
        if(type=='待上架'){return 0}
        if(type=='上架'){return 1}
        if(type=='下架'){return 2}
      },
      getGoodsTp:function (type) {//0生鲜类,1饮品类,2果蔬类,3日用品类,4零食类
        if(type==0){return '生鲜类'}
        if(type==1){return '饮品类'}
        if(type==2){return '果蔬类'}
        if(type==3){return '日用品类'}
        if(type==4){return '零食类'}
      },
      getGoodsTpStr:function (type) {//0生鲜类,1饮品类,2果蔬类,3日用品类,4零食类
        if(type=='生鲜类'){return 0}
        if(type=='饮品类'){return 1}
        if(type=='果蔬类'){return 2}
        if(type=='日用品类'){return 3}
        if(type=='零食类'){return 4}
      },
      //初始商品信息
      getProductInfo:function () {
        let params = {
          shopId:this.shopId,
          goodsNo:this.goodsNo
        };
        this.$http.jsonp(httpUrl.goodsQry, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          if(response.data.code==200){
            //$.alert("添加成功");
            //this.proItems = response.data.data.datas;
            this.goodsNm = response.data.data.datas[0].goodsNm;
            //$('#goodsNm').attr('readonly','readonly').addClass('gray');
            this.goodsTp = response.data.data.datas[0].goodsTp;
            this.goodsSt = response.data.data.datas[0].goodsSt;
            $('#picker1').val(this.getGoodsTp(this.goodsTp));
            //$('#picker1').val(this.getGoodsTp(this.goodsTp)).attr('readonly','readonly').addClass('gray');
            $('#picker2').val(this.getProTP(this.goodsSt));
            this.goodsAmt = response.data.data.datas[0].goodsAmt/100;
            this.goodsNumTotal = response.data.data.datas[0].goodsNumTotal;
            if(response.data.data.datas[0].goodsImgLogo){
              this.goodsImgLogo = httpUrl.imgHost+response.data.data.datas[0].goodsImgLogo;
              console.log('商品图1'+this.goodsImgLogo);
              $('.file-wrapper').css('background-image','url('+this.goodsImgLogo+')');
            }
            //this.imgList.push({"file":{"src":this.goodsImgLogo,"size":0,"name":" "}});
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
      //提交商品信息
      goodsSubmit:function () {
        console.log('表单');
        let src = $('.file-wrapper').css('background-Image').replace('url(','').replace(')','').replace('"',''),http_url='';
        if(src.indexOf('upload.png') < 0){//不包含
          if(src.indexOf('https://staticds.fuiou.com/') >= 0){//包含
            src = src.replace('https://staticds.fuiou.com/','');
            this.goodsImgLogo = src;
          }else{
            //src = src.replace('url("','').replace('")','').replace('"','');
            //this.goodsImgLogo = src.substring(0,src.length-1)
            this.goodsImgLogo = src
          }
        }else{
          this.goodsImgLogo = '';
        }
        //alert('上传的图片:'+this.goodsImgLogo);
        //产品类型 生鲜', '饮品类', '果蔬类', '日用品类', '零食类
        let proTpe = $('#picker1').val();
        if(proTpe=="生鲜类"){this.goodsTp = 0;$('#picker1').attr('name',0)}
        if(proTpe=="饮品类"){this.goodsTp = 1;$('#picker1').attr('name',1)}
        if(proTpe=="果蔬类"){this.goodsTp = 2;$('#picker1').attr('name',2)}
        if(proTpe=="日用品类"){this.goodsTp = 3;$('#picker1').attr('name',3)}
        if(proTpe=="零食类"){this.goodsTp = 4;$('#picker1').attr('name',4)}
        //产品状态
        let proSate = $('#picker2').val();
        if(proSate=="待上架"){this.goodsSt = 0;$('#picker2').attr('name',0)}
        if(proSate=="上架"){this.goodsSt = 1;$('#picker2').attr('name',1)}
        if(proSate=="下架"){this.goodsSt = 2;$('#picker2').attr('name',2)}
        //信息是否填写完整
        if(!this.goodsNm){
          $.alert("请填写商品名称");
          return
        }
        if(!proTpe){
          $.alert("请选择商品类型");
          return
        }
        if(!proSate){
          $.alert("请选择商品状态");
          return
        }
        if(this.goodsAmt<=0||!this.goodsAmt){
          $.alert('请填写售价，且不能小于0');
          return
        }
        if(this.goodsNumTotal<=0||!this.goodsNumTotal){
          $.alert('请填写库存，只能是大于0的整数');
          return
        }
        if(!this.goodsImgLogo){
          $.alert("请上传商品图片");
          return
        }
        var params = {
          shopId:this.shopId,
          goodsNo:this.goodsNo,
          goodsNm:encodeURIComponent(encodeURIComponent(this.goodsNm)),
          goodsTp:this.goodsTp,
          goodsSt:this.goodsSt,
          goodsAmt:publicJs.accMul(this.goodsAmt,100),
          goodsNumTotal:this.goodsNumTotal,
          goodsImgLogo:this.goodsImgLogo
        };
        if(this.type=='add'){
          http_url = httpUrl.goodsAdd;
        }else{
          http_url = httpUrl.goodsMod;
        }
        //提交
        var that = this;
        $.confirm("是否立即提交?", "提示", function() {
          console.log('我要提交啦');
          that.$http.post(http_url,params,{emulateJSON: true})
            .then((data)=>{
                let res = data.body;
                console.log('响应数据'+JSON.stringify(res));
                if(res.code==200){
                  console.log('成功');
                  $.alert('提交成功',function () {
                    that.$router.push({ name: 'productManage'});
                  });
                }
                if(res.code==40110){
                  $.alert(res.desc,function () {
                    window.location.href = httpUrl.hrefUrl;
                  });
                }
                if(res.code!=200 && res.code!=40110){
                  $.alert(res.desc);
                }
              },
              (error)=>{
                console.log(error);
              }
            );
        }, function() {
          //取消操作
        });
      }
    },
    beforeRouteLeave (to, from, next) {
      $.closePicker();
      $.closeModal();
      document.activeElement.blur();
      next();
    },
    mounted(){
      this.initShop();//获取店铺ID
      importImage('fileControl');
      this.type = this.$route.query.type;
      if(this.type=='add'){
        publicJs.updateTitle('添加商品');
      }
      else {
        publicJs.updateTitle('编辑商品');
        this.goodsNo = this.$route.query.goodsNo;
      }
      this.$nextTick(function () {
        //if(this.type=='add'){
          $("#picker1").picker({
            title: "商品类型",
            cols: [
              {
                textAlign: 'center',
                values: ['生鲜类', '饮品类', '果蔬类', '日用品类', '零食类']
              }
            ]
          });
        //}
        $("#picker2").picker({
          title: "商品状态",
          cols: [
            {
              textAlign: 'center',
              values: ['待上架', '上架', '下架']
            }
          ]
        });
      })
    }
  }
</script>

<style scoped >
  .upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }
  .upload_warp_left img {
    margin-top: 32px;
  }

  .upload_warp_con img {
    width: 50px;
    margin: 15px 25px;
  }

  .bottom{
    margin: 15px 15px 30px 15px;
  }
  .weui-cells{
    margin-top: 10px;
  }


  .file-wrapper {
    position: relative;
    left: 125px;
    margin: 15px 0;
    height: 100px;
    width: 100px;
    border: 1px solid #dedede;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-size: cover;
    -webkit-border-radius: 5%;
    border-radius: 5%;
    overflow: hidden;
    background-image: url("https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/upload.png");
    background-position: center;
    background-repeat: no-repeat;
    background-color: #FFFFFF;
    background-size: auto 100%;
  }


  .file-wrapper.has-image:after,.file-wrapper.has-image:before {
    content: normal
  }

  .file-wrapper .file-control {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0
  }

</style>

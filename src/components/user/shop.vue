<template>
  <div id="shop">
    <div class="photo">
      <img v-show="mchLogo" class="mchLogo" :src="mchLogo">
      <div v-show="!mchLogo" class="upload">
        <div class="wrapper">
          <div class="file-wrapper">
            <input id="fileControl" type="file" accept="image/*" class="file-control">
          </div>
          <div>店铺LOGO<small>(不大于1.5M)</small></div>
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_form">
      <div v-show="exit" class="weui-cell weui-cell_switch"  style="height: 56px">
        <div class="weui-cell__bd">是否开启店铺</div>
        <div class="weui-cell__ft">
          <label for="switchCP" class="weui-switch-cp">
            <input id="switchCP" class="weui-switch-cp__input" type="checkbox" @change="switchCP">
            <div class="weui-switch-cp__box"></div>
          </label>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">店铺名称</label></div>
        <div class="weui-cell__bd">
          <label class="gray">{{shopNm}}</label>
          <!--<input v-model="shopNm" class="weui-input gray" type="text" placeholder="店铺名称" readonly>-->
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">店铺地址</label></div>
        <div class="weui-cell__bd">
          <label class="gray">{{shopAddr}}</label>
          <!--<input v-else v-model="shopAddr" class="weui-input gray" type="text" placeholder="店铺地址" readonly>-->
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">联系电话</label></div>
        <div class="weui-cell__bd">
          <label class="gray">{{shopContract}}</label>
          <!--<input v-model="shopContract" class="weui-input gray" type="tel" placeholder="联系电话" readonly>-->
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">起送价<small class="gray">(元)</small></label></div>
        <div class="weui-cell__bd">
          <input v-model="distAmtMin" class="weui-input" type="number" min="0" placeholder="起送价">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">运费<small class="gray">(元)</small></label></div>
        <div class="weui-cell__bd">
          <input v-model="distAmt" class="weui-input" type="number" min="0" placeholder="运费">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">配送范围</label></div>
        <div class="weui-cell__bd">
          <input id="distRange" v-model="distRange" maxlength="2" min="1" max="30" style="width: 40px" placeholder="填写" class="weui-input" type="number" @blur="getDistRange(distRange)">公里 <small class="grayDistRange">(1km-30km)</small>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">配送时间</label></div>
        <div class="weui-cell__bd">
          <input v-model="distStartTs" style="width: 50px" class="weui-input" type="datetime" readonly>
          <!--<input v-model="distStartTs" style="width: 22px" class="weui-input" type="datetime" placeholder="30">-->
          <span class="gray">至</span>
          <input v-model="distEndTs" style="width: 50px" class="weui-input" type="datetime" readonly>
          <!--<input v-model="distEndTs" style="width: 22px" class="weui-input" type="datetime" placeholder="00">-->
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">配送小区</label></div>
        <div class="weui-cell__hd gray" v-show="areaItem.length==0">该范围内暂无收件宝快递柜</div>
        <!--<div class="weui-cell__bd" v-show="areaItem.length>0">-->
          <!--<label for="switchCP" class="weui-switch-cp fl" style="height: 20px" @change="switchAll">-->
            <!--<input id="switchCP" class="weui-switch-cp__input" type="checkbox" style="height: 20px">-->
            <!--<div class="weui-switch-cp__box"></div>-->
          <!--</label>-->
          <!--<span class="fl" style="margin-left: 5px">全部选择</span>-->
        <!--</div>-->
        <!--<input v-show="areaItem.length>0" type='checkbox' class='input-checkbox'>全选-->
      </div>
      <div>
        <div class="weui-cells_checkbox" v-for="(item,index) in areaItem">
          <label class="weui-cell weui-check__label" @click="selArea($event)" :cellCd="item.cellCd" :hostId="item.hostId">
            <!--<div class="weui-cell__hd">-->
              <!--<input v-show="!exit" type="checkbox" checked class="weui-check" @change="selArea($event)" :cellCd="item.cellCd" :hostId="item.hostId">-->
              <!--<input :id="index" v-show="exit" type="checkbox" :checked="item.isSelected==1?'checked':''" class="weui-check" @click.prevent="selArea($event,index)" :cellCd="item.cellCd" :hostId="item.hostId">-->
              <!--<i class="weui-icon-checked"></i>-->
              <!--<input :id="index" v-show="exit" type="checkbox" :value="item.isSelected==1?'checked':''" class="weui-check" @click.prevent="selArea($event,index)" :cellCd="item.cellCd" :hostId="item.hostId">-->
              <i :class="{'weui-icon-success':item.isSelected==1,'weui-icon-circle':item.isSelected=='0'}"  :cellCd="item.cellCd" :hostId="item.hostId"></i>

            <!--</div>-->
            <div class="weui-cell__bd">
              <p>{{item.areaNm}}</p>
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="empty"></div>
    <div class="bottom">
      <a v-show="!exit" @click="submitShop(0)" href="javascript:;" class="weui-btn weui-btn_primary">开通店铺</a>
      <a v-show="exit" @click="submitShop(1)" href="javascript:;" class="weui-btn weui-btn_primary">保存修改</a>
      <!--<a v-show="exit" @click="submitShop(2)" href="javascript:;" class="weui-btn weui-btn_primary">关闭店铺</a>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {httpUrl} from '../../assets/js/http_url';
  import {publicJs} from '../../assets/js/public';
  import {importImage} from '../../assets/js/compressImage';
  export default{
    name: 'shop',
    data(){
      return {
        imgList: [],
        size: 0,
        mchId:'',
        mchLogo:'',
        shopId:'0',
        shopLogo:'',
        shopNm:'',
        shopAddr:'',
        shopContract:'',
        distAmtMin:'0.00',
        distAmt:'0.00',
        distRange:'1',
        distStartTs:'17:30',
        distEndTs:'18:00',
        areaItem:[],
        hostIdStr: '',
        shopHosts:'',
        exit:true,
        selectAll:false,
        shopSt:'',
      }
    },
    watch:{
      distAmtMin:function (value) {//起送价
        if(value){
          value = value.toString();
          value = value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
          value = value.replace(/^\./g,""); //必须保证第一个为数字而不是.
          if(value.indexOf(".")>=0){
            value = value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
          }
          value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
          if(value.indexOf(".")< 0 && value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            value= parseFloat(value);
          }
          console.log('起送价'+value);
          this.distAmtMin = value;
        }

      },
      distAmt:function (value) {//运费
        if(value){
          value = value.toString();
          console.log('运费'+value);
          if(value.indexOf(".")>=0){//包含
            value = value.substring(0,value.indexOf(".")+3);
          }
          this.distAmt = value;
        }
      },
      areaItem:function (val) {
        if(val==''){
          $('.weui-btn').addClass('weui-btn_disabled');
        }else{
          $('.weui-btn').removeClass('weui-btn_disabled');
        }
      }
    },
    methods:{
      switchCP(){
        if(this.shopSt==1){
          this.submitShop(2);//关闭店铺
        }
        if(this.shopSt==10){
          this.submitShop(3);//开启店铺
        }
      },
//      //全选
//      switchAll:function () {
//        if($('switchCP').attr('checked')=='checked'){
//          $('switchCP').removeAttr('checked');
//          this.selectAll = false;
//        }else{
//          $('switchCP').attr('checked','checked');
//          this.selectAll = true;
//        }
//      },
      getDistRange(val){
        if(val){
          var preg =/^([12][0-9]|30|[1-9])$/; //1到30的表达式
          if(!preg.exec(val) || val>30 || val <1) {
            $.alert('配送范围最大30公里,至少1公里',function () {
              $('#distRange').val(1);
              this.distRange = 1;
            });
            return false;
          }else{
            //alert(this.distRange);
            this.getVillage();
          }
        }
      },
      //上传图片
      fileClick(){
        document.getElementById('upload_file').click()
      },
      fileChange(el){
        if (!el.target.files[0].size) return;
        this.fileList(el.target.files);
        el.target.value = ''
      },
      fileList(files){
        for (let i = 0; i < files.length; i++) {
          this.fileAdd(files[i]);
        }
      },
      fileAdd(file){
        this.size = this.size + file.size;//总大小
        let reader = new FileReader();
        reader.vue = this;
        reader.readAsDataURL(file);
        reader.onload = function () {
          file.src = this.result;
          this.vue.imgList.push({
            file
          });
        }
      },
      fileDel(index){
        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
      },
      bytesToSize(bytes){
        if (bytes === 0) return '0 B';
        let k = 1000, // or 1024
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      dragenter(el){
        el.stopPropagation();
        el.preventDefault();
      },
      dragover(el){
        el.stopPropagation();
        el.preventDefault();
      },
      drop(el){
        el.stopPropagation();
        el.preventDefault();
        this.fileList(el.dataTransfer.files);
      },
      //选择小区
      selArea:function (e) {
        //console.log('选择前'+e.currentTarget.firstChild.className);
        if(e.currentTarget.firstChild.className=='weui-icon-success'){
          e.currentTarget.firstChild.className ='weui-icon-circle';
        }else{
          e.currentTarget.firstChild.className = 'weui-icon-success';
        }
        //console.log('选择后'+e.currentTarget.firstChild.className);
      },
      //开通店铺或者修改店铺或关闭店铺
      submitShop:function (type) {
        if(type==2){//关闭店铺
          var params = {
            shopId:this.shopId,
            shopSt:10
          }
          var that = this;
          that.$http.post(httpUrl.shopMod,params,{emulateJSON: true})
            .then((data)=>{
                let res = data.body;
                console.log('响应数据'+JSON.stringify(res));
                if(res.code==200){
                  this.shopSt=10;
                  $('.bottom').hide();
                  $.confirm("是否立即返回?", "关闭店铺成功", function() {
                    that.$router.push({ path: '/user'});
                  }, function() {
                    //取消操作
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
          return;
        }
        if(type==3){//开启店铺
          var params = {
            shopId:this.shopId,
            shopSt:1
          }
          var that = this;
          that.$http.post(httpUrl.shopMod,params,{emulateJSON: true})
            .then((data)=>{
                let res = data.body;
                console.log('响应数据'+JSON.stringify(res));
                if(res.code==200){
                  this.shopSt=1;
                  $('.bottom').show();
                  $.confirm("是否立即返回?", "开启店铺成功", function() {
                    that.$router.push({ path: '/user'});
                  }, function() {
                    //取消操作
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
          return;
        }
        if(this.areaItem.length==0){
          return
        }
        let str='';
        $('.weui-icon-success').each(function(){
            let cellCd = $(this).attr('cellCd');
            let hostId = $(this).attr('hostId');
            str += cellCd+','+hostId+";";
            console.log('str小区'+str);
        });
        this.hostIdStr = str.substring(0,str.length-1);
        console.log('小区：'+this.hostIdStr);
        if(!this.hostIdStr){
          $.alert('请选择小区');
          return
        }
        if(this.mchLogo){
          this.shopLogo = this.mchLogo.replace('https://staticds.fuiou.com/','');
        }else{
          let src = $('.file-wrapper').css('background-Image').replace('url(','').replace(')','').replace('"','');
          if(src.indexOf('upload.png') < 0){//不包含
            if(src.indexOf('https://staticds.fuiou.com/') >= 0){//包含
              src = src.replace('https://staticds.fuiou.com/','');
              this.shopLogo = src;
            }else{
              this.shopLogo = src;
            }
          }else{
            //$.alert('请上传店铺LOGO');
            //return
          }
        }
        var params = {
          shopId:this.shopId,
          shopLogo:this.shopLogo,
          mchId:this.mchId,
          shopNm:encodeURIComponent(encodeURIComponent(this.shopNm)),
          shopAddr:encodeURIComponent(encodeURIComponent(this.shopAddr)),
          shopContract:this.shopContract,
          distAmtMin:this.distAmtMin*100,
          distAmt:this.distAmt*100,
          distRange:this.distRange*1000,
          distStartTs:this.distStartTs,
          distEndTs:this.distEndTs,
          hostIdStr:JSON.stringify(this.hostIdStr),
        };
        let httpReq = '';
        if(type==0){//开通店铺
          httpReq = httpUrl.shopAdd;
        }else{//修改店铺
          httpReq = httpUrl.shopMod;
        }
        var that = this;
        console.log('httpReq：'+httpReq);
        that.$http.post(httpReq,params,{emulateJSON: true})
          .then((data)=>{
              let res = data.body;
              console.log('响应数据'+JSON.stringify(res));
              if(res.code==200){
                if(type==0){
                  $('开通成功',function () {
                    that.$router.push({ path: '/user'});
                  })
                }else{
                  $.confirm("是否立即返回?", "保存成功", function() {
                    that.$router.push({ path: '/user'});
                  }, function() {
                    //取消操作
                  });
                }
                return
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
      },
      //获取配送小区
      getVillage:function () {
        let params = {
          mchId:this.mchId,
          distRange:publicJs.accMul(this.distRange,1000),
        };
        this.$http.jsonp(httpUrl.areaQry, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          if(response.data.code==200){
            let that = this;
            if(response.data.data.datas[0]){
              that.areaItem = response.data.data.datas;
              console.log('this.areaItem的小区'+that.areaItem);
//              console.log('this.shopHosts的小区'+that.shopHosts);
//              if(that.shopHosts.length>0){//已选定的小区
//                for (var i = 0; i < that.areaItem.length; i++){
//                  var area = that.areaItem[i];
//                  for (var j = 0; j < that.shopHosts.length; j++){
//                    if(area.hostId==that.shopHosts[j].hostId){
//                      console.log('i='+i);
//                      that.areaItem[i].checked = 'checked';
//                      //console.log($('.weui-check').eq(i).attr('hostid'));
//                      //that.$refs.input.attr('checked','checked');
//                    }
//                  }
//                }
//              }

            }else{
              this.areaItem = [];
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
      //获取商户信息
      initUserInfo:function() {
        var params={};
        this.$http.jsonp(httpUrl.userInfo, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          if(response.data.code==200){
            if(response.data.data.data){
              if(response.data.data.data.mchLogo){
                this.mchLogo = httpUrl.imgHost+response.data.data.data.mchLogo;
              }
              this.shopNm = response.data.data.data.mchnt_shortname;
              this.shopAddr = response.data.data.data.contact_addr;
              this.shopContract = response.data.data.data.mobile;
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
      //初始店铺信息
      initShop:function() {
        var params={};
        this.$http.jsonp(httpUrl.shopQry, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          if(response.data.code==200){
            if(response.data.data.datas[0]){
              this.exit = true;
              if(response.data.data.datas[0].shopLogo){
                this.mchLogo = httpUrl.imgHost+response.data.data.datas[0].shopLogo;
              }
              this.shopId = response.data.data.datas[0].shopId;
              this.shopNm = response.data.data.datas[0].shopNm;
              this.shopAddr = response.data.data.datas[0].shopAddr;
              this.shopContract = response.data.data.datas[0].shopContract;
              this.distAmtMin = response.data.data.datas[0].distAmtMinYuan;
              this.distAmt = response.data.data.datas[0].distAmtYuan;
              this.distRange = response.data.data.datas[0].distRange/1000;
              this.shopHosts = response.data.data.datas[0].shopHosts;
              this.shopSt = response.data.data.datas[0].shopSt;
              if(this.shopSt==10){//店铺已关闭
                $('#switchCP').removeAttr('checked');
                $('.bottom').hide();
//                $('#switchCP').attr('checked','checked');
//                $('.bottom').hide();
              }
              if(this.shopSt==1){//店铺开启
                $('#switchCP').attr('checked','checked');
                $('.bottom').show();
//                $('#switchCP').removeAttr('checked');
//                $('.bottom').show();
              }
              this.getVillage();
            }else{
              this.exit = false;
              this.getVillage();
              this.initUserInfo();
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      }
    },
    mounted : function () {
      //记录mchid
      let mchId = this.$route.query.mchId;
      if(mchId){
        this.mchId = mchId;
      }else{
        let localData = localStorage.getItem("mchId");
        this.$store.commit("MCHID", localData);
        this.mchId = localData;
      }
      this.initShop();
      importImage('fileControl');
    }
  }
</script>

<style scoped >
  .bottom{
    width: 100%;
    background-color:rgba(255,255,255,0.5);
    position: fixed;
    bottom: 0;
    z-index: 1;
  }
  .bottom a{
    margin: 15px;
  }
  .weui-cells_checkbox{
    display: inline-block;
    /*display: flex; flex-wrap: wrap;*/
  }
  .weui-cells_checkbox .weui-cell::before{
    border-top: 0;
  }
  .photo{
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }
  .mchLogo{
    width: 100px;
    height: 100px;
    border-radius: 100%;
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
    background: #fff scroll no-repeat center center;
    background-size: cover;
    -webkit-border-radius: 5%;
    border-radius: 5%;
    overflow: hidden;
    background: url("https://staticds.fuiou.com/sys/ds/o2oh5/mch/static/images/upload.png") no-repeat center #FFFFFF;
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

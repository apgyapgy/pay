<template>
  <div>
    <!---未开通店铺--->
    <div v-if="!shopId">
      <p class="weui-loadmore__tips">您尚未开通店铺，立即<router-link class="blue" to="/shop">开通</router-link></p>
    </div>
    <!---已经开通店铺--->
    <div v-if="shopId">
      <div class="addProduct">
        <router-link :to="{path:'index'}" class="weui-btn weui-btn_default">返回首页</router-link>
        <router-link :to="{path:'productDtl', query:{type:'add'}}" class="weui-btn weui-btn_primary">+添加商品</router-link>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd line36">
          <span class="block font12">选择商品状态：</span>
          <div class="select-type">
            <div><i :class="proType==-1 ? 'weui-icon-success' : 'weui-icon-circle' " @click="changeProType(-1)"></i>全部</div>
            <div><i :class="proType==0 ? 'weui-icon-success' : 'weui-icon-circle' " @click="changeProType(0)"></i>待上架</div>
            <div><i :class="proType==1 ? 'weui-icon-success' : 'weui-icon-circle' " @click="changeProType(1)"></i>已上架</div>
            <div><i :class="proType==2 ? 'weui-icon-success' : 'weui-icon-circle' " @click="changeProType(2)"></i>已下架</div>
          </div>
        </div>
      </div>
      <div class="weui-search-bar" id="searchBar">
        <form class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <i class="weui-icon-search"></i>
            <input v-model="goodsNm" type="search" class="weui-search-bar__input" id="searchInput" placeholder="商品名称" required="">
            <a @click="cancelQry" href="javascript:" class="weui-icon-clear" id="searchClear"></a>
          </div>
          <label class="weui-search-bar__label" id="searchText">
            <i class="weui-icon-search"></i>
            <span>商品名称</span>
          </label>
        </form>
        <a @click="cancelQry" href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
      </div>
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd">
          <div to="/productDtl" class="weui-media-box weui-media-box_appmsg" v-for="item in proItems">
          <!--<router-link to="/productDtl" class="weui-media-box weui-media-box_appmsg" v-for="item in proItems">-->
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="getImgSrc(item.goodsImgLogo)">
            </div>
            <div class="weui-media-box__bd" style="flex: 2">
              <h4 class="weui-media-box__title">{{item.goodsNm}}</h4>
              <p class="weui-media-box__desc">剩余库存：{{item.goodsNum}}</p>
              <p class="red">¥ {{item.goodsAmtStr}}</p>
            </div>
            <div class="weui-media-box__bd">
              <label v-show="item.goodsSt==0" class="red font14">待上架</label>
              <label v-show="item.goodsSt==1" class="blue font14">已上架</label>
              <label v-show="item.goodsSt==2" class="gray font14">已下架</label>
            </div>
            <div class="productTp">
              <a v-show="item.goodsSt==2" :goodsNo="item.goodsNo" href="javascript:;" class="block weui-btn weui-btn_mini weui-btn_disabled weui-btn_default operateBtn">修改</a>
              <!--<label v-show="item.goodsSt==0" class="red font14">待上架</label>-->
              <!--<label v-show="item.goodsSt==1" class="blue font14">已上架</label>-->
              <!--<label v-show="item.goodsSt==2" class="gray font14">已下架</label>-->
              <a @click.stop.self="editProduct(item.goodsNo)" :goodsNo="item.goodsNo" v-show="item.goodsSt==0 || item.goodsSt==1" href="javascript:;" class="block weui-btn weui-btn_mini weui-btn_default operateBtn">修改</a>
              <!--<a @click.stop.self="deleteProduct(item.goodsNo)" :goodsNo="item.goodsNo" v-show="item.goodsSt==2" href="javascript:;" class="block weui-btn weui-btn_mini weui-btn_default operateBtn">删除</a>-->
            </div>
          <!--</router-link>-->
          </div>
        </div>
      </div>
    </div>
    <!--暂无数据-->
    <div class="weui-panel" v-show="proItems.length==0">
        <div class="weui-loadmore__tips">暂无数据</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {httpUrl} from '../../assets/js/http_url';
  import {publicJs} from '../../assets/js/public';
  import '../../assets/js/swiper.min.js';
  export default {
    name: 'index',
    data () {
      return {
        data:{},
        proType:-1,
        proItems:[],
        shopId:'',
        goodsNm:'',
        goodsSt:'',
      }
    },
    watch:{
      goodsNm:function (val) {
        if(val){
          setTimeout(this.getGoodsInfo(), 1000);
        }
      }
    },
    methods: {
      pushHistory(returnUrl) {
        var bool = true;
        window.addEventListener("popstate", function(e) {
          if(bool){
            console.log('监听浏览器返回事件');
            //alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
            bool = false;
            history.pushState(null,null,returnUrl);
            //window.location.href = returnUrl;//跳转地址
          }
        }, false);
      },
      getImgSrc:function (src) {
        return httpUrl.imgHost+src;
      },
      changeProType(type) {
        this.proType = type;
        this.getGoodsInfo();
      },
      cancelQry:function () {
        this.goodsNm = "";
        this.getGoodsInfo();
      },
      getGoodsInfo:function () {
        let goodsSt = "";
        if(this.proType!=-1){
          goodsSt = this.proType;
        }
        let params={
          shopId:this.shopId,
          goodsNm:this.goodsNm,
          goodsSt:goodsSt
        };
        this.$http.jsonp(httpUrl.goodsQry, {params: Object.assign(params, httpUrl.com_params)}).then((response) => {
          if(response.data.code==200){
            //$.alert("添加成功");
            this.proItems = response.data.data.datas;
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
              this.shopId = response.data.data.datas[0].shopId;
              this.getGoodsInfo();
            }
          }else {
            $.alert(response.data.desc);
          }
        }, (response) => {
          console.log('响应失败：'+response);
        });
      },
      //修改商品
      editProduct:function (goodsNo) {
        //console.log('修改');
        this.$router.push({ path: '/productDtl',query:{ type:'edit',goodsNo:goodsNo}});
      },
//      //删除商品
//      deleteProduct:function () {
//        console.log('删除');
//      },
    },
    mounted(){
      this.initShop();
      //this.pushHistory(httpUrl.hrefUrl+'index');
    }
  }
</script>

<style scoped >
  .operateBtn {
    margin-top: 5px;
  }
  .addProduct{
    margin: 15px 15px 5px 15px;
  }
  .weui-cell::before{
    border-top: 0;
  }
  .weui-search-bar{
   padding: 8px 15px;
  }
  .weui-panel{
    margin-top: 0;
  }
  .weui-search-bar::before{
    border: 0;
  }
  .weui-media-box__thumb{
    border:1px solid #eee ;
    border-radius: 4px;
  }
  .select-type{
    display: flex;
    flex-wrap: wrap
  }
  .select-type div{
    margin-right: 20px;
  }
  .productTp{
    margin-left: 15px;
    float: right;
  }
  .weui-loadmore__tips{
    width: 100%;
    float: left;
    margin:30px auto;
    text-align: center;
    color: #999;
  }
</style>

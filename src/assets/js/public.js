let publicJs = {
  getCurrentDate(){
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var Hour = 0;
    var Minute = 0;
    var Second = 0;
    var CurrentDate = "";
    //初始化时间
    Year = day.getFullYear();
    Month = day.getMonth() + 1;
    Day = day.getDate();
    Hour = day.getHours();
    Minute = day.getMinutes();
    Second = day.getSeconds();
    CurrentDate = Year + "-";
    if (Month >= 10) {
      CurrentDate = CurrentDate + Month + "-";
    }
    else {
      CurrentDate = CurrentDate + "0" + Month + "-";
    }
    if (Day >= 10) {
      CurrentDate = CurrentDate + Day + " ";
    }
    else {
      CurrentDate = CurrentDate + "0" + Day + "";
    }
    // if(Hour >=10)
    // {
    //     CurrentDate = CurrentDate +" "+ Hour ;
    // }
    // else
    // {
    //     CurrentDate = CurrentDate + "0" + Hour ;
    // }
    // if(Minute >=10)
    // {
    //     CurrentDate = CurrentDate + ":" + Minute ;
    // }
    // else
    // {
    //     CurrentDate = CurrentDate + ":0" + Minute ;
    // }
    // if(Second>=10)
    // {
    //     CurrentDate = CurrentDate + ":" + Second;
    // }
    // else
    // {
    //     CurrentDate = CurrentDate + ":0" + Second;
    // }
    return CurrentDate;
  },
  //获取N天前的日期
  getBeforeDate(n){
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if (day <= n) {
      if (mon > 1) {
        mon = mon - 1;
      }
      else {
        year = year - 1;
        mon = 12;
      }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    var s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;
  },
  //判断起始日期与结束日期大小
  checkDate(starttime, endtime, fn) {
    var start = new Date(starttime.replace(/-/g, "/"));
    var end = new Date(endtime.replace(/-/g, "/"));
    if (end < start) {
      fn();
      return false;
    }
    else {
      return true;
    }
  },
  //字符串转化为时间格式2014-11-02
  getFormatData(time){
    var strDate = time.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"); //精确到日
    return strDate;
  },
  //获取Cookie值
  getCookie(sName){
    var aCookie = document.cookie.split("; ");
    for (var i=0; i < aCookie.length; i++)
    {
    var aCrumb = aCookie[i].split("=");
    if (sName == aCrumb[0])
    return unescape(aCrumb[1]);
    }
    return null;
  },
  //获取地址栏参数
  getAddressParam(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
  },
  //除法函数，用来得到精确的除法结果
  //说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为 精确的除法结果。
  //调用：accDiv(arg1,arg2)
  //返回值：arg1除以arg2的精确结果
  accDiv(arg1, arg2){
    var t1 = 0, t2 = 0, r1, r2;
    try {t1 = arg1.toString().split(".")[1].length} catch (e) {}
    try {t2 = arg2.toString().split(".")[1].length} catch (e) {}
    // with(Math){
    // r1 = Number(arg1.toString().replace(".", ""))
    // r2 = Number(arg2.toString().replace(".", ""))
    // return (r1 / r2) * Math.pow(10, t2 - t1);
    // }

    try {r1 = Number(arg1.toString().replace(".",""))} catch (e) {}
    try {r2 = Number(arg2.toString().replace(".",""))} catch (e) {}
    return (r1 / r2) * Math.pow(10,t2 - t1);
  },
  //乘法函数，用来得到精确的乘法结果
  //说明：javascript的乘法结果会有误差，在两个浮点数 相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
  //调用：accMul(arg1,arg2)
  //返回值：arg1乘以 arg2的精确结果
  accMul(arg1, arg2){
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {m += s1.split(".")[1].length} catch (e) {}
    try {m += s2.split(".")[1].length} catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  /**
   ** 加法函数，用来得到精确的加法结果
   ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
   ** 调用：accAdd(arg1,arg2)
   ** 返回值：arg1加上arg2的精确结果
   **/
  accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
      r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
      r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", "")) * cm;
      } else {
        arg1 = Number(arg1.toString().replace(".", "")) * cm;
        arg2 = Number(arg2.toString().replace(".", ""));
      }
    } else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
  },
  updateTitle(title) {
    document.title = title
    var mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
      var iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      // 替换成站标favicon路径或者任意存在的较小的图片即可
      iframe.setAttribute('src', 'static/user.png')
      var iframeCallback = function () {
        setTimeout(function () {
          iframe.removeEventListener('load', iframeCallback)
          document.body.removeChild(iframe)
        }, 0)
      }
      iframe.addEventListener('load', iframeCallback)
      document.body.appendChild(iframe)
    }
  },
  compress(objImg){
    // 用于压缩图片的canvas
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    // 瓦片canvas
    var tCanvas = document.createElement('canvas')
    var tctx = tCanvas.getContext('2d')
    // 100 kb
    var maxSize = 600 * 1024;//// 不触发压缩行为的最大文件大小（100 * 1024表示100kb），注意，这并不代表压缩后一定会压缩到该大小以下

    var initSize = objImg.src.length
    var width = objImg.width
    var height = objImg.height
    // 如果图片大于400万像素，计算压缩比并将大小压至400万以下
    var ratio
    if ((ratio = width * height / 4000000) > 1) {
      ratio = Math.sqrt(ratio)
      width /= ratio
      height /= ratio
    } else {
      ratio = 1
    }
    canvas.width = width
    canvas.height = height
    // 铺底色
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // 如果图片像素大于100万则使用瓦片绘制
    var count
    if ((count = width * height / 1000000) > 1) {
      // 计算要分成多少块瓦片
      count = ~~(Math.sqrt(count) + 1)
      var nw = ~~(width / count)
      var nh = ~~(height / count)
      tCanvas.width = nw
      tCanvas.height = nh
      for (var i = 0; i < count; i++) {
        for (var j = 0; j < count; j++) {
          tctx.drawImage(objImg, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
        }
      }
    } else {
      ctx.drawImage(objImg, 0, 0, width, height)
    }
    // 进行最小压缩
    var nData = canvas.toDataURL('image/jpeg', 0.1)
    console.log('压缩前：' + initSize)
    console.log('压缩后：' + nData.length)
    console.log('压缩率：' + ~~(100 * (initSize - nData.length) / initSize) + '%')
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
    return nData
  },
}
//给Number类型增加一个div方法，调用起来更加 方便。
Number.prototype.div = function (arg){
  return publicJs.accDiv(this, arg);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg){
  return publicJs.accMul(arg, this);
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg){
  return publicJs.accAdd(arg,this);
}
export {publicJs}

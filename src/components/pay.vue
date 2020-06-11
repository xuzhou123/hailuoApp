<template>
  <div class="pay">
    <header>
      <img src="../../static/img/leftx.png" @click="LinkRouter('/?i=2')" alt />
      <i>钻石充值</i>
    </header>
    <div class="line"></div>
    <!--<div class="pap_v"  v-if="vv!=1">-->
    <div class="pap_v">
      <div class="money">
        <span>您的钻石余额：</span>
        <i>
          {{coin}}
          <img src="../../static/img/p7.png" />
        </i>
      </div>
      <div class="number">
        <p>充值数量：</p>
        <ul>
          <li
            :class="{'active':indexN==index}"
            v-for="(item,index) in numBer"
            @click="payFor(index,item)"
            :key="index"
          >
            <p>
              {{item.coin}}钻石
              <span v-if="item.give>0">&nbsp;送{{item.rate}}</span>
            </p>
            <i>￥{{item.money}}</i>
          </li>
        </ul>
      </div>
      <div class="paymoney">
        <span>应付金额：</span>
        <i>￥{{payNum}}</i>
      </div>
      <div class="plate">
        <p>支付平台：</p>
        <span :class="{'active':!payFlag}" @click="payFun(1)">
          <img src="../../static/img/w.png" alt />
        </span>
        <span :class="{'active':payFlag}" @click="payFun(0)">
          <img src="../../static/img/z.png" alt />
        </span>
      </div>
      <div class="pay_z" @click="pay_money()">
        <img src="../../static/img/pay.png" alt />
      </div>
      <div id="zfb"></div>
    </div>
    <!--<div style="text-align: center;margin-top:3rem;font-size: 0.4rem;" v-else>此账号禁止充值! 请联系客服</div>-->
  </div>
</template>

<script>
import store from "@/store/store";
import api from "@/constant/api";
import * as types from "@/store/types";
import { Toast } from "mint-ui";
export default {
  name: "pay",
  data() {
    return {
      vv: 0,
      indexN: 0,
      payFlag: false,
      numBer: [
        { text: 680, send: 0, money: 68 },
        { text: 980, send: 0, money: 98 },
        { text: 1880, send: 0, money: 188 },
        { text: 3880, send: 0, money: 388 },
        { text: 5880, send: 0, money: 588 },
        { text: 9880, send: 0, money: 988 },
        { text: 38880, send: 0, money: 3888 },
        { text: 58880, send: 0, money: 5888 },
        { text: 98880, send: 0, money: 9888 }
      ],
      newindex: 0,
      payNum: "68",
      userId: "",
      coin: "",
      appId: "", //公众号名称，由商户传入
      timeStamp: "", //时间戳，自1970年以来的秒数
      nonceStr: "", //随机串
      packagew: "",
      signType: "", //微信签名方式：
      paySign: "", //微信签名
      id:""
    };
  },
  mounted() {
    this.getPerson();
    this.getpaynum();
    this.vv = localStorage.getItem("is_shuijun");
  },
  methods: {
    LinkRouter(o) {
      this.$router.push({
        path: o
      });
    },
    showM: function(o) {
      // this.$root.Hub.$emit('child',{msg:o,flag:true});
      Toast({
        message: o,
        iconClass: "icon icon-success",
        className: "backColor",
        duration: 1000
      });
    },
    getpaynum() {
      var _this = this;
      this.axios.get(api.index_charge_rules_list).then(function(res) {
        var dat = res.data;
        if (dat.state == 0) {
          _this.numBer = dat.content;
          _this.payNum = dat.content[0].money;
          _this.id=dat.content[0].id;
        } else {
          _this.showM(dat.msg);
        }
      });
    },
    pay_money() {
      if (!this.payFlag) {
        //alert(555)
        var opind = localStorage.getItem("openid");
        //console.log(opind==null)
        if (opind == null || opind == "" || opind == undefined) {
          this.wechatH5Pay();
        } else {
          this.wechatPay();
        }
        //this.wechatH5Pay()
      } else {
        //this.showM('支付宝充值正在上线中！')
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          this.showM("请在app中打开充值！");
        } else {
          this.zfbH5Pay();
        }
      }
    },
    payFor(o, m) {
      this.indexN = o;
      this.id = m.id;
      this.payNum=m.money;
    },
    payFun(i) {
      if (i == 0) {
        this.payFlag = true;
      } else {
        this.payFlag = false;
      }
    },
    getPerson() {
      var _this = this;
      this.axios.get(api.person).then(function(res) {
        _this.$root.login(res.data.state);
        var dat = res.data;
        //_this.$root.login(dat.state)
        if (dat.state == 0) {
          // return dat.content.user_info.id
          _this.userId = dat.content.user_info.id;
          _this.coin = dat.content.user_info.coin;
        }
      });
    },
    setPay() {
      var _this = this;
      var json = { roomnum: this.videoUrl };
      this.axios
        .post(api.home + "?" + this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 0) {
            _this.LinkRouter(dat.content.liveinfo.pull);
          }
          // _this.live=res.data.content.show_list
        });
    },
    wechatPay() {
      var _this = this;
      var jsonp = {charge_id: this.id };
      this.axios
        .post(api.pay_wechat_wxpay,this.$qs.stringify(jsonp))
        .then(function(res) {
          if (res.data.state == 0) {
            var obj = JSON.parse(res.data.msg);
            _this.appId = obj.appId;
            _this.timeStamp = obj.timeStamp;
            _this.nonceStr = obj.nonceStr;
            _this.packagew = obj.package;
            _this.signType = obj.signType;
            _this.paySign = obj.paySign;
            _this.wxPay();
          } else {
            //_this.$root.Hub.$emit('child',{msg:res.data.msg,flag:true});
            _this.showM(res.data.msg);
          }
          _this.$root.login(res.data.state);
          if (res.data.code == 500) {
            _this.$root.login(99);
          }
        });
    },
    wxPay() {
      var _this = this;

      function onBridgeReady() {
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: _this.appId, //公众号名称，由商户传入
            timeStamp: _this.timeStamp, //时间戳，自1970年以来的秒数
            nonceStr: _this.nonceStr, //随机串
            package: _this.packagew,
            signType: _this.signType, //微信签名方式：
            paySign: _this.paySign //微信签名
          },
          function(res) {
            /*alert( JSON.stringify(res)  )*/
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              //_this.$root.Hub.$emit('child',{msg:'支付成功',flag:true});
              _this.showM("支付成功");
            }
            if (res.err_msg == "get_brand_wcpay_request:cancel") {
              //_this.$root.Hub.$emit('child',{msg:'支付过程中用户取消',flag:true});
              _this.showM("支付过程中用户取消");
            }
            if (res.err_msg == "get_brand_wcpay_request:fail") {
              //_this.$root.Hub.$emit('child',{msg:'支付失败',flag:true});
              _this.showM("支付失败");
            }
          }
        );
      }
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
    },
    wechatH5Pay() {
        var _this = this;
        var jsonp = { charge_id: this.id };
        //var params = this.$root.entrypt(jsonp);
        this.axios.post(api.pay_h5_wxpay,this.$qs.stringify(jsonp))
        .then(function(res) {
            if (res.data.state == 0) {
            window.location.href = res.data.msg;
            } else {
            _this.showM(res.data.msg);
            }
        });
    },
    zfbH5Pay() {
        var _this = this;
        var jsonp = {charge_id: this.id };
      //  var params = this.$root.entrypt(jsonp);
        this.axios.post(api.pay_h5_alipay,this.$qs.stringify(jsonp))
        .then(function(res) {
          if (res.data.state == 0) {
            document.getElementById("zfb").innerHTML = res.data.msg;
            document.forms[0].submit();
          } else {
            _this.showM(res.data.msg);
          }
        });
    }
  }
};
</script>

<style scoped lang="less">
header {
  width: 7.1rem;
  margin: 0 auto;
  height: 1.2rem;
  line-height: 1.2rem;
  img {
    width: 0.26rem;
    vertical-align: middle;
  }
  i {
    font-size: 0.4rem;
    color: #2c2c2c;
    margin-left: 2.5rem;
    font-weight: bold;
  }
}
.line {
  width: 100%;
  border-top: 0.2rem solid #f3f3f3;
}
.money {
  padding: 0 0.2rem;
  border-bottom: 1px solid #f3f3f3;
  height: 1.07rem;
  line-height: 1.07rem;
  span {
    font-size: 0.28rem;
    color: #2c2c2c;
    float: left;
  }
  i {
    float: right;
    color: #0096ff;
    font-size: 0.28rem;
    img {
      width: 0.55rem;
      vertical-align: middle;
    }
  }
}
.number {
  padding: 0.2rem 0.2rem;
  border-bottom: 1px solid #f3f3f3;
  p {
    font-size: 0.28rem;
    color: #2c2c2c;
    margin-top: 0.39rem;
  }
  ul {
    overflow: hidden;
    li {
      margin-top: 0.3rem;
      margin-left: 0.18rem;
      width: 2.18rem;
      height: 1.32rem;
      float: left;
      color: #2c2c2c;
      text-align: center;
      line-height: 0.32rem;
      background: url("../../static/img/a.png");
      background-size: 100% 100%;
      p {
        font-size: 0.22rem;
        margin-top: 0.36rem;
      }
      i {
        font-size: 0.22rem;
      }
    }
    li:nth-of-type(3n + 1) {
      margin-left: 0;
    }
    li.active {
      background: url("../../static/img/b.png");
      background-size: 100% 100%;
      color: #0096ff !important;
      p {
        color: #0096ff !important;
      }
    }
  }
}

.paymoney {
  padding: 0 0.2rem;
  border-bottom: 1px solid #f3f3f3;
  height: 0.87rem;
  line-height: 0.87rem;
  color: #2c2c2c;
  font-size: 0.28rem;
  i {
    color: #0096ff;
  }
}
.plate {
  padding: 0 0.2rem;
  overflow: hidden;
  p {
    font-size: 0.28rem;
    color: #2c2c2c;
    height: 0.87rem;
    line-height: 0.87rem;
  }
  span {
    display: block;
    width: 1.82rem;
    height: 0.78rem;
    border-radius: 0.2rem;
    float: left;
    border: 1px solid #b8b8b8;
    text-align: center;
    margin-left: 0.18rem;
    img {
      width: 1.3rem;
      margin-top: 0.13rem;
    }
  }
  span:first-child {
    margin-left: 0;
  }
  span.active {
    border: 1px solid #0096ff;
  }
}
.pay_z {
  width: 3.7rem;
  height: 0.8rem;
  margin: 0 auto;
  margin-top: 0.7rem;
  clear: both;
}
</style>

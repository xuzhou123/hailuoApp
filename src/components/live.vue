<template>
  <div id="live">
    <div class="wrapper" ref="wrapper">
      <div class="video">
        <!-- pk -->
        <!--<div class="pk" v-if="pkflag">
                    <img src="../../static/img/PK.png" alt="">
                    <div class="pk1">
                        <img  :src="liveCt.avatar" >
                        <p>
                            <i>小痘痘</i>
                            <em>78928789</em>
                        </p>
                    </div>

                    <div class="pk1 pk2">
                        <img  :src="liveCt.avatar" >
                        <p>
                            <i>小看看</i>
                            <em>7892875289 </em>
                        </p>
                    </div>
        </div>-->
        <!-- pk -->

        <!-- pk开始 -->
        <!-- <div class="pkstart">
                    <span>12:12</span>
                    <img src="../../static/img/pk2.png" alt="">
                    <div class="pks1">
                        <img  :src="liveCt.avatar" ><i>小痘痘</i>
                        <p>78928789  <img src="../../static/img/p7.png" ></p>
                    </div>

                    <div class="pks1 pks2">
                        <img  :src="liveCt.avatar" ><i>uuu</i>
                        <p>78928789  <img src="../../static/img/p7.png" ></p>
                    </div>
        </div>-->
        <!-- pk结束 -->

        <!-- x-pk -->
        <div class="x-pk" v-if="pkflag">
          <div class="pk-content">
            <div class="blood-bar">
              <div class="blood blood-l" :style="{width:'70%'}">
                <span>11113331</span>
              </div>
              <div class="blood blood-r" :style="{width:'30%'}">
                <span>33333333</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 直播 -->
        <div id="video" class="video-con" v-if="!pkflag" @click="videoflag">
          <video
            autoplay="autoplay"
            ref="html5player"
            preload="auto"
            x5-video-player-type="h5"
            x-webkit-airplay="true"
            :poster="liveCt.avatar"
            webkit-playsinline="true"
            playsinline="true"
            :src="hls"
          ></video>
        </div>
        <!-- 播放图标 -->
        <div
          class="video_ui"
          style="display: block"
          ref="video_ui"
          v-if="!pkflag"
          @click="playvideo"
        >
          <a class="new_play_btn"></a>
        </div>
        <div id="chatArea" class="chat_area" ref="chat_area" @click="videoflag()">
          <div class="tanmu_scroll" id="tanmuScroll">
            <ul>
              <li class="notice">
                <span class="nick">系统消息</span>
                {{warning}}
              </li>
              <li v-for="(item,index) in live" class="normal">
                <span @click="arrkuty({'id':item.ct.id})" v-if="item.msgtype=='0'" class="nick">
                  <img
                    style="width:40px;"
                    v-if="item.ct.guizu!=''"
                    :src="guizu2(item.ct.guizu)"
                    alt
                  />
                  <img
                    v-if="item.ct.liangname!='0'"
                    style="width:20px;"
                    src="../../static/img/y7.png"
                    alt
                  />&nbsp;
                  <img :src="imgct1(item)" alt />
                  <em>{{item.ct.user_nicename}}</em> 进入了直播间！
                </span>
                <p @click="arrkuty({'id':item.uid})" v-if="item.msgtype=='2'">
                  <img style="width:40px;" v-if="item.guizu!=''" :src="guizu2(item.guizu)" alt />
                  <img
                    v-if="item.liangname!='0'"
                    style="width:20px;"
                    src="../../static/img/y7.png"
                    alt
                  />&nbsp;
                  <img :src="imgct(item)" alt />
                  <span class="nick">{{item.uname}}:</span>
                  {{item.ct}}
                </p>
                <span
                  @click="arrkuty({'id':item.uid})"
                  v-show="item.ct.totalcoin>=260"
                  v-if="item.msgtype=='1'"
                  class="nick"
                >
                  <img style="width:40px;" v-if="item.guizu!=''" :src="guizu2(item.guizu)" alt />
                  <img
                    v-if="item.liangname!='0'"
                    style="width:20px;"
                    src="../../static/img/y7.png"
                    alt
                  />&nbsp;
                  <img :src="imgct(item)" alt />
                  &nbsp;{{item.uname}}
                  <i style="color:#fff;">送出</i>
                  {{item.ct.giftname}}x{{item.ct.giftcount}}
                </span>
                <p @click="arrkuty({'id':item.uid})" v-if="item.msgtype=='4'">
                  <span class="nick">系统消息:</span>
                  {{item.ct}}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="video_status video_status_living" @click="catmod=true">贡献：{{catdog}}</div>
        <img style="display:none;" :src="liveCt.avatar" onload="_yy_firstScreenTime = Date.now();" />
        <div class="top_banner">
          <img
            class="avatar"
            @click="arrkuty({'id':videoUrl})"
            style="object-fit: cover;"
            :src="liveCt.avatar==1?require('../../static/img/default.jpg'):liveCt.avatar"
            :alt="liveCt.user_nicename"
          />
          <div class="text text_status_living">
            <p class="nick" style="width:50px">{{liveCt.user_nicename}}</p>
            <p class="count">
              <!--<i class="viewer_icon"></i>-->
              <span class="totalCountP" id="liveCount">@{{liveCt.uid}}</span>
            </p>
          </div>
          <div
            v-if="is_attention<1"
            @click="setFollow(videoUrl)"
            style="float: left;display: inline-block;width:25px;margin-top:5px;"
          >
            <img src="../../static/img/gzgz.png" alt />
          </div>
          <div style="clear: both;"></div>
        </div>
        <div class="custom">
          <div class="scroll">
            <span
              v-for="(item,index) in onlone_user"
              @click="arrkuty(item)"
              :style="styleobj2(item.avatar)"
            >
              <img v-if="index==0" src="../../static/img/h1.png" alt />
              <img v-if="index==1" src="../../static/img/h2.png" alt />
              <img v-if="index==2" src="../../static/img/h3.png" alt />
            </span>
          </div>
        </div>
        <div class="person_number" @click="lisop=true">{{catperson}}人</div>
        <div class="chat_banner" v-show="!valueinput" v-if="!flag">
          <i v-if="islive===1" class="chat_ico chat_show_pop_speak js-download" @click="textInfo()"></i>
          <i v-if="islive===1" class="chat_gift chat_show_pop_gift js-download" @click="textflag()"></i>
          <i class="closegif chat_show_pop_gift js-download" @click="closegif()"></i>
          <!--<span class="chat_btn js-download" ><span class="huya_icon"></span>打开App参与精彩互动 <i class="icon_arrow"></i></span>-->
        </div>
        <div class="input" v-if="valueinput">
          <input
            type="text"
            ref="inputshow"
            @keypress="CheckInfo"
            v-model="valueInfo"
            placeholder="说点什么吧！"
          />
          <button @click="Send">发送</button>
        </div>
        <div class="GiftPanel" v-show="flag">
          <mt-swipe :auto="300000000" :continuous="false">
            <mt-swipe-item>
              <div class="GiftPanel-content">
                <div class="GiftPanel-content-wrap">
                  <div
                    :class="['GiftItem',{selected:index==IndexNum}]"
                    data-id="192"
                    v-for="(item,index) in gift"
                    v-if="index<=7"
                    @click="selectGift(index,item)"
                  >
                    <img class="GiftItem-icon" :src="item.gifticon_mini" />
                    <span class="GiftItem-name">{{item.giftname}}</span>
                    <span class="GiftItem-worth">{{item.needcoin}}钻石</span>
                  </div>
                </div>
              </div>
            </mt-swipe-item>

            <mt-swipe-item>
              <div class="GiftPanel-content">
                <div class="GiftPanel-content-wrap">
                  <div
                    :class="['GiftItem',{selected:index==IndexNum}]"
                    data-id="192"
                    v-for="(item,index) in gift"
                    v-if="(index>7&&index<=15)"
                    @click="selectGift(index,item)"
                  >
                    <img class="GiftItem-icon" :src="item.gifticon_mini" />
                    <span class="GiftItem-name">{{item.giftname}}</span>
                    <span class="GiftItem-worth">{{item.needcoin}}钻石</span>
                  </div>
                </div>
              </div>
            </mt-swipe-item>

            <mt-swipe-item>
              <div class="GiftPanel-content">
                <div class="GiftPanel-content-wrap">
                  <div
                    :class="['GiftItem',{selected:index==IndexNum}]"
                    data-id="192"
                    v-for="(item,index) in gift"
                    v-if="index>15"
                    @click="selectGift(index,item)"
                  >
                    <img class="GiftItem-icon" :src="item.gifticon_mini" />
                    <span class="GiftItem-name">{{item.giftname}}</span>
                    <span class="GiftItem-worth">{{item.needcoin}}钻石</span>
                  </div>
                </div>
              </div>
            </mt-swipe-item>
          </mt-swipe>

          <div class="GiftPanel-footer">
            <div class="balance">
              <i></i>
              <span>{{locKcoin}}</span>
            </div>
            <div class="btn-charge" @click="goRouter('/pay')">充值</div>
            <div class="btn-gz" @click="goRouter('/?i=4')">
              <img src="../../static/img/gzxf.png" alt />
            </div>
            <div class="btn-send">
              <div class="select_num" @click="sel_n=!sel_n">
                <i>{{num}}</i>
                <em v-if="!sel_n">
                  <img src="../../static/img/top_s.png" alt />
                </em>
                <em v-if="sel_n">
                  <img src="../../static/img/bottom_s.png" alt />
                </em>
              </div>
              <span class="vaild" @click="SendGift">发送</span>
              <div class="flask_model" v-if="sel_n">
                <p v-for="(item,index) in num_gift" @click="setfollnum(item.num)">
                  <i>{{item.num}}</i>
                  <em>{{item.name}}</em>
                </p>
              </div>
              <div class="flask_site" v-if="sel_n" @click="sel_n=false"></div>
            </div>
          </div>
        </div>

        <div :class="['Banner',{'active':java}]" data-id="undefined" @click="videoflag()">
          <img class="Banner-gift" :src="amintGit.img" />
        </div>

        <div
          :class="['Banner3',{'active':java2}]"
          style="width:220px;height:40px; position: absolute;bottom:295px;left:0;"
        >
          <div class="Banner2" data-id="undefined" @click="videoflag()">
            <i class="Banner-ava" :style="styleObj(gtop.avatar)"></i>
            <span class="Banner-text">
              <span class="Banner-text-nick">{{gtop.name}}</span>
              <span class="Banner-text-tip">送出 {{gtop.gitf}}</span>
            </span>
            <img :src="gtop.img" class="Banner-gift" alt />
            <span class="Banner-hittimes hit">
              <em>x</em>
              <i :class="{'iamcenter':java4}">{{gtop.num}}</i>
            </span>
          </div>
        </div>

        <div
          :class="['Banner3',{'active':java3}]"
          style="width:220px;height:40px; position: absolute;bottom:240px;left:0;"
        >
          <div class="Banner2" data-id="undefined" @click="videoflag()">
            <i class="Banner-ava" :style="styleObj(gcenter.avatar)"></i>
            <span class="Banner-text">
              <span class="Banner-text-nick">{{gcenter.name}}</span>
              <span class="Banner-text-tip">送出 {{gcenter.gitf}}</span>
            </span>
            <img :src="gcenter.img" class="Banner-gift" alt />
            <span class="Banner-hittimes hit">
              <em>x</em>
              <i :class="{'iamcenter':java4}">{{gcenter.num}}</i>
            </span>
          </div>
        </div>

        <div v-if="fswf" class="swf">
          <img :src="dswf" alt />
        </div>
        <div
          id="demoCanvas"
          @click="videoflag()"
          v-show="fswf_svga"
          style="z-index:1;width:100%;height:100%;position: fixed;left:0;top:0;"
        ></div>
      </div>
    </div>
    <model_info :inputname="model_id" v-show="mkop"></model_info>
    <ListInfo v-if="lisop"></ListInfo>
    <list_model v-if="catmod"></list_model>
    <div class="left-scroll">
      <div ref="demo" class="demo">
        <div class="ul-li" v-if="gift51.name!=undefined" @click="arrkuty({'id':gift51.id})">
          <span class="s1">
            <img :src="guizu2(gift51.guizu)" alt />
          </span>
          <span class="s2">
            <img v-if="gift51.liang!='0'" src="../../static/img/y1.png" alt />
          </span>
          <span class="s3">
            <img :src="imgct(gift51)" alt />
          </span>
          <p>
            <i>{{gift51.name.length>4?(gift51.name.substring(0,4)+'...'):gift51.name}}</i>&nbsp;送给主播&nbsp;
            <i>{{gift51.videname.length>4?(gift51.videname.substring(0,4)+'...'):gift51.videname}}</i>
            &nbsp;{{gift51.gitf}}x{{gift51.num}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import store from "@/store/store";
import api from "@/constant/api";
import * as types from "@/store/types";
import model_info from "@/components/model_info";
import ListInfo from "@/components/ListInfo";
import list_model from "@/components/list_model";
import { Toast, MessageBox } from "mint-ui";
import VueSocketio from "vue-socket.io"; //socket即时通讯
import domain from "../../untils/config";
Vue.use(VueSocketio, domain.socketDomain); //socket即时通讯
export default {
  data() {
    return {
      kickid: 0,
      shutid: 0,
      pktime: 4,
      pkflag: true,
      valueinput: false,
      system: [{ name: "晓东" }, { name: "晓东" }, { name: "晓东" }],
      active: "tab-container1",
      videoUrl: "",
      live: [],
      valueInfo: "",
      amintGit: {}, //礼物
      gift: [],
      IndexNum: 0,
      flag: false,
      name: "",
      level: "",
      arr_my_attention: [],
      wrapperHeight: 0,
      liveCt: [],
      content: [],
      java: false, //礼物特效是否显示
      java2: false, //礼物特效是否显示
      java3: false, //礼物特效是否显示
      java4: false, //
      giftname: "",
      giftimg: require("../../static/img/l2.png"),
      avatar: "",
      id: "",
      hls: "",
      uid: "",
      giftid: "", //礼物id
      warning: "", //警告信息
      locKcoin: 0,
      arry: [],
      ict: 1,
      dswf: "",
      fswf: false,
      forflag: "",
      arrlike: [],
      mkop: false,
      Width: "",
      lisop: false,
      num: 1, //礼物数量
      sel_n: false,
      num_gift: [
        { name: "一生一世", num: 1314 },
        { name: "我爱你", num: 520 },
        { name: "要抱抱", num: 188 },
        { name: "一切顺利", num: 66 },
        { name: "想你", num: 30 },
        { name: "十全十美", num: 10 },
        { name: "一心一意", num: 1 }
      ],
      onlone_user: [], //在线用户
      model_id: "",
      catmod: false,
      fity_length: 0,
      catdog: "",
      catperson: "",
      liangname: "0",
      guizu: "",
      gift50: [],
      gift51: {},
      gtop: {},
      gcenter: {},
      phpflag: {},
      userid: "",
      is_attention: 0,
      fswf_svga: false,
      islive: 1
    };
  },
  sockets: {
    broadcastingListen: function(o) {
      var _this = this;
      for (var i in o) {
        if (typeof o[i] == "string") {
          var data = JSON.parse(o[i]);
          var msgObject = data.msg[0];
          var msgtype = msgObject.msgtype;
          var msgaction = msgObject.action;
          var msgmethod = msgObject._method_;
        } else {
          var data = {};
          return "";
        }

        if (msgmethod == "SendMsg") {
          //聊天信息
          console.log(data.msg[0]);
          this.live.push(data.msg[0]);
          this.$refs.chat_area.scrollTop = this.$refs.chat_area.scrollHeight;
          if (data.msg[0].ct.car && data.msg[0].ct.car.id != 0) {
            let img_info = data.msg[0].ct.car.swf;

            if (img_info.indexOf("svga") == -1) {
              _this.dswf = img_info;
              _this.fswf = true;
            } else {
              _this.getSvga(img_info);
              _this.fswf_svga = true;
            }

            setTimeout(() => {
              _this.fswf = false;
              _this.fswf_svga = false;
            }, parseInt(data.msg[0].ct.car.swftime) * 1000);
          }
          if (data.msg[0].msgtype == 0) {
            //欢饮信息
            _this.getavatar();
            _this.getpython();
          }
        } else if (msgmethod == "SendGift") {
          //赠送礼物
          this.live.push(data.msg[0]);
          this.$refs.chat_area.scrollTop = this.$refs.chat_area.scrollHeight;
          this.arrlike.push({
            total: data.msg[0].ct.totalcoin,
            avatar: data.msg[0].uhead,
            name: data.msg[0].uname,
            gitf: data.msg[0].ct.giftname,
            img: data.msg[0].ct.gifticon,
            num: data.msg[0].ct.giftcount,
            gitid: data.msg[0].ct.giftid,
            gift_run_time: data.msg[0].ct.gift_run_time
          });
          _this.getcat();
        } else if (msgmethod == "BuyKeeper") {
          //购买守护
          //this.buyKeeper(msgObject);
        } else if (msgmethod == "SendHorn") {
          //喇叭
          //this.sendHorn(msgObject);
        } else if (msgmethod == "SystemNot") {
          //系统信息
          //this.systemNot(msgObject);
          this.warning = data.msg[0].ct;
        } else if (msgmethod == "StartEndLive") {
          //开关播
          //this.showEndRecommend(msgObject);
        } else if (msgmethod == "disconnect") {
          //关播
          //this.disconnect(msgObject);
        } else if (msgmethod == "requestFans") {
          //关播
          //var nums=msgObject.ct.data.info.nums;
          //this.setRoomNums(nums);
        } else if (msgmethod == "KickUser") {
          //踢出直播间
          //console.log(data.msg[0],'踢出')
          _this.kickid = data.msg[0].touid;
          if (_this.userid == _this.kickid) {
            _this.showM("你已被踢出直播间！");
            _this.goRouter("/");
          }
        } else if (msgmethod == "ShutUpUser") {
          //禁言
          _this.live.push(data.msg[0]);
          _this.shutid = data.msg[0].touid;
        } else if (msgmethod == "AllShowLiveSendGiftMsg") {
          this.gift50.push({
            videname: data.msg[0].ct.videoname,
            id: data.msg[0].ct.id,
            guizu: data.msg[0].ct.guizu,
            liang: data.msg[0].ct.liangname,
            name: data.msg[0].ct.name,
            gitf: data.msg[0].ct.giftname,
            num: data.msg[0].ct.num,
            level: data.msg[0].ct.level
          });
        }
      }
    },
    conn: function(o) {
      console.log(o, "连接服务器回应");
    },
    error: function(o) {
      console.log(o, "错误");
      Vue.use(VueSocketio, domain.socketDomain);
    },
    reconnect: function(o) {
      console.log(o, "重连");
      Vue.use(VueSocketio, domain.socketDomain);
    },
    disconnect: function(o) {
      console.log(o, "断开连接");
      Vue.use(VueSocketio, domain.socketDomain);
    }
  },
  components: {
    model_info,
    ListInfo,
    list_model
  },
  mounted() {
    var _this = this;
    var ll = this.$route.query.code;
    if (ll != undefined && ll != null && ll != "") {
      localStorage.setItem("code", ll);
    }
    this.scrollLeft();
    this.$nextTick(function() {
      this.$refs.wrapper.style.height =
        document.documentElement.clientHeight + "px";
      this.videoUrl = this.$route.query.id;
      this.getHome();
      this.getis_attention();
      this.getPerson2();
      this.phpflag = setInterval(() => {
        _this.pythonPhp();
      }, 100);
      this.forflag = setInterval(() => {
        _this.giftamite();
      }, 100);
    });
    // 延迟pk
    // setTimeout(e => {
    //   _this.pkflag = false;
    // }, _this.pktime * 1000);
  },
  beforeRouteLeave(to, from, next) {
    next();
    clearInterval(this.forflag);
    clearInterval(this.myvar);
    clearInterval(this.phpflag);
  },
  created() {
    var _this = this;
    _this.$root.Hub.$on("a2", function(o) {
      _this.mkop = false;
    });
    _this.$root.Hub.$on("listinfo", function(o) {
      _this.lisop = false;
    });
    _this.$root.Hub.$on("list_mod", function(o) {
      _this.catmod = false;
    });
    _this.$root.Hub.$on("shut", function(o) {
      _this.clickButton(o);
    });
  },
  methods: {
    getSvga(url) {
      var player = new SVGA.Player("#demoCanvas");
      var parser = new SVGA.Parser("#demoCanvas"); // Must Provide same selector eg:#demoCanvas IF support IE6+
      parser.load(url, function(videoItem) {
        player.setVideoItem(videoItem);
        player.startAnimation();
      });
    },
    getPerson2() {
      var _this = this;
      this.axios.get(api.person).then(function(res) {
        var dat = res.data;
        if (dat.state == 0) {
          _this.userid = dat.content.user_info.id;
        }
      });
    },
    guizu2(e) {
      var str = "";
      if (e == "男爵") {
        str = require("../../static/img/y2.png");
      } else if (e == "子爵") {
        str = require("../../static/img/y1.png");
      } else if (e == "伯爵") {
        str = require("../../static/img/y5.png");
      } else if (e == "侯爵") {
        str = require("../../static/img/y4.png");
      } else if (e == "公爵") {
        str = require("../../static/img/y6.png");
      } else if (e == "皇帝") {
        str = require("../../static/img/y3.png");
      } else {
        return "";
      }
      return str;
    },
    scrollLeft() {
      var demo = this.$refs.demo;
      var i = 0;
      var _this = this;
      function Marquee() {
        if (parseFloat(demo.style.marginRight) >= parseFloat("120%")) {
          ////clearInterval(_this.myvar)
          i = 0;
          demo.style.marginRight = "-100%";
          if (_this.gift50.length > 0) {
            _this.gift51 = _this.gift50[0];
            _this.gift50.shift();
          } else {
            _this.gift51 = {};
          }
        } else {
          ++i;
          demo.style.marginRight = -100 + i + "%";
        }
      }
      this.myvar = setInterval(Marquee, 50);
    },
    getavatar() {
      var _this = this;
      var json = { anchor_id: this.videoUrl, page: 1, length: 20 };
      this.axios
        .post(api.live_online_user, this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 0) {
            _this.onlone_user = dat.content;
          }
        });
    },
    setfollnum(o) {
      this.num = o;
      this.sel_n = false;
    },
    arrkuty(e) {
      var _this = this;
      _this.$root.Hub.$emit("md", {
        iszb: false,
        kk: e,
        stream: _this.liveCt.stream,
        zid: _this.liveCt.uid,
        zname: _this.liveCt.user_nicename
      });
      setTimeout(() => {
        _this.mkop = true;
      }, 100);

      //_this.model_id=e
    },
    imgct(o) {
      if (o.level == undefined) {
        return "";
      }
      if (parseInt(o.level) > 32) {
        return require("../../static/img/32.png");
      } else {
        return require("../../static/img/" + o.level + ".png");
      }
    },
    imgct1(o) {
      if (parseInt(o.ct.level) > 32) {
        return require("../../static/img/32.png");
      } else {
        return require("../../static/img/" + o.ct.level + ".png");
      }
    },
    giftamite() {
      var _this = this;
      //console.log(_this.arrlike)
      if (_this.arrlike.length > 0) {
        var item = _this.arrlike[0];
        if (item.total > 50) {
          _this.amintGit.avatar = item.avatar;
          _this.amintGit.gitf = item.gitf;
          _this.amintGit.name = item.name;

          _this.amintGit.num = item.num;

          //let img_info='../../static/css/mghh.svga'
          //console.log(item.img.indexOf('webp')!=-1)
          if (item.img.indexOf("svga") == -1) {
            _this.amintGit.img = item.img;
            _this.java = true;
          } else {
            _this.getSvga(item.img);
            _this.fswf_svga = true;
          }

          clearInterval(this.forflag);
          _this.gifttime(item.gift_run_time * 1000);
        }
      }
    },
    //连击特效《--
    pythonPhp() {
      var _this = this;
      if (_this.arrlike.length > 0) {
        var item = _this.arrlike[0];
        if (item.total <= 50) {
          _this.zhiboTx(item); //连击特效
        }
      }
    },
    zhiboTx(item) {
      var _this = this;
      var topFlg = JSON.stringify(_this.gtop);
      var centerFlg = JSON.stringify(_this.gcenter);

      if (_this.gtop.gitf == item.gitf && _this.gtop.name == item.name) {
        _this.gtop.num = item.num + _this.gtop.num;
        _this.arrlike.shift();
      } else if (
        _this.gcenter.gitf == item.gitf &&
        _this.gcenter.name == item.name
      ) {
        _this.gcenter.num = item.num + _this.gcenter.num;
        _this.arrlike.shift();
      } else {
        if (topFlg == "{}" && centerFlg == "{}") {
          _this.topFun(item);
          _this.equalFun2();
        } else if (topFlg != "{}" && centerFlg != "{}") {
        } else if (topFlg != "{}" && centerFlg == "{}") {
          _this.centerFun(item);
          _this.equalFun3();
        } else if (topFlg == "{}" && centerFlg != "{}") {
          _this.topFun(item);
          _this.equalFun2();
        }
      }
      this.phpflag = setInterval(() => {
        _this.pythonPhp();
      }, 100);
    },
    equalFun3() {
      var _this = this;
      _this.java3 = true;
      setTimeout(e => {
        _this.java3 = false;
        _this.gcenter = {};
      }, 9000);
    },
    equalFun2() {
      var _this = this;
      _this.java2 = true;
      setTimeout(e => {
        _this.java2 = false;
        _this.gtop = {};
      }, 9000);
    },
    topFun(item) {
      var _this = this;
      _this.gtop.avatar = item.avatar;
      _this.gtop.gitf = item.gitf;
      _this.gtop.name = item.name;
      _this.gtop.num = item.num;
      _this.arrlike.shift();
      if (item.gitf == "小海螺") {
        _this.gtop.img =
          domain.staticDomain + "gift/texiao/1544491137120_icon.png";
      } else if (item.gitf == "打call") {
        _this.gtop.img =
          domain.staticDomain + "gift/texiao/1544490954722_icon.png";
      } else {
        _this.gtop.img = item.img;
      }
    },
    centerFun(item) {
      var _this = this;
      _this.gcenter.avatar = item.avatar;
      _this.gcenter.gitf = item.gitf;
      _this.gcenter.name = item.name;
      _this.gcenter.num = item.num;
      _this.arrlike.shift();
      if (item.gitf == "小海螺") {
        _this.gcenter.img =
          domain.staticDomain + "gift/texiao/1544491137120_icon.png";
      } else if (item.gitf == "打call") {
        _this.gcenter.img =
          domain.staticDomain + "gift/texiao/1544490954722_icon.png";
      } else {
        _this.gcenter.img = item.img;
      }
    },
    //连击特效--》
    gifttime(o) {
      var _this = this;
      setTimeout(() => {
        _this.java = false;
        _this.fswf_svga = false;
        _this.arrlike.shift();
        _this.forflag = setInterval(() => {
          _this.giftamite();
        }, 100);
      }, o);
    },
    textflag() {
      this.flag = true;
      this.getPerson("kkk");
    },
    // 关闭直播间
    closegif() {
      if (!this.pkflag) {
        this.$refs.html5player.pause();
      }
      this.goRouter("/?i=0");
    },
    videoflag() {
      this.valueinput = false;
      this.flag = false;
    },
    styleobj() {
      if (this.liveCt.avatar == 1) {
        return (
          'background:url("' +
          require("../../static/img/default.jpg") +
          '") center no-repeat;'
        );
      } else {
        return 'background: url("' + this.liveCt.avatar + '")';
      }
    },
    styleobj2(o) {
      if (o == null || o == "") {
        return (
          'background:url("' +
          require("../../static/img/default.jpg") +
          '") center no-repeat;'
        );
      } else {
        return 'background: url("' + o + '")';
      }
    },
    CheckInfo() {
      console.log(event.keyCode);
      if (event.keyCode == 13 || event.keyCode == 40) {
        this.valueinput = false;
      }
    },
    textInfo(e) {
      this.valueinput = true;
      var _this = this;
      setTimeout(function() {
        _this.$refs.inputshow.focus();
      }, 100);
    },
    h5live() {
      this.valueInfo = false;
      this.flag = true;
    },
    playvideo() {
      this.$refs.html5player.play();
      this.$refs.video_ui.style.display = "none";
      this.$refs.html5player.style.display = "block";
    },
    clickButton: function(val) {
      this.$socket.emit("broadcast", val);
    },
    SendGift() {
      this.sendgiftname();
    },
    sendgiftname() {
      var _this = this;
      var json = {
        touid: this.liveCt.uid,
        giftid: this.giftid,
        showid: this.liveCt.showid,
        num: this.num
      };
      this.axios
        .post(api.send_gift, this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          _this.$root.login(dat.state);
          if (dat.state == 0) {
            function FormatNowDate() {
              var mDate = new Date();
              var H = mDate.getHours();
              var i = mDate.getMinutes();
              var s = mDate.getSeconds();
              if (H < 10) {
                H = "0" + H;
              }
              if (i < 10) {
                i = "0" + i;
              }
              if (s < 10) {
                s = "0" + s;
              }
              //return H + ':' + i + ':' + s;
              return H + ":" + i;
            }
            var lwcount = dat.content.liwu;
            var roomnumq = dat.content.quid; //请求连麦者id
            var roomnumb = dat.content.buid; //被连麦者id
            var msg =
              '{"retcode":"000000","retmsg":"ok","msg":[{"_method_":"SendGift","evensend":"' +
              dat.content.evensend +
              '","action":"0","ct":"' +
              dat.content.gifttoken +
              '","msgtype":"1","level":"' +
              dat.content.level +
              '","uid":"' +
              dat.content.uid +
              '","timestamp":"' +
              FormatNowDate() +
              '","uname":"' +
              _this.name +
              '","uhead":"' +
              _this.avatar +
              '","vip_type":"0","liangname":"' +
              _this.liangname +
              '","guizu":"' +
              _this.guizu +
              '"}]}';

            _this.clickButton(msg);

            if (dat.content.gift_total_coin > 500) {
              //全场广播
              //this.gift50.push({guizu:data.msg[0].guizu,liang:data.msg[0].liangname,avatar:data.msg[0].uhead,name:data.msg[0].uname,gitf:data.msg[0].ct.giftname,img:data.msg[0].ct.gifticon,num:data.msg[0].ct.giftcount,gitid:data.msg[0].ct.giftid,gift_run_time:data.msg[0].ct.gift_run_time,level:data.msg[0].ct.level})
              var mvp = {
                retcode: "000000",
                retmsg: "ok",
                msg: [
                  {
                    _method_: "AllShowLiveSendGiftMsg",
                    action: "5",
                    msgtype: "0",
                    ct: {
                      id: dat.content.uid,
                      videoname: _this.liveCt.user_nicename,
                      name: _this.name,
                      level: dat.content.level,
                      liangname: _this.liangname,
                      guizu: _this.guizu,
                      num: _this.num,
                      giftname: _this.giftname
                    }
                  }
                ]
              };
              mvp = JSON.stringify(mvp);
              _this.clickButton(mvp);
            }
            if (lwcount != "" && roomnumq != 0 && roomnumb != 0) {
              if (_this.liveCt.uid == roomnumq) {
                var msg =
                  '{"retcode":"000000","retmsg":"ok","msg":[{"_method_":"testlink","action":"10","msgtype":"10","roomnum":"' +
                  roomnumb +
                  '","lwcount":"' +
                  lwcount +
                  '",}]}';

                _this.clickButton(msg);
                var msg2 =
                  '{"retcode":"000000","retmsg":"ok","msg":[{"_method_":"testlink","action":"2","msgtype":"2","roomnum":"' +
                  roomnumq +
                  '","lwcount":"' +
                  lwcount +
                  '",}]}';

                _this.clickButton(msg2);
              } else {
                var msg =
                  '{"retcode":"000000","retmsg":"ok","msg":[{"_method_":"testlink","action":"10","msgtype":"10","roomnum":"' +
                  roomnumq +
                  '","lwcount":"' +
                  lwcount +
                  '",}]}';
                _this.clickButton(msg);
                var msg2 =
                  '{"retcode":"000000","retmsg":"ok","msg":[{"_method_":"testlink","action":"2","msgtype":"2","roomnum":"' +
                  roomnumb +
                  '","lwcount":"' +
                  lwcount +
                  '",}]}';
                _this.clickButton(msg2);
              }
            }
          } else {
            _this.showM(dat.msg);
          }
        });
    },
    showM: function(o) {
      Toast({
        message: o,
        iconClass: "icon icon-success",
        className: "backColor",
        duration: 1000
      });
    },
    sHeight() {
      return "height:" + this.wrapperHeight + "px";
    },
    styleObj(o) {
      return 'background:url("' + o + '") center no-repeat;';
    },
    getPerson(o) {
      var _this = this;
      this.axios.get(api.person).then(function(res) {
        //_this.$root.login(res.data.state)
        var dat = res.data;
        _this.$root.login(dat.state);
        if (dat.state == 0) {
          _this.name = dat.content.user_info.user_nicename;
          _this.level = dat.content.user_info.level;
          _this.avatar = dat.content.user_info.avatar;
          _this.uid = dat.content.user_info.id;
          _this.liangname = dat.content.user_info.liang.name;
          _this.guizu = dat.content.user_info.noble.name;
          _this.locKcoin = dat.content.user_info.coin;

          try {
            return o("v");
          } catch (e) {
            //TODO handle the exception
            //console.log(e)
          }
        } else {
          _this.showM(dat.msg);
        }
      });
    },
    getGift() {
      var _this = this;
      this.axios.get(api.person).then(function(res) {
        //_this.$root.login(res.data.state)
        var dat = res.data;
        _this.$root.login(dat.state);
        if (dat.state == 0) {
          _this.flag = true;
          _this.locKcoin = dat.content.user_info.coin;
        } else {
          _this.showM(dat.msg);
        }
      });
    },
    showRouter(o) {
      // console.log(o)
      this.$router.push({
        path: "/show",
        query: {
          id: o
        }
      });
    },
    goRouter(o) {
      this.$router.push({
        path: o
      });
    },
    selectGift(i, d) {
      this.IndexNum = i;
      this.giftname = d.giftname;
      this.giftimg = d.gifticon;
      this.giftid = d.id;
      //this.SendGift()
    },
    Send() {
      new Promise((resolve, reject) => {
        this.getPerson(resolve);
      }).then(e => {
        if (this.valueInfo.length > 30) {
          this.showM("发送信息不得超过30字！");
          return;
        }
        if (this.valueInfo.length < 1) {
          return;
        }
        this.shieldtext();
      });
    },
    shieldtext() {
      var _this = this;
      var json = { msg: this.valueInfo, stream: _this.liveCt.stream };
      this.axios
        .post(api.index_shield_msg_content, this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 0) {
            _this.valueInfo = dat.content;
            var msg =
              '{"msg":[{"_method_":"SendMsg","action":0,"ct":"' +
              _this.valueInfo +
              '","msgtype":"2","tougood":"","touid":"","touname":"","ugood":"' +
              _this.uid +
              '","uid":"' +
              _this.uid +
              '","uname":"' +
              _this.name +
              '","level":"' +
              _this.level +
              '","vip_type":"0","liangname":"' +
              _this.liangname +
              '","guizu":"' +
              _this.guizu +
              '"}],"retcode":"000000","retmsg":"OK"}';
            _this.clickButton(msg);
            _this.valueInfo = "";
          } else {
            _this.showM(dat.msg);
          }
        });
    },
    infoChange() {
      this.$refs.send.style.display = "block";
    },
    getHeight() {
      var Height = document.documentElement.clientHeight;
      console.log("width:100%;" + Height + "px");
      return "width:100%;height:" + Height + "px";
    },
    inituser(o) {
      var _this = this;
      this.axios.get(api.setNodeInfo + "?liveuid=" + o).then(function(res) {
        // console.log(res.data)
        if (res.data.state == 0) {
          if (res.data.userinfo.userType != 0) {
            _this.$socket.emit("conn", {
              uid: res.data.userinfo.id,
              roomnum: res.data.userinfo.roomnum,
              stream: _this.liveCt.stream,
              nickname: res.data.userinfo.user_nicename,
              equipment: "pc",
              token: res.data.userinfo.token,
              liangname: res.data.userinfo.liang.name,
              guizu: res.data.userinfo.noble.name
            });
          } else {
            _this.$socket.emit("conn", {
              uid: res.data.userinfo.id,
              roomnum: res.data.userinfo.roomnum,
              stream: _this.liveCt.stream,
              nickname: res.data.userinfo.user_nicename,
              equipment: "pc",
              token: res.data.userinfo.token,
              liangname: "",
              guizu: ""
            });
          }
        }
      });
    },
    getcat() {
      var _this = this;
      var json = { roomnum: this.videoUrl };
      this.axios
        .post(api.home + "?" + this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 0) {
            _this.catdog = dat.content.show_total_contribution;
          }
        });
    },
    getis_attention() {
      var _this = this;
      var json = { roomnum: this.videoUrl };
      this.axios
        .post(api.home + "?" + this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 0) {
            _this.is_attention = dat.content.is_attention;
            console.log(_this.is_attention);
          }
        });
    },
    getpython() {
      var _this = this;
      var json = { roomnum: this.videoUrl };
      this.axios
        .post(api.home + "?" + this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 0) {
            _this.catperson = dat.content.liveinfo.audience_num;
          }
        });
    },
    getHome() {
      var _this = this;
      var json = { roomnum: this.videoUrl };
      this.axios
        .post(api.home + "?" + this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 0) {
            // _this.LinkRouter(dat.content.hls);
            _this.liveCt = dat.content.liveinfo;
            _this.content = dat.content;
            _this.hls = dat.content.hls + "?shp_identify=302";
            _this.gift = dat.content.gift_list;
            _this.giftname = dat.content.gift_list[0].giftname;
            _this.giftid = dat.content.gift_list[0].id;
            _this.inituser(dat.content.liveinfo.uid);
            _this.catdog = dat.content.show_total_contribution;
            _this.catperson = dat.content.liveinfo.audience_num;
            _this.fity_length =
              dat.content.gift_list.length % 8 == 0
                ? dat.content.gift_list.length / 8
                : Math.ceil(dat.content.gift_list.length / 8);
            _this.islive = dat.content.liveinfo.islive;

            if (_this.islive === 0) _this.arrkuty({ id: _this.videoUrl });
          } else if (dat.state == 20) {
            _this.showM(dat.msg);
            _this.goRouter("/");
          } else {
            _this.showM(dat.msg);
          }
          if (!_this.pkflag) {
            _this.$refs.html5player.style.display = "block";
          }
        });
    },
    Follow() {
      var _this = this;
      var json = { page: 1, length: 4 };
      this.axios
        .post(api.attention, this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          //_this.$root.login(dat.state)
          if (dat.state == 0) {
            _this.arr_my_attention = res.data.content.arr_my_attention;
          } else {
            _this.showM(dat.msg);
          }
        });
    },
    setFollow(o) {
      var _this = this;
      var json = { touid: o };
      this.axios
        .post(api.give_attention, this.$qs.stringify(json))
        .then(function(res) {
          _this.$root.login(res.data.state);
          var dat = res.data;
          if (dat.state == 0) {
            //_this.getHome()
            _this.getis_attention();
          } else {
            _this.showM(dat.msg);
          }
        });
    },
    openConfirm(o) {
      var _this = this;
      MessageBox.confirm("确定取消关注?", "提示").then(value => {
        if (value) {
          _this.closeFollow(o);
        }
      });
    },
    closeFollow(o) {
      var _this = this;
      var json = { touid: o };
      this.axios
        .post(api.cancel_attention, this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          _this.$root.login(res.data.state);
          _this.getHome();
        });
    }
  }
};
</script>

<style type="text/css" scoped="scoped" lang="less">
.pkstart {
  width: 2.1rem;
  position: absolute;
  z-index: 10;
  top: 3rem;
  left: 0.2rem;
  text-align: center;
  span {
    width: 1.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    border-radius: 0.3rem;
    display: inline-block;
    background: rgba(0, 0, 0, 0.5);
    font-size: 0.28rem;
    color: #fff;
  }
  img {
    width: 2.1rem;
    margin-top: 0.05rem;
  }
  .pks1 {
    position: absolute;
    z-index: 11;
    top: 0.85rem;
    overflow: hidden;
    img {
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 50%;
      object-fit: cover;
      vertical-align: middle;
      margin-left: 0.2rem;
    }
    i {
      font-size: 0.28rem;
      margin-left: 0.1rem;
    }
    p {
      font-size: 0.28rem;
      text-align: left;
      padding-left: 0.2rem;
      line-height: 0.55rem;
      height: 0.55rem;
      img {
        width: 0.4rem;
        vertical-align: middle;
        margin-left: 0;
        margin-top: -0.05rem;
      }
    }
  }
  .pks2 {
    top: 2.8rem;
    img {
      margin-left: 0.2rem;
    }
  }
}
.pk {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 14;
  img {
    width: 100%;
    margin-top: 3rem;
  }
  .pk1 {
    position: absolute;
    top: 4.85rem;
    left: 0.8rem;
    img {
      width: 1rem;
      float: left;
      border-radius: 50%;
      object-fit: cover;
      margin-top: 0;
    }
    p {
      float: left;
      width: 2.5rem;
      overflow: hidden;
      font-size: 0.28rem;
      margin-left: 0.2rem;
      i {
        display: block;
      }
    }
  }
  .pk2 {
    left: 2.6rem;
    top: 6.5rem;
    img {
      float: right;
      margin-left: 0.2rem;
    }
    p {
      float: right;
      margin-left: 0;
      text-align: right;
    }
  }
}
.left-scroll {
  width: 100%;
  position: fixed;
  z-index: 300;
  left: 0;
  top: 1.8rem;
  overflow-x: scroll;
  .ul-scroll {
    width: 100000000000px;
  }
  .d1 {
    float: right;
  }
  .d2 {
    float: left;
  }
  .demo {
    width: 7.5rem;
    height: 0.6rem;
    float: right;
    margin-right: -100%;
    overflow: hidden;
  }
  .ul-li {
    overflow: hidden;
    width: 7.5rem;
    height: 0.6rem;
    padding: 0 0.2rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;
    overflow: hidden;
    span {
      display: inline-block;
      width: 0.8rem;
      float: left;
      img {
        width: 100%;
        vertical-align: middle;
      }
    }
    span.s2 {
      width: 0.45rem;
      margin-right: 0.1rem;
    }
    span.s3 {
      width: 0.9rem;
      margin-right: 0.1rem;
    }
    p {
      font-size: 0.28rem;
      color: #fff;
      float: left;
      margin-top: 0.1rem;
      margin-left: 0.1rem;
      i {
        color: greenyellow;
      }
    }
  }
}
.mint-swipe {
  height: 160px;
}
.top_banner {
  left: 3%;
  z-index: 3;
}
.video_status {
  top: 50px;
  left: 3%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 3;
}
.video_status.video_status_living:before {
  display: none;
}
.video_status.video_status_living {
  width: 100px;
}
.closegif {
  background: url("../../static/img/ic_room_btn_close_pressed.png");
  background-size: cover;
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  float: right;
  margin-right: 0.2rem;
}
.input {
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 0;
  input {
    width: 5.4rem;
    padding-left: 0.5rem;
    height: 1rem;
    background: rgba(0, 0, 0, 0.5);
    float: left;
    display: block;
    color: #fff;
  }
  input::-moz-placeholder {
    color: #fff;
  }
  input::-ms-input-placeholder {
    color: #fff;
  }
  input::-webkit-input-placeholder {
    color: #fff;
  }
  button {
    display: block;
    border: 0 none;
    width: 1.6rem;
    height: 1rem;
    background: #b94cff;
    float: left;
    color: #fff;
    outline: 0;
  }
}
@import "../../static/css/style.css";
.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.45);
  font-size: 3.5em;
  border-radius: 50%;
  height: 2em !important;
  line-height: 2em !important;
  margin-top: -1em !important;
  width: 2em;
}
@font-face {
  font-family: "iconfont"; /* project id 862104 */
  src: url("//at.alicdn.com/t/font_862104_38x7fxwclud.eot");
  src: url("//at.alicdn.com/t/font_862104_38x7fxwclud.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_862104_38x7fxwclud.woff") format("woff"),
    url("//at.alicdn.com/t/font_862104_38x7fxwclud.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_862104_38x7fxwclud.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.mint-tab-container-item {
  .mysql {
    p {
      padding: 0 0.2rem;
      font-size: 0.34rem;
      color: #2c2c2c;
      margin-top: 0.35rem;
    }
  }
  .con_live {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  section {
    padding: 0.2rem 0.2rem;
    border-bottom: 1px solid #f3f3f3;
    span.t1 {
      display: block;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      overflow: hidden;
      float: left;
      background-size: cover !important;
    }
    div.t2 {
      float: left;
      padding-left: 0.3rem;
      i {
        font-size: 0.28rem;
        color: #2c2c2c;
        display: block;
      }
      em {
        font-size: 0.22rem;
        color: #0086ff;
        display: block;
        span {
          color: #ccc;
        }
        img {
          width: 0.18rem;
          vertical-align: middle;
          margin-top: -0.05rem;
          margin-left: 0.3rem;
        }
      }
    }
    div.t3 {
      width: 1rem;
      height: 0.4rem;
      line-height: 0.45rem;
      background: #a2a2a2;
      border-radius: 0.1rem;
      color: #fff;
      font-size: 0.26rem;
      text-align: center;
      float: right;
      margin-top: 0.1rem;
    }
    p {
      color: #8d8d8d;
      font-size: 0.22rem;
      margin-top: 0.1rem;
    }
  }
}
.page-tab-container {
}
.text_div {
  ul {
    padding: 0 0.2rem;
    padding-bottom: 1.8rem;
    li {
      padding: 0.05rem 0;
      span {
        display: inline-block;
        width: 0.8rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        background: #eec186;
        color: #fff;
        font-size: 0.24rem;
        /*-webkit-text-stroke: 0.01rem red;*/
        color: #fff;
        border-radius: 0.1rem;
        img {
          width: 0.3rem;
          vertical-align: middle;
        }
      }
      i {
        font-size: 0.28rem;
        color: #bbb;
      }
      em {
        font-size: 0.28rem;
        color: #2c2c2c;
      }
    }
    li.system_li {
      font-size: 0.28rem !important;
      color: #666;
      span {
        font-size: 0.28rem !important;
        display: inline;
        color: #0086ff;
        background: transparent;
        font-weight: bold;
        border-radius: 0;
      }
    }
  }
}
.c-operate-iconGift {
  background: url(../../static/img/lw.png) 50% no-repeat;
}
.header {
  width: 7.1rem;
  margin: 0 auto;
  height: 1rem;
  line-height: 1rem;
  img {
    width: 35%;
    vertical-align: middle;
  }
  a:last-child {
    display: block;
    float: right;
    width: 1.6rem;
    height: 0.5rem;
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.28rem;
    color: #333;
    margin-top: 0.23rem;
  }
}
// x-pk start
.x-pk {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: block;
  background: #000;
  .pk-content {
    position: absolute;
    top: 14%;
    right: 0;
    bottom: 36%;
    left: 0;
    background: #fff;
    .blood-bar {
      font-size: 0;
      height: 0.5rem;
      color: #fff;
      .blood {
        height: 100%;
        line-height: 0.5rem;
        display: inline-block;
        font-size: 0.3rem;
      }
      .blood-l {
        background-image: linear-gradient(to right, #f42f4e, #f33be0);
        text-align: left;
        span {
          display: inline-block;
          margin-left: 0.2rem;
        }
      }
      .blood-r {
        background-image: linear-gradient(to right, #7de0ff, #636bff);
        text-align: right;
        span {
          display: inline-block;
          margin-right: 0.2rem;
        }
      }
    }
  }
}
// x-pk end
#live {
  position: relative;
}
video {
  position: absolute;
  width: 100%;
  height: 100%;
}
.video {
  position: absolute;
  z-index: 1;
}
.content {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 35px;
  color: red;
  z-index: 10000;
}

.item {
  display: inline-block;
}

.nav {
  padding: 0;
  border-bottom: 1px solid #eee;
  text-align: center;
  overflow: hidden;
}
.link {
  color: inherit;
  padding: 20px;
  display: block;
}
.tab-bu {
  background-color: #fff !important;
  border: 0 none;
  box-shadow: none;
  padding: 0;
  width: 50%;
  float: left;
  text-align: center;
  color: #333;
  position: relative;
  box-sizing: border-box;
}
.tab-bued {
  color: #0086ff;
}
.tab-bued::after {
  opacity: 1 !important;
}
.tab-bu::after {
  display: inline-block;
  position: absolute;
  content: " ";
  width: 15px;
  height: 3px;
  background-color: #0086ff;
  bottom: 0 !important;
  left: 50%;
  top: initial;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  transform: translateX(-50%);
}
//发送弹幕
.c-operate {
  position: fixed;
  bottom: 0;
  height: 42px;
  width: 100%;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
  border-top: 1px solid #eee;
  z-index: 7;
}

.c-operate .c-operate-sub {
  float: left;
}

.c-operate .c-operate-input-wrap {
  position: relative;
  width: 83%;
  height: 32px;
  margin: 5px 0 0 10px;
  background-color: #f7f7f7;
}

.c-operate .c-operate-input-wrap .c-operate-input {
  height: 100%;
  width: 100%;
  padding: 0 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  border: none;
  font-size: 12px;
  background: transparent;
}

.c-operate .c-operate-input-wrap .c-operate-input::-webkit-input-placeholder {
  color: #ddd;
}

.c-operate .c-operate-input-wrap .msgTip {
  position: absolute;
  left: 0;
  top: 0;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  line-height: 32px;
  font-size: 14px;
  color: #f70;
}

.c-operate .c-operate-input-wrap .c-operate-sendBtn {
  display: none;
  position: absolute;
  top: 4.5px;
  right: 4.5px;
  width: 45px;
  height: 23px;
  line-height: 23px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ff4e00),
    to(#ff8b00)
  );
  background-image: -webkit-linear-gradient(left, #ff4e00, #ff8b00);
  background-image: -moz-linear-gradient(left, #ff4e00 0, #ff8b00);
  background-image: -o-linear-gradient(left, #ff4e00 0, #ff8b00);
  background-image: linear-gradient(90deg, #ff4e00 0, #ff8b00);
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}

.c-operate .c-operate-input-wrap .c-operate-sendBtn.unvaild {
  background-color: #bcc3cf;
  background-image: none;
}

.c-operate .c-operate-iconCharge {
  display: none;
  margin: 5px 0 0 7px;
  background: url() 50% no-repeat;
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
}

.c-operate .c-operate-iconCharge,
.c-operate .c-operate-iconGift {
  width: 32px;
  box-sizing: border-box;
  height: 32px;
  -webkit-border-radius: 32px;
  -moz-border-radius: 32px;
  border-radius: 32px;
}

.c-operate .c-operate-iconGift {
  margin: 5px 0 0 9px;
  -moz-background-size: 100% 100% !important;
  background-size: 100% 100% !important;
}
.text_dm {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .text_div {
    height: 100%;
    width: 100%;
    position: absolute;
    overflow-y: scroll;
  }
}

.GiftPanel {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 202px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  -webkit-box-shadow: 0 0 13px #ccc;
  -moz-box-shadow: 0 0 13px #ccc;
  box-shadow: 0 0 13px #ccc;
}

.GiftPanel .GiftPanel-content {
  width: 100%;
  height: 160px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.GiftPanel .GiftPanel-content .GiftItem {
  float: left;
  width: 25%;
  height: 80px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.GiftPanel .GiftPanel-content .GiftItem.selected {
  border: 2px solid #f70;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}

.GiftPanel .GiftPanel-content .GiftItem .GiftItem-icon {
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
}

.GiftPanel .GiftPanel-content .GiftItem .GiftItem-no-icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
  background: url() no-repeat;
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
}

.GiftPanel .GiftPanel-content .GiftItem .GiftItem-name {
  color: #fff;
  font-size: 12px;
}

.GiftPanel .GiftPanel-content .GiftItem .GiftItem-worth {
  color: #fff;
  font-size: 10px;
  margin-top: 6px;
}

.GiftPanel .GiftPanel-footer {
  position: relative;
  width: 100%;
  border-top: 1px solid #ddd;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.GiftPanel .GiftPanel-footer .balance {
  float: left;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 42px;
}

.GiftPanel .GiftPanel-footer .balance i {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("../../static/img/p7.png") no-repeat;
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  margin-left: 5px;
  margin-right: 4px;
}

.GiftPanel .GiftPanel-footer .balance span {
  font-size: 13px;
  color: #fff;
}

.GiftPanel .GiftPanel-footer .btn-charge {
  float: left;
  line-height: 42px;
  color: #f70;
  margin-left: 5px;
  font-size: 14px;
}

.GiftPanel .GiftPanel-footer .btn-gz {
  float: left;
  width: 45px;
  line-height: 42px;
  color: #f70;
  font-size: 14px;
  img {
    width: 100%;
    margin-top: 12px;
  }
}
@media screen and (min-width: 340px) {
  .GiftPanel .GiftPanel-footer .btn-gz {
    margin-left: 10px;
    img {
      width: 100%;
      margin-top: 12px;
    }
  }
}
.GiftPanel .GiftPanel-footer .select_num {
  width: 70px;
  height: 42px;
  line-height: 42px;
  box-sizing: border-box;
  float: left;
  text-align: center;
  border: 2px solid #ffa200;
  font-size: 14px;
  em {
    display: inline-block;
    width: 18px;
    margin-left: 0.1rem;
    img {
      width: 100%;
      margin-top: 13px;
    }
  }
}
.GiftPanel .GiftPanel-footer .btn-send {
  position: absolute;
  right: 0;
  top: -1px;
  width: 139.5px;
  span {
    display: block;
    width: 69.5px;
    float: left;
    height: 42px;
    line-height: 42px;
    text-align: center;
    background-color: #ffa200;
    background-image: none;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
}

.GiftPanel .GiftPanel-footer .btn-send .vaild {
  background-color: #ffa200;
  color: #fff;
}

.GiftPanel .GiftPanel-footer .btn-send .flask_model {
  position: absolute;
  right: 30px;
  z-index: 220;
  bottom: 42px;
  width: 150px;
  background: rgba(0, 0, 0, 0.8);
  p {
    font-size: 14px;
    height: 35px;
    line-height: 35px;
    overflow: hidden;
    text-align: center;
    i {
      float: left;
      color: #ffa200;
      width: 50px;
      height: 35px;
      display: block;
      line-height: 35px;
    }
    em {
      float: right;
      color: #ccc;
      display: block;
      width: 80px;
      height: 35px;
      line-height: 35px;
    }
  }
}

.flask_site {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 219;
}
//礼物
.Banner {
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  -webkit-transform: translateX(-150%) translateY(0);
  -moz-transform: translateX(-150%) translateY(0);
  -ms-transform: translateX(-150%) translateY(0);
  -o-transform: translateX(-150%) translateY(0);
  transform: translateX(-150%) translateY(0);
}

.Banner.active {
  -webkit-animation: h 0.5s ease-in-out;
  -moz-animation: h 0.5s ease-in-out;
  -o-animation: h 0.5s ease-in-out;
  animation: h 0.5s ease-in-out;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.Banner .Banner-gift {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

@-moz-keyframes h {
  0% {
    -moz-transform: translateX(-150%) translateY(0);
    transform: translateX(-150%) translateY(0);
  }

  to {
    -moz-transform: translateX(0) translateY(0);
    transform: translateX(0) translateY(0);
  }
}

@-o-keyframes h {
  0% {
    -o-transform: translateX(-150%) translateY(0);
    transform: translateX(-150%) translateY(0);
  }

  to {
    -o-transform: translateX(0) translateY(0);
    transform: translateX(0) translateY(0);
  }
}

@keyframes h {
  0% {
    -webkit-transform: translateX(-150%) translateY(0);
    -moz-transform: translateX(-150%) translateY(0);
    -o-transform: translateX(-150%) translateY(0);
    transform: translateX(-150%) translateY(0);
  }

  to {
    -webkit-transform: translateX(0) translateY(0);
    -moz-transform: translateX(0) translateY(0);
    -o-transform: translateX(0) translateY(0);
    transform: translateX(0) translateY(0);
  }
}

@-webkit-keyframes i {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  20% {
    -webkit-transform: scale(1.7);
    transform: scale(1.7);
  }

  to {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@-moz-keyframes i {
  0% {
    -moz-transform: scale(1);
    transform: scale(1);
  }

  20% {
    -moz-transform: scale(1.7);
    transform: scale(1.7);
  }

  to {
    -moz-transform: scale(1);
    transform: scale(1);
  }
}

@-o-keyframes i {
  0% {
    -o-transform: scale(1);
    transform: scale(1);
  }

  20% {
    -o-transform: scale(1.7);
    transform: scale(1.7);
  }

  to {
    -o-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes i {
  0% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }

  20% {
    -webkit-transform: scale(1.7);
    -moz-transform: scale(1.7);
    -o-transform: scale(1.7);
    transform: scale(1.7);
  }

  to {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
}

#live-list {
  box-sizing: border-box;
  padding-bottom: 58px;
  overflow: hidden;
  margin-top: 0.2rem;
  padding: 0 0.2rem;
  li {
    width: 49.75%;
    float: left;
    box-sizing: border-box;
    margin-top: 0.5%;
    position: relative;
    height: 4.5rem;
    background-size: cover !important;
    img {
      width: 100%;
    }
    p {
      width: 1.2rem;
      position: absolute;
      left: 0;
      top: 0;
      img {
        width: 100%;
      }
    }
  }
  li:nth-of-type(even) {
    margin-left: 0.5%;
  }
}
.h-info {
  width: 100%;
  height: 25px;
  line-height: 25px;
  position: absolute;
  left: 0;
  bottom: 0;
  span {
    display: inline;
  }
  .fans {
    font-size: 12px;
    color: #fff;
    font-weight: bold;
    padding-left: 5px;
  }
  .live-icon {
    font-size: 12px;
    color: #fff;
    float: right;
    padding-right: 5px;
  }
}
.swf {
  position: absolute;
  width: 7.5rem;
  top: 0;
  z-index: 1;
  img {
    width: 100%;
    vertical-align: middle;
  }
}

.custom {
  width: 2.6rem;
  height: 1rem;
  position: absolute;
  top: 0.18rem;
  left: 3.3rem;
  /*border:1px solid #fff;*/
  overflow-x: scroll;
  z-index: 3;
  .scroll {
    width: 19.5rem;
    overflow: hidden;
  }
  span {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    float: left;
    border-radius: 50%;
    margin-top: 0.06rem;
    margin-left: 0.1rem;
    background-size: cover !important;
  }
}
.person_number {
  width: 1.3rem;
  height: 0.65rem;
  line-height: 0.65rem;
  float: left;
  color: #fff;
  border-radius: 0.3rem;
  position: absolute;
  top: 0.32rem;
  right: 0.2rem;
  text-align: center;
  font-size: 0.28rem;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
}
.chat_gift {
  background: url("../../static/img/lw.png") !important;
  background-size: cover !important;
  margin-left: 2rem !important;
}
.chat_banner .chat_gift:after {
  background: transparent !important;
}
</style>


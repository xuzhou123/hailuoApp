<template>
  <div class="open" id="pusher">
    <header>
      <span>
        <img @click="closegif()" src="../../static/img/close2.png" alt />
      </span>
      <em>
        <img @click="selectcamor()" src="../../static/img/open4.png" alt />
      </em>
      <!--<i><img src="../../static/img/dingw.png" alt="">&nbsp;合肥市</i>-->
    </header>
    <div class="content">
      <p>直播频道</p>
      <div>
        <i>
          <img src="../../static/img/open5.png" alt />
        </i>
        <textarea ref="textkp" maxlength="30" v-model="texttitle" placeholder="一个好的标题才能吸引更多观众哦！"></textarea>
      </div>
    </div>

    <div class="footer">
      <img @click="pkk=true" src="../../static/img/open3.png" alt />
      <mt-button class="buttonpass" @click="visible=true"  type="danger">密码设置</mt-button>
      <mt-button class="buttonpass" @click="getPerson()" type="primary">开始直播</mt-button>

      <!-- <img  @click="getPerson()" src="../../static/img/open1.png" alt=""> -->
    </div>
    <div class="model_pkk" v-if="pkk" @click="saveFace()"></div>
    <div class="model_page" v-if="pkk">
      <p>美颜</p>
      <div>
        <span>美&nbsp;&nbsp;&nbsp;&nbsp;白</span>
        <i>
          <mt-range v-model="beautyWhite" :min="1" :max="100" :bar-height="2"></mt-range>
        </i>
      </div>
      <div>
        <span>磨&nbsp;&nbsp;&nbsp;&nbsp;皮</span>
        <i>
          <mt-range v-model="beautyBuffing" :min="1" :max="100" :bar-height="2"></mt-range>
        </i>
      </div>
      <div>
        <span>红&nbsp;&nbsp;&nbsp;&nbsp;润</span>
        <i>
          <mt-range v-model="beautyRuddy" :min="1" :max="100" :bar-height="2"></mt-range>
        </i>
      </div>
      <div>
        <span>瘦&nbsp;&nbsp;&nbsp;&nbsp;脸</span>
        <i>
          <mt-range v-model="beautyCheekPink" :min="1" :max="100" :bar-height="2"></mt-range>
        </i>
      </div>
      <div>
        <span>收下巴</span>
        <i>
          <mt-range v-model="beautyThinFace" :min="1" :max="100" :bar-height="2"></mt-range>
        </i>
      </div>

      <div>
        <span>腮红度</span>
        <i>
          <mt-range v-model="beautyShortenFace" :min="1" :max="100" :bar-height="2"></mt-range>
        </i>
      </div>

      <div>
        <span>大&nbsp;&nbsp;&nbsp;&nbsp;眼</span>
        <i>
          <mt-range v-model="beautyBigEye" :min="1" :max="100" :bar-height="2"></mt-range>
        </i>
      </div>
    </div>
    <password-modal @passNum="setPassword" :visible.sync="visible"></password-modal>
  </div>
</template>

<script>
import { Range, Toast } from "mint-ui";
import apiy from "@/constant/api";
import passwordModal from "./password-modal";

export default {
  data() {
    return {
      bstart: false,
      pusher: null,
      pkk: false,
      texttitle: "",
      stream: "",
      videourl: "",
      user_id: "",
      type: 0,
      beautyWhite: 1, //美白
      beautyBuffing: 1, //磨皮
      beautyRuddy: 1, //红润
      beautyCheekPink: 1, //瘦脸
      beautyThinFace: 1, //收下巴
      beautyShortenFace: 1, //腮红
      beautyBigEye: 1, //大眼
      visible:false
    };
  },
  mounted() {
    var _this = this;
    setTimeout(function() {
      _this.getFace();
    }, 300);
  },
  watch: {
    beautyWhite: function(val, oldVal) {
      //alert(oldVal)
      this.beautyWhite1(val);
    },
    beautyBuffing: function(val, oldVal) {
      //alert(val)
      this.beautyBuffing1(val);
    },
    beautyRuddy: function(val, oldVal) {
      this.beautyRuddy1(val);
    },
    beautyCheekPink: function(val, oldVal) {
      this.beautyCheekPink1(val);
    },
    beautyThinFace: function(val, oldVal) {
      this.beautyThinFace1(val);
    },
    beautyShortenFace: function(val, oldVal) {
      this.beautyShortenFace1(val);
    },
    beautyBigEye: function(val, oldVal) {
      this.beautyBigEye1(val);
    }
  },
  methods: {
    getFace() {
      var _this = this;
      this.axios.get(apiy.live_get_beauty_params).then(function(res) {
        var dat = res.data;
        //alert('获取'+JSON.stringify(dat))
        if (dat.state == 0) {
          _this.beautyWhite = dat.content.white; //美白
          _this.beautyBuffing = dat.content.buffing; //磨皮
          _this.beautyRuddy = dat.content.ruddy; //红润
          _this.beautyCheekPink = dat.content.cheek_pink; //瘦脸
          _this.beautyThinFace = dat.content.thin_face; //收下巴
          _this.beautyShortenFace = dat.content.shorten_face; //腮红
          _this.beautyBigEye = dat.content.big_eye; //大眼
          /* _this.beautyWhite1(dat.content.white);
		                 _this.beautyBuffing1(dat.content.buffing);
		                 _this.beautyRuddy1(dat.content.ruddy);
		                 _this.beautyCheekPink1(dat.content.cheek_pink);
		                 _this.beautyThinFace1(dat.content.thin_face);
		                 _this.beautyShortenFace1(dat.content.shorten_face);
		                 _this.beautyBigEye1(dat.content.big_eye);*/
        }
        // _this.live=res.data.content.show_list
      });
    },
    saveFace() {
      var _this = this;
      var json = {
        white: this.beautyWhite, //美白
        buffing: this.beautyBuffing, //磨皮
        ruddy: this.beautyRuddy, //红润
        cheek_pink: this.beautyCheekPink, //瘦脸
        thin_face: this.beautyThinFace, //收下巴
        shorten_face: this.beautyShortenFace, //腮红
        big_eye: this.beautyBigEye //大眼
      };
      this.axios
        .post(apiy.live_set_beauty_params, this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;

          //alert('设置'+JSON.stringify(dat))
          if (dat.state == 0) {
          }
          // _this.live=res.data.content.show_list
        });
      this.pkk = false;
    },
    closegif() {
      this.sendInfo("close", { key: "" });
    },
    LinkRouter(o) {
      this.$router.push({
        path: o
      });
    },
    selectcamor() {
      this.sendInfo("switchCamera", { key: "" });
    },
    call(o) {
      this.sendInfo("beauty", { key: o });
    },
    beautyWhite1(o) {
      this.sendInfo("beautyWhite", { key: o });
    },
    beautyBuffing1(o) {
      this.sendInfo("beautyBuffing", { key: o });
    },

    beautyRuddy1(o) {
      this.sendInfo("beautyRuddy", { key: o });
    },

    beautyCheekPink1(o) {
      this.sendInfo("beautyCheekPink", { key: o });
    },

    beautyThinFace1(o) {
      this.sendInfo("beautyThinFace", { key: o });
    },
    beautyShortenFace1(o) {
      this.sendInfo("beautyShortenFace", { key: o });
    },
    beautyBigEye1(o) {
      this.sendInfo("beautyBigEye", { key: o });
    },
    startvideo(o) {
      this.sendInfo("start", { key: this.user_id });
    },
    sendInfo(t, o) {
      api.sendEvent({
        name: t,
        extra: o
      });
    },
    getPerson() {
      var _this = this;
      if (this.texttitle == "" || this.texttitle == undefined) {
        this.showM("请填写直播标题！");
        return false;
      }
      this.$refs.textkp.blur();

      setTimeout(function() {
        _this.sendInfo("title", { key: _this.texttitle });
        _this.axios.get(apiy.person).then(function(res) {
          _this.$root.login(res.data.state);
          var dat = res.data;
          //_this.$root.login(dat.state)
          if (dat.state == 0) {
            _this.user_id = dat.content.user_info.id;
            _this.LinkRouter("/alive?id=" + dat.content.user_info.id);
          } else {
            _this.showM(dat.msg);
          }
        });
      }, 100);
    },
    showM(o) {
      // this.$root.Hub.$emit('child',{msg:o,flag:true});
      Toast({
        message: o,
        iconClass: "icon icon-success",
        className: "backColor",
        duration: 1000
      });
    },
    setPassword(val){
        this.sendInfo("password", { key: val});
    }
  },
  components:{
      passwordModal
  }
};
</script>

<style scoped lang="less">
.open {
  background: transparent;
  position: fixed;
  top: 0;
  width: 7.5rem;
  height: 100%;
  header {
    overflow: hidden;
    padding: 0.2rem 0.2rem;
    span,
    em,
    i {
      display: block;
      width: 0.48rem;
      height: 0.48rem;
      line-height: 0.48rem;
      float: left;
      img {
        width: 100%;
        margin-top: 0rem;
      }
    }
    em {
      float: right;
    }
    i {
      width: 2rem;
      height: 0.48rem;
      float: right;
      font-size: 0.34rem;
      color: #fff;
      img {
        width: 0.48rem;
      }
    }
  }
  .content {
    width: 5.7rem;
    height: 3rem;
    margin: 0 auto;
    margin-top: 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.2rem;
    padding: 0 0.4rem;
    overflow: hidden;
    p {
      font-size: 0.3rem;
      color: #fff;
      margin-top: 0.3rem;
    }
    div {
      margin-top: 0.3rem;
      i {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        float: left;
        img {
          width: 100%;
        }
      }
      textarea {
        width: 3.7rem;
        height: 1.5rem;
        font-size: 0.34rem;
        color: #fff;
        float: left;
        margin-left: 0.45rem;
        background: transparent;
        line-height: 0.5rem;
        border: 0;
        outline: none;
      }
      textarea::-webkit-input-placeholder {
        color: #fff;
      }
      textarea:-moz-placeholder {
        color: #fff;
      }
      textarea::-moz-placeholder {
        color: #fff;
      }
      textarea:-ms-input-placeholder {
        color: #fff;
      }
    }
  }

  .footer {
    width: 100%;
    position: absolute;
    bottom: 0.3rem;
    overflow: hidden;
    padding: 0.2rem 0;
    img {
      float: left;
    }
    img:first-child {
      width: 2.54rem;
      margin-left: 0.5rem;
    }
    img:last-child {
      width: 3.8rem;
      margin-left: 0.25rem;
    }
    .buttonpass {
      font-size: 0.34rem;
      padding: 0 0.3rem;
      float: left;
      margin-left: 0.1rem;
      height: 0.65rem;
      border-radius: 0.2rem;
    }
  }
}

.model_page {
  width: 7.1rem;
  padding: 0 0.2rem;
  height: 7rem;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  z-index: 101;
  p {
    text-align: center;
    color: #fff;
    font-size: 0.3rem;
    height: 0.6rem;
    line-height: 0.6rem;
    margin-top: 0.2rem;
  }

  div {
    color: #fff;
    font-size: 0.3rem;
    margin-bottom: 0.2rem;
    span {
      display: block;
      width: 1.5rem;
      float: left;
    }
    i {
      display: block;
      width: 5.6rem;
      float: left;
    }
  }
}
.model_pkk {
  width: 7.5rem;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  z-index: 100;
}
</style>
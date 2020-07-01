<template>
  <div class="by-pk">
    <div class="mask" v-if="show" @click="refuse"></div>
    <div class="fixed-box by-pk-container" v-if="show">
      <div class="container">
        <div class="title">礼物PK</div>
        <div class="desc">来自【相互关注】主播的PK邀请</div>
        <div class="info-box">
          <div class="info">
            <div class="avatar">
              <img :src="pkFromData.avatar" alt />
            </div>
            <div class="info-other">
              <div class="one">
                <span>{{pkFromData.user_nicename}}</span>
                <img :src="`../../static/img/op${pkFromData.level_anchor}.png`" alt />
                <img :src="`../../static/img/${pkFromData.level}.png`" alt />
              </div>
              <div class="two">
                <img src="../../static/img/nan.png" v-if="pkFromData.sex===1" alt />
                <img src="../../static/img/nv.png" v-if="pkFromData.sex===2" alt />
                <span class="audience">{{pkFromData.fans_num}}粉丝</span>
                <span class="yinlang">{{pkFromData.vote_total}}累计海螺</span>
              </div>
            </div>
          </div>
        </div>
        <div class="operate">
          <div class="refuse" @click="refuse">拒绝（{{countDownNum}}s）</div>
          <div class="shuxian"></div>
          <div class="accept" @click="accept">接受</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import api from "@/constant/api";
import { Toast } from "mint-ui";
export default {
  props: {},
  data() {
    return {
      show: false,
      liveCt: {}, // 主播的数据
      pkFromData: {}, // 发起pk人传来的数据
      countDownNum: 0, // 倒计时
      timer: null // 定时器
    };
  },
  mounted() {},
  methods: {
    init(liveCt, pkFromData) {
      clearInterval(this.timer);
      this.show = true;
      this.liveCt = liveCt;
      this.pkFromData = pkFromData;
      this.countDown();
    },
    // 倒计时
    countDown() {
      this.countDownNum = this.pkFromData.pktime;
      this.timer = setInterval(() => {
        if (this.countDownNum > 0) {
          this.countDownNum--;
        } else {
          this.isBusy();
        }
      }, 1000);
    },
    // 对方忙
    isBusy() {
      clearInterval(this.timer);
      this.show = false;

      let val = {
        retcode: "000000",
        retmsg: "ok",
        msg: [
          {
            _method_: "testlink",
            action: 7, // 1请求pk 5同意pk 6拒绝pk 7主播正在忙碌未应答 8展示PK样式 pk倒计时 9 关闭窗口
            msgtype: 10,
            roomnum: this.pkFromData.quid, // 应答方主播房间号=应答方主播id
            user_nicename: this.pkFromData.user_nicename, // 请求方主播昵称
            quid: this.pkFromData.quid, // 请求方主播id
            buid: this.pkFromData.buid, // 应答方主播id
            pktime: 6 // pk时长
          }
        ]
      };
      this.$emit("clickButton", JSON.stringify(val));
    },
    // 拒绝pk
    refuse() {
      clearInterval(this.timer);
      this.show = false;

      let val = {
        retcode: "000000",
        retmsg: "ok",
        msg: [
          {
            _method_: "testlink",
            action: 6, // 1请求pk 5同意pk 6拒绝pk 7主播正在忙碌未应答 8展示PK样式 pk倒计时 9 关闭窗口
            msgtype: 10,
            roomnum: this.pkFromData.quid, // 应答方主播房间号=应答方主播id
            user_nicename: this.pkFromData.user_nicename, // 请求方主播昵称
            quid: this.pkFromData.quid, // 请求方主播id
            buid: this.pkFromData.buid, // 应答方主播id
            pktime: 6 // pk时长
          }
        ]
      };
      this.$emit("showM", "您已拒绝了PK连麦请求");
      this.$emit("clickButton", JSON.stringify(val));
    },
    // 接受pk
    accept() {
      clearInterval(this.timer);
      this.show = false;

      const _this = this;
      let json = { quid: this.pkFromData.quid, buid: this.pkFromData.buid };
      _this.axios
        .post(api.show_agree_pk, this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 0) {
            _this.acceptSocket();
          } else {
            Toast({
              message: dat.msg
            });
          }
        });
    },
    // 同意后发送socket
    acceptSocket() {
      let val = {
        retcode: "000000",
        retmsg: "ok",
        msg: [
          {
            _method_: "testlink",
            action: 5, // 1请求pk 5同意pk 6拒绝pk 7主播正在忙碌未应答 8展示PK样式 pk倒计时 9 关闭窗口
            msgtype: 10,
            roomnum: this.pkFromData.quid, // 应答方主播房间号=应答方主播id
            user_nicename: this.pkFromData.user_nicename, // 请求方主播昵称
            quid: this.pkFromData.quid, // 请求方主播id
            buid: this.pkFromData.buid, // 应答方主播id
            pktime: 6 // pk时长
          }
        ]
      };
      this.$emit("showM", "您接受了PK连麦请求");
      this.$emit("acceptPk",this.pkFromData.quid,this.pkFromData.buid);
      this.$emit("clickButton", JSON.stringify(val));
    }
  },
  beforeDestroy() {
    //清除定时器
    clearInterval(this.timer);
    console.log("beforeDestroy");
  }
};
</script>

<style type="text/css" scoped="scoped" lang="less">
.by-pk {
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10100;
  }
  .fixed-box {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10101;
  }
  .by-pk-container {
    .container {
      position: absolute;
      width: 100%;
      background: #fff;
      bottom: 0;
      border-radius: 0.4rem 0.4rem 0 0;
      .title {
        position: relative;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        color: #000;
        font-weight: 700;
        border-bottom: 0.001rem solid #eee;
      }
      .desc {
        height: 1rem;
        line-height: 1rem;
        font-weight: 700;
        margin: 0 0.2rem;
      }
      .info-box {
        height: 2rem;
        overflow: auto;
        margin: 0 0.2rem;
        .info {
          display: flex;
          align-items: center;
          .avatar {
            flex: 0 0 1.5rem;
            height: 1.5rem;
            border: 0.05rem;
            border-radius: 0.75rem;
            border: 0.05rem solid #326aff;
            box-sizing: border-box;
            overflow: hidden;
            img {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
          }
          .info-other {
            flex: 1;
            height: 1.5rem;
            margin-left: 0.2rem;
            .one {
              height: 0.75rem;
              span {
                display: inline-block;
                max-width: 2rem;
                color: #404142;
                margin-top: 0.15rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .two {
              height: 0.75rem;
              font-size: 0.3rem;
              span {
                display: inline-block;
                margin-top: 0.15rem;
              }
              .audience {
                color: #326aff; // #E7577F
              }
              .yinlang {
                color: #8e8e8f;
              }
            }
            img {
              height: 0.45rem;
              margin-top: 0.15rem;
            }
          }
        }
      }
      .operate {
        display: flex;
        align-items: center;
        height: 1rem;
        border-top: 0.01rem solid #979797;
        .refuse {
          height: 100%;
          width: calc(50% - 0.01rem);
          color: #050505;
          text-align: center;
          line-height: 1rem;
        }
        .shuxian {
          height: 0.6rem;
          margin-top: 0.1rem;
          border-right: 0.01rem solid #979797;
        }
        .accept {
          height: 100%;
          width: calc(50% - 0.01rem);
          color: #2f6afe;
          text-align: center;
          line-height: 1rem;
        }
      }
    }
  }
}
</style>

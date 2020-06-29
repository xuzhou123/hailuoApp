<template>
  <div class="x-pk">
    <div class="pk-content">
      <!-- pk血条 -->
      <bloodBar ref="bloodBar" :pkActiveData="pkActiveData" :liveCt="liveCt" :lUid="lUid" :rUid="rUid" />
      <!-- pk画面 -->
      <div class="video-box">
        <div class="video-common video-l">
          <video
            autoplay="autoplay"
            ref="html5player"
            preload="auto"
            x5-video-player-type="h5"
            x-webkit-airplay="true"
            :poster="leftData.avatar"
            webkit-playsinline="true"
            playsinline="true"
            :src="leftData.hls"
          ></video>
          <!-- pk结果 -->
          <img class="pk-result" v-if="pk_room_data.room_state==='punish'&&pk_room_data.win_id!=lUid" src="../../static/img/fail.png" alt />
          <img class="pk-result" v-if="pk_room_data.room_state==='punish'&&pk_room_data.win_id===lUid" src="../../static/img/victory.png" alt />
        </div>
        <div class="video-common video-r">
          <video
            autoplay="autoplay"
            ref="html5player"
            preload="auto"
            x5-video-player-type="h5"
            x-webkit-airplay="true"
            :poster="rightData.avatar"
            webkit-playsinline="true"
            playsinline="true"
            :src="rightData.hls"
          ></video>
          {{rightData.hls}}
          <!-- 敌方信息 -->
          <div class="enemy">
            <div class="avatar-box">
              <img class="avatar" :src="rightData.avatar" alt />
            </div>
            <span class="name">{{rightData.user_nicename}}</span>
            <img
              class="add-follow"
              @click="setFollow(rightData.id)"
              v-if="is_attention!=1"
              src="../../static/img/add-follow.png"
              alt
            />
          </div>
          <!-- pk结果 -->
          <img class="pk-result" v-if="pk_room_data.room_state==='punish'&&pk_room_data.win_id!=rUid" src="../../static/img/fail.png" alt />
          <img class="pk-result" v-if="pk_room_data.room_state==='punish'&&pk_room_data.win_id===rUid" src="../../static/img/victory.png" alt />
        </div>
        <div class="pk-room-result" v-if="['02:59','02:58','02:57','02:56','02:55'].includes(pk_room_data.punish_stime)">
          <img v-if="pk_room_data.win_id==liveCt.uid" src="../../static/img/victory1.png" alt="">
          <img v-if="pk_room_data.win_id!=liveCt.uid" src="../../static/img/fail1.png" alt="">
        </div>
      </div>
      <!-- 贡献榜排名组件 -->
      <pkRewardList ref="pkRewardList" :pkActiveData="pkActiveData" :liveCt="liveCt" :lUid="lUid" :rUid="rUid" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import api from "@/constant/api";
import bloodBar from "@/components/bloodBar";
import pkRewardList from "@/components/pkRewardList";
export default {
  props: {
    pkActiveData: {
      type: Object,
      default: {}
    },
    liveCt: {
      type: Object,
      default: {}
    }
  },
  components: {
    pkRewardList,
    bloodBar
  },
  data() {
    return {
      is_attention: 0, // 是否关注对方主播 0 未关注 1关注
      lUid: 0,
      rUid: 0,
      leftData: {},
      rightData: {},
      pk_room_data: {} // pk数据
    };
  },
  watch: {
    pkActiveData(newVal, oldVal) {
      if (this.pkActiveData.pk_data&&this.pkActiveData.pk_data.anchor) {
        if (this.pkActiveData.pk_data.q_uid == this.liveCt.uid) {
          this.lUid = this.pkActiveData.pk_data.q_uid;
          this.rUid = this.pkActiveData.pk_data.b_uid;
          this.leftData = this.pkActiveData.pk_data.anchor.q_uid_info;
          this.rightData = this.pkActiveData.pk_data.anchor.b_uid_info;
        } else if(this.pkActiveData.pk_data.b_uid == this.liveCt.uid) {
          this.lUid = this.pkActiveData.pk_data.b_uid;
          this.rUid = this.pkActiveData.pk_data.q_uid;
          this.rightData = this.pkActiveData.pk_data.anchor.q_uid_info;
          this.leftData = this.pkActiveData.pk_data.anchor.b_uid_info;
        }
        this.pk_room_data = this.pkActiveData.pk_room_data;
        this.getis_attention(this.rightData.id);// 判断是否观众了对方主播
      }
    }
  },
  mounted() {},
  methods: {
    // 关注对方主播
    setFollow(o) {
      console.log(o);
      var _this = this;
      var json = { touid: o };
      this.axios
        .post(api.give_attention, this.$qs.stringify(json))
        .then(function(res) {
          _this.$root.login(res.data.state);
          var dat = res.data;
          if (dat.state == 0) {
            _this.getis_attention(o);
          } else {
            _this.$emit("showM", dat.msg);
          }
        });
    },
    // 判断是否关注了对方主播
    getis_attention(o) {
      var _this = this;
      var json = { roomnum: o };
      this.axios
        .post(api.home + "?" + this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 0) {
            _this.is_attention = dat.content.is_attention;
          }
        });
    }
  }
};
</script>

<style type="text/css" scoped="scoped" lang="less">
.x-pk {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: block;
  background: #000;
  .pk-content {
    position: absolute;
    top: 100px;
    right: 0;
    left: 0;
    background: #fff;
    .video-box {
      position: relative;
      height: 5rem;
      background: #ccc;
      font-size: 0;
      .video-common {
        display: inline-block;
        width: 50%;
        height: 100%;
        overflow: hidden;
      }
      .video-l {
        position: relative;
      }
      .video-r {
        position: relative;
        .enemy {
          position: absolute;
          right: 0.25rem;
          bottom: 0.25rem;
          height: 0.7rem;
          font-size: 0;
          border-radius: 0.4rem;
          background: rgba(0, 0, 0, 0.5);
          .avatar-box {
            display: inline-block;
            height: 0.56rem;
            width: 0.56rem;
            margin: 0.07rem;
            border-radius: 0.28rem;
            overflow: hidden;
            .avatar {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
          }
          .name {
            display: inline-block;
            font-size: 0.3rem;
            padding-right: 0.2rem;
            height: 0.7rem;
            line-height: 0.7rem;
            vertical-align: top;
            max-width: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .add-follow {
            height: 0.56rem;
            margin: 0.07rem;
            float: right;
          }
        }
      }
      .pk-result {
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        width: 0.8rem;
      }
      video {
        position: relative;
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
      .pk-room-result {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items:center;
        img {
          width: 2rem;
        }
      }
    }
  }
}
</style>

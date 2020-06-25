<template>
  <div class="pk-reward-list">
    <!-- 打赏前几名 -->
    <div class="top-reward">
      <div class="top-reward-box top-reward-l" @click="showRewardList('L')">
        <div class="no-reward no-reward-l" v-if="!topRewardL.length"></div>
        <ul v-if="topRewardL.length">
          <li v-for="(item, index) in topRewardL" :key="item.id">
            <div class="box">
              <img class="avatar" :src="item.avatar" alt />
              <div class="top" v-if="item.is_mvp!=1">{{index+1}}</div>
              <img class="pk-mvp" v-if="item.is_mvp==1" src="../../static/img/pk-mvp.png" alt />
            </div>
          </li>
        </ul>
      </div>
      <div class="top-reward-box top-reward-r" @click="showRewardList('R')">
        <div class="no-reward no-reward-r" v-if="!topRewardR.length"></div>
        <ul v-if="topRewardR.length">
          <li v-for="(item, index) in topRewardR" :key="item.id">
            <div class="box">
              <img class="avatar" :src="item.avatar" alt />
              <div class="top" v-if="item.is_mvp!=1">{{index+1}}</div>
              <img class="pk-mvp" v-if="item.is_mvp==1" src="../../static/img/pk-mvp.png" alt />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 贡献榜排名 弹窗 -->
    <div class="reward-list-mask" v-if="rewardListShow" @click="rewardListShow = false"></div>
    <div class="reward-list" v-if="rewardListShow">
      <div class="list-box">
        <div class="title">本场PK贡献榜</div>
        <div class="no-lists" v-if="!showData.length">
          <img src="../../static/img/no.png" alt />
          <div class="no-desc">帮助主播PK胜利，争夺MVP</div>
        </div>
        <ul class="lists" v-if="showData.length">
          <li v-for="(item,index) in showData" :key="item.id">
            <div class="index">
              <img v-if="index==0" src="../../static/img/pk-no1.png" alt />
              <img v-else-if="index==1" src="../../static/img/pk-no2.png" alt />
              <img v-else-if="index==2" src="../../static/img/pk-no3.png" alt />
              <span v-else>{{index+1}}</span>
            </div>
            <div class="avatar">
              <img :src="item.avatar" alt />
            </div>
            <div class="name">{{item.user_nicename}}</div>
            <div class="num">{{item.pk_coin_score}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import api from "@/constant/api";
export default {
  props: {
    pkActiveData: {
      type: Object,
      default: {}
    },
    liveCt: {
      type: Object,
      default: {}
    },
    lUid: {
      type: Number
    },
    rUid: {
      type: Number
    }
  },
  watch: {
    pkActiveData(newVal, oldVal) {
      if (this.pkActiveData.pk_data&&this.pkActiveData.pk_data.anchor) {
        this.initData();
      }
    }
  },
  data() {
    return {
      rewardListShow: false, // 显隐本场贡献榜弹窗
      topRewardL: [],
      topRewardR: [],
      showData: []
    };
  },
  mounted() {},
  methods: {
    initData() {
      this.topRewardL = this.pkActiveData.pk_room_topuser_data['room_'+this.lUid];
      this.topRewardR = this.pkActiveData.pk_room_topuser_data['room_'+this.rUid];
    },
    showRewardList(flag) {
      this.rewardListShow = true;
      if(flag==='L') {
        this.showData = this.topRewardL;
      } else if(flag==='R') {
        this.showData = this.topRewardR;
      }
    }
  }
};
</script>

<style type="text/css" scoped="scoped" lang="less">
.pk-reward-list {
  .top-reward {
    height: 1rem;
    background: #eee;
    font-size: 0;
    background: linear-gradient(90deg, #66172c 10%, #59204b 30%, #2148d5 90%);
    .top-reward-box {
      height: 100%;
      width: 50%;
      display: inline-block;
    }
    .no-reward {
      height: 0.7rem;
      width: 0.7rem;
      margin: 0.15rem;
      border-radius: 0.35rem;
      &.no-reward-l {
        background: url("../../static/img/no-reward-l.png") no-repeat center;
        background-size: 0.7rem;
      }
      &.no-reward-r {
        float: right;
        background: url("../../static/img/no-reward-r.png") no-repeat center;
        background-size: 0.7rem;
      }
    }
    ul {
      height: 100%;
      li {
        height: 100%;
        .box {
          width: 0.7rem;
          height: 0.7rem;
          margin-top: 0.15rem;
          border-radius: 0.35rem;
          box-sizing: border-box;
          position: relative;
          font-size: 0.2rem;
          .avatar {
            height: 100%;
            width: 100%;
            border-radius: 50%;
            object-fit: cover;
          }
          .pk-mvp {
            position: absolute;
            width: 0.4rem;
            left: 0.11rem;
            bottom: -0.1rem;
          }
          .top {
            position: absolute;
            width: 0.4rem;
            height: 0.2rem;
            line-height: 0.2rem;
            text-align: center;
            left: 0.11rem;
            bottom: 0;
            border-radius: 0.15rem;
          }
        }
      }
    }
    .top-reward-l {
      ul {
        li {
          float: left;
          .box {
            margin-left: 0.15rem;
            border: 0.04rem solid #f03787;
          }
          .top {
            background: #f03787;
          }
        }
      }
    }
    .top-reward-r {
      ul {
        li {
          float: right;
          .box {
            margin-right: 0.15rem;
            border: 0.04rem solid #3cafeb;
          }
          .top {
            background: #3cafeb;
          }
        }
      }
    }
  }
  .reward-list-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 10000;
  }
  .reward-list {
    position: fixed;
    height: 8rem;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10001;
    .list-box {
      position: absolute;
      height: 8rem;
      width: 100%;
      background: #fff;
      bottom: 0;
      border-radius: 0.4rem 0.4rem 0 0;
      .title {
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        color: #000;
        font-weight: 700;
        border-bottom: 0.001rem solid #eee;
      }
      .no-lists {
        height: 7rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 4rem;
        }
        .no-desc {
          margin-top: 0.5rem;
          color: #999999;
        }
      }
      .lists {
        color: #000;
        overflow: auto;
        height: 7rem;
        li {
          height: 1rem;
          display: flex;
          align-items: center;
          .index {
            flex: 0 0 1rem;
            text-align: center;
            img {
              width: 0.5rem;
            }
          }
          .avatar {
            flex: 0 0 0.8rem;
            height: 0.8rem;
            border-radius: 0.4rem;
            overflow: hidden;
            img {
              height: 100%;
              width: 100%;
            }
          }
          .name {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 0.2rem;
          }
          .num {
            flex: 0 0 1.5rem;
            text-align: right;
            padding-right: 0.2rem;
            color: #bbb;
          }
        }
      }
    }
  }
}
</style>

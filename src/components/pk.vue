<template>
  <div class="x-pk">
    <div class="pk-content">
      <!-- pk血条 -->
      <div class="blood-bar">
        <div class="blood blood-l" :style="{width:'70%'}">
          <span>11113331</span>
        </div>
        <div class="blood blood-r" :style="{width:'30%'}">
          <span>33333333</span>
        </div>
        <!-- 倒计时 -->
        <div class="count-down-box">
          <div class="count-down">
            <img src="../../static/img/pklogo.png" alt />
            00:59
          </div>
        </div>
      </div>
      <!-- pk画面 -->
      <div class="video-box">
        <div class="video-common video-l">
          <video
            autoplay="autoplay"
            ref="html5player"
            preload="auto"
            x5-video-player-type="h5"
            x-webkit-airplay="true"
            :poster="avatar"
            webkit-playsinline="true"
            playsinline="true"
            :src="hls"
          ></video>
        </div>
        <div class="video-common video-r">
          <video
            autoplay="autoplay"
            ref="html5player"
            preload="auto"
            x5-video-player-type="h5"
            x-webkit-airplay="true"
            :poster="avatar"
            webkit-playsinline="true"
            playsinline="true"
            :src="hls"
          ></video>
          <!-- 敌方信息 -->
          <div class="enemy">
            <div class="avatar-box">
              <img class="avatar" src="../../static/img/default.jpg" alt />
            </div>
            <span class="name">徐洲啊房价肯定艰苦奋斗JFK大家看法</span>
            <img class="add-follow" src="../../static/img/add-follow.png" alt />
          </div>
        </div>
      </div>
      <!-- 打赏前几名 -->
      <div class="top-reward">
        <div class="top-reward-box top-reward-l">
          <ul>
            <li>
              <div class="box">
                <div class="top">1</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="top">2</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="top">3</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="top">4</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="top-reward-box top-reward-r">
          <ul>
            <li>
              <div class="box">
                <div class="top">1</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="top">2</div>
              </div>
            </li>
            <li>
              <div class="box">
                <div class="top">3</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import api from "@/constant/api";
export default {
  props: {
    avatar: {
      type: String,
      default: ""
    },
    hls: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
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
    top: 2.3rem;
    right: 0;
    bottom: 240px;
    left: 0;
    background: #fff;
    .blood-bar {
      position: relative;
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
      .count-down-box {
        position: absolute;
        top: 0.5rem;
        left: calc(50% - 1rem);
        width: 1.2rem;
        height: 0;
        z-index: 2;
        border-width: 0.4rem 0.4rem;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
        .count-down {
          position: absolute;
          top: -0.4rem;
          left: -0.4rem;
          right: -0.4rem;
          height: 0.4rem;
          padding: 0 0.4rem;
          font-size: 0.25rem;
          line-height: 0.4rem;
          img {
            display: inline-block;
            height: 0.3rem;
            margin-top: 0.05rem;
          }
        }
      }
    }
    .video-box {
      height: calc(100% - 1.5rem);
      background: #ccc;
      font-size: 0;
      .video-common {
        display: inline-block;
        width: 50%;
        height: 100%;
        overflow:hidden;
      }
      .video-l {
      }
      .video-r {
        position: relative;
        .enemy {
          position: absolute;
          right: 0.25rem;
          bottom: 0.4rem;
          height: 0.7rem;
          font-size: 0;
          border-radius: 0.4rem;
          background: rgba(0, 0, 0, 0.5);
          .avatar-box {
            display: inline-block;
            height: 0.56rem;
            margin: 0.07rem;
            border-radius: 0.28rem;
            overflow: hidden;
            .avatar {
              height: 100%;
              object-fit: cover;
            }
          }
          .name {
            display: inline-block;
            font-size: 0.3rem;
            height: 0.7rem;
            line-height: 0.7rem;
            vertical-align: top;
            max-width: 1.5rem;
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
      video {
        position: relative;
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
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
      ul {
        height: 100%;
        li {
          height: 100%;
          .box {
            width: 0.7rem;
            height: 0.7rem;
            margin-top: 0.15rem;
            border: 0.04rem solid #f03787;
            border-radius: 0.35rem;
            box-sizing: border-box;
            position: relative;
            font-size: 0.1rem;
            overflow: hidden;
            .top {
              position: absolute;
              width: 0.4rem;
              height: 0.2rem;
              line-height: 0.2rem;
              text-align: center;
              background: #f03787;
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
            }
          }
        }
      }
    }
  }
}
</style>

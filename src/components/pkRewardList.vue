<template>
  <div class="pk-reward-list">
    <!-- 贡献榜排名 -->
    <div class="reward-list-mask" v-if="rewardListShow" @click="rewardListShow = false"></div>
    <div class="reward-list" v-if="rewardListShow">
      <div class="list-box">
        <div class="title">本场PK贡献榜</div>
        <ul class="lists">
          <li>
            <div class="index">
              <img src="../../static/img/pk-no1.png" alt />
            </div>
            <div class="avatar">
              <img src="../../static/img/default.jpg" alt />
            </div>
            <div class="name">徐洲</div>
            <div class="num">333</div>
          </li>
          <li>
            <div class="index">
              <img src="../../static/img/pk-no2.png" alt />
            </div>
            <div class="avatar">
              <img src="../../static/img/default.jpg" alt />
            </div>
            <div class="name">张翠</div>
            <div class="num">333</div>
          </li>
          <li>
            <div class="index">
              <img src="../../static/img/pk-no3.png" alt />
            </div>
            <div class="avatar">
              <img src="../../static/img/default.jpg" alt />
            </div>
            <div class="name">222ffffffffffffffffffffffffffffffffffffffffffffffffff</div>
            <div class="num">333</div>
          </li>
          <li>
            <div class="index">
              <span>4</span>
            </div>
            <div class="avatar">
              <img src="../../static/img/default.jpg" alt />
            </div>
            <div class="name">222ffffffffffffffffffffffffffffffffffffffffffffffffff</div>
            <div class="num">333</div>
          </li>
          <li>
            <div class="index">
              <span>5</span>
            </div>
            <div class="avatar">
              <img src="../../static/img/default.jpg" alt />
            </div>
            <div class="name">222ffffffffffffffffffffffffffffffffffffffffffffffffff</div>
            <div class="num">333</div>
          </li>
          <li>
            <div class="index">
              <span>6</span>
            </div>
            <div class="avatar">
              <img src="../../static/img/default.jpg" alt />
            </div>
            <div class="name">222ffffffffffffffffffffffffffffffffffffffffffffffffff</div>
            <div class="num">3335656656565</div>
          </li>
          <li>
            <div class="index">
              <span>7</span>
            </div>
            <div class="avatar">
              <img src="../../static/img/default.jpg" alt />
            </div>
            <div class="name">222ffffffffffffffffffffffffffffffffffffffffffffffffff</div>
            <div class="num">3335656656565</div>
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
  },
  data() {
    return {
      rewardListShow: false // 显影本场贡献榜弹窗
    };
  },
  mounted() {},
  methods: {
    init(data) {
      this.rewardListShow = true;
    }
  }
};
</script>

<style type="text/css" scoped="scoped" lang="less">
.pk-reward-list {
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

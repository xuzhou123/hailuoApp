<template>
  <div class="pk-list">
    <!-- 贡献榜排名 -->
    <div class="list-mask" v-if="listShow" @click="listShow = false"></div>
    <div class="list" v-if="listShow">
      <div class="list-box">
        <div class="title">
          <img class="search" src="../../static/img/sear.png" alt />
          发起PK
        </div>
        <div class="list-content">
          <div class="container" v-if="mutualAttention.length">
            <span class="desc">与你互相关注的开播主播</span>
            <invitationData ref="mutualAttention" v-for="item in mutualAttention" :key="item.id" />
          </div>
          <div class="container" v-if="recommend.length">
            <span class="desc">你可能想邀请的人</span>
            <invitationData ref="recommend" v-for="item in recommend" :key="item.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import api from "@/constant/api";
import invitationData from "@/components/invitationData";
import { Toast } from "mint-ui";
export default {
  props: {},
  components: {
    invitationData
  },
  data() {
    return {
      listShow: false, // 显影本场贡献榜弹窗
      mutualAttention: [], // 互相关注的主播
      recommend: [] //推荐的主播
    };
  },
  mounted() {},
  methods: {
    init() {
      const _this = this;
      _this.listShow = true;
      _this.axios.get(api.show_pk_link_list).then(function(res) {
        var dat = res.data;
        if (dat.state == 0) {
          _this.mutualAttention = dat.content.anchor_list_for_mutual_attention;
          _this.recommend = dat.content.anchor_list_for_recommend;
        } else {
          Toast({
            message: dat.msg
          });
        }
      });
    }
  }
};
</script>

<style type="text/css" scoped="scoped" lang="less">
.pk-list {
  .list-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 10000;
  }
  .list {
    position: fixed;
    height: 7rem;
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
        position: relative;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        color: #000;
        font-weight: 700;
        border-bottom: 0.001rem solid #eee;
        .search {
          position: absolute;
          left: 0.5rem;
          top: 0.35rem;
          height: 0.3rem;
          width: 0.3rem;
        }
      }
      .list-content {
        height: 7rem;
        overflow: auto;
        margin: 0 0.2rem;
        background: #fff;
        .desc {
          display: inline-block;
          color: #8e8e8f;
          font-size: 0.2rem;
        }
        .container {
          padding-bottom: 0.2rem;
          border-bottom: 0.001rem solid #eee;
        }
      }
    }
  }
}
</style>

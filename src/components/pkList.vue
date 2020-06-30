<template>
  <div class="pk-list">
    <div class="mask" v-if="show" @click="show=''"></div>
    <!-- pk主播列表 -->
    <div class="fixed-box list-container" v-if="show==='0'">
      <div class="list-box">
        <div class="title">
          <img class="search" @click="show='1'" src="../../static/img/sear.png" alt />
          发起PK
        </div>
        <div class="list-content">
          <div class="container" v-if="mutualAttention.length">
            <span class="desc">与你互相关注的开播主播</span>
            <invitationData
              ref="mutualAttention"
              :datas="mutualAttention"
              @invitationPk="invitationPk"
            />
          </div>
          <div class="container" v-if="recommend.length">
            <span class="desc">你可能想邀请的人</span>
            <invitationData ref="recommend" :datas="recommend" @invitationPk="invitationPk" />
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索主播列表 -->
    <div class="fixed-box search-container" v-if="show==='1'">
      <div class="title">搜索</div>
      <div class="container">
        <div class="search-val">
          <div class="search-icon-x"></div>
          <input type="text" v-model="searchVal" placeholder="搜索想PK的主播ID或昵称" />
          <div class="close-icon-x" v-if="searchVal" @click="searchVal=''"></div>
        </div>
        <ul class="search-list">
          <li v-for="item in searchLists" :key="item.id">
            <div class="avatar">
              <div :class="{'avatar-box':true,'border-style':item.islive}">
                <img class="avatar-img" :src="item.avatar" alt />
              </div>
              <img class="living-icon" v-if="item.islive" src="../../static/img/living.png" alt />
            </div>
            <div class="info">
              <span class="name">{{item.user_nicename}}</span>
              <img :src="`../../static/img/op${item.level_anchor}.png`" alt />
              <img :src="`../../static/img/${item.level}.png`" alt />
            </div>
            <div class="invitation-pk">
              <div class="no-live" v-if="!item.islive">暂未开播</div>
              <div class="invitation-btn" v-if="item.islive" @click="invitationPk(item)">邀请PK</div>
            </div>
          </li>
        </ul>
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
      show: "", // 0 pk主播列表 1 搜索主播列表
      listShow: false, // 显影本场贡献榜弹窗
      mutualAttention: [], // 互相关注的主播
      recommend: [], //推荐的主播
      searchVal: "", // 搜索值
      searchLists: [],
      liveCt: {}
    };
  },
  mounted() {},
  watch: {
    searchVal(newVal, oldVal) {
      this.search();
    }
  },
  methods: {
    init(liveCt) {
      this.liveCt = liveCt;
      const _this = this;
      _this.show = "0";
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
    },
    // 搜索主播
    search() {
      const _this = this;
      if (!this.searchVal) {
        this.searchLists = [];
        return;
      }
      let json = { keywords: this.searchVal };
      _this.axios
        .post(api.show_search_pklink_list, this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 0) {
            _this.searchLists = dat.content;
          } else {
            Toast({
              message: dat.msg
            });
          }
        });
    },
    // 邀请pk
    invitationPk(item) {
      this.show='';
      let val = {
        retcode: "000000",
        retmsg: "ok",
        msg: [
          {
            _method_: "testlink",
            action: 1, // 1请求pk 5同意pk 6拒绝pk 7主播正在忙碌未应答 8展示PK样式 pk倒计时 9 关闭窗口
            msgtype: 10,
            roomnum: item.id, // 应答方主播房间号=应答方主播id
            user_nicename: this.liveCt.user_nicename, // 请求方主播昵称
            quid: this.liveCt.uid, // 请求方主播id
            buid: item.id, // 应答方主播id
            pktime: 6, // pk时长
            avatar: this.liveCt.avatar, //请求方头像
            sex: this.liveCt.sex, //请求方性别
            vote_total: this.liveCt.vote_total, //请求方累计海螺
            fans_num: this.liveCt.fans_num, //请求方观众
            level_anchor: this.liveCt.level_anchor, //请求方等级
            level: this.liveCt.level //请求方等级
          }
        ]
      };
      this.$emit("showM", "您已发出邀请");
      this.$emit("clickButton", JSON.stringify(val));
    }
  }
};
</script>

<style type="text/css" scoped="scoped" lang="less">
.pk-list {
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 10000;
  }
  .fixed-box {
    position: fixed;
    height: 8rem;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10001;
  }
  .list-container {
    .list-box {
      position: absolute;
      height: 100%;
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
  .search-container {
    background: #fff;
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
    .container {
      .search-val {
        height: 0.8rem;
        margin: 0.2rem;
        background: #f1f1f1;
        border-radius: 0.05rem;
        display: flex;
        .search-icon-x {
          flex: 0 0 0.7rem;
          background: url("../../static/img/sear.png") no-repeat center center;
          background-size: 0.3rem;
        }
        input {
          flex: 1;
          border: 0;
          background: transparent;
        }
        .close-icon-x {
          flex: 0 0 0.7rem;
          background: url("../../static/img/ic_room_btn_close_pressed.png")
            no-repeat center center;
          background-size: 0.3rem;
        }
      }
      .search-list {
        height: 5.8rem;
        margin: 0 0.2rem;
        overflow: auto;
        li {
          display: flex;
          align-items: center;
          height: 1rem;
          margin-top: 0.2rem;
          .avatar {
            flex: 0 0 0.8rem;
            height: 0.8rem;
            position: relative;
            .avatar-box {
              height: 0.8rem;
              width: 0.8rem;
              border-radius: 0.4rem;
              box-sizing: border-box;
              overflow: hidden;
              &.border-style {
                border: 0.05rem solid #326aff;
              }
              .avatar-img {
                height: 100%;
                width: 100%;
                object-fit: cover;
              }
            }
            .living-icon {
              position: absolute;
              bottom: 0;
              right: 0;
              height: 0.3rem;
            }
          }
          .info {
            flex: 1;
            height: 100%;
            padding-left: 0.2rem;
            display: flex;
            align-items: center;
            span {
              display: inline-block;
              max-width: 2rem;
              color: #404142;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            img {
              height: 0.3rem;
              margin-left: 0.1rem;
            }
          }
          .invitation-pk {
            flex: 0 0 1.5rem;
            .invitation-btn {
              width: 1.2rem;
              padding: 0.05rem;
              margin-left: 0.1rem;
              text-align: center;
              color: #fff;
              font-size: 0.2rem;
              border-radius: 0.05rem;
              background: #326aff;
            }
            .no-live {
              font-size: 0.2rem;
              text-align: center;
              color: #999999;
            }
          }
        }
      }
    }
  }
}
</style>

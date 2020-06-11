<template>
  <div class="main">
    <div class="search_id">
      <div class="search">
        <span @click="goRouter('/search')" class="search-span iconfont" style="color:#ccc">
          <img src="../../static/img/searchkan.png" alt />
        </span>
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">热门</mt-tab-item>
          <mt-tab-item id="2" ref="now">最新</mt-tab-item>
          <mt-tab-item id="3">推荐</mt-tab-item>
          <mt-tab-item id="4">排行</mt-tab-item>
        </mt-navbar>
      </div>
    </div>
    <!--swipeable-->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <hot></hot>
      </mt-tab-container-item>

      <mt-tab-container-item id="2">
        <recent></recent>
      </mt-tab-container-item>

      <mt-tab-container-item id="3">
        <recommend></recommend>
      </mt-tab-container-item>

      <mt-tab-container-item id="4">
        <ul>
          <li @click="goRouter('/Leaderboard')">
            <span>
              <img src="../../static/img/fuhao.png" alt />富豪排行榜
            </span>
            <em>
              <img src="../../static/img/right.png" alt />
            </em>
          </li>
          <li @click="goRouter('/Leaderstatr')">
            <span>
              <img src="../../static/img/zhubo.png" alt />主播排行榜
            </span>
            <em>
              <img src="../../static/img/right.png" alt />
            </em>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
    <friend></friend>
  </div>
</template>

<script>
import store from "@/store/store";
import apiy from "@/constant/api";
import hot from "@/components/hot";
import recent from "@/components/recent";
import recommend from "@/components/recommend";
import friend from "@/components/friend";
// import nowlive from '@/components/nowlive'
// import Leaderboard from '@/components/Leaderboard'
export default {
  data() {
    return {
      live: [],
      loading: false,
      allLoaded: true,
      wrapperHeight: 0,
      page: 1,
      len: 10,
      forflag: "",
      selected: "1",
      city: "合肥"
    };
  },
  mounted() {
    var n = this.$route.query.now;
    if (n != "" && n != undefined && n != null) {
      this.selected = n;
    }
    var token = this.$route.query.login_token;
    if (token != undefined && token != null && token != "") {
      localStorage.setItem("login_token", token);
    }
    this.getPerson();
  },
  components: {
    hot,
    recent,
    recommend,
    friend
  },
  methods: {
    goRouter(o) {
      this.$router.push({
        path: o
      });
    },
    getPerson() {
      var _this = this;
      this.axios.get(apiy.person).then(function(res) {
        // _this.$root.login(res.data.state)
        var dat = res.data;
        //_this.$root.login(dat.state)
        if (dat.state == 0) {
          //_this.user_info=dat.content.user_info
          localStorage.setItem("openid", dat.content.user_info.openid);
          localStorage.setItem("is_shuijun", dat.content.user_info.is_shuijun);
          localStorage.setItem("code", dat.content.user_info.code);
        }
      });
    },
    LinkRouter(o) {
      this.$router.push({
        path: "/live",
        query: {
          id: o
        }
      });
    },
    styleObj(o) {
      return 'background:url("' + o + '") center no-repeat;';
    },
    onError(i, o) {
      //console.log(o.avatar_thumb,i)
      o.avatar_thumb = i;
    },
    getLive(o) {
      if (o == "e") {
        this.live = [];
      }
      var _this = this;
      var json = { page: this.page, length: this.len };
      //console.log(json)
      this.axios.post(apiy.index, this.$qs.stringify(json)).then(function(res) {
        if (res.data.state == 0) {
          if (res.data.content.show_list.length <= 0) {
            _this.loading = true;
          } else {
            _this.loading = false;
          }
          _this.live = _this.live.concat(res.data.content.show_list);
          _this.allLoaded = false;
        }
      });
    },
    getNice(o) {
      var _this = this;
      this.axios.get(apiy.h5).then(function(res) {
        if (res.data.state == 0) {
        }
      });
    },
    loadMore() {
      this.loading = true;
      var _this = this;
      this.forflag = setTimeout(() => {
        _this.page++;
        _this.allLoaded = true;
        _this.getLive();
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.forflag);
  },
  beforeRouteLeave(to, from, next) {
    next();
    clearInterval(this.forflag);
  }
};
</script>

<style scoped lang="less">
.mint-navbar {
  height: 0.86rem;
}
.mint-navbar {
  background: transparent;
  .mint-tab-item {
    padding-top: 0.25rem !important;
  }
}

.page-infinite-loading {
  text-align: center;
  height: 50px;
  line-height: 50px;
  padding-bottom: 50px;
  span {
    display: inline-block;
    vertical-align: middle;
  }
  div {
    display: inline-block;

    margin-right: 5px;
  }
  i {
    color: #ccc;
    vertical-align: middle;
  }
}
.search_id {
  border-bottom: 1px solid #f5f5f5;
  overflow: hidden;
  background: -webkit-linear-gradient(
    left,
    #00d2ff,
    #0096ff
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #00d2ff,
    #0096ff
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #00d2ff,
    #0096ff
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #00d2ff, #0096ff); /* 标准的语法 */
  color: #fff;
  height: 0.88rem;
}

.search {
  width: 93%;
  margin: 0 auto;
  overflow: hidden;
  font-size: 0.3rem;
  i {
    display: inline-block;
    width: 1rem;
    float: left;
    margin-top: 3px;
    color: #ccc;
    text-align: center;
  }
  span {
    display: inline-block;
    width: 0.46rem;
    float: left;
    font-size: 0.4rem;
    margin-top: 0.06rem;
    overflow: hidden;
    img {
      width: 100%;
      position: relative;
      top: 0.15rem;
    }
  }
}
.amtext {
  height: 0.64rem;
  line-height: 0.64rem;
  padding: 0 0.2rem;
  font-size: 0.24rem;
  color: #8d8d8d;
  img {
    vertical-align: middle;
    width: 2%;
  }
}
#live-active {
  overflow: hidden;
  li {
    width: 33.3%;
    float: left;
    text-align: center;
    padding: 1.8% 0;
    div {
      width: 65%;
      float: left;
      // border-right:1px solid #ccc;
      box-sizing: border-box;
    }
    i {
      font-size: 0.5rem;
      display: block;
      width: 35%;
      float: left;
      text-align: right;
      font-family: "微软雅黑", tahoma, "hiragino sans gb", stheiti,
        "wenquanyi micro hei", \5fae\8f6f\96c5\9ed1, \5b8b\4f53, sans-serif;
    }
    span {
      font-size: 0.25rem;
      display: block;
      margin-top: 2px;
      color: #2c2c2c;
    }
    em {
      font-size: 0.2rem;
      display: block;
      color: #666;
    }
  }
}
.page-tabbar {
  overflow: hidden;
  height: 100vh;
}
.page-wrap {
  overflow: auto;
  height: 100%;
  padding-bottom: 100px;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.iconp {
  font-family: "iconfont" !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
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
.mint-swipe {
  height: 2.6rem;
  color: #fff;
  font-size: 30px;
  text-align: center;
  background: gray;
}
.mint-tab-item:after {
  display: block;
  content: "";
  width: 0.3rem;
  height: 0.05rem;
  position: absolute;
  bottom: 0;
  left: 0.67rem;
  background: transparent;
}
.mint-navbar .mint-tab-item.is-selected {
  color: #fff;
}
.is-selected:after {
  background: #ffffff;
}
.mint-tab-item {
  padding: 5px 0 !important;
  position: relative;
}
.slide1 {
  background-color: #0089dc;
  color: #fff;
}
.slide2 {
  background-color: #ffd705;
  color: #000;
}
.slide3 {
  background-color: #ff2d4b;
  color: #fff;
}

.h-info {
  width: 100%;
  height: 25px;
  line-height: 25px;
  position: absolute;
  left: 0;
  bottom: 0.9rem;
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
ul {
  li {
    border-bottom: 1px solid #f3f3f3;
    padding: 0.2rem 0.2rem;
    overflow: hidden;
    height: 0.5rem;
    line-height: 0.5rem;
    span {
      font-size: 0.3rem;
      color: #2c2c2c;
      float: left;
      display: inline-block;
      img {
        width: 16%;
        vertical-align: middle;
        margin-right: 0.1rem;
      }
    }
    i {
      display: inline-block;
      float: right;
      font-size: 0.25rem;
      color: #b8b8b8;
      img {
        width: 100%;
        vertical-align: middle;
      }
    }
    em {
      float: right;
      display: inline-block;
      width: 0.2rem;
      margin-left: 0.2rem;
      img {
        width: 100%;
        vertical-align: middle;
        margin-top: -0.12rem;
      }
    }
  }
}

/deep/ .mint-tab-item-label {
  font-size: 0.34rem !important;
}
</style>

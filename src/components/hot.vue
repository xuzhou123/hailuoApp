<template>
  <div ref="wrapper" class="hot" :style="{ height: wrapperHeight + 'px',overflow:'scroll' }">
    <div class="amtext" v-if="hot" @click="goHistroy('/follow')">
      你关注的主播 正在直播
      <img src="../../static/img/kc1.png" />
    </div>
    <div class="amtext" v-if="!hot">
      <i @click="goHistroy('/login_pwd')" style="color: #0096ff;">登陆</i>后查看关注信息
      <img src="../../static/img/kc1.png" />
    </div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in banner" :key="index">
        <img :src="item.app_img_url" alt />
      </mt-swipe-item>
    </mt-swipe>
    <div class="page-infinite-wrapper">
      <ul
        id="live-list"
        class="page-infinite-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="50"
      >
        <li
          :style="styleObj(item.thumb)"
          v-for="(item,index) in live"
          @click="LinkRouter(item)"
          :key="index"
        >
          <div class="fanavatar">
            <div class="h-info">
              <span class="fans">{{item.user_nicename}}</span>
              <span class="live-icon">
                <i class="iconp">&#xe729;</i>
                {{item.audience_num}}
              </span>
            </div>
            <!--<p class="p1" v-if="item.islive==1"><img src="../../static/img/m1.png" alt=""></p>-->
            <div v-if="item.islive==0" class="video_status video_status_living">休息中</div>
            <div v-if="item.islive==1" class="video_status video_status_living">直播中</div>
            <div v-if="item.islive==2" class="video_status video_status_living">待播</div>
          </div>

          <!-- 是否正在pk标识 -->
          <div class="pk-flag">
            <img v-if="true" src="../../static/img/icon-pk.png" alt />
          </div>
        </li>
      </ul>
      <p v-show="alling" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <i>加载中...</i>
      </p>
    </div>
    <div style="height:1rem;"></div>
    <password-modal @passNum="showLiveroom" :visible.sync="visible" :id="id" type="check"></password-modal>
  </div>
</template>

<script>
import store from "@/store/store";
import apiy from "@/constant/api";
import passwordModal from "./password-modal";
export default {
  //name: "main",
  data() {
    return {
      live: [],
      loading: false,
      alling: false,
      wrapperHeight: 0,
      page: 0,
      len: 10,
      forflag: "",
      selected: "1",
      hot: false,
      busy: false,
      banner: [],
      id: "",
      visible: false
    };
  },
  mounted() {
    //this.getLive(this.busy)
    this.Follow();
    this.getbanner();
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  },

  methods: {
    goHistroy: function(o) {
      this.$router.push({
        path: o
      });
    },
    Follow() {
      var _this = this;
      var json = { page: 1, length: 10 };
      this.axios
        .post(apiy.attention, this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 88 || dat.state == 99) {
            _this.hot = false;
          } else {
            _this.hot = true;
          }
        });
    },
    getbanner() {
      var _this = this;
      this.axios.post(apiy.index_banner_list).then(function(res) {
        var dat = res.data;
        if (dat.state == 0) {
          _this.banner = dat.content;
        }
      });
    },
    LinkRouter(item) {
      if (item.type === 1 || item.type === "1") {
        this.visible = true;
        this.id = item.uid;
        return false;
      }
      this.showLiveroom(item.uid);
    },
    showLiveroom(o) {
      var _this = this;
      var json = { page: 1, length: 10 };
      this.axios
        .post(apiy.attention, this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 88 || dat.state == 99) {
            //if(localStorage.getItem("codey")!=''&&localStorage.getItem("codey")!=null){
            if (
              window.navigator.userAgent.toLowerCase().indexOf("apicloud") >= 0
            ) {
              var z = "/videoy";
            } else {
              var z = "/live";
            }
            _this.$router.push({
              path: z,
              query: {
                id: o
              }
            });
            /* 	}else{
			           		_this.$root.Hub.$emit('friend','')
			           	}*/
          } else {
            if (
              window.navigator.userAgent.toLowerCase().indexOf("apicloud") >= 0
            ) {
              var z = "/videoy";
            } else {
              var z = "/live";
            }
            _this.$router.push({
              path: z,
              query: {
                id: o
              }
            });
          }
        });
    },
    styleObj(o) {
      if (o == 1) {
        return (
          'background:url("' +
          require("../../static/img/default.jpg") +
          '") center no-repeat;'
        );
      } else {
        return 'background:url("' + o + '") center no-repeat;';
      }
    },
    onError(i, o) {
      //console.log(o.avatar_thumb,i)
      o.avatar_thumb = i;
    },
    getLive(o) {
      var _this = this;
      var json = { page: this.page, length: this.len };
      //console.log(this.page)
      this.axios
        .post(apiy.zhibo_live_hot, this.$qs.stringify(json))
        .then(function(res) {
          console.log(res);
          if (res.data.state == 0) {
            // console.log(res.data.content.show_list.length<=0)
            if (res.data.content.length <= 0) {
              _this.loading = true;
            } else {
              _this.loading = false;
            }
            _this.live = _this.live.concat(res.data.content);
            _this.alling = false;
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
      this.alling = true;
      var _this = this;
      this.forflag = setTimeout(() => {
        _this.page++;
        _this.getLive(true);
      }, 100);
    }
  },
  created() {
    var _this = this;
  },
  beforeDestroy() {
    clearInterval(this.forflag);
  },
  beforeRouteLeave(to, from, next) {
    next();
    clearInterval(this.forflag);
  },
  components: {
    passwordModal
  }
};
</script>

<style scoped lang="less">
.video_status.video_status_living {
  width: 60px;
}
.video_status {
  position: absolute;
  top: 2%;
  right: 2%;
  width: 1.1rem !important;
  height: 0.4rem;
  border-radius: 0.3rem;
  text-align: center;
  line-height: 0.4rem;
  font-size: 0.23rem;
  color: #fff;
}

.video_status {
  background: rgba(0, 0, 0, 0.45);
}

.mint-navbar {
  height: 0.86rem;
}
.mint-navbar {
  background: transparent;
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
    #53acff,
    #b846ff
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #53acff,
    #b846ff
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #53acff,
    #b846ff
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #53acff, #b846ff); /* 标准的语法 */
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
    img {
      width: 100%;
      vertical-align: middle;
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
.mint-swipe-item {
}
.mint-tab-item {
  padding: 5px 0 !important;
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
#live-list {
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 0.1%;
  li {
    width: 50%;
    height: 7.5rem;
    float: left;
    margin-top: 0.6%;
    position: relative;
    margin-left: 0;
    background-size: cover !important;
    img {
      width: 100%;
    }
    /*		.fanavatar{
      				width:100%;
      				height:4.2rem;
      				background-size:cover !important;
      			}*/
    .p1 {
      width: 1.2rem;
      position: absolute;
      left: 0;
      top: 0;
      img {
        width: 100%;
      }
    }
    p {
      span {
        display: block;
        font-size: 0.28rem;
        color: #2c2c2c;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i {
        display: block;
        font-size: 0.24rem;
        color: #8f8f8f;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .pk-flag {
      position: absolute;
      bottom: 1rem;
      left: 0.2rem;
      height: 0.5rem;
    }
  }
  /*li:nth-of-type(even){
            margin-left: 0.6%;
        }*/
  /*li:nth-of-type(even){
      			margin-left:0.5%;
      		}*/
}
.h-info {
  width: 100%;
  height: 25px;
  line-height: 25px;
  position: absolute;
  left: 0;
  bottom: 0.1rem;
  .fans {
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    padding-left: 5px;
  }
  .live-icon {
    font-size: 16px !important;
    color: #fff;
    float: right;
    padding-right: 5px;
    i {
      font-size: 16px !important;
    }
  }
}
</style>

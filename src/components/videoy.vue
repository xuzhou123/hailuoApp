<template>
  <div class="video"></div>
</template>

<script >
import apiy from "@/constant/api";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      video: null,
      playing: false,
      wsub: null,
      alivcLive: ""
    };
  },
  mounted() {
    this.getHome();
    var _this = this;
    api.addEventListener(
      {
        //关闭
        name: "closeplayer"
      },
      function(ret, err) {
        //_this.alivcLive.pause()
        _this.alivcLive.reset();
        /* api.setFrameAttr({
                    name:'player',
                    hidden:true
                })*/
        api.sendFrameToBack({
          from: "player",
          to: "main"
        });
        api.closeFrame({
          name: "player2"
        });
        _this.goRouter("/");
      }
    );

    api.addEventListener(
      {
        //关闭
        name: "closeplayer1"
      },
      function(ret, err) {
        //_this.alivcLive.pause()
        _this.alivcLive.reset();
        /* api.setFrameAttr({
                      name:'player',
                      hidden:true
                  })*/
        api.sendFrameToBack({
          from: "player",
          to: "main"
        });
        api.closeFrame({
          name: "player2"
        });
        _this.goRouter("/login_pwd");
      }
    );

    api.addEventListener(
      {
        //关闭
        name: "closeplayer3"
      },
      function(ret, err) {
        //_this.alivcLive.pause()
        _this.alivcLive.reset();
        /* api.setFrameAttr({
                      name:'player',
                      hidden:true
                  })*/
        api.sendFrameToBack({
          from: "player",
          to: "main"
        });
        api.closeFrame({
          name: "player2"
        });
        _this.goRouter(ret.value.key);
      }
    );
  },
  methods: {
    getHome() {
      var _this = this;
      var json = { roomnum: _this.$route.query.id };
      this.axios
        .post(apiy.home + "?" + this.$qs.stringify(json))
        .then(function(res) {
          var dat = res.data;
          if (dat.state == 0) {
            _this.createSubview(dat.content.liveinfo.pull);
          } else if (dat.state == 20) {
            /*api.sendFrameToBack({
                        from: 'player',
                        to: 'main'
                    });
                    api.closeFrame({
                        name: 'player2'
                    });*/
            _this.goRouter("/");
            _this.showM(dat.msg);
          } else {
            _this.showM(dat.msg);
          }
        });
    },
    createSubview(o) {
      var _this = this;
      var apiheight = window.screen.height;
      var apiwidth = window.screen.width;
      api.bringFrameToFront({
        from: "player",
        to: "main"
      });
      api.openFrame({
        name: "player",
        url: "",
        preload: false,
        rect: {
          // 推荐使用Margin布局，用于适配屏幕的动态变化
          marginTop: 0, // main页面距离win顶部的高度
          marginBottom: 0, // main页面距离win底部的高度
          w: "auto" // main页面的宽度 自适应屏幕宽度
        }
      });
      this.alivcLive = api.require("alivcLivePlayer");
      this.alivcLive.initPlayer({
        rect: {
          x: 0,
          y: 0,
          w: apiwidth,
          h: apiheight
        },
        fixedOn: "player"
      });
      this.alivcLive.prepareToPlay(
        {
          url: o
        },
        function(rety) {
          if (rety.status == true) {
          } else {
            _this.showM("播放器预加载失败！");
          }
        }
      );

      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (!isiOS) {
        this.alivcLive.prepareAndPlay(
          {
            url: o
          },
          function(rety) {
            if (rety.status == true) {
            } else {
              _this.showM("播放器预加载失败！");
            }
          }
        );
      }
      this.alivcLive.play();
      this.alivcLive.setVideoScalingMode({
        scalingMode: "corp"
      });
      this.alivcLive.setOnErrorListener(function(ret) {
        //alert(ret.msg);
      });
      this.openUrl(apiy.hosturl + "live_player?id=" + _this.$route.query.id);
    },
    showM: function(o) {
      // this.$root.Hub.$emit('child',{msg:o,flag:true});
      Toast({
        message: o,
        iconClass: "icon icon-success",
        className: "backColor",
        duration: 1000
      });
    },
    openUrl(o) {
      api.openFrame({
        name: "player2",
        url: o,
        //bounces:true,
        bgColor: "rgba(0,0,0,0)",
        rect: {
          // 推荐使用Margin布局，用于适配屏幕的动态变化
          marginTop: 24, // main页面距离win顶部的高度
          marginBottom: 0, // main页面距离win底部的高度
          w: "auto" // main页面的宽度 自适应屏幕宽度
        }
      });
    },
    goRouter(o) {
      this.$router.push({
        path: o
      });
    }
  }
};
</script>

<style scoped>
</style>

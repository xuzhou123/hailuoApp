<template>
    <div class="smallvideo">
          <header>热度</header>
       <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px',overflow:'scroll' }">
          <ul  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
            <li v-for="(item,index) in videolive" :key="index">
              <div class="avatar" :style="styleobj(item.user.avatar)"></div>
              <div class="info">
                  <div class="info_1">
                    <span>{{item.user.user_nicename}}</span>
                    <i>
                      <img v-if="item.user.sex==2" src="../../static/img/women.png" alt="">
                      <img v-if="item.user.sex==1" src="../../static/img/man.png" alt="">
                    </i>
                  </div>
                  <div class="time">{{getDateTimeStamp(item.updated_at)}}</div>
                  <div class="text">
                   {{item.content}}
                  </div>
                  <div class="video">
                    <video @click="video($event)" :id="index"  controls="false"     :poster="item.pull+'?vframe/jpg/offset/1'"  preload="auto" x5-video-player-fullscreen="true" x5-video-orientation="portraint" x5-video-player-type="h5" x-webkit-airplay="allow"  webkit-playsinline="true"  playsinline="true"   :src="item.pull"></video>
                    <img @click="player($event)" v-if="playrt"  src="../../static/img/play.png" alt="">
                  </div>
                   <div class="view">
                     <span>{{item.scan_count}}次浏览</span>
                     <i v-if="item.is_like!=0" style="color:red;"><img @click="cancelinfo(item)" src="../../static/img/true_like.png" alt="">&nbsp;{{item.like_count}}</i>
                     <i v-if="item.is_like==0"><img @click="likeInfo(item)"   src="../../static/img/like.png" alt="">&nbsp;{{item.like_count}}</i>
                     <em><img src="../../static/img/comm.png" alt="">&nbsp;{{item.comment_count}}</em>
                   </div>
              </div>
            </li>
          </ul>
          <p v-show="allLoaded" class="page-infinite-loading">
              <mt-spinner type="fading-circle"></mt-spinner>
              <i>加载中...</i>
            </p>
        </div>
      <div style="height:1.5rem;"></div>
    </div>
</template>

<script>
  import api from '@/constant/api'
  import { Toast } from 'mint-ui'
    export default {
        name: "smallvideo",
        data(){
          return{
            curr:true,
            poster:'../../static/img/big.png',
            hls:'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4',
            videolive:[],
            loading: false,
            allLoaded: false,
            wrapperHeight:0,
            page:0,
            len:10,
            pull:'',
            playrt:true
          }
        },
        mounted(){
           /* if(window.navigator.userAgent.toLowerCase().indexOf("APICloud")){
                this.playrt=false
            }*/
           function checkFull(){
          var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
          if(isFull === undefined) isFull = false;
          return isFull;
          }
          window.onresize=function(){
             if (!checkFull()) {
                var vlist=document.getElementsByTagName("video")
                for(var i=0;i<vlist.length;i++){
                  vlist[i].pause()
                }
             }
          }
           this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;


        },
      methods:{
          refinfo(o){
            //console.log(o)
            return'v'+o
          },
           showM:function(o){
           // this.$root.Hub.$emit('child',{msg:o,flag:true});
            Toast({
              message:o,
              iconClass: 'icon icon-success',
              className:'backColor',
              duration:1000
            });
          },
          likeInfo(o){
            var _this=this;
            var json={video_id:o.id};
            //console.log(json)
            this.axios.post(api.user_small_video_like,this.$qs.stringify(json))
            .then(function(res){
              _this.showM(res.data.msg)
              if(res.data.state==1){
                       o.is_like=1
                       o.like_count++
                //console.log(o)
                }
              })
          },
        cancelinfo(o){
             var _this=this;
            var json={video_id:o.id};
            //console.log(json)
            this.axios.post(api.user_small_video_cancel_like,this.$qs.stringify(json))
            .then(function(res){
              _this.showM(res.data.msg)
              if(res.data.state==1){
                      o.is_like=0
                      o.like_count--
                }
              })
        },
         styleobj(o){
           if(o==1){
             return  'background:url("'+require("../../static/img/default.jpg")+'") center no-repeat;';
           }else{
              return 'background: url("'+o+'")'
           }
          //console.log('background: url("'+this.liveCt.avatar+'")')
        },
        player(e){
            e.currentTarget.style.display='none'
            e.currentTarget.previousElementSibling.webkitRequestFullScreen(0)
             e.currentTarget.previousElementSibling.play()
        },
        video(e){
              e.currentTarget.webkitRequestFullScreen(0)

               e.currentTarget.play()
        },
        getvideo(){
            var _this=this;
            console.log(this.page)
            var json={page:this.page,length:this.len};
              this.axios.post(api.hot_small_video,this.$qs.stringify(json))
              .then(function(res){
                if(res.data.state==0){
                  //_this.videolive=res.data.content
                   if(res.data.content.length<=0){
                    _this.loading=true
                  }else{
                    _this.loading=false
                  }
                _this.videolive=_this.videolive.concat(res.data.content)
                 _this.allLoaded=false
                }
            })
        },
        loadMore() {
            this.loading = true;
            this.allLoaded=true
            var _this=this
            this.forflag=setTimeout(() => {
              _this.page++
              _this.getvideo()
            },100);
        },
        getDateDiff(dateTimeStamp){
          var minute = 1000 * 60;
          var result = ''
          var hour = minute * 60;
          var day = hour * 24;
          var halfamonth = day * 15;
          var month = day * 30;
          var now = new Date().getTime();
          var diffValue = now - dateTimeStamp;
          //console.log(diffValue)
          if(diffValue < 0){return;}
          var monthC =diffValue/month;
          var weekC =diffValue/(7*day);
          var dayC =diffValue/day;
          var hourC =diffValue/hour;
          var minC =diffValue/minute;
          if(monthC>=1){
            result="" + parseInt(monthC) + "月前";
          }
          else if(weekC>=1){
            result="" + parseInt(weekC) + "周前";
          }
          else if(dayC>=1){
            result=""+ parseInt(dayC) +"天前";
          }
          else if(hourC>=1){
            result=""+ parseInt(hourC) +"小时前";
          }
          else if(minC>=1){
            result=""+ parseInt(minC) +"分钟前";
          }else{
             result="刚刚";
          }
          return result;
        },
        getDateTimeStamp(dateStr){
           //console.log(dateStr)
          if(dateStr!=null){
            return this.getDateDiff(Date.parse(dateStr.toString().replace(/-/gi,"/")))
          }else{
            return ''
          }

        }

      }
    }
</script>

<style scoped lang="less">
.page-infinite-loading{
        text-align: center;
        height: 50px;
        line-height: 50px;
        padding-bottom: 50px;
        span{
          display: inline-block;
          vertical-align: middle;
        }
        div{
          display: inline-block;

          margin-right: 5px;
        }
        i{
          color: #ccc;
          vertical-align: middle;
        }
 }
  .smallvideo{
    header{
      font-size: 0.36rem;
      color:#2c2c2c;
      height:1rem;
      line-height: 1rem;
      text-align: center;
      border-bottom:1px solid #eee;
    }
    ul{
      box-sizing: border-box;
      overflow: hidden;
      li{
        margin-top:0.38rem;
        padding:0 0.3rem;
        overflow: hidden;
        border-bottom: 1px solid #eee;
        .avatar{
          width:0.9rem;
          height:0.9rem;
          border:1px solid #ddd;
          border-radius: 50%;
          float: left;
          background-size: cover !important;
        }
        .info{
          width:5.5rem;
          float: left;
          margin-left:0.33rem;
          .info_1{
            font-size: 0.3rem;
            color: #2c2c2c;
            height:0.5rem;
            line-height: 0.5rem;
            span{

            }
            i{
              display: inline-block;
              width:0.27rem;
              img{
                width:100%;
                vertical-align: middle;
                margin-top:-0.05rem;
              }
            }
          }
          .time{
            font-size: 0.24rem;
            color: #8d8d8d;
            height:0.5rem;
            line-height: 0.5rem;
          }
          .text{
            font-size: 0.24rem;
            color: #2c2c2c;
            line-height: 0.36rem;
          }
          .video{
            width:3.6rem;
            height:5rem;
            margin-top:0.2rem;
            position: relative;
            img{
              position: absolute;
              top:50%;
              left:50%;
              width:1rem;
              margin-left:-0.5rem;
              margin-top:-0.5rem;
            }
            video{
              display: block;
              width:100%;
              height:5rem;
            }
            video::-webkit-media-controls{
                display:none !important;
            }
          }
          .view{
            height:0.7rem;
            line-height: 0.7rem;
            color:#8d8d8d;
            font-size: 0.24rem;
            i{
              margin-left:0.2rem;
              display: inline-block;
              width:1rem;
              img{
                width:40%;
                vertical-align: middle;
                margin-top:-0.05rem;
              }
            }
            em{
              margin-left:0.2rem;
              width:1rem;
              display: inline-block;
               img{
                width:40%;
                 vertical-align: middle;
                 margin-top:-0.05rem;
              }
            }
          }


        }
      }
    }
  }
</style>

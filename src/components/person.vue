<template>
    <div class="person">
        <header>
          <div class="bg-div">
            <!--<span class="s1"><img src="../../static/img/p1.png" alt=""></span>-->
            <span class="s2"  @click="LinkRouter('/pay')"><img src="../../static/img/p3.png" alt=""></span>
             <span class="s3" @click="LinkRouter('/systemset')"><img src="../../static/img/p2.png" alt=""></span>

          </div>
        </header>
        <section class="block">
          <div class="avator" @click="LinkRouter('/setting')">
            <span class="a1" :style="styleObj(user_info.avatar)"></span>
            <!--<span class="a1" :style="styleObj(user_info.avatar)"><img :src="user_info.avatar" alt=""></span>-->
            <div class="name">
              <span class="a2">{{user_info.user_nicename}}</span>
              <p>账号：{{user_info.user_login}}</p>
              <div>
                <i>LV&nbsp;{{user_info.level}}</i>
                <i><img src="../../static/img/p5.png" alt="">&nbsp;{{Unfo.my_attention_num}}</i>
                <i><img src="../../static/img/p6.png" alt="">&nbsp;{{Unfo.my_fans_num}}</i>
              </div>
            </div>
          </div>
          <div class="hobby">
            <ul>
              <li>
                <span><img src="../../static/img/p7.png" alt=""></span>
                <p>钻石<br/>{{user_info.coin}}</p>
              </li>

               <li>
                <span><img src="../../static/img/p8.png" alt=""></span>
                <p>收到{{getgif.get_num}}个</p>
                 <p>送出{{getgif.send_num}}个</p>
              </li>

               <li>
                <span><img src="../../static/img/p9.png" alt=""></span>
                <p>累计经验<br/>{{user_info.consumption}}点</p>
              </li>

               <li>
                <span><img src="../../static/img/p10.png" alt=""></span>
                <p>我的直播间</p>
                 <p v-if="Unfo.my_live_status==0">已结束</p>
                 <p v-if="Unfo.my_live_status==1">正在直播</p>
                 <p v-if="Unfo.my_live_status==2">未开始</p>
              </li>

            </ul>
          </div>
        </section>
      <footer>
        <ul>
          <li  @click="LinkRouter('/myfollow?m=gz')">
            <span class="n1"><img src="../../static/img/p11.png" alt=""></span>
            <span class="n2">我的关注</span>
            <span class="n3"><img src="../../static/img/right.png" alt=""></span>
          </li>
          <li  @click="LinkRouter('/myfollow?m=fs')">
            <span class="n1"><img src="../../static/img/p12.png" alt=""></span>
            <span class="n2">我的粉丝</span>
            <span class="n3"><img src="../../static/img/right.png" alt=""></span>
          </li>
          <li  @click="LinkRouter('/myfollow?m=gl')">
            <span class="n1"><img src="../../static/img/p13.png" alt=""></span>
            <span class="n2">我的管理员</span>
            <span class="n3"><img src="../../static/img/right.png" alt=""></span>
          </li>
           <li @click="LinkRouter('/platform_Introduction')">
            <span class="n1" ><img src="../../static/img/p15.png" alt=""></span>
            <span class="n2">平台介绍</span>
            <span class="n3"><img src="../../static/img/right.png" alt=""></span>
          </li>
        </ul>
         <ul>
          <li  @click="LinkRouter('/daoju')">
            <span class="n1"><img src="../../static/img/dj.png" alt=""></span>
            <span class="n2">我的道具</span>
            <span class="n3"><img src="../../static/img/right.png" alt=""></span>
          </li>
          <li  @click="certState()">
            <span class="n1"><img src="../../static/img/p16.png" alt=""></span>
            <span class="n2">我的认证</span>
            <span class="n3"><img src="../../static/img/right.png" alt=""></span>
          </li>
         <!-- <li  @click="LinkRouter('/forward')">
            <span class="n1"><img src="../../static/img/p17.png" alt=""></span>
            <span class="n2">提现中心</span>
            <span class="n3"><img src="../../static/img/right.png" alt=""></span>
          </li>-->
        </ul>
        <ul>
          <li  @click="LinkRouter('/mysystemset')">
            <span class="n1"><img src="../../static/img/p18.png" alt=""></span>
            <span class="n2">我的账户</span>
            <span class="n3"><img src="../../static/img/right.png" alt=""></span>
          </li>
        </ul>
         <ul>
          <li  @click="LinkRouter('/systemset')">
            <span class="n1"><img src="../../static/img/mmm1.png" alt=""></span>
            <span class="n2">账号设置</span>
            <span class="n3"><img src="../../static/img/right.png" alt=""></span>
          </li>
        </ul>
<!--          <ul>
              <li  @click="getVideoUrl('/openVideo')">
                  <span class="n1"><img src="../../static/img/p18.png" alt=""></span>
                  <span class="n2">开播</span>
                  <span class="n3"><img src="../../static/img/right.png" alt=""></span>
              </li>
          </ul>-->
          <ul>
              <li  @click="LinkRouter('/imgcode?code='+user_info.code)">
                  <span class="n1"><img src="../../static/img/mmm2.png" alt=""></span>
                  <span class="n2">邀请好友</span>
                  <span class="n3"><img src="../../static/img/right.png" alt=""></span>
              </li>
          </ul>
      </footer>
    </div>
</template>

<script>
  import store from '@/store/store'
  import { Range,Toast } from 'mint-ui';
  import api from '@/constant/api'
  import person from '@/components/person'
    export default {
        name: "person",
        data(){
          return{
            user_info:[],
            getgif:[],
            Unfo:[],
            stream:'',
            videourl:'',
            texttitle:'55555',
            type:0
          }
        },
        mounted(){

            this.getPerson()
        },
        methods:{
          styleObj(o){
              return  'background:url("'+o+'") center no-repeat;';
          },
           LinkRouter(o){
            this.$router.push({
              path:o
              })
          },
          getPerson(){
             var _this=this;
              this.axios.get(api.person)
              .then(function(res){
                _this.$root.login(res.data.state)
                var dat=res.data
                //_this.$root.login(dat.state)
                if(dat.state==0){
                  _this.user_info=dat.content.user_info
                  _this.getgif=dat.content.gift
                  _this.Unfo=dat.content
                }
            })
          },
          certState(){
              var _this=this;
              this.axios.get(api.my_authentication)
              .then(function(res){
                var dat=res.data
                if(dat.state==0){
                    if(dat.content.status==0){//处理中
                          _this.LinkRouter('/examine')
                    }else if(dat.content.status==1){//审核成功
                          _this.LinkRouter('/mycerting_result')
                    }else if(dat.content.status==2){//审核失败
                          _this.LinkRouter('/certing')
                      /*  localStorage.setItem('top',res.data.content.qiniu.upload_token);
                        localStorage.setItem('host',res.data.content.qiniu.qiniu_host);*/

                    }
                }else{
                  _this.LinkRouter('/certing')
                }
                  localStorage.setItem('top',res.data.content.qiniu.upload_token);
                  localStorage.setItem('host',res.data.content.qiniu.qiniu_host);
                _this.$root.login(res.data.state)
            })
          },
            LinkRouter5(){
                //document.addEventListener("plusready",function(){
                    var ws=plus.webview.currentWebview();
                    //ws.loadURL('http://127.0.0.1/pusher.html')
                    ws.loadURL('http://www.hailuozhibo.com/h5/view/pusher.html?time='+new Date()+'&type='+this.type+'&stream='+this.stream+'&Token='+localStorage.getItem('login_token')+'&videourl='+this.videourl)
                    //ws.evalJS("getinfo("+localStorage.getItem('login_token')+")");

                //});

            },
            getVideoUrl(){
                var _this=this;
                this.axios.post(api.live_get_tx_pull_url)
                    .then(function(res){
                        var dat=res.data
                        if(dat.state==0){
                            _this.stream=dat.content.stream
                           // alert(_this.stream)
                            _this.videourl=dat.content.rtmp_pull_url
                            _this.LinkRouter5()

                        }else{
                            _this.showM(dat.msg)
                        }
                    })
            },
            showM(o){
                // this.$root.Hub.$emit('child',{msg:o,flag:true});
                Toast({
                    message:o,
                    iconClass: 'icon icon-success',
                    className:'backColor',
                    duration:1000
                });
            },
        }
    }
</script>

<style scoped lang="less">
    .person{
      position: relative;
      header{
        width: 100%;
        height:3.6rem;
        background: -webkit-linear-gradient(#00dbff, #199af2); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#00dbff, #199af2); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#00dbff, #199af2); /* Firefox 3.6 - 15 */
        background: linear-gradient(#00dbff, #199af2); /* 标准的语法 */
      }
      .bg-div{
        width:7.1rem;
        height:0.88rem;
        line-height: 0.88rem;
        margin:0 auto;
        span{
          img{
            vertical-align: middle;
          }

        }
        .s1{
          display: block;
          width:0.48rem;
          overflow: hidden;
          float: left;
          img{
            width:100%;
          }
        }
         .s2{
          display: block;
          width:0.84rem;
           float: right;
          img{
            width:100%;
          }
        }
         .s3{
          display: block;
          width:0.48rem;
           float: left;
          img{
            width:100%;
          }
        }

      }
      .block{
        position: absolute;
        top:1rem;
        left:0.2rem;
        width:7.1rem;
        height:3.92rem;
        background: #fff;
        margin:0 auto;
        border-radius: 0.2rem;
        box-shadow: 0 0 0.5rem #ccc;
         .avator{
           padding-top:0.45rem;
           margin-left:0.4rem;
           overflow: hidden;
           background: url("../../static/img/right.png") no-repeat;
           background-position: 6.2rem 0.8rem;
           background-size:0.26rem 0.44rem;
          .a1{
            display: block;
            width:1.46rem;
            height:1.46rem;
            border-radius: 50%;
            overflow: hidden;
             float: left;
            background-size:cover !important;
            img{
              width:100%;
            }
          }
           .name{
             display: block;
             width:(7.1-1.46-0.1)rem;
             float: left;
             padding-left:0.3rem;
             .a2{
               font-size: 0.38rem;
               color:#2C2C2C;
             }
             p{
               font-size: 0.24rem;
               color:#b6b6b6;
               margin-top:0.01rem;
             }
             div{
               margin-top:0.16rem;
                font-size: 0.24rem;
               color:#b6b6b6;
               i{
                 margin-left:0.15rem;

                 img{
                   width:0.24rem;
                   height:0.255rem;
                   vertical-align: middle;
                   margin-top:-0.05rem;
                 }
               }
               i:first-child{
                 margin-left:0;
               }
             }
           }
        }
        .hobby{
          width:6.68rem;
          border-top:1px solid #f3f3f3;
          margin:0 auto;
          margin-top:0.37rem;
          ul{
            padding-top: 0.15rem;
            display: flex;
            li{
              justify-content:center;
              text-align: center;
              font-size: 0.22rem;
              color: #b8b8b8;
              width:100px;
              box-sizing: border-box;
              p{
                line-height: 0.3rem;
              }
              span{
                display: block;
                width:0.7rem;
                margin:0 auto;
              }
              img{
                width:100%;
              }
            }
          }
        }
      }
    }
  footer{
    margin-top:2rem;
    padding-bottom: 2rem;
    ul{
      padding:0 0.2rem;
      border-bottom: 0.12rem solid #f7f7f7;
      li{
        height:1rem;
        line-height: 1rem;
        span{
          font-size: 0.33rem;
          color: #2c2c2c;
          img{
            margin-top:-0.05rem;
          }
        }
        .n1{
          margin-right: 0.1rem;
          img{
            width:0.34rem;
            vertical-align: middle;
          }
        }
        .n3{
          float: right;
          img{
            width:0.2rem;
            vertical-align: middle;
          }
        }
      }
    }
  }

</style>
